"use client";

import { useState, useCallback, useId } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeCopy } from "@/lib/content/home-copy";
import { Section } from "../layout/section";
import { cn } from "@/lib/utils"; // adjust import if your cn is elsewhere
import { designTokens } from "@/lib/design-tokens";

const GALLERY_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEyIDciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjciIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4=";



type Toggle = "before" | "after";

export function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageToggle, setImageToggle] = useState<Toggle>("after"); // default: reveal result
  const uid = useId();

  const examples = [
    {
      title: "Appartement F3 - Paris 15e",
      before: "/optimized/before-after/before-paris-arrart-01-w1024.webp",
      after: "/optimized/before-after/after-paris-arrart-01-w1024.webp",
      altBefore: "Avant intervention - Appartement F3 débarras Paris 15e",
      altAfter: "Après intervention - Appartement propre Paris 15e",
      description: "Débarras complet en 3 heures",
    },
    {
      title: "Appartement F3 - Paris 15e",
      before: "/optimized/before-after/top-appar-before-w1024.webp",
      after: "/optimized/before-after/top-appar-after-w1024.webp",
      altBefore: "Avant intervention - Appartement débarras Île-de-France",
      altAfter: "Après intervention - Appartement débarrassé Île-de-France",
      description: "Débarras complet en 3 heures",
    },
    {
      title: "Cave - Versailles",
      before:
        "/optimized/before-after/clean-empty-basement-before-clearance-w1024.webp",
      after:
        "/optimized/before-after/clean-empty-basement-after-clearance-w1024.webp",
      altBefore: "Avant intervention - Cave encombrée débarras Versailles",
      altAfter: "Après intervention - Cave dégagée débarras Versailles",
      description: "Évacuation de 15m³ d'objets",
    },
    {
      title: "Maison - Créteil",
      before:
        "/optimized/before-after/clean-empty-house-before-clearance-w1024.webp",
      after:
        "/optimized/before-after/clean-empty-house-after-clearance-w1024.webp",
      altBefore: "Avant intervention - Maison encombrée débarras Créteil",
      altAfter: "Après intervention - Maison dégagée débarras Créteil",
      description: "Débarras complet en 1 journée",
    },
  ];

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
    setImageToggle("after");
  }, [examples.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
    setImageToggle("after");
  }, [examples.length]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setImageToggle("after");
  }, []);

  const current = examples[currentIndex];
  const copy = homeCopy.beforeAfter;

  const tabBeforeId = `ba-tab-before-${uid}`;
  const tabAfterId = `ba-tab-after-${uid}`;
  const panelId = `ba-panel-${uid}`;

  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={cn(
            designTokens.typography.h2,
            designTokens.textScale["2xl3xl4xl"],
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

      <div className="mx-auto mt-10 max-w-5xl">
        <Card>
          <CardContent className="p-0 sm:p-6">
            <h3
              className={cn(
                designTokens.typography.h4,
                designTokens.textScale.base,
                "pb-6 text-center",
              )}
            >
              {current.title}
            </h3>

            {/* <= md: Hero-style overlay toggle */}
            <div className="md:block lg:hidden">
              <div className="relative  border-border/50 bg-card shadow-2xl shadow-black/10">
                {/* Toggle */}
                <div
                  className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 overflow-hidden rounded-full border border-border bg-background shadow-lg"
                  role="tablist"
                  aria-label="Sélection avant/après"
                >
                  <button
                    type="button"
                    role="tab"
                    id={tabBeforeId}
                    aria-controls={panelId}
                    aria-selected={imageToggle === "before"}
                    onClick={() => setImageToggle("before")}
                    className={cn(
                      designTokens.textScale.xs,
                      "px-4 sm:px-5 py-1 sm:py-1.5 md:font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
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
                    id={tabAfterId}
                    aria-controls={panelId}
                    aria-selected={imageToggle === "after"}
                    onClick={() => setImageToggle("after")}
                    className={cn(
                      designTokens.textScale.xsSm,
                      "px-4 sm:px-5 py-1 sm:py-1.5 sm:font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                      imageToggle === "after"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    Après
                  </button>
                </div>
                <div className="sm:hidden absolute z-10 top-[40%] w-full flex flex-row items-center justify-between px-4 ">
                  <button
                    onClick={handlePrevious}
                    className=" p-1 backdrop-blur-md rounded-sm flex items-center justify-center border border-gray-300/50"
                    aria-label="Exemple précédent"
                  >
                    <ChevronLeft className="h-6 [420px]:w-8 w-6 [420px]:h-8 text-primary" aria-hidden="true" />
                  </button>
                  <button
                    onClick={handleNext}
                    className=" p-1 backdrop-blur-md rounded-sm flex items-center justify-center border border-gray-300/50"
                    aria-label="Exemple suivant"
                  >
                    <ChevronRight className="h-6 [420px]:w-8 w-6 [420px]:h-8 text-primary" aria-hidden="true" />
                  </button>
                </div>

                {/* Image panel (fixed aspect => CLS-safe) */}
                <div
                  id={panelId}
                  role="tabpanel"
                  aria-labelledby={
                    imageToggle === "before" ? tabBeforeId : tabAfterId
                  }
                  className="relative aspect-video w-full overflow-hidden sm:rounded-xl bg-muted"
                >
                  <Image
                    src={current.after}
                    alt={current.altAfter}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className={cn(
                      "object-cover transition-opacity duration-200",
                      imageToggle === "after" ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden={imageToggle !== "after"}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={GALLERY_BLUR_DATA_URL}
                  />
                  <Image
                    src={current.before}
                    alt={current.altBefore}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className={cn(
                      "object-cover transition-opacity duration-200",
                      imageToggle === "before" ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden={imageToggle !== "before"}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={GALLERY_BLUR_DATA_URL}
                  />

                  {/* Optional badge (kept subtle) */}
                  <div className="hidden sm:absolute bottom-3 right-3 rounded-lg bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-lg border border-border/50">
                    <p className={cn(designTokens.textScale.xs, "font-medium text-muted-foreground")}>
                      Résultat
                    </p>
                    <p className={cn(designTokens.textScale.sm, "font-bold text-primary")}>
                      Espace libéré
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* lg+: side-by-side (your original) */}
            <div className="hidden lg:grid gap-4 lg:grid-cols-2 mt-4">
              <div>
                <p className={cn(designTokens.textScale.sm, "mb-2 text-center font-medium text-muted-foreground")}>
                  Avant
                </p>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={current.before}
                    alt={current.altBefore}
                    fill
                    sizes="(max-width: 1024px) 50vw, 520px"
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={GALLERY_BLUR_DATA_URL}
                  />
                </div>
              </div>
              <div>
                <p className={cn(designTokens.textScale.sm, "mb-2 text-center font-medium text-muted-foreground")}>
                  Après
                </p>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={current.after}
                    alt={current.altAfter}
                    fill
                    sizes="(max-width: 1024px) 50vw, 520px"
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={GALLERY_BLUR_DATA_URL}
                  />
                </div>
              </div>
            </div>

            <p className={cn(designTokens.textScale.base, "mt-4 text-center text-muted-foreground")}>
              {current.description}
            </p>
            <p className={cn(designTokens.textScale.xs, "mt-2 text-center text-muted-foreground")}>
              {copy.caption}
            </p>

            {/* Navigation controls (keep 44px+ targets) */}
            <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                className="h-11 w-11 hidden sm:flex"
                aria-label="Exemple précédent"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Button>

              <div
                className="flex gap-1"
                role="tablist"
                aria-label="Sélection d'exemples"
              >
                {examples.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDotClick(index)}
                    className="flex h-11 w-11 items-center justify-center"
                    aria-label={`Exemple ${index + 1}`}
                    aria-selected={index === currentIndex}
                    role="tab"
                  >
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-colors",
                        index === currentIndex ? "bg-primary" : "bg-border",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="h-11 w-11 hidden sm:flex"
                aria-label="Exemple suivant"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
