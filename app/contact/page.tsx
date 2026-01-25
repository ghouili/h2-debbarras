import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import ContactPageClient from "./contact-page-client"

export const metadata: Metadata = {
  title: "Contact - Débarras Île-de-France",
  description:
    "Contactez H2 Débarras Maison pour vos projets de débarras en Île-de-France. Réponse sous 2h, devis gratuit. Téléphone, email ou formulaire de contact.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact - H2 Débarras Maison",
    description:
      "Besoin d'un débarras en Île-de-France ? Contactez-nous par téléphone, email ou formulaire. Réponse rapide garantie.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
