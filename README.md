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
| Analytics | GTM (`GTM-P7RGSS2S`), Google Ads + GA4 (gtag.js), optional Vercel Analytics |
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
| `NEXT_PUBLIC_GTM_ID` | `app/layout.tsx` | Google Tag Manager container ID (`GTM-P7RGSS2S`). In `.env.local` |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | `app/layout.tsx` | Set to `"true"` to enable Vercel Analytics |

> ⚠️ **Do not commit real secrets.** `.env.example` currently contains a live-looking
> Gmail app password and should be scrubbed (see *Recommended fixes* below).

## Project structure

```
app/
  layout.tsx            Root layout: fonts, metadata, JSON-LD, gtag (Google Ads + GA4), GTM, SiteChrome
  page.tsx              Home (hero, services, stats, testimonials, FAQ, CTA — lazy-loaded sections)
  services/             /services listing + /services/[slug] dynamic service pages
  devis/                Quote funnel page (/devis/merci → redirects to /merci)
  contact/              Contact page (/contact/merci → redirects to /merci)
  zones/                Île-de-France coverage map
  (ads)/                Route group for Google Ads landing pages (simplified header/footer)
    lp/succession-apres-deces/        LP 1 — Succession & après décès
    lp/vide-maison-pavillon-pro/      LP 2 — Maison, pavillon & pro
    lp/debarras-cave-grenier/         LP 3 — Cave & grenier
  merci/                Single confirmation page (conversion trigger; noindex; logo-only chrome)
  avis/ faq/            Reviews, FAQ
  mentions-legales/     Legal notices
  politique-confidentialite/  Privacy policy
  api/
    leads/route.ts      POST — devis/quote submissions → email (CRM forward commented out)
    contacts/route.ts   POST — contact submissions → email (CRM forward commented out)
  sitemap.ts robots.ts manifest.ts not-found.tsx

components/
  sections/   Home/landing sections (hero, services-grid, before-after, testimonials, …)
  landing/    landing-page-template (assembles LP sections from lib/content/landing-pages)
  forms/      quote-funnel + pro-quote-funnel + landing-quote-form + step components
  layout/     header, footer, mobile-bar, scroll-to-top, site-chrome, landing-header, landing-footer
  seo/        json-ld, breadcrumbs, cookie-banner
  analytics/  google-ads-lead-conversion (legacy pixel — unused; conversions now via GTM)
  maps/       ile-de-france-map (Leaflet)
  ui/         shadcn/ui primitives

lib/
  config.ts          Single source of truth: site info + legal + service taxonomy + zones + FAQs
  content/landing-pages.ts  French copy for the 3 Ads landing pages
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
4. On success **every** funnel (quote, contact, and the Ads landing-page forms) redirects to
   the single **`/merci`** page. That page load is the **conversion trigger** — see below.
5. **CRM persistence** to the [backend](../server) is implemented but **commented out**
   in both route handlers — leads currently arrive **by email only**.

## Google Ads landing pages (`/lp/*`)

Three Ads-optimised landing pages live under the `(ads)` route group and are
**`noindex, nofollow`** (Ads traffic only, never organic):

| Route | Pre-selected « Type de bien » |
| --- | --- |
| `/lp/succession-apres-deces` | Succession / Après décès |
| `/lp/vide-maison-pavillon-pro` | _(none)_ |
| `/lp/debarras-cave-grenier` | Cave / Grenier / Garage |

- They use a **simplified header/footer** (`landing-header`, `landing-footer`), not the main
  site chrome. `components/layout/site-chrome.tsx` hides the global header/footer on `/lp/*`
  and `/merci` via `usePathname()`.
- All copy lives in `lib/content/landing-pages.ts`; the layout is assembled by
  `components/landing/landing-page-template.tsx`.
- The embedded form (`landing-quote-form.tsx`) POSTs to `/api/leads`, then
  `router.push('/merci')`.

## Analytics & conversion tracking

- **GTM** container **`GTM-P7RGSS2S`** is loaded site-wide via `next/script` in `app/layout.tsx`
  (ID in `NEXT_PUBLIC_GTM_ID`). **GTM owns conversions** now.
- **Google Ads** account `AW-17933962840` and **GA4** `G-W68ZFT3E37` are also loaded directly
  via gtag.js in `app/layout.tsx` (page views / remarketing).
- **Conversions fire from GTM on `/merci`** (not from code). The old code-based
  `<GoogleAdsLeadConversion>` pixel has been removed from the thank-you pages; the component
  file remains but is unused.
- Cookie banner stores consent but **does not gate** the tracking scripts yet.

### ⚠️ Required GTM dashboard setup (must be done before campaigns launch)

> 📖 **Full step-by-step guide:** [`docs/GTM-CONVERSION-SETUP.md`](docs/GTM-CONVERSION-SETUP.md)

Code only guarantees the `/merci` redirect. The conversion **tag** must be configured in the
GTM web UI for container `GTM-P7RGSS2S`:

1. **Trigger** → New → *Page View* → name `Page /merci` → fire when *Page URL* `contains` `/merci`.
2. In **Google Ads → Tools → Conversions**, open each action (`devis form`, `contact form`)
   → *Set up tag* → *Google Tag Manager* → copy the **Conversion label**.
3. **GTM → Tags → New** → *Google Ads Conversion Tracking* → Conversion ID `AW-17933962840`,
   the label from step 2, Trigger = `Page /merci`. Repeat per conversion action.
4. **Submit → Publish** the container (changes are not live until published).
5. **Test** with Tag Assistant: submit a form on a `/lp/*` page → land on `/merci` → confirm
   *Google Ads Conversion Tracking* fires.

## Related docs

- [`PERFORMANCE_NOTES.md`](PERFORMANCE_NOTES.md) — Lighthouse history & optimisations
- [`PERF.md`](PERF.md) — image/LCP optimisation notes
- [`REPORT.md`](REPORT.md) — SEO icons / logo / Search Console checklist
- [`../server/README.md`](../server/README.md) — CRM backend
