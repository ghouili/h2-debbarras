"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Star,
  MapPin,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackClickCall, trackStartDevis } from "@/lib/analytics";
import { designTokens } from "@/lib/design-tokens";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { homeCopy } from "@/lib/content/home-copy";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "../layout/section";

export function HeroSection() {
  const heroCopy = homeCopy.hero;
  const [imageToggle, setImageToggle] = useState<"before" | "after">("before");

  return (
    <Section
      bleed
      className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-background to-primary-100/50"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs: Royal Blue (#134BF2) → Sky Blue (#1BA0F2) */}
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary-600/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary-300/20 blur-3xl" />

      <PageContainer className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <div className="flex flex-col gap-8">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>{heroCopy.badge}</span>
            </div>

            {/* Headline */}
            <div className={cn(designTokens.typography.h2, "text-balance")}>
              {heroCopy.title}{" "}
              <span className="text-primary">{heroCopy.titleHighlight}</span>
            </div>
            <p
              className={cn(
                designTokens.typography.lead,
                "text-pretty max-w-xl",
              )}
            >
              {heroCopy.subtitle}
            </p>

            {/* Trust bullets */}
            <div className="flex flex-col gap-3">
              {heroCopy.bullets.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-base font-medium text-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={cn(
                  designTokens.button.primary,
                  "text-base h-14 px-8",
                )}
                asChild
                onClick={() => trackStartDevis()}
              >
                <Link href="/devis">
                  {heroCopy.primaryCta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  designTokens.button.secondary,
                  "text-base h-14 px-8 bg-background",
                )}
                asChild
                onClick={() => trackClickCall()}
              >
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {heroCopy.secondaryCta}
                </a>
              </Button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-6 border-t border-border/50 pt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <div className="leading-tight">
                  <span className="block font-medium text-foreground">
                    {heroCopy.trust.rating}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {heroCopy.trust.ratingLabel}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{heroCopy.trust.interventions}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{heroCopy.trust.departments}</span>
              </div>
            </div>
          </div>

          {/* Right: Before/After Visual */}
          <div className="relative lg:order-last">
            <div className="relative rounded-2xl border border-border/50 bg-card p-2 shadow-2xl shadow-black/10">
              {/* Toggle buttons */}
              <div className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 rounded-full bg-background border border-border shadow-lg overflow-hidden">
                <button
                  onClick={() => setImageToggle("before")}
                  className={cn(
                    "px-6 py-2 text-sm font-medium transition-all duration-200",
                    imageToggle === "before"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Avant
                </button>
                <button
                  onClick={() => setImageToggle("after")}
                  className={cn(
                    "px-6 py-2 text-sm font-medium transition-all duration-200",
                    imageToggle === "after"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Après
                </button>
              </div>

              {/* Image container */}
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted">
                {imageToggle === "before" ? (
                  // <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  //   <div className="text-center space-y-2">
                  //     <div className="text-6xl">📦</div>
                  //     <p className="text-sm font-medium text-gray-600">Espace encombré</p>
                  //   </div>
                  // </div>
                  <div>
                    <img
                      src="\hero-before.png"
                      alt={`Avant - pic`}
                      className="aspect-video w-full rounded-lg object-cover"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src="/after.png"
                      alt={`Après - after`}
                      className="aspect-video w-full rounded-lg object-cover"
                    />
                  </div>
                  // <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
                  //   <div className="text-center space-y-2">
                  //     <div className="text-6xl">✨</div>
                  //     <p className="text-sm font-medium text-gray-600">Espace libéré</p>
                  //   </div>
                  // </div>
                )}

                {/* Badge overlay */}
                <div className="absolute bottom-4 right-4 rounded-lg bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground">
                    Résultat
                  </p>
                  <p className="text-lg font-bold text-primary">100% propre</p>
                </div>
              </div>

              {/* Testimonial snippet */}
              <div className="mt-3 rounded-lg bg-secondary/50 p-4 border border-border/30">
                <div className="flex items-start gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500  "
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground italic">
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

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl -z-10" />
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
