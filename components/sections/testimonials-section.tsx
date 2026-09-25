import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { homeCopy } from "@/lib/content/home-copy";
import { Section } from "@/components/layout/section";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const copy = homeCopy.reviewsTeaser;

  return (
    <Section bleed className="bg-secondary">
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

      <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.testimonials.map((testimonial, index) => (
          <Card key={index} className="w-full h-full">
            <CardContent className="px-5 sm:px-6 min-h-56 sm:min-h-64 flex flex-col justify-between">
              <div>
                <div className="mb-3 flex gap-0.5">
                  <span className="sr-only">Note : {testimonial.rating} sur 5</span>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote
                  className={cn(
                    designTokens.textScale.base,
                    "mb-4 text-pretty text-muted-foreground",
                  )}
                >
                  "{testimonial.text}"
                </blockquote>
              </div>
              <footer className="border-t border-border pt-3 sm:pt-4">
                <p className={cn(designTokens.textScale.base, "font-semibold")}>
                  {testimonial.name}
                </p>
                <p className={cn(designTokens.textScale.base, "text-muted-foreground")}>
                  {testimonial.location}
                </p>
                <p className={cn(designTokens.textScale.base, "mt-1 text-primary")}>
                  {testimonial.service}
                </p>
              </footer>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
