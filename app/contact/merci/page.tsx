import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Phone, Home } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { GoogleAdsLeadConversion } from "@/components/analytics/google-ads-lead-conversion"

export const metadata: Metadata = {
  title: "Merci pour votre message",
  description: "Votre message a ete recu. Nous vous contactons sous 2 heures.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function ContactMerciPage() {
  return (
    <Section>
      <GoogleAdsLeadConversion form="contact" />

      <div className="mx-auto max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>

            <h1
              className={cn(
                designTokens.typography.h1,
                designTokens.textScale["3xl4xl"],
                "mb-4",
              )}
            >
              Message envoye avec succes !
            </h1>

            <p
              className={cn(
                designTokens.textScale.lg,
                "mb-8 text-pretty text-muted-foreground",
              )}
            >
              Merci pour votre confiance. Nous avons bien recu votre message et nous vous contacterons dans les{" "}
              <strong className="text-foreground">2 heures</strong>.
            </p>

            <div className="mb-8 space-y-4 rounded-lg border border-border bg-secondary p-6">
              <h2 className={cn(designTokens.typography.h4, "font-semibold")}>
                Prochaines etapes :
              </h2>
              <ol
                className={cn(
                  designTokens.textScale.base,
                  "space-y-2 text-left text-muted-foreground",
                )}
              >
                <li className="flex items-start gap-2">
                  <span
                    className={cn(
                      designTokens.textScale.xs,
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
                    )}
                  >
                    1
                  </span>
                  <span>Nous analysons votre demande</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className={cn(
                      designTokens.textScale.xs,
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
                    )}
                  >
                    2
                  </span>
                  <span>Un conseiller vous rappelle sous 2h</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className={cn(
                      designTokens.textScale.xs,
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
                    )}
                  >
                    3
                  </span>
                  <span>Nous repondons a votre demande</span>
                </li>
              </ol>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Retour a l'accueil
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Nous appeler
                </a>
              </Button>
            </div>

            <p className={cn(designTokens.textScale.base, "mt-6 text-muted-foreground")}>
              Besoin d'une reponse immediate ? Appelez-nous au {siteConfig.contact.phone}
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
