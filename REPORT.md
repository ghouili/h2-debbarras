# H2 Débarras Maison — Refactor Services + SEO Report

## 1) Objectives (what we changed)
- Remove all **Nettoyage** (cleaning) services and marketing copy.
- Keep **Débarras** and **Déménagement** as two distinct service families (for Google Ads campaign separation).
- Strengthen SEO foundations on service hub + service detail pages:
  - canonical URLs
  - sitemap/robots alignment
  - internal linking
  - breadcrumbs + structured data (JSON-LD)
- Preserve SEO equity with redirects for removed/renamed routes.

## 2) New Services Taxonomy (source of truth)
All services are now defined in [lib/config.ts](lib/config.ts).

### Particuliers
#### Débarras
| Service (id) | Slug | campaignGroup | campaignKey |
|---|---|---|---|
| debarras-maison | debarras-maison-vide-maison | debarras_maison | debarras_maison |
| debarras-appartement | debarras-appartement-vide-appartement | debarras_appartement | debarras_appartement |
| cave-grenier | debarras-cave-grenier | debarras_stockage | debarras_cave_grenier_garage |
| succession | debarras-succession | debarras_succession | debarras_succession |
| meubles | enlevement-meubles-canapes | enlevement_encombrants | enlevement_meubles_canapes |
| electromenager | enlevement-electromenager | enlevement_encombrants | enlevement_electromenager |
| encombrants | enlevement-encombrants | enlevement_encombrants | enlevement_encombrants |
| ecoresponsable | debarras-ecoresponsable | debarras_valorisation | debarras_ecoresponsable |

#### Déménagement
| Service (id) | Slug | campaignGroup | campaignKey |
|---|---|---|---|
| demenagement-particulier | demenagement-particulier | demenagement_particulier | demenagement_particulier |
| transport-mobilier | transport-mobilier-objets-lourds | devis_prix_demenagement | transport_mobilier_objets_lourds |
| demenagement-regional | demenagement-national-regional | demenagement_particulier | demenagement_regional_national |
| demenagement-express | demenagement-express-urgent | demenagement_urgent | demenagement_urgent |
| garde-meuble | garde-meuble | garde_meuble | garde_meuble |

### Professionnels
#### Débarras
| Service (id) | Slug | campaignGroup | campaignKey |
|---|---|---|---|
| bureaux-locaux | debarras-bureaux-locaux | debarras_bureaux | debarras_bureaux_locaux |
| commerces-entrepots | debarras-commerces-entrepots | debarras_commerces | debarras_commerces_entrepots |
| gravats | evacuation-gravats-dechets-chantier | evacuation_gravats | evacuation_gravats |

#### Déménagement
| Service (id) | Slug | campaignGroup | campaignKey |
|---|---|---|---|
| demenagement-entreprise | demenagement-entreprise | demenagement_entreprise | demenagement_entreprise |

## 3) Nettoyage removal (scope + verification)
- Removed the entire professional cleaning family from the runtime config.
- Removed remaining on-site copy mentions like “nettoyage final” from content pages.
- Kept **legacy URL redirects** for former cleaning slugs so old backlinks don’t 404.

Quick verification commands:
- `npx tsc --noEmit`
- `npm run build`
- (Optional) repo grep: only redirect sources contain `nettoyage-*`.

## 4) URL Changes & Redirects
Redirects are defined in [next.config.mjs](next.config.mjs).

### Service split: “Maison & Appartement”
- Old: `/services/debarras-maison-appartement`
- New canonical: `/services/debarras-maison-vide-maison`

### Removed Nettoyage slugs (redirected to /services)
- `/services/nettoyage-apres-travaux` → `/services`
- `/services/nettoyage-bureaux-commerces` → `/services`
- `/services/nettoyage-syndrome-diogene` → `/services`

## 5) SEO Improvements (implemented)
### Canonical + metadata on service pages
- Service detail pages now set `alternates.canonical` and a cleaner, unique title pattern.
- Related services are constrained by **category + clientType** (prevents cross-family mixing and keeps ads/SEO alignment).

Entry point: [app/services/[slug]/page.tsx](app/services/[slug]/page.tsx)

### Structured data (JSON-LD)
- Global LocalBusiness schema is rendered at layout-level.
- Service pages inject:
  - `BreadcrumbList`
  - `Service` schema with `url` + `mainEntityOfPage` + provider details

Entry points:
- [components/seo/json-ld.tsx](components/seo/json-ld.tsx)
- [app/services/[slug]/page.tsx](app/services/[slug]/page.tsx)

### Internal linking
- Service page template now includes an “Explorer” section:
  - related services (up to 3)
  - links back to `/services`
  - link to `/zones`

Entry point: [components/service-landing-page.tsx](components/service-landing-page.tsx)

### Sitemap
- Sitemap generation now excludes removed cleaning routes.

Entry point: [app/sitemap.ts](app/sitemap.ts)

## 6) Devis funnel alignment (query param stability)
The quote funnel reads `?service=` and stores it into state. All CTAs and step choices were aligned to the new service IDs.

Entry points:
- [components/forms/quote-funnel.tsx](components/forms/quote-funnel.tsx)
- [components/forms/steps/service-location-step.tsx](components/forms/steps/service-location-step.tsx)
- [components/forms/steps/step1-service-location-timing.tsx](components/forms/steps/step1-service-location-timing.tsx)
- [components/forms/steps/service-step.tsx](components/forms/steps/service-step.tsx)

## 7) Build & Typecheck status
- `npm run build`: ✅ success
- `npx tsc --noEmit`: ✅ success
- `npm run lint`: ⚠️ fails because `eslint` is not installed (script exists, dependency doesn’t).

Recommendation (optional): add ESLint as a dev dependency and configure Next/TypeScript linting.

## 8) Notes / Follow-ups (optional)
- Consider adding a lightweight validation of `?service=` values (e.g., fallback to empty if unknown) to avoid invalid campaign links.
- If strict type safety is desired, set `typescript.ignoreBuildErrors` to `false` in [next.config.mjs](next.config.mjs) once the project is clean.
