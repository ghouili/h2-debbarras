# Performance Notes (debarras-aurea.fr)

## Summary of changes
- Replaced oversized hero/before-after assets with optimized WebP/AVIF derivatives under /public/optimized.
- Added image optimization script (sharp) and long-lived cache headers for optimized assets and Next static assets.
- LCP hero image now uses `priority` and `fetchPriority="high"` with blur placeholder; hidden toggle image is lazy.
- Small UI icons swapped to resized PNGs to avoid oversized downloads.

## Lighthouse / PageSpeed baseline (before)
- Mobile: Performance 65, LCP 91.0s, Speed Index 24.3s
- Desktop: Performance 66, LCP 13.5s
- LCP element: /after.png (~13.6MB)

## Lighthouse / PageSpeed results (after)
- Mobile: Pending local Lighthouse run
- Desktop: Pending local Lighthouse run
- LCP element: Expected /optimized/hero/hero-after-w1200.webp via Next Image optimizer

## How to reproduce
1. Build + start
   - npm run build
   - npm run start
2. Run Lighthouse
   - npx lighthouse https://localhost:3000 --preset=desktop
   - npx lighthouse https://localhost:3000 --preset=mobile

> Fill in the “after” metrics above once runs complete.

## SEO note (robots.txt validity)
- If Lighthouse reports a non-standard `Content-Signal` directive in robots.txt, disable Cloudflare’s **Content Signals** feature for this zone.
- Location: Cloudflare Dashboard → **SEO** → **Content Signals** → Off.
- Our app serves robots.txt via Next MetadataRoute in app/robots.ts and should remain standard.
