"use client"

import { useEffect, useRef } from "react"
import { trackGoogleAdsLeadConversion } from "@/lib/analytics"

type Props = {
  form: "contact" | "devis"
}

export function GoogleAdsLeadConversion({ form }: Props) {
  const hasFiredRef = useRef(false)

  useEffect(() => {
    if (hasFiredRef.current) return
    hasFiredRef.current = true

    trackGoogleAdsLeadConversion()
    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer
    dataLayer?.push({ event: "lead_form_submit", form })

    if (process.env.NODE_ENV === "development") {
      console.info(`Google Ads conversion fired: ${form}`)
    }
  }, [form])

  return null
}
