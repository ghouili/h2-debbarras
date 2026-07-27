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
                <strong>Raison sociale :</strong> {siteConfig.legal.raisonSociale}
              </li>
              <li>
                <strong>Forme juridique :</strong> {siteConfig.legal.formeJuridique}
              </li>
              <li>
                <strong>Siège social :</strong> {siteConfig.legal.address.full}
              </li>
              <li>
                <strong>SIREN :</strong> {siteConfig.legal.siren}
              </li>
              <li>
                <strong>SIRET (siège) :</strong> {siteConfig.legal.siret}
              </li>
              <li>
                <strong>RCS :</strong> {siteConfig.legal.rcs} (immatriculée le{" "}
                {siteConfig.legal.dateImmatriculation})
              </li>
              <li>
                <strong>N° TVA intracommunautaire :</strong> {siteConfig.legal.tva}
              </li>
              {/* Capital social : à compléter
              <li>
                <strong>Capital social :</strong> {siteConfig.legal.capitalSocial}
              </li>
              */}
              <li>
                <strong>Email :</strong> <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
              <li>
                <strong>Téléphone :</strong> {siteConfig.contact.phone}
              </li>
            </ul>

            {/* Directeur de publication : à compléter
            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              Directeur de publication
            </h2>
            <p>[nom et prénom du directeur de publication]</p>
            */}

            {/* Hébergeur : à compléter
            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              Hébergeur
            </h2>
            <p>
              Le site est hébergé par ---------------------- (hébergeur).
              <br />
              [adresse de l'hébergeur]
            </p>
            */}

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              2. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de {siteConfig.name}
              ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              3. Données personnelles
            </h2>
            <p>
              Les informations collectées via ce site sont traitées pour répondre à vos demandes et assurer le suivi
              commercial. Pour plus d'informations, consultez notre <a href="/politique-confidentialite">politique de confidentialité</a>.
            </p>

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              4. Responsabilité
            </h2>
            <p>
              {siteConfig.name} s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, nous
              ne pouvons garantir l'absence d'erreurs ou d'omissions. Les informations fournies le sont à titre
              indicatif.
            </p>

            <h2 className={cn(designTokens.typography.h3, designTokens.textScale["2xl"], "mt-6")}>
              5. Contact
            </h2>
            <p>
              Pour toute question, vous pouvez nous contacter via la page <a href="/contact">Contact</a> ou par email
              à <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
            </p>

            <p className={cn(designTokens.textScale.base, "mt-6 text-muted-foreground")}>
              Dernière mise à jour : 20 janvier 2026
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
