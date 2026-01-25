import type { Metadata } from "next"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustBadges } from "@/components/sections/trust-badges"
import { ServicesGrid } from "@/components/sections/services-grid"
import { HowItWorks } from "@/components/sections/how-it-works"
import { BeforeAfter } from "@/components/sections/before-after"
import { ZonesTeaser } from "@/components/sections/zones-teaser"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { StatsSection } from "@/components/sections/stats-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaSection } from "@/components/sections/cta-section"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Débarras & Déménagement Île-de-France | H2 Débarras Maison",
  description:
    "Service professionnel de débarras et déménagement en Île-de-France. Intervention rapide 24-48h, devis gratuit, tri éco-responsable. Paris et 8 départements.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Débarras & Déménagement Île-de-France | H2 Débarras Maison",
    description:
      "Service professionnel de débarras et déménagement en Île-de-France. Intervention 24-48h, devis gratuit.",
    url: siteConfig.url,
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Débarras & Déménagement Île-de-France",
    description:
      "Service professionnel de débarras et déménagement. Intervention 24-48h, devis gratuit.",
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col pb-0 md:pb-0">
      <HeroSection />
      <TrustBadges />
      <ServicesGrid />
      <HowItWorks />
      <BeforeAfter />
      <StatsSection />
      <ZonesTeaser />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
