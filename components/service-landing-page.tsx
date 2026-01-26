"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  Clock,
  Shield,
  Star,
  Home,
  Warehouse,
  Armchair,
  Microwave,
  Package,
  PackageCheck,
  Map,
  Archive,
  Building2,
  Store,
  HardHat,
  Briefcase,
  Building,
  HelpCircle,
  MapPin,
  Sparkles,
  Truck,
  Recycle,
  Users,
  Calendar,
  FileText,
  Zap,
  Heart,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import {
  clampRating,
  formatRating,
  getDisplayTestimonials,
  getTestimonialsByService,
} from "@/lib/testimonials";
import { Section } from "@/components/layout/section";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Icon mapping for dynamic icons
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  warehouse: Warehouse,
  heart: Heart,
  armchair: Armchair,
  microwave: Microwave,
  package: Package,
  leaf: Leaf,
  truck: Truck,
  "package-check": PackageCheck,
  map: Map,
  zap: Zap,
  archive: Archive,
  "building-2": Building2,
  store: Store,
  "hard-hat": HardHat,
  briefcase: Briefcase,
  building: Building,
  shield: Shield,
  sparkles: Sparkles,
  "check-circle": CheckCircle2,
};

export type ServiceLandingProps = {
  service: {
    id: string;
    campaignGroup?: string;
    campaignKey?: string;
    title: string;
    slug: string;
    icon: string;
    description: string;
    shortDescription: string;
    features: readonly string[];
  };
  category: "debarras" | "demenagement";
  clientType: "particulier" | "professionnel";
  relatedServices?: Array<{
    title: string;
    slug: string;
    shortDescription: string;
  }>;
};

