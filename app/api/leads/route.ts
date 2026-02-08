import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { siteConfig } from "@/lib/config"
import { titleFromDelims } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? ""
    let data: Record<string, unknown> = {}

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData()
      form.forEach((value, key) => {
        if (typeof value === "string") {
          data[key] = value
        }
      })
    } else {
      data = await request.json()
    }

    const rawConsent = data.consent
    const normalizedConsent =
      typeof rawConsent === "string"
        ? rawConsent === "true" || rawConsent === "on" || rawConsent === "1"
        : Boolean(rawConsent)
    data = { ...data, consent: normalizedConsent }
    const source = data.source ?? "devis_form"
    const contactName =
      data.firstName && data.lastName
        ? `${data.firstName} ${data.lastName}`
        : data.name
    const location = `${data.postalCode ?? ""} ${data.city ?? ""}`.trim()

    // Log the lead for demo purposes
    console.log(" New lead received:", {
      source: titleFromDelims(source),
      service: titleFromDelims(data.service),
      location,
      contact: contactName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    })

    // In production, you could also:
    // 1. Integrate with CRM (Make/Zapier webhook)
    // 2. Send confirmation email to customer

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

    console.log("[Leads] SMTP config", {
      host: smtpHost,
      port: smtpPort,
      user: Boolean(smtpUser),
      pass: Boolean(smtpPass),
      from: smtpFrom,
      to: smtpTo,
    })

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      logger: true,
      debug: true,
    })

    try {
      await transporter.verify()
      console.log("[Leads] SMTP verify ok")
    } catch (verifyError) {
      console.error("[Leads] SMTP verify failed", verifyError)
      throw verifyError
    }

    const subject =
      source === "contact_form"
        ? "Nouvelle demande - Contact"
        : "Nouvelle demande - Devis"

    const textLines = [
      `Source: ${titleFromDelims(source)}`,
      `Service: ${titleFromDelims(data.service) ?? "--"}`,
      `Nom: ${contactName ?? "--"}`,
      `Email: ${data.email ?? "--"}`,
      `Téléphone: ${data.phone ?? "--"}`,
      `Code postal / Ville: ${location || "--"}`,
      `Message: ${data.message ?? "--"}`,
    ]

    const html = `
      <div style="font-family:Arial, sans-serif; font-size:14px; color:#111">
        <h2 style="margin:0 0 8px">${subject}</h2>
        <table style="border-collapse:collapse; width:100%">
          <tr><td style="padding:6px 0; width:180px"><strong>Source</strong></td><td>${titleFromDelims(source)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Service</strong></td><td>${titleFromDelims(data.service) ?? "--"}</td></tr>
          <tr><td style="padding:6px 0"><strong>Nom</strong></td><td>${contactName ?? "--"}</td></tr>
          <tr><td style="padding:6px 0"><strong>Email</strong></td><td>${data.email ?? "--"}</td></tr>
          <tr><td style="padding:6px 0"><strong>Téléphone</strong></td><td>${data.phone ?? "-"}</td></tr>
          <tr><td style="padding:6px 0"><strong>Localisation</strong></td><td>${location || "-"}</td></tr>
          <tr><td style="padding:6px 0"><strong>Message</strong></td><td>${data.message ?? "-"}</td></tr>
        </table>
      </div>
    `.trim()

    try {
      const sendResult = await transporter.sendMail({
        from: smtpFrom,
        to: smtpTo,
        subject,
        text: textLines.join("\n"),
        html,
        replyTo: data.email || undefined,
      })
      console.log("[Leads] SMTP send ok", {
        messageId: sendResult.messageId,
        response: sendResult.response,
      })
    } catch (sendError) {
      console.error("[Leads] SMTP send failed", sendError)
      throw sendError
    }

    if (data.email) {
      const confirmationSubject =
        source === "contact_form"
          ? "Votre message a bien été reçu"
          : "Votre demande de devis a bien été reçue"

      const confirmationText = [
        `Bonjour ${contactName || ""},`.trim(),
        "",
        "Merci pour votre demande. Notre équipe vous répond sous 2 heures en semaine.",
        "",
        "Récapitulatif :",
        `${source === "contact_form" ? "- Type : Contact" : `- Service : ${titleFromDelims(data.service) ?? "--"}`}`,
        `- Code postal / Ville : ${location || "--"}`,
        `- Téléphone : ${data.phone ?? "--"}`,
        `- Message : ${data.message ?? "--"}`,
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
                        <p style="margin:0 0 8px;font-size:14px">Bonjour ${contactName || ""},</p>
                        <p style="margin:0 0 14px;font-size:14px;color:#4b5563">Merci pour votre demande. Notre équipe vous répond sous <strong>2 heures</strong> en semaine.</p>

                        <div style="background:#f9fafb;border:1px solid #eef2f7;border-radius:12px;padding:14px 16px">
                          <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.6px">Récapitulatif</div>
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:8px;font-size:14px;color:#0559d2">
                            <tr><td style="padding:4px 0;color:#6b7280;width:180px">${source === "contact_form" ? "Type" : "Service"}</td><td style="padding:4px 0">
                            ${source === "contact_form" ? "Contact" : titleFromDelims(data.service) ?? "-"}</td></tr>
                            <tr><td style="padding:4px 0;color:#6b7280">Code postal / Ville</td><td style="padding:4px 0">${location || "-"}</td></tr>
                            <tr><td style="padding:4px 0;color:#6b7280">Téléphone</td><td style="padding:4px 0">${data.phone ?? "-"}</td></tr>
                            <tr><td style="padding:4px 0;color:#6b7280">Message</td><td style="padding:4px 0">${data.message ?? "-"}</td></tr>
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

      try {
        const confirmResult = await transporter.sendMail({
          from: smtpFrom,
          to: data.email,
          subject: confirmationSubject,
          text: confirmationText,
          html: confirmationHtml,
          replyTo: siteConfig.contact.email,
        })
        console.log("[Leads] SMTP confirmation ok", {
          messageId: confirmResult.messageId,
          response: confirmResult.response,
        })
      } catch (sendError) {
        console.error("[Leads] SMTP confirmation failed", sendError)
        throw sendError
      }
    }

      /*
      const devisEndpoint = `${devisApiUrl.replace(/\/$/, "")}/devis`
      const payloadForDb = {
        ...devisPayload,
        body: devisPayload,
      }

      console.log("[Leads] DB payload", payloadForDb)

      console.log("[Leads] DB endpoint", devisEndpoint)

      let dbResponse: Response
      try {
        dbResponse = await fetch(devisEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadForDb),
        })
      } catch (fetchError) {
        console.error("[Leads] DB fetch failed", fetchError)
        const fetchMessage = fetchError instanceof Error ? fetchError.message : String(fetchError)
        throw new Error(`Database save failed: ${fetchMessage}`)
      }

      if (!dbResponse.ok) {
        const errorBody = await dbResponse.text()
        throw new Error(
          `Database save failed: ${dbResponse.status} ${dbResponse.statusText} ${errorBody}`,
        )
      }

      console.log("[Leads] DB save ok", {
        status: dbResponse.status,
        statusText: dbResponse.statusText,
      })
      */

    // Optional: small delay for UX consistency
    await new Promise((resolve) => setTimeout(resolve, 250))

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Demande de devis reçue avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(" Lead submission error:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi de la demande",
        debug: errorMessage,
      },
      { status: 500 },
    )
  }
}
