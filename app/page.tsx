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
