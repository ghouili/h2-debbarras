"use client";

import type React from "react";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Truck,
  Recycle,
  Shield,
  MessageSquare,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

// Trust badges for the contact page
const trustBadges = [
  { icon: MapPin, label: "Île-de-France", subtext: "8 départements" },
  { icon: Clock, label: "Intervention 24 à 48 h", subtext: "selon urgence" },
  { icon: Recycle, label: "Tri et recyclage", subtext: "éco-responsable" },
  { icon: Shield, label: "Devis gratuit", subtext: "sans engagement" },
];

// Contact page FAQ
const contactFaqs = [
  {
    q: "Quel est votre délai de réponse ?",
    a: "Nous répondons sous 2 heures en semaine (8h-19h) et sous 4 heures le week-end. Pour les urgences, appelez-nous directement.",
  },
  {
    q: "Comment obtenir un devis précis ?",
    a: "Vous pouvez remplir notre formulaire de devis détaillé ou nous appeler. Pour une estimation précise, fournissez des photos et le volume approximatif.",
  },
  {
    q: "Intervenez-vous dans ma zone ?",
    a: "Nous couvrons toute l'Île-de-France : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Essonne (91), Yvelines (78), Val-d'Oise (95) et Seine-et-Marne (77).",
  },
  {
    q: "Quels éléments prévoir avant de nous contacter ?",
    a: "Pour un devis rapide, pensez à préparer : le type de bien (maison, appartement), l'adresse ou code postal, l'étage et la présence d'ascenseur, et si possible des photos des espaces à débarrasser.",
  },
  {
    q: "Quels sont les facteurs qui influencent le prix ?",
    a: "Le tarif dépend du volume à débarrasser, de l'accessibilité (étage, escaliers étroits), du type d'objets (encombrants, électroménager) et de l'urgence. Nous fournissons un devis transparent sans frais cachés.",
  },
  {
    q: "Proposez-vous des interventions en urgence ?",
    a: "Oui, nous avons un service d'intervention rapide sous 24h pour les situations urgentes (succession, départ précipité, etc.). Contactez-nous par téléphone pour une prise en charge prioritaire.",
  },
];

// Request types for the form
const requestTypes = [
  { value: "devis", label: "Demande de devis" },
  { value: "information", label: "Demande d'information" },
  { value: "rendez-vous", label: "Prise de rendez-vous" },
  { value: "autre", label: "Autre demande" },
];

// Form validation helpers
const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\s/g, "");
  // French phone: starts with 0 and has 10 digits, or starts with +33 and has 11-12 chars
  return /^(0[1-9]\d{8}|\+33[1-9]\d{8})$/.test(cleaned);
};

const validatePostalCode = (code: string): boolean => {
  // French postal code: 5 digits, Île-de-France starts with 75, 77, 78, 91, 92, 93, 94, 95
  return /^(75|77|78|91|92|93|94|95)\d{3}$/.test(code);
};

// Form state type
type ContactFormData = {
  name: string;
  phone: string;
  postalCode: string;
  requestType: string;
  message: string;
  consent: boolean;
};

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  postalCode: "",
  requestType: "devis",
  message: "",
  consent: false,
};

