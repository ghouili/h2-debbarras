import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/config"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Section } from "@/components/layout/section"

export const metadata: Metadata = {
  title: "Mentions légales | Débarras Aurea",
  description:
    "Mentions légales du site Débarras Aurea : éditeur, hébergeur, propriété intellectuelle et contact.",
  alternates: {
    canonical: `${siteConfig.url}/mentions-legales`,
  },
}

export default function MentionsLegalesPage() {
  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <h1
          className={cn(
            designTokens.typography.h1,
            designTokens.textScale["3xl4xl"],
            "mb-6",
          )}
        >
          Mentions légales
        </h1>

        <Card className="mb-6">
          <CardContent className="prose prose-sm max-w-none p-6">
            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"])}>
              1. Éditeur du site
            </h2>
            <p>
              Le site {siteConfig.url} est édité par {siteConfig.name}.
            </p>
            <ul>
              <li>
                <strong>Raison sociale :</strong> {siteConfig.name}
              </li>
              <li>
                <strong>Forme juridique :</strong> -----------------------
              </li>
              <li>
                <strong>Siège social :</strong> -----------------------
              </li>
              <li>
                <strong>SIRET :</strong> -----------------------
              </li>
              <li>
                <strong>RCS / RNE :</strong> -----------------------
              </li>
              <li>
                <strong>Capital social :</strong> -----------------------
              </li>
              <li>
                <strong>Email :</strong> <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
              <li>
                <strong>Téléphone :</strong> {siteConfig.contact.phone}
              </li>
              <li>
                <strong>Adresse de contact :</strong> {siteConfig.contact.address}
              </li>
            </ul>

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              2. Directeur de publication
            </h2>
            <p>[TODO : nom et prénom du directeur de publication]</p>

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              3. Hébergeur
            </h2>
            <p>
              Le site est hébergé par ---------------------- (hébergeur).
              <br />
              340 S Lemon Ave #4133
              <br />
              Walnut, CA 91789, USA
              <br />
              <span className="text-muted-foreground">
                [TODO : vérifier l'adresse et ajouter un contact téléphonique si requis]
              </span>
            </p>

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              4. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de {siteConfig.name}
              ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              5. Données personnelles
            </h2>
            <p>
              Les informations collectées via ce site sont traitées pour répondre à vos demandes et assurer le suivi
              commercial. Pour plus d'informations, consultez notre <a href="/politique-confidentialite">politique de confidentialité</a>.
            </p>

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              6. Responsabilité
            </h2>
            <p>
              {siteConfig.name} s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, nous
              ne pouvons garantir l'absence d'erreurs ou d'omissions. Les informations fournies le sont à titre
              indicatif.
            </p>

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              7. Contact
            </h2>
            <p>
              Pour toute question, vous pouvez nous contacter via la page <a href="/contact">Contact</a> ou par email
              à <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
            </p>

            <p className={cn(designTokens.textScale.sm, "mt-6 text-muted-foreground")}>
              Dernière mise à jour : 20 janvier 2026
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
