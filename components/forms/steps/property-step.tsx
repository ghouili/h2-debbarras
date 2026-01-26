"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft } from "lucide-react"
import type { QuoteFormData } from "../quote-funnel"

type Props = {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function PropertyStep({ formData, updateFormData, nextStep, prevStep }: Props) {
  const propertyTypes = [
    { value: "appartement", label: "Appartement" },
    { value: "maison", label: "Maison" },
    { value: "cave", label: "Cave / Grenier" },
    { value: "bureau", label: "Bureau / Local" },
  ]

  const roomOptions = [
    { value: "studio", label: "Studio" },
    { value: "2", label: "2 pièces" },
    { value: "3", label: "3 pièces" },
    { value: "4", label: "4 pièces" },
    { value: "5+", label: "5+ pièces" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.propertyType && formData.rooms) {
      nextStep()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-semibold font-heading">Type de bien</h2>
      <div className="space-y-6">
        <div>
          <Label className="mb-3 block">Type de propriété *</Label>
          <RadioGroup value={formData.propertyType} onValueChange={(value) => updateFormData({ propertyType: value })}>
            <div className="grid gap-3 md:grid-cols-2">
              {propertyTypes.map((type) => (
                <div key={type.value}>
                  <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                  <Label
                    htmlFor={type.value}
                    className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-border p-4 transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="mb-3 block">Nombre de pièces *</Label>
          <RadioGroup value={formData.rooms} onValueChange={(value) => updateFormData({ rooms: value })}>
            <div className="grid gap-3 md:grid-cols-3">
              {roomOptions.map((option) => (
                <div key={option.value}>
                  <RadioGroupItem value={option.value} id={`rooms-${option.value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`rooms-${option.value}`}
                    className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-border p-4 transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <Button type="button" variant="outline" onClick={prevStep}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Button type="submit" className="flex-1" disabled={!formData.propertyType || !formData.rooms}>
          Continuer
        </Button>
      </div>
    </form>
  )
}
