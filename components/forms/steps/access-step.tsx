"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft } from "lucide-react"
import type { QuoteFormData } from "../quote-funnel"

type Props = {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function AccessStep({ formData, updateFormData, nextStep, prevStep }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.floor) {
      nextStep()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-semibold font-heading">Accessibilité</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="floor">Étage *</Label>
          <Input
            id="floor"
            type="text"
            placeholder="Ex: RDC, 2ème étage..."
            value={formData.floor}
            onChange={(e) => updateFormData({ floor: e.target.value })}
            required
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <Label htmlFor="elevator" className="cursor-pointer">
              Ascenseur disponible
            </Label>
            <p className="text-sm text-muted-foreground">Y a-t-il un ascenseur dans l'immeuble ?</p>
          </div>
          <Switch
            id="elevator"
            checked={formData.elevator}
            onCheckedChange={(checked) => updateFormData({ elevator: checked })}
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
