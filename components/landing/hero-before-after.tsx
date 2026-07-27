"use client";

import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";

import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

type ImageData = { src: string; alt: string };
type Review = { text: string; author: string };

/**
 * Before/After hero visual for the landing pages — same toggle mechanism as the
 * homepage hero (Avant/Après tabs cross-fading two images) plus a Google review.
 */
export function HeroBeforeAfter({
  before,
  after,
  review,
}: {
  before: ImageData;
  after: ImageData;
  review: Review;
}) {
  const [view, setView] = useState<"before" | "after">("after");

  return (
    <div className="relative lg:order-last">
      <div className="relative rounded-xl border border-border/50 bg-card p-0.5 sm:p-2 shadow-2xl shadow-black/10">
        {/* Avant / Après toggle */}
        <div
          className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 overflow-hidden rounded-full border border-border bg-background shadow-lg"
          role="tablist"
          aria-label="Sélection avant/après"
        >
          <button
            type="button"
            role="tab"
            aria-selected={view === "before"}
            onClick={() => setView("before")}
            className={cn(
              designTokens.textScale.base,
              "px-4 py-1 transition-colors duration-150 sm:px-5 md:py-2 md:font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
              view === "before"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            Avant
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "after"}
            onClick={() => setView("after")}
            className={cn(
              designTokens.textScale.base,
              "px-4 py-1 transition-colors duration-150 sm:px-5 md:py-2 md:font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
              view === "after"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            Après
          </button>
        </div>

        {/* Cross-faded images (both mounted for instant switch) */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
          <Image
            src={after.src}
            alt={after.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className={cn(
              "object-cover transition-opacity duration-200",
              view === "after" ? "opacity-100" : "opacity-0",
            )}
            priority
          />
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className={cn(
              "object-cover transition-opacity duration-200",
              view === "before" ? "opacity-100" : "opacity-0",
            )}
            loading="lazy"
          />

          {/* Result badge */}
          <div className="hidden rounded-t-lg border border-border/50 bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm sm:absolute sm:bottom-3 sm:right-3 sm:block">
            <p className={cn(designTokens.textScale.xs, "font-medium text-muted-foreground")}>
              Résultat
            </p>
            <p className={cn(designTokens.textScale.base, "font-bold text-primary")}>
              Espace libéré
            </p>
          </div>
        </div>

        {/* Google review snippet */}
        <div className="mt-2.5 rounded-b-lg border border-border/30 bg-secondary/50 p-2.5 sm:p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <span className={cn(designTokens.textScale.xs, "flex items-center gap-1 font-medium text-muted-foreground")}>
              <svg viewBox="0 0 48 48" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              Avis Google
            </span>
          </div>
          <p className={cn(designTokens.textScale.base, "mt-1.5 italic leading-snug text-foreground")}>
            “{review.text}”
          </p>
          <p className={cn(designTokens.textScale.xs, "mt-1 text-muted-foreground")}>— {review.author}</p>
        </div>
      </div>

      {/* Decorative blur */}
      <div
        className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
        aria-hidden="true"
      />
    </div>
  );
}
