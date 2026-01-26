"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"
import type { QuoteFormData } from "../quote-funnel"

const localTypes = [
  { value: "boutique", label: "Boutique" },
  { value: "entrepot", label: "Entrepôt" },
  { value: "restaurant", label: "Restaurant" },
  { value: "bureau", label: "Bureau" },
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison" },
  { value: "autre", label: "Autre" },
]

const volumeOptions = [
  { value: "petit", label: "Petit (< 20m³)" },
  { value: "moyen", label: "Moyen (20-50m³)" },
  { value: "grand", label: "Grand (> 50m³)" },
  { value: "inconnu", label: "Je ne sais pas" },
]

interface AccessDetailsStepProps {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function AccessDetailsStep({ formData, updateFormData, nextStep, prevStep }: AccessDetailsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      updateFormData({ photos: Array.from(files) })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-bold font-heading">Détails du local</h2>

        <div className="mb-4">
          <Label className="mb-2 block">Type de local</Label>
          <RadioGroup value={formData.localType} onValueChange={(value) => updateFormData({ localType: value })}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {localTypes.map((type) => (
                <Card
                  key={type.value}
                  className={`cursor-pointer transition-all ${
                    formData.localType === type.value ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => updateFormData({ localType: type.value })}
                >
                  <CardContent className="flex items-center justify-center p-3">
                    <RadioGroupItem value={type.value} id={type.value} className="sr-only" />
                    <Label htmlFor={type.value} className="cursor-pointer text-center text-sm font-medium">
                      {type.label}
                    </Label>
                  </CardContent>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="floor">Étage</Label>
            <Input
              id="floor"
              type="text"
              placeholder="RDC, 1er, 2ème..."
              value={formData.floor}
              onChange={(e) => updateFormData({ floor: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="elevator" className="cursor-pointer font-medium">
              Ascenseur disponible
            </Label>
            <Switch
              id="elevator"
              checked={formData.elevator}
              onCheckedChange={(checked) => updateFormData({ elevator: checked })}
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Estimation du volume (optionnel)</Label>
        <RadioGroup
          value={formData.volumeEstimate}
          onValueChange={(value) => updateFormData({ volumeEstimate: value })}
        >
          <div className="grid gap-2">
            {volumeOptions.map((option) => (
              <Card
                key={option.value}
                className={`cursor-pointer transition-all ${
                  formData.volumeEstimate === option.value ? "border-primary bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => updateFormData({ volumeEstimate: option.value })}
              >
                <CardContent className="flex items-center gap-3 p-3">
                  <RadioGroupItem value={option.value} id={`volume-${option.value}`} />
                  <Label htmlFor={`volume-${option.value}`} className="flex-1 cursor-pointer text-sm font-medium">
                    {option.label}
                  </Label>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="photos">Photos (optionnel, max 6)</Label>
        <div className="mt-2">
          <label
            htmlFor="photos"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition-colors hover:border-primary/50"
          >
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {formData.photos.length > 0 ? `${formData.photos.length} photo(s) sélectionnée(s)` : "Choisir des photos"}
            </span>
          </label>
          <Input
            id="photos"
            type="file"
            accept="image/*"
            multiple
            max={6}
            className="sr-only"
            onChange={handlePhotoUpload}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message complémentaire (optionnel)</Label>
        <Textarea
          id="message"
          placeholder="Décrivez vos besoins spécifiques..."
          value={formData.message}
          onChange={(e) => updateFormData({ message: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
          Retour
        </Button>
        <Button type="submit" className="flex-1">
          Continuer
        </Button>
      </div>
    </form>
  )
}
