import { QuoteFunnel } from "@/components/forms/quote-funnel"
import { Section } from "@/components/layout/section"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"
import type { Metadata } from "next"
import { Suspense } from "react"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Demande de devis gratuit - Débarras Aurea",
  description:
    "Obtenez votre devis gratuit pour un débarras ou un déménagement en Île-de-France. Réponse sous 2h, sans engagement. Professionnels et particuliers.",
  alternates: {
    canonical: `${siteConfig.url}/devis`,
  },
  openGraph: {
    title: "Demande de devis gratuit - Débarras Aurea",
    description:
      "Obtenez votre devis gratuit pour un débarras ou un déménagement en Île-de-France. Réponse sous 2h, sans engagement.",
    url: `${siteConfig.url}/devis`,
    type: "website",
  },
}

export default function DevisPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-linear-to-b from-primary-50/60 via-background to-background py-6 sm:py-8 md:py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className={cn(
              designTokens.typography.h1,
              designTokens.textScale["2xl3xl4xl"],
              "text-balance",
            )}
          >
            Demander un devis gratuit
          </h1>
          <p
            className={cn(
              designTokens.textScale.baseBase,
              "mx-auto mt-2 max-w-xl text-pretty text-muted-foreground",
            )}
          >
            Débarras, Déménagement et Ménage en Île-de-France
          </p>
          {/* Trust line */}
          <p className={cn(designTokens.textScale.base, "mt-3 text-muted-foreground")}>
            <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-green-600" />
            Réponse sous 2h • Intervention 24 à 48 h • Sans engagement
          </p>
        </div>
      </Section>

      {/* Form Section */}
      <Section className="bg-background py-4 sm:py-6">
        <div className="w-full">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            }
          >
            <QuoteFunnel />
          </Suspense>
        </div>
      </Section>
    </>
  )
}
