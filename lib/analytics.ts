// Analytics and tracking utilities for Google Ads conversion tracking

type GtagEventParams = Record<string, unknown>
type Gtag = (...args: unknown[]) => void

const getGtag = (): Gtag | undefined => {
  if (typeof window === "undefined") return undefined
  return (window as Window & { gtag?: Gtag }).gtag
}

export const trackEvent = (eventName: string, eventParams?: GtagEventParams) => {
  const gtag = getGtag()
  if (gtag) {
    gtag("event", eventName, eventParams)
  }
  // For development: log to console
  console.log("[v0] Analytics Event:", eventName, eventParams)
}

export const trackPageView = (url: string) => {
  const gtag = getGtag()
  if (gtag) {
    gtag("config", "GA_MEASUREMENT_ID", {
      page_path: url,
    })
  }
}

// Conversion tracking events
export const trackStartDevis = () => {
  trackEvent("start_devis", {
    event_category: "conversion",
    event_label: "Quote Funnel Started",
  })
}

export const trackLeadSubmit = () => {
  trackEvent("lead_submit", {
    event_category: "conversion",
    event_label: "Quote Form Submitted",
    value: 1,
  })
}

export const trackGoogleAdsLeadConversion = (sendTo: string) => {
  if (typeof window === "undefined") return
  const gtag = (window as Window & { gtag?: Gtag }).gtag
  if (typeof gtag !== "function") return

  gtag("event", "conversion", {
    send_to: sendTo,
    value: 1.0,
    currency: "EUR",
  })
}

export const trackClickCall = () => {
  trackEvent("click_call", {
    event_category: "engagement",
    event_label: "Phone Number Clicked",
  })
  const gtag = getGtag()
  if (gtag) {
    gtag("event", "phone_call_click", {
      event_category: "engagement",
      event_label: "Phone Click",
    })
  }
}

export const trackServiceView = (serviceName: string) => {
  trackEvent("view_service", {
    event_category: "engagement",
    event_label: serviceName,
  })
}

export const trackQuoteStep = (step: number, stepName: string) => {
  trackEvent("quote_step", {
    event_category: "funnel",
    event_label: `Step ${step}: ${stepName}`,
    step_number: step,
  })
}
