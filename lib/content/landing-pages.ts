// French content for the Google Ads landing pages (copy as-is from the dev brief).
// Technical structure in English; all user-facing strings kept in French.

import type { PropertyTypeId } from "@/components/forms/landing-quote-form";

export type LandingReview = {
  text: string;
  author: string;
  location: string;
  service: string;
  rating: number;
};

export type LandingFaqItem = { q: string; a: string };

export type LandingCard = { icon: string; title: string; text: string };

export type LandingPageContent = {
  slug: string;
  defaultService: PropertyTypeId | "";
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
  hero: {
    badge: string;
    h1: string;
    subtitle: string;
    bullets: string[];
    trustBar: string;
  };
  reassurance: {
    heading: string;
    cards: LandingCard[];
  };
  included?: {
    heading: string;
    items: string[];
  };
  twoColumn?: {
    heading: string;
    left: { title: string; items: string[] };
    right: { title: string; items: string[] };
  };
  process?: {
    heading: string;
    steps: { title: string; description: string }[];
  };
  reviews: {
    heading?: string;
    items: LandingReview[];
  };
  form: {
    heading: string;
    subtitle: string;
  };
  faq: {
    heading: string;
    items: LandingFaqItem[];
  };
  finalCta: {
    heading: string;
    text: string;
  };
};

const BASE_URL = "https://debarras-aurea.fr";

const FAQ_PRESENCE: LandingFaqItem = {
  q: "Faut-il être présent pendant le débarras ?",
  a: "Non, ce n'est pas obligatoire. Nous sommes assurés et pouvons travailler avec un jeu de clés confié. Votre présence reste toutefois recommandée pour toute validation spécifique.",
};

const FAQ_ASSURANCE: LandingFaqItem = {
  q: "Êtes-vous assurés ?",
  a: "Oui, nous disposons d'une assurance responsabilité civile professionnelle complète qui couvre tous les risques pendant l'intervention.",
};

// ── LP 1 — Succession & after death ──────────────────────────────────────────
const lp1: LandingPageContent = {
  slug: "succession-apres-deces",
  defaultService: "succession",
  meta: {
    title:
      "Débarras Succession & Après Décès — Devis Gratuit Île-de-France | Débarras Aurea",
    description:
      "Vous gérez une succession ? Débarras Aurea vide le logement complet avec discrétion. Intervention sous 24-48h en Île-de-France. Devis gratuit, équipe assurée.",
    canonical: `${BASE_URL}/lp/succession-apres-deces`,
  },
  hero: {
    badge: "Particuliers · Succession",
    h1: "Débarras après décès & succession en Île-de-France",
    subtitle:
      "Nous vidons le logement du sol au plafond avec discrétion et bienveillance. Tri, don, recyclage ou évacuation complète.",
    bullets: [
      "Intervention discrète et respectueuse",
      "Tri des objets de valeur inclus",
      "Prise en charge administrative possible",
      "Notaires et mandataires bienvenus",
    ],
    trustBar: "⭐ 4,8/5 avis clients · 🏠 500+ interventions · 📍 8 départements IDF",
  },
  reassurance: {
    heading: "Pourquoi nous choisir ?",
    cards: [
      {
        icon: "🤝",
        title: "Accompagnement bienveillant",
        text: "Nous intervenons avec tact dans les moments difficiles",
      },
      {
        icon: "⚡",
        title: "Intervention sous 24 à 48h",
        text: "Selon urgence et disponibilité",
      },
      {
        icon: "♻️",
        title: "Tri éco-responsable",
        text: "Recyclage, dons aux associations, évacuation",
      },
      {
        icon: "🛡️",
        title: "Équipe assurée",
        text: "RC Pro et garantie décennale",
      },
    ],
  },
  included: {
    heading: "Ce que comprend notre intervention de débarras succession",
    items: [
      "Vidage complet du logement (sol au plafond)",
      "Tri et identification des objets de valeur",
      "Don aux associations partenaires",
      "Recyclage et évacuation des encombrants",
      "Nettoyage de fin de chantier (sur option)",
      "Coordination avec notaires si besoin",
    ],
  },
  process: {
    heading: "Comment ça marche ?",
    steps: [
      { title: "Demande de devis", description: "Formulaire en ligne ou appel direct" },
      { title: "Évaluation", description: "Devis gratuit envoyé sous 2h" },
      { title: "Planification", description: "Date et heure selon vos disponibilités" },
      { title: "Intervention", description: "Vidage complet, tri, évacuation" },
    ],
  },
  reviews: {
    items: [
      {
        text: "Excellent accompagnement pour le débarras après succession. Un grand merci pour votre professionnalisme.",
        author: "Sophie M.",
        location: "Créteil (94)",
        service: "Débarras succession",
        rating: 5,
      },
    ],
  },
  form: {
    heading: "Demandez votre devis gratuit",
    subtitle: "Réponse sous 2h · Sans engagement · Intervention rapide",
  },
  faq: {
    heading: "Questions fréquentes",
    items: [
      {
        q: "Intervenez-vous rapidement après un décès ?",
        a: "Oui, nous proposons une intervention rapide sous 24 à 48 h selon votre urgence et nos disponibilités. Contactez-nous par téléphone pour une réponse immédiate.",
      },
      FAQ_PRESENCE,
      {
        q: "Que faites-vous des objets de valeur ?",
        a: "Les objets de valeur sont identifiés et triés. Nous pouvons les racheter ou les déduire du montant du devis. Notre expertise nous permet d'identifier ces pièces.",
      },
      {
        q: "Travaillez-vous avec les notaires ?",
        a: "Oui, nous coordonnons régulièrement nos interventions avec les notaires et mandataires, et pouvons fournir un certificat d'évacuation si nécessaire.",
      },
      FAQ_ASSURANCE,
    ],
  },
  finalCta: {
    heading: "Prêt à nous confier cette mission ?",
    text: "Devis gratuit en quelques minutes. Réponse sous 2h.",
  },
};

