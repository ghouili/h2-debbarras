"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeCopy } from "@/lib/content/home-copy";
import { Section } from "../layout/section";

export function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const examples = [
    {
      title: "Appartement F3 - Paris 15e",
      before: "/before-paris-arrart-01.png",
      after: "/after-paris-arrart-01.png",
      description: "Débarras complet en 3 heures",
    },
    {
      title: "Appartement F3 - Paris 15e",
      before: "/top-appar-before.png",
      after: "/top-appar-after.png",
      description: "Débarras complet en 3 heures",
    },
    {
      title: "Cave - Versailles",
      before: "/clean-empty-basement-before-clearance.png",
      after: "/clean-empty-basement-after-clearance.png",
      description: "Évacuation de 15m³ d'objets",
    },
    {
      title: "Maison - Créteil",
      before: "/clean-empty-house-before-clearance.png",
      after: "/clean-empty-house-after-clearance.jpg",
      description: "Débarras complet en 1 journée",
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  };

  const current = examples[currentIndex];
  const copy = homeCopy.beforeAfter;

  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {copy.subtitle}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-center text-xl font-semibold">
              {current.title}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-center text-sm font-medium text-muted-foreground">
                  Avant
                </p>
                <img
                  src={current.before || "/placeholder.svg"}
                  alt={`Avant - ${current.title}`}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="mb-2 text-center text-sm font-medium text-muted-foreground">
                  Après
                </p>
                <img
                  src={current.after || "/placeholder.svg"}
                  alt={`Après - ${current.title}`}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              </div>
            </div>
            <p className="mt-4 text-center text-muted-foreground">
              {current.description}
            </p>

            <p className="mt-2 text-center text-xs text-muted-foreground">
              {copy.caption}
            </p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Button variant="outline" size="icon" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {examples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-border"
                    }`}
                    aria-label={`Aller à l'exemple ${index + 1}`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
