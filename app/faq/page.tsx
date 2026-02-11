"use client";

import { useState, useMemo, useCallback, memo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Search,
  Phone,
  FileText,
  CheckCircle2,
  MapPin,
  Truck,
  Home,
  Building2,
  Package,
  Clock,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { designTokens } from "@/lib/design-tokens";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import Image from "next/image";

// =============================================================================
// CATEGORY ICONS MAPPING
// =============================================================================

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Général: HelpCircle,
  Tarifs: FileText,
  Processus: Clock,
  Urgences: Sparkles,
};

const CATEGORY_ALL = { value: "all", label: "Toutes", icon: Sparkles };

// =============================================================================
// FLATTEN ALL FAQs FOR SEARCH
// =============================================================================

type FlatFAQ = {
  q: string;
  a: string;
  category: string;
  categoryIndex: number;
  questionIndex: number;
};

const ALL_FAQS: FlatFAQ[] = siteConfig.faqs.flatMap((cat, catIdx) =>
  cat.questions.map((faq, qIdx) => ({
    q: faq.q,
    a: faq.a,
    category: cat.category,
    categoryIndex: catIdx,
    questionIndex: qIdx,
  }))
);

const CATEGORIES = [
  CATEGORY_ALL,
  ...siteConfig.faqs.map((cat) => ({
    value: cat.category,
    label: cat.category,
    icon: CATEGORY_ICONS[cat.category] || HelpCircle,
  })),
];

// =============================================================================
// HERO SECTION
// =============================================================================

const HeroSection = memo(function HeroSection() {
  return (
    <Section className="bg-linear-to-b from-primary-50/60 via-background to-background">
      <div className="mx-auto max-w-4xl px-3 text-center sm:px-6">
        {/* Icon badge */}
        <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:mb-4 sm:h-14 sm:w-14">
          <HelpCircle className="h-5 w-5 text-primary sm:h-7 sm:w-7" />
        </div>

        {/* H1 - responsive */}
        <h1
          className={cn(
            designTokens.typography.h1,
            "text-balance text-xl sm:text-3xl md:text-4xl",
          )}
        >
          Questions Fréquentes
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base md:text-lg">
          Réponses à vos questions sur nos services de débarras et déménagement.
        </p>

        {/* CTAs - stack on mobile */}
        <div className="mt-4 flex flex-col items-center gap-2 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
          <Button
            asChild
            size="lg"
            className={cn(
              "min-h-11 w-full gap-1.5 px-4 text-xs sm:w-auto sm:gap-2 sm:px-6 sm:text-sm",
              designTokens.button.primary
            )}
          >
            <Link href="/devis">
              <Image
                src="/optimized/icons/special-icon-w40.png"
                width={40}
                height={31}
                alt="Icône plus de 500 interventions"
                className="h-4 w-auto shrink-0 sm:h-5"
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
              designTokens.button.secondary
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
          Devis gratuit • Réponse 2h • Intervention 24 à 48 h
        </p>
      </div>
    </Section>
  );
});

// =============================================================================
// SEARCH + CATEGORY TABS
// =============================================================================

interface SearchAndCategoriesProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (value: string) => void;
  resultCount: number;
}

const SearchAndCategories = memo(function SearchAndCategories({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  resultCount,
}: SearchAndCategoriesProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-3 px-3 sm:space-y-4 sm:px-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="min-h-11 h-11 w-full pl-9 pr-3 text-sm sm:pl-10 sm:pr-4 sm:text-base"
        />
      </div>

      {/* Category tabs - horizontal scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin sm:gap-2">
        {CATEGORIES.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => onCategoryChange(value)}
            className={cn(
              "shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all min-h-10 sm:min-h-11 sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-sm",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              activeCategory === value
                ? "bg-primary text-white shadow-md"
                : "bg-white text-muted-foreground hover:bg-slate-100 border border-border"
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Results count - reserved min-height to prevent CLS */}
      <div className="min-h-5 text-xs text-muted-foreground sm:min-h-6 sm:text-sm">
        {searchQuery || activeCategory !== "all" ? (
          <span>
            {resultCount} résultat{resultCount !== 1 ? "s" : ""}
          </span>
        ) : null}
      </div>
    </div>
  );
});

// =============================================================================
// FAQ ACCORDION LIST
// =============================================================================

interface FAQAccordionListProps {
  faqs: FlatFAQ[];
}

