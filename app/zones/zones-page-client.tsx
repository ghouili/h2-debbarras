"use client";

import { useState, useCallback, useMemo, useEffect, useRef, memo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { cn } from "@/lib/utils";
import { designTokens } from "@/lib/design-tokens";
import {
  departments,
  zonesFaqs,
  isPostalCodeCovered,
  getDepartmentFromPostalCode,
  getDepartmentsByCluster,
  type DepartmentCluster,
  type Department,
} from "@/lib/zones-data";
import {
  MapPin,
  CheckCircle2,
  Phone,
  AlertCircle,
  Clock,
  Shield,
  Recycle,
  FileText,
  ChevronRight,
  Map,
  Home,
  Building2,
  Package,
  Heart,
  ArrowRight,
  Loader2,
  ArrowDown,
  Layers,
} from "lucide-react";

// =============================================================================
// DYNAMIC MAP IMPORT (SSR disabled, lazy loaded)
// =============================================================================

const IleDeFranceMap = dynamic(
  () => import("@/components/maps/ile-de-france-map"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  },
);

// =============================================================================
// CONSTANTS
// =============================================================================

const FEATURED_SERVICES = [
  {
    slug: "debarras-maison-vide-maison",
    title: "Maison",
    benefit: "Tri + évacuation complète",
    icon: Home,
  },
  {
    slug: "debarras-appartement-vide-appartement",
    title: "Appartement",
    benefit: "Gestion étages et accès",
    icon: Building2,
  },
  {
    slug: "debarras-succession",
    title: "Succession",
    benefit: "Accompagnement discret",
    icon: Heart,
  },
  {
    slug: "debarras-cave-grenier",
    title: "Cave et Grenier",
    benefit: "Objets encombrants et cartons",
    icon: Package,
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: "Assuré" },
  { icon: FileText, label: "Devis gratuit" },
  { icon: Clock, label: "24 à 48 h" },
  { icon: Recycle, label: "Recyclage" },
];

const CLUSTER_TABS: { id: DepartmentCluster; label: string; depts: string }[] =
  [
    { id: "paris", label: "Paris", depts: "75" },
    { id: "petite-couronne", label: "Petite couronne", depts: "92–93–94" },
    { id: "grande-couronne", label: "Grande couronne", depts: "77–78–91–95" },
  ];

const DEPT_BULLETS = [
  { icon: Clock, text: "Délai typique : 24 à 48 h" },
  { icon: Layers, text: "Accès/étages : gérés sur place" },
  { icon: Recycle, text: "Tri + recyclage/valorisation" },
];

// =============================================================================
// TRUST ROW (compact pills)
// =============================================================================

const TrustRow = memo(function TrustRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
      {TRUST_BADGES.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-primary/10 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm"
        >
          <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {label}
        </span>
      ))}
    </div>
  );
});

// =============================================================================
// HERO SECTION (value prop only, no postal checker)
// =============================================================================

const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-50 via-primary-50/50 to-background pt-3 pb-8 sm:pt-4 sm:pb-14 md:pt-6 md:pb-16">
      {/* Decorative blobs */}
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Zones d'intervention" }]} />

        <div className="mx-auto mt-3 max-w-2xl text-center sm:mt-4">
          {/* Title - Responsive typography */}
          <h1
            className={cn(
              designTokens.typography.h1,
              "text-balance text-xl leading-tight sm:text-3xl lg:text-4xl",
            )}
          >
            Débarras professionnel
          </h1>
          <p
            className={cn(
              designTokens.typography.h1,
              "text-balance text-xl leading-tight sm:text-3xl lg:text-4xl pt-0.5 sm:pt-2 bg-linear-to-r from-primary-600 via-primary-400 to-primary-300 bg-clip-text text-transparent",
            )}
          >
            Paris et Île-de-France
          </p>

          <p className="mx-auto mt-2 max-w-xl text-pretty text-xs text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
            Intervention rapide dans les 8 départements. Devis gratuit, sans engagement.
          </p>

          {/* Trust badges - Full width, wraps properly */}
          <div className="mt-3 sm:mt-6">
            <TrustRow />
          </div>

          {/* CTAs - Stack on mobile */}
          <div className="mt-4 flex flex-col items-center gap-2 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
            <Button
              asChild
              size="lg"
              className={cn(
                "min-h-11 w-full px-3 text-xs font-semibold sm:w-auto sm:px-7 sm:text-sm",
                designTokens.button.primary,
              )}
            >
              <Link href="/devis">
                <Image
                  src="/optimized/icons/devis-icon-white-w32.png"
                  width={20}
                  height={20}
                  alt="Icône demande de devis gratuit"
                  className="mr-1 h-3.5 w-3.5 sm:mr-1.5 sm:h-5 sm:w-5"
                />
                Devis gratuit
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-h-11 w-full px-3 text-xs font-medium sm:w-auto sm:px-6 sm:text-sm"
            >
              <a href="#verifier">
                <MapPin className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                Vérifier mon code postal
              </a>
            </Button>
          </div>

          {/* Phone link */}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors sm:mt-6 sm:text-sm"
          >
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
});

