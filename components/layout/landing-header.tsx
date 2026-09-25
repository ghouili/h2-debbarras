"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { trackClickCall } from "@/lib/analytics";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { PageContainer } from "./page-container";

const telHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

/**
 * Simplified header for the Google Ads landing pages and the /merci page.
 * - `minimal` (used on /merci): logo only, no CTAs.
 * - default (used on LPs): logo + phone button + "Devis gratuit" anchor to #devis.
 */
export function LandingHeader({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur-md shadow-sm">
      <PageContainer className="flex h-16 md:h-20 items-center justify-between">
        {/* Logo → homepage */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-100 opacity-90"
          aria-label={`${siteConfig.name} - Accueil`}
        >
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} - Accueil`}
            width={160}
            height={40}
            sizes="(max-width: 768px) 144px, 176px"
            quality={70}
            className="h-9 md:h-11 w-auto"
            priority
          />
        </Link>

        {!minimal && (
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="default"
              className={cn(designTokens.button.secondary, "text-sm h-11")}
              asChild
              onClick={() => trackClickCall()}
            >
              <a href={telHref}>
                <Phone className="h-4 w-4 sm:mr-2" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">
                  {siteConfig.contact.phone}
                </span>
              </a>
            </Button>

            <Button
              size="default"
              className={cn(designTokens.button.primary, "h-11")}
              asChild
            >
              <a href="#devis">Devis gratuit</a>
            </Button>
          </div>
        )}
      </PageContainer>
    </header>
  );
}
