import { CheckCircle2, Phone } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LandingQuoteForm } from "@/components/forms/landing-quote-form";
import { siteConfig } from "@/lib/config";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { LandingPageContent, LandingReview } from "@/lib/content/landing-pages";

const telHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

function HeroCtas({ phone }: { phone: string }) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button asChild size="lg" className={cn(designTokens.button.primary, "min-h-12")}>
        <a href="#devis">Demander un devis gratuit →</a>
      </Button>
      <Button asChild variant="outline" size="lg" className={cn(designTokens.button.secondary, "min-h-12 gap-2")}>
        <a href={telHref}>
          <Phone className="h-4 w-4" />
          {phone}
        </a>
      </Button>
    </div>
  );
}

function ReviewCard({ review }: { review: LandingReview }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-3 p-6">
        <div aria-label={`${review.rating} sur 5`}>{"⭐".repeat(review.rating)}</div>
        <p className={cn(designTokens.textScale.base, "flex-1 text-pretty italic text-muted-foreground")}>
          “{review.text}”
        </p>
        <p className={cn(designTokens.textScale.base, "font-semibold")}>
          {review.author} — {review.location}
          <span className="block font-normal text-muted-foreground">{review.service}</span>
        </p>
      </CardContent>
    </Card>
  );
}

function ProcessSteps({
  process,
}: {
  process: NonNullable<LandingPageContent["process"]>;
}) {
  return (
    <Section bleed className="bg-secondary">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className={cn(designTokens.typography.h2, designTokens.textScale["2xl3xl"], "text-balance")}>
          {process.heading}
        </h2>
      </div>
      <ol className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, index) => (
          <li key={`${step.title}-${index}`} className="relative">
            {index < process.steps.length - 1 && (
              <div className="absolute top-6 left-1/2 hidden h-0.5 w-full bg-border lg:block" aria-hidden="true" />
            )}
            <div className="relative flex flex-col items-center text-center">
              <div
                className={cn(
                  designTokens.textScale.baseLg,
                  "mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground sm:h-14 sm:w-14",
                )}
                aria-hidden="true"
              >
                {index + 1}
              </div>
              <h3 className={cn(designTokens.typography.h4, designTokens.textScale.baseLg, "mb-1.5")}>
                {step.title}
              </h3>
              <p className={cn(designTokens.textScale.base, "text-pretty text-muted-foreground")}>
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function LandingPageTemplate({ content }: { content: LandingPageContent }) {
  const phone = siteConfig.contact.phone;

  return (
    <>
      {/* Hero */}
      <Section className="bg-linear-to-b from-primary-50/60 via-background to-background">
        <div className="mx-auto max-w-3xl">
          <span
            className={cn(
              designTokens.textScale.xsSm,
              "inline-block rounded-full bg-primary/10 px-3 py-1 font-medium text-primary",
            )}
          >
            {content.hero.badge}
          </span>
          <h1 className={cn(designTokens.typography.h1, "mt-4 text-balance")}>{content.hero.h1}</h1>
          <p className={cn(designTokens.textScale.lg, "mt-4 text-pretty text-muted-foreground")}>
            {content.hero.subtitle}
          </p>
          <ul className="mt-6 space-y-2">
            {content.hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <span className={designTokens.textScale.base}>{b}</span>
              </li>
            ))}
          </ul>
          <HeroCtas phone={phone} />
          <p className={cn(designTokens.textScale.base, "mt-5 text-muted-foreground")}>{content.hero.trustBar}</p>
        </div>
      </Section>

      {/* Reassurance cards */}
      <Section className="bg-background">
        <h2 className={cn(designTokens.typography.h2, "mb-8 text-center")}>{content.reassurance.heading}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.reassurance.cards.map((card) => (
            <Card key={card.title} className="h-full text-center">
              <CardContent className="flex h-full flex-col items-center gap-2 p-6">
                <span className="text-3xl" aria-hidden="true">
                  {card.icon}
                </span>
                <h3 className={cn(designTokens.textScale.baseLg, "font-bold")}>{card.title}</h3>
                <p className={cn(designTokens.textScale.base, "text-muted-foreground")}>{card.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process — same style as the service pages (between reassurance and reviews) */}
      {content.process && <ProcessSteps process={content.process} />}

      {/* What's included */}
      {content.included && (
        <Section className="bg-secondary/40">
          <h2 className={cn(designTokens.typography.h2, "mb-8 text-center text-balance")}>
            {content.included.heading}
          </h2>
          <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {content.included.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <span className={designTokens.textScale.base}>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Two-column (individuals / businesses) */}
      {content.twoColumn && (
        <Section className="bg-secondary/40">
          <h2 className={cn(designTokens.typography.h2, "mb-8 text-center")}>{content.twoColumn.heading}</h2>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {[content.twoColumn.left, content.twoColumn.right].map((col) => (
              <Card key={col.title} className="h-full">
                <CardContent className="p-6">
                  <h3 className={cn(designTokens.typography.h3, "mb-4")}>{col.title}</h3>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                        <span className={designTokens.textScale.base}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Reviews */}
      <Section className="bg-secondary/40">
        {content.reviews.heading && (
          <h2 className={cn(designTokens.typography.h2, "mb-8 text-center")}>{content.reviews.heading}</h2>
        )}
        <div
          className={cn(
            "mx-auto grid max-w-4xl gap-4",
            content.reviews.items.length > 1 ? "md:grid-cols-2" : "max-w-2xl",
          )}
        >
          {content.reviews.items.map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
        </div>
      </Section>

      {/* Form */}
      <div id="devis" className="scroll-mt-20" />
      <Section className="bg-background">
        <div className="mx-auto max-w-2xl">
          <h2 className={cn(designTokens.typography.h2, "text-center")}>{content.form.heading}</h2>
          <p className={cn(designTokens.textScale.base, "mt-2 mb-6 text-center text-muted-foreground")}>
            {content.form.subtitle}
          </p>
          <Card className="border-border/60 shadow-lg">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <LandingQuoteForm defaultService={content.defaultService} />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-secondary/40">
        <div className="mx-auto max-w-3xl">
          <h2 className={cn(designTokens.typography.h2, "mb-8 text-center")}>{content.faq.heading}</h2>
          <Accordion type="single" collapsible className="w-full">
            {content.faq.items.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className={cn(designTokens.textScale.base, "text-muted-foreground")}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-background">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={cn(designTokens.typography.h2, "text-balance")}>{content.finalCta.heading}</h2>
          <p className={cn(designTokens.textScale.lg, "mt-3 text-muted-foreground")}>{content.finalCta.text}</p>
          <HeroCtas phone={phone} />
        </div>
      </Section>
    </>
  );
}
