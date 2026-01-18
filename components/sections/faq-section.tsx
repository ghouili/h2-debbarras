import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { siteConfig } from "@/lib/config"
import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"

export function FaqSection() {
  const displayQuestions = siteConfig.faqs[0].questions.slice(0, 4)
  const copy = homeCopy.faqTeaser

  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{copy.title}</h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">{copy.subtitle}</p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {displayQuestions.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-pretty text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/faq">{copy.cta}</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
