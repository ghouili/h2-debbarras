# Performance Notes (Mobile)

Date: 2026-01-31

## Baseline (reported)
- Performance: 81
- LCP: 4.3s
- FCP: 2.0s
- TTI: 20ms
- Speed Index: 4.6s
- CLS: 0

> Note: Baseline values are from the provided report for https://debarras-aurea.fr.

## Baseline (local Lighthouse, mobile preset)
**Home (/)**
- Performance: 42
- LCP: 18.34s
- FCP: 18.34s
- TTI: 24.09s
- Speed Index: 18.64s
- CLS: 0.0048

**Service (/services/debarras-maison-vide-maison)**
- Performance: 42
- LCP: 21.59s
- FCP: 15.88s
- TTI: 22.11s
- Speed Index: 16.49s
- CLS: ~0.00002

> Note: Local Lighthouse ran against `next dev` (Turbopack), which inflates timings vs production. These numbers are used only for relative comparison and LCP element identification.

## Production Lighthouse (mobile, after changes)
**Home (/)**
- Performance: 76
- LCP: 2.49s
- FCP: 2.49s
- TTI: 4.93s
- Speed Index: 2.67s
- CLS: 0.0048

**Service (/services/debarras-maison-vide-maison)**
- Performance: 71
- LCP: 4.36s
- FCP: 1.99s
- TTI: 5.33s
- Speed Index: 2.47s
- CLS: ~0.00002

## Production Lighthouse (mobile, after heading font weight reduction)
**Home (/)**
- Performance: 80
- LCP: 2.58s
- FCP: 2.58s
- TTI: 4.53s
- Speed Index: 2.73s
- CLS: 0.0048

**Service (/services/debarras-maison-vide-maison)**
- Performance: 68
- LCP: 4.27s
- FCP: 1.90s
- TTI: 3.79s
- Speed Index: 2.38s
- CLS: ~0.00002

## Production Lighthouse (mobile, after browserslist baseline update)
**Home (/)**
- Performance: 82
- LCP: 2.53s
- FCP: 2.53s
- TTI: 5.12s
- Speed Index: 2.67s
- CLS: 0.0048

**Service (/services/debarras-maison-vide-maison)**
- Performance: 88
- LCP: 3.67s
- FCP: 1.75s
- TTI: 2.87s
- Speed Index: 2.08s
- CLS: ~0.00002

## Remaining Lighthouse insights (production)
- Render blocking requests: CSS chunks from Next/Tailwind (est savings ~370ms). No safe CSS extraction identified without visual changes.
- Image delivery: logo PNG still reported (est ~9KB). Reduced quality to 70 to minimize; consider SVG logo if acceptable.
- Legacy JS: ~14KB in a Next chunk (`_next/static/chunks/023d923a37d494fc.js`) flagged for baseline features (Array.prototype.at/flat/flatMap, Object.fromEntries/hasOwn, String.trimStart/trimEnd).

## LCP element identification (from Lighthouse trace)
**Home (/)**
- LCP element type: text (LargestTextPaint)
- Selector (from trace): `h1.font-heading` (hero headline)
- LCP-related resource URL(s):
   - http://127.0.0.1:3000/_next/static/media/b4e85636e2ca4056-s.p.9ecc21d7.woff2
   - http://127.0.0.1:3000/_next/static/media/c9e42e3eae6237c2-s.p.24d96596.woff2

**Service (/services/debarras-maison-vide-maison)**
- LCP element type: text (LargestTextPaint)
- Selector (from trace): `span.truncate`
- LCP-related resource URL(s): (font files same as above, from devtools log)

## Changes implemented
1) **Lazy-load below-the-fold homepage sections (SSR enabled)**
   - File: app/page.tsx
   - Sections: `HowItWorks`, `LazyBeforeAfter`, `StatsSection`, `ZonesTeaser`, `TestimonialsSection`, `FaqSection`, `CtaSection`.
   - Rationale: reduce initial JS for above-the-fold content while keeping SEO (SSR true).
   - Expected impact: lower unused JS, improved LCP/FCP by reducing main bundle work.

2) **Defer cookie banner JS (client-only) + remove unused font weight**
   - File: app/layout.tsx
   - Change: dynamic import of `CookieBanner` with `ssr: false` to reduce initial JS.
   - Change: removed 200 weight from `Source_Code_Pro` (no `font-extralight` usage found).
   - Expected impact: slightly lower JS/Font payload and reduced render-blocking risk from fonts.

3) **Image delivery optimizations (sizes + non-hero quality)**
   - Files: components/sections/hero-section.tsx, components/sections/before-after.tsx,
     components/layout/header.tsx, components/layout/footer.tsx, components/sections/services-grid.tsx,
     components/sections/cta-section.tsx, components/service-landing-page.tsx, app/zones/zones-page-client.tsx
   - Change: added explicit `sizes` for small icons/logos to prevent oversized downloads.
   - Change: tightened hero image `sizes` on mobile to better match container width.
   - Change: reduced `quality` to 70 for non-hero before/after gallery images.
   - Expected impact: reduce "Improve image delivery" savings with no visual changes.

4) **Legacy JS reduction (browserslist targets)**
   - File: package.json
   - Change: tightened production browserslist to last 2 versions of major browsers.
   - Expected impact: reduce legacy JS transforms in modern browsers.

5) **Heading font weight reduction**
   - File: app/layout.tsx
   - Change: `Noto_Serif` weights reduced to 600/700 (used by `font-heading`).
   - Expected impact: smaller font payload and faster text LCP; Lighthouse shows mixed variance across runs.

6) **Browserslist aligned to Next.js modern baseline**
   - File: package.json
   - Change: production targets set to Chrome/Edge/Firefox >= 111 and Safari >= 16.4.
   - Expected impact: reduce legacy JS transforms while staying within Next.js baseline.

## Dynamic import verification
- `LazyBeforeAfter` is a Client Component (`"use client"`) and can be code-split.
- Other sections imported dynamically are Server Components; dynamic import does not reduce client JS. Kept SSR to preserve SEO, but impact on bundle size is limited.

## Render-blocking CSS notes
- Global CSS is primarily Tailwind base + design tokens in app/globals.css. No safe, localized reductions identified without changing visuals.
- Next.js `optimizeCss` already enabled; inline CSS not enabled due to uncertainty/risk.

## Follow-up validation checklist
- Home page (mobile): hero + trust badges + services grid render instantly; no layout shifts.
- Service detail page (mobile): verify hero and above-the-fold layout; no hydration warnings.
- Forms & navigation: CTA buttons, devis flow, and mobile bar still work.
- Lighthouse mobile: performance target 90+ with LCP <= 2.5s (or document constraints).

## Commands to validate (manual)
- npm run lint
- npm run build
- npm run start
- Lighthouse mobile: home page + one service page
