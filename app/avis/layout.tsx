import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Avis clients | ${siteConfig.name}`,
  description:
    "Retours d'experience sur nos services de debarras et demenagement en Ile-de-France. Consultez les avis clients de Debarras Aurea.",
  alternates: {
    canonical: `${siteConfig.url}/avis`,
  },
  openGraph: {
    title: `Avis clients | ${siteConfig.name}`,
    description:
      "Retours d'experience sur nos services de debarras et demenagement en Ile-de-France.",
    url: `${siteConfig.url}/avis`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AvisLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
