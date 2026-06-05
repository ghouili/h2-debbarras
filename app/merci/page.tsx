import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import type { Metadata } from "next";

import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Merci pour votre demande",
  description:
    "Votre demande de devis a bien été envoyée. Notre équipe vous contacte sous 2h.",
  robots: { index: false, follow: false },
};

const telHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

export default function MerciPage() {
  return (
    <>
      {/* Logo-only header */}
      <LandingHeader minimal />

      <main className="min-h-screen w-full bg-linear-to-b from-primary-50/60 via-background to-background py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Card>
            <CardContent className="p-8 text-center">
              {/* Green success icon */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>

              <h1 className={cn(designTokens.typography.h1, designTokens.textScale["3xl4xl"], "mb-4")}>
                Votre demande a bien été envoyée !
              </h1>

              <p className={cn(designTokens.textScale.lg, "mb-8 text-pretty text-muted-foreground")}>
                Merci pour votre message. Notre équipe vous contacte sous 2h pour discuter de votre projet et vous
                envoyer un devis gratuit.
              </p>

              {/* Blue box */}
              <a
                href={telHref}
                className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-xl bg-primary/10 p-4 font-medium text-primary transition-colors hover:bg-primary/15"
              >
                <Phone className="h-5 w-5 shrink-0" />
                <span>
                  Besoin d&apos;une réponse immédiate ? Appelez-nous directement au {siteConfig.contact.phone}
                </span>
              </a>

              <div className="mt-8">
                <Link
                  href="/"
                  className={cn(designTokens.textScale.base, "text-muted-foreground underline-offset-4 hover:underline")}
                >
                  ← Retour à l&apos;accueil
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <LandingFooter />
    </>
  );
}
