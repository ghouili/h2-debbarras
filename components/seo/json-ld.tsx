import { siteConfig } from "@/lib/config"

type JsonLdProps = {
  type: "organization" | "service" | "breadcrumb" | "faq"
  data?: JsonLdData
}

export function JsonLd({ type, data }: JsonLdProps) {
  let jsonLd: Record<string, unknown> = {}

  const getBreadcrumbItems = (value?: JsonLdData): BreadcrumbItem[] =>
    value && "items" in value && Array.isArray(value.items) ? value.items : []

  const getFaqQuestions = (value?: JsonLdData): FaqQuestion[] =>
    value && "questions" in value && Array.isArray(value.questions)
      ? value.questions
      : []

  const getServiceData = (value?: JsonLdData): ServiceData =>
    value && "title" in value ? value : {}

  switch (type) {
    case "organization":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 48.8566,
          longitude: 2.3522,
        },
        areaServed: siteConfig.zones.departements.map((dept) => ({
          "@type": "State",
          name: dept.name,
        })),
        priceRange: "€€",
        openingHours: ["Mo-Fr 08:00-19:00", "Sa 09:00-18:00"],
      }
      break

    case "service": {
      const serviceData = getServiceData(data)
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: serviceData.title || "Débarras de maison",
        name: serviceData.title,
        provider: {
          "@type": "LocalBusiness",
          name: siteConfig.name,
          url: siteConfig.url,
          telephone: siteConfig.contact.phone,
        },
        areaServed: {
          "@type": "State",
          name: "Île-de-France",
        },
        description: serviceData.description,
        url: serviceData.url,
        mainEntityOfPage: serviceData.url,
      }
      break
    }

    case "breadcrumb":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: getBreadcrumbItems(data).map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: item.href ? `${siteConfig.url}${item.href}` : undefined,
        })),
      }
      break

    case "faq":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: getFaqQuestions(data).map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.a,
          },
        })),
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      suppressHydrationWarning
    />
  )
}

type ServiceData = {
  title?: string
  description?: string
  url?: string
}

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbData = {
  items?: BreadcrumbItem[]
}

type FaqQuestion = {
  q: string
  a: string
}

type FaqData = {
  questions?: FaqQuestion[]
}

type JsonLdData = ServiceData | BreadcrumbData | FaqData
