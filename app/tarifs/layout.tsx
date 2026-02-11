import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Tarifs debarras et demenagement | ${siteConfig.name}`,
  description:
    "Decouvrez nos tarifs indicatifs pour le debarras et le demenagement en Ile-de-France. Devis gratuit et prix transparents.",
  alternates: {
    canonical: `${siteConfig.url}/tarifs`,
  },
  openGraph: {
    title: `Tarifs debarras et demenagement | ${siteConfig.name}`,
    description:
      "Tarifs indicatifs pour le debarras et le demenagement en Ile-de-France.",
    url: `${siteConfig.url}/tarifs`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TarifsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
