import type { Metadata } from "next";

import { LandingPageTemplate } from "@/components/landing/landing-page-template";
import { landingPages } from "@/lib/content/landing-pages";

const content = landingPages["vide-maison-pavillon-pro"];

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  robots: { index: false, follow: false },
  alternates: { canonical: content.meta.canonical },
};

export default function VideMaisonProLandingPage() {
  return <LandingPageTemplate content={content} />;
}
