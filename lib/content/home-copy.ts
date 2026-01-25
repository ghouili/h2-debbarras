export type HomeCopy = {
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    bullets: string[]
    primaryCta: string
    secondaryCta: string
    trust: {
      rating: string
      ratingLabel: string
      interventions: string
      departments: string
    }
  }
  benefitsRow: {
    items: string[]
  }
  serviceCards: {
    title: string
    subtitle: string
    ctaLabel: string
    sectionCta: string
    cards: { title: string; description: string }[]
  }
  howItWorks: {
    title: string
    subtitle: string
    steps: { title: string; description: string }[]
  }
  beforeAfter: {
    title: string
    subtitle: string
    caption: string
  }
  stats: {
    items: { value: string; label: string }[]
  }
  zones: {
    title: string
    subtitle: string
    cta: string
  }
  reviewsTeaser: {
    title: string
    subtitle: string
  }
  faqTeaser: {
    title: string
    subtitle: string
    cta: string
  }
  finalCta: {
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    microcopy: string
  }
}

export const homeCopy: HomeCopy = {
  hero: {
    badge: "Devis gratuit en 2 min",
    title: "Débarras & Déménagement en",
    titleHighlight: "Île-de-France",
    subtitle: "Service professionnel de débarras et déménagement. Intervention sous 24–48h, devis gratuit, tri éco-responsable.",
    bullets: ["Intervention sous 24–48h", "Devis gratuit, sans engagement", "Tri & recyclage éco-responsable"],
    primaryCta: "Demander un devis gratuit",
    secondaryCta: "Appeler maintenant",
    trust: {
      rating: "4.8/5",
      ratingLabel: "avis clients",
      interventions: "500+ interventions",
      departments: "8 départements couverts",
    },
  },
  benefitsRow: {
    items: ["24–48h", "Assuré & pro", "Tri écoresponsable", "Équipe respectueuse"],
  },
  serviceCards: {
    title: "Nos services",
    subtitle: "Débarras et déménagement sur-mesure en Île-de-France",
    ctaLabel: "En savoir plus",
    sectionCta: "Demander un devis gratuit",
    cards: [
      { title: "Maisons & Appartements", description: "Débarras complet de votre logement, du tri à l'évacuation." },
      { title: "Garages, Caves & Greniers", description: "Libérez vos espaces de stockage en toute simplicité." },
      { title: "Après Décès & Succession", description: "Accompagnement discret et respectueux dans les moments difficiles." },
      { title: "Déménagement", description: "Déménagement particuliers et professionnels, en Île-de-France et au national." },
    ],
  },
  howItWorks: {
    title: "Comment ça marche ?",
    subtitle: "Un processus simple et transparent en 4 étapes",
    steps: [
      { title: "Demande de devis", description: "Remplissez notre formulaire en ligne ou appelez-nous directement." },
      { title: "Évaluation", description: "Nous évaluons le volume et vous envoyons un devis clair." },
      { title: "Planification", description: "Nous fixons ensemble la date et l’heure d’intervention." },
      { title: "Intervention", description: "Notre équipe procède au débarras complet, tri et recyclage." },
    ],
  },
  beforeAfter: {
    title: "Avant / Après",
    subtitle: "Des résultats visibles, en quelques heures",
    caption: "Exemple réel en Île-de-France",
  },
  stats: {
    items: [
      { value: "4.8/5", label: "Avis clients" },
      { value: "24–48h", label: "Délai d'intervention" },
      { value: "+500", label: "Interventions réalisées" },
      { value: "8", label: "Départements couverts" },
    ],
  },
  zones: {
    title: "Débarras & déménagement dans toute l'Île-de-France",
    subtitle: "Paris, petite et grande couronne — 8 départements couverts",
    cta: "Voir nos zones d’intervention",
  },
  reviewsTeaser: {
    title: "Ce que disent nos clients",
    subtitle: "Retours d'expérience de nos interventions",
  },
  faqTeaser: {
    title: "Questions fréquentes",
    subtitle: "Les réponses aux demandes courantes",
    cta: "Voir toutes les questions",
  },
  finalCta: {
    title: "Prêt à libérer de l’espace ?",
    subtitle: "Obtenez votre devis gratuit en quelques minutes. Débarras ou déménagement, nous intervenons sous 24–48h.",
    primaryCta: "Devis gratuit",
    secondaryCta: "Appeler maintenant",
    microcopy: "Sans engagement • Intervention rapide • Tri éco-responsable",
  },
}
