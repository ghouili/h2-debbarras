import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de protection des données personnelles de H2 Débarras Maison.",
  robots: {
    index: false,
  },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Politique de confidentialité</h1>

        <Card className="mb-6">
          <CardContent className="prose prose-sm max-w-none p-6">
            <h2 className="text-2xl font-semibold">1. Collecte des données</h2>
            <p>
              {siteConfig.name} collecte des données personnelles lorsque vous remplissez notre formulaire de devis ou
              nous contactez. Les données collectées incluent : nom, prénom, email, téléphone, adresse.
            </p>

            <h2 className="mt-6 text-2xl font-semibold">2. Utilisation des données</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul>
              <li>Répondre à vos demandes de devis</li>
              <li>Vous contacter concernant nos services</li>
              <li>Améliorer nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">3. Conservation des données</h2>
            <p>
              Vos données sont conservées pendant 3 ans à compter de notre dernier contact. Passé ce délai, elles sont
              supprimées de nos systèmes.
            </p>

            <h2 className="mt-6 text-2xl font-semibold">4. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d'opposition</li>
              <li>Droit à la portabilité</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            </p>

            <h2 className="mt-6 text-2xl font-semibold">5. Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience et analyser notre trafic. Vous pouvez gérer
              vos préférences de cookies via le banner affiché lors de votre première visite.
            </p>

            <h2 className="mt-6 text-2xl font-semibold">6. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
              contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>

            <h2 className="mt-6 text-2xl font-semibold">7. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité, contactez-nous :
              <br />
              Email : <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              <br />
              Téléphone : {siteConfig.contact.phone}
            </p>

            <p className="mt-6 text-sm text-muted-foreground">Dernière mise à jour : Décembre 2024</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
