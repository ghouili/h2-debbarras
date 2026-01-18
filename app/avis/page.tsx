"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Filter } from "lucide-react"
import { siteConfig } from "@/lib/config"
import Link from "next/link"
import { Section } from "@/components/layout/section"

export default function AvisPage() {
  const [filter, setFilter] = useState<string>("all")

  const allTestimonials = [
    ...siteConfig.testimonials,
    {
      name: "Pierre B.",
      location: "Montreuil",
      rating: 5,
      text: "Service rapide et efficace. L'équipe est arrivée à l'heure et a tout débarrassé en quelques heures. Je recommande !",
      service: "Débarras d'appartement",
    },
    {
      name: "Isabelle R.",
      location: "Saint-Germain-en-Laye",
      rating: 5,
      text: "Très professionnel pour le débarras de la maison de mes parents. Ils ont pris le temps de bien trier et ont fait attention aux objets fragiles.",
      service: "Débarras succession",
    },
    {
      name: "Thomas L.",
      location: "Nanterre",
      rating: 5,
      text: "Excellente prestation pour ma cave qui était vraiment encombrée. Prix correct et travail soigné.",
      service: "Débarras de cave",
    },
    {
      name: "Catherine M.",
      location: "Paris 12e",
      rating: 5,
      text: "Je suis très satisfaite du service. L'équipe était respectueuse et a pris soin de ne rien abîmer dans l'appartement.",
      service: "Débarras d'appartement",
    },
    {
      name: "François D.",
      location: "Évry",
      rating: 5,
      text: "Débarras complet de ma maison en une journée. Très bon rapport qualité-prix et équipe sympathique.",
      service: "Débarras de maison",
    },
    {
      name: "Nathalie G.",
      location: "Argenteuil",
      rating: 5,
      text: "Service impeccable du début à la fin. Devis clair, intervention rapide et résultat parfait.",
      service: "Débarras d'appartement",
    },
  ]

  const filteredTestimonials = filter === "all" ? allTestimonials : allTestimonials.filter((t) => t.service === filter)

  const services = ["all", "Débarras d'appartement", "Débarras de maison", "Débarras de cave", "Débarras succession"]

  return (
    <Section>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Avis Clients</h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Découvrez ce que nos clients disent de nos services
          </p>
          <div className="mt-6">
            <p className="text-3xl font-bold text-primary">4.8/5</p>
            <p className="text-sm text-muted-foreground">Basé sur {allTestimonials.length} avis vérifiés</p>
          </div>
        </div>

        {/* Filter */}
        <div className="mt-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 shrink-0 text-muted-foreground" />
            {services.map((service) => (
              <Button
                key={service}
                variant={filter === service ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(service)}
                className="shrink-0"
              >
                {service === "all" ? "Tous" : service}
              </Button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((testimonial, index) => (
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

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Rejoignez nos clients satisfaits</p>
          <Button size="lg" asChild>
            <Link href="/devis">Demander un devis gratuit</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