// =============================================================================
// POSTAL CHECKER SECTION (dedicated, independent)
// =============================================================================

interface PostalCheckerSectionProps {
  postalCode: string;
  setPostalCode: (v: string) => void;
  eligibility: "covered" | "unknown" | null;
  coveredDeptCode: string | null;
  onCheck: () => void;
}

const PostalCheckerSection = memo(function PostalCheckerSection({
  postalCode,
  setPostalCode,
  eligibility,
  coveredDeptCode,
  onCheck,
}: PostalCheckerSectionProps) {
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5));
    },
    [setPostalCode],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && postalCode.length === 5) onCheck();
    },
    [onCheck, postalCode],
  );

  return (
    <Section className="bg-slate-50/80 border-y border-border/30">
      <div id="verifier" className="mx-auto max-w-xl scroll-mt-20 px-3 sm:px-4">
        {/* Section heading */}
        <div className="text-center mb-3 sm:mb-6">
          <h2 className={cn(designTokens.typography.h2, "text-lg sm:text-2xl lg:text-3xl")}>
            Vérifier votre zone
          </h2>
          <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-base">
            Entrez votre code postal pour un devis.
          </p>
        </div>

        {/* Postal checker card */}
        <Card className="border-2 border-primary/10 shadow-lg ">
          <CardContent className="p-3 sm:p-5 md:p-6">
            <Label htmlFor="postal-section" className="sr-only">
              Code postal
            </Label>
            {/* Stack on mobile, inline on sm+ */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
              <Input
                id="postal-section"
                type="text"
                inputMode="numeric"
                placeholder="Code postal"
                value={postalCode}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                maxLength={5}
                className="min-h-11 h-11 w-full text-center text-sm font-mono tracking-widest border-2 focus:border-primary sm:flex-1 sm:text-lg"
                aria-describedby="postal-section-hint"
              />
              <Button
                onClick={onCheck}
                disabled={postalCode.length < 5}
                className={cn(
                  "min-h-11 h-11 w-full px-4 text-xs font-semibold sm:w-auto sm:px-5 sm:text-sm",
                  designTokens.button.primary,
                )}
                aria-label="Vérifier"
              >
                Vérifier
              </Button>
            </div>
            <p
              id="postal-section-hint"
              className="mt-1.5 text-center text-[10px] text-muted-foreground sm:mt-2 sm:text-xs"
            >
              Ex : 75001, 92100, 94200…
            </p>

            {/* Eligibility feedback - Reserved min-height to avoid CLS */}
            <div className="h-fit">
              {eligibility === "covered" && coveredDeptCode && (
                <div className="mt-3 animate-in slide-in-from-top-2 duration-200 sm:mt-5">
                  <div className="flex flex-col items-stretch gap-2 rounded-lg border border-green-200 bg-green-50 px-2.5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-3">
                    <span className="flex items-center justify-center gap-1.5 text-xs font-medium text-green-800 sm:justify-start sm:gap-2 sm:text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                      Zone couverte ({coveredDeptCode})
                    </span>
                    <Button
                      asChild
                      size="sm"
                      className="min-h-10 shrink-0 bg-green-600 hover:bg-green-700 text-white px-3 text-xs font-semibold sm:px-4 sm:text-sm"
                    >
                      <Link href={`/devis?postalCode=${postalCode}`}>
                        Mon devis
                      </Link>
                    </Button>
                  </div>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-green-700 hover:underline sm:mt-2 sm:text-xs"
                  >
                    <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    ou appelez-nous
                  </a>
                </div>
              )}

              {eligibility === "unknown" && (
                <div className="mt-3 animate-in slide-in-from-top-2 duration-200 sm:mt-5">
                  <div className="flex items-start gap-1.5 rounded-lg border border-muted bg-muted/50 px-2.5 py-2.5 text-left text-xs text-muted-foreground sm:gap-2 sm:px-4 sm:py-3 sm:text-sm">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 sm:h-4 sm:w-4" />
                    <span>
                      Zone non reconnue —{" "}
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                        className="font-medium text-primary hover:underline"
                      >
                        contactez-nous
                      </a>
                      .
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
});

// =============================================================================
// DEPARTMENT LIST
// =============================================================================

interface DepartmentListProps {
  depts: Department[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
}

const DepartmentList = memo(function DepartmentList({
  depts,
  selectedCode,
  onSelect,
}: DepartmentListProps) {
  return (
    <div className="space-y-2" role="listbox" aria-label="Départements">
      {depts.map((dept) => {
        const isSelected = selectedCode === dept.code;
        return (
          <button
            key={dept.code}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(dept.code)}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-all duration-150 min-h-15",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isSelected
                ? "border-primary bg-primary/5 shadow"
                : "border-border bg-white hover:border-primary/30",
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-bold transition-colors",
                isSelected
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary",
              )}
            >
              {dept.code}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-foreground text-sm sm:text-base">{dept.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {dept.mainCities.slice(0, 3).join(", ")}
              </div>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                isSelected && "rotate-90 text-primary",
              )}
            />
          </button>
        );
      })}
    </div>
  );
});

