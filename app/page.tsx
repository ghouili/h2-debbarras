import type { Metadata } from "next"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustBadges } from "@/components/sections/trust-badges"
import { ServicesGrid } from "@/components/sections/services-grid"
import { HowItWorks } from "@/components/sections/how-it-works"
import { ZonesTeaser } from "@/components/sections/zones-teaser"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { StatsSection } from "@/components/sections/stats-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaSection } from "@/components/sections/cta-section"
import { siteConfig } from "@/lib/config"
import dynamic from "next/dynamic"

const BeforeAfter = dynamic(
  () => import("@/components/sections/before-after"),
  {
    ssr: false,
    loading: () => (
      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="h-8 w-2/3 mx-auto rounded-full bg-muted animate-pulse" />
          <div className="mt-3 h-4 w-1/2 mx-auto rounded-full bg-muted animate-pulse" />
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <div className="h-64 sm:h-80 rounded-2xl bg-muted animate-pulse" />
        </div>
      </div>
    ),
  },
)

export const metadata: Metadata = {
  title:
    "Débarras & Déménagement en Île-de-France - Devis Gratuit 24-48h | Débarras Aurea",
  description:
    "Service professionnel de débarras maison, cave, succession et déménagement en Île-de-France. Intervention rapide sous 24 à 48 h, devis gratuit et tri éco-responsable. Contactez Débarras Aurea !",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title:
      "Débarras & Déménagement en Île-de-France - Devis Gratuit 24-48h | Débarras Aurea",
    description:
      "Service professionnel de débarras maison, cave, succession et déménagement en Île-de-France. Intervention rapide sous 24 à 48 h, devis gratuit et tri éco-responsable.",
    url: siteConfig.url,
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Débarras & Déménagement en Île-de-France - Devis Gratuit 24-48h | Débarras Aurea",
    description:
      "Service professionnel de débarras maison et déménagement en Île-de-France. Intervention rapide sous 24 à 48 h, devis gratuit.",
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
