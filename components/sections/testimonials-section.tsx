import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { homeCopy } from "@/lib/content/home-copy";
import { Section } from "@/components/layout/section";

export function TestimonialsSection() {
  const copy = homeCopy.reviewsTeaser;

  return (
    <Section bleed className="bg-secondary">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
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
                <blockquote className="mb-4 text-pretty text-sm text-muted-foreground sm:text-base">
                  "{testimonial.text}"
                </blockquote>
              </div>
              <footer className="border-t border-border pt-3 sm:pt-4">
                <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {testimonial.location}
                </p>
                <p className="mt-1 text-xs text-primary">
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
