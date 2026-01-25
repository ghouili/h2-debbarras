/**
 * Zones Data for Local SEO
 *
 * This file contains comprehensive data for all intervention zones,
 * including department clusters, unique descriptions, and practical information.
 */

export type DepartmentCluster = "paris" | "petite-couronne" | "grande-couronne"

export type Department = {
  code: string
  name: string
  cluster: DepartmentCluster
  slug: string
  description: string
  practicalInfo: string
  mainCities: string[]
  accessNotes: string
}

export type ZoneCluster = {
  id: DepartmentCluster
  name: string
  description: string
  departments: string[] // department codes
  interventionTime: string
  features: string[]
}

// Zone clusters for Île-de-France
export const zoneClusters: ZoneCluster[] = [
  {
    id: "paris",
    name: "Paris",
    description:
      "Nous intervenons dans tous les arrondissements de Paris, du 1er au 20e. Nos équipes connaissent parfaitement les contraintes d'accès spécifiques à la capitale : stationnement réglementé, immeubles anciens sans ascenseur, cours intérieures étroites.",
    departments: ["75"],
    interventionTime: "24h",
    features: [
      "Expertise des immeubles haussmanniens",
      "Gestion du stationnement et autorisations",
      "Intervention en soirée possible",
      "Connaissance des passages et cours privées",
    ],
  },
  {
    id: "petite-couronne",
    name: "Petite Couronne",
    description:
      "La petite couronne (92, 93, 94) représente notre zone d'intervention privilégiée. Proches de Paris, ces départements présentent une grande diversité d'habitats : pavillons, HLM, résidences récentes. Nous y intervenons quotidiennement avec des délais très courts.",
    departments: ["92", "93", "94"],
    interventionTime: "24-48h",
    features: [
      "Connaissance des réseaux locaux",
      "Partenariats avec syndics et bailleurs",
      "Interventions fréquentes",
      "Équipes dédiées par secteur",
    ],
  },
  {
    id: "grande-couronne",
    name: "Grande Couronne",
    description:
      "Pour la grande couronne (77, 78, 91, 95), nous adaptons notre organisation logistique. Ces départements plus étendus comprennent davantage de maisons individuelles et de propriétés avec extérieurs. Nos équipes sont équipées pour gérer de grands volumes.",
    departments: ["77", "78", "91", "95"],
    interventionTime: "48-72h",
    features: [
      "Équipement pour grands volumes",
      "Véhicules adaptés aux zones rurales",
      "Intervention sur propriétés avec extérieurs",
      "Prise en charge des dépendances (granges, hangars)",
    ],
  },
]

