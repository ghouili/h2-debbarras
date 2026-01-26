import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Warehouse, Heart, Truck } from "lucide-react";
import { homeCopy } from "@/lib/content/home-copy";
import { Section } from "@/components/layout/section";
import Image from "next/image";

const iconMap = {
  home: Home,
  warehouse: Warehouse,
  heart: Heart,
  truck: Truck,
};

// Service definitions for the grid - mix of débarras and déménagement
const servicesForGrid = [
  {
    id: "debarras-maison",
    slug: "debarras-maison-vide-maison",
    icon: "home",
  },
  {
    id: "cave-grenier",
    slug: "debarras-cave-grenier",
    icon: "warehouse",
  },
  {
    id: "succession",
    slug: "debarras-succession",
    icon: "heart",
  },
  {
    id: "demenagement-particulier",
    slug: "demenagement-particulier",
    icon: "truck",
  },
];

export function ServicesGrid() {
  const serviceCardsCopy = homeCopy.serviceCards;

  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          {serviceCardsCopy.title}
        </h2>
        <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
          {serviceCardsCopy.subtitle}
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {servicesForGrid.map((service, index) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap] || Home;
          const copyCard = serviceCardsCopy.cards[index];
          return (
            <Card
              key={service.id}
              className="group w-full flex flex-col justify-between transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <div className=" mb-0  flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg sm:text-xl">
                  {copyCard?.title}
                </CardTitle>
                <CardDescription className="text-pretty text-sm sm:text-base">
                  {copyCard?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  asChild
                  className="group/btn w-full justify-between min-h-11 h-10 sm:h-11 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <Link href={`/services/${service.slug}`}>
                    {serviceCardsCopy.ctaLabel}
                    <span className="sr-only">
                      {copyCard?.title ? ` — ${copyCard.title}` : ""}
                    </span>
                    <span
                      className="transition-transform group-hover/btn:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 sm:mt-10 text-center">
        <Button size="lg" className="min-h-11 h-10 sm:h-12 px-4 sm:px-8 text-xs sm:text-sm" asChild>
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4">
            <Image
              src="/optimized/icons/devis-icon-white-w32.png"
              width={16}
              height={16}
              alt=""
              className="mr-0.5 h-4 w-4 sm:h-5 sm:w-5"
            />
            <Link href="/devis">{serviceCardsCopy.sectionCta}</Link>
          </div>
        </Button>
      </div>
    </Section>
  );
}
