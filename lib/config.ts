// Centralized configuration for H2 Débarras Maison

export const siteConfig = {
  name: "H2 Débarras Maison",
  description:
    "Service professionnel de débarras de maison en Île-de-France. Intervention rapide 24-48h, tri et recyclage, devis gratuit.",
  url: "https://h2debarrasmaison.fr",

  contact: {
    phone: "+33 7 69 60 83 00",
    email: "contact@h2debarrasmaison.com",
    address: "Île-de-France",
  },

  services: {
    particulier: {
      debarras: [
        {
          id: "maison-appartement",
          title: "Maisons & Appartements",
          slug: "debarras-maison-appartement",
          icon: "home",
          description: "Vidage complet de maisons et appartements avec tri professionnel",
          shortDescription: "Service complet pour vider votre logement",
          features: ["Intervention rapide 24-48h", "Tri sélectif", "Nettoyage après débarras", "Devis gratuit"],
        },
        {
          id: "cave-grenier",
          title: "Garages, Caves & Greniers",
          slug: "debarras-cave-grenier",
          icon: "warehouse",
          description: "Évacuation de cave, grenier, garage et espaces encombrés",
          shortDescription: "Libérez vos espaces de stockage",
          features: ["Accès difficile", "Évacuation rapide", "Tri recyclable", "Prix compétitifs"],
        },
        {
          id: "succession",
          title: "Après Décès & Succession",
          slug: "debarras-succession",
          icon: "heart",
          description: "Accompagnement délicat dans le débarras après succession",
          shortDescription: "Service respectueux pour les moments difficiles",
          features: [
            "Accompagnement bienveillant",
            "Tri des objets de valeur",
            "Discrétion assurée",
            "Prise en charge administrative",
          ],
        },
        {
          id: "meubles",
          title: "Meubles & Canapés",
          slug: "enlevement-meubles-canapes",
          icon: "armchair",
          description: "Enlèvement et évacuation de meubles encombrants",
          shortDescription: "Débarrassez-vous de vos vieux meubles",
          features: ["Démontage si nécessaire", "Transport sécurisé", "Recyclage", "Intervention express"],
        },
        {
          id: "electromenager",
          title: "Électroménagers",
          slug: "enlevement-electromenager",
          icon: "microwave",
          description: "Récupération et recyclage d'appareils électroménagers",
          shortDescription: "Évacuation d'électroménager responsable",
          features: ["Recyclage DEEE", "Débranchement", "Évacuation sécurisée", "Gratuit selon volume"],
        },
        {
          id: "encombrants",
          title: "Encombrants Divers",
          slug: "enlevement-encombrants",
          icon: "package",
          description: "Collecte et évacuation de tous types d'encombrants",
          shortDescription: "Solution pour tous vos encombrants",
          features: ["Tous types d'objets", "Tri à la source", "Valorisation", "Intervention rapide"],
        },
        {
          id: "ecoresponsable",
          title: "Débarras Écoresponsable",
          slug: "debarras-ecoresponsable",
          icon: "leaf",
          description: "Débarras avec valorisation maximale et recyclage",
          shortDescription: "Débarras respectueux de l'environnement",
          features: ["Tri sélectif", "Don aux associations", "Recyclage maximal", "Traçabilité"],
        },
      ],
      demenagement: [
        {
          id: "demenagement-particulier",
          title: "Déménagement Particuliers",
          slug: "demenagement-particulier",
          icon: "truck",
          description: "Déménagement complet pour particuliers",
          shortDescription: "Déménagez en toute sérénité",
          features: ["Emballage", "Transport", "Déchargement", "Montage/démontage"],
        },
        {
          id: "transport-mobilier",
          title: "Transport Mobilier & Objets Lourds",
          slug: "transport-mobilier-objets-lourds",
          icon: "package-check",
          description: "Transport sécurisé de meubles et objets volumineux",
          shortDescription: "Transport professionnel de gros volumes",
          features: ["Équipement adapté", "Personnel qualifié", "Assurance", "Protection des biens"],
        },
        {
          id: "demenagement-regional",
          title: "Déménagements Nationaux & Régionaux",
          slug: "demenagement-national-regional",
          icon: "map",
          description: "Déménagement longue distance en France",
          shortDescription: "Déménagement dans toute la France",
          features: ["Toute France", "Planning flexible", "Suivi", "Devis détaillé"],
        },
        {
          id: "demenagement-express",
          title: "Déménagements Express & Urgents",
          slug: "demenagement-express-urgent",
          icon: "zap",
          description: "Service de déménagement en urgence",
          shortDescription: "Déménagement sous 24-48h",
          features: ["24-48h", "Disponibilité immédiate", "Organisation rapide", "Efficacité garantie"],
        },
        {
          id: "garde-meuble",
          title: "Garde-Meuble",
          slug: "garde-meuble",
          icon: "archive",
          description: "Stockage sécurisé de vos biens",
          shortDescription: "Solution de stockage flexible",
          features: ["Boxes sécurisés", "Accès 7j/7", "Toutes durées", "Surveillance 24h/24"],
        },
      ],
      // nettoyage: [
      //   {
      //     id: "matelas-tapis",
      //     title: "Matelas, Tapis & Moquettes",
      //     slug: "nettoyage-matelas-tapis-moquettes",
      //     icon: "spray-can",
      //     description: "Nettoyage en profondeur de literie et sols textiles",
      //     shortDescription: "Nettoyage professionnel de textiles",
      //     features: ["Nettoyage vapeur", "Désinfection", "Séchage rapide", "Produits écologiques"],
      //   },
      //   {
      //     id: "apres-sinistre",
      //     title: "Après Sinistre",
      //     slug: "nettoyage-apres-sinistre",
      //     icon: "droplet",
      //     description: "Remise en état après dégât des eaux, incendie",
      //     shortDescription: "Nettoyage post-sinistre professionnel",
      //     features: ["Intervention rapide", "Assurance", "Désinfection", "Remise en état"],
      //   },
      //   {
      //     id: "printemps",
      //     title: "Grand Nettoyage de Printemps",
      //     slug: "grand-nettoyage-printemps",
      //     icon: "sparkles",
      //     description: "Nettoyage complet de votre logement",
      //     shortDescription: "Nettoyage en profondeur",
      //     features: ["Toutes pièces", "Vitres", "Sols", "Surfaces"],
      //   },
      //   {
      //     id: "apres-demenagement",
      //     title: "Après Déménagement",
      //     slug: "nettoyage-apres-demenagement",
      //     icon: "check-circle",
      //     description: "Nettoyage de fin de bail",
      //     shortDescription: "Nettoyage pour état des lieux",
      //     features: ["État des lieux", "Garantie propreté", "Toutes surfaces", "Déductible fiscalement"],
      //   },
      //   {
      //     id: "apres-debarras",
      //     title: "Après Débarras",
      //     slug: "nettoyage-apres-debarras",
      //     icon: "broom",
      //     description: "Nettoyage suite à un débarras",
      //     shortDescription: "Finition après débarras",
      //     features: ["Dépoussiérage", "Sols", "Désinfection", "Prêt à occuper"],
      //   },
      // ],
    },
    professionnel: {
      debarras: [
        {
          id: "bureaux-locaux",
          title: "Bureaux & Locaux Commerciaux",
          slug: "debarras-bureaux-locaux",
          icon: "building-2",
          description: "Débarras professionnel de bureaux et locaux",
          shortDescription: "Vidage de locaux professionnels",
          features: ["Hors heures ouvrées", "Confidentialité", "Destruction documents", "Récupération matériel"],
        },
        {
          id: "commerces-entrepots",
          title: "Commerces & Entrepôts",
          slug: "debarras-commerces-entrepots",
          icon: "store",
          description: "Évacuation de commerces et entrepôts",
          shortDescription: "Débarras de grands volumes",
          features: ["Gros volumes", "Matériel adapté", "Planning flexible", "Devis sur mesure"],
        },
        {
          id: "gravats",
          title: "Gravats & Déchets de Chantier",
          slug: "evacuation-gravats-dechets-chantier",
          icon: "hard-hat",
          description: "Évacuation de déchets de chantier",
          shortDescription: "Gestion des déchets professionnels",
          features: ["Toutes quantités", "Tri sélectif", "Bennes", "Certificats"],
        },
      ],
      demenagement: [
        {
          id: "demenagement-entreprise",
          title: "Déménagement d'Entreprises",
          slug: "demenagement-entreprise",
          icon: "briefcase",
          description: "Déménagement professionnel d'entreprise",
          shortDescription: "Déménagement sans interruption d'activité",
          features: ["Planning adapté", "Week-end/nuit", "IT & téléphonie", "Remise en service"],
        },
      ],
      nettoyage: [
        {
          id: "apres-travaux",
          title: "Après Travaux",
          slug: "nettoyage-apres-travaux",
          icon: "paint-brush",
          description: "Nettoyage de chantier et remise en état",
          shortDescription: "Nettoyage post-chantier professionnel",
          features: ["Poussières de chantier", "Finitions", "Vitres", "Prêt à utiliser"],
        },
        {
          id: "bureaux-commerces",
          title: "Bureaux & Commerces",
          slug: "nettoyage-bureaux-commerces",
          icon: "building",
          description: "Entretien régulier de locaux professionnels",
          shortDescription: "Nettoyage professionnel récurrent",
          features: ["Contrats récurrents", "Hors heures", "Produits pro", "Personnel formé"],
        },
        {
          id: "syndrome-diogene",
          title: "Syndrome de Diogène",
          slug: "nettoyage-syndrome-diogene",
          icon: "shield",
          description: "Intervention spécialisée pour cas Diogène",
          shortDescription: "Prise en charge spécialisée",
          features: ["Discrétion absolue", "Équipement EPI", "Désinfection complète", "Accompagnement"],
        },
      ],
    },
  },

  zones: {
    departements: [
      { code: "75", name: "Paris" },
      { code: "77", name: "Seine-et-Marne" },
      { code: "78", name: "Yvelines" },
      { code: "91", name: "Essonne" },
      { code: "92", name: "Hauts-de-Seine" },
      { code: "93", name: "Seine-Saint-Denis" },
      { code: "94", name: "Val-de-Marne" },
      { code: "95", name: "Val-d'Oise" },
    ],
  },

  guarantees: [
    { text: "Intervention 24-48h", subtext: "selon urgence" },
    { text: "Devis gratuit", subtext: "& sans engagement" },
    { text: "Tri & recyclage", subtext: "écoresponsable" },
  ],

  testimonials: [
    {
      name: "Marie D.",
      location: "Paris 15e",
      rating: 5,
      text: "Service impeccable pour le débarras de l'appartement de ma mère. L'équipe était professionnelle et respectueuse.",
      service: "Débarras d'appartement",
      date: "Il y a 2 semaines",
    },
    {
      name: "Jean-Pierre L.",
      location: "Versailles (78)",
      rating: 5,
      text: "Très satisfait du débarras de ma cave. Rapide, efficace et prix correct. Je recommande vivement.",
      service: "Débarras de cave",
      date: "Il y a 1 mois",
    },
    {
      name: "Sophie M.",
      location: "Créteil (94)",
      rating: 5,
      text: "Excellent accompagnement pour le débarras après succession. Un grand merci pour votre professionnalisme.",
      service: "Débarras succession",
      date: "Il y a 3 semaines",
    },
    {
      name: "Thomas B.",
      location: "Nanterre (92)",
      rating: 5,
      text: "Intervention express pour notre déménagement d'entreprise. Tout s'est passé parfaitement, aucune interruption d'activité.",
      service: "Déménagement entreprise",
      date: "Il y a 1 semaine",
    },
    {
      name: "Isabelle R.",
      location: "Montreuil (93)",
      rating: 5,
      text: "Nettoyage impeccable après sinistre. Équipe réactive et très professionnelle. Merci pour votre aide précieuse.",
      service: "Nettoyage après sinistre",
      date: "Il y a 2 mois",
    },
    {
      name: "Philippe K.",
      location: "Évry (91)",
      rating: 5,
      text: "Débarras de garage effectué en moins de 3 heures. Très bon rapport qualité-prix, je recommande sans hésiter.",
      service: "Débarras garage",
      date: "Il y a 5 jours",
    },
  ],

  faqs: [
    {
      category: "Général",
      questions: [
        {
          q: "Quels types de biens débarrassez-vous ?",
          a: "Nous débarrassons tous types de biens : meubles, électroménager, vêtements, livres, objets divers, encombrants, gravats, etc. Notre équipe est équipée pour gérer tous types de volumes et matériaux.",
        },
        {
          q: "Intervenez-vous le week-end ?",
          a: "Oui, nous pouvons intervenir le week-end selon les disponibilités. Pour les entreprises, nous proposons également des interventions en soirée ou de nuit pour ne pas perturber votre activité.",
        },
        {
          q: "Faut-il être présent pendant le débarras ?",
          a: "Votre présence n'est pas obligatoire si vous nous fournissez un accès (clés, code). Cependant, nous recommandons votre présence au début pour les instructions et à la fin pour valider le travail effectué.",
        },
        {
          q: "Êtes-vous assurés ?",
          a: "Oui, nous disposons d'une assurance responsabilité civile professionnelle et d'une assurance décennale. Tous nos intervenants sont formés et équipés selon les normes de sécurité.",
        },
      ],
    },
    {
      category: "Tarifs",
      questions: [
        {
          q: "Comment sont calculés vos tarifs ?",
          a: "Nos tarifs dépendent de plusieurs facteurs : volume à débarrasser, accessibilité (étage, ascenseur), type de biens, urgence de l'intervention. Nous fournissons toujours un devis gratuit et détaillé après évaluation.",
        },
        {
          q: "Y a-t-il des frais cachés ?",
          a: "Non, nos devis sont transparents et tout compris : main d'œuvre, transport, évacuation en déchetterie, tri et recyclage. Le prix indiqué est le prix final.",
        },
        {
          q: "Proposez-vous un rachat d'objets de valeur ?",
          a: "Oui, si des objets de valeur sont identifiés (meubles anciens, antiquités, etc.), nous pouvons les racheter ou les déduire du montant du devis. Notre expertise nous permet d'identifier ces pièces.",
        },
        {
          q: "Puis-je obtenir un devis sans visite ?",
          a: "Pour les petits volumes, un devis peut être établi sur photos. Pour les débarras complets, nous recommandons une visite gratuite pour évaluer précisément le volume et l'accessibilité.",
        },
      ],
    },
    {
      category: "Processus",
      questions: [
        {
          q: "Combien de temps prend un débarras ?",
          a: "Cela dépend du volume : un studio (2-3h), un appartement F3 (4-6h), une maison complète (1-2 jours). Nous vous indiquons la durée estimée dans le devis.",
        },
        {
          q: "Que faites-vous des objets récupérés ?",
          a: "Nous adoptons une démarche écoresponsable : les objets en bon état sont donnés à des associations (Emmaüs, Secours Populaire), les matériaux recyclables sont triés et valorisés, seul le déchet ultime part en déchetterie.",
        },
        {
          q: "Fournissez-vous un certificat de destruction ?",
          a: "Oui, nous pouvons fournir un certificat de destruction ou d'évacuation, particulièrement utile pour les professionnels, les syndics ou dans le cadre de successions.",
        },
        {
          q: "Proposez-vous le nettoyage après débarras ?",
          a: "Oui, nous proposons systématiquement un nettoyage de finition après débarras (balayage, dépoussiérage). Pour un nettoyage plus approfondi, nous pouvons établir un devis complémentaire.",
        },
      ],
    },
    {
      category: "Urgences",
      questions: [
        {
          q: "Pouvez-vous intervenir en urgence ?",
          a: "Oui, nous proposons un service d'intervention rapide sous 24-48h selon votre urgence et nos disponibilités. Contactez-nous par téléphone pour une réponse immédiate.",
        },
        {
          q: "Intervenez-vous en cas de syndrome de Diogène ?",
          a: "Oui, nous avons une équipe formée pour les situations délicates comme le syndrome de Diogène. Nous intervenons avec discrétion, respect et les équipements de protection adaptés.",
        },
      ],
    },
  ],

  process: [
    {
      step: 1,
      title: "Demande de devis",
      description: "Remplissez notre formulaire en ligne ou appelez-nous directement",
      icon: "phone",
    },
    {
      step: 2,
      title: "Évaluation",
      description: "Nous évaluons le volume et vous envoyons un devis gratuit sous 24h",
      icon: "clipboard",
    },
    {
      step: 3,
      title: "Planification",
      description: "Nous fixons ensemble la date et l'heure d'intervention",
      icon: "calendar",
    },
    {
      step: 4,
      title: "Intervention",
      description: "Notre équipe procède au débarras complet, tri et nettoyage",
      icon: "check",
    },
  ],
} as const

export type ServiceCategory =
  | keyof typeof siteConfig.services.particulier
  | keyof typeof siteConfig.services.professionnel
