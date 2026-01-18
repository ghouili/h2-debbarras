"use client"

import { useState, useCallback, useMemo } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, CheckCircle2, Search, Phone, AlertCircle, Navigation, Sparkles, Clock, Shield, Truck, Map, Layers } from "lucide-react"
import { siteConfig } from "@/lib/config"
import Link from "next/link"
import { Section } from "@/components/layout/section"

// Dynamic import for the map component (required for Leaflet SSR compatibility)
const IleDeFranceMap = dynamic(
  () => import("@/components/maps/ile-de-france-map"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-[450px] w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary-50/50 to-muted/30 border-2 border-dashed border-primary/20">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
            <Map className="absolute inset-0 m-auto h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Chargement de la carte...</span>
        </div>
      </div>
    )
  }
)

// Île-de-France departments for the sidebar
const departments = [
  { code: "92", name: "Hauts-de-Seine" },
  { code: "93", name: "Seine-Saint-Denis" },
  { code: "94", name: "Val-de-Marne" },
  { code: "91", name: "Essonne" },
  { code: "78", name: "Yvelines" },
  { code: "95", name: "Val-d'Oise" },
  { code: "77", name: "Seine-et-Marne" },
]

export default function ZonesPage() {
  const [postalCode, setPostalCode] = useState("")
  const [result, setResult] = useState<"covered" | "ask" | null>(null)
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)
  const [selectedDept, setSelectedDept] = useState<string | null>(null)
  const [mapView, setMapView] = useState<"paris" | "idf">("paris")

  const checkPostalCode = useCallback(() => {
    if (!postalCode) return
    const prefix = postalCode.substring(0, 2)
    const covered = siteConfig.zones.departements.some((dept) => dept.code === prefix)
    setResult(covered ? "covered" : "ask")
    
    // Highlight the department on map
    if (prefix === "75") {
      setMapView("paris")
    } else {
      setMapView("idf")
      setSelectedDept(prefix)
    }
  }, [postalCode])

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-background to-primary-100/50 py-16 md:py-24">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse delay-1000" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Navigation className="h-4 w-4" />
              <span>Intervention rapide en Île-de-France</span>
            </div>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-primary-600 via-primary-400 to-primary-300 bg-clip-text text-transparent">
                Paris & Île-de-France
              </span>
              <br />
              <span className="text-foreground">Notre territoire d'intervention</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              Découvrez nos zones de couverture. Du cœur de Paris aux 8 départements d'Île-de-France, 
              nous intervenons rapidement pour tous vos besoins de débarras.
            </p>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <div className="text-xs text-muted-foreground">Départements</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-foreground">24-48h</div>
                  <div className="text-xs text-muted-foreground">Intervention</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-foreground">20</div>
                  <div className="text-xs text-muted-foreground">Arrondissements</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Postal Code Checker - Floating Card */}
      <Section className="-mt-8 relative z-10">
        <div className="mx-auto max-w-3xl">
          <Card className="border-2 border-primary/10 shadow-xl shadow-primary/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-400 shadow-lg shadow-primary/25">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Vérifiez votre éligibilité</h2>
                  <p className="text-sm text-muted-foreground">Entrez votre code postal pour savoir si nous intervenons chez vous</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1 min-w-0">
                  <Label htmlFor="postal-check" className="sr-only">
                    Code postal
                  </Label>
                  <Input
                    id="postal-check"
                    type="text"
                    placeholder="Ex: 75001, 92100, 94200..."
                    value={postalCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 5)
                      setPostalCode(value)
                      setResult(null)
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && checkPostalCode()}
                    maxLength={5}
                    className="h-14 text-lg font-mono tracking-wider text-center border-2 focus:border-primary"
                  />
                </div>
                <Button 
                  onClick={checkPostalCode} 
                  size="lg" 
                  className="h-14 px-8 bg-gradient-to-r from-primary-600 via-primary-400 to-primary-300 hover:from-primary-700 hover:via-primary-500 hover:to-primary-400 shadow-lg shadow-primary/30"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Vérifier
                </Button>
              </div>

              {result === "covered" && (
                <div className="mt-6 flex items-start gap-4 rounded-xl border-2 border-green-500/30 bg-green-50 p-5 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-green-800">Excellente nouvelle ! Nous intervenons dans votre zone.</p>
                    <p className="mt-1 text-sm text-green-700">
                      Votre code postal {postalCode} est couvert. Intervention possible sous 24-48h.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                        <Link href="/devis">
                          <Sparkles className="mr-2 h-4 w-4" />
                          Devis gratuit
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50">
                        <Link href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                          <Phone className="mr-2 h-4 w-4" />
                          Appeler
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {result === "ask" && (
                <div className="mt-6 flex items-start gap-4 rounded-xl border-2 border-amber-500/30 bg-amber-50 p-5 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-amber-800">Zone hors couverture standard</p>
                    <p className="mt-1 text-sm text-amber-700">
                      Le code postal {postalCode} est hors Île-de-France. Contactez-nous pour étudier votre demande.
                    </p>
                    <Button asChild variant="outline" className="mt-4 border-amber-600 text-amber-700 hover:bg-amber-50" size="sm">
                      <Link href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Nous contacter
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Interactive Map Section - Custom layout for sticky */}
      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Carte Interactive</h2>
            <p className="mt-2 text-muted-foreground">Explorez nos zones d'intervention en survolant la carte</p>
          </div>

          {/* Map View Toggle */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-xl bg-muted p-1.5 shadow-inner">
              <button
                onClick={() => { setMapView("paris"); setSelectedDept(null); }}
                className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                  mapView === "paris" 
                    ? "bg-white text-primary shadow-md" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapPin className="mr-2 inline-block h-4 w-4" />
                Paris (75)
              </button>
              <button
                onClick={() => { setMapView("idf"); setSelectedDept(null); }}
                className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                  mapView === "idf" 
                    ? "bg-white text-primary shadow-md" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Navigation className="mr-2 inline-block h-4 w-4" />
                Île-de-France
              </button>
            </div>
          </div>

          {/* Two column layout with sticky map */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Departments List - Left column, scrollable */}
            <div className="order-2 lg:order-1 w-full lg:w-2/5">
              <div className="space-y-3">
                <h3 className="mb-4 text-lg font-semibold">Départements couverts</h3>
                
                {/* Paris Card */}
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredZone === "75" || selectedDept === "75" 
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                      : "hover:border-primary/30 hover:shadow-md"
                  }`}
                  onMouseEnter={() => setHoveredZone("75")}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => { setMapView("paris"); setSelectedDept(null); }}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold transition-all duration-300 ${
                      hoveredZone === "75" 
                        ? "bg-primary text-white shadow-lg shadow-primary/30" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      75
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Paris</div>
                      <div className="text-xs text-muted-foreground">20 arrondissements</div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </CardContent>
                </Card>
                
                {/* Other Departments */}
                {departments.map((dept) => (
                  <Card 
                    key={dept.code}
                    className={`cursor-pointer transition-all duration-300 ${
                      hoveredZone === dept.code || selectedDept === dept.code 
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                        : "hover:border-primary/30 hover:shadow-md"
                    }`}
                    onMouseEnter={() => setHoveredZone(dept.code)}
                    onMouseLeave={() => setHoveredZone(null)}
                    onClick={() => { setMapView("idf"); setSelectedDept(dept.code); }}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold transition-all duration-300 ${
                        hoveredZone === dept.code || selectedDept === dept.code 
                          ? "bg-primary text-white shadow-lg shadow-primary/30" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        {dept.code}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{dept.name}</div>
                        <div className="text-xs text-muted-foreground">Couvert</div>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Map Container - Right column, sticky */}
            <div className="order-1 lg:order-2 w-full lg:w-3/5">
              <div className="lg:sticky lg:top-24">
                <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
                  <CardContent className="p-0">
                    {/* Real Interactive Map with OpenStreetMap */}
                    <IleDeFranceMap
                      view={mapView}
                      hoveredZone={hoveredZone}
                      selectedDept={selectedDept}
                      onZoneHover={setHoveredZone}
                      onZoneClick={(zone) => {
                        if (zone === "75") {
                          setMapView("paris")
                          setSelectedDept(null)
                        } else {
                          setMapView("idf")
                          setSelectedDept(zone)
                        }
                      }}
                    />
                    
                    {/* Map Controls Legend */}
                    <div className="border-t bg-muted/30 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-primary" />
                            <span>Paris</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="h-3 w-3 rounded-full border-2 border-primary bg-white" />
                            <span>Département couvert</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Layers className="h-3.5 w-3.5" />
                          <span>Cliquez pour explorer</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Map Attribution */}
                <p className="mt-2 text-center text-[10px] text-muted-foreground">
                  Carte © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">OpenStreetMap</a> contributors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Pourquoi nous choisir ?</h2>
            <p className="mt-2 text-muted-foreground">Nos engagements pour toutes nos interventions</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="group relative overflow-hidden border-2 border-transparent bg-white transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardContent className="relative p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-400 shadow-lg shadow-primary/25">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Intervention Rapide</h3>
                <p className="text-sm text-muted-foreground">
                  Nous intervenons sous 24 à 48h dans toute l'Île-de-France. Urgences traitées en priorité.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group relative overflow-hidden border-2 border-transparent bg-white transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardContent className="relative p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-400 shadow-lg shadow-primary/25">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Devis Gratuit</h3>
                <p className="text-sm text-muted-foreground">
                  Estimation gratuite et sans engagement. Prix transparent, pas de mauvaise surprise.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group relative overflow-hidden border-2 border-transparent bg-white transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardContent className="relative p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-400 shadow-lg shadow-primary/25">
                  <Truck className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Service Complet</h3>
                <p className="text-sm text-muted-foreground">
                  Du débarras au nettoyage final, nous gérons tout. Tri, recyclage et évacuation inclus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 shadow-2xl shadow-primary/30">
            {/* Decorative elements */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            
            <CardContent className="relative p-8 text-center md:p-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white">
                <Sparkles className="h-4 w-4" />
                <span>Devis gratuit en 2 minutes</span>
              </div>
              
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Prêt à libérer votre espace ?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">
                Que vous soyez à Paris ou en Île-de-France, notre équipe est prête à intervenir. 
                Obtenez votre devis gratuit dès maintenant.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button 
                  size="lg" 
                  asChild 
                  className="h-14 bg-white px-8 text-base font-semibold text-primary hover:bg-white/90 shadow-xl"
                >
                  <Link href="/devis">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Demander un devis gratuit
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="h-14 border-2 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
                >
                  <Link href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {siteConfig.contact.phone}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  )
}
