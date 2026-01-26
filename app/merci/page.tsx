import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Phone, Home } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Section } from "@/components/layout/section"

export const metadata: Metadata = {
  title: "Merci pour votre demande",
  description: "Votre demande de devis a été reçue. Nous vous contactons sous 2 heures.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function MerciPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>

            <h1 className={cn(designTokens.typography.h1, "mb-4 text-3xl")}>
              Demande envoyée avec succès !
            </h1>

            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Merci pour votre confiance. Nous avons bien reçu votre demande de devis et nous vous contacterons dans les{" "}
              <strong className="text-foreground">2 heures</strong> pour vous fournir une estimation personnalisée.
            </p>

            <div className="mb-8 space-y-4 rounded-lg border border-border bg-secondary p-6">
              <h2 className={cn(designTokens.typography.h4, "font-semibold")}>
                Prochaines étapes :
              </h2>
              <ol className="space-y-2 text-left text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    1
                  </span>
                  <span>Vous recevrez un email de confirmation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    2
                  </span>
                  <span>Un conseiller vous contactera pour finaliser votre devis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    3
                  </span>
                  <span>Nous planifierons ensemble votre intervention</span>
                </li>
              </ol>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Nous appeler
                </a>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Besoin d'une réponse immédiate ? Appelez-nous au {siteConfig.contact.phone}
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
