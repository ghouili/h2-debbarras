# Débarras Aurea — Frontend (Next.js)

Marketing & lead-generation website for **Débarras Aurea**, a French house-clearing
(« débarras ») and moving (« déménagement ») company operating across Île-de-France.
Live site: **https://debarras-aurea.fr**

This is the public-facing site: SEO-optimised landing pages, a multi-step quote
(« devis ») funnel, a contact form, a service-zones map, and Google Ads conversion
tracking. Leads are captured by email (and, optionally, forwarded to the
[CRM backend](../server) — see *Lead flow* below).

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js **16** (App Router) |
| UI | React **19**, TypeScript |
| Styling | Tailwind CSS **4**, shadcn/ui (Radix primitives) |
| Forms | react-hook-form + Zod |
| Maps | Leaflet / react-leaflet (Île-de-France zones) |
| Email | Nodemailer (SMTP) inside Route Handlers |
| Analytics | Google Ads (gtag.js), optional Vercel Analytics |
| Process mgmt | PM2 (`ecosystem.config.js`) |

## Requirements

- Node.js 20+ and npm
- SMTP credentials (Gmail app password is used in production)

## Getting started

```bash
npm install
cp .env.example .env        # then fill in real values — see Environment below
npm run dev                 # http://localhost:3000
```

### Build & run (production)

```bash
npm run build
npm run start               # or: pm2 start ecosystem.config.js
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` / `npm run start` | Production build / serve |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run optimize:images` | Generate AVIF/WebP derivatives into `public/optimized` (sharp) |
| `npm run generate:icons` | Generate favicons / PWA icons / OG image |
| `npm run verify:seo` | Check `sitemap.xml`, `robots.txt`, `manifest` endpoints |
| `npm run lh:a11y:desktop` / `:mobile` | Lighthouse accessibility audit |

## Environment

Copy `.env.example` to `.env`. Variables used by the API route handlers:

| Variable | Used by | Notes |
|----------|---------|-------|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | `/api/leads`, `/api/contacts` | Required — routes throw if missing |
| `SMTP_FROM`, `SMTP_TO` | both routes | Sender / lead-notification recipients |
| `API_URL` *(or `NEXT_PUBLIC_API_URL`)` | `/api/contacts` | Base URL of the [CRM backend](../server). Only used if the DB-forward block is enabled (currently commented out) |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | `app/layout.tsx` | Set to `"true"` to enable Vercel Analytics |

> ⚠️ **Do not commit real secrets.** `.env.example` currently contains a live-looking
> Gmail app password and should be scrubbed (see *Recommended fixes* below).

## Project structure

```
app/
  layout.tsx            Root layout: fonts, metadata, JSON-LD, gtag (Google Ads), cookie banner
  page.tsx              Home (hero, services, stats, testimonials, FAQ, CTA — lazy-loaded sections)
  services/             /services listing + /services/[slug] dynamic service pages
  devis/                Quote funnel page + /devis/merci (thank-you, fires conversion)
  contact/              Contact page + /contact/merci (thank-you, fires conversion)
  zones/                Île-de-France coverage map
  avis/ faq/ merci/     Reviews, FAQ, generic thank-you
  mentions-legales/     Legal notices
  politique-confidentialite/  Privacy policy
  api/
    leads/route.ts      POST — devis/quote submissions → email (CRM forward commented out)
    contacts/route.ts   POST — contact submissions → email (CRM forward commented out)
  sitemap.ts robots.ts manifest.ts not-found.tsx

components/
  sections/   Home/landing sections (hero, services-grid, before-after, testimonials, …)
  forms/      quote-funnel + pro-quote-funnel + step components
  layout/     header, footer, mobile-bar, scroll-to-top
  seo/        json-ld, breadcrumbs, cookie-banner
  analytics/  google-ads-lead-conversion (conversion pixel)
  maps/       ile-de-france-map (Leaflet)
  ui/         shadcn/ui primitives

lib/
  config.ts          Single source of truth: site info + service taxonomy + zones + FAQs
  analytics.ts       gtag helpers (trackEvent, trackStartDevis, conversion, …)
  design-tokens.ts   Typography / spacing / button tokens
  campaign-map.ts    Service → Google Ads campaign mapping

scripts/   optimize-images.mjs, generate-site-icons.mjs, verify-seo-endpoints.mjs
public/    icons, logos, OG image, before/after photos, /optimized derivatives
```

## Lead flow

1. User completes the **quote funnel** (`/devis`) or **contact form** (`/contact`).
2. The form `POST`s to `/api/leads` or `/api/contacts`.
3. The route handler sends two emails via Nodemailer:
   - an internal **notification** to `SMTP_TO`, and
   - a **confirmation** email to the customer.
4. On success the funnel redirects to a `/merci` page, which renders
   `<GoogleAdsLeadConversion>` to fire the Google Ads conversion.
5. **CRM persistence** to the [backend](../server) is implemented but **commented out**
   in both route handlers — leads currently arrive **by email only**.

## Analytics & conversion tracking

See [`docs/ANALYTICS.md`](#) summary in the project notes. In short:

- **Google Ads** conversion tracking is live (account `AW-17933962840`); conversions fire
  on `/devis/merci` and `/contact/merci`.
- **GA4** and **GTM** are **not** installed (only an unconfigured `GA_MEASUREMENT_ID`
  placeholder exists in `lib/analytics.ts`).
- Cookie banner stores consent but **does not gate** the tracking scripts yet.

## Related docs

- [`PERFORMANCE_NOTES.md`](PERFORMANCE_NOTES.md) — Lighthouse history & optimisations
- [`PERF.md`](PERF.md) — image/LCP optimisation notes
- [`REPORT.md`](REPORT.md) — SEO icons / logo / Search Console checklist
- [`../server/README.md`](../server/README.md) — CRM backend
