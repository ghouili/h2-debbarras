# H2 Débarras Maison - Implementation Worklog

## Audit Date: January 20, 2026

## Audit window: January 20, 2026

---

## 1. Mismatches Found

### A. Nettoyage References (To Remove)

| File | Line(s) | Content | Action |
|------|---------|---------|--------|
| `lib/config.ts` | 352-353 | FAQ about "syndrome de Diogène" referencing nettoyage context | REMOVE FAQ |
| `next.config.mjs` | 18, 23, 28 | Redirects for `/services/nettoyage-*` routes | KEEP (legacy redirects) |
| `DESIGN_ENHANCEMENT_PROMPT.md` | 272-273, 306 | "syndrome de Diogène" + "Final cleaning" | Documentation only - no action |
| `REPORT.md` | Multiple | Historical context about nettoyage removal | Documentation only - no action |

### B. Testimonials Issues

| File | Issue | Action |
|------|-------|--------|
| `lib/config.ts` | All testimonials rated 5/5 (lacks variation) | Vary between 4.7-5.0 |
| `lib/config.ts` | Testimonials lack human variation | Humanize wording |
| `lib/content/home-copy.ts` | Says "Avis vérifiés" without verifiable source | Change to a neutral wording (no verification claim) |
| `components/service-landing-page.tsx:176` | Shows "4.9/5 avis clients" | OK - within [4.0-5.0] |

### C. Schema/JSON-LD Issues

| File | Issue | Action |
|------|-------|--------|
| `components/seo/json-ld.tsx` | No AggregateRating/Review schema found | ✅ COMPLIANT |
| `app/services/[slug]/page.tsx` | BreadcrumbList implemented | ✅ COMPLIANT |
| `app/services/[slug]/page.tsx` | Service schema implemented | ✅ COMPLIANT |

### D. Campaign Fields Missing

| File | Issue | Action |
|------|-------|--------|
| `lib/config.ts` | Services have `campaignGroup` and `campaignKey` | ✅ EXISTS |
| `lib/config.ts` | Missing `intentKeywords` and `negativeKeywords` arrays | ADD fields |
| N/A | No `lib/campaign-map.ts` helper | CREATE file |

### E. Services Taxonomy Status

| Category | Status |
|----------|--------|
| Particulier.debarras | ✅ 8 services |
| Particulier.demenagement | ✅ 5 services |
| Professionnel.debarras | ✅ 3 services |
| Professionnel.demenagement | ✅ 1 service |
| **Nettoyage** | ✅ REMOVED from config |

---

## 2. Files to Modify

### Priority 1: Content/Data
- [x] `lib/config.ts` - Remove Diogène FAQ, add campaign keywords
- [x] `lib/testimonials.ts` - NEW: Extract testimonials with rating clamp
- [x] `lib/campaign-map.ts` - NEW: Campaign grouping helper

### Priority 2: UI Components
- [x] `lib/content/home-copy.ts` - Remove "vérifiés" claim
- [x] `components/sections/testimonials-section.tsx` - Add rating clamp
- [x] `components/service-landing-page.tsx` - Verify no nettoyage copy

### Priority 3: SEO
- [x] `app/robots.ts` - Verify complete
- [x] `app/sitemap.ts` - Verify no nettoyage routes
- [x] `app/services/[slug]/page.tsx` - Already has canonical + breadcrumbs

---

## 3. Proposed Fixes Summary

1. **Remove Diogène FAQ** from `lib/config.ts` (line 352-353) - references cleaning context
2. **Add intentKeywords + negativeKeywords** to all services in config
3. **Create `lib/campaign-map.ts`** with campaign grouping helper
4. **Create `lib/testimonials.ts`** with:
   - Extracted testimonials
   - Rating clamp function
   - Humanized text
   - ServiceTag field
5. **Update home-copy.ts** to remove "Avis vérifiés"
6. **Update testimonials-section.tsx** to use clamped ratings
7. **Build verification** to confirm no nettoyage in runtime output

---

## 4. Verification Commands

```bash
# Check for nettoyage in runtime files (expect only in next.config.mjs redirects)
grep -r "nettoyage" --include="*.tsx" --include="*.ts" .

# TypeScript check
npx tsc --noEmit

# Build
npm run build
```

---

## References

- Git commit: TBD (git hash not captured in this run)

## Status: COMPLETE
