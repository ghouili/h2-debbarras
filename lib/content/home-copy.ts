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
    badge: "Devis en 2 minutes",
    title: "Débarras de Maison Professionnel en",
    titleHighlight: "Île-de-France",
    subtitle: "Intervention sous 24–48h. Devis gratuit. Tri & recyclage éco-responsable.",
    bullets: ["Intervention rapide 24–48h", "Devis gratuit sans engagement", "Tri écologique & recyclage"],
    primaryCta: "Demander un devis gratuit",
    secondaryCta: "Appeler maintenant",
    trust: {
      rating: "4.8/5",
      ratingLabel: "avis clients",
      interventions: "500+ interventions",
      departments: "8 départements",
    },
  },
  benefitsRow: {
    items: ["24–48h", "Assuré & pro", "Tri écoresponsable", "Équipe respectueuse"],
  },
  serviceCards: {
    title: "Nos services de débarras",
    subtitle: "Des solutions adaptées à tous vos besoins de débarras en Île-de-France",
    ctaLabel: "En savoir plus",
    sectionCta: "Demander un devis gratuit",
    cards: [
      { title: "Maisons & Appartements", description: "Un débarras complet pour vider votre logement rapidement." },
      { title: "Garages, Caves & Greniers", description: "Libérez vos espaces de stockage sans effort." },
      { title: "Après Décès & Succession", description: "Un service discret et respectueux dans les moments difficiles." },
      { title: "Meubles & Canapés", description: "Débarrassez-vous de vos meubles encombrants en toute simplicité." },
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
    title: "Nous intervenons dans toute l’Île-de-France",
    subtitle: "Paris + petite couronne + grande couronne",
    cta: "Voir nos zones d’intervention",
  },
  reviewsTeaser: {
    title: "Ce que disent nos clients",
    subtitle: "Avis vérifiés et retours d’expérience",
  },
  faqTeaser: {
    title: "Questions fréquentes",
    subtitle: "Les réponses aux demandes courantes",
    cta: "Voir toutes les questions",
  },
  finalCta: {
    title: "Prêt à libérer de l’espace ?",
    subtitle: "Obtenez votre devis gratuit en quelques minutes et planifiez votre débarras dès aujourd’hui.",
    primaryCta: "Devis gratuit",
    secondaryCta: "Appeler maintenant",
    microcopy: "Sans engagement • Tri & recyclage",
  },
}
