"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft } from "lucide-react"
import type { QuoteFormData } from "../quote-funnel"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

type Props = {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function VolumeStep({ formData, updateFormData, nextStep, prevStep }: Props) {
  const volumeOptions = [
    { value: "petit", label: "Petit volume", description: "Quelques meubles ou cartons" },
    { value: "moyen", label: "Volume moyen", description: "Mobilier d'une ou deux pièces" },
    { value: "grand", label: "Grand volume", description: "Tout le mobilier d'un logement" },
    { value: "tres-grand", label: "Très grand volume", description: "Maison complète avec annexes" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.volume) {
      nextStep()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2
        className={cn(
          designTokens.textScale["2xl"],
          "mb-6 font-semibold font-heading",
        )}
      >
        Volume à débarrasser
      </h2>
      <div className="space-y-3">
        <RadioGroup value={formData.volume} onValueChange={(value) => updateFormData({ volume: value })}>
          {volumeOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
              <Label
                htmlFor={option.value}
                className={cn(
                  designTokens.textScale.base,
                  "flex cursor-pointer items-start gap-4 rounded-lg border-2 border-border p-4 transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
                )}
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-border peer-data-[state=checked]:border-primary">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary opacity-0 peer-data-[state=checked]:opacity-100" />
                </div>
                <div>
                  <div className={cn(designTokens.textScale.base, "font-semibold")}>
                    {option.label}
                  </div>
                  <div className={cn(designTokens.textScale.base, "text-muted-foreground")}>
                    {option.description}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="mt-6 flex gap-3">
        <Button type="button" variant="outline" onClick={prevStep}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Button type="submit" className="flex-1" disabled={!formData.volume}>
          Continuer
        </Button>
      </div>
    </form>
  )
}
