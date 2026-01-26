# SEO Icon + Logo Report

## What changed
- Added manifest and icon metadata in [app/layout.tsx](app/layout.tsx) and [app/manifest.ts](app/manifest.ts).
- Added Organization/LocalBusiness logo URLs in JSON-LD: [components/seo/json-ld.tsx](components/seo/json-ld.tsx).
- Added icon generation script (favicon + icons): [scripts/generate-site-icons.mjs](scripts/generate-site-icons.mjs).

## Required assets (expected)
- /favicon.ico
- /icon-192.png
- /icon-512.png
- /apple-touch-icon.png
- /logo-512.png
- /sitemap.xml
- /robots.txt

## How to generate icons locally
1) npm install
2) npm run generate:icons

## Search Console submission & recrawl
1) Open Google Search Console.
2) Add a property (Domain property recommended) and verify via DNS TXT.
3) Go to **Sitemaps** and submit: https://debarras-aurea.fr/sitemap.xml
4) Use **URL Inspection** for:
   - https://debarras-aurea.fr/
   - one service page (e.g. https://debarras-aurea.fr/services/debarras-maison-vide-maison)
   Then click **Request Indexing**.
5) Re-check **Pages** (Coverage/Indexing) and **Enhancements** after submission.

## Verification checklist (before merge)
- Open https://debarras-aurea.fr/favicon.ico → 200 OK
- Open https://debarras-aurea.fr/sitemap.xml → 200 OK, valid XML
- Open https://debarras-aurea.fr/robots.txt → 200 OK, standard directives only
- View page source and confirm icon links exist in `<head>`
- Rich Results Test → Organization/LocalBusiness has a valid `logo`
- Lighthouse SEO (mobile + desktop): no robots.txt error, favicon detected

## Notes
- If Lighthouse still reports an unknown robots directive, it is likely injected by the CDN/edge. Remove it from edge rules.
- Google may take time to update favicon/logo display even after fixes and re-crawl.
