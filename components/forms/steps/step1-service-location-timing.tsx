"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Home, Store, Warehouse, HardHat, Truck } from "lucide-react"
import type { QuoteFormData } from "../quote-funnel"

const services = [
  { id: "debarras-maison", label: "Débarras maison", icon: Home },
  { id: "debarras-appartement", label: "Débarras appartement", icon: Home },
  { id: "cave-grenier", label: "Cave / Grenier", icon: Warehouse },
  { id: "commerces-entrepots", label: "Commerce / Entrepôt", icon: Store },
  { id: "bureaux-locaux", label: "Bureau / Local", icon: Building2 },
  { id: "gravats", label: "Gravats / chantier", icon: HardHat },
  { id: "demenagement-particulier", label: "Déménagement", icon: Truck },
  { id: "demenagement-entreprise", label: "Déménagement entreprise", icon: Truck },
]

interface Step1Props {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
}

export function Step1ServiceLocationTiming({ formData, updateFormData, nextStep }: Step1Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.service || !formData.postalCode ) {
      return
    }
    nextStep()
  }

  const isFormValid = formData.service && formData.postalCode 

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      {/* Service Selection */}
      <div className="w-full">
        <h2 className="mb-1 text-lg font-bold text-foreground sm:text-xl font-heading">Type de service</h2>
        <p className="mb-4 text-sm text-muted-foreground">Sélectionnez le type d'intervention</p>
        
        <RadioGroup value={formData.service} onValueChange={(value) => updateFormData({ service: value })}>
          <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon
              const isSelected = formData.service === service.id
              return (
                <Card
                  key={service.id}
                  className={`w-full min-w-0 cursor-pointer transition-all ${
                    isSelected 
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => updateFormData({ service: service.id })}
                >
                  <CardContent className="flex w-full min-w-0 items-center gap-3 px-2.5">
                    <RadioGroupItem value={service.id} id={service.id} className="shrink-0" />
                    <Icon className="h-5 w-5 shrink-0 text-primary" />
                    <Label htmlFor={service.id} className="min-w-0 flex-1 cursor-pointer text-sm font-medium leading-tight">
                      {service.label}
                    </Label>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </RadioGroup>
      </div>

      {/* Location Inputs */}
      <div className="w-full">
        <h2 className="mb-1 text-lg font-bold text-foreground sm:text-xl font-heading">Localisation</h2>
        <p className="mb-4 text-sm text-muted-foreground">Où se situe le bien ?</p>
        
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <div className="w-full min-w-0">
            <Label htmlFor="postalCode" className="text-sm font-medium">
              Code postal <span className="text-destructive">*</span>
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
              className="mt-1.5 w-full"
            />
          </div>
          <div className="w-full min-w-0">
            <Label htmlFor="city" className="text-sm font-medium">
              Ville
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Paris"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              className="mt-1.5 w-full"
            />
          </div>
        </div>
      </div>

      {/* Timing Selection */}
      {/* <div className="w-full">
        <h2 className="mb-1 text-lg font-bold text-foreground sm:text-xl">Délai d'intervention</h2>
        <p className="mb-4 text-sm text-muted-foreground">Quand souhaitez-vous intervenir ?</p>
        
        <RadioGroup value={formData.timing} onValueChange={(value) => updateFormData({ timing: value })}>
          <div className="grid w-full gap-2.5">
            {timingOptions.map((option) => {
              const isSelected = formData.timing === option.value
              return (
                <Card
                  key={option.value}
                  className={`w-full min-w-0 cursor-pointer transition-all ${
                    isSelected 
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => updateFormData({ timing: option.value })}
                >
                  <CardContent className="flex w-full min-w-0 items-center gap-3 p-3.5">
                    <RadioGroupItem value={option.value} id={option.value} className="shrink-0" />
                    <span className="shrink-0 text-lg">{option.emoji}</span>
                    <Label htmlFor={option.value} className="min-w-0 flex-1 cursor-pointer text-sm font-medium">
                      {option.label}
                    </Label>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </RadioGroup>
      </div> */}

      <Button 
        type="submit" 
        size="lg" 
        className="w-full"
        disabled={!isFormValid}
      >
        Continuer
      </Button>
    </form>
  )
}