// Detailed department data
export const departments: Department[] = [
  {
    code: "75",
    name: "Paris",
    cluster: "paris",
    slug: "paris-75",
    description:
      "Débarras professionnel dans tout Paris : appartements haussmanniens, studios, caves parisiennes. Nos équipes maîtrisent les contraintes spécifiques de la capitale.",
    practicalInfo:
      "Stationnement souvent réglementé, nous gérons les autorisations. Immeubles anciens fréquents, nos équipements sont adaptés aux escaliers étroits. Intervention possible en soirée pour minimiser les gênes.",
    mainCities: [
      "Paris 1er - Louvre",
      "Paris 2e - Bourse",
      "Paris 3e - Temple",
      "Paris 4e - Hôtel-de-Ville",
      "Paris 5e - Panthéon",
      "Paris 6e - Luxembourg",
      "Paris 7e - Palais-Bourbon",
      "Paris 8e - Élysée",
      "Paris 9e - Opéra",
      "Paris 10e - Enclos-Saint-Laurent",
      "Paris 11e - Popincourt",
      "Paris 12e - Reuilly",
      "Paris 13e - Gobelins",
      "Paris 14e - Observatoire",
      "Paris 15e - Vaugirard",
      "Paris 16e - Passy",
      "Paris 17e - Batignolles-Monceau",
      "Paris 18e - Montmartre",
      "Paris 19e - Buttes-Chaumont",
      "Paris 20e - Ménilmontant",
    ],
    accessNotes:
      "Prévoir l'étage et la présence d'ascenseur. Nombreux immeubles sans ascenseur dans les arrondissements historiques.",
  },
  {
    code: "92",
    name: "Hauts-de-Seine",
    cluster: "petite-couronne",
    slug: "hauts-de-seine-92",
    description:
      "Intervention rapide dans les Hauts-de-Seine : de Neuilly à Clamart, de Boulogne à Nanterre. Nous connaissons ce département mixte entre zones résidentielles et quartiers d'affaires.",
    practicalInfo:
      "Département dense avec un bon accès routier. Nombreuses résidences récentes avec parking souterrain. Interventions professionnelles fréquentes pour bureaux et commerces.",
    mainCities: [
      "Nanterre",
      "Boulogne-Billancourt",
      "Colombes",
      "Courbevoie",
      "Asnières-sur-Seine",
      "Rueil-Malmaison",
      "Levallois-Perret",
      "Issy-les-Moulineaux",
      "Neuilly-sur-Seine",
      "Antony",
      "Clamart",
      "Clichy",
      "Gennevilliers",
      "La Garenne-Colombes",
      "Suresnes",
    ],
    accessNotes:
      "Accès généralement facilité par les axes routiers. Parkings souterrains fréquents dans les résidences.",
  },
  {
    code: "93",
    name: "Seine-Saint-Denis",
    cluster: "petite-couronne",
    slug: "seine-saint-denis-93",
    description:
      "Débarras en Seine-Saint-Denis : de Saint-Denis à Montreuil, de Bobigny à Aubervilliers. Notre équipe intervient aussi bien dans les pavillons que dans les logements collectifs.",
    practicalInfo:
      "Habitat diversifié : grands ensembles, pavillons, zones industrielles en reconversion. Interventions régulières pour successions et vides logements sociaux.",
    mainCities: [
      "Saint-Denis",
      "Montreuil",
      "Aubervilliers",
      "Aulnay-sous-Bois",
      "Drancy",
      "Noisy-le-Grand",
      "Pantin",
      "Bondy",
      "Épinay-sur-Seine",
      "Sevran",
      "Bobigny",
      "Saint-Ouen",
      "Livry-Gargan",
      "Rosny-sous-Bois",
      "Le Blanc-Mesnil",
    ],
    accessNotes:
      "Prévoir les accès spécifiques pour les résidences avec digicodes. Étages élevés fréquents dans les grands ensembles.",
  },
  {
    code: "94",
    name: "Val-de-Marne",
    cluster: "petite-couronne",
    slug: "val-de-marne-94",
    description:
      "Intervention dans le Val-de-Marne : Créteil, Vitry, Champigny, Vincennes et toutes les communes. Mix équilibré entre pavillons de banlieue et immeubles collectifs.",
    practicalInfo:
      "Département bien desservi par les transports. Pavillons avec jardins fréquents, nécessitant parfois l'évacuation de dépendances (cabanons, abris de jardin).",
    mainCities: [
      "Créteil",
      "Vitry-sur-Seine",
      "Champigny-sur-Marne",
      "Saint-Maur-des-Fossés",
      "Ivry-sur-Seine",
      "Maisons-Alfort",
      "Fontenay-sous-Bois",
      "Villejuif",
      "Vincennes",
      "Alfortville",
      "Nogent-sur-Marne",
      "Le Perreux-sur-Marne",
      "Thiais",
      "Cachan",
      "Boissy-Saint-Léger",
    ],
    accessNotes:
      "Pavillons avec jardins : prévoir l'accès aux dépendances extérieures. Bonnes conditions de stationnement en général.",
  },
  {
    code: "91",
    name: "Essonne",
    cluster: "grande-couronne",
    slug: "essonne-91",
    description:
      "Débarras en Essonne : d'Évry à Massy, de Corbeil à Sainte-Geneviève-des-Bois. Nous intervenons dans ce département varié mêlant zones urbaines et communes plus rurales.",
    practicalInfo:
      "Département étendu avec une forte proportion de maisons individuelles. Prévoir un délai légèrement supérieur pour les communes éloignées. Véhicules de grande capacité disponibles.",
    mainCities: [
      "Évry-Courcouronnes",
      "Corbeil-Essonnes",
      "Massy",
      "Savigny-sur-Orge",
      "Sainte-Geneviève-des-Bois",
      "Viry-Châtillon",
      "Athis-Mons",
      "Palaiseau",
      "Yerres",
      "Draveil",
      "Brunoy",
      "Les Ulis",
      "Montgeron",
      "Ris-Orangis",
      "Grigny",
    ],
    accessNotes:
      "Maisons individuelles avec caves et greniers fréquents. Prévoir l'accès aux combles et sous-sols.",
  },
  {
    code: "78",
    name: "Yvelines",
    cluster: "grande-couronne",
    slug: "yvelines-78",
    description:
      "Intervention dans les Yvelines : Versailles, Saint-Germain-en-Laye, Sartrouville et au-delà. Département résidentiel avec de nombreuses propriétés de standing.",
    practicalInfo:
      "Forte proportion de maisons bourgeoises et propriétés avec dépendances. Interventions fréquentes pour successions de grandes propriétés. Équipe formée à la manipulation d'objets anciens.",
    mainCities: [
      "Versailles",
      "Sartrouville",
      "Mantes-la-Jolie",
      "Saint-Germain-en-Laye",
      "Poissy",
      "Conflans-Sainte-Honorine",
      "Montigny-le-Bretonneux",
      "Les Mureaux",
      "Houilles",
      "Plaisir",
      "Chatou",
      "Le Chesnay-Rocquencourt",
      "Trappes",
      "Rambouillet",
      "Maisons-Laffitte",
    ],
    accessNotes:
      "Propriétés souvent spacieuses avec greniers, caves et dépendances. Prévoir le volume total incluant les annexes.",
  },
  {
    code: "95",
    name: "Val-d'Oise",
    cluster: "grande-couronne",
    slug: "val-doise-95",
    description:
      "Débarras dans le Val-d'Oise : Argenteuil, Cergy, Sarcelles et toutes les communes du département. Zone mixte entre urbanisation dense et communes plus vertes.",
    practicalInfo:
      "Département contrasté entre le sud urbanisé et le nord plus rural. Interventions régulières à Cergy-Pontoise et dans les villes nouvelles. Véhicules adaptés aux différents contextes.",
    mainCities: [
      "Argenteuil",
      "Cergy",
      "Sarcelles",
      "Garges-lès-Gonesse",
      "Pontoise",
      "Bezons",
      "Franconville",
      "Goussainville",
      "Ermont",
      "Villiers-le-Bel",
      "Taverny",
      "Herblay-sur-Seine",
      "Montmorency",
      "Eaubonne",
      "Cormeilles-en-Parisis",
    ],
    accessNotes:
      "Accès variable selon les zones. Prévoir les conditions de stationnement pour les zones urbanisées.",
  },
  {
    code: "77",
    name: "Seine-et-Marne",
    cluster: "grande-couronne",
    slug: "seine-et-marne-77",
    description:
      "Intervention en Seine-et-Marne : de Meaux à Melun, de Chelles à Fontainebleau. Plus grand département francilien, nous y intervenons avec une logistique adaptée.",
    practicalInfo:
      "Département très étendu avec de nombreuses propriétés rurales. Prévoir un délai d'intervention de 48-72h selon l'éloignement. Équipement pour grands volumes et dépendances agricoles.",
    mainCities: [
      "Meaux",
      "Chelles",
      "Melun",
      "Pontault-Combault",
      "Savigny-le-Temple",
      "Champs-sur-Marne",
      "Villeparisis",
      "Torcy",
      "Roissy-en-Brie",
      "Combs-la-Ville",
      "Le Mée-sur-Seine",
      "Dammarie-les-Lys",
      "Lagny-sur-Marne",
      "Ozoir-la-Ferrière",
      "Bussy-Saint-Georges",
    ],
    accessNotes:
      "Propriétés souvent avec terrain et dépendances. Distance variable depuis Paris, prévoir le délai en conséquence.",
  },
]

