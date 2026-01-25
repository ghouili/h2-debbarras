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
      {/* Spacer to prevent content overlap - responsive height */}
      <div className="h-16 sm:h-20 md:hidden" />

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-white/95 backdrop-blur-md shadow-2xl shadow-black/10 safe-area-bottom">
        <PageContainer className="px-3 py-2 sm:p-3">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full min-h-[44px] h-10 sm:h-12 text-[11px] sm:text-sm font-semibold px-2 sm:px-4 whitespace-nowrap",
                designTokens.button.secondary
              )}
              asChild
              onClick={() => trackClickCall()}
            >
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                <Phone className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">Appeler</span>
              </a>
            </Button>
            <Button
              size="lg"
              className={cn(
                "w-full min-h-[44px] h-10 sm:h-12 text-[11px] sm:text-sm font-semibold px-2 sm:px-4 whitespace-nowrap",
                designTokens.button.primary
              )}
              asChild
              onClick={() => trackStartDevis()}
            >
              <Link href="/devis">
                <FileText className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">Devis gratuit</span>
              </Link>
            </Button>
          </div>
        </PageContainer>
      </div>
    </>
  )
}
