"use client";

import { useState, useMemo, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Building2,
  Award,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { designTokens } from "@/lib/design-tokens";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

// =============================================================================
// TESTIMONIAL DATA
// =============================================================================

const ALL_TESTIMONIALS = [
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
];

const SERVICES_FILTER = [
  { value: "all", label: "Tous les avis" },
  { value: "Débarras d'appartement", label: "Appartement" },
  { value: "Débarras de maison", label: "Maison" },
  { value: "Débarras de cave", label: "Cave" },
  { value: "Débarras succession", label: "Succession" },
];

const TRUST_STATS = [
  { icon: Users, value: "500+", label: "Clients satisfaits" },
  { icon: Building2, value: "8", label: "Départements couverts" },
  { icon: Clock, value: "24-48h", label: "Intervention rapide" },
  { icon: Award, value: "4.8/5", label: "Note moyenne" },
];

const AVIS_FAQS = [
  {
    q: "Les avis sont-ils authentiques ?",
    a: "Oui, tous les avis proviennent de clients réels ayant fait appel à nos services de débarras. Nous affichons les retours tels quels, positifs comme constructifs.",
  },
  {
    q: "Puis-je laisser un avis après mon intervention ?",
    a: "Absolument ! Après chaque intervention, nous envoyons un lien pour recueillir votre avis. Votre retour nous aide à améliorer nos services.",
  },
  {
    q: "Comment garantissez-vous la qualité du service ?",
    a: "Nous formons nos équipes régulièrement, utilisons du matériel professionnel et suivons des protocoles stricts pour garantir un service irréprochable à chaque intervention.",
  },
  {
    q: "Que faire si je ne suis pas satisfait ?",
    a: "Votre satisfaction est notre priorité. En cas de souci, contactez-nous dans les 48h et nous trouverons une solution adaptée à votre situation.",
  },
];

// =============================================================================
// HERO SECTION
// =============================================================================

const HeroSection = memo(function HeroSection({
  totalReviews,
}: {
  totalReviews: number;
}) {
  return (
    <Section className="bg-linear-to-b from-primary-50/60 via-background to-background">
      <div className="mx-auto max-w-4xl px-3 text-center sm:px-6">
        {/* Star rating badge */}
        <div className="mx-auto mb-3 inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-1 sm:mb-4 sm:gap-1.5 sm:px-4 sm:py-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 sm:h-5 sm:w-5"
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-yellow-700 sm:text-base">
            4.8/5
          </span>
        </div>

        {/* H1 - responsive */}
        <h1 className="text-balance text-xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Avis Clients
        </h1>
        <p className="text-balance text-xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Débarras & Déménagement
        </p>
        <p className="mx-auto mt-2 max-w-xl text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base md:text-lg">
          Retours de nos clients en Île-de-France. {totalReviews}+ interventions
          avec 98% de satisfaction.
        </p>

        {/* CTAs - stack on mobile */}
        <div className="mt-4 flex flex-col items-center gap-2 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
          <Button
            asChild
            size="lg"
            className={cn(
              "min-h-11 w-full gap-1.5 px-4 text-xs sm:w-auto sm:gap-2 sm:px-6 sm:text-sm",
              designTokens.button.primary,
            )}
          >
            <Link href="/devis">
              <Image
                src="/special-icon.png"
                width={20}
                height={20}
                alt=""
                className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
              />
              Devis gratuit
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className={cn(
              "min-h-11 w-full gap-1.5 px-4 text-xs sm:w-auto sm:gap-2 sm:px-6 sm:text-sm",
              designTokens.button.secondary,
            )}
          >
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {siteConfig.contact.phone}
            </a>
          </Button>
        </div>

        {/* Trust line */}
        <p className="mt-3 text-[10px] text-muted-foreground sm:mt-4 sm:text-sm">
          <CheckCircle2 className="mr-0.5 inline h-3 w-3 text-green-600 sm:mr-1 sm:h-3.5 sm:w-3.5" />
          Devis gratuit • Réponse 2h • Sans engagement
        </p>
      </div>
    </Section>
  );
});

// =============================================================================
// TRUST STATS ROW
// =============================================================================

const TrustStatsRow = memo(function TrustStatsRow() {
  return (
    <Section className="bg-slate-50/80 py-4 sm:py-8">
      <div className="mx-auto max-w-5xl px-3 sm:px-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
          {TRUST_STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-lg bg-white p-2.5 text-center shadow-sm sm:rounded-xl sm:p-4"
            >
              <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 sm:mb-2 sm:h-11 sm:w-11">
                <Icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              </div>
              <span className="text-sm font-bold text-foreground sm:text-xl">
                {value}
              </span>
              <span className="text-[10px] text-muted-foreground sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});

// =============================================================================
// FILTER TABS (Segmented Control)
// =============================================================================

interface FilterTabsProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

const FilterTabs = memo(function FilterTabs({
  filter,
  onFilterChange,
}: FilterTabsProps) {
  return (
    <div className="mx-auto max-w-5xl px-3 sm:px-6">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin sm:gap-2">
        {SERVICES_FILTER.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all min-h-10 sm:min-h-11 sm:px-4 sm:py-2 sm:text-sm",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              filter === value
                ? "bg-primary text-white shadow-md"
                : "bg-white text-muted-foreground hover:bg-slate-100 border border-border",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
});

// =============================================================================
// TESTIMONIAL CARD
// =============================================================================

interface TestimonialCardProps {
  testimonial: {
    name: string;
    location: string;
    rating: number;
    text: string;
    service: string;
  };
}

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <Card className="h-full border-border/60 bg-white shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <CardContent className="flex h-full min-h-44 flex-col justify-between p-3 sm:min-h-50 sm:p-5">
        <div>
          {/* Stars */}
          <div className="mb-2 flex gap-0.5 sm:mb-3">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 sm:h-4 sm:w-4"
              />
            ))}
          </div>
          {/* Quote */}
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-4 sm:text-base sm:line-clamp-5">
            &ldquo;{testimonial.text}&rdquo;
          </p>
        </div>

        {/* Author info */}
        <div className="mt-3 border-t border-border/50 pt-2.5 sm:mt-4 sm:pt-3">
          <p className="font-semibold text-foreground text-xs sm:text-base">
            {testimonial.name}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground sm:text-sm">
            <MapPin className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
            {testimonial.location}
          </div>
          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary sm:mt-1.5 sm:px-2.5 sm:text-xs">
            {testimonial.service}
          </span>
        </div>
      </CardContent>
    </Card>
  );
});

// =============================================================================
// TESTIMONIALS GRID
// =============================================================================

interface TestimonialsGridProps {
  testimonials: typeof ALL_TESTIMONIALS;
}

const TestimonialsGrid = memo(function TestimonialsGrid({
  testimonials,
}: TestimonialsGridProps) {
  if (testimonials.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-slate-50 p-5 text-center sm:rounded-xl sm:p-8">
        <p className="text-xs text-muted-foreground sm:text-base">
          Aucun avis pour ce filtre. Essayez une autre catégorie.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 px-3 sm:gap-5 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))}
    </div>
  );
});

