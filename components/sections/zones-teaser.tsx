import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

export function ZonesTeaser() {
  const copy = homeCopy.zones

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <MapPin className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-primary" aria-hidden="true" />
          <h2
            className={cn(
              designTokens.typography.h2,
              "mt-4 text-balance text-2xl sm:text-3xl md:text-4xl",
            )}
          >
            {copy.title}
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">{copy.subtitle}</p>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3" role="list" aria-label="Départements couverts">
          {siteConfig.zones.departements.map((dept) => (
            <div
              key={dept.code}
              role="listitem"
              className="rounded-lg border border-border bg-card px-3 py-2 sm:px-4 text-center transition-colors hover:border-primary focus-within:border-primary"
            >
              <div className="text-base font-semibold text-primary sm:text-lg">{dept.code}</div>
              <div className="text-xs text-muted-foreground sm:text-sm">{dept.name}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <Button variant="outline" size="lg" className={cn(designTokens.button.secondary, "min-h-11 h-10 sm:h-12 px-4 sm:px-6 text-xs sm:text-sm")} asChild>
            <Link href="/zones">{copy.cta}</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
