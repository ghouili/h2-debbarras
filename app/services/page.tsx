"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Store,
  Briefcase,
  Home,
  Warehouse,
  Package,
  CheckCircle2,
  Phone,
  ArrowRight,
  Clock,
  Recycle,
  Shield,
  Users,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Section } from "@/components/layout/section";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const isDefined = <T,>(value: T | null | undefined): value is T => Boolean(value);

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("professionnels");
  const tabs = [
    { id: "professionnels", label: "Professionnels" },
    { id: "particuliers", label: "Particuliers" },
  ];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const formatServiceCount = (count: number) =>
    `Inclut : ${count} ${count === 1 ? "service" : "services"}`;

  const particulierDebarrasById = (id: string) =>
    siteConfig.services.particulier.debarras.find((s) => s.id === id);

  const serviceCategories = {
    professionnels: [
      {
        id: "commerces-entrepots",
        title: "Débarras Commerces & Entrepôts",
        description:
          "Solution complète pour vider boutiques, entrepôts et locaux commerciaux en Île-de-France",
        icon: Store,
        featured: true,
        family: "debarras",
        benefits: [
          "Intervention rapide 24-48h",
          "Équipe professionnelle",
          "Gros volumes",
          "Planning flexible",
        ],
        subservices: siteConfig.services.professionnel.debarras,
        ctaLink: "/devis?service=commerces-entrepots",
      },
      {
        id: "bureaux",
        title: "Débarras Bureaux & Locaux",
        description:
          "Vidage de bureaux, locaux professionnels avec destruction de documents confidentiels",
        icon: Building2,
        family: "debarras",
        benefits: [
          "Hors heures ouvrées",
          "Confidentialité garantie",
          "Tri professionnel",
          "Certificats fournis",
        ],
        subservices: [siteConfig.services.professionnel.debarras[0]],
        ctaLink: "/devis?service=bureaux-locaux",
      },
      {
        id: "demenagement-pro",
        title: "Déménagement d'Entreprise",
        description: "Déménagement professionnel sans interruption d'activité",
        icon: Briefcase,
        family: "demenagement",
        benefits: [
          "Planning sur mesure",
          "Week-end & nuit possible",
          "IT & téléphonie",
          "Remise en service",
        ],
        subservices: siteConfig.services.professionnel.demenagement,
        ctaLink: "/devis?service=demenagement-entreprise",
      },
    ],
    particuliers: [
      {
        id: "debarras-logement",
        title: "Débarras Maison & Appartement",
        description:
          "Vidage complet de logements avec tri et évacuation en Île-de-France",
        icon: Home,
        featured: true,
        family: "debarras",
        benefits: [
          "Intervention 24-48h",
          "Tri sélectif inclus",
          "Évacuation complète",
          "Devis gratuit",
        ],
        subservices: [
          particulierDebarrasById("debarras-maison"),
          particulierDebarrasById("debarras-appartement"),
          particulierDebarrasById("succession"),
          particulierDebarrasById("encombrants"),
        ].filter(isDefined),
        ctaLink: "/devis?service=debarras-maison",
      },
      {
        id: "cave-grenier",
        title: "Caves, Greniers & Garages",
        description: "Évacuation d'espaces encombrés avec accès difficile",
        icon: Warehouse,
        family: "debarras",
        benefits: [
          "Accès difficile OK",
          "Évacuation rapide",
          "Tri recyclable",
          "Prix compétitifs",
        ],
        subservices: [particulierDebarrasById("cave-grenier")].filter(isDefined),
        ctaLink: "/devis?service=cave-grenier",
      },
      {
        id: "demenagement",
        title: "Déménagement Particuliers",
        description:
          "Déménagement complet ou transport de meubles en Île-de-France",
        icon: Package,
        family: "demenagement",
        benefits: [
          "Emballage inclus",
          "Transport sécurisé",
          "Montage/démontage",
          "Assurance",
        ],
        subservices: siteConfig.services.particulier.demenagement,
        ctaLink: "/devis?service=demenagement-particulier",
      },
    ],
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const lastIndex = tabs.length - 1;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = index === lastIndex ? 0 : index + 1;
      setActiveTab(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const nextIndex = index === 0 ? lastIndex : index - 1;
      setActiveTab(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActiveTab(tabs[0].id);
      tabRefs.current[0]?.focus();
    }
    if (event.key === "End") {
      event.preventDefault();
      setActiveTab(tabs[lastIndex].id);
      tabRefs.current[lastIndex]?.focus();
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveTab(tabs[index].id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Tabs */}
      <Section bleed className="border-b bg-linear-to-br from-primary-50 via-background to-primary-100/50">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary border border-primary/20 shadow-sm sm:px-4 sm:py-2 sm:text-sm">
            <Image
              src="/optimized/icons/devis-icon-w32.png"
              width={16}
              height={16}
              alt=""
              aria-hidden="true"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            />
            <span>Devis gratuit en 2 min</span>
          </div>
          
          {/* H1 - Responsive typography */}
          <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Nos Services de Débarras & Déménagement
          </h1>
          <p className="mt-3 text-pretty text-sm text-muted-foreground sm:text-base lg:text-lg">
            Solutions professionnelles et rapides en Île-de-France pour particuliers et entreprises
          </p>
        </div>

        {/* Segmented Control Tabs - Full width on mobile */}
        <div className="mx-auto mt-6 max-w-md sm:mt-8">
          <div
            role="tablist"
            aria-label="Type de clientèle"
            className="grid w-full grid-cols-2 rounded-xl border border-border bg-background p-1 shadow-sm"
          >
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={cn(
                    "min-h-11 rounded-lg px-2 md:py-2.5 text-xs sm:text-sm sm:font-medium transition-all sm:px-4 md:text-base",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const categories =
            serviceCategories[tab.id as keyof typeof serviceCategories];
          const debarras = categories.filter(
            (category) => category.family === "debarras",
          );
          const demenagement = categories.filter(
            (category) => category.family === "demenagement",
          );

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              hidden={!isActive}
              className="space-y-10 sm:space-y-12"
            >
              {/* Débarras Services */}
              <div>
                <div className="mb-3 sm:mb-6">
                  <h2 className="text-lg font-bold sm:text-2xl lg:text-3xl">Débarras</h2>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-base">
                    Solutions rapides pour vider vos espaces en Île-de-France.
                  </p>
                </div>
                <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
                  {debarras.map((category) => {
                    const Icon = category.icon;
                    const detailSlug = category.subservices[0]?.slug;
                    return (
                      <Card
                        key={category.id}
                        className={cn(
                          "flex flex-col overflow-hidden",
                          category.featured && "border-primary/50 ring-1 ring-primary/20 shadow-md",
                          debarras.length === 1 && "md:col-span-2 md:max-w-2xl md:mx-auto"
                        )}
                      >
                        <CardHeader className="space-y-2.5 p-4 sm:p-6 sm:space-y-3">
                          <div className="flex items-start gap-2.5 sm:gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-12 sm:w-12">
                              <Icon className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              {category.featured && (
                                <Badge variant="default" className="mb-1.5 text-xs sm:mb-2">
                                  Recommandé
                                </Badge>
                              )}
                              <CardTitle className="text-base leading-tight sm:text-lg md:text-xl lg:text-2xl">
                                {category.title}
                              </CardTitle>
                            </div>
                          </div>
                          <CardDescription className="text-xs leading-relaxed sm:text-sm md:text-base line-clamp-2">
                            {category.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col justify-between p-4 pt-0 sm:p-6 sm:pt-0">
                          {/* Benefits Grid - single column on 320px, 2 cols on sm+ */}
                          <div className="mb-3 grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2 sm:gap-2 sm:mb-6">
                            {category.benefits.slice(0, 4).map((benefit, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-1.5 sm:gap-2"
                              >
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" />
                                <span className="text-xs sm:text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Service count + detail link */}
                          {category.subservices.length > 0 && (
                            <div className="mb-3 space-y-1 sm:mb-6 sm:space-y-1.5">
                              <p className="text-xs font-medium text-foreground sm:text-sm">
                                {formatServiceCount(category.subservices.length)}
                              </p>
                              {detailSlug && (
                                <Link
                                  href={`/services/${detailSlug}`}
                                  className="inline-flex items-center text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded sm:text-sm"
                                >
                                  Voir le détail
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                              )}
                            </div>
                          )}
                          
                          {/* CTAs - Stacked on mobile */}
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <Button asChild className="min-h-11 w-full text-xs sm:text-sm sm:flex-1">
                              <Link href={category.ctaLink}>
                                Devis gratuit
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                              </Link>
                            </Button>
                            <Button variant="outline" asChild className="min-h-11 w-full text-xs sm:text-sm sm:w-auto">
                              <Link
                                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                              >
                                <Phone className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                                Appeler
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Déménagement Services */}
              <div>
                <div className="mb-3 sm:mb-6">
                  <h2 className="text-lg font-bold sm:text-2xl lg:text-3xl">
                    Déménagement
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-base">
                    Prise en charge complète en Île-de-France.
                  </p>
                </div>
                <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
                  {demenagement.map((category) => {
                    const Icon = category.icon;
                    const detailSlug = category.subservices[0]?.slug;
                    return (
                      <Card
                        key={category.id}
                        className={cn(
                          "flex flex-col overflow-hidden",
                          demenagement.length === 1 && "md:col-span-2 md:max-w-2xl md:mx-auto"
                        )}
                      >
                        <CardHeader className="space-y-2.5 p-4 sm:p-6 sm:space-y-3">
                          <div className="flex items-start gap-2.5 sm:gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-12 sm:w-12">
                              <Icon className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base leading-tight sm:text-lg md:text-xl lg:text-2xl">
                                {category.title}
                              </CardTitle>
                            </div>
                          </div>
                          <CardDescription className="text-xs leading-relaxed sm:text-sm md:text-base line-clamp-2">
                            {category.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col justify-between p-4 pt-0 sm:p-6 sm:pt-0">
                          {/* Benefits Grid - single column on 320px, 2 cols on sm+ */}
                          <div className="mb-3 grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2 sm:gap-2 sm:mb-6">
                            {category.benefits.slice(0, 4).map((benefit, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-1.5 sm:gap-2"
                              >
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" />
                                <span className="text-xs sm:text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Service count + detail link */}
                          {category.subservices.length > 0 && (
                            <div className="mb-3 space-y-1 sm:mb-6 sm:space-y-1.5">
                              <p className="text-xs font-medium text-foreground sm:text-sm">
                                {formatServiceCount(category.subservices.length)}
                              </p>
                              {detailSlug && (
                                <Link
                                  href={`/services/${detailSlug}`}
                                  className="inline-flex items-center text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded sm:text-sm"
                                >
                                  Voir le détail
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                              )}
                            </div>
                          )}
                          
                          {/* CTAs - Stacked on mobile */}
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <Button asChild className="min-h-11 w-full text-xs sm:text-sm sm:flex-1">
                              <Link href={category.ctaLink}>
                                Devis gratuit
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                              </Link>
                            </Button>
                            <Button variant="outline" asChild className="min-h-11 w-full text-xs sm:text-sm sm:w-auto">
                              <Link
                                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                              >
                                <Phone className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                                Appeler
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Quick Access - Mobile-friendly tappable cards */}
        <div className="mt-10 sm:mt-12">
          <h3 className="text-lg font-bold sm:text-xl">Accès rapide aux services</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Liens directs vers chaque service pour un choix immédiat.
          </p>
          <div className="mt-4 grid gap-6 sm:mt-6 sm:grid-cols-2">
            {/* Débarras Quick Links */}
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <h4 className="mb-3 text-base font-semibold text-foreground">Débarras</h4>
              <div className="space-y-2">
                {(activeTab === "particuliers"
                  ? siteConfig.services.particulier.debarras
                  : siteConfig.services.professionnel.debarras
                ).map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex min-h-11 items-center gap-3 rounded-lg border border-transparent bg-muted/50 px-3 py-2.5 transition-all hover:border-primary/20 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span className="flex-1 text-sm font-medium text-foreground group-hover:text-primary">
                      {service.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Déménagement Quick Links */}
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <h4 className="mb-3 text-base font-semibold text-foreground">Déménagement</h4>
              <div className="space-y-2">
                {(activeTab === "particuliers"
                  ? siteConfig.services.particulier.demenagement
                  : siteConfig.services.professionnel.demenagement
                ).map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex min-h-11 items-center gap-3 rounded-lg border border-transparent bg-muted/50 px-3 py-2.5 transition-all hover:border-primary/20 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span className="flex-1 text-sm font-medium text-foreground group-hover:text-primary">
                      {service.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose Us Section */}
      <Section bleed className="border-y bg-linear-to-b from-primary-50/50 via-background to-background">
        <div>
          <h2 className="mb-5 text-center text-lg font-bold sm:mb-8 sm:text-2xl lg:text-3xl">
            {activeTab === "professionnels"
              ? "Pourquoi les entreprises nous choisissent"
              : "Pourquoi nous choisir"}
          </h2>
          
          {/* 2x2 grid on mobile, 4 columns on lg */}
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4">
            <div className="flex flex-col items-center rounded-xl border bg-card p-3 text-center shadow-sm sm:p-4">
              <div className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:mb-3 sm:h-14 sm:w-14">
                <Clock className="h-4 w-4 text-primary sm:h-7 sm:w-7" />
              </div>
              <h3 className="mb-0.5 text-xs font-semibold sm:mb-1 sm:text-base">Rapide</h3>
              <p className="text-[10px] leading-tight text-muted-foreground sm:text-sm">
                Devis 2h, RDV 24-48h
              </p>
            </div>
            <div className="flex flex-col items-center rounded-xl border bg-card p-3 text-center shadow-sm sm:p-4">
              <div className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:mb-3 sm:h-14 sm:w-14">
                <Recycle className="h-4 w-4 text-primary sm:h-7 sm:w-7" />
              </div>
              <h3 className="mb-0.5 text-xs font-semibold sm:mb-1 sm:text-base">Éco</h3>
              <p className="text-[10px] leading-tight text-muted-foreground sm:text-sm">
                Tri & recyclage
              </p>
            </div>
            <div className="flex flex-col items-center rounded-xl border bg-card p-3 text-center shadow-sm sm:p-4">
              <div className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:mb-3 sm:h-14 sm:w-14">
                <Shield className="h-4 w-4 text-primary sm:h-7 sm:w-7" />
              </div>
              <h3 className="mb-0.5 text-xs font-semibold sm:mb-1 sm:text-base">Gratuit</h3>
              <p className="text-[10px] leading-tight text-muted-foreground sm:text-sm">
                Devis sans engagement
              </p>
            </div>
            <div className="flex flex-col items-center rounded-xl border bg-card p-3 text-center shadow-sm sm:p-4">
              <div className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:mb-3 sm:h-14 sm:w-14">
                <Users className="h-4 w-4 text-primary sm:h-7 sm:w-7" />
              </div>
              <h3 className="mb-0.5 text-xs font-semibold sm:mb-1 sm:text-base">Pro</h3>
              <p className="text-[10px] leading-tight text-muted-foreground sm:text-sm">
                Équipe assurée
              </p>
            </div>
          </div>

          {/* Trust Metrics - 3 columns responsive */}
          <div className="mx-auto mt-5 grid max-w-xs grid-cols-2 justify-center sm:grid-cols-3 gap-2 text-center sm:mt-8 sm:max-w-2xl sm:gap-6">
            <div className="rounded-lg bg-primary/5 px-2 py-2.5 sm:p-4">
              <div className="text-lg font-bold text-primary sm:text-2xl lg:text-3xl">500+</div>
              <div className="text-[10px] text-muted-foreground sm:text-sm">
                Missions/an
              </div>
            </div>
            <div className="rounded-lg bg-primary/5 px-2 py-2.5 sm:p-4">
              <div className="text-lg font-bold text-primary sm:text-2xl lg:text-3xl">4.8/5</div>
              <div className="text-[10px] text-muted-foreground sm:text-sm">Note clients</div>
            </div>
            <div className="rounded-lg bg-primary/5 px-2 py-2.5 sm:p-4">
              <div className="text-lg font-bold text-primary sm:text-2xl lg:text-3xl">8 dép.</div>
              <div className="text-[10px] text-muted-foreground sm:text-sm">Île-de-France</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Bottom CTA Section - Matches home page style */}
      <Section bleed className="bg-linear-to-b from-primary-100 via-primary-50/50 to-background">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {activeTab === "professionnels"
              ? "Devis entreprise"
              : "Prêt à commencer ?"}
          </h2>
          <p className="mt-2 text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base">
            Réponse rapide • Sans engagement • Tarifs transparents
          </p>
          
          {/* CTA Buttons - Stacked on mobile */}
          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:mt-6 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className={cn(
                designTokens.button.primary,
                "min-h-11 h-10 sm:h-12 px-3 sm:px-8 text-xs font-semibold w-full sm:w-auto sm:text-sm"
              )}
              asChild
            >
              <Link
                href={
                  activeTab === "professionnels"
                    ? "/devis?service=commerces-entrepots"
                    : "/devis"
                }
              >
                <Image
                  src="/optimized/icons/devis-icon-white-w32.png"
                  width={16}
                  height={16}
                  alt=""
                  className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-5 sm:w-5"
                />
                Devis gratuit
                <ArrowRight className="ml-1 h-3.5 w-3.5 sm:ml-2 sm:h-5 sm:w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={cn(
                designTokens.button.secondary,
                "min-h-11 h-10 sm:h-12 px-3 sm:px-6 text-xs w-full sm:w-auto sm:text-sm"
              )}
              asChild
            >
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              >
                <Phone className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-5 sm:w-5" aria-hidden="true" />
                {siteConfig.contact.phone}
              </a>
            </Button>
          </div>
          
          <p className="mt-4 text-[10px] text-muted-foreground sm:mt-5 sm:text-sm">
            100% gratuit • Intervention Île-de-France
          </p>
        </div>
      </Section>
    </div>
  );
}
