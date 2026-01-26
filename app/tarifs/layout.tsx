import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Tarifs débarras Île-de-France",
  description:
    "Tarifs transparents pour le débarras en Île-de-France. Estimation rapide, devis gratuit et intervention 24-48h.",
  alternates: {
    canonical: `${siteConfig.url}/tarifs`,
  },
  openGraph: {
    title: "Tarifs débarras - H2 Débarras Maison",
    description:
      "Consultez nos tarifs pour le débarras en Île-de-France et obtenez un devis gratuit.",
    url: `${siteConfig.url}/tarifs`,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs débarras Île-de-France",
    description:
      "Tarifs transparents pour vos projets de débarras en Île-de-France.",
  },
}

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
