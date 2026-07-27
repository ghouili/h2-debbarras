"use client";

import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { siteConfig } from "@/lib/config";
import { trackLeadSubmit } from "@/lib/analytics";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle } from "lucide-react";

/** Shared "Type de bien" options across all landing pages. */
export const PROPERTY_TYPES = [
  { id: "succession", label: "Succession / Après décès" },
  { id: "vide-maison", label: "Vide maison / Pavillon" },
  { id: "appartement", label: "Débarras appartement" },
  { id: "cave-grenier", label: "Cave / Grenier / Garage" },
  { id: "bureau-local", label: "Bureau / Local professionnel" },
  { id: "commerce-entrepot", label: "Commerce / Entrepôt" },
  { id: "encombrants", label: "Encombrants / Meubles" },
  { id: "autre", label: "Autre" },
] as const;

export type PropertyTypeId = (typeof PROPERTY_TYPES)[number]["id"];

const normalizePhone = (phone: string): string => {
  let cleaned = phone.replace(/[\s().-]/g, "");
  if (cleaned.startsWith("00")) cleaned = `+${cleaned.slice(2)}`;
  if (cleaned.startsWith("+330")) cleaned = `+33${cleaned.slice(4)}`;
  return cleaned;
};

const validatePhone = (phone: string): boolean => {
  const cleaned = normalizePhone(phone);
  return /^(0[1-9]\d{8}|\+33[1-9]\d{8})$/.test(cleaned);
};

const selectClasses =
  "min-h-12 h-12 sm:min-h-11 sm:h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type Props = {
  /** Pre-selected "Type de bien" id for this landing page. */
  defaultService?: PropertyTypeId | "";
};

