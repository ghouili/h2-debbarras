import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Log the lead for demo purposes
    console.log("[v0] New lead received:", {
      service: data.service,
      location: `${data.postalCode} ${data.city}`,
      contact: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
    })

    // In production, you would:
    // 1. Store in database
    // 2. Send email notification
    // 3. Integrate with CRM (Make/Zapier webhook)
    // 4. Send confirmation email to customer

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Demande de devis reçue avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Lead submission error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi de la demande",
      },
      { status: 500 },
    )
  }
}
