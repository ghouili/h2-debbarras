// HubSpot CRM sync for website leads (devis + contact forms).
// Server-only: uses a HubSpot Service Key (Bearer token) from HUBSPOT_ACCESS_TOKEN.
// Never throws — a CRM failure must not block the lead submission / emails.

import { titleFromDelims } from "@/lib/utils"

const HUBSPOT_API = "https://api.hubapi.com"
const REQUEST_TIMEOUT_MS = 8000

// HubSpot-defined association type IDs
const ASSOC_DEAL_TO_CONTACT = 3
const ASSOC_NOTE_TO_CONTACT = 202
const ASSOC_NOTE_TO_DEAL = 214

export type HubSpotLeadInput = {
  source: string
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  phone?: string
  postalCode?: string
  city?: string
  service?: string
  message?: string
  consent?: boolean
  // Any other form fields (timing, floor, surfaceArea, department…)
  extra?: Record<string, unknown>
}

export type HubSpotSyncResult =
  | { ok: true; contactId: string; dealId?: string }
  | { ok: false; skipped?: boolean; error?: string }

type HubSpotObject = { id: string; properties?: Record<string, string | null> }

class HubSpotError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function hubspotFetch<T>(path: string, init: RequestInit & { token: string }): Promise<T> {
  const { token, ...rest } = init
  const response = await fetch(`${HUBSPOT_API}${path}`, {
    ...rest,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(rest.headers ?? {}),
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  })

  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new HubSpotError(`HubSpot ${rest.method ?? "GET"} ${path} -> ${response.status} ${body}`, response.status)
  }

  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

const clean = (value: unknown): string | undefined => {
  if (value === null || value === undefined) return undefined
  const str = String(value).trim()
  return str.length > 0 ? str : undefined
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

function splitName(input: HubSpotLeadInput): { firstname?: string; lastname?: string } {
  const first = clean(input.firstName)
  const last = clean(input.lastName)
  if (first || last) return { firstname: first, lastname: last }
  const full = clean(input.name)
  if (!full) return {}
  const [head, ...tail] = full.split(/\s+/)
  return { firstname: head, lastname: tail.length ? tail.join(" ") : undefined }
}

function withoutEmpty(props: Record<string, string | undefined>): Record<string, string> {
  return Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined)) as Record<string, string>
}

async function findContact(token: string, email?: string, phone?: string): Promise<HubSpotObject | null> {
  const filterGroups = []
  if (email) filterGroups.push({ filters: [{ propertyName: "email", operator: "EQ", value: email }] })
  if (phone) filterGroups.push({ filters: [{ propertyName: "phone", operator: "EQ", value: phone }] })
  if (filterGroups.length === 0) return null

  const result = await hubspotFetch<{ results: HubSpotObject[] }>("/crm/v3/objects/contacts/search", {
    token,
    method: "POST",
    body: JSON.stringify({ filterGroups, properties: ["email", "phone"], limit: 1 }),
  })
  return result.results?.[0] ?? null
}

function buildDetailsLines(input: HubSpotLeadInput): [string, string][] {
  const location = [clean(input.postalCode), clean(input.city)].filter(Boolean).join(" ")
  const lines: [string, string][] = [
    ["Source", titleFromDelims(input.source)],
    ["Service", titleFromDelims(clean(input.service)) || "-"],
    ["Localisation", location || "-"],
    ["Téléphone", clean(input.phone) ?? "-"],
    ["Email", clean(input.email) ?? "-"],
    ["Consentement", input.consent ? "Oui" : "Non"],
  ]
  for (const [key, value] of Object.entries(input.extra ?? {})) {
    const v = typeof value === "boolean" ? (value ? "Oui" : "Non") : clean(value)
    if (v) lines.push([titleFromDelims(key), v])
  }
  lines.push(["Message", clean(input.message) ?? "-"])
  return lines
}

