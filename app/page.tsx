import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustBadges } from "@/components/sections/trust-badges"
import { ServicesGrid } from "@/components/sections/services-grid"
import { siteConfig } from "@/lib/config"

const HowItWorks = dynamic(
  () => import("@/components/sections/how-it-works").then((m) => m.HowItWorks),
  { ssr: true },
)
const LazyBeforeAfter = dynamic(
  () =>
    import("@/components/sections/lazy-before-after").then(
      (m) => m.LazyBeforeAfter,
    ),
  { ssr: true },
)
const StatsSection = dynamic(
  () => import("@/components/sections/stats-section").then((m) => m.StatsSection),
  { ssr: true },
)
const ZonesTeaser = dynamic(
  () => import("@/components/sections/zones-teaser").then((m) => m.ZonesTeaser),
  { ssr: true },
)
const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/testimonials-section").then(
      (m) => m.TestimonialsSection,
    ),
  { ssr: true },
)
const FaqSection = dynamic(
  () => import("@/components/sections/faq-section").then((m) => m.FaqSection),
  { ssr: true },
)
const CtaSection = dynamic(
  () => import("@/components/sections/cta-section").then((m) => m.CtaSection),
  { ssr: true },
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
      <LazyBeforeAfter />
      <StatsSection />
      <ZonesTeaser />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
