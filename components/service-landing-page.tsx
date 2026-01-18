"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Clock, 
  Shield, 
  Star, 
  MapPin,
  Sparkles,
  Truck,
  Recycle,
  Users,
  Award,
  Calendar,
  FileText,
  Zap,
  Heart,
  Leaf,
  type LucideIcon
} from "lucide-react"
import { siteConfig } from "@/lib/config"
import { Section } from "@/components/layout/section"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

// Icon mapping for dynamic icons
const iconMap: Record<string, LucideIcon> = {
  home: require("lucide-react").Home,
  warehouse: require("lucide-react").Warehouse,
  heart: Heart,
  armchair: require("lucide-react").Armchair,
  microwave: require("lucide-react").Microwave,
  package: require("lucide-react").Package,
  leaf: Leaf,
  truck: Truck,
  "package-check": require("lucide-react").PackageCheck,
  map: require("lucide-react").Map,
  zap: Zap,
  archive: require("lucide-react").Archive,
  "building-2": require("lucide-react").Building2,
  store: require("lucide-react").Store,
  "hard-hat": require("lucide-react").HardHat,
  briefcase: require("lucide-react").Briefcase,
  "paint-brush": require("lucide-react").Paintbrush,
  building: require("lucide-react").Building,
  shield: Shield,
  "spray-can": require("lucide-react").SprayCan,
  droplet: require("lucide-react").Droplet,
  sparkles: Sparkles,
  "check-circle": CheckCircle2,
  broom: require("lucide-react").Brush,
}

export type ServiceLandingProps = {
  service: {
    id: string
    title: string
    slug: string
    icon: string
    description: string
    shortDescription: string
    features: readonly string[]
  }
  category: "debarras" | "demenagement" | "nettoyage"
  clientType: "particulier" | "professionnel"
  relatedServices?: Array<{
    title: string
    slug: string
    shortDescription: string
  }>
}

