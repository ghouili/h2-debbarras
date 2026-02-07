import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"
import { siteConfig } from "@/lib/config"

const contactCreateSchema = z.object({
  source: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(3),
  message: z.string().min(1),
  consent: z.boolean(),
  postalCode: z.string().nullable().optional(),
  status: z.enum(["new", "in_progress", "closed"]).optional(),
})

const buildLocation = (postalCode?: string | null) => {
  if (!postalCode) return ""
  return postalCode.trim()
}

export async function POST(request: Request) {
  try {
    const rawPayload = await request.json()
    const payload = (rawPayload && typeof rawPayload === "object" && "data" in rawPayload)
      ? (rawPayload as { data: Record<string, unknown> }).data
      : rawPayload

    const normalizedPayload = {
      source: (payload as Record<string, unknown>)?.source ?? "contact_form",
      name:
        (payload as Record<string, unknown>)?.name ??
        (payload as Record<string, unknown>)?.fullName ??
        (payload as Record<string, unknown>)?.contactName,
      email: (payload as Record<string, unknown>)?.email,
      phone:
        (payload as Record<string, unknown>)?.phone ??
        (payload as Record<string, unknown>)?.phoneNumber,
      message:
        (payload as Record<string, unknown>)?.message ??
        (payload as Record<string, unknown>)?.notes ??
        (payload as Record<string, unknown>)?.comment,
      consent:
        (payload as Record<string, unknown>)?.consent ??
        (payload as Record<string, unknown>)?.gdprConsent ??
        (payload as Record<string, unknown>)?.acceptedTerms,
      postalCode:
        (payload as Record<string, unknown>)?.postalCode ??
        (payload as Record<string, unknown>)?.zip ??
        (payload as Record<string, unknown>)?.postcode ??
        null,
      status: (payload as Record<string, unknown>)?.status,
    }

    const parsed = contactCreateSchema.safeParse(normalizedPayload)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Données invalides",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      )
    }

    const { source, name, email, phone, message, consent, postalCode, status } = parsed.data

    const location = buildLocation(postalCode)

    const contactsApiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
    if (!contactsApiUrl) {
      throw new Error("API_URL is not configured")
    }

    const contactsEndpoint = `${contactsApiUrl.replace(/\/$/, "")}/contacts`

    const basePayload = {
      source,
      name,
      email,
      phone,
      message,
      consent,
      postalCode: postalCode ?? null,
      status: status ?? "new",
      fullName: name,
    }

    const payloadForDb = {
      ...basePayload,
      body: basePayload,
    }

    console.log("[Contacts] DB payload", payloadForDb)

    const dbResponse = await fetch(contactsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadForDb),
    })

    if (!dbResponse.ok) {
      const errorBody = await dbResponse.text()
      throw new Error(
        `Database save failed: ${dbResponse.status} ${dbResponse.statusText} ${errorBody}`,
      )
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT ?? 0)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpFrom = process.env.SMTP_FROM ?? siteConfig.contact.email
    const smtpTo =
      process.env.SMTP_TO ??
      "debarras.aurea@gmail.com,contact@debarras-aurea.fr"

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      throw new Error("SMTP configuration missing")
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const subject = "Nouveau message - Contact"

    const textLines = [
      `Source: ${source}`,
      `Nom: ${name}`,
      `Email: ${email}`,
      `Téléphone: ${phone}`,
      `Code postal: ${location || "--"}`,
      `Consentement: ${consent ? "Oui" : "Non"}`,
      `Message: ${message}`,
    ]

    const html = `
      <div style="font-family:Arial, sans-serif; font-size:14px; color:#111">
        <h2 style="margin:0 0 8px">${subject}</h2>
        <table style="border-collapse:collapse; width:100%">
          <tr><td style="padding:6px 0; width:180px"><strong>Source</strong></td><td>${source}</td></tr>
          <tr><td style="padding:6px 0"><strong>Nom</strong></td><td>${name}</td></tr>
          <tr><td style="padding:6px 0"><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td style="padding:6px 0"><strong>Téléphone</strong></td><td>${phone}</td></tr>
          <tr><td style="padding:6px 0"><strong>Code postal</strong></td><td>${location || "-"}</td></tr>
          <tr><td style="padding:6px 0"><strong>Consentement</strong></td><td>${consent ? "Oui" : "Non"}</td></tr>
          <tr><td style="padding:6px 0"><strong>Message</strong></td><td>${message}</td></tr>
        </table>
      </div>
    `.trim()

    await transporter.sendMail({
      from: smtpFrom,
      to: smtpTo,
      subject,
      text: textLines.join("\n"),
      html,
      replyTo: email,
    })

    const confirmationSubject = "Votre message a bien été reçu"

    const confirmationText = [
      `Bonjour ${name},`,
      "",
      "Merci pour votre message. Notre équipe vous répond sous 2 heures en semaine.",
      "",
      "Récapitulatif :",
      `- Code postal : ${location || "--"}`,
      `- Téléphone : ${phone}`,
      `- Message : ${message}`,
      "",
      `Si besoin, vous pouvez nous joindre au ${siteConfig.contact.phone}.`,
      "",
      `— ${siteConfig.name}`,
    ].join("\n")

    const confirmationHtml = `
      <div style="margin:0;padding:0;background:#f6f7fb">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f6f7fb;padding:24px 0">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%">
                <tr>
                  <td style="padding:0 12px">
                    <div style="background:#0559d2;color:#ffffff;border-radius:14px;padding:18px 20px;font-family:Arial, sans-serif">
                      <div style="font-size:12px;letter-spacing:0.8px;text-transform:uppercase;opacity:0.7">${siteConfig.name}</div>
                      <div style="font-size:20px;font-weight:700;margin-top:6px">${confirmationSubject}</div>
                      <div style="font-size:12px;margin-top:6px;opacity:0.85">Réponse sous 2h • Île-de-France</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 12px 0">
                    <div style="background:#ffffff;border-radius:14px;padding:20px 22px;font-family:Arial, sans-serif;color:#0559d2;box-shadow:0 10px 30px rgba(17,24,39,0.06)">
                      <p style="margin:0 0 8px;font-size:14px">Bonjour ${name},</p>
                      <p style="margin:0 0 14px;font-size:14px;color:#4b5563">Merci pour votre message. Notre équipe vous répond sous <strong>2 heures</strong> en semaine.</p>

                      <div style="background:#f9fafb;border:1px solid #eef2f7;border-radius:12px;padding:14px 16px">
                        <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.6px">Récapitulatif</div>
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:8px;font-size:14px;color:#0559d2">
                          <tr><td style="padding:4px 0;color:#6b7280;width:180px">Code postal</td><td style="padding:4px 0">${location || "-"}</td></tr>
                          <tr><td style="padding:4px 0;color:#6b7280">Téléphone</td><td style="padding:4px 0">${phone}</td></tr>
                          <tr><td style="padding:4px 0;color:#6b7280">Message</td><td style="padding:4px 0">${message}</td></tr>
                        </table>
                      </div>

                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:16px">
                        <tr>
                          <td>
                            <a href="tel:${siteConfig.contact.phone.replace(/\s/g, "")}" style="display:inline-block;background:#0559d2;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:600">Appeler ${siteConfig.contact.phone}</a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:16px 0 0;font-size:12px;color:#9ca3af">— ${siteConfig.name}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `.trim()

    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: confirmationSubject,
      text: confirmationText,
      html: confirmationHtml,
      replyTo: siteConfig.contact.email,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Message reçu avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[Contacts] submission error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi du message",
      },
      { status: 500 },
    )
  }
}