// =============================================================================
// DEPARTMENT DETAILS PANEL
// =============================================================================

interface DepartmentDetailsPanelProps {
  dept: Department;
  servicesAnchorId: string;
}

const DepartmentDetailsPanel = memo(function DepartmentDetailsPanel({
  dept,
  servicesAnchorId,
}: DepartmentDetailsPanelProps) {
  return (
    <div className="rounded-xl border-2 border-primary/20 bg-linear-to-br from-primary-50/60 to-white p-4 sm:p-5 animate-in fade-in slide-in-from-right-3 duration-200">
      <h3 className={cn(designTokens.typography.h3, "text-base text-foreground sm:text-lg")}>
        Débarras dans le {dept.name}
      </h3>

      <ul className="mt-3 sm:mt-4 space-y-2">
        {DEPT_BULLETS.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Icon className="h-4 w-4 text-primary shrink-0" />
            {text}
          </li>
        ))}
      </ul>

      <div className="mt-4 sm:mt-5 flex flex-col gap-2">
        <Button asChild className={cn("w-full min-h-11", designTokens.button.primary)}>
          <Link href={`/devis?postalCode=${dept.code}000`}>
            <FileText className="mr-2 h-4 w-4" />
            Demander un devis
          </Link>
        </Button>
        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center justify-center gap-2 min-h-11 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <Phone className="h-4 w-4" />
          Appeler
        </a>
      </div>

      <a
        href={`#${servicesAnchorId}`}
        className="mt-4 inline-flex items-center gap-1 text-xs text-primary hover:underline min-h-8"
      >
        <ArrowDown className="h-3 w-3" />
        Voir nos services
      </a>
    </div>
  );
});

// =============================================================================
// ZONE SELECTOR (kept for future use, currently disabled)
// =============================================================================

