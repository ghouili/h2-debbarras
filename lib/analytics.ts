// Analytics and tracking utilities for Google Ads conversion tracking

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", eventName, eventParams)
  }
  // For development: log to console
  console.log("[v0] Analytics Event:", eventName, eventParams)
}

export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("config", "GA_MEASUREMENT_ID", {
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
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "conversion", {
      send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // Replace with actual conversion ID
      value: 1.0,
      currency: "EUR",
    })
  }
}

export const trackClickCall = () => {
  trackEvent("click_call", {
    event_category: "engagement",
    event_label: "Phone Number Clicked",
  })
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", "phone_call_click", {
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
