"use client"

import { useEffect, useRef } from "react"
import { trackGoogleAdsLeadConversion } from "@/lib/analytics"

type Props = {
  form: "contact" | "devis"
  sendTo: string
}

export function GoogleAdsLeadConversion({ form, sendTo }: Props) {
  const hasFiredRef = useRef(false)

  useEffect(() => {
    if (hasFiredRef.current) return
    hasFiredRef.current = true

    trackGoogleAdsLeadConversion(sendTo)
    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer
    dataLayer?.push({ event: "lead_form_submit", form })

    if (process.env.NODE_ENV === "development") {
      console.info(`Google Ads conversion fired: ${form}`)
    }
  }, [form, sendTo])

  return null
}
