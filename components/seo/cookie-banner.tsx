"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
    // Initialize analytics here if needed
    console.log("[v0] Cookie consent accepted")
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
      <Card className="border-primary/20 shadow-lg">
        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="font-semibold">Cookies et confidentialité</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={rejectCookies}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="mb-4 text-pretty text-sm text-muted-foreground">
            Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. En continuant, vous
            acceptez notre utilisation des cookies.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="sm" onClick={acceptCookies} className="flex-1">
              Accepter
            </Button>
            <Button variant="outline" size="sm" onClick={rejectCookies} className="flex-1 bg-transparent">
              Refuser
            </Button>
          </div>
          <Link
            href="/politique-confidentialite"
            className="mt-3 block text-center text-xs text-muted-foreground underline"
          >
            En savoir plus
          </Link>
        </div>
      </Card>
    </div>
  )
}