export function ServiceLandingPage({ 
  service, 
  category, 
  clientType,
  relatedServices = []
}: ServiceLandingProps) {
  const Icon = iconMap[service.icon] || require("lucide-react").HelpCircle
  
  const categoryLabels = {
    debarras: "Débarras",
    demenagement: "Déménagement", 
    nettoyage: "Nettoyage"
  }

  // Category-specific benefits
  const categoryBenefits = {
    debarras: [
      { icon: Clock, title: "Intervention rapide", text: "Sous 24 à 48h selon urgence" },
      { icon: Recycle, title: "Tri écoresponsable", text: "Recyclage et don aux associations" },
      { icon: FileText, title: "Devis transparent", text: "Prix fixe sans surprise" },
      { icon: Shield, title: "Équipe assurée", text: "RC Pro et garantie décennale" },
    ],
    demenagement: [
      { icon: Truck, title: "Véhicules adaptés", text: "Camions tous volumes" },
      { icon: Shield, title: "Biens assurés", text: "Protection pendant le transport" },
      { icon: Calendar, title: "Planning flexible", text: "Week-end et soirées disponibles" },
      { icon: Users, title: "Équipe expérimentée", text: "Déménageurs professionnels" },
    ],
    nettoyage: [
      { icon: Sparkles, title: "Propreté garantie", text: "Résultat impeccable" },
      { icon: Leaf, title: "Produits éco", text: "Respectueux de l'environnement" },
      { icon: Clock, title: "Intervention rapide", text: "Disponibilité immédiate" },
      { icon: Award, title: "Personnel qualifié", text: "Formation continue" },
    ],
  }

  // Get testimonials
  const displayTestimonials = siteConfig.testimonials.slice(0, 3)

  // Category-specific FAQs
  const categoryFaqs = [...siteConfig.faqs.flatMap(cat => [...cat.questions])].slice(0, 5) as Array<{ q: string; a: string }>

  return (
    <div className="flex flex-col">
      
      {/* Hero Section */}
      <Section bleed className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-background to-primary-100/50">
        {/* Gradient orbs */}
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary-300/20 blur-3xl" />
        
        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>{clientType === "particulier" ? "Particuliers" : "Professionnels"} • {categoryLabels[category]}</span>
            </div>
            
            {/* Title */}
            <h1 className={cn(designTokens.typography.h2, "text-balance")}>
              {service.title} <span className="text-primary">en Île-de-France</span>
            </h1>
            
            <p className={cn(designTokens.typography.lead, "text-pretty max-w-xl")}>
              {service.description}
            </p>
            
            {/* Trust bullets */}
            <div className="flex flex-col gap-3">
              {service.features.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-base font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className={cn(designTokens.button.primary, "h-14 px-8 text-base")} asChild>
                <Link href="/devis">
                  Devis gratuit en 2 min
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className={cn(designTokens.button.secondary, "h-14 px-8 text-base bg-background")} asChild>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
            
            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-6 border-t border-border/50 pt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <div className="leading-tight">
                  <span className="block font-medium text-foreground">4.9/5</span>
                  <span className="block text-xs text-muted-foreground">avis clients</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>+500 interventions</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Toute l'Île-de-France</span>
              </div>
            </div>
          </div>
          
          {/* Right: Visual Card */}
          <div className="relative lg:order-last">
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-2xl shadow-black/10">
              {/* Service icon & title */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{service.title}</p>
                  <p className="text-sm text-muted-foreground">{service.shortDescription}</p>
                </div>
              </div>
              
              {/* Key guarantees */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Devis gratuit & sans engagement</p>
                    <p className="text-sm text-muted-foreground">Réponse sous 2h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Intervention rapide 24-48h</p>
                    <p className="text-sm text-muted-foreground">Selon disponibilité</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Entreprise assurée</p>
                    <p className="text-sm text-muted-foreground">RC Pro & garantie décennale</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Recycle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Tri écoresponsable</p>
                    <p className="text-sm text-muted-foreground">Recyclage & don aux associations</p>
                  </div>
                </div>
              </div>
              
              {/* Zone */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Zone d'intervention</p>
                    <p className="text-muted-foreground">Paris & Île-de-France (75, 77, 78, 91, 92, 93, 94, 95)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Pourquoi nous choisir ?
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Un service professionnel, fiable et adapté à vos besoins
          </p>
        </div>
        
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categoryBenefits[category].map((benefit, index) => (
            <Card key={index} className="group transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
                <CardDescription>{benefit.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Features Section */}
      <Section bleed className="bg-secondary">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ce qui est inclus
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            {service.shortDescription}
          </p>
        </div>
        
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {service.features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 rounded-lg bg-card p-4 border border-border"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Un processus simple en 4 étapes
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.process.map((step, index) => (
            <div key={step.step} className="relative">
              {index < siteConfig.process.length - 1 && (
                <div className="absolute top-8 left-1/2 hidden h-0.5 w-full bg-border lg:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {step.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-pretty text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section bleed className="bg-secondary">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Découvrez les avis de nos clients
          </p>
        </div>
        
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {displayTestimonials.map((testimonial, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-muted-foreground">"{testimonial.text}"</p>
                
                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>
        
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {categoryFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-pretty text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Related Services */}
      {/* {relatedServices.length > 0 && (
        <Section bleed className="bg-secondary">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Services associés
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Découvrez nos autres prestations
            </p>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {relatedServices.slice(0, 3).map((related, index) => (
              <Card key={index} className="group transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{related.title}</CardTitle>
                  <CardDescription className="text-pretty">{related.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" asChild className="group/btn w-full justify-between">
                    <Link href={`/services/${related.slug}`}>
                      En savoir plus
                      <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      )} */}

      {/* Final CTA Section */}
      <Section bleed className="bg-gradient-to-b from-primary-100 via-primary-50/50 to-background">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Obtenez votre devis gratuit en quelques minutes. Notre équipe vous recontacte sous 2h.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className={cn(designTokens.button.primary, "h-14 px-8 text-base")} asChild>
              <Link href="/devis">
                Demander un devis gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className={cn(designTokens.button.secondary, "h-14 px-8 text-base")} asChild>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                <Phone className="mr-2 h-5 w-5" />
                {siteConfig.contact.phone}
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            ✓ Devis gratuit et sans engagement • ✓ Réponse sous 2h • ✓ Intervention rapide
          </p>
        </div>
      </Section>
    </div>
  )
}