// ── LP 2 — House, detached home & businesses ─────────────────────────────────
const lp2: LandingPageContent = {
  slug: "vide-maison-pavillon-pro",
  defaultService: "",
  meta: {
    title:
      "Vide Maison & Débarras Professionnel Île-de-France — Devis Gratuit | Débarras Aurea",
    description:
      "Maison, pavillon ou locaux professionnels à vider ? Débarras Aurea intervient sur tous volumes en IDF. Devis gratuit en 2 min, intervention 24-48h.",
    canonical: `${BASE_URL}/lp/vide-maison-pavillon-pro`,
  },
  hero: {
    badge: "Particuliers & Professionnels",
    h1: "Vide maison, pavillon & débarras de locaux professionnels en Île-de-France",
    subtitle:
      "Du tri à l'évacuation complète, on s'occupe de tout. Particuliers, entreprises, commerces, entrepôts.",
    bullets: [
      "Tous volumes : maison entière, pavillon, bureaux",
      "Intervention sous 24 à 48h en Île-de-France",
      "Tri, recyclage, évacuation complète",
      "Devis gratuit sans déplacement",
    ],
    trustBar: "⭐ 4,8/5 · 500+ chantiers · 8 départements · Équipe assurée",
  },
  reassurance: {
    heading: "Pourquoi nous choisir ?",
    cards: [
      {
        icon: "⚡",
        title: "Intervention 24 à 48h",
        text: "Réactivité garantie sur toute l'Île-de-France",
      },
      {
        icon: "💰",
        title: "Tarif transparent",
        text: "Prix fixe, devis gratuit sans surprise",
      },
      {
        icon: "♻️",
        title: "Tri éco-responsable",
        text: "Recyclage et dons inclus",
      },
      {
        icon: "🛡️",
        title: "Équipe assurée",
        text: "RC Pro et garantie décennale",
      },
    ],
  },
  twoColumn: {
    heading: "Nous intervenons pour",
    left: {
      title: "Particuliers",
      items: [
        "Maison ou pavillon entier",
        "Appartement complet",
        "Vide maison avant vente",
        "Débarras après déménagement",
      ],
    },
    right: {
      title: "Professionnels",
      items: [
        "Bureaux et open spaces",
        "Commerces et boutiques",
        "Entrepôts et ateliers",
        "Locaux industriels",
      ],
    },
  },
  reviews: {
    heading: "Ils nous ont fait confiance",
    items: [
      {
        text: "Intervention très bien gérée, équipe sympathique et travail soigné. Je recommande sans hésiter.",
        author: "Philippe K.",
        location: "Évry (91)",
        service: "Débarras garage",
        rating: 5,
      },
      {
        text: "Intervention express pour notre déménagement d'entreprise. Tout s'est passé parfaitement, aucune interruption d'activité.",
        author: "Thomas B.",
        location: "Nanterre (92)",
        service: "Déménagement entreprise",
        rating: 5,
      },
    ],
  },
  form: {
    heading: "Demandez votre devis gratuit",
    subtitle: "Particuliers et professionnels — Réponse sous 2h",
  },
  faq: {
    heading: "Questions fréquentes",
    items: [
      {
        q: "Intervenez-vous sur les gros volumes ?",
        a: "Oui, nous intervenons sur tous volumes, de l'appartement à la maison entière, jusqu'aux locaux professionnels et entrepôts, avec un matériel et une équipe adaptés.",
      },
      {
        q: "Pouvez-vous vider un pavillon entier en une journée ?",
        a: "Selon le volume et l'accessibilité, un pavillon peut être vidé en une journée. Nous vous indiquons la durée estimée dans le devis gratuit.",
      },
      {
        q: "Intervenez-vous pour les entreprises ?",
        a: "Oui, nous intervenons pour les bureaux, commerces, entrepôts et locaux industriels, avec un planning adapté pour ne pas interrompre votre activité.",
      },
      FAQ_PRESENCE,
      {
        q: "Combien coûte un vide maison ?",
        a: "Le prix dépend du volume, de l'accessibilité et du type de biens à évacuer. Nous fournissons toujours un devis gratuit et détaillé, sans surprise.",
      },
    ],
  },
  finalCta: {
    heading: "Maison, pavillon ou locaux à vider ?",
    text: "Devis gratuit en 2 min, réponse sous 2h.",
  },
};

