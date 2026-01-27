"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackClickCall, trackStartDevis } from "@/lib/analytics";
import { designTokens } from "@/lib/design-tokens";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { homeCopy } from "@/lib/content/home-copy";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "../layout/section";

const HERO_AFTER_SRC = "/optimized/hero/hero-after-w1200.webp";
const HERO_BEFORE_SRC = "/optimized/hero/hero-before-w1200.webp";
const HERO_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEyIDciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjciIGZpbGw9IiNlYmVkZWYiLz48L3N2Zz4=";

export function HeroSection() {
  const heroCopy = homeCopy.hero;
  const [imageToggle, setImageToggle] = useState<"before" | "after">("after");

  const handleToggleBefore = useCallback(() => setImageToggle("before"), []);
  const handleToggleAfter = useCallback(() => setImageToggle("after"), []);

  return (
    <Section
      bleed
      className="relative overflow-hidden bg-linear-to-br from-primary-50 via-background to-primary-100/50"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary-600/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary-300/20 blur-3xl"
        aria-hidden="true"
      />

      <PageContainer className="relative ">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Content */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary border border-primary/20 shadow-sm">
              <Image
                src="/optimized/icons/devis-icon-w32.png"
                width={16}
                height={16}
                alt="Icône demande de devis gratuit"
              />
              <span>{heroCopy.badge}</span>
            </div>

            {/* H1 Headline */}
            <h1
              className={cn(
                designTokens.typography.h1,
                "text-balance leading-tight text-[clamp(1.75rem,5.4vw,3rem)] sm:text-4xl lg:text-5xl font-noto-georgian",
              )}
            >
              {heroCopy.title}{" "}
              <span className="text-primary">{heroCopy.titleHighlight}</span>
            </h1>
            <p
              className={cn(
                designTokens.typography.lead,
                "text-pretty max-w-lg text-sm sm:text-base lg:text-lg",
              )}
            >
              {heroCopy.subtitle}
            </p>

            {/* Trust bullets */}
            <ul className="flex flex-col gap-1.5" aria-label="Nos garanties">
              {heroCopy.bullets.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs - Clear hierarchy: Primary filled, Secondary outline */}
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-start sm:gap-4 pt-1">
              <Button
                size="lg"
                className={cn(
                  designTokens.button.primary,
                  "min-h-11 h-10 sm:h-12 px-3 sm:px-6 text-xs sm:text-sm font-semibold w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center gap-1.5 sm:gap-2",
                )}
                asChild
                onClick={() => trackStartDevis()}
              >
                <Link href="/devis">
                  {heroCopy.primaryCta}
                  <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  designTokens.button.secondary,
                  "min-h-11 h-10 sm:h-12 px-3 sm:px-6 text-xs sm:text-sm bg-background w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center gap-1.5 sm:gap-2",
                )}
                asChild
                onClick={() => trackClickCall()}
              >
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                  {heroCopy.secondaryCta}
                </a>
              </Button>
            </div>
            {/* Trust strip */}
            <div className="lg:hidden flex w-full flex-wrap items-center justify-center gap-3 sm:gap-5 mt-4 border-t border-border/50 pt-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Star
                  className="h-4 w-4 fill-yellow-500 text-yellow-500"
                  aria-hidden="true"
                />
                <div className="leading-tight">
                  <span className="font-semibold text-foreground">
                    {heroCopy.trust.rating}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {heroCopy.trust.ratingLabel}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Image
                  alt="Icône plus de 500 interventions"
                  src="/optimized/icons/special-icon-w40.png"
                  width={40}
                  height={31}
                  className="h-5 w-auto text-primary shrink-0"
                />
                <span>{heroCopy.trust.interventions}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                {/* <MapPin
              className="h-4 w-4 text-primary shrink-0"
              aria-hidden="true"
            /> */}
                <Image
                  alt="Icône 8 départements couverts"
                  src="/optimized/icons/departement-icon-w40.png"
                  width={40}
                  height={32}
                  className="h-5 w-auto text-primary shrink-0"
                />
                <span>{heroCopy.trust.departments}</span>
              </div>
            </div>
          </div>

          {/* Right: Before/After Visual - LCP optimized */}
          <div className="relative lg:order-last">
            <div className="relative rounded-xl border border-border/50 bg-card p-0.5 sm:p-2 shadow-2xl shadow-black/10">
              {/* Toggle buttons with proper a11y */}
              <div
                className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 rounded-full bg-background border border-border shadow-lg overflow-hidden"
                role="tablist"
                aria-label="Sélection avant/après"
              >
                <button
                  type="button"
                  role="tab"
                  id="tab-before"
                  aria-controls="panel-image"
                  aria-selected={imageToggle === "before"}
                  onClick={handleToggleBefore}
                  className={cn(
                    "px-4 sm:px-5 py-1 md:py-2 text-xs md:text-sm md:font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                    imageToggle === "before"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  Avant
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-after"
                  aria-controls="panel-image"
                  aria-selected={imageToggle === "after"}
                  onClick={handleToggleAfter}
                  className={cn(
                    "px-4 sm:px-5 py-1 md:py-2 text-xs md:text-sm md:font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                    imageToggle === "after"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                >
                  Après
                </button>
              </div>

              {/* Image container - Fixed aspect ratio prevents CLS */}
              <div
                id="panel-image"
                role="tabpanel"
                aria-labelledby={
                  imageToggle === "before" ? "tab-before" : "tab-after"
                }
                className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted"
              >
                {/* Both images rendered, visibility controlled via CSS for instant switch */}
                <Image
                  src={HERO_AFTER_SRC}
                  alt="Espace libéré après intervention de débarras Aurea"
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 600px"
                  className={cn(
                    "object-cover transition-opacity duration-200",
                    imageToggle === "after" ? "opacity-100" : "opacity-0",
                  )}
                  priority
                  fetchPriority="high"
                  quality={62}
                  placeholder="blur"
                  blurDataURL={HERO_BLUR_DATA_URL}
                />
                <Image
                  src={HERO_BEFORE_SRC}
                  alt="Espace encombré avant intervention de débarras"
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 600px"
                  className={cn(
                    "object-cover transition-opacity duration-200",
                    imageToggle === "before" ? "opacity-100" : "opacity-0",
                  )}
                  loading="lazy"
                  fetchPriority="low"
                  quality={62}
                  placeholder="blur"
                  blurDataURL={HERO_BLUR_DATA_URL}
                />

                {/* Result badge - softer claim */}
                <div className="hidden sm:absolute bottom-3 right-3 rounded-t-lg bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-lg border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground">
                    Résultat
                  </p>
                  <p className="text-sm sm:text-base font-bold text-primary">
                    Espace libéré
                  </p>
                </div>
              </div>

              {/* Testimonial snippet */}
              <div className="block mt-2.5 rounded-b-lg bg-secondary/50 p-2.5 sm:p-3 border border-border/30">
                <div className="flex flex-col md:flex-row items-start gap-2.5">
                  <div className="flex shrink-0">
                    <span className="sr-only">Note : 5 sur 5</span>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-yellow-500 text-yellow-500"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                   <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-foreground italic leading-snug">
                      "Service impeccable, rapide et professionnel. Je
                      recommande !"
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      — Marie L., Paris 15e
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative blur */}
            <div
              className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl -z-10"
              aria-hidden="true"
            />
          </div>
        </div>
        {/* Trust strip */}
        <div className="hidden lg:flex w-fit flex-wrap items-center justify-center gap-4 sm:gap-5 mt-4 border-t border-border/50 pt-4 text-sm">
          <div className="flex items-center gap-2">
            <Star
              className="h-4 w-4 fill-yellow-500 text-yellow-500"
              aria-hidden="true"
            />
            <div className="leading-tight">
              <span className="font-semibold text-foreground">
                {heroCopy.trust.rating}
              </span>
              <span className="text-muted-foreground ml-1">
                {heroCopy.trust.ratingLabel}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Image
              alt="Icône plus de 500 interventions"
              src="/optimized/icons/special-icon-w40.png"
              width={40}
              height={31}
              className="h-5 w-auto text-primary shrink-0"
            />
            <span>{heroCopy.trust.interventions}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            {/* <MapPin
              className="h-4 w-4 text-primary shrink-0"
              aria-hidden="true"
            /> */}
            <Image
              alt="Icône 8 départements couverts"
              src="/optimized/icons/departement-icon-w40.png"
              width={40}
              height={32}
              className="h-5 w-auto text-primary shrink-0"
            />
            <span>{heroCopy.trust.departments}</span>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
