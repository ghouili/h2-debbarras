# Accessibility Report

## Summary
- Lighthouse Accessibility before: 91
- Lighthouse Accessibility after: Pending re-run (target: 100)
- Fixed audit categories:
  - Buttons do not have an accessible name
  - Elements use prohibited ARIA attributes
  - Identical links have the same purpose

## Code locations changed
- Cookie close button label + link purpose: [components/seo/cookie-banner.tsx](components/seo/cookie-banner.tsx)
- Ratings SR-only text (remove prohibited aria-label):
  - [components/sections/hero-section.tsx](components/sections/hero-section.tsx)
  - [components/sections/testimonials-section.tsx](components/sections/testimonials-section.tsx)
- Unique CTA link names:
  - [components/service-landing-page.tsx](components/service-landing-page.tsx)
  - [components/sections/services-grid.tsx](components/sections/services-grid.tsx)
  - [app/services/page.tsx](app/services/page.tsx)
- A11y linting rules (jsx-a11y): [eslint.config.mjs](eslint.config.mjs)

## Fixes by audit category
### 1) Buttons do not have an accessible name
- Added `aria-label` to the cookie banner close button.
- Marked the close icon as decorative with `aria-hidden="true"`.

### 2) Elements use prohibited ARIA attributes
- Removed `aria-label` from generic containers used for star ratings.
- Added SR-only text to announce ratings (e.g., “Note : 5 sur 5”).

### 3) Identical links have the same purpose
- Added SR-only context to repeated “En savoir plus” and “Voir le détail” links so each link name includes the related service title.

## Remaining risks / recommended follow-ups
- Consider enabling `@axe-core/react` in development (guarded by `NODE_ENV !== 'production'`) for proactive a11y checks.
- Run Lighthouse in CI for accessibility to prevent regressions.
- Address remaining jsx-a11y warnings (labels association and redundant roles) surfaced by eslint.

## Manual QA checklist
- Keyboard navigation: all interactive elements are reachable and focus visible.
- Close buttons announce purpose in screen readers.
- Links with repeated visible labels are distinct in assistive tech.
- No new layout or visual regressions on mobile.

## How to re-run Lighthouse
- Desktop: `npm run lh:a11y:desktop`
- Mobile: `npm run lh:a11y:mobile`

> Update the “after” metrics once the re-run is complete.
