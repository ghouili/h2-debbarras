import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Warehouse, Heart, Armchair } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"

const iconMap = {
  home: Home,
  warehouse: Warehouse,
  heart: Heart,
  armchair: Armchair,
}

export function ServicesGrid() {
  const serviceCardsCopy = homeCopy.serviceCards
  const displayServices = siteConfig.services.particulier.debarras.slice(0, serviceCardsCopy.cards.length)

  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{serviceCardsCopy.title}</h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">{serviceCardsCopy.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {displayServices.map((service, index) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap] || Home
          const copyCard = serviceCardsCopy.cards[index]
          return (
            <Card key={service.id} className="group w-full flex flex-col justify-between transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{copyCard?.title ?? service.title}</CardTitle>
                <CardDescription className="text-pretty">{copyCard?.description ?? service.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" asChild className="group/btn w-full justify-between">
                  <Link href={`/services/${service.slug}`}>
                    {serviceCardsCopy.ctaLabel}
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <Link href="/devis">{serviceCardsCopy.sectionCta}</Link>
        </Button>
      </div>
    </Section>
  )
}