const FAQAccordionList = memo(function FAQAccordionList({
  faqs,
}: FAQAccordionListProps) {
  if (faqs.length === 0) {
    return (
      <div className="mx-3 rounded-lg border border-dashed border-border bg-slate-50 p-5 text-center sm:mx-6 sm:rounded-xl sm:p-8">
        <HelpCircle className="mx-auto h-8 w-8 text-muted-foreground/50 sm:h-10 sm:w-10" />
        <p className="mt-2 text-xs text-muted-foreground sm:mt-3 sm:text-base">
          Aucune question ne correspond à votre recherche.
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground sm:text-sm">
          Essayez d&apos;autres termes ou{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contactez-nous
          </Link>
          .
        </p>
      </div>
    );
  }

  // Group FAQs by category
  const groupedFaqs = faqs.reduce(
    (acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    },
    {} as Record<string, FlatFAQ[]>
  );

  return (
    <div className="space-y-4 px-3 sm:space-y-6 sm:px-6">
      {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => {
        const Icon = CATEGORY_ICONS[category] || HelpCircle;
        return (
          <Card key={category} className="border-border/60 shadow-sm">
            {/* Category header */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-slate-50/50 px-3 py-2.5 sm:px-5 sm:py-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 sm:h-8 sm:w-8 sm:rounded-lg">
                <Icon className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
              </div>
              <h2 className={cn(designTokens.typography.h3, "text-xs text-foreground sm:text-base")}>
                {category}
              </h2>
              <span className="ml-auto rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary sm:px-2 sm:text-xs">
                {categoryFaqs.length}
              </span>
            </div>

            {/* Accordion */}
            <div className="p-2.5 sm:p-4">
              <Accordion type="single" collapsible className="w-full">
                {categoryFaqs.map((faq, idx) => (
                  <AccordionItem
                    key={`${faq.categoryIndex}-${faq.questionIndex}`}
                    value={`faq-${faq.categoryIndex}-${faq.questionIndex}`}
                    className={idx === categoryFaqs.length - 1 ? "border-b-0" : ""}
                  >
                    <AccordionTrigger className="text-left text-xs sm:text-base min-h-10 sm:min-h-11 py-2.5 sm:py-3 px-1 [&>svg]:h-3.5 [&>svg]:w-3.5 sm:[&>svg]:h-4 sm:[&>svg]:w-4 [&>svg]:shrink-0 hover:no-underline">
                      <span className="line-clamp-2 pr-2">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground leading-relaxed px-1 pb-3 sm:text-sm sm:pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Card>
        );
      })}
    </div>
  );
});

// =============================================================================
// STILL NEED HELP CTA
// =============================================================================

const StillNeedHelpCTA = memo(function StillNeedHelpCTA() {
  return (
    <Card className="relative overflow-hidden border-0 bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 shadow-xl sm:shadow-2xl shadow-primary/30 rounded-xl sm:rounded-2xl">
      <div className="absolute -right-16 -top-16 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <CardContent className="relative p-4 sm:p-6 md:p-10 text-center">
        <h2 className={cn(designTokens.typography.h2, "text-lg text-white sm:text-2xl lg:text-3xl")}>
          Pas trouvé votre réponse ?
        </h2>
        <p className="mt-1.5 text-white/90 text-xs sm:mt-2 sm:text-base max-w-md mx-auto">
          Notre équipe répond à toutes vos questions.
        </p>

        <div className="mt-4 flex flex-col items-center gap-2 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
          <Button
            asChild
            size="lg"
            className="min-h-11 h-11 w-full sm:w-auto px-4 text-xs sm:px-7 sm:text-sm bg-white text-primary font-semibold hover:bg-white/90 shadow-lg"
          >
            <Link href="/devis">
              <Image
                src="/optimized/icons/special-icon-w40.png"
                width={40}
                height={31}
                alt="Icône plus de 500 interventions"
                className="mr-1.5 h-4 w-auto sm:mr-2 sm:h-5"
              />
              Devis gratuit
            </Link>
          </Button>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center gap-1.5 min-h-11 px-3 text-xs font-medium text-white/90 hover:text-white transition-colors sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{siteConfig.contact.phone}</span>
          </a>
        </div>

        {/* Reassurance microcopy */}
        <p className="mt-3 text-[10px] text-white/70 sm:mt-4 sm:text-sm">
          ✓ Sans engagement · ✓ Gratuit · ✓ Réponse 2h
        </p>
      </CardContent>
    </Card>
  );
});

// =============================================================================
// EXPLORER LINKS
// =============================================================================

const EXPLORER_LINKS = [
  { href: "/services", label: "Nos services", icon: Package },
  { href: "/zones", label: "Zones d'intervention", icon: MapPin },
  { href: "/services/demenagement-particulier", label: "Déménagement", icon: Truck },
  { href: "/services/debarras-maison-vide-maison", label: "Débarras maison", icon: Home },
  { href: "/services/debarras-appartement-vide-appartement", label: "Débarras appartement", icon: Building2 },
];

const ExplorerLinks = memo(function ExplorerLinks() {
  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6">
      <h2 className={cn(designTokens.typography.h3, "mb-3 text-center text-base sm:mb-4 sm:text-xl")}>
        Explorer nos services
      </h2>
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3">
        {EXPLORER_LINKS.map(({ href, label, icon: Icon }) => (
          <Button
            key={href}
            asChild
            variant="outline"
            size="sm"
            className={cn(
              "min-h-10 gap-1.5 px-2.5 text-xs sm:min-h-11 sm:gap-2 sm:px-4 sm:text-sm",
              designTokens.button.secondary
            )}
          >
            <Link href={href}>
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
});

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Debounced search (simple implementation)
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setActiveCategory(value);
  }, []);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    let result = ALL_FAQS;

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((faq) => faq.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (faq) =>
          faq.q.toLowerCase().includes(query) ||
          faq.a.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

  return (
    <>
      {/* A) Hero */}
      <HeroSection />

      {/* B) Search + Categories + C) FAQ Accordion */}
      <Section className="bg-background">
        <div className="mx-auto max-w-4xl space-y-6">
          <SearchAndCategories
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            resultCount={filteredFaqs.length}
          />
          <FAQAccordionList faqs={filteredFaqs} />
        </div>
      </Section>

      {/* D) Still Need Help CTA */}
      <Section className="bg-slate-50/60">
        <div className="mx-auto max-w-4xl px-3 sm:px-6">
          <StillNeedHelpCTA />
        </div>
      </Section>

      {/* E) Explorer Links */}
      <Section className="bg-background">
        <ExplorerLinks />
      </Section>
    </>
  );
}