export function ServiceLandingPage({
  service,
  category,
  clientType,
  relatedServices = [],
}: ServiceLandingProps) {
  const Icon = iconMap[service.icon] || HelpCircle;

  const categoryLabels = {
    debarras: "Débarras",
    demenagement: "Déménagement",
  };

  // Category-specific benefits
  const categoryBenefits = {
    debarras: [
      {
        icon: Clock,
        title: "Intervention rapide",
        text: "Sous 24 à 48h selon urgence",
      },
      {
        icon: Recycle,
        title: "Tri écoresponsable",
        text: "Recyclage et don aux associations",
      },
      {
        icon: FileText,
        title: "Devis transparent",
        text: "Prix fixe sans surprise",
      },
      {
        icon: Shield,
        title: "Équipe assurée",
        text: "RC Pro et garantie décennale",
      },
    ],
    demenagement: [
      { icon: Truck, title: "Véhicules adaptés", text: "Camions tous volumes" },
      {
        icon: Shield,
        title: "Biens assurés",
        text: "Protection pendant le transport",
      },
      {
        icon: Calendar,
        title: "Planning flexible",
        text: "Week-end et soirées disponibles",
      },
      {
        icon: Users,
        title: "Équipe expérimentée",
        text: "Déménageurs professionnels",
      },
    ],
  };

  // Get testimonials from dedicated module
  const testimonialsTag = service.campaignKey ?? service.slug;
  const serviceTestimonials = getTestimonialsByService(testimonialsTag);
  const displayTestimonials = (
    serviceTestimonials.length ? serviceTestimonials : getDisplayTestimonials(3)
  ).slice(0, 3);

  // Category-specific FAQs
  const categoryFaqs = [
    ...siteConfig.faqs.flatMap((cat) => [...cat.questions]),
  ].slice(0, 5) as Array<{ q: string; a: string }>;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Section
        bleed
        className="relative overflow-hidden bg-linear-to-br from-primary-50 via-background to-primary-100/50"
      >
        {/* Gradient orbs */}
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary-300/20 blur-3xl" />

        <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Left: Content */}
          <div className="flex flex-col gap-3 sm:gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary border border-primary/20 shadow-sm sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
              <Image
                src={"/optimized/icons/special-icon-w40.png"}
                width={24}
                height={24}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 sm:h-6 sm:w-6"
              />
              <span>
                {clientType === "particulier"
                  ? "Particuliers"
                  : "Pro"}{" "}
                • {categoryLabels[category]}
              </span>
            </div>

            {/* Title - Responsive typography */}
            <h1 className="text-balance text-xl font-bold tracking-tight leading-tight sm:text-3xl lg:text-4xl">
              {service.title}{" "}
              <span className="text-primary">en Île-de-France</span>
            </h1>

            <p className="text-pretty text-xs text-muted-foreground sm:text-base lg:text-lg max-w-xl">
              {service.description}
            </p>

            {/* Trust bullets */}
            <div className="flex flex-col gap-1.5 sm:gap-3">
              {service.features.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-center gap-1.5 sm:gap-3">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:h-6 sm:w-6">
                    <CheckCircle2 className="h-2.5 w-2.5 text-primary sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-xs font-medium text-foreground sm:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs - Stack on mobile */}
            <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:gap-3">
              <Button
                size="lg"
                className={cn(
                  designTokens.button.primary,
                  "min-h-11 w-full px-3 text-xs sm:w-auto sm:px-6 sm:text-sm",
                )}
                asChild
              >
                <Link href="/devis">
                  Devis gratuit
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  designTokens.button.secondary,
                  "min-h-11 w-full px-3 text-xs bg-background sm:w-auto sm:px-6 sm:text-sm",
                )}
                asChild
              >
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>

            {/* Trust strip - Full width, wraps properly */}
            <div className="flex w-full flex-wrap items-center justify-center gap-2.5 border-t border-border/50 pt-3 text-[10px] sm:justify-start sm:gap-6 sm:pt-6 sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-500 text-yellow-500 sm:h-4 sm:w-4"
                    />
                  ))}
                </div>
                <div className="leading-tight">
                  <span className="font-medium text-foreground">4.9/5</span>
                  <span className="text-muted-foreground ml-0.5 sm:ml-1">avis</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground sm:gap-2">
                <CheckCircle2 className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                <span>+500 interventions</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground sm:gap-2">
                <MapPin className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                <span>Île-de-France</span>
              </div>
            </div>
          </div>

          {/* Right: Visual Card - Shows below content on mobile */}
          <div className="relative order-last lg:order-0">
            <div className="rounded-xl border border-border/50 bg-card p-3 shadow-xl shadow-black/5 sm:rounded-2xl sm:p-6 sm:shadow-2xl sm:shadow-black/10">
              {/* Service icon & title */}
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-border sm:gap-4 sm:mb-6 sm:pb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-14 sm:w-14 sm:rounded-xl">
                  <Icon className="h-5 w-5 text-primary sm:h-7 sm:w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm leading-tight sm:text-lg">{service.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 sm:text-sm">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              {/* Key guarantees */}
              <div className="space-y-2 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-500/10 sm:h-8 sm:w-8 sm:rounded-lg">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-xs sm:text-base">Devis gratuit & sans engagement</p>
                    <p className="text-[10px] text-muted-foreground sm:text-sm">Réponse sous 2h</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 sm:h-8 sm:w-8 sm:rounded-lg">
                    <Clock className="h-3.5 w-3.5 text-primary sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-xs sm:text-base">Intervention rapide 24-48h</p>
                    <p className="text-[10px] text-muted-foreground sm:text-sm">Selon disponibilité</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 sm:h-8 sm:w-8 sm:rounded-lg">
                    <Shield className="h-3.5 w-3.5 text-primary sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-xs sm:text-base">Entreprise assurée</p>
                    <p className="text-[10px] text-muted-foreground sm:text-sm">RC Pro & garantie</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 sm:h-8 sm:w-8 sm:rounded-lg">
                    <Recycle className="h-3.5 w-3.5 text-primary sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-xs sm:text-base">Tri écoresponsable</p>
                    <p className="text-[10px] text-muted-foreground sm:text-sm">Recyclage & dons</p>
                  </div>
                </div>
              </div>

              {/* Zone */}
              <div className="mt-3 pt-3 border-t border-border sm:mt-6 sm:pt-6">
                <div className="flex items-start gap-2 text-sm sm:gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5 sm:h-5 sm:w-5" />
                  <div className="min-w-0">
                    <p className="font-medium text-xs sm:text-base">Zone d'intervention</p>
                    <p className="text-[10px] text-muted-foreground sm:text-sm">
                      Paris & Île-de-France (75, 77, 78, 91, 92, 93, 94, 95)
                    </p>
                    <Link
                      href="/zones"
                      className="inline-flex items-center text-xs text-primary hover:underline mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded min-h-8 sm:text-sm"
                    >
                      Voir zones
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits Section - 2x2 on mobile, 4 cols on lg */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Pourquoi nous choisir ?
          </h2>
          <p className="mt-2 text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">
            Service professionnel et adapté à vos besoins
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-10 sm:gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {categoryBenefits[category].map((benefit, index) => (
            <Card
              key={index}
              className="group h-full transition-shadow hover:shadow-lg"
            >
              <CardHeader className="p-2.5 sm:p-4 lg:p-6">
                <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 transition-colors group-hover:bg-primary/20 sm:mb-3 sm:h-12 sm:w-12 sm:rounded-lg">
                  <benefit.icon className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
                </div>
                <CardTitle className="text-xs font-semibold sm:text-base lg:text-lg">{benefit.title}</CardTitle>
                <CardDescription className="text-[10px] sm:text-sm">{benefit.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Features Section - Ce qui est inclus */}
      <Section bleed className="bg-secondary">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Ce qui est inclus
          </h2>
          <p className="mt-2 text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">
            {service.shortDescription}
          </p>
        </div>

        <div className="mx-auto mt-4 max-w-2xl sm:mt-8 lg:mt-10">
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="flex min-h-10 items-center gap-2 rounded-md bg-card p-2.5 border border-border sm:min-h-11 sm:gap-3 sm:rounded-xl sm:p-4"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:h-8 sm:w-8">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary sm:h-5 sm:w-5" />
                </div>
                <span className="text-xs font-medium sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Process Section - Vertical on mobile, grid on larger screens */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Comment ça marche ?
          </h2>
          <p className="mt-2 text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">
            Un processus simple en 4 étapes
          </p>
        </div>

        {/* Mobile: Vertical list */}
        <div className="mt-4 space-y-3 sm:hidden">
          {siteConfig.process.map((step) => (
            <div key={step.step} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {step.step}
              </div>
              <div className="flex-1 pt-0.5">
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet+: Grid layout */}
        <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-4 lg:gap-8">
          {siteConfig.process.map((step, index) => (
            <div key={step.step} className="relative">
              {index < siteConfig.process.length - 1 && (
                <div className="absolute top-6 left-1/2 hidden h-0.5 w-full bg-border lg:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground lg:mb-4 lg:h-14 lg:w-14 lg:text-2xl">
                  {step.step}
                </div>
                <h3 className="mb-1.5 text-base font-semibold lg:mb-2 lg:text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials Section - Stacked on mobile, grid on md+ */}
      <Section bleed className="bg-secondary">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Ils nous font confiance
          </h2>
          <p className="mt-2 text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">
            Découvrez les avis de nos clients
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:mt-8 sm:gap-5 md:grid-cols-3 lg:mt-10 lg:gap-6">
          {displayTestimonials.map((testimonial) => {
            const rating = clampRating(testimonial.rating);
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;

            return (
              <Card
                key={testimonial.id}
                className="h-full transition-shadow hover:shadow-lg"
              >
                <CardContent className="p-3 sm:pt-6">
                  {/* Stars */}
                  <div className="mb-2 flex items-center gap-1.5 sm:mb-4 sm:gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: fullStars }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 sm:h-5 sm:w-5"
                        />
                      ))}
                      {hasHalfStar && (
                        <Star className="h-3.5 w-3.5 fill-yellow-500/50 text-yellow-500 sm:h-5 sm:w-5" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground sm:text-sm">
                      {formatRating(rating)}
                    </span>
                  </div>

                  {/* Quote - Line clamp on mobile */}
                  <p className="text-xs text-muted-foreground line-clamp-4 sm:text-base sm:line-clamp-none">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="mt-3 flex items-center gap-2 border-t border-border pt-2.5 sm:mt-6 sm:gap-3 sm:pt-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary sm:h-10 sm:w-10 sm:text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold sm:text-base">{testimonial.name}</p>
                      {testimonial.location ? (
                        <p className="text-[10px] text-muted-foreground sm:text-sm truncate">
                          {testimonial.location}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Questions fréquentes
          </h2>
          <p className="mt-2 text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">
            Trouvez les réponses à vos questions
          </p>
        </div>

        <div className="mx-auto mt-4 max-w-3xl sm:mt-8 lg:mt-10">
          <Accordion type="single" collapsible className="w-full">
            {categoryFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="min-h-10 py-2.5 text-left text-xs font-medium sm:min-h-11 sm:py-4 sm:text-base [&>svg]:h-3.5 [&>svg]:w-3.5 sm:[&>svg]:h-4 sm:[&>svg]:w-4 [&>svg]:shrink-0">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground sm:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Related Services + Internal links */}
      <Section bleed className="bg-secondary">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Explorer nos services
          </h2>
          <p className="mt-2 text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">
            Découvrez nos prestations
          </p>
        </div>

        {relatedServices.length > 0 && (
          <div className="mt-4 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3 lg:gap-6">
            {relatedServices.slice(0, 3).map((related, index) => (
              <Card
                key={index}
                className="group h-full transition-shadow hover:shadow-lg"
              >
                <CardHeader className="p-3 sm:p-6">
                  <CardTitle className="text-sm font-semibold sm:text-lg lg:text-xl">{related.title}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2 sm:text-sm sm:line-clamp-none">
                    {related.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                  <Button
                    variant="outline"
                    asChild
                    className="group/btn min-h-10 w-full justify-between text-xs sm:min-h-11 sm:text-sm"
                  >
                    <Link href={`/services/${related.slug}`}>
                      En savoir plus
                      <span className="sr-only"> — {related.title}</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1 sm:h-4 sm:w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:mt-8 sm:flex-row sm:gap-3">
          <Button variant="outline" asChild className="min-h-10 w-full text-xs sm:min-h-11 sm:w-auto sm:text-sm">
            <Link href="/services">Tous les services</Link>
          </Button>
          <Button variant="outline" asChild className="min-h-10 w-full text-xs sm:min-h-11 sm:w-auto sm:text-sm">
            <Link href="/zones">Zones d'intervention</Link>
          </Button>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section
        bleed
        className="bg-linear-to-b from-primary-100 via-primary-50/50 to-background"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Prêt à démarrer ?
          </h2>
          <p className="mt-2 text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">
            Devis gratuit en quelques minutes. Réponse sous 2h.
          </p>

          <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:mt-6 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className={cn(designTokens.button.primary, "min-h-11 w-full px-3 text-xs sm:w-auto sm:px-6 sm:text-sm")}
              asChild
            >
              <Link href="/devis">
                <Image
                  src="/optimized/icons/devis-icon-white-w32.png"
                  width={16}
                  height={16}
                  alt=""
                  className="mr-1.5 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5"
                />
                Devis gratuit
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={cn(
                designTokens.button.secondary,
                "min-h-11 w-full px-3 text-xs sm:w-auto sm:px-6 sm:text-sm",
              )}
              asChild
            >
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                <Phone className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                {siteConfig.contact.phone}
              </a>
            </Button>
          </div>

          <p className="mt-3 text-[10px] text-muted-foreground sm:mt-6 sm:text-sm">
            ✓ Devis gratuit • ✓ Réponse 2h • ✓ Intervention rapide
          </p>
        </div>
      </Section>
    </div>
  );
}