// Success state component
function ContactSuccessState() {
  return (
    <Card className="border-2 border-green-200 bg-green-50">
      <CardContent className="p-5 sm:p-6 md:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-500">
            <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <h2
            className={cn(
              designTokens.typography.h2,
              "mb-2 text-xl text-green-800 sm:text-2xl",
            )}
          >
            Message envoyé !
          </h2>
          <p className="mb-5 sm:mb-6 max-w-md text-sm text-green-700 sm:text-base">
            Nous avons bien reçu votre message et vous répondrons sous{" "}
            <strong>2 heures</strong> maximum.
          </p>

          <Card className="mb-5 sm:mb-6 w-full max-w-md border-green-300 bg-white">
            <CardContent className="p-4">
              <h3
                className={cn(
                  designTokens.typography.h4,
                  "mb-3 text-sm text-foreground",
                )}
              >
                Ce qui se passe ensuite
              </h3>
              <ul className="space-y-2 text-left text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                    1
                  </span>
                  <span>Nous analysons votre demande</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                    2
                  </span>
                  <span>Un conseiller vous rappelle sous 2h</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                    3
                  </span>
                  <span>Vous recevez votre devis gratuit</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild className="min-h-11 w-full sm:w-auto">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                onClick={() =>
                  trackEvent("contact_call_click", { source: "success_state" })
                }
              >
                <Phone className="mr-2 h-4 w-4" />
                Appeler maintenant
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="min-h-11 w-full sm:w-auto"
            >
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ContactPageClient() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  // Validate form field
  const validateField = useCallback(
    (field: keyof ContactFormData, value: string | boolean): string | null => {
      switch (field) {
        case "name":
          return typeof value === "string" && value.trim().length >= 2
            ? null
            : "Veuillez entrer votre nom";
        case "phone":
          return typeof value === "string" && validatePhone(value)
            ? null
            : "Numéro de téléphone invalide";
        case "postalCode":
          if (typeof value !== "string" || !value) return null; // Optional field
          return validatePostalCode(value)
            ? null
            : "Code postal Île-de-France requis (ex: 75001)";
        case "consent":
          return value === true
            ? null
            : "Veuillez accepter le traitement de vos données";
        default:
          return null;
      }
    },
    [],
  );

  // Handle field change
  const handleChange = useCallback(
    (field: keyof ContactFormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  // Handle field blur for validation
  const handleBlur = useCallback(
    (field: keyof ContactFormData) => {
      const error = validateField(field, formData[field]);
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [formData, validateField],
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    const nameError = validateField("name", formData.name);
    const phoneError = validateField("phone", formData.phone);
    const consentError = validateField("consent", formData.consent);
    const postalCodeError = formData.postalCode
      ? validateField("postalCode", formData.postalCode)
      : null;

    if (nameError) newErrors.name = nameError;
    if (phoneError) newErrors.phone = phoneError;
    if (consentError) newErrors.consent = consentError;
    if (postalCodeError) newErrors.postalCode = postalCodeError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    trackEvent("contact_form_submit", { request_type: formData.requestType });

    try {
      // Submit to API endpoint
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact_form",
          ...formData,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("[Contact] Form submission error:", error);
      alert(
        "Une erreur est survenue. Veuillez réessayer ou nous appeler directement.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Breadcrumbs for SEO
  const breadcrumbItems = [{ label: "Contact" }];

  return (
    <>
      {/* SEO: Breadcrumb JSON-LD */}
      <JsonLd
        type="breadcrumb"
        data={{
          items: [{ label: "Accueil", href: "/" }, { label: "Contact" }],
        }}
      />

      <div className="bg-background min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-linear-to-br from-primary-50 via-background to-primary-100/50 py-6 sm:py-12 md:py-16">
          {/* Decorative elements */}
          <div className="absolute -left-20 top-10 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-10 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="mx-auto max-w-4xl text-center">
              <h1
                className={cn(
                  designTokens.typography.h1,
                  "text-balance text-xl sm:text-3xl md:text-4xl",
                )}
              >
                Contact
              </h1>
              <p
                className={cn(
                  designTokens.typography.h1,
                  "text-balance text-xl sm:text-3xl md:text-4xl",
                )}
              >
                Débarras et Déménagement
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base md:text-lg">
                Notre équipe vous répond{" "}
                <strong className="text-foreground">sous 2 heures</strong> en
                semaine.
              </p>

              {/* Primary CTAs - Above the Fold */}
              <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
                <Button
                  size="lg"
                  asChild
                  className={cn(
                    "min-h-11 h-11 w-full sm:w-auto gap-1.5 px-4 text-xs sm:gap-2 sm:px-6 sm:text-sm",
                    designTokens.button.primary,
                  )}
                >
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    onClick={() =>
                      trackEvent("contact_call_click", { source: "hero" })
                    }
                  >
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {siteConfig.contact.phone}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(
                    designTokens.button.secondary,
                    "min-h-11 h-11 w-full sm:w-auto gap-1.5 px-4 text-xs sm:gap-2 sm:px-6 sm:text-sm",
                  )}
                  asChild
                >
                  <Link href="/devis">
                    <Image
                      src="/optimized/icons/special-icon-w40.png"
                      width={20}
                      height={20}
                      alt="Icône plus de 500 interventions"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                    />
                    Devis gratuit
                  </Link>
                </Button>
              </div>

              {/* Trust line */}
              <p className="mt-3 text-[10px] text-muted-foreground sm:mt-4 sm:text-sm">
                <CheckCircle2 className="mr-0.5 inline h-3 w-3 text-green-600 sm:mr-1 sm:h-3.5 sm:w-3.5" />
                Devis gratuit • Réponse 2h • Intervention 24 à 48 h
              </p>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <Section className="border-b border-border bg-white py-3 sm:py-6">
          <div className="grid grid-cols-2 gap-2 px-3 sm:gap-4 sm:px-6 md:grid-cols-4 md:gap-6">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-1 sm:gap-2 text-center rounded-lg bg-slate-50/80 p-2 sm:p-3"
                >
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md sm:rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-sm font-medium text-foreground leading-tight">
                      {badge.label}
                    </p>
                    <p className="text-[8px] sm:text-xs text-muted-foreground">
                      {badge.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Main Content: Contact Info + Form */}
        <Section>
          <div className="mx-auto max-w-6xl px-3 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
              {/* Contact Info Column */}
              <div className="space-y-4 sm:space-y-6 lg:col-span-2">
                {/* Phone Card - Primary CTA */}
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardContent className="px-4 sm:px-6">
                    <div className="flex flex-row items-center gap-3 sm:gap-4 ">
                      <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary shadow-lg shadow-primary/25">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <h2
                        className={cn(
                          designTokens.typography.h4,
                          "mb-2 text-base sm:text-lg",
                        )}
                      >
                        Appelez-nous
                      </h2>
                    </div>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                      className="text-lg sm:text-xl font-semibold text-primary hover:underline"
                      onClick={() =>
                        trackEvent("contact_call_click", {
                          source: "info_card",
                        })
                      }
                    >
                      {siteConfig.contact.phone}
                    </a>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                      Réponse immédiate • Devis par téléphone
                    </p>
                  </CardContent>
                </Card>

                {/* Email Card */}
                <Card>
                  <CardContent className="px-4 sm:px-6">
                    <div className="flex flex-row items-center gap-3 sm:gap-4 ">
                      <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-md sm:rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <h3
                        className={cn(
                          designTokens.typography.h4,
                          "mb-2 text-sm sm:text-base",
                        )}
                      >
                        Email
                      </h3>
                    </div>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm sm:text-base text-primary hover:underline"
                      onClick={() => trackEvent("contact_email_click")}
                    >
                      {siteConfig.contact.email}
                    </a>
                    <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground">
                      Réponse sous 2h en semaine
                    </p>
                  </CardContent>
                </Card>

                {/* Hours Card */}
                <Card>
                  <CardContent className="px-4 sm:px-6">
                    <div className="flex flex-row items-center gap-3 sm:gap-4 ">
                      <div className="flex flex-row items-center gap-3 sm:gap-4 ">
                        <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-md sm:rounded-lg bg-primary/10">
                          <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <h3
                          className={cn(
                            designTokens.typography.h4,
                            "mb-2 text-sm sm:text-base",
                          )}
                        >
                          Horaires
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">
                          Lun - Ven :
                        </span>{" "}
                        8h - 19h
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Samedi :
                        </span>{" "}
                        9h - 18h
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Dimanche :
                        </span>{" "}
                        Sur demande
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Area Card */}
                <Card>
                  <CardContent className="px-4 sm:px-6">
                    <div className="flex flex-row items-center gap-3 sm:gap-4 ">
                      <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-md sm:rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <h3
                        className={cn(
                          designTokens.typography.h4,
                          "mb-2 text-sm sm:text-base",
                        )}
                      >
                        Zone d'intervention
                      </h3>
                    </div>
                    <p className="mb-2 sm:mb-3 text-xs sm:text-sm text-muted-foreground">
                      Toute l'Île-de-France
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {siteConfig.zones.departements.map((dept) => (
                        <span
                          key={dept.code}
                          className="rounded bg-muted px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium text-muted-foreground"
                        >
                          {dept.code}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/zones"
                      className="mt-2 sm:mt-3 inline-flex items-center text-xs sm:text-sm font-medium text-primary hover:underline min-h-8"
                    >
                      Voir zones
                      <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-3">
                {isSuccess ? (
                  <ContactSuccessState />
                ) : (
                  <Card className="border-2">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                      <div className="mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10">
                          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div>
                          <h2
                            className={cn(
                              designTokens.typography.h3,
                              "text-base sm:text-xl",
                            )}
                          >
                            Envoyez un message
                          </h2>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Réponse sous 2 heures
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        {/* Name */}
                        <div>
                          <Label
                            htmlFor="name"
                            className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block"
                          >
                            Nom complet{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Jean Dupont"
                            value={formData.name}
                            onChange={(e) =>
                              handleChange("name", e.target.value)
                            }
                            onBlur={() => handleBlur("name")}
                            className={cn(
                              "min-h-11 h-11",
                              errors.name ? "border-destructive" : "",
                            )}
                            aria-describedby={
                              errors.name ? "name-error" : undefined
                            }
                            aria-invalid={!!errors.name}
                          />
                          <div className="min-h-5">
                            {errors.name && (
                              <p
                                id="name-error"
                                className="mt-1 text-sm text-destructive"
                                role="alert"
                              >
                                {errors.name}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Phone + Postal Code */}
                        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                          <div>
                            <Label
                              htmlFor="phone"
                              className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block"
                            >
                              Téléphone{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="06 12 34 56 78"
                              value={formData.phone}
                              onChange={(e) =>
                                handleChange("phone", e.target.value)
                              }
                              onBlur={() => handleBlur("phone")}
                              className={cn(
                                "min-h-11 h-11",
                                errors.phone ? "border-destructive" : "",
                              )}
                              aria-describedby={
                                errors.phone ? "phone-error" : undefined
                              }
                              aria-invalid={!!errors.phone}
                            />
                            <div className="min-h-5">
                              {errors.phone && (
                                <p
                                  id="phone-error"
                                  className="mt-1 text-sm text-destructive"
                                  role="alert"
                                >
                                  {errors.phone}
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <Label
                              htmlFor="postalCode"
                              className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block"
                            >
                              Code postal
                            </Label>
                            <Input
                              id="postalCode"
                              type="text"
                              placeholder="75001"
                              maxLength={5}
                              value={formData.postalCode}
                              onChange={(e) =>
                                handleChange(
                                  "postalCode",
                                  e.target.value.replace(/\D/g, "").slice(0, 5),
                                )
                              }
                              onBlur={() => handleBlur("postalCode")}
                              className={cn(
                                "min-h-11 h-11",
                                errors.postalCode ? "border-destructive" : "",
                              )}
                              aria-describedby={
                                errors.postalCode
                                  ? "postalCode-error"
                                  : undefined
                              }
                              aria-invalid={!!errors.postalCode}
                            />
                            <div className="min-h-5">
                              {errors.postalCode && (
                                <p
                                  id="postalCode-error"
                                  className="mt-1 text-sm text-destructive"
                                  role="alert"
                                >
                                  {errors.postalCode}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Request Type */}
                        <div>
                          <Label
                            htmlFor="requestType"
                            className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block"
                          >
                            Type de demande
                          </Label>
                          <select
                            id="requestType"
                            value={formData.requestType}
                            onChange={(e) =>
                              handleChange("requestType", e.target.value)
                            }
                            className="flex min-h-11 h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {requestTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <Label
                            htmlFor="message"
                            className="text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 block"
                          >
                            Message{" "}
                            <span className="text-muted-foreground text-[10px] sm:text-xs">
                              (optionnel)
                            </span>
                          </Label>
                          <Textarea
                            id="message"
                            rows={4}
                            placeholder="Décrivez votre besoin..."
                            value={formData.message}
                            onChange={(e) =>
                              handleChange("message", e.target.value)
                            }
                            className="min-h-25 text-sm"
                          />
                        </div>

                        {/* Consent */}
                        <div className="flex items-start gap-2 sm:gap-3 py-1">
                          <Checkbox
                            id="consent"
                            checked={formData.consent}
                            onCheckedChange={(checked) =>
                              handleChange("consent", checked === true)
                            }
                            aria-describedby={
                              errors.consent ? "consent-error" : undefined
                            }
                            aria-invalid={!!errors.consent}
                            className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0"
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor="consent"
                              className="text-xs sm:text-sm font-normal leading-relaxed text-muted-foreground cursor-pointer"
                            >
                              J'accepte d'être contacté(e) par {siteConfig.name}{" "}
                              pour ma demande.{" "}
                              <Link
                                href="/politique-confidentialite"
                                className="text-primary underline hover:no-underline"
                              >
                                Politique de confidentialité
                              </Link>
                            </Label>
                            <div className="min-h-5">
                              {errors.consent && (
                                <p
                                  id="consent-error"
                                  className="mt-1 text-sm text-destructive"
                                  role="alert"
                                >
                                  {errors.consent}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        {/* Submit Button */}
                        <Button
                          type="submit"
                          size="lg"
                          className={cn(
                            "w-full min-h-11 h-11 text-xs sm:text-sm",
                            designTokens.button.primary,
                          )}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-1.5 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5 animate-spin" />
                              Envoi...
                            </>
                          ) : (
                            <>
                              <Mail className="mr-1.5 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" />
                              Envoyer
                            </>
                          )}
                        </Button>

                        {/* Microcopy */}
                        <p className="text-center text-[10px] text-muted-foreground sm:text-xs">
                          Vos informations restent confidentielles.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* What happens next - Below form */}
                {!isSuccess && (
                  <Card className="mt-4 sm:mt-6 border-primary/20 bg-primary/5">
                    <CardContent className="px-3 py-1 sm:px-5">
                      <h3
                        className={cn(
                          designTokens.typography.h4,
                          "mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base",
                        )}
                      >
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        Ce qui se passe ensuite
                      </h3>
                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-bold text-white">
                            1
                          </span>
                          <div>
                            <p className="text-xs sm:text-sm font-medium">Analyse</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">
                              Étude de votre demande
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-bold text-white">
                            2
                          </span>
                          <div>
                            <p className="text-xs sm:text-sm font-medium">
                              Rappel 2h
                            </p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">
                              Conseiller vous contacte
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs sm:text-sm font-bold text-white">
                            3
                          </span>
                          <div>
                            <p className="text-xs sm:text-sm font-medium">Devis gratuit</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground">
                              Sans engagement
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ Section */}
        <Section className="bg-muted/30">
          <div className="mx-auto max-w-3xl px-3 sm:px-6">
            <div className="mb-3 sm:mb-6 text-center">
              <h2
                className={cn(
                  designTokens.typography.h2,
                  "text-lg sm:text-2xl md:text-3xl",
                )}
              >
                Questions fréquentes
              </h2>
              <p className="mt-1.5 sm:mt-2 text-xs text-muted-foreground sm:text-base">
                Ce qu'il faut savoir avant de nous contacter
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {contactFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-xs sm:text-base min-h-10 sm:min-h-11 py-2.5 sm:py-3 [&>svg]:h-3.5 [&>svg]:w-3.5 sm:[&>svg]:h-4 sm:[&>svg]:w-4 [&>svg]:shrink-0">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-pretty text-xs text-muted-foreground leading-relaxed sm:text-sm">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="mb-2 sm:mb-3 text-xs text-muted-foreground sm:text-sm">
                D'autres questions ?
              </p>
              <Button
                variant="outline"
                asChild
                className={cn("min-h-10 sm:min-h-11 text-xs sm:text-sm", designTokens.button.secondary)}
              >
                <Link href="/faq">
                  Voir toutes les questions
                  <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section>
          <div className="mx-auto max-w-4xl px-3 sm:px-6">
            <Card className="relative overflow-hidden border-0 bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 shadow-xl sm:shadow-2xl shadow-primary/30 rounded-xl sm:rounded-2xl">
              <div className="absolute -right-16 -top-16 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-white/5 blur-3xl pointer-events-none" />

              <CardContent className="relative p-4 sm:p-6 md:p-10 text-center">
                <div className="mb-2.5 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/20 px-2.5 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-sm font-medium text-white">
                  <Truck className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Intervention 24 à 48 h</span>
                </div>

                <h2
                  className={cn(
                    designTokens.typography.h2,
                    "text-lg text-white sm:text-2xl lg:text-3xl",
                  )}
                >
                  Prêt à débarrasser ?
                </h2>
                <p className="mx-auto mt-1.5 sm:mt-2 max-w-xl text-xs text-white/90 sm:text-base">
                  Devis précis et personnalisé.
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
                  <Button
                    size="lg"
                    asChild
                    className="min-h-11 h-11 w-full sm:w-auto bg-white px-4 sm:px-7 text-xs sm:text-sm font-semibold text-primary hover:bg-white/90 shadow-lg"
                  >
                    <Link href="/devis">
                      <Image
                        src="/optimized/icons/special-icon-w40.png"
                        width={20}
                        height={20}
                        alt="Icône plus de 500 interventions"
                        className="mr-1.5 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5"
                      />
                      Devis gratuit
                    </Link>
                  </Button>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-1.5 min-h-11 px-3 text-xs font-medium text-white/90 hover:text-white transition-colors sm:gap-2 sm:px-4 sm:text-sm"
                  >
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{siteConfig.contact.phone}</span>
                  </a>
                </div>

                {/* Reassurance */}
                <p className="mt-3 text-[10px] text-white/70 sm:mt-4 sm:text-sm">
                  ✓ Sans engagement · ✓ Gratuit · ✓ Réponse 2h
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>
      </div>
    </>
  );
}
