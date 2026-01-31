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

## Dynamic import verification
- `LazyBeforeAfter` is a Client Component (`"use client"`) and can be code-split.
- Other sections imported dynamically are Server Components; dynamic import does not reduce client JS. Kept SSR to preserve SEO, but impact on bundle size is limited.

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