// =============================================================================
// FAQ SECTION
// =============================================================================

const FAQSection = memo(function FAQSection() {
  return (
    <Section className="bg-background">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 text-center sm:mb-6">
          <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">
            Questions sur nos avis
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Transparence et authenticité garanties
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {AVIS_FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm sm:text-base min-h-11 py-3 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
});

// =============================================================================
// BOTTOM CTA
// =============================================================================

const BottomCTA = memo(function BottomCTA() {
  return (
    <Section className="bg-slate-50/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Card className="relative overflow-hidden border-0 bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 shadow-xl sm:shadow-2xl shadow-primary/30 rounded-xl sm:rounded-2xl">
          <div className="absolute -right-16 -top-16 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <CardContent className="relative p-5 sm:p-6 md:p-10 text-center">
            <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              Rejoignez nos clients satisfaits
            </h2>
            <p className="mt-2 text-white/90 text-sm sm:text-base max-w-md mx-auto">
              Obtenez votre devis gratuit en 2 minutes et bénéficiez d'un
              service 5 étoiles.
            </p>

            <div className="mt-5 sm:mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="min-h-11 h-11 w-full sm:w-auto px-6 sm:px-7 bg-white text-primary font-semibold hover:bg-white/90 shadow-lg"
              >
                <Link href="/devis">
                  <Image
                    src="/special-icon.png"
                    width={20}
                    height={20}
                    alt=""
                    className="mr-2"
                  />
                  <p className="hidden sm:block text-xs sm:text-sm md:text-base w-full ">Demander un devis gratuit</p>
                  <p className="block sm:hidden text-xs sm:text-sm md:text-base w-full ">Demander un devis</p>
                </Link>
              </Button>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 min-h-11 px-4 text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </div>

            {/* Reassurance microcopy */}
            <p className="mt-4 text-xs text-white/70 sm:text-sm">
              ✓ Sans engagement · ✓ 100% gratuit · ✓ Réponse sous 2h
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
});

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function AvisPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredTestimonials = useMemo(() => {
    if (filter === "all") return ALL_TESTIMONIALS;
    return ALL_TESTIMONIALS.filter((t) => t.service === filter);
  }, [filter]);

  return (
    <>
      {/* A) Hero */}
      <HeroSection totalReviews={ALL_TESTIMONIALS.length} />

      {/* B) Trust Stats Row */}
      <TrustStatsRow />

      {/* C) Filters + Testimonials Grid */}
      <Section className="bg-background">
        <div className="mx-auto max-w-5xl space-y-6">
          <FilterTabs filter={filter} onFilterChange={setFilter} />
          <TestimonialsGrid testimonials={filteredTestimonials} />
        </div>
      </Section>

      {/* D) FAQ Section */}
      <FAQSection />

      {/* E) Bottom CTA */}
      <BottomCTA />
    </>
  );
}