interface ZoneSelectorProps {
  activeCluster: DepartmentCluster;
  setActiveCluster: (c: DepartmentCluster) => void;
  selectedDept: string | null;
  setSelectedDept: (code: string | null) => void;
  servicesAnchorId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ZoneSelector = memo(function ZoneSelector({
  activeCluster,
  setActiveCluster,
  selectedDept,
  setSelectedDept,
  servicesAnchorId,
}: ZoneSelectorProps) {
  const clusterDepts = useMemo(
    () => getDepartmentsByCluster(activeCluster),
    [activeCluster],
  );
  const selectedDeptData = useMemo(
    () =>
      selectedDept ? departments.find((d) => d.code === selectedDept) : null,
    [selectedDept],
  );

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveCluster(value as DepartmentCluster);
      setSelectedDept(null);
    },
    [setActiveCluster, setSelectedDept],
  );

  const handleDeptSelect = useCallback(
    (code: string) => {
      setSelectedDept(selectedDept === code ? null : code);
    },
    [selectedDept, setSelectedDept],
  );

  return (
    <Section className="bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-2">
          <h2 className={cn(designTokens.typography.h2, "text-2xl sm:text-3xl")}>
            Choisir votre zone
          </h2>
        </div>
        <p className="mx-auto max-w-xl text-center text-sm text-muted-foreground mb-6">
          Toutes les communes des départements listés sont couvertes.
          Intervention typique 24 à 48 h.
        </p>

        {/* Tabs */}
        <Tabs
          value={activeCluster}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent p-0 mb-6">
            {CLUSTER_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "flex-1 min-w-30 rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all",
                  "data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary",
                  "data-[state=inactive]:border-border data-[state=inactive]:bg-white",
                  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
              >
                <span className="block">{tab.label}</span>
                <span className="block text-xs opacity-70 mt-0.5">
                  {tab.depts}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-5">
          <DepartmentList
            depts={clusterDepts}
            selectedCode={selectedDept}
            onSelect={handleDeptSelect}
          />

          <div className="lg:sticky lg:top-20 self-start">
            {selectedDeptData ? (
              <DepartmentDetailsPanel
                dept={selectedDeptData}
                servicesAnchorId={servicesAnchorId}
              />
            ) : (
              <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary-50/30 p-8 text-center">
                <MapPin className="mx-auto h-9 w-9 text-primary/40" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Sélectionnez un département pour voir les détails
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
});

// =============================================================================
// LAZY MAP SECTION (CLS-safe)
// =============================================================================

interface MapSectionLazyProps {
  selectedDept: string | null;
  onDeptClick: (code: string) => void;
}

const MapSectionLazy = memo(function MapSectionLazy({
  selectedDept,
  onDeptClick,
}: MapSectionLazyProps) {
  const [showMap, setShowMap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Optional: load via IntersectionObserver when visible
  useEffect(() => {
    if (showMap) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          io.disconnect();
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [showMap]);

  return (
    <Section className="bg-background">
      <div className="mx-auto max-w-6xl text-center mb-4 sm:mb-6 lg:mb-8">
        <h2 className={cn(designTokens.typography.h2, "text-xl sm:text-2xl lg:text-3xl")}>
          Carte interactive
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Visualisez nos zones de couverture en Île-de-France
        </p>
      </div>

      {/* Fixed-height container prevents CLS + z-index containment - LARGER HEIGHTS */}
      <div
        ref={containerRef}
        className="relative z-0 mx-auto w-full max-w-6xl h-80 sm:h-95 md:h-115 lg:h-130 rounded-xl sm:rounded-2xl border border-border/50 overflow-hidden bg-slate-100 shadow-lg sm:shadow-xl">
        {!showMap ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-linear-to-br from-slate-50 to-slate-100 sm:gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-inner sm:h-20 sm:w-20">
              <Map className="h-8 w-8 text-primary/60 sm:h-10 sm:w-10" />
            </div>
            <div className="text-center px-4">
              <p className="text-sm font-medium text-foreground sm:text-base">Carte de nos zones</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">8 départements couverts</p>
            </div>
            <Button
              size="lg"
              className="min-h-11 gap-2 shadow-md"
              onClick={() => setShowMap(true)}
            >
              <Map className="h-4 w-4 sm:h-5 sm:w-5" />
              Afficher la carte
            </Button>
          </div>
        ) : (
          <div className="h-full w-full">
            <IleDeFranceMap
              view="idf"
              hoveredZone={null}
              selectedDept={selectedDept}
              onZoneHover={() => {}}
              onZoneClick={onDeptClick}
            />
          </div>
        )}
      </div>

      {/* <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
        Carte ©{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          OpenStreetMap
        </a>
      </p> */}
    </Section>
  );
});

// =============================================================================
// SERVICES TEASER
// =============================================================================

const ServicesTeaser = memo(function ServicesTeaser({ id }: { id: string }) {
  return (
    <Section className="bg-slate-50/80">
      <div id={id} className="mx-auto max-w-5xl scroll-mt-24">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className={cn(designTokens.typography.h2, "text-xl sm:text-2xl lg:text-3xl")}>
            Que souhaitez-vous débarrasser ?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Nos services les plus demandés en Île-de-France
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {FEATURED_SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group flex flex-col items-center rounded-xl border-2 border-border bg-white p-3 sm:p-4 text-center transition-all hover:border-primary/30 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-25 sm:min-h-30"
              >
                <div className="mb-2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary transition-colors shrink-0">
                  <Icon className="h-5 w-5 text-primary group-hover:text-white" />
                </div>
                <span className="font-semibold text-foreground text-xs sm:text-sm leading-tight">
                  {svc.title}
                </span>
                <span className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground leading-tight line-clamp-2">
                  {svc.benefit}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 sm:mt-6 text-center">
          <Button asChild variant="outline" className={cn(designTokens.button.secondary, "min-h-11 h-11 w-full sm:w-auto")} size="lg">
            <Link href="/services">
              Voir tous nos services
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
});

// =============================================================================
// FAQ TEASER
// =============================================================================

const FAQTeaser = memo(function FAQTeaser() {
  const topFaqs = useMemo(() => zonesFaqs.slice(0, 5), []);

  return (
    <Section className="bg-background">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className={cn(designTokens.typography.h2, "text-xl sm:text-2xl lg:text-3xl")}>
            Questions fréquentes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Tout savoir sur nos interventions en Île-de-France
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {topFaqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm sm:text-base min-h-11 py-3 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Lightweight conversion nudge */}
        <div className="mt-5 sm:mt-6 rounded-xl border border-primary/20 bg-primary-50/40 p-4 sm:p-5 text-center">
          <p className="text-sm text-muted-foreground sm:text-base">
            Vous avez un doute sur votre zone ? Demandez un devis — réponse
            rapide.
          </p>
          <Button
            asChild
            size="lg"
            className={cn("mt-3 min-h-11 w-full sm:w-auto", designTokens.button.primary)}
          >
            <Link href="/devis">Demander un devis</Link>
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Button asChild variant="link" size="sm" className="min-h-11 text-sm sm:text-base">
            <Link href="/faq">
              Voir toutes les questions
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
});

// =============================================================================
// BOTTOM CTA
// =============================================================================

const BottomCTA = memo(function BottomCTA() {
  return (
    <Section className="bg-slate-50/60">
      <div className="mx-auto max-w-4xl px-3 sm:px-6">
        <Card className="relative overflow-hidden border-0 bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 shadow-xl sm:shadow-2xl shadow-primary/30 rounded-xl sm:rounded-2xl">
          <div className="absolute -right-16 -top-16 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 sm:h-56 sm:w-56 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <CardContent className="relative p-4 sm:p-6 md:p-10 text-center">
            <h2 className={cn(designTokens.typography.h2, "text-lg text-white sm:text-2xl lg:text-3xl")}>
              Libérez votre espace
            </h2>
            <p className="mt-1.5 text-white/90 text-xs sm:mt-2 sm:text-base max-w-md mx-auto">
              Devis gratuit en 2 min. Réponse sous 24h.
            </p>

            <div className="mt-4 flex flex-col items-center gap-2 sm:mt-6 sm:flex-row sm:justify-center sm:gap-3">
              <Button
                asChild
                size="lg"
                className="min-h-11 h-11 w-full sm:w-auto px-4 text-xs sm:px-7 sm:text-sm bg-white text-primary font-semibold hover:bg-white/90 shadow-lg"
              >
                <Link href="/devis">
                  <Image
                    src="/optimized/icons/special-icon-w40.png"
                    width={40}
                    height={31}
                    alt="Icône plus de 500 interventions"
                    className="mr-1.5 h-4 w-auto sm:mr-2 sm:h-5"
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

            {/* Reassurance microcopy */}
            <p className="mt-3 text-[10px] text-white/70 sm:mt-4 sm:text-sm">
              ✓ Sans engagement · ✓ Gratuit · ✓ Réponse rapide
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
});

// =============================================================================
// STICKY MOBILE CTA BAR
// =============================================================================

const StickyMobileCTA = memo(function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-white/95 backdrop-blur-md shadow-2xl shadow-black/10">
      <div className="mx-auto max-w-lg px-4 py-2.5">
        <div className="grid grid-cols-5 gap-2">
          <Button
            variant="outline"
            size="lg"
            className="col-span-2 h-12 text-sm font-semibold"
            asChild
          >
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
              <Phone className="mr-1.5 h-4 w-4" />
              Appeler
            </a>
          </Button>
          <Button
            size="lg"
            className={cn(
              "col-span-3 h-12 text-sm font-semibold",
              designTokens.button.primary,
            )}
            asChild
          >
            <Link href="/devis">
              <FileText className="mr-1.5 h-4 w-4" />
              Devis gratuit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
});

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function ZonesPageClient() {
  const [postalCode, setPostalCode] = useState("");
  const [eligibility, setEligibility] = useState<"covered" | "unknown" | null>(
    null,
  );
  const [coveredDeptCode, setCoveredDeptCode] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  // Zone selector state (kept for future use)
  // const [activeCluster, setActiveCluster] = useState<DepartmentCluster>("paris");

  const SERVICES_ANCHOR_ID = "services";

  const checkPostalCode = useCallback(() => {
    if (postalCode.length < 5) return;
    const covered = isPostalCodeCovered(postalCode);
    if (covered) {
      const dept = getDepartmentFromPostalCode(postalCode);
      setEligibility("covered");
      setCoveredDeptCode(dept?.code ?? postalCode.slice(0, 2));
      if (dept) {
        setSelectedDept(dept.code);
        // setActiveCluster(dept.cluster);
      }
    } else {
      setEligibility("unknown");
      setCoveredDeptCode(null);
    }
  }, [postalCode]);

  const handleSetPostalCode = useCallback((v: string) => {
    setPostalCode(v);
    if (v.length < 5) {
      setEligibility(null);
      setCoveredDeptCode(null);
    }
  }, []);

  const handleMapDeptClick = useCallback((code: string) => {
    const dept = departments.find((d) => d.code === code);
    if (dept) {
      setSelectedDept(code);
      // setActiveCluster(dept.cluster);
    }
  }, []);

  return (
    <>
      <JsonLd
        type="breadcrumb"
        data={{
          items: [
            { label: "Accueil", href: "/" },
            { label: "Zones d'intervention" },
          ],
        }}
      />

      {/* Main content with bottom padding for sticky bar */}
      <div className="bg-background min-h-screen pb-20 md:pb-0">
        <HeroSection />

        <PostalCheckerSection
          postalCode={postalCode}
          setPostalCode={handleSetPostalCode}
          eligibility={eligibility}
          coveredDeptCode={coveredDeptCode}
          onCheck={checkPostalCode}
        />

        {/* <ZoneSelector
          activeCluster={activeCluster}
          setActiveCluster={setActiveCluster}
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          servicesAnchorId={SERVICES_ANCHOR_ID}
        /> */}

        <MapSectionLazy
          selectedDept={selectedDept}
          onDeptClick={handleMapDeptClick}
        />

        <ServicesTeaser id={SERVICES_ANCHOR_ID} />

        <FAQTeaser />

        <BottomCTA />

        <StickyMobileCTA />
      </div>
    </>
  );
}
