"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, AlertCircle } from "lucide-react";
import type { QuoteFormData } from "../quote-funnel";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

type Props = {
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  prevStep: () => void;
  onSubmitSuccess?: () => void;
};

export function Step4ContactConsent({
  formData,
  updateFormData,
  prevStep,
  onSubmitSuccess,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate consent
    if (!formData.consent) {
      setShowConsentError(true);
      return;
    }

    setIsSubmitting(true);
    setShowConsentError(false);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSubmitSuccess?.();
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.firstName?.trim() &&
    formData.lastName?.trim() &&
    formData.email?.trim() &&
    formData.phone?.trim() &&
    formData.consent;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      {/* Contact Info */}
      <div className="w-full">
        <h2
          className={cn(
            designTokens.textScale.lgXl,
            "mb-1 font-bold text-foreground font-heading",
          )}
        >
          Vos coordonnées
        </h2>
        <p className={cn(designTokens.textScale.sm, "mb-4 text-muted-foreground")}>
          Pour vous envoyer votre devis personnalisé
        </p>

        <div className="space-y-4">
          {/* First Name + Last Name */}
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <div className="w-full min-w-0">
              <Label htmlFor="firstName" className={cn(designTokens.textScale.sm, "font-medium")}>
                Prénom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Jean"
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                required
                className="mt-1.5 w-full"
              />
            </div>
            <div className="w-full min-w-0">
              <Label htmlFor="lastName" className={cn(designTokens.textScale.sm, "font-medium")}>
                Nom <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Dupont"
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                required
                className="mt-1.5 w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full">
            <Label htmlFor="email" className={cn(designTokens.textScale.sm, "font-medium")}>
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jean.dupont@exemple.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              required
              className="mt-1.5 w-full"
            />
          </div>

          {/* Phone */}
          <div className="w-full">
            <Label htmlFor="phone" className={cn(designTokens.textScale.sm, "font-medium")}>
              Téléphone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              required
              className="mt-1.5 w-full"
            />
          </div>
        </div>
      </div>

      {/* Consent Checkbox */}
      {/* <div className="w-full">
        <Card className={`w-full ${showConsentError ? "border-destructive" : ""}`}>
          <CardContent className="p-4">
            <div className="flex flex-col w-full items-start gap-3">
              <Checkbox
                id="consent"
                checked={formData.consent || false}
                onCheckedChange={(checked) => {
                  updateFormData({ consent: checked as boolean })
                  if (checked) setShowConsentError(false)
                }}
                className="mt-0.5 shrink-0"
                aria-invalid={showConsentError}
                aria-describedby={showConsentError ? "consent-error" : undefined}
              />
              <div className="min-w-0 flex-1">
                <Label 
                  htmlFor="consent" 
                  className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
                >
                  J'accepte d'être contacté par Débarras Aurea concernant ma demande de devis et je consens au traitement de mes données personnelles conformément à la{" "}
                  <a
                    href="/politique-confidentialite"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    politique de confidentialité
                  </a>
                  . <span className="text-destructive">*</span>
                </Label>
                
                {showConsentError && (
                  <div 
                    id="consent-error"
                    className="mt-2 flex items-center gap-1.5 text-xs text-destructive"
                    role="alert"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>Vous devez accepter le traitement de vos données pour continuer</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
      {/* <div className="w-full">
        <Card
          className={[
            "w-full rounded-2xl border bg-muted/20 shadow-xs transition-colors",
            "hover:bg-muted/30",
            showConsentError
              ? "border-destructive/60 ring-1 ring-destructive/30"
              : "border-border/60",
          ].join(" ")}
        >
          <CardContent
            className="p-2 sm:px-2.5"
            // Make the whole card toggle the checkbox (except the link)
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest("a")) return;

              const next = !(formData.consent || false);
              updateFormData({ consent: next });
              if (next) setShowConsentError(false);
            }}
            role="group"
            aria-labelledby="consent"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={formData.consent || false}
                onCheckedChange={(checked) => {
                  updateFormData({ consent: checked as boolean });
                  if (checked) setShowConsentError(false);
                }}
                // slightly larger hit area visually
                className="mt-1 h-5 w-5 shrink-0"
                aria-invalid={showConsentError}
                aria-describedby={
                  showConsentError ? "consent-error" : undefined
                }
              />

              <div className="min-w-0 flex-1">
                <Label
                  htmlFor="consent"
                  className="block cursor-pointer text-sm leading-relaxed text-foreground/80 text-pretty"
                >
                  J'accepte d'être contacté par Débarras Aurea concernant ma
                  demande de devis et je consens au traitement de mes données
                  personnelles conformément à la{" "}
                  <a
                    href="/politique-confidentialite"
                    className="inline font-medium text-primary underline underline-offset-4 hover:opacity-90"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    politique de confidentialité
                  </a>
                  <span className="text-destructive"> *</span>
                </Label>

                {showConsentError && (
                  <div
                    id="consent-error"
                    className="mt-2 flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      Vous devez accepter le traitement de vos données pour
                      continuer.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
      <div className="w-full">
        <Label
          htmlFor="consent"
          className={[
            "group flex w-full items-start gap-3 rounded-lg border p-4",
            "transition-colors hover:bg-muted/40",
            "has-[[aria-checked=true]]:border-primary/50 has-[[aria-checked=true]]:bg-primary/5",
            showConsentError ? "border-destructive" : "",
          ].join(" ")}
        >
          <Checkbox
            id="consent"
            checked={!!formData.consent}
            onCheckedChange={(checked) => {
              const next = checked === true; // <-- IMPORTANT (no 'indeterminate' stored)
              updateFormData({ consent: next });
              if (next) setShowConsentError(false);
            }}
            className="mt-0.5 shrink-0"
            aria-invalid={showConsentError}
            aria-describedby={showConsentError ? "consent-error" : undefined}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="min-w-0 flex-1 space-y-2">
            <p className={cn(designTokens.textScale.sm, "leading-relaxed text-muted-foreground")}>
              J&apos;accepte d&apos;être contacté par Débarras Aurea
              concernant ma demande de devis et je consens au traitement de mes
              données personnelles conformément à la{" "}
              <a
                href="/politique-confidentialite"
                className="font-medium text-primary underline underline-offset-4"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                politique de confidentialité
              </a>
              <span className="text-destructive"> *</span>
            </p>

            {showConsentError && (
              <div
                id="consent-error"
                className={cn(
                  designTokens.textScale.xs,
                  "flex items-center gap-1.5 text-destructive",
                )}
                role="alert"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>
                  Vous devez accepter le traitement de vos données pour
                  continuer
                </span>
              </div>
            )}
          </div>
        </Label>
      </div>    

      {/* Navigation Buttons */}
      <div className="flex w-full gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={isSubmitting}
          className="flex-1 bg-transparent"
        >
          Retour
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi...
            </>
          ) : (
            "Envoyer ma demande"
          )}
        </Button>
      </div>
    </form>
  );
}
