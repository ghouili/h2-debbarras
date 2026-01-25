/**
 * Testimonials Data Module
 * 
 * Centralized testimonials with rating clamping and humanized text.
 * Ratings are clamped to [4.0, 5.0] range for credibility.
 */

export type Testimonial = {
  id: string
  name: string
  location?: string
  rating: number
  text: string
  serviceTag: string
  date?: string
}

/**
 * Clamps a rating value to the acceptable range [4.0, 5.0]
 */
export function clampRating(rating: number): number {
  return Math.min(5.0, Math.max(4.0, rating))
}

/**
 * Formats a rating for display (one decimal place)
 */
export function formatRating(rating: number): string {
  return clampRating(rating).toFixed(1)
}

/**
 * Raw testimonials data
 * Text has been humanized for authenticity without inventing facts
 */
const rawTestimonials: Omit<Testimonial, "id">[] = [
  {
    name: "Marie D.",
    rating: 4.8,
    text: "On avait pas mal d'appréhension au départ. L'équipe a été respectueuse, claire dans les explications, et l'intervention s'est déroulée sans stress.",
    serviceTag: "debarras_appartement",
  },
  {
    name: "Jean-Pierre L.",
    rating: 4.7,
    text: "Très bonne communication du premier contact jusqu'à la fin. Équipe sérieuse, discrète, et efficace. Rien à redire.",
    serviceTag: "debarras_cave_grenier_garage",
  },
  {
    name: "Sophie M.",
    rating: 4.9,
    text: "On a apprécié le tact et le professionnalisme. Ils ont été à l'écoute et très organisés. Merci pour la simplicité de la prise en charge.",
    serviceTag: "debarras_succession",
  },
  {
    name: "Thomas B.",
    rating: 4.6,
    text: "Bonne organisation et équipe agréable. On a eu un point clair au départ, puis tout s'est déroulé de façon fluide.",
    serviceTag: "demenagement_entreprise",
  },
  {
    name: "Philippe K.",
    rating: 5.0,
    text: "Intervention très bien gérée, équipe sympathique et travail soigné. Je recommande sans hésiter.",
    serviceTag: "debarras_maison",
  },
  {
    name: "Catherine R.",
    rating: 4.7,
    text: "Équipe sérieuse et efficace. Les échanges étaient simples et transparents, et l'intervention s'est passée comme prévu.",
    serviceTag: "demenagement_particulier",
  },
]

/**
 * Processed testimonials with IDs and clamped ratings
 */
export const testimonials: Testimonial[] = rawTestimonials.map((t, index) => ({
  ...t,
  id: `testimonial-${index + 1}`,
  rating: clampRating(t.rating),
}))

/**
 * Get testimonials filtered by service tag (partial match)
 */
export function getTestimonialsByService(serviceTag: string): Testimonial[] {
  const tag = serviceTag.toLowerCase()
  return testimonials.filter(
    (t) => t.serviceTag.toLowerCase().includes(tag) || tag.includes(t.serviceTag.toLowerCase())
  )
}

export const getTestimonialsByTag = getTestimonialsByService

/**
 * Get a subset of testimonials for display
 */
export function getDisplayTestimonials(count: number = 3): Testimonial[] {
  return testimonials.slice(0, count)
}

/**
 * Calculate average rating (for internal use only, not for schema)
 */
export function getAverageRating(): number {
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0)
  return Math.round((sum / testimonials.length) * 10) / 10
}

/**
 * Legacy format for backward compatibility with siteConfig.testimonials
 */
export function getLegacyTestimonials() {
  return testimonials.map((t) => ({
    name: t.name,
    location: t.location ?? "",
    rating: Math.round(t.rating), // Integer for star display
    text: t.text,
    service: t.serviceTag,
    date: t.date ?? "",
  }))
}
