import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import ContactPageClient from "./contact-page-client"

export const metadata: Metadata = {
  title: "Contact - Débarras Île-de-France",
  description:
    "Contactez Débarras Aurea pour vos projets de débarras et déménagement en Île-de-France. Réponse sous 2h, devis gratuit. Téléphone, email ou formulaire de contact.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact - Débarras Aurea",
    description:
      "Besoin d'un débarras ou d'un déménagement en Île-de-France ? Contactez Débarras Aurea par téléphone, email ou formulaire. Réponse rapide garantie.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
