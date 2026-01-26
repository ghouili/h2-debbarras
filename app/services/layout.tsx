import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Services de débarras & déménagement Île-de-France",
  description:
    "Découvrez nos services de débarras et déménagement en Île-de-France : maisons, appartements, caves, bureaux. Devis gratuit, intervention 24-48h.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Services de débarras & déménagement - H2 Débarras Maison",
    description:
      "Tous nos services de débarras et déménagement en Île-de-France. Devis gratuit et intervention rapide.",
    url: `${siteConfig.url}/services`,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services de débarras & déménagement",
    description:
      "Découvrez nos prestations de débarras et déménagement en Île-de-France.",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
