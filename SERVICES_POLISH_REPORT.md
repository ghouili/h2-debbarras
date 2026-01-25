# Services Polish Report

## Summary of fixes
- MICROCOPY-001: Added `formatServiceCount()` to ensure “Inclut : 1 service” vs “Inclut : X services”.
- LAYOUT-001: Single-card sections now span full width (centered on md+).
- CTA-001: Bottom CTA headline now matches tab context (“entreprise” vs “devis gratuit”).
- DISCOVERABILITY-001: Added one subtle “Voir le détail du service” link per hero card.
- A11Y-001: Tabs already use WAI-ARIA semantics and keyboard navigation.

## Before / after notes
- Before: “Inclut : X services” could show incorrect pluralization and hero cards lacked a detail link.
- After: Correct singular/plural and a single, subtle detail link without reintroducing chip clutter.

## Accessibility checklist
- role="tablist" on tabs container.
- role="tab" with aria-selected and aria-controls on each tab.
- role="tabpanel" with aria-labelledby on panels.
- Keyboard: ArrowLeft/ArrowRight/Home/End/Enter/Space supported.
- Visible focus ring on tabs.

## Files changed
- app/services/page.tsx
- WORKLOG_SERVICES_POLISH.md
- SERVICES_POLISH_REPORT.md
