import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"

export function ZonesTeaser() {
  const copy = homeCopy.zones

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <MapPin className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">{copy.title}</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">{copy.subtitle}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {siteConfig.zones.departements.map((dept) => (
            <div
              key={dept.code}
              className="rounded-lg border border-border bg-card px-4 py-2 text-center transition-colors hover:border-primary"
            >
              <div className="text-lg font-semibold text-primary">{dept.code}</div>
              <div className="text-sm text-muted-foreground">{dept.name}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/zones">{copy.cta}</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
