"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/layout/section"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

export default function TarifsPage() {
  const [rooms, setRooms] = useState([2])
  const [volume, setVolume] = useState([50])

  const basePrice = 150
  const roomMultiplier = 50
  const volumeMultiplier = 2

  const estimatedPrice = basePrice + rooms[0] * roomMultiplier + volume[0] * volumeMultiplier

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Calculator className="mx-auto h-10 w-10 text-primary" />
          <h1
            className={cn(
              designTokens.typography.h1,
              "mt-3 text-balance text-3xl sm:text-4xl",
            )}
          >
            Nos Tarifs
          </h1>
          <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
            Des tarifs transparents et compétitifs pour tous vos besoins de débarras
          </p>
        </div>

        {/* Price Estimator */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Estimateur de prix</CardTitle>
            <CardDescription>Obtenez une estimation rapide selon votre projet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Nombre de pièces : {rooms[0]}</Label>
              <Slider value={rooms} onValueChange={setRooms} min={1} max={8} step={1} className="mt-2" />
            </div>

            <div>
              <Label>Volume estimé : {volume[0]} m³</Label>
              <Slider value={volume} onValueChange={setVolume} min={10} max={200} step={10} className="mt-2" />
            </div>

            <div className="rounded-lg bg-primary/10 p-6 text-center">
              <p className="text-sm text-muted-foreground">Prix estimé</p>
              <p className="text-3xl font-bold text-primary sm:text-4xl">{estimatedPrice}€</p>
              <p className="mt-2 text-xs text-muted-foreground">
                * Prix indicatif, un devis personnalisé vous sera fourni
              </p>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/devis">Obtenir un devis précis</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Price Grid */}
        <div className="mt-12">
          <h2 className={cn(designTokens.typography.h2, "mb-6 text-2xl")}>
            Grille tarifaire indicative
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Appartement</CardTitle>
                <CardDescription>À partir de</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Studio</span>
                    <span className="font-semibold">150-250€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>F2</span>
                    <span className="font-semibold">250-400€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>F3</span>
                    <span className="font-semibold">400-600€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>F4-F5</span>
                    <span className="font-semibold">600-1000€</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maison</CardTitle>
                <CardDescription>À partir de</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Petite maison</span>
                    <span className="font-semibold">600-1000€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Maison moyenne</span>
                    <span className="font-semibold">1000-2000€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Grande maison</span>
                    <span className="font-semibold">2000-4000€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Maison + dépendances</span>
                    <span className="font-semibold">Sur devis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cave / Grenier</CardTitle>
                <CardDescription>À partir de</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Petit volume</span>
                    <span className="font-semibold">100-200€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Volume moyen</span>
                    <span className="font-semibold">200-400€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Grand volume</span>
                    <span className="font-semibold">400-800€</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Succession</CardTitle>
                <CardDescription>À partir de</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Appartement</span>
                    <span className="font-semibold">300-800€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Maison</span>
                    <span className="font-semibold">800-3000€</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Avec rachat d'objets</span>
                    <span className="font-semibold">Déduction possible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What's Included */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Ce qui est inclus dans nos tarifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Main d'œuvre complète",
                "Transport et évacuation",
                "Tri et recyclage",
                "Protection des sols et murs",
                "Assurance décennale",
                "Devis gratuit",
                "Aucun frais caché",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Costs */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Suppléments éventuels</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Étage élevé sans ascenseur : +10-20% selon l'étage</li>
              <li>• Accès difficile (rue étroite, etc.) : selon situation</li>
              <li>• Intervention urgente (moins de 24h) : +20%</li>
              <li>• Weekend et jours fériés : +15%</li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Ces tarifs sont indicatifs. Pour un devis précis et personnalisé</p>
          <Button size="lg" asChild>
            <Link href="/devis">Demander un devis gratuit</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
