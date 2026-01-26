"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import type { QuoteFormData } from "../quote-funnel"

type Props = {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function LocationStep({ formData, updateFormData, nextStep, prevStep }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.postalCode && formData.city) {
      nextStep()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-semibold font-heading">Où se situe le bien à débarrasser ?</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="postalCode">Code postal *</Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="Ex: 75015"
            value={formData.postalCode}
            onChange={(e) => updateFormData({ postalCode: e.target.value })}
            required
            maxLength={5}
            pattern="[0-9]{5}"
          />
        </div>
        <div>
          <Label htmlFor="city">Ville *</Label>
          <Input
            id="city"
            type="text"
            placeholder="Ex: Paris"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <Button type="button" variant="outline" onClick={prevStep}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Button type="submit" className="flex-1">
          Continuer
        </Button>
      </div>
    </form>
  )
}
