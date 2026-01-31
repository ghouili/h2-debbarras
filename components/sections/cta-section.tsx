import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { homeCopy } from "@/lib/content/home-copy";
import { Section } from "@/components/layout/section";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function CtaSection() {
  const copy = homeCopy.finalCta;

  return (
    <Section
      bleed
      className="bg-linear-to-b from-primary-100 via-primary-50/50 to-background"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={cn(
            designTokens.typography.h2,
            designTokens.textScale["2xl3xl"],
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

        <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className={cn(
              designTokens.textScale.base,
              "min-h-11 h-10 sm:h-12 px-4 sm:px-8 w-full sm:w-auto",
            )}
            asChild
          >
            <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2">
              <Image
                src="/optimized/icons/devis-icon-white-w32.png"
                width={16}
                height={16}
                alt="Icône demande de devis gratuit"
                className="mr-0.5 sm:mr-1 h-4 w-4 sm:h-5 sm:w-5"
              />
              <Link href="/devis">{copy.primaryCta}</Link>
              <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </div>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              designTokens.button.secondary,
              designTokens.textScale.base,
              "min-h-11 h-10 sm:h-12 px-4 sm:px-6 w-full sm:w-auto",
            )}
            asChild
          >
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
              <Phone className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              {copy.secondaryCta}
            </a>
          </Button>
        </div>

        <p className={cn(designTokens.textScale.base, "mt-5 text-muted-foreground")}>
          {copy.microcopy}
        </p>
      </div>
    </Section>
  );
}
