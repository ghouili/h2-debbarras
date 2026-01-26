import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, ArrowRight, Phone } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

type ServicePageProps = {
  title: string
  description: string
  icon: React.ReactNode
  benefits: string[]
  process: {
    step: number
    title: string
    description: string
  }[]
  faqs: {
    q: string
    a: string
  }[]
  priceRange?: string
}

export function ServicePageTemplate({
  title,
  description,
  icon,
  benefits,
  process,
  faqs,
  priceRange,
}: ServicePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">{icon}</div>
            <h1
              className={cn(
                designTokens.typography.h1,
                "text-balance text-4xl md:text-5xl",
              )}
            >
              {title}
            </h1>
            <p className="mt-4 text-pretty text-xl text-muted-foreground">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/devis">
                  Demander un devis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
            {priceRange && <p className="mt-4 text-sm text-muted-foreground">À partir de {priceRange}</p>}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className={cn(designTokens.typography.h2, "mb-8 text-3xl")}>
              Pourquoi nous choisir ?
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className={cn(designTokens.typography.h2, "mb-8 text-3xl")}>
              Notre processus
            </h2>
            <div className="space-y-6">
              {process.map((item) => (
                <Card key={item.step}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <div>
                      <h3 className={cn(designTokens.typography.h4, "mb-1 text-lg")}>
                        {item.title}
                      </h3>
                      <p className="text-pretty text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className={cn(designTokens.typography.h2, "mb-8 text-3xl")}>
              Questions fréquentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-pretty text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className={cn(
                designTokens.typography.h2,
                "text-balance text-3xl md:text-4xl",
              )}
            >
              Prêt à commencer ?
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Obtenez votre devis gratuit en quelques minutes
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/devis">Demander un devis gratuit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
