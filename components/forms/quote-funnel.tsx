"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { trackStartDevis, trackLeadSubmit } from "@/lib/analytics";
import { SuccessState } from "./success-state";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import {
  Building2,
  Home,
  Store,
  Warehouse,
  HardHat,
  Truck,
  Loader2,
  AlertCircle,
  Phone,
  Sparkles,
} from "lucide-react";

export type QuoteFormData = {
  service: string;
  postalCode: string;
  city: string;
  timing: string;
  localType: string;
  propertyType?: string;
  rooms?: string;
  volume?: string;
  volumeEstimate?: string;
  floor: string;
  elevator: boolean;
  photos: File[];
  message: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
};

const initialFormData: QuoteFormData = {
  service: "",
  postalCode: "",
  city: "",
  timing: "",
  localType: "",
  propertyType: "",
  rooms: "",
  volume: "",
  volumeEstimate: "",
  floor: "",
  elevator: false,
  photos: [],
  message: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  consent: false,
};

const services = [
  { id: "debarras-maison", label: "Débarras maison", icon: Home },
  { id: "debarras-appartement", label: "Débarras appartement", icon: Home },
  { id: "cave-grenier", label: "Cave / Grenier", icon: Warehouse },
  { id: "encombrants", label: "Encombrants", icon: Warehouse },
  { id: "commerces-entrepots", label: "Commerce / Entrepôt", icon: Store },
  { id: "bureaux-locaux", label: "Bureau / Local", icon: Building2 },
  { id: "gravats", label: "Gravats / chantier", icon: HardHat },
  { id: "demenagement-particulier", label: "Déménagement", icon: Truck },
  { id: "demenagement-entreprise", label: "Déménagement entreprise", icon: Truck },
];

