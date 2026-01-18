import { siteConfig } from "@/lib/config"

type JsonLdProps = {
  type: "organization" | "service" | "breadcrumb" | "faq"
  data?: any
}

export function JsonLd({ type, data }: JsonLdProps) {
  let jsonLd: any = {}

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

    case "service":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: data?.title || "Débarras de maison",
        provider: {
          "@type": "LocalBusiness",
          name: siteConfig.name,
        },
        areaServed: {
          "@type": "State",
          name: "Île-de-France",
        },
        description: data?.description,
      }
      break

    case "breadcrumb":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data?.items?.map((item: any, index: number) => ({
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
        mainEntity: data?.questions?.map((q: any) => ({
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
