import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "FAQ débarras Île-de-France",
  description:
    "Réponses aux questions fréquentes sur nos prestations de débarras en Île-de-France : délais, tarifs, tri, recyclage et intervention.",
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  openGraph: {
    title: "FAQ - H2 Débarras Maison",
    description:
      "Toutes les réponses sur le débarras en Île-de-France : délais, tarifs, tri, recyclage.",
    url: `${siteConfig.url}/faq`,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ débarras Île-de-France",
    description:
      "Réponses aux questions fréquentes sur nos services de débarras.",
  },
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
