import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site H2 Débarras Maison.",
  robots: {
    index: false,
  },
}

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Mentions légales</h1>

        <Card className="mb-6">
          <CardContent className="prose prose-sm max-w-none p-6">
            <h2 className="text-2xl font-semibold">1. Présentation du site</h2>
            <p>
              Le site {siteConfig.url} est édité par {siteConfig.name}, société de débarras professionnelle basée en
              Île-de-France.
            </p>

            <h2 className="mt-6 text-2xl font-semibold">2. Coordonnées</h2>
            <ul>
              <li>
                <strong>Raison sociale :</strong> {siteConfig.name}
              </li>
              <li>
                <strong>Adresse :</strong> {siteConfig.contact.address}
              </li>
              <li>
                <strong>Email :</strong> <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
              <li>
                <strong>Téléphone :</strong> {siteConfig.contact.phone}
              </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold">3. Directeur de publication</h2>
            <p>[Nom du directeur de publication à compléter]</p>

            <h2 className="mt-6 text-2xl font-semibold">4. Hébergement</h2>
            <p>
              Le site est hébergé par Vercel Inc.
              <br />
              340 S Lemon Ave #4133
              <br />
              Walnut, CA 91789
            </p>

            <h2 className="mt-6 text-2xl font-semibold">5. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de {siteConfig.name}{" "}
              ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>

            <h2 className="mt-6 text-2xl font-semibold">6. Données personnelles</h2>
            <p>
              Les informations recueillies sur ce site font l'objet d'un traitement informatique destiné à traiter vos
              demandes. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de
              vos données. Pour plus d'informations, consultez notre politique de confidentialité.
            </p>

            <h2 className="mt-6 text-2xl font-semibold">7. Responsabilité</h2>
            <p>
              {siteConfig.name} s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, nous
              ne pouvons garantir l'absence d'erreurs ou d'omissions. Les informations fournies le sont à titre
              indicatif.
            </p>

            <p className="mt-6 text-sm text-muted-foreground">Dernière mise à jour : Décembre 2024</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
