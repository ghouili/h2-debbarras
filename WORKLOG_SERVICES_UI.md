# WORKLOG — Services UI Updates

- Audited [app/services/page.tsx](app/services/page.tsx) for competing click targets in hero cards, inconsistent CTA labels, and duplicated “Tous nos services” cards.
- Plan: remove multi-chip “Services inclus” links inside hero cards and replace with a single non-clickable count; standardize primary CTA text to “Obtenir un devis gratuit”; keep “Appeler” as the only secondary action.
- Restructure tabs to clearly split Débarras vs Déménagement per audience and convert the bottom section into a compact “Accès rapide” list grouped by family.
