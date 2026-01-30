"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { QuoteFormData } from "../quote-funnel"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

const localTypes = [
  { value: "boutique", label: "Boutique" },
  { value: "entrepot", label: "Entrepôt" },
  { value: "restaurant", label: "Restaurant" },
  { value: "bureau", label: "Bureau" },
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison" },
  { value: "cave-grenier", label: "Cave / Grenier" },
  { value: "autre", label: "Autre" },
]

interface Step2Props {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function Step2PropertyDetails({ formData, updateFormData, nextStep, prevStep }: Step2Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      {/* Local Type */}
      <div className="w-full">
        <h2
          className={cn(
            designTokens.textScale.lgXl,
            "mb-1 font-bold text-foreground font-heading",
          )}
        >
          Type de bien
        </h2>
        <p className={cn(designTokens.textScale.sm, "mb-4 text-muted-foreground")}>
          Précisez la nature du lieu
        </p>

        <RadioGroup value={formData.localType} onValueChange={(value) => updateFormData({ localType: value })}>
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            {localTypes.map((type) => {
              const isSelected = formData.localType === type.value
              return (
                <Card
                  key={type.value}
                  className={`w-full min-w-0 cursor-pointer transition-all ${
                    isSelected 
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => updateFormData({ localType: type.value })}
                >
                  <CardContent className="flex w-full min-w-0 items-center justify-center">
                    <RadioGroupItem value={type.value} id={type.value} className="sr-only" />
                    <Label
                      htmlFor={type.value}
                      className={cn(
                        designTokens.textScale.sm,
                        "w-fit min-w-0 cursor-pointer text-center font-medium leading-tight",
                      )}
                    >
                      {type.label}
                    </Label>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </RadioGroup>
      </div>

      {/* Floor and Elevator */}
      <div className="w-full">
        <h2
          className={cn(
            designTokens.textScale.lgXl,
            "mb-1 font-bold text-foreground font-heading",
          )}
        >
          Accès
        </h2>
        <p className={cn(designTokens.textScale.sm, "mb-4 text-muted-foreground")}>
          Informations pratiques pour l'intervention
        </p>

        <div className="grid w-full gap-4 sm:grid-cols-1">
          {/* Floor Input */}
          <div className="w-full min-w-0">
            <Label htmlFor="floor" className={cn(designTokens.textScale.sm, "font-medium")}>
              Étage
            </Label>
            <Input
              id="floor"
              type="text"
              placeholder="RDC, 1er, 2ème..."
              value={formData.floor}
              onChange={(e) => updateFormData({ floor: e.target.value })}
              className="mt-1.5 w-full"
            />
            <p className={cn(designTokens.textScale.xs, "mt-1 text-muted-foreground")}>
              Ex: RDC, 1er, 2ème
            </p>
          </div>

          {/* Elevator Toggle */}
          <div className="w-full min-w-0">
            <Label className={cn(designTokens.textScale.sm, "mb-1.5 block font-medium")}>
              Ascenseur
            </Label>
            <Card className="w-full">
              <CardContent className="flex w-full min-w-0 items-center justify-between px-4">
                <Label
                  htmlFor="elevator"
                  className={cn(
                    designTokens.textScale.sm,
                    "min-w-0 flex-1 cursor-pointer font-medium",
                  )}
                >
                  Ascenseur disponible
                </Label>
                <Switch
                  id="elevator"
                  checked={formData.elevator}
                  onCheckedChange={(checked) => updateFormData({ elevator: checked })}
                  className="shrink-0"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex w-full gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={prevStep} 
          className="flex-1 bg-transparent"
        >
          Retour
        </Button>
        <Button 
          type="submit" 
          className="flex-1"
        >
          Continuer
        </Button>
      </div>
    </form>
  )
}
