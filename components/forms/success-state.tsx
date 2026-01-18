"use client"

import { CheckCircle2, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function SuccessState() {
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardContent className="p-8 md:p-12">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-muted">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>

          {/* Heading */}
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            Demande envoyée avec succès !
          </h2>

          {/* Description */}
          <p className="mb-8 max-w-md text-base text-muted-foreground">
            Nous avons bien reçu votre demande de devis. Notre équipe vous contactera dans les{" "}
            <span className="font-semibold text-foreground">2 prochaines heures</span> pour établir votre devis personnalisé.
          </p>

          {/* What's Next Card */}
          <Card className="mb-8 w-full max-w-md border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Que se passe-t-il maintenant ?</h3>
              <ul className="space-y-2 text-left text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Vérification de votre demande</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Appel de notre expert sous 2h</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Devis gratuit et sans engagement</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="w-full space-y-3">
            <Button asChild size="lg" className="w-full">
              <a href="tel:+33769608300" className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                Appeler maintenant
              </a>
            </Button>
            <p className="text-xs text-muted-foreground">
              Disponible 7j/7 de 8h à 20h
            </p>
          </div>

          {/* Back to Home Link */}
          <div className="mt-8">
            <a
              href="/"
              className="text-sm font-medium text-primary hover:underline"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
