"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu } from "lucide-react";
import { useState, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/config";
import { trackClickCall, trackStartDevis } from "@/lib/analytics";
import { designTokens } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { PageContainer } from "./page-container";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleClose = useCallback(() => setOpen(false), []);

  const navigation = useMemo(
    () => [
      { name: "Services", href: "/services" },
      { name: "Zones", href: "/zones" },
      { name: "Avis", href: "/avis" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
    ],
    []
  );

  const telHref = useMemo(
    () => `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
    []
  );

  const isActive = useCallback(
    (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href + "/")),
    [pathname]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur-md shadow-sm">
      <PageContainer className="flex h-16 md:h-20 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-100 opacity-90"
          aria-label={`${siteConfig.name} - Accueil`}
        >
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} - Accueil`}
            width={160}
            height={40}
            className="h-9 md:h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-6 lg:gap-8 min-w-0"
          aria-label="Navigation principale"
        >
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  active ? "text-primary" : "text-foreground/80 hover:text-primary",
                  "after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:bg-primary after:transition-all",
                  active ? "after:w-full" : "after:w-0 hover:after:w-full"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="outline"
            size="default"
            className={cn(designTokens.button.secondary, "h-11")}
            asChild
            onClick={() => trackClickCall()}
          >
            <a href={telHref}>
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Appeler le </span>
              {siteConfig.contact.phone}
            </a>
          </Button>

          <Button
            size="default"
            className={cn(designTokens.button.primary, "h-11")}
            asChild
            onClick={() => trackStartDevis()}
          >
            <Link href="/devis">Devis gratuit</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-xl"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6 text-primary" aria-hidden="true" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className={cn(
              "h-dvh w-[92vw] max-w-[380px] p-0",
              "bg-background"
            )}
          >
            <div className="flex h-full flex-col">
              {/* Top bar */}
              <div className="px-5 pt-5 pb-4 border-b border-border/60">
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href="/"
                    onClick={handleClose}
                    className="inline-flex items-center"
                    aria-label="Retour à l'accueil"
                  >
                    <Image
                      src="/logo.png"
                      alt={siteConfig.name}
                      width={160}
                      height={40}
                      className="h-9 w-auto"
                      priority={false}
                    />
                  </Link>

                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-xl"
                    onClick={handleClose}
                    aria-label="Fermer le menu"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Button> */}
                </div>

                  {/* <p className="mt-3 text-sm text-muted-foreground">
                    Navigation rapide — devis gratuit en 2 minutes.
                  </p> */}
              </div>

              {/* Navigation (scrollable) */}
              <nav
                className="flex-1 overflow-y-auto px-3 py-4"
                aria-label="Navigation mobile"
              >
                <div className="flex flex-col gap-1">
                  {navigation.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center rounded-xl px-3 h-11",
                          "text-[15px] font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted/60 hover:text-primary",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        )}
                      >
                        <span className="flex-1">{item.name}</span>
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full",
                            active ? "bg-primary" : "bg-transparent"
                          )}
                          aria-hidden="true"
                        />
                      </Link>
                    );
                  })}
                </div>

                {/* Helper card */}
                {/* <div className="mt-5 rounded-2xl border border-border/60 bg-muted/30 p-4">
                  <p className="text-sm font-semibold">Besoin d’une réponse rapide ?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Intervention sous 24 à 48 h en Île-de-France.
                  </p>
                </div> */}
              </nav>

              {/* Sticky CTAs (safe-area aware) */}
              <div
                className={cn(
                  "border-t border-border bg-background/95 backdrop-blur",
                  "px-5 pt-4",
                  "pb-[max(1.25rem,env(safe-area-inset-bottom))]"
                )}
              >
                <div className="flex flex-col gap-2.5">
                  <Button
                    className={cn(
                      designTokens.button.primary,
                      "w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                    )}
                    asChild
                    onClick={() => {
                      trackStartDevis();
                      handleClose();
                    }}
                  >
                    <Link href="/devis">Demander un devis gratuit</Link>
                  </Button>

                  <Button
                    variant="outline"
                    className={cn(
                      designTokens.button.secondary,
                      "w-full h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                    )}
                    asChild
                    onClick={() => {
                      trackClickCall();
                      handleClose();
                    }}
                  >
                    <a href={telHref}>
                      <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                       {siteConfig.contact.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageContainer>
    </header>
  );
}
