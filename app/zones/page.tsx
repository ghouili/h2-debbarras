import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import ZonesPageClient from "./zones-page-client"

export const metadata: Metadata = {
  title: "Zones d'intervention - Débarras Île-de-France | Paris et 8 départements",
  description:
    "Débarras professionnel dans toute l'Île-de-France : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Essonne (91), Yvelines (78), Val-d'Oise (95), Seine-et-Marne (77). Intervention 24-48h.",
  alternates: {
    canonical: `${siteConfig.url}/zones`,
  },
  openGraph: {
    title: "Zones d'intervention en Île-de-France - H2 Débarras Maison",
    description:
      "Découvrez nos zones de couverture pour le débarras professionnel. Paris et 8 départements d'Île-de-France. Intervention rapide 24-48h.",
    url: `${siteConfig.url}/zones`,
    type: "website",
  },
  keywords: [
    "débarras Paris",
    "débarras Île-de-France",
    "débarras 92",
    "débarras 93",
    "débarras 94",
    "débarras 91",
    "débarras 78",
    "débarras 95",
    "débarras 77",
    "zone intervention débarras",
  ],
}

export default function ZonesPage() {
  return <ZonesPageClient />
}