export function LandingQuoteForm({ defaultService = "" }: Props) {
  const [service, setService] = useState<string>(defaultService);
  const [department, setDepartment] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const serviceError = attempted && !service ? "Veuillez sélectionner un type de bien" : null;
  const departmentError = attempted && !department ? "Veuillez sélectionner un département" : null;
  const firstNameError = attempted && !firstName.trim() ? "Le nom est requis" : null;
  const consentError = attempted && !consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);

    const nextPhoneError = !phone.trim()
      ? "Numéro de téléphone requis"
      : validatePhone(phone)
        ? null
        : "Numéro de téléphone invalide";
    setPhoneError(nextPhoneError);

    if (!service || !department || !firstName.trim() || nextPhoneError || !consent) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "devis_form",
          service,
          department,
          firstName,
          name: firstName,
          phone: normalizePhone(phone),
          email,
          message,
          consent,
        }),
      });

      if (response.ok) {
        trackLeadSubmit("devis_lp");
        // Full-page navigation (NOT router.push) so /merci does a real page load.
        // GTM's conversion trigger fires on the `gtm.js` Page View event, which only
        // fires on a full load — a client-side SPA transition would not trigger it.
        window.location.assign("/merci");
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {/* Type de bien */}
      <div className="w-full">
        <Label htmlFor="lp-service" className={cn(designTokens.textScale.base, "font-medium mb-1.5 block")}>
          Type de bien <span className="text-destructive">*</span>
        </Label>
        <select
          id="lp-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={cn(selectClasses, serviceError && "border-destructive")}
          aria-invalid={!!serviceError}
        >
          <option value="" disabled>
            Sélectionnez…
          </option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        <div className="min-h-5">
          {serviceError && <span className={cn(designTokens.textScale.xs, "text-destructive")}>{serviceError}</span>}
        </div>
      </div>

      {/* Département */}
      <div className="w-full">
        <Label htmlFor="lp-department" className={cn(designTokens.textScale.base, "font-medium mb-1.5 block")}>
          Département <span className="text-destructive">*</span>
        </Label>
        <select
          id="lp-department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className={cn(selectClasses, departmentError && "border-destructive")}
          aria-invalid={!!departmentError}
        >
          <option value="" disabled>
            Sélectionnez…
          </option>
          {siteConfig.zones.departements.map((d) => (
            <option key={d.code} value={d.code}>
              {d.code} — {d.name}
            </option>
          ))}
        </select>
        <div className="min-h-5">
          {departmentError && (
            <span className={cn(designTokens.textScale.xs, "text-destructive")}>{departmentError}</span>
          )}
        </div>
      </div>

      {/* Prénom + Téléphone */}
      <div className="grid w-full gap-3 sm:gap-4 md:grid-cols-2">
        <div className="w-full">
          <Label htmlFor="lp-firstName" className={cn(designTokens.textScale.base, "font-medium mb-1.5 block")}>
            Nom <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lp-firstName"
            type="text"
            placeholder="Dupont"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className={cn("min-h-12 h-12 sm:min-h-11 sm:h-11 w-full", firstNameError && "border-destructive")}
            aria-invalid={!!firstNameError}
          />
          <div className="min-h-5">
            {firstNameError && (
              <span className={cn(designTokens.textScale.xs, "text-destructive")}>{firstNameError}</span>
            )}
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="lp-phone" className={cn(designTokens.textScale.base, "font-medium mb-1.5 block")}>
            Téléphone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lp-phone"
            type="tel"
            inputMode="tel"
            placeholder="06 12 34 56 78"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (phoneError) setPhoneError(validatePhone(e.target.value) ? null : "Numéro de téléphone invalide");
            }}
            onBlur={() => setPhoneError(!phone.trim() || validatePhone(phone) ? null : "Numéro de téléphone invalide")}
            autoComplete="tel"
            className={cn("min-h-12 h-12 sm:min-h-11 sm:h-11 w-full", phoneError && "border-destructive")}
            aria-invalid={!!phoneError}
          />
          <div className="min-h-5">
            {phoneError && <span className={cn(designTokens.textScale.xs, "text-destructive")}>{phoneError}</span>}
          </div>
        </div>
      </div>

      {/* Email (optionnel) */}
      <div className="w-full">
        <Label htmlFor="lp-email" className={cn(designTokens.textScale.base, "font-medium mb-1.5 block")}>
          Email <span className="text-muted-foreground">(optionnel)</span>
        </Label>
        <Input
          id="lp-email"
          type="email"
          inputMode="email"
          placeholder="jean.dupont@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="min-h-12 h-12 sm:min-h-11 sm:h-11 w-full"
        />
        <div className="min-h-5" />
      </div>

      {/* Message (optionnel) */}
      <div className="w-full">
        <Label htmlFor="lp-message" className={cn(designTokens.textScale.base, "font-medium mb-1.5 block")}>
          Message <span className="text-muted-foreground">(optionnel)</span>
        </Label>
        <Textarea
          id="lp-message"
          placeholder="Volume estimé, étage, accès difficile…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full resize-none"
        />
      </div>

      {/* Consent */}
      <div className="w-full">
        <Label
          htmlFor="lp-consent"
          className={cn(
            "group flex w-full items-start gap-3 rounded-xl border-2 p-3 sm:p-4",
            "transition-colors hover:bg-muted/40 cursor-pointer",
            "has-aria-checked:border-primary/50 has-aria-checked:bg-primary/5",
            consentError ? "border-destructive" : "border-border",
          )}
        >
          <Checkbox
            id="lp-consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked === true)}
            className="mt-0.5 shrink-0 h-5 w-5"
            aria-invalid={consentError}
          />
          <div className="min-w-0 flex-1 space-y-2">
            <p className={cn(designTokens.textScale.base, "leading-relaxed text-muted-foreground")}>
              J&apos;accepte d&apos;être contacté par Débarras Aurea concernant ma demande de devis et je consens au
              traitement de mes données personnelles conformément à la{" "}
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
            <div className="min-h-5">
              {consentError && (
                <div
                  className={cn(designTokens.textScale.xs, "flex items-center gap-1.5 text-destructive")}
                  role="alert"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>Vous devez accepter le traitement de vos données pour continuer</span>
                </div>
              )}
            </div>
          </div>
        </Label>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className={cn("w-full min-h-12 sm:min-h-11", designTokens.button.primary)}
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          "Demander mon devis gratuit →"
        )}
      </Button>

      <p className={cn(designTokens.textScale.base, "text-center text-muted-foreground")}>
        ✓ Réponse sous 2h · ✓ Sans engagement · ✓ Gratuit
      </p>
    </form>
  );
}
