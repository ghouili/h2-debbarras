# SERVICES UI Report

## 1) Executive summary
The /services page now prioritizes scanability and conversion by reducing competing click targets inside hero cards, standardizing the primary CTA to “Obtenir un devis gratuit,” and upgrading tabs to a WAI-ARIA compliant pattern with keyboard navigation. Each audience tab is clearly split into “Débarras” and “Déménagement” sections, and the bottom area is now a compact “Accès rapide” list for fast navigation without duplicating hero content.

## 2) Before / after — CTA labels & click targets
**Before**
- Multiple primary CTA labels (ex: “Devis commerce”, “Devis bureau”, “Devis déménagement”).
- Hero cards contained multiple clickable chips under “Services inclus,” plus a “Voir le détail” link, creating competing targets.

**After**
- Primary CTA standardized to “Obtenir un devis gratuit” across hero cards and the page.
- Exactly one secondary action per hero card (“Appeler”).
- Chip clusters removed; replaced with a single non-clickable indicator: “Inclut: X services.”

## 3) Tabs accessibility checklist
- role="tablist" on the container.
- Each tab has role="tab", aria-selected, aria-controls, and a controlled tabIndex.
- Each panel has role="tabpanel" with aria-labelledby wiring.
- Keyboard navigation: ArrowLeft/ArrowRight, Home/End move focus and update selection; Enter/Space activates.
- Visible focus ring applied via focus-visible styles.

## 4) Sectioning rationale (Débarras vs Déménagement)
Two clear sections per audience reduce cognitive load and align with campaign families. Users immediately see the relevant category first (Débarras), with Déménagement separated to avoid cross-campaign dilution.

## 5) Files changed
- app/services/page.tsx
- WORKLOG_SERVICES_UI.md
- SERVICES_UI_REPORT.md
