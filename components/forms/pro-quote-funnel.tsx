"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { trackStartDevis, trackQuoteStep, trackLeadSubmit } from "@/lib/analytics"
import { ArrowRight, ArrowLeft, Upload, Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

type ProQuoteFormData = {
  service: string
  postalCode: string
  city: string
  timing: string
  localType: string
  floor: string
  elevator: boolean
  truckAccess: boolean
  surfaceArea: string
  photos: File[]
  message: string
  firstName: string
  lastName: string
  email: string
  phone: string
  consent: boolean
}

const initialFormData: ProQuoteFormData = {
  service: "commerces-entrepots",
  postalCode: "",
  city: "",
  timing: "",
  localType: "",
  floor: "0",
  elevator: false,
  truckAccess: true,
  surfaceArea: "",
  photos: [],
  message: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  consent: false,
}

export function ProQuoteFunnel() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ProQuoteFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    trackStartDevis()
  }, [])

  useEffect(() => {
    const stepNames = ["Localisation & Timing", "Coordonnées"]
    trackQuoteStep(currentStep, stepNames[currentStep - 1])
  }, [currentStep])

  const updateFormData = (data: Partial<ProQuoteFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setErrors({})
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.postalCode || formData.postalCode.length !== 5) {
      newErrors.postalCode = "Code postal invalide"
    }
    if (!formData.city.trim()) {
      newErrors.city = "Ville requise"
    }
    if (!formData.timing) {
      newErrors.timing = "Timing requis"
    }
    if (!formData.localType) {
      newErrors.localType = "Type de local requis"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Prénom requis"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Nom requis"
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }
    if (!formData.phone.trim() || !/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Téléphone invalide"
    }
    if (!formData.consent) {
      newErrors.consent = "Vous devez accepter la politique de confidentialité"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photos") {
          ;(value as File[]).forEach((file) => formDataToSend.append("photos", file))
        } else {
          formDataToSend.append(key, String(value))
        }
      })

      const response = await fetch("/api/leads", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) throw new Error("Submission failed")

      trackLeadSubmit()
      router.push("/merci")
    } catch (error) {
      setErrors({ submit: "Une erreur est survenue. Veuillez réessayer." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 6)
    updateFormData({ photos: files })
  }

  const totalSteps = 2

  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="p-6 md:p-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Localisation & Timing */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Votre projet</h3>
            </div>

            {/* Postal Code & City */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="postalCode">
                  Code postal <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="postalCode"
                  type="text"
                  maxLength={5}
                  placeholder="75001"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData({ postalCode: e.target.value })}
                  className={errors.postalCode ? "border-destructive" : ""}
                />
                {errors.postalCode && <p className="mt-1 text-sm text-destructive">{errors.postalCode}</p>}
              </div>
              <div>
                <Label htmlFor="city">
                  Ville <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Paris"
                  value={formData.city}
                  onChange={(e) => updateFormData({ city: e.target.value })}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && <p className="mt-1 text-sm text-destructive">{errors.city}</p>}
              </div>
            </div>

            {/* Local Type */}
            <div>
              <Label>
                Type de local <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.localType}
                onValueChange={(value) => updateFormData({ localType: value })}
                className="mt-2 grid gap-3 sm:grid-cols-2"
              >
                {["Boutique", "Entrepôt", "Restaurant", "Bureau", "Autre"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.toLowerCase()} id={`type-${type}`} />
                    <Label htmlFor={`type-${type}`} className="cursor-pointer font-normal">
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.localType && <p className="mt-1 text-sm text-destructive">{errors.localType}</p>}
            </div>

            {/* Timing */}
            <div>
              <Label>
                Quand souhaitez-vous intervenir ? <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.timing}
                onValueChange={(value) => updateFormData({ timing: value })}
                className="mt-2 space-y-2"
              >
                {[
                  { value: "urgent", label: "Urgent (< 48h)" },
                  { value: "week", label: "Cette semaine" },
                  { value: "flexible", label: "Flexible" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`timing-${option.value}`} />
                    <Label htmlFor={`timing-${option.value}`} className="cursor-pointer font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.timing && <p className="mt-1 text-sm text-destructive">{errors.timing}</p>}
            </div>

            {/* Access details */}
            <div className="space-y-3">
              <Label>Accès (optionnel)</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="floor" className="text-sm text-muted-foreground">
                    Étage
                  </Label>
                  <Input
                    id="floor"
                    type="text"
                    placeholder="0"
                    value={formData.floor}
                    onChange={(e) => updateFormData({ floor: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="surface" className="text-sm text-muted-foreground">
                    Surface (m²)
                  </Label>
                  <Input
                    id="surface"
                    type="text"
                    placeholder="200"
                    value={formData.surfaceArea}
                    onChange={(e) => updateFormData({ surfaceArea: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="elevator"
                  checked={formData.elevator}
                  onCheckedChange={(checked) => updateFormData({ elevator: checked as boolean })}
                />
                <Label htmlFor="elevator" className="cursor-pointer text-sm font-normal">
                  Ascenseur disponible
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="truckAccess"
                  checked={formData.truckAccess}
                  onCheckedChange={(checked) => updateFormData({ truckAccess: checked as boolean })}
                />
                <Label htmlFor="truckAccess" className="cursor-pointer text-sm font-normal">
                  Accès camion possible
                </Label>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Détails supplémentaires (optionnel)</Label>
              <Textarea
                id="message"
                placeholder="Précisez votre besoin, volumes estimés, contraintes d'accès..."
                rows={3}
                value={formData.message}
                onChange={(e) => updateFormData({ message: e.target.value })}
              />
            </div>

            <Button onClick={nextStep} className="w-full" size="lg">
              Continuer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Contact */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-1 text-xl font-semibold">Vos coordonnées</h3>
              <p className="text-sm text-muted-foreground">Pour recevoir votre devis gratuitement</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">
                  Prénom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData({ firstName: e.target.value })}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && <p className="mt-1 text-sm text-destructive">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">
                  Nom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && <p className="mt-1 text-sm text-destructive">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">
                Téléphone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
            </div>

            {/* Photos */}
            <div>
              <Label htmlFor="photos">Photos (optionnel, max 6)</Label>
              <div className="mt-2">
                <label
                  htmlFor="photos"
                  className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition-colors hover:border-muted-foreground/50"
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {formData.photos.length > 0
                        ? `${formData.photos.length} photo(s) sélectionnée(s)`
                        : "Cliquez pour ajouter des photos"}
                    </p>
                  </div>
                  <input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => updateFormData({ consent: checked as boolean })}
                className={errors.consent ? "border-destructive" : ""}
              />
              <Label htmlFor="consent" className="cursor-pointer text-sm font-normal leading-tight">
                J'accepte que mes données soient utilisées pour me recontacter concernant ma demande de devis (
                <a href="/politique-confidentialite" className="text-primary hover:underline">
                  Politique de confidentialité
                </a>
                ) <span className="text-destructive">*</span>
              </Label>
            </div>
            {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

            {errors.submit && (
              <Alert variant="destructive">
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button onClick={prevStep} variant="outline" className="flex-1 bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1" size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Recevoir mon devis
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
