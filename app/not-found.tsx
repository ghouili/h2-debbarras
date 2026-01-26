import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { designTokens } from "@/lib/design-tokens";
import { siteConfig } from "@/lib/config";
import { ArrowRight, Home, Phone, Search } from "lucide-react";
import { cn } from "@/lib/utils";

function NotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 220 160"
      aria-hidden="true"
      className="h-40 w-full max-w-xs text-primary"
      role="img"
    >
      <rect
        x="18"
        y="58"
        width="110"
        height="70"
        rx="10"
        className="fill-primary/10"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M30 58h86l-12-20H42L30 58z"
        className="fill-background"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="52" cy="132" r="10" className="fill-background" stroke="currentColor" strokeWidth="2" />
      <circle cx="112" cy="132" r="10" className="fill-background" stroke="currentColor" strokeWidth="2" />
      <path
        d="M150 42h40m-14-14 14 14-14 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M166 96l10-10 10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="188" cy="70" r="4" className="fill-primary/30" />
      <circle cx="204" cy="64" r="3" className="fill-primary/20" />
    </svg>
  );
}

export default function NotFound() {
  const phoneHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <main className="w-full">
      <Section className="pt-6 md:pt-10">
        <PageContainer>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                404
              </p>
              <h1 className={cn(designTokens.typography.h1, "text-balance text-2xl sm:text-3xl lg:text-4xl")}
              >
                Oups… cette page a disparu
              </h1>
              <p className={cn(designTokens.typography.lead, "text-pretty text-sm sm:text-base")}
              >
                La page que vous cherchez n’existe pas (ou a été déplacée). Pas de souci : on vous remet sur la bonne
                route.
              </p>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className={cn(
                    designTokens.button.primary,
                    "min-h-11 w-full text-xs sm:w-auto sm:text-sm",
                  )}
                  asChild
                >
                  <Link href="/devis">
                    Demander un devis gratuit
                    <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    designTokens.button.secondary,
                    "min-h-11 w-full text-xs sm:w-auto sm:text-sm",
                  )}
                  asChild
                >
                  <Link href="/">
                    Retour à l’accueil
                    <Home className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  size="sm"
                  variant="ghost"
                  className="min-h-10 w-full text-xs sm:w-auto sm:text-sm"
                  asChild
                >
                  <Link href="/services">
                    Voir nos services
                    <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="min-h-10 w-full text-xs sm:w-auto sm:text-sm"
                  asChild
                >
                  <Link href="/zones">
                    Zones d’intervention
                    <Search className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="min-h-10 w-full text-xs sm:w-auto sm:text-sm"
                  asChild
                >
                  <Link href="/contact">
                    Contact
                    <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-3 sm:p-4">
                <p className="text-xs text-muted-foreground">Besoin d’aide rapide ? Appelez-nous</p>
                <a
                  href={phoneHref}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Appeler
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end">
              <div className="flex w-full max-w-sm items-center justify-center rounded-2xl border border-border/50 bg-primary/5 p-6">
                <NotFoundIllustration />
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}