import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Services debarras et demenagement | ${siteConfig.name}`,
  description:
    "Tous nos services de debarras et demenagement en Ile-de-France pour particuliers et professionnels. Intervention rapide et devis gratuit.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: `Services debarras et demenagement | ${siteConfig.name}`,
    description:
      "Tous nos services de debarras et demenagement en Ile-de-France.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
