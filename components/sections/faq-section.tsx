import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { siteConfig } from "@/lib/config"
import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"
import { cn } from "@/lib/utils"
import { designTokens } from "@/lib/design-tokens"

export function FaqSection() {
  const displayQuestions = siteConfig.faqs[0].questions.slice(0, 4)
  const copy = homeCopy.faqTeaser

  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={cn(
            designTokens.typography.h2,
            designTokens.textScale["2xl3xl"],
            "text-balance",
          )}
        >
          {copy.title}
        </h2>
        <p
          className={cn(
            designTokens.textScale.baseLg,
            "mt-3 text-pretty text-muted-foreground",
          )}
        >
          {copy.subtitle}
        </p>
      </div>

      <div className="mx-auto mt-8 sm:mt-10 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {displayQuestions.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className={cn(designTokens.textScale.xs, "text-left")}>
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  designTokens.textScale.xs,
                  "text-pretty text-muted-foreground",
                )}
              >
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-6 sm:mt-8 text-center">
          <Button
            variant="outline"
            asChild
            className={cn(
              designTokens.button.secondary,
              designTokens.textScale.xs,
              "min-h-11 h-10 sm:h-12 px-4 sm:px-6",
            )}
          >
            <Link href="/faq">{copy.cta}</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
