import { QuoteFunnel } from "@/components/forms/quote-funnel"
import { Section } from "@/components/layout/section"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Demande de devis gratuit - H2 Débarras Maison",
  description:
    "Obtenez votre devis gratuit pour un débarras en Île-de-France. Réponse sous 2h, sans engagement. Professionnels et particuliers.",
}

export default function DevisPage() {
  return (
    <Section className="min-h-screen">
      <div className="w-full">
        <div className="mb-8 w-full text-center md:mb-12">
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Demande de devis gratuit
          </h1>
          <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
            Remplissez ce formulaire et recevez votre devis personnalisé sous 2 heures
          </p>
        </div>
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
  )
}
