import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Avis clients - Débarras Île-de-France",
  description:
    "Consultez les avis clients sur nos services de débarras et déménagement en Île-de-France. Intervention rapide, devis gratuit.",
  alternates: {
    canonical: `${siteConfig.url}/avis`,
  },
  openGraph: {
    title: "Avis clients - H2 Débarras Maison",
    description:
      "Retours d'expérience sur nos interventions de débarras en Île-de-France.",
    url: `${siteConfig.url}/avis`,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avis clients - Débarras Île-de-France",
    description:
      "Découvrez les avis clients sur nos services de débarras.",
  },
}

export default function AvisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
