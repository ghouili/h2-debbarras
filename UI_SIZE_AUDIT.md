# UI Size Audit - H2 Débarras

## Audit Date: 2026-01-20

## Executive Summary

The site currently suffers from visual heaviness due to:
- Oversized typography (especially H1/H2 headings)
- Overly tall buttons (h-14 = 56px is excessive for CTAs)
- Generous section padding creating too much vertical whitespace
- Large stat numbers and step indicators
- Wide container (max-w-7xl = 1280px) making content feel sparse

---

## Component Inventory & Issues

### 1. Design Tokens (`lib/design-tokens.ts`)

| Token | Current Value | Issue | Target |
|-------|--------------|-------|--------|
| `typography.h1` | `text-4xl md:text-5xl lg:text-6xl xl:text-7xl` | Way too large, especially on mobile | `text-3xl sm:text-4xl lg:text-5xl` |
| `typography.h2` | `text-3xl md:text-4xl lg:text-5xl` | Too large for section headings | `text-2xl sm:text-3xl lg:text-4xl` |
| `typography.h3` | `text-2xl md:text-3xl lg:text-4xl` | Excessive scaling | `text-xl sm:text-2xl` |
| `typography.lead` | `text-lg md:text-xl lg:text-2xl` | Subtitle too large | `text-base sm:text-lg` |
| `button.sizes.xl` | `h-14 px-10 text-lg` | 56px height is excessive | `h-12 px-8 text-base` |
| `button.sizes.lg` | `h-12 px-8 text-base` | Still tall | `h-11 px-6 text-sm` |

### 2. Button Component (`components/ui/button.tsx`)

| Size | Current | Issue | Target |
|------|---------|-------|--------|
| `default` | `h-10` (40px) | OK | Keep |
| `sm` | `h-9` (36px) | OK | Keep |
| `lg` | `h-11` (44px) | Slightly tall | `h-10 px-5` (visually) |
| `icon` | `size-10` (40px) | OK | Keep |

### 3. PageContainer (`components/layout/page-container.tsx`)

| Current | Issue | Target |
|---------|-------|--------|
| `max-w-7xl` (1280px) | Too wide, content feels sparse | `max-w-6xl` (1152px) |

### 4. Section Component (`components/layout/section.tsx`)

| Current | Issue | Target |
|---------|-------|--------|
| `py-12 md:py-16` | Generous but OK | `py-10 sm:py-12 lg:py-16` |

### 5. HeroSection (`components/sections/hero-section.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| Headline | `designTokens.typography.h2` | Uses oversized tokens | Inline smaller classes |
| CTA buttons | `h-14 px-8` | 56px is too tall | `h-11 px-6` |
| Lead text | `designTokens.typography.lead` | Too large | `text-base sm:text-lg` |
| Gap | `gap-8` | Could be tighter | `gap-6` |

### 6. ServicesGrid (`components/sections/services-grid.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| Section heading | `text-3xl md:text-4xl` | Slightly large | `text-2xl sm:text-3xl` |
| Subtitle | `text-lg` | OK | Keep |
| Card gap | `mt-12` | Large gap before grid | `mt-10` |
| CTA button | `size="lg"` | Uses lg variant | Keep or reduce |

### 7. StatsSection (`components/sections/stats-section.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| Stat value | `text-4xl md:text-5xl` | Huge numbers | `text-3xl sm:text-4xl` |
| Gap | `gap-8` | OK | Keep |

### 8. HowItWorks (`components/sections/how-it-works.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| Step circle | `h-16 w-16` | 64px circles too large | `h-12 w-12 sm:h-14 sm:w-14` |
| Step number | `text-2xl` | OK inside smaller circle | `text-xl` |
| Section heading | `text-3xl md:text-4xl` | Too large | `text-2xl sm:text-3xl` |

### 9. TestimonialsSection (`components/sections/testimonials-section.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| Section heading | `text-3xl md:text-4xl` | Too large | `text-2xl sm:text-3xl` |
| Card min-height | `min-h-[16rem]` | OK | Keep |

### 10. FaqSection (`components/sections/faq-section.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| Section heading | `text-3xl md:text-4xl` | Too large | `text-2xl sm:text-3xl` |

### 11. CtaSection (`components/sections/cta-section.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| Heading | `text-3xl md:text-4xl` | Too large | `text-2xl sm:text-3xl` |
| Button gap | `mt-8` | OK | Keep or reduce to `mt-6` |

### 12. TrustBadges (`components/sections/trust-badges.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| Icon container | `h-12 w-12` | OK | Keep or reduce to `h-10 w-10` |
| Section padding | `py-8 md:py-12` | Slightly heavy | `py-6 md:py-8` |

### 13. ServiceLandingPage (`components/service-landing-page.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| H1 | `designTokens.typography.h2` | Uses oversized token | Inline classes |
| CTA buttons | `h-14 px-8` | Too tall | `h-11 px-6` |

### 14. Services Page (`app/services/page.tsx`)

| Element | Current | Issue | Target |
|---------|---------|-------|--------|
| Page H1 | `text-4xl md:text-5xl` | Too large | `text-3xl sm:text-4xl` |
| Tab buttons | `px-4 py-2` | OK, could be denser | Keep |

---

## Priority Fix List

### High Priority (Most Visual Impact)
1. ✅ Update design-tokens.ts typography scale
2. ✅ Reduce hero/CTA button heights from h-14 to h-11
3. ✅ Reduce PageContainer from max-w-7xl to max-w-6xl
4. ✅ Reduce stats section number sizes
5. ✅ Reduce HowItWorks step circles

### Medium Priority
6. ✅ Reduce section heading sizes site-wide
7. ✅ Tighten section vertical padding
8. ✅ Reduce trust badges icon sizes

### Lower Priority
9. Consider reducing card padding
10. Fine-tune gap values

---

## Files To Be Modified

1. `lib/design-tokens.ts` - Typography and button size tokens
2. `components/layout/page-container.tsx` - Container width
3. `components/layout/section.tsx` - Section padding
4. `components/sections/hero-section.tsx` - Button and text sizes
5. `components/sections/services-grid.tsx` - Heading sizes
6. `components/sections/stats-section.tsx` - Stat number sizes
7. `components/sections/how-it-works.tsx` - Step circle and heading sizes
8. `components/sections/testimonials-section.tsx` - Heading sizes
9. `components/sections/faq-section.tsx` - Heading sizes
10. `components/sections/cta-section.tsx` - Heading and button sizes
11. `components/sections/trust-badges.tsx` - Icon and padding sizes
12. `components/service-landing-page.tsx` - Button and heading sizes
13. `app/services/page.tsx` - Page heading size
