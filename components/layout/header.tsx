"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import { trackClickCall, trackStartDevis } from "@/lib/analytics"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import { PageContainer } from "./page-container"

export function Header() {
  const [open, setOpen] = useState(false)

  const navigation = [
    { name: "Services", href: "/services" },
    { name: "Zones", href: "/zones" },
    // { name: "Tarifs", href: "/tarifs" },
    { name: "Avis", href: "/avis" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur-md shadow-sm">
      <PageContainer className="flex h-16 md:h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-100 opacity-80">
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={160}
            height={40}
            className="h-10 md:h-12 w-auto"
            priority
          />
          {/* <span>LOGO</span> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex min-w-0">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            size="default"
            className={cn(designTokens.button.secondary, "h-11")}
            asChild
            onClick={() => trackClickCall()}
          >
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
              <Phone className="mr-2 h-4 w-4" />
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
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" onClick={() => setOpen(false)}>
                <Image src="/logo.svg" alt={siteConfig.name} width={140} height={35} className="h-10 w-auto" />
              </Link>
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary py-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile sheet CTAs */}
              <div className="flex flex-col gap-3 pt-6 border-t border-border">
                <Button
                  size="lg"
                  className={cn(designTokens.button.primary, "w-full")}
                  asChild
                  onClick={() => {
                    trackStartDevis()
                    setOpen(false)
                  }}
                >
                  <Link href="/devis">Devis gratuit</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(designTokens.button.secondary, "w-full")}
                  asChild
                  onClick={() => {
                    trackClickCall()
                    setOpen(false)
                  }}
                >
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageContainer>
    </header>
  )
}
