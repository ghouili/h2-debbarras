"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Store,
  HardHat,
  Briefcase,
  Home,
  Warehouse,
  Heart,
  Package,
  Sparkles,
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

const iconMap = {
  "building-2": Building2,
  store: Store,
  "hard-hat": HardHat,
  briefcase: Briefcase,
  home: Home,
  warehouse: Warehouse,
  heart: Heart,
  package: Package,
  sparkles: Sparkles,
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("professionnels");

  const serviceCategories = {
    professionnels: [
      {
        id: "commerces-entrepots",
        title: "Débarras Commerces & Entrepôts",
        description:
          "Solution complète pour vider boutiques, entrepôts et locaux commerciaux en Île-de-France",
        icon: Store,
        featured: true,
        benefits: [
          "Intervention rapide 24-48h",
          "Équipe professionnelle",
          "Gros volumes",
          "Planning flexible",
        ],
        subservices: siteConfig.services.professionnel.debarras,
        ctaText: "Devis commerce",
        ctaLink: "/devis?service=commerces-entrepots",
      },
      {
        id: "bureaux",
        title: "Débarras Bureaux & Locaux",
        description:
          "Vidage de bureaux, locaux professionnels avec destruction de documents confidentiels",
        icon: Building2,
        benefits: [
          "Hors heures ouvrées",
          "Confidentialité garantie",
          "Tri professionnel",
          "Certificats fournis",
        ],
        subservices: [siteConfig.services.professionnel.debarras[0]],
        ctaText: "Devis bureau",
        ctaLink: "/devis?service=bureaux-locaux",
      },
      {
        id: "demenagement-pro",
        title: "Déménagement d'Entreprise",
        description: "Déménagement professionnel sans interruption d'activité",
        icon: Briefcase,
        benefits: [
          "Planning sur mesure",
          "Week-end & nuit possible",
          "IT & téléphonie",
          "Remise en service",
        ],
        subservices: siteConfig.services.professionnel.demenagement,
        ctaText: "Devis déménagement",
        ctaLink: "/devis?service=demenagement-entreprise",
      },
      {
        id: "nettoyage-pro",
        title: "Nettoyage Professionnel",
        description:
          "Nettoyage après travaux, entretien de locaux et interventions spécialisées",
        icon: Sparkles,
        benefits: [
          "Après travaux",
          "Contrats récurrents",
          "Produits professionnels",
          "Personnel formé",
        ],
        subservices: siteConfig.services.professionnel.nettoyage,
        ctaText: "Devis nettoyage",
        ctaLink: "/devis?service=nettoyage-professionnel",
      },
    ],
    particuliers: [
      {
        id: "debarras-logement",
        title: "Débarras Maison & Appartement",
        description:
          "Vidage complet de logements avec tri et recyclage écoresponsable",
        icon: Home,
        featured: true,
        benefits: [
          "Intervention 24-48h",
          "Tri sélectif inclus",
          "Nettoyage après débarras",
          "Devis gratuit",
        ],
        subservices: siteConfig.services.particulier.debarras.slice(0, 4),
        ctaText: "Devis particulier",
        ctaLink: "/devis?service=maison-appartement",
      },
      {
        id: "cave-grenier",
        title: "Caves, Greniers & Garages",
        description: "Évacuation d'espaces encombrés avec accès difficile",
        icon: Warehouse,
        benefits: [
          "Accès difficile OK",
          "Évacuation rapide",
          "Tri recyclable",
          "Prix compétitifs",
        ],
        subservices: [siteConfig.services.particulier.debarras[1]],
        ctaText: "Devis cave/grenier",
        ctaLink: "/devis?service=cave-grenier",
      },
      {
        id: "demenagement",
        title: "Déménagement Particuliers",
        description:
          "Déménagement complet ou transport de meubles en Île-de-France",
        icon: Package,
        benefits: [
          "Emballage inclus",
          "Transport sécurisé",
          "Montage/démontage",
          "Assurance",
        ],
        subservices: siteConfig.services.particulier.demenagement,
        ctaText: "Devis déménagement",
        ctaLink: "/devis?service=demenagement-particulier",
      },
    ],
    // nettoyage: [
    //   {
    //     id: "nettoyage-apres",
    //     title: "Nettoyage Après Intervention",
    //     description: "Nettoyage complet après débarras, déménagement ou travaux",
    //     icon: Sparkles,
    //     featured: true,
    //     benefits: ["Remise en état complète", "Produits écologiques", "Finitions soignées", "Prêt à occuper"],
    //     subservices: [...siteConfig.services.particulier.nettoyage, ...siteConfig.services.professionnel.nettoyage],
    //     ctaText: "Devis nettoyage",
    //     ctaLink: "/devis?service=nettoyage",
    //   },
    // ],
  };

  const currentCategories =
    serviceCategories[activeTab as keyof typeof serviceCategories];

  return (
    <div className="min-h-screen bg-background">
      <Section bleed className="border-b bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Nos Services
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground md:text-xl">
            Des solutions professionnelles et rapides en Île-de-France
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="professionnels"
                className="text-sm md:text-base"
              >
                Professionnels
              </TabsTrigger>
              <TabsTrigger
                value="particuliers"
                className="text-sm md:text-base"
              >
                Particuliers
              </TabsTrigger>
              {/* <TabsTrigger value="nettoyage" className="text-sm md:text-base">
                Nettoyage
              </TabsTrigger> */}
            </TabsList>
          </Tabs>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {currentCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={`flex flex-col ${category.featured ? "border-primary/50 shadow-md" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      {category.featured && (
                        <Badge variant="default" className="mb-2">
                          Recommandé
                        </Badge>
                      )}
                      <CardTitle className="text-2xl">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  {/* Benefits */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {category.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Subservices */}
                  <div className="mb-6">
                    <p className="mb-3 text-sm font-medium text-muted-foreground">
                      Services inclus :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.subservices.map((sub) => (
                        <Link key={sub.id} href={`/services/${sub.slug}`}>
                          <Badge
                            variant="secondary"
                            className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                          >
                            {sub.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    {category.subservices.length > 0 && (
                      <Link 
                        href={`/services/${category.subservices[0].slug}`}
                        className="mt-3 inline-flex items-center text-sm text-primary hover:underline"
                      >
                        Voir le détail du service
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button asChild className="flex-1">
                      <Link href={category.ctaLink}>
                        {category.ctaText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Appeler
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* All Services List */}
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-bold">
            Tous nos services {activeTab === "professionnels" ? "professionnels" : "particuliers"}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activeTab === "particuliers" ? (
              <>
                {siteConfig.services.particulier.debarras.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{service.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{service.shortDescription}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
                {siteConfig.services.particulier.demenagement.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{service.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{service.shortDescription}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
              </>
            ) : (
              <>
                {siteConfig.services.professionnel.debarras.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{service.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{service.shortDescription}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
                {siteConfig.services.professionnel.demenagement.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{service.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{service.shortDescription}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
                {siteConfig.services.professionnel.nettoyage.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{service.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{service.shortDescription}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </Section>

      <Section bleed className="border-y bg-muted/30">
        <div>
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            {activeTab === "professionnels"
              ? "Pourquoi les entreprises nous choisissent"
              : "Pourquoi nous choisir"}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">Intervention rapide</h3>
              <p className="text-sm text-muted-foreground">
                Devis sous 2h, intervention 24-48h
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Recycle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">Tri & recyclage</h3>
              <p className="text-sm text-muted-foreground">
                Démarche écoresponsable systématique
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">Devis gratuit</h3>
              <p className="text-sm text-muted-foreground">
                Sans engagement, tarifs transparents
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">Équipe pro</h3>
              <p className="text-sm text-muted-foreground">
                Formée, équipée et assurée
              </p>
            </div>
          </div>

          {/* Trust proof strip */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">
                Interventions/an
              </div>
            </div>
            <Separator orientation="vertical" className="h-12" />
            <div>
              <div className="text-2xl font-bold text-primary">4.8/5</div>
              <div className="text-sm text-muted-foreground">Note moyenne</div>
            </div>
            <Separator orientation="vertical" className="h-12" />
            <div>
              <div className="text-2xl font-bold text-primary">8 depts</div>
              <div className="text-sm text-muted-foreground">Île-de-France</div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Card className="mx-auto max-w-3xl border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              {activeTab === "professionnels"
                ? "Demandez un devis pour votre commerce ou entrepôt"
                : "Demandez votre devis gratuit"}
            </h2>
            <p className="mb-6 text-muted-foreground">
              Réponse sous 2h • Sans engagement • Tarifs transparents
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link
                  href={
                    activeTab === "professionnels"
                      ? "/devis?service=commerces-entrepots"
                      : "/devis"
                  }
                >
                  Obtenir un devis gratuit
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {siteConfig.contact.phone}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