// ── LP 3 — Basement & attic ──────────────────────────────────────────────────
const lp3: LandingPageContent = {
  slug: "debarras-cave-grenier",
  defaultService: "cave-grenier",
  meta: {
    title: "Débarras Cave & Grenier Île-de-France — Devis Gratuit | Débarras Aurea",
    description:
      "Cave ou grenier à vider en Île-de-France ? Débarras Aurea intervient rapidement. Tri éco-responsable, équipe assurée. Devis gratuit en 2 min.",
    canonical: `${BASE_URL}/lp/debarras-cave-grenier`,
  },
  hero: {
    badge: "Particuliers · Cave & Grenier",
    h1: "Débarras de cave & grenier en Île-de-France",
    subtitle:
      "Cave encombrée ou grenier à vider ? Notre équipe intervient rapidement pour un vidage complet, propre et éco-responsable.",
    bullets: [
      "Accès difficile — on s'adapte (sans ascenseur, combles...)",
      "Évacuation rapide et propre",
      "Tri et recyclage inclus",
      "Prix compétitif, devis gratuit",
    ],
    trustBar: "⭐ 4,9/5 · 500+ interventions · 8 départements IDF",
  },
  reassurance: {
    heading: "Pourquoi nous choisir ?",
    cards: [
      {
        icon: "⚡",
        title: "Intervention 24 à 48h",
        text: "Réactivité sur toute l'Île-de-France",
      },
      {
        icon: "🔧",
        title: "Accès difficile",
        text: "Caves sans ascenseur, greniers en comble, sous-sols",
      },
      {
        icon: "♻️",
        title: "Tri éco-responsable",
        text: "Recyclage et dons aux associations",
      },
      {
        icon: "🛡️",
        title: "Équipe assurée",
        text: "RC Pro et garantie décennale",
      },
    ],
  },
  included: {
    heading: "Ce que comprend notre intervention",
    items: [
      "Vidage complet de la cave ou du grenier",
      "Tri des objets récupérables",
      "Don aux associations partenaires",
      "Recyclage des encombrants",
      "Évacuation complète des déchets",
      "Nettoyage de fin de chantier (sur option)",
    ],
  },
  reviews: {
    items: [
      {
        text: "Très satisfait du débarras de ma cave. Rapide, efficace et prix correct. Je recommande vivement.",
        author: "Jean-Pierre L.",
        location: "Versailles (78)",
        service: "Débarras de cave",
        rating: 5,
      },
    ],
  },
  form: {
    heading: "Demandez votre devis gratuit",
    subtitle: "Réponse sous 2h · Sans engagement · Intervention rapide",
  },
  faq: {
    heading: "Questions fréquentes",
    items: [
      {
        q: "Intervenez-vous dans les caves sans ascenseur ?",
        a: "Oui, nous sommes habitués aux accès difficiles : caves sans ascenseur, greniers en combles, sous-sols. Nous nous adaptons à la configuration des lieux.",
      },
      {
        q: "Combien coûte un débarras de cave ?",
        a: "Le prix dépend du volume et de l'accessibilité. Nous fournissons un devis gratuit en 2 min, à prix fixe et sans surprise.",
      },
      FAQ_PRESENCE,
      {
        q: "Que faites-vous des objets encore utilisables ?",
        a: "Nous privilégions le don aux associations partenaires et le recyclage. Seul le déchet ultime part en déchetterie.",
      },
      FAQ_ASSURANCE,
    ],
  },
  finalCta: {
    heading: "Cave ou grenier encombré ?",
    text: "Devis gratuit en 2 min, on s'occupe de tout.",
  },
};

export const landingPages = {
  "succession-apres-deces": lp1,
  "vide-maison-pavillon-pro": lp2,
  "debarras-cave-grenier": lp3,
} as const;

export type LandingSlug = keyof typeof landingPages;
