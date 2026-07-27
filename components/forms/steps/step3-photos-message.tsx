"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import type { QuoteFormData } from "../quote-funnel"
import Image from "next/image"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

interface Step3Props {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
  prevStep: () => void
}

export function Step3PhotosMessage({ formData, updateFormData, nextStep, prevStep }: Step3Props) {
  const [previews, setPreviews] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const selectedFiles = Array.from(files).slice(0, 6 - formData.photos.length)
    const newPhotos = [...formData.photos, ...selectedFiles]
    updateFormData({ photos: newPhotos })

    // Create previews
    const newPreviews = [...previews]
    selectedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result as string)
        setPreviews([...newPreviews])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    updateFormData({ photos: newPhotos })
    setPreviews(newPreviews)
  }

  const canAddMore = formData.photos.length < 6

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      {/* Photo Upload */}
      <div className="w-full">
        <h2
          className={cn(
            designTokens.textScale.lgXl,
            "mb-1 font-bold text-foreground font-heading",
          )}
        >
          Photos
        </h2>
        <p className={cn(designTokens.textScale.base, "mb-4 text-muted-foreground")}>
          Ajoutez jusqu'à 6 photos pour un devis plus précis (optionnel)
        </p>

        {/* Photo Grid */}
        {formData.photos.length > 0 && (
          <div className="mb-4 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
            {previews.map((preview, index) => (
              <div key={index} className="group relative w-full overflow-hidden rounded-lg border bg-muted">
                <div className="relative aspect-square w-full">
                  <Image
                    src={preview}
                    alt={`Aperçu ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 group-hover:opacity-100"
                  aria-label="Supprimer la photo"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        {canAddMore && (
          <div className="w-full">
            <input
              id="photos"
              type="file"
              accept="image/*"
              multiple
              max={6 - formData.photos.length}
              aria-label="Ajouter des photos"
              className="sr-only"
              onChange={handlePhotoUpload}
            />
            <label htmlFor="photos" className="block w-full" aria-label="Ajouter des photos">
              <Card className="w-full cursor-pointer border-2 border-dashed transition-colors hover:border-primary/50">
                <CardContent className="flex w-full flex-col items-center justify-center gap-2 p-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {formData.photos.length > 0 ? (
                      <ImageIcon className="h-6 w-6 text-primary" />
                    ) : (
                      <Upload className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className={cn(designTokens.textScale.base, "font-medium")}>
                      {formData.photos.length > 0 
                        ? `${formData.photos.length}/6 photo(s) ajoutée(s)` 
                        : "Ajouter des photos"}
                    </p>
                    <p className={cn(designTokens.textScale.xs, "mt-1 text-muted-foreground")}>
                      {canAddMore 
                        ? `Encore ${6 - formData.photos.length} photo(s) possible(s)` 
                        : "Maximum atteint"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </label>
          </div>
        )}
      </div>

      {/* Message */}
      <div className="w-full">
        <h2
          className={cn(
            designTokens.textScale.lgXl,
            "mb-1 font-bold text-foreground font-heading",
          )}
        >
          Message
        </h2>
        <p className={cn(designTokens.textScale.base, "mb-4 text-muted-foreground")}>
          Des détails spécifiques à nous communiquer ? (optionnel)
        </p>

        <Textarea
          id="message"
          placeholder="Ex: Accès difficile, objets encombrants, horaires préférés..."
          value={formData.message}
          onChange={(e) => updateFormData({ message: e.target.value })}
          rows={4}
          className="w-full resize-none"
        />
        <p className={cn(designTokens.textScale.xs, "mt-1.5 text-muted-foreground")}>
          Ces informations nous aideront à mieux préparer notre intervention
        </p>
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
