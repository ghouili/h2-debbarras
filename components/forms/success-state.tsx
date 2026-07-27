"use client"

import { CheckCircle2, Phone, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { designTokens } from "@/lib/design-tokens"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function SuccessState() {
  return (
    <Card className="mx-auto w-full max-w-2xl border-border/60 shadow-lg overflow-hidden">
      <CardContent className="p-5 sm:p-6 md:p-8 lg:p-10">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-5 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-success-muted">
            <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-success" />
          </div>

          {/* Heading */}
          <h2
            className={cn(
              designTokens.typography.h2,
              designTokens.textScale.xl3xl4xl,
              "mb-2 sm:mb-3 text-foreground",
            )}
          >
            Demande envoyée avec succès !
          </h2>

          {/* Description */}
          <p
            className={cn(
              designTokens.textScale.baseBase,
              "mb-5 sm:mb-6 max-w-md text-muted-foreground leading-relaxed",
            )}
          >
            Nous avons bien reçu votre demande de devis. Notre équipe vous contactera dans les{" "}
            <span className="font-semibold text-foreground">2 prochaines heures</span> pour établir votre devis personnalisé.
          </p>

          {/* What's Next Card */}
          <Card className="mb-5 sm:mb-6 w-full max-w-md border-primary/20 bg-primary/5">
            <CardContent className="p-4 sm:p-5">
              <h3
                className={cn(
                  designTokens.typography.h4,
                  designTokens.textScale.base,
                  "mb-3 text-foreground",
                )}
              >
                Que se passe-t-il maintenant ?
              </h3>
              <ul
                className={cn(
                  designTokens.textScale.base,
                  "space-y-2.5 text-left text-muted-foreground",
                )}
              >
                <li className="flex items-start gap-2.5">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Vérification de votre demande</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Appel de notre expert sous 2h</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Devis gratuit et sans engagement</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className={cn("min-h-11 w-full flex-1 gap-2", designTokens.button.primary)}
            >
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                <Phone className="h-4 w-4" />
                Appeler maintenant
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn("min-h-11 w-full flex-1 gap-2", designTokens.button.secondary)}
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>

          {/* Availability note */}
          <p className={cn(designTokens.textScale.xs, "mt-4 text-muted-foreground")}>
            Disponible 7j/7 de 8h à 20h
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