export async function syncLeadToHubSpot(input: HubSpotLeadInput): Promise<HubSpotSyncResult> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) {
    console.warn("[HubSpot] HUBSPOT_ACCESS_TOKEN not set — sync skipped")
    return { ok: false, skipped: true }
  }

  try {
    const email = clean(input.email)?.toLowerCase()
    const phone = clean(input.phone)
    const { firstname, lastname } = splitName(input)
    const isDevis = input.source !== "contact_form"

    // 1) Contact: update if it exists (by email, then phone), otherwise create
    const contactProps = withoutEmpty({
      email,
      firstname,
      lastname,
      phone,
      zip: clean(input.postalCode),
      city: clean(input.city),
      message: clean(input.message),
    })

    let contactId: string
    const existing = await findContact(token, email, phone)
    if (existing) {
      await hubspotFetch(`/crm/v3/objects/contacts/${existing.id}`, {
        token,
        method: "PATCH",
        body: JSON.stringify({ properties: contactProps }),
      })
      contactId = existing.id
    } else {
      const created = await hubspotFetch<HubSpotObject>("/crm/v3/objects/contacts", {
        token,
        method: "POST",
        body: JSON.stringify({
          properties: { ...contactProps, lifecyclestage: "lead", hs_lead_status: "NEW" },
        }),
      })
      contactId = created.id
    }

    const details = buildDetailsLines(input)

    // 2) Deal (devis requests only), associated to the contact
    let dealId: string | undefined
    if (isDevis && process.env.HUBSPOT_CREATE_DEALS !== "false") {
      try {
        const location = [clean(input.postalCode), clean(input.city)].filter(Boolean).join(" ")
        const who = [firstname, lastname].filter(Boolean).join(" ") || email || phone || "Prospect"
        const dealname = ["Devis", titleFromDelims(clean(input.service)), location, who]
          .filter(Boolean)
          .join(" – ")

        const deal = await hubspotFetch<HubSpotObject>("/crm/v3/objects/deals", {
          token,
          method: "POST",
          body: JSON.stringify({
            properties: withoutEmpty({
              dealname: dealname.slice(0, 250),
              pipeline: process.env.HUBSPOT_DEAL_PIPELINE || "default",
              dealstage: process.env.HUBSPOT_DEAL_STAGE || "appointmentscheduled",
              description: details.map(([k, v]) => `${k}: ${v}`).join("\n").slice(0, 65000),
            }),
            associations: [
              {
                to: { id: contactId },
                types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: ASSOC_DEAL_TO_CONTACT }],
              },
            ],
          }),
        })
        dealId = deal.id
      } catch (dealError) {
        // e.g. wrong HUBSPOT_DEAL_STAGE — keep the contact + note anyway
        console.error("[HubSpot] deal creation failed", dealError instanceof Error ? dealError.message : dealError)
      }
    }

    // 3) Note with the full form details (best effort — needs notes access on the key)
    try {
      const body = `<p><strong>${escapeHtml(isDevis ? "Demande de devis (site web)" : "Message de contact (site web)")}</strong></p>${details
        .map(([k, v]) => `<p><strong>${escapeHtml(k)} :</strong> ${escapeHtml(v)}</p>`)
        .join("")}`
      const associations = [
        {
          to: { id: contactId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: ASSOC_NOTE_TO_CONTACT }],
        },
      ]
      if (dealId) {
        associations.push({
          to: { id: dealId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: ASSOC_NOTE_TO_DEAL }],
        })
      }
      await hubspotFetch("/crm/v3/objects/notes", {
        token,
        method: "POST",
        body: JSON.stringify({
          properties: { hs_timestamp: new Date().toISOString(), hs_note_body: body },
          associations,
        }),
      })
    } catch (noteError) {
      console.warn("[HubSpot] note creation failed (non-blocking)", noteError instanceof Error ? noteError.message : noteError)
    }

    console.log("[HubSpot] sync ok", { contactId, dealId, updated: Boolean(existing) })
    return { ok: true, contactId, dealId }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("[HubSpot] sync failed", message)
    return { ok: false, error: message }
  }
}
