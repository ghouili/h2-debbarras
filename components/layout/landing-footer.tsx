import Link from "next/link";

import { siteConfig } from "@/lib/config";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { PageContainer } from "./page-container";

/**
 * Simplified footer for the Google Ads landing pages and the /merci page.
 * Keeps only: copyright + Mentions légales + Politique de confidentialité.
 */
export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary">
      <PageContainer className="py-6">
        <div
          className={cn(
            designTokens.textScale.base,
            "flex flex-col items-center justify-between gap-3 text-muted-foreground sm:flex-row",
          )}
        >
          <p>
            © {currentYear} {siteConfig.name}
          </p>
          <nav className="flex items-center gap-4">
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-foreground"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="transition-colors hover:text-foreground"
            >
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </PageContainer>
    </footer>
  );
}
