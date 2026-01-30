"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Home, Store, Warehouse, HardHat, Truck } from "lucide-react"
import type { QuoteFormData } from "../quote-funnel"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

const services = [
  { id: "commerces-entrepots", label: "Commerce / Entrepôt", icon: Store, category: "pro" },
  { id: "bureaux-locaux", label: "Bureau / Local pro", icon: Building2, category: "pro" },
  { id: "debarras-maison", label: "Débarras maison", icon: Home, category: "particulier" },
  { id: "debarras-appartement", label: "Débarras appartement", icon: Home, category: "particulier" },
  { id: "cave-grenier", label: "Cave / Grenier / Garage", icon: Warehouse, category: "particulier" },
  { id: "gravats", label: "Gravats / chantier", icon: HardHat, category: "pro" },
  { id: "demenagement-particulier", label: "Déménagement", icon: Truck, category: "particulier" },
  { id: "demenagement-entreprise", label: "Déménagement entreprise", icon: Truck, category: "pro" },
]

const timingOptions = [
  { value: "urgent", label: "Urgent (<48h)" },
  { value: "cette-semaine", label: "Cette semaine" },
  { value: "flexible", label: "Flexible" },
]

interface ServiceLocationStepProps {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
}

export function ServiceLocationStep({ formData, updateFormData, nextStep }: ServiceLocationStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.service || !formData.postalCode || !formData.timing) {
      alert("Veuillez remplir tous les champs requis")
      return
    }
    nextStep()
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
          Type de service
        </h2>
        <RadioGroup value={formData.service} onValueChange={(value) => updateFormData({ service: value })}>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all ${
                    formData.service === service.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => updateFormData({ service: service.id })}
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <RadioGroupItem value={service.id} id={service.id} />
                    <Icon className="h-5 w-5 text-primary" />
                    <Label
                      htmlFor={service.id}
                      className={cn(
                        designTokens.textScale.sm,
                        "flex-1 cursor-pointer font-medium",
                      )}
                    >
                      {service.label}
                    </Label>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="postalCode" className={designTokens.textScale.sm}>
            Code postal *
          </Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="75001"
            value={formData.postalCode}
            onChange={(e) => updateFormData({ postalCode: e.target.value })}
            maxLength={5}
            pattern="[0-9]{5}"
            required
          />
        </div>
        <div>
          <Label htmlFor="city" className={designTokens.textScale.sm}>
            Ville
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="Paris"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label className={cn(designTokens.textScale.sm, "mb-3 block")}>
          Quand souhaitez-vous intervenir ? *
        </Label>
        <RadioGroup value={formData.timing} onValueChange={(value) => updateFormData({ timing: value })}>
          <div className="grid gap-2">
            {timingOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all ${
                  formData.timing === option.value ? "border-primary bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => updateFormData({ timing: option.value })}
              >
                <CardContent className="flex items-center gap-3 p-3">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className={cn(
                      designTokens.textScale.sm,
                      "flex-1 cursor-pointer font-medium",
                    )}
                  >
                    {option.label}
                  </Label>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Continuer
      </Button>
    </form>
  )
}
