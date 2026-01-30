"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import type { QuoteFormData } from "../quote-funnel"
import { useRouter } from "next/navigation"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

type Props = {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  prevStep: () => void
  onSubmitSuccess?: () => void
}

export function ContactStep({ formData, updateFormData, prevStep, onSubmitSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.consent) {
      alert("Vous devez accepter le traitement de vos données pour continuer")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onSubmitSuccess?.()
        router.push("/merci")
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("[v0] Lead submission error:", error)
      alert("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2
          className={cn(
            designTokens.textScale.xl,
            "mb-4 font-bold font-heading",
          )}
        >
          Vos coordonnées
        </h2>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName" className={designTokens.textScale.sm}>
                Prénom *
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Jean"
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className={designTokens.textScale.sm}>
                Nom *
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Dupont"
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className={designTokens.textScale.sm}>
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jean.dupont@example.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className={designTokens.textScale.sm}>
              Téléphone *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              required
            />
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border p-4">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => updateFormData({ consent: checked as boolean })}
              required
              className="mt-0.5"
            />
            <Label
              htmlFor="consent"
              className={cn(
                designTokens.textScale.sm,
                "cursor-pointer leading-relaxed text-muted-foreground",
              )}
            >
              J'accepte d'être contacté par Débarras Aurea concernant ma demande de devis et je consens au
              traitement de mes données personnelles conformément à la{" "}
              <a
                href="/politique-confidentialite"
                className="text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                politique de confidentialité
              </a>
              . *
            </Label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={isSubmitting}
          className="flex-1 bg-transparent"
        >
          Retour
        </Button>
        <Button type="submit" className="flex-1" disabled={!formData.consent || isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi...
            </>
          ) : (
            "Envoyer ma demande"
          )}
        </Button>
      </div>
    </form>
  )
}