// FAQs specific to zones
export const zonesFaqs = [
  {
    q: "Intervenez-vous dans toutes les communes d'Île-de-France ?",
    a: "Oui, nous couvrons l'ensemble des 8 départements franciliens : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Essonne (91), Yvelines (78), Val-d'Oise (95) et Seine-et-Marne (77). Toutes les communes sont accessibles.",
  },
  {
    q: "Y a-t-il des frais de déplacement supplémentaires ?",
    a: "Non, nos devis incluent tous les frais de déplacement pour l'Île-de-France. Le tarif dépend uniquement du volume à débarrasser et des conditions d'accès, pas de la distance. Vous recevez un devis tout compris.",
  },
  {
    q: "Quels sont vos délais d'intervention selon les zones ?",
    a: "Paris et petite couronne (92, 93, 94) : intervention possible sous 24-48h. Grande couronne (77, 78, 91, 95) : comptez 48-72h pour l'organisation logistique. En cas d'urgence, contactez-nous par téléphone.",
  },
  {
    q: "Comment estimez-vous le volume à débarrasser ?",
    a: "Nous évaluons le volume en mètres cubes (m³) à partir de photos ou lors d'une visite gratuite. Un studio représente généralement 10-15 m³, un appartement 3 pièces 20-30 m³, une maison 40-80 m³.",
  },
  {
    q: "Que se passe-t-il si mon logement est difficile d'accès ?",
    a: "Nous sommes équipés pour gérer les accès difficiles : escaliers étroits, absence d'ascenseur, cours intérieures, étages élevés. Ces contraintes sont intégrées dans le devis initial sans surprise.",
  },
  {
    q: "Prenez-vous en charge les caves et greniers ?",
    a: "Oui, nous débarrassons tous types d'espaces : appartements, maisons, caves, greniers, garages, dépendances, cabanons de jardin. Le devis inclut l'ensemble des espaces à vider.",
  },
  {
    q: "Intervenez-vous pour les professionnels dans ces zones ?",
    a: "Absolument. Nous proposons des prestations dédiées aux professionnels : bureaux, locaux commerciaux, entrepôts. Intervention possible en dehors des heures ouvrées et les week-ends.",
  },
  {
    q: "Comment savoir si vous intervenez chez moi ?",
    a: "Entrez votre code postal dans notre vérificateur ci-dessus. Si votre code commence par 75, 77, 78, 91, 92, 93, 94 ou 95, nous intervenons chez vous. Pour les zones limitrophes, contactez-nous.",
  },
]

// Get department by code
export function getDepartmentByCode(code: string): Department | undefined {
  return departments.find((d) => d.code === code)
}

// Get departments by cluster
export function getDepartmentsByCluster(cluster: DepartmentCluster): Department[] {
  return departments.filter((d) => d.cluster === cluster)
}

// Get cluster by department code
export function getClusterByDepartment(code: string): ZoneCluster | undefined {
  return zoneClusters.find((c) => c.departments.includes(code))
}

// Check if postal code is covered
export function isPostalCodeCovered(postalCode: string): boolean {
  if (!postalCode || postalCode.length < 2) return false
  const prefix = postalCode.substring(0, 2)
  return ["75", "77", "78", "91", "92", "93", "94", "95"].includes(prefix)
}

// Get department from postal code
export function getDepartmentFromPostalCode(postalCode: string): Department | undefined {
  if (!postalCode || postalCode.length < 2) return undefined
  const prefix = postalCode.substring(0, 2)
  return getDepartmentByCode(prefix)
}
