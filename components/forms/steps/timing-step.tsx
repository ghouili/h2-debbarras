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

export function TimingStep({ formData, updateFormData, nextStep, prevStep }: Props) {
  const timingOptions = [
    { value: "urgent", label: "Urgent (sous 48h)" },
    { value: "semaine", label: "Cette semaine" },
    { value: "mois", label: "Ce mois-ci" },
    { value: "flexible", label: "Flexible" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.timing) {
      nextStep()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-semibold font-heading">Quand souhaitez-vous intervenir ?</h2>
      <div className="space-y-3">
        <RadioGroup value={formData.timing} onValueChange={(value) => updateFormData({ timing: value })}>
          {timingOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem value={option.value} id={`timing-${option.value}`} className="peer sr-only" />
              <Label
                htmlFor={`timing-${option.value}`}
                className="flex cursor-pointer items-center rounded-lg border-2 border-border p-4 transition-all hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                {option.label}
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
        <Button type="submit" className="flex-1" disabled={!formData.timing}>
          Continuer
        </Button>
      </div>
    </form>
  )
}
