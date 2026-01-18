import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"

export function TestimonialsSection() {
  const copy = homeCopy.reviewsTeaser

  return (
    <Section bleed className="bg-secondary">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{copy.title}</h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">{copy.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {siteConfig.testimonials.map((testimonial, index) => (
          <Card key={index} className="w-full">
            <CardContent className="p-6">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="mb-4 text-pretty text-muted-foreground">"{testimonial.text}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <p className="mt-1 text-xs text-primary">{testimonial.service}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
