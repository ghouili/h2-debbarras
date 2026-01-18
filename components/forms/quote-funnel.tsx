"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { trackStartDevis, trackLeadSubmit } from "@/lib/analytics";
import { SuccessState } from "./success-state";
import {
  Building2,
  Home,
  Store,
  Warehouse,
  HardHat,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";

export type QuoteFormData = {
  service: string;
  postalCode: string;
  city: string;
  timing: string;
  localType: string;
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
  { id: "maison-appartement", label: "Maison / Appartement", icon: Home },
  { id: "cave-grenier", label: "Cave / Grenier", icon: Warehouse },
  { id: "commerces-entrepots", label: "Commerce / Entrepôt", icon: Store },
  { id: "bureaux-locaux", label: "Bureau / Local", icon: Building2 },
  { id: "demenagement-entreprise", label: "Déménagement", icon: HardHat },
  // { id: "nettoyage-professionnel", label: "Nettoyage", icon: Sparkles },
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

  const updateFormData = (data: Partial<QuoteFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

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
    <Card className="mx-auto w-full max-w-4xl overflow-hidden">
      <CardContent className="w-full max-w-full p-5 sm:p-6 md:p-8">
        <div className="mb-6 w-full rounded-lg bg-primary/5 p-4 text-center">
          <p className="text-sm font-medium">
            🕐 Réponse sous 2h • ✓ Devis gratuit, sans engagement
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Service Selection */}
          <div className="w-full">
            <h2 className="mb-1 text-base font-bold text-foreground sm:text-lg">
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
                      className={`w-full cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => updateFormData({ service: service.id })}
                    >
                      <CardContent className="flex w-full items-center gap-2 px-2.5">
                        <RadioGroupItem
                          value={service.id}
                          id={service.id}
                          className="shrink-0"
                        />
                        <Icon className="h-4 w-4 shrink-0 text-primary" />
                        <Label
                          htmlFor={service.id}
                          className="cursor-pointer text-xs font-medium leading-tight sm:text-sm"
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
          <div className="grid w-full gap-3 sm:grid-cols-2">
            <div className="w-full">
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
                className="mt-1 w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="city" className="text-sm font-medium">
                Ville
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Paris"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                className="mt-1 w-full"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full space-y-3">
            <h2 className="text-base font-bold text-foreground sm:text-lg">
              Vos coordonnées
            </h2>

            <div className="grid w-full gap-3 sm:grid-cols-2">
              <div className="w-full">
                <Label htmlFor="firstName" className="text-sm font-medium">
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
                  required
                  className="mt-1 w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Nom <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  required
                  className="mt-1 w-full"
                />
              </div>
            </div>
            <div className="grid w-full gap-3 sm:grid-cols-2">
              <div className="w-full">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jean.dupont@exemple.com"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  required
                  className="mt-1 w-full"
                />
              </div>

              <div className="w-full">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Téléphone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  required
                  className="mt-1 w-full"
                />
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="w-full">
            <Label
              htmlFor="consent"
              className={[
                "group flex w-full items-start gap-3 rounded-lg border p-3",
                "transition-colors hover:bg-muted/40",
                "has-[[aria-checked=true]]:border-primary/50 has-[[aria-checked=true]]:bg-primary/5",
                showConsentError ? "border-destructive" : "",
              ].join(" ")}
            >
              <Checkbox
                id="consent"
                checked={!!formData.consent}
                onCheckedChange={(checked) => {
                  const next = checked === true;
                  updateFormData({ consent: next });
                  if (next) setShowConsentError(false);
                }}
                className="mt-0.5 shrink-0"
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
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Recevoir mon devis gratuit"
            )}
          </Button>
        </form>

        <div className="mt-4 w-full text-center text-sm text-muted-foreground">
          <p>
            Besoin d'aide ?{" "}
            <a
              href="tel:+33769608300"
              className="font-medium text-primary hover:underline"
            >
              Appelez-nous maintenant
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
