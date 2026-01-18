import { Metadata } from "next"
import { notFound } from "next/navigation"
import { siteConfig } from "@/lib/config"
import { ServiceLandingPage, ServiceLandingProps } from "@/components/service-landing-page"

// Define the service type for type safety
type Service = {
  id: string
  title: string
  slug: string
  icon: string
  description: string
  shortDescription: string
  features: readonly string[]
}

type ServiceInfo = {
  service: Service
  category: "debarras" | "demenagement" | "nettoyage"
  clientType: "particulier" | "professionnel"
}

// Helper function to get all services with their metadata
function getAllServices(): ServiceInfo[] {
  const allServices: ServiceInfo[] = []
  
  // Particulier services
  const particulier = siteConfig.services.particulier
  
  // Particulier Debarras
  for (const service of particulier.debarras) {
    allServices.push({
      service,
      category: "debarras",
      clientType: "particulier",
    })
  }
  
  // Particulier Demenagement  
  for (const service of particulier.demenagement) {
    allServices.push({
      service,
      category: "demenagement",
      clientType: "particulier",
    })
  }
  
  // Professionnel services
  const professionnel = siteConfig.services.professionnel
  
  // Professionnel Debarras
  for (const service of professionnel.debarras) {
    allServices.push({
      service,
      category: "debarras",
      clientType: "professionnel",
    })
  }
  
  // Professionnel Demenagement
  for (const service of professionnel.demenagement) {
    allServices.push({
      service,
      category: "demenagement",
      clientType: "professionnel",
    })
  }
  
  // Professionnel Nettoyage
  for (const service of professionnel.nettoyage) {
    allServices.push({
      service,
      category: "nettoyage",
      clientType: "professionnel",
    })
  }
  
  return allServices
}

// Find a specific service by slug
function findServiceBySlug(slug: string): ServiceInfo | undefined {
  return getAllServices().find(s => s.service.slug === slug)
}

// Get related services (same category, different service)
function getRelatedServices(currentSlug: string, category: string): Array<{
  title: string
  slug: string
  shortDescription: string
}> {
  return getAllServices()
    .filter(s => s.category === category && s.service.slug !== currentSlug)
    .slice(0, 3)
    .map(s => ({
      title: s.service.title,
      slug: s.service.slug,
      shortDescription: s.service.shortDescription,
    }))
}

// Generate static params for all services
export async function generateStaticParams() {
  return getAllServices().map((serviceInfo) => ({
    slug: serviceInfo.service.slug,
  }))
}

// Generate metadata for each service page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const serviceInfo = findServiceBySlug(slug)
  
  if (!serviceInfo) {
    return {
      title: "Service non trouvé",
    }
  }
  
  const { service, category, clientType } = serviceInfo
  
  const categoryLabels = {
    debarras: "Débarras",
    demenagement: "Déménagement",
    nettoyage: "Nettoyage",
  }
  
  const clientLabels = {
    particulier: "Particuliers",
    professionnel: "Professionnels",
  }
  
  return {
    title: `${service.title} | ${categoryLabels[category]} ${clientLabels[clientType]} | ${siteConfig.name}`,
    description: service.description,
    keywords: [
      service.title.toLowerCase(),
      categoryLabels[category].toLowerCase(),
      "île-de-france",
      "paris",
      "devis gratuit",
      ...service.features.map(f => f.toLowerCase()),
    ],
    openGraph: {
      title: `${service.title} - ${siteConfig.name}`,
      description: service.description,
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.shortDescription,
    },
  }
}

// Page component
export default async function ServicePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const serviceInfo = findServiceBySlug(slug)
  
  if (!serviceInfo) {
    notFound()
  }
  
  const { service, category, clientType } = serviceInfo
  const relatedServices = getRelatedServices(slug, category)
  
  return (
    <ServiceLandingPage
      service={service}
      category={category}
      clientType={clientType}
      relatedServices={relatedServices}
    />
  )
}
