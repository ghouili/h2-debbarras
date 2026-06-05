"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { trackStartDevis } from "@/lib/analytics";
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
  {
    id: "demenagement-entreprise",
    label: "Déménagement entreprise",
    icon: Truck,
  },
];

const normalizePhone = (phone: string): string => {
  let cleaned = phone.replace(/[\s().-]/g, "");
  if (cleaned.startsWith("00")) {
    cleaned = `+${cleaned.slice(2)}`;
  }
  if (cleaned.startsWith("+330")) {
    cleaned = `+33${cleaned.slice(4)}`;
  }
  return cleaned;
};

const validatePhone = (phone: string): boolean => {
  const cleaned = normalizePhone(phone);
  return /^(0[1-9]\d{8}|\+33[1-9]\d{8})$/.test(cleaned);
};

const validatePostalCode = (code: string): boolean => {
  return /^(75|77|78|91|92|93|94|95)\d{3}$/.test(code.trim());
};

export function QuoteFunnel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [postalCodeError, setPostalCodeError] = useState<string | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const hasHandledSuccessRef = useRef(false);

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
    setSubmitAttempted(true);

    const nextPhoneError = !formData.phone?.trim()
      ? "Numéro de téléphone requis"
      : validatePhone(formData.phone)
        ? null
        : "Numéro de téléphone invalide";
    const nextPostalCodeError = !formData.postalCode?.trim()
      ? "Code postal requis"
      : validatePostalCode(formData.postalCode)
        ? null
        : "Code postal Île-de-France requis";

    setPhoneError(nextPhoneError);
    setPostalCodeError(nextPostalCodeError);
    setShowConsentError(!formData.consent);

    if (
      !formData.service ||
      !formData.firstName?.trim() ||
      !formData.lastName?.trim() ||
      !formData.email?.trim() ||
      nextPhoneError ||
      nextPostalCodeError ||
      !formData.consent
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = "/api/leads";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "devis_form",
          ...formData,
          phone: normalizePhone(formData.phone),
        }),
      });

      const responseText = await response.text();
      let responseBody: unknown = responseText;
      try {
        responseBody = responseText ? JSON.parse(responseText) : null;
      } catch {
        responseBody = responseText;
      }

      if (response.ok) {
        if (!hasHandledSuccessRef.current) {
          hasHandledSuccessRef.current = true;
          setIsSuccess(true);
          router.push("/merci");
        }
      } else {
        console.error("[Lead] API response", {
          status: response.status,
          statusText: response.statusText,
          body: responseBody,
        });
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceError =
    submitAttempted && !formData.service
      ? "Veuillez sélectionner un service"
      : null;
  const firstNameError =
    submitAttempted && !formData.firstName?.trim()
      ? "Le prénom est requis"
      : null;
  const lastNameError =
    submitAttempted && !formData.lastName?.trim()
      ? "Le nom est requis"
      : null;
  const emailError =
    submitAttempted && !formData.email?.trim() ? "L'email est requis" : null;

  if (isSuccess) {
    return <SuccessState />;
  }

  return (
    <Card className="mx-auto w-full max-w-4xl overflow-hidden border-border/60 shadow-lg">
      <CardContent className="w-full max-w-full p-4 sm:p-5 md:p-6 lg:p-8">
        {/* Reassurance banner */}
        <div className="mb-5 sm:mb-6 w-full rounded-xl bg-primary/5 p-3 sm:p-4 text-center border border-primary/10">
          <p
            className={cn(
              designTokens.textScale.base,
              "font-medium text-foreground",
            )}
          >
            Réponse 2h • Devis gratuit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
          {/* Service Selection */}
          <div className="w-full">
            <h2
              className={cn(
                designTokens.textScale.baseLg,
                "mb-2 font-bold text-foreground font-heading",
              )}
            >
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
                    <Label
                      key={service.id}
                      htmlFor={service.id}
                      className="block cursor-pointer"
                    >
                      <Card
                        className={cn(
                          "w-full transition-all min-h-11",
                          isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                            : "hover:border-primary/50 hover:shadow-sm",
                        )}
                      >
                        <CardContent className="flex w-full items-center gap-2.5 px-3 py-2.5 min-h-11">
                          <RadioGroupItem
                            value={service.id}
                            id={service.id}
                            className="shrink-0 h-4 w-4"
                          />
                          <Icon className="h-4 w-4 shrink-0 text-primary" />
                          <span
                            className={cn(
                              designTokens.textScale.base,
                              "font-medium leading-tight flex-1",
                            )}
                          >
                            {service.label}
                          </span>
                        </CardContent>
                      </Card>
                    </Label>
                  );
                })}
              </div>
            </RadioGroup>
            <div className="min-h-5">
              {serviceError && (
                <span
                  className={cn(designTokens.textScale.xs, "text-destructive")}
                >
                  {serviceError}
                </span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="grid w-full gap-3 sm:gap-4 md:grid-cols-2">
            <div className="w-full">
              <Label
                htmlFor="postalCode"
                className={cn(
                  designTokens.textScale.base,
                  "font-medium mb-1.5 block",
                )}
              >
                Code postal <span className="text-destructive">*</span>
              </Label>
              <Input
                id="postalCode"
                type="text"
                inputMode="numeric"
                placeholder="75001"
                value={formData.postalCode}
                onChange={(e) => {
                  const nextValue = e.target.value.replace(/\D/g, "").slice(0, 5);
                  updateFormData({ postalCode: nextValue });
                  if (postalCodeError) {
                    setPostalCodeError(
                      validatePostalCode(nextValue)
                        ? null
                        : "Code postal Île-de-France requis",
                    );
                  }
                }}
                onBlur={() => {
                  setPostalCodeError(
                    validatePostalCode(formData.postalCode)
                      ? null
                      : "Code postal Île-de-France requis",
                  );
                }}
                maxLength={5}
                required
                className={cn(
                  "min-h-12 h-12 sm:min-h-11 sm:h-11 w-full",
                  postalCodeError ? "border-destructive" : "",
                )}
                aria-invalid={!!postalCodeError}
                aria-describedby={postalCodeError ? "postalCode-error" : undefined}
              />
              {/* Reserved space for eligibility feedback */}
              <div className="min-h-5">
                {postalCodeError && (
                  <span
                    id="postalCode-error"
                    className={cn(
                      designTokens.textScale.xs,
                      "text-destructive",
                    )}
                  >
                    {postalCodeError}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <Label
                htmlFor="city"
                className={cn(
                  designTokens.textScale.base,
                  "font-medium mb-1.5 block",
                )}
              >
                Ville <span className="text-muted-foreground">(optionnel)</span>
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Paris"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                autoComplete="address-level2"
                className="min-h-12 h-12 sm:min-h-11 sm:h-11 w-full"
              />
              <div className="min-h-5" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full space-y-4">
            <h2
              className={cn(
                designTokens.textScale.baseLg,
                "font-bold text-foreground font-heading",
              )}
            >
              Vos coordonnées
            </h2>

            <div className="grid w-full gap-3 sm:gap-4 md:grid-cols-2">
              <div className="w-full">
                <Label
                  htmlFor="firstName"
                  className={cn(
                    designTokens.textScale.base,
                    "font-medium mb-1.5 block",
                  )}
                >
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
                  className={cn(
                    "min-h-12 h-12 sm:min-h-11 sm:h-11 w-full",
                    firstNameError ? "border-destructive" : "",
                  )}
                  aria-invalid={!!firstNameError}
                  aria-describedby={firstNameError ? "firstName-error" : undefined}
                />
                <div className="min-h-5">
                  {firstNameError && (
                    <span
                      id="firstName-error"
                      className={cn(
                        designTokens.textScale.xs,
                        "text-destructive",
                      )}
                    >
                      {firstNameError}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full">
                <Label
                  htmlFor="lastName"
                  className={cn(
                    designTokens.textScale.base,
                    "font-medium mb-1.5 block",
                  )}
                >
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
                  className={cn(
                    "min-h-12 h-12 sm:min-h-11 sm:h-11 w-full",
                    lastNameError ? "border-destructive" : "",
                  )}
                  aria-invalid={!!lastNameError}
                  aria-describedby={lastNameError ? "lastName-error" : undefined}
                />
                <div className="min-h-5">
                  {lastNameError && (
                    <span
                      id="lastName-error"
                      className={cn(
                        designTokens.textScale.xs,
                        "text-destructive",
                      )}
                    >
                      {lastNameError}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid w-full gap-3 sm:gap-4 md:grid-cols-2">
              <div className="w-full">
                <Label
                  htmlFor="email"
                  className={cn(
                    designTokens.textScale.base,
                    "font-medium mb-1.5 block",
                  )}
                >
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
                  className={cn(
                    "min-h-12 h-12 sm:min-h-11 sm:h-11 w-full",
                    emailError ? "border-destructive" : "",
                  )}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                <div className="min-h-5">
                  {emailError && (
                    <span
                      id="email-error"
                      className={cn(
                        designTokens.textScale.xs,
                        "text-destructive",
                      )}
                    >
                      {emailError}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full">
                <Label
                  htmlFor="phone"
                  className={cn(
                    designTokens.textScale.base,
                    "font-medium mb-1.5 block",
                  )}
                >
                  Téléphone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="06 12 34 56 78"
                  value={formData.phone}
                  onChange={(e) => {
                    const nextValue = e.target.value;
                    updateFormData({ phone: nextValue });
                    if (phoneError) {
                      setPhoneError(
                        validatePhone(nextValue)
                          ? null
                          : "Numéro de téléphone invalide",
                      );
                    }
                  }}
                  onBlur={() => {
                    setPhoneError(
                      validatePhone(formData.phone)
                        ? null
                        : "Numéro de téléphone invalide",
                    );
                  }}
                  autoComplete="tel"
                  required
                  className={cn(
                    "min-h-12 h-12 sm:min-h-11 sm:h-11 w-full",
                    phoneError ? "border-destructive" : "",
                  )}
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                />
                <div className="min-h-5">
                  {phoneError && (
                    <span
                      id="phone-error"
                      className={cn(
                        designTokens.textScale.xs,
                        "text-destructive",
                      )}
                    >
                      {phoneError}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="w-full">
            <Label
              htmlFor="message"
              className={cn(
                designTokens.textScale.base,
                "font-medium mb-1.5 block",
              )}
            >
              Message <span className="text-muted-foreground">(optionnel)</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Ex: Accès difficile, objets encombrants, horaires préférés..."
              value={formData.message}
              onChange={(e) => updateFormData({ message: e.target.value })}
              rows={4}
              className="w-full resize-none"
            />
            <div className="min-h-5" />
          </div>

          {/* Consent */}
          <div className="w-full">
            <Label
              htmlFor="consent"
              className={cn(
                "group flex w-full items-start gap-3 rounded-xl border-2 p-3 sm:p-4",
                "transition-colors hover:bg-muted/40 cursor-pointer",
                "has-aria-checked:border-primary/50 has-aria-checked:bg-primary/5",
                showConsentError ? "border-destructive" : "border-border",
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
                <p
                  className={cn(
                    designTokens.textScale.base,
                    "leading-relaxed text-muted-foreground",
                  )}
                >
                  J&apos;accepte d&apos;être contacté par Débarras Aurea
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
              </div>
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={cn(
              "w-full min-h-12 sm:min-h-11",
              designTokens.button.primary,
            )}
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Sparkles className="hidden sm:block mr-2 h-4 w-4" />
                <p className="text-sm sm:text-lg md:text-xl">
                  Recevoir mon devis gratuit
                </p>
              </>
            )}
          </Button>

          {/* Privacy note */}
          <p
            className={cn(
              designTokens.textScale.xs,
              "text-center text-muted-foreground",
            )}
          >
            Vos informations restent confidentielles et ne seront jamais
            partagées.
          </p>
        </form>

        {/* Help CTA */}
        <div className="mt-5 sm:mt-6 w-full text-center border-t border-border pt-4 sm:pt-5">
          <p
            className={cn(
              designTokens.textScale.base,
              "text-muted-foreground mb-2",
            )}
          >
            Besoin d'aide ? Appelez-nous directement
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className={cn(
              "min-h-12 sm:min-h-11 w-full sm:w-auto gap-2",
              designTokens.button.secondary,
            )}
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
