import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"

export function CtaSection() {
  const copy = homeCopy.finalCta

  return (
    <Section bleed className="bg-gradient-to-b from-primary-100 via-primary-50/50 to-background">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{copy.title}</h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">{copy.subtitle}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/devis">
              {copy.primaryCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
              <Phone className="mr-2 h-5 w-5" />
              {copy.secondaryCta}
            </a>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{copy.microcopy}</p>
      </div>
    </Section>
  )
}
