"use client"

import Link from "next/link"
import { Phone, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import { trackClickCall, trackStartDevis } from "@/lib/analytics"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import { PageContainer } from "./page-container"

export function MobileBar() {
  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className="h-20 md:hidden" />

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-white/95 backdrop-blur-md shadow-2xl shadow-black/10">
        <PageContainer className="p-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              className={cn("w-full h-14 text-base font-semibold", designTokens.button.secondary)}
              asChild
              onClick={() => trackClickCall()}
            >
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                <Phone className="mr-2 h-5 w-5" />
                Appeler
              </a>
            </Button>
            <Button
              size="lg"
              className={cn("w-full h-14 text-base font-semibold", designTokens.button.primary)}
              asChild
              onClick={() => trackStartDevis()}
            >
              <Link href="/devis">
                <FileText className="mr-2 h-5 w-5" />
                Devis gratuit
              </Link>
            </Button>
          </div>
        </PageContainer>
      </div>
    </>
  )
}
