/**
 * Campaign Map for Google Ads Automation
 * 
 * This file provides a structured mapping of services to campaign groups
 * for efficient Google Ads campaign management and automation.
 */

import { siteConfig } from "./config"

type ServiceEntry = {
  slug: string
  campaignKey: string
  campaignGroup?: string
  intentKeywords?: readonly string[]
  negativeKeywords?: readonly string[]
}

export type CampaignGroup = {
  campaignKey: string
  slugs: string[]
  clientType: "particulier" | "professionnel"
  category: "debarras" | "demenagement"
  group: string
  intentKeywords: string[]
  negativeKeywords: string[]
}

export type CampaignMap = Record<string, CampaignGroup>

/**
 * Generates the campaign map from siteConfig services
 */
function buildCampaignMap(): CampaignMap {
  const map: CampaignMap = {}

  const processServices = (
    services: readonly ServiceEntry[],
    clientType: "particulier" | "professionnel",
    category: "debarras" | "demenagement"
  ) => {
    for (const service of services) {
      const key = service.campaignKey
      
      if (!map[key]) {
        map[key] = {
          campaignKey: key,
          slugs: [],
          clientType,
          category,
          group: service.campaignGroup || key,
          intentKeywords: [...(service.intentKeywords ?? [])],
          negativeKeywords: [...(service.negativeKeywords ?? [])],
        }
      }
      
      map[key].slugs.push(service.slug)
      
      // Merge keywords if service has additional ones
      if (service.intentKeywords) {
        for (const kw of service.intentKeywords) {
          if (!map[key].intentKeywords.includes(kw)) {
            map[key].intentKeywords.push(kw)
          }
        }
      }
      if (service.negativeKeywords) {
        for (const kw of service.negativeKeywords) {
          if (!map[key].negativeKeywords.includes(kw)) {
            map[key].negativeKeywords.push(kw)
          }
        }
      }
    }
  }

  // Process all services
  processServices(siteConfig.services.particulier.debarras, "particulier", "debarras")
  processServices(siteConfig.services.particulier.demenagement, "particulier", "demenagement")
  processServices(siteConfig.services.professionnel.debarras, "professionnel", "debarras")
  processServices(siteConfig.services.professionnel.demenagement, "professionnel", "demenagement")

  return map
}

/**
 * The main campaign map export
 * Maps campaignKey -> { slugs, clientType, category, group, intentKeywords, negativeKeywords }
 */
export const campaignMap = buildCampaignMap()

/**
 * Get campaign groups organized by category and client type
 */
export function getCampaignsByCategory(
  category: "debarras" | "demenagement",
  clientType?: "particulier" | "professionnel"
): CampaignGroup[] {
  return Object.values(campaignMap).filter(
    (c) => c.category === category && (!clientType || c.clientType === clientType)
  )
}

/**
 * Get all slugs for a campaign group
 */
export function getSlugsByCampaignGroup(campaignGroup: string): string[] {
  return Object.values(campaignMap)
    .filter((c) => c.group === campaignGroup)
    .flatMap((c) => c.slugs)
}

/**
 * Get campaign info for a specific slug
 */
export function getCampaignForSlug(slug: string): CampaignGroup | undefined {
  return Object.values(campaignMap).find((c) => c.slugs.includes(slug))
}

/**
 * Global negative keywords (account-level)
 * Only include clearly irrelevant intent that is never a good lead.
 */
export const globalNegativeKeywords = [
  // Non-service / informational intent
  "mots fléchés",
  "mots fleches",
  "mots croisés",
  "mots croises",
  "définition",
  "definition",
  "synonyme",
  "jeu",
  "solution",
  "réponse",
  "reponse",
]

/**
 * Campaign-level negatives (campaignKey -> negatives)
 * Use this to exclude intent that is not appropriate for a given campaign.
 */
export const campaignNegativeKeywords: Record<string, string[]> = {
  // Déménagement: filter out self-move / rental intent; keep it campaign-level.
  demenagement_particulier: ["location camion", "louer camionnette", "camion à louer", "sans déménageur", "seul", "gratuit"],
  transport_mobilier_objets_lourds: ["location camion", "louer camionnette", "camion à louer", "sans déménageur", "seul", "gratuit"],
  demenagement_regional_national: ["location camion", "louer camionnette", "camion à louer", "sans déménageur", "seul", "gratuit"],
  demenagement_urgent: ["location camion", "louer camionnette", "camion à louer", "sans déménageur", "seul", "gratuit"],
  garde_meuble: ["gratuit"],
  demenagement_entreprise: ["location camion", "louer camionnette", "camion à louer", "sans déménageur", "seul", "gratuit"],

  // Débarras: intentionally NOT adding "gratuit" or "prix m3" globally.
  // This keeps room for "débarras gratuit" / valorisation-style intent.
}

function uniq(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)))
}

export function getCampaignNegativeKeywords(campaignKey: string): string[] {
  return campaignNegativeKeywords[campaignKey] ?? []
}

export function getEffectiveNegativeKeywords(campaignKey: string): string[] {
  const campaign = campaignMap[campaignKey]
  const serviceNegatives = campaign?.negativeKeywords ?? []
  return uniq([...globalNegativeKeywords, ...getCampaignNegativeKeywords(campaignKey), ...serviceNegatives])
}

/**
 * Campaign hierarchy for reporting
 */
export const campaignHierarchy = {
  debarras_particulier: {
    label: "Débarras Particuliers",
    groups: [
      "debarras_maison",
      "debarras_appartement",
      "debarras_cave_grenier_garage",
      "debarras_succession",
      "enlevement_meubles_canapes",
      "enlevement_electromenager",
      "enlevement_encombrants",
      "debarras_ecoresponsable",
    ],
  },
  debarras_professionnel: {
    label: "Débarras Professionnels", 
    groups: ["debarras_bureaux_locaux", "debarras_commerces_entrepots", "evacuation_gravats"],
  },
  demenagement_particulier: {
    label: "Déménagement Particuliers",
    groups: [
      "demenagement_particulier",
      "transport_mobilier_objets_lourds",
      "demenagement_regional_national",
      "demenagement_urgent",
      "garde_meuble",
    ],
  },
  demenagement_professionnel: {
    label: "Déménagement Professionnels",
    groups: ["demenagement_entreprise"],
  },
}