export function QuoteFunnel() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
    trackStartDevis();
  }, [searchParams]);

  const updateFormData = useCallback((data: Partial<QuoteFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        trackLeadSubmit();
        setIsSuccess(true);
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
    formData.service &&
    formData.postalCode &&
    formData.firstName?.trim() &&
    formData.lastName?.trim() &&
    formData.email?.trim() &&
    formData.phone?.trim() &&
    formData.consent;

  if (isSuccess) {
    return <SuccessState />;
  }

  return (
    <Card className="mx-auto w-full max-w-4xl overflow-hidden border-border/60 shadow-lg">
      <CardContent className="w-full max-w-full p-4 sm:p-5 md:p-6 lg:p-8">
        {/* Reassurance banner */}
        <div className="mb-5 sm:mb-6 w-full rounded-xl bg-primary/5 p-3 sm:p-4 text-center border border-primary/10">
          <p className="text-xs sm:text-sm font-medium text-foreground">
            🕐 Réponse sous 2h • ✓ Devis gratuit, sans engagement
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5 sm:space-y-6">
          {/* Service Selection */}
          <div className="w-full">
            <h2 className="mb-2 text-base font-bold text-foreground sm:text-lg">
              Type de service <span className="text-destructive">*</span>
            </h2>
            <RadioGroup
              value={formData.service}
              onValueChange={(value) => updateFormData({ service: value })}
            >
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {services.map((service) => {
                  const Icon = service.icon;
                  const isSelected = formData.service === service.id;
                  return (
                    <Card
                      key={service.id}
                      className={cn(
                        "w-full cursor-pointer transition-all min-h-11",
                        isSelected
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                          : "hover:border-primary/50 hover:shadow-sm"
                      )}
                      onClick={() => updateFormData({ service: service.id })}
                    >
                      <CardContent className="flex w-full items-center gap-2.5 px-3 py-2.5 min-h-11">
                        <RadioGroupItem
                          value={service.id}
                          id={service.id}
                          className="shrink-0 h-4 w-4"
                        />
                        <Icon className="h-4 w-4 shrink-0 text-primary" />
                        <Label
                          htmlFor={service.id}
                          className="cursor-pointer text-xs font-medium leading-tight sm:text-sm flex-1"
                        >
                          {service.label}
                        </Label>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Location */}
          <div className="grid w-full gap-4 md:grid-cols-2">
            <div className="w-full">
              <Label htmlFor="postalCode" className="text-sm font-medium mb-1.5 block">
                Code postal <span className="text-destructive">*</span>
              </Label>
              <Input
                id="postalCode"
                type="text"
                inputMode="numeric"
                placeholder="75001"
                value={formData.postalCode}
                onChange={(e) => updateFormData({ postalCode: e.target.value.replace(/\D/g, "").slice(0, 5) })}
                maxLength={5}
                required
                className="min-h-11 h-11 w-full"
              />
              {/* Reserved space for eligibility feedback */}
              <div className="min-h-5" />
            </div>
            <div className="w-full">
              <Label htmlFor="city" className="text-sm font-medium mb-1.5 block">
                Ville <span className="text-muted-foreground">(optionnel)</span>
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Paris"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                autoComplete="address-level2"
                className="min-h-11 h-11 w-full"
              />
              <div className="min-h-5" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full space-y-4">
            <h2 className="text-base font-bold text-foreground sm:text-lg">
              Vos coordonnées
            </h2>

            <div className="grid w-full gap-4 md:grid-cols-2">
              <div className="w-full">
                <Label htmlFor="firstName" className="text-sm font-medium mb-1.5 block">
                  Prénom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Jean"
                  value={formData.firstName}
                  onChange={(e) =>
                    updateFormData({ firstName: e.target.value })
                  }
                  autoComplete="given-name"
                  required
                  className="min-h-11 h-11 w-full"
                />
                <div className="min-h-5" />
              </div>
              <div className="w-full">
                <Label htmlFor="lastName" className="text-sm font-medium mb-1.5 block">
                  Nom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  autoComplete="family-name"
                  required
                  className="min-h-11 h-11 w-full"
                />
                <div className="min-h-5" />
              </div>
            </div>
            <div className="grid w-full gap-4 md:grid-cols-2">
              <div className="w-full">
                <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  placeholder="jean.dupont@exemple.com"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  autoComplete="email"
                  required
                  className="min-h-11 h-11 w-full"
                />
                <div className="min-h-5" />
              </div>

              <div className="w-full">
                <Label htmlFor="phone" className="text-sm font-medium mb-1.5 block">
                  Téléphone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="06 12 34 56 78"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  autoComplete="tel"
                  required
                  className="min-h-11 h-11 w-full"
                />
                <div className="min-h-5" />
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="w-full">
            <Label
              htmlFor="consent"
              className={cn(
                "group flex w-full items-start gap-3 rounded-xl border-2 p-3 sm:p-4",
                "transition-colors hover:bg-muted/40 cursor-pointer",
                "has-aria-checked:border-primary/50 has-aria-checked:bg-primary/5",
                showConsentError ? "border-destructive" : "border-border"
              )}
            >
              <Checkbox
                id="consent"
                checked={!!formData.consent}
                onCheckedChange={(checked) => {
                  const next = checked === true;
                  updateFormData({ consent: next });
                  if (next) setShowConsentError(false);
                }}
                className="mt-0.5 shrink-0 h-5 w-5"
                aria-invalid={showConsentError}
                aria-describedby={
                  showConsentError ? "consent-error" : undefined
                }
                onClick={(e) => e.stopPropagation()}
              />

              <div className="min-w-0 flex-1 space-y-2">
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  J&apos;accepte d&apos;être contacté par H2 Débarras Maison
                  concernant ma demande de devis et je consens au traitement de
                  mes données personnelles conformément à la{" "}
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

                {/* Reserved min-height for error to prevent CLS */}
                <div className="min-h-5">
                  {showConsentError && (
                    <div
                      id="consent-error"
                      className="flex items-center gap-1.5 text-xs text-destructive"
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
              </div>
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={cn("w-full min-h-11", designTokens.button.primary)}
            size="lg"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Recevoir mon devis gratuit
              </>
            )}
          </Button>

          {/* Privacy note */}
          <p className="text-center text-xs text-muted-foreground">
            Vos informations restent confidentielles et ne seront jamais partagées.
          </p>
        </form>

        {/* Help CTA */}
        <div className="mt-5 sm:mt-6 w-full text-center border-t border-border pt-4 sm:pt-5">
          <p className="text-sm text-muted-foreground mb-2">
            Besoin d'aide ? Appelez-nous directement
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className={cn("min-h-11 w-full sm:w-auto gap-2", designTokens.button.secondary)}
          >
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phone}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
