import { QuoteFunnel } from "@/components/forms/quote-funnel"
import { Section } from "@/components/layout/section"
import type { Metadata } from "next"
import { Suspense } from "react"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Demande de devis gratuit - H2 Débarras Maison",
  description:
    "Obtenez votre devis gratuit pour un débarras en Île-de-France. Réponse sous 2h, sans engagement. Professionnels et particuliers.",
}

export default function DevisPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-linear-to-b from-primary-50/60 via-background to-background py-6 sm:py-8 md:py-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Demander un devis gratuit
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
            Débarras, Déménagement & Ménage en Île-de-France
          </p>
          {/* Trust line */}
          <p className="mt-3 text-xs text-muted-foreground sm:text-sm">
            <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-green-600" />
            Réponse sous 2h • Intervention 24–48h • Sans engagement
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
