"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  CheckCircle2,
  Package,
  FileText,
  Boxes,
  Trash2,
  Recycle,
  Clock,
  Shield,
  Users,
  MapPin,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { ProQuoteFunnel } from "./forms/pro-quote-funnel"
import { Suspense } from "react"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

const WHAT_WE_REMOVE = [
  { icon: Package, title: "Mobilier professionnel", desc: "Bureaux, rayonnages, étagères" },
  { icon: Boxes, title: "Cartons et emballages", desc: "Volumes importants acceptés" },
  { icon: FileText, title: "Archives et papiers", desc: "Destruction certifiée" },
  { icon: Trash2, title: "Encombrants divers", desc: "Équipements obsolètes" },
  { icon: Recycle, title: "Déchets triables", desc: "Valorisation maximale" },
  { icon: Package, title: "Stock invendu", desc: "Liquidation et don" },
]

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Demande en 2 minutes",
    desc: "Remplissez le formulaire ci-dessous",
    icon: Clock,
  },
  {
    step: 2,
    title: "Estimation et planification",
    desc: "Devis gratuit sous 2h, planning adapté",
    icon: FileText,
  },
  {
    step: 3,
    title: "Intervention et tri/recyclage",
    desc: "Équipe pro, tri sur place, certificats fournis",
    icon: Recycle,
  },
]

const TRUST_POINTS = [
  { icon: Clock, text: "Intervention 24 à 48 h", subtext: "selon urgence" },
  { icon: Shield, text: "Devis gratuit", subtext: "sans engagement" },
  { icon: Recycle, text: "Tri et recyclage", subtext: "certifié" },
  { icon: Users, text: "Équipe professionnelle", subtext: "formée et assurée" },
]

export function ProServiceLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-muted/30 to-background py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              <MapPin className="mr-1 h-3 w-3" />
              Île-de-France
            </Badge>
            <h1
              className={cn(
                designTokens.typography.h1,
                designTokens.textScale["4xl5xl6xl"],
                "text-balance",
              )}
            >
              Débarras de commerces et entrepôts en Île-de-France
            </h1>
            <p
              className={cn(
                designTokens.textScale.lgXl,
                "mt-4 text-pretty text-muted-foreground",
              )}
            >
              Évacuation rapide des encombrants et déchets professionnels. Tri, recyclage, dons.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className={designTokens.textScale.base}>
                <a href="#devis">
                  Devis gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className={cn(designTokens.textScale.base, "bg-transparent")}
              >
                <Link href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Appeler maintenant
                </Link>
              </Button>
            </div>

            {/* Reassurance */}
            <p className={cn(designTokens.textScale.base, "mt-6 text-muted-foreground")}>
              <CheckCircle2 className="mr-1 inline h-4 w-4 text-primary" />
              Réponse rapide • Sans engagement
            </p>
          </div>

          {/* Trust strip */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point, idx) => {
              const Icon = point.icon
              return (
                <Card key={idx} className="border-primary/20 bg-card/50">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className={cn(designTokens.textScale.base, "font-semibold")}>
                        {point.text}
                      </div>
                      <div className={cn(designTokens.textScale.xs, "text-muted-foreground")}>
                        {point.subtext}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* What we remove */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2
              className={cn(
                designTokens.typography.h2,
                designTokens.textScale["3xl4xl5xl"],
                "mb-8 text-center",
              )}
            >
              Ce que nous évacuons
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WHAT_WE_REMOVE.map((item, idx) => {
                const Icon = item.icon
                return (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className={cn(designTokens.typography.h4, "mb-1")}>
                        {item.title}
                      </h3>
                      <p className={cn(designTokens.textScale.base, "text-muted-foreground")}>
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2
              className={cn(
                designTokens.typography.h2,
                designTokens.textScale["3xl4xl5xl"],
                "mb-12 text-center",
              )}
            >
              Comment ça marche ?
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {HOW_IT_WORKS.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.step} className="relative text-center">
                    {/* Step number */}
                    <div
                      className={cn(
                        designTokens.textScale["2xl"],
                        "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground",
                      )}
                    >
                      {step.step}
                    </div>
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3
                      className={cn(
                        designTokens.typography.h4,
                        designTokens.textScale.lg,
                        "mb-2",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className={cn(designTokens.textScale.base, "text-muted-foreground")}>
                      {step.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded quote form */}
      <section id="devis" className="scroll-mt-20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className={cn(
                designTokens.typography.h2,
                designTokens.textScale["3xl4xl5xl"],
                "mb-4",
              )}
            >
              Demandez votre devis gratuit
            </h2>
            <p className={cn(designTokens.textScale.base, "mb-8 text-muted-foreground")}>
              Remplissez le formulaire ci-dessous en 2 minutes
            </p>
          </div>

          <Suspense
            fallback={<div className={cn(designTokens.textScale.base, "text-center")}>Chargement...</div>}
          >
            <ProQuoteFunnel />
          </Suspense>
        </div>
      </section>

      {/* Trust & compliance */}
      <section className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2
              className={cn(
                designTokens.typography.h2,
                designTokens.textScale["2xl3xl"],
                "mb-8 text-center",
              )}
            >
              Nos garanties professionnelles
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <Recycle className="mx-auto mb-3 h-10 w-10 text-primary" />
                  <h3 className={cn(designTokens.typography.h4, "mb-2")}>Tri et recyclage</h3>
                  <p className={cn(designTokens.textScale.base, "text-muted-foreground")}>
                    Démarche éco-responsable avec tri sur place, valorisation maximale et certificats de destruction
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="mx-auto mb-3 h-10 w-10 text-primary" />
                  <h3 className={cn(designTokens.typography.h4, "mb-2")}>
                    Intervention organisée
                  </h3>
                  <p className={cn(designTokens.textScale.base, "text-muted-foreground")}>
                    Planning flexible, hors heures ouvrées possible, coordination sans interruption d'activité
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="mx-auto mb-3 h-10 w-10 text-primary" />
                  <h3 className={cn(designTokens.typography.h4, "mb-2")}>
                    Équipe professionnelle
                  </h3>
                  <p className={cn(designTokens.textScale.base, "text-muted-foreground")}>
                    Personnel formé, équipé selon normes de sécurité, assuré et respectueux de vos locaux
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-3xl border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2
                className={cn(
                  designTokens.typography.h2,
                  designTokens.textScale["2xl3xl"],
                  "mb-4",
                )}
              >
                Une question ? Besoin d'un conseil ?
              </h2>
              <p className={cn(designTokens.textScale.base, "mb-6 text-muted-foreground")}>
                Notre équipe est à votre écoute du lundi au samedi
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" variant="outline" asChild>
                  <Link href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {siteConfig.contact.phone}
                  </Link>
                </Button>
                <Button size="lg" asChild>
                  <a href="#devis">Retour au formulaire</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
