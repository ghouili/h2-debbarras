import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/config"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Section } from "@/components/layout/section"

export const metadata: Metadata = {
  title: "Politique de confidentialité | Débarras Aurea",
  description:
    "Politique de confidentialité RGPD de Débarras Aurea : données collectées, finalités, bases légales, droits et cookies.",
  alternates: {
    canonical: `${siteConfig.url}/politique-confidentialite`,
  },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <h1 className={cn(designTokens.typography.h1, "mb-6 text-3xl sm:text-4xl")}>
          Politique de confidentialité
        </h1>

        <Card className="mb-6">
          <CardContent className="prose prose-sm max-w-none p-6">
            <h2 className={cn(designTokens.typography.h3, "text-2xl")}>1. Responsable du traitement</h2>
            <p>
              {siteConfig.name} est responsable du traitement des données personnelles collectées via ce site.
              <br />
              Contact RGPD : <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              <br />
              DPO : ---------------------------------
            </p>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>2. Données collectées</h2>
            <ul>
              <li>Données d'identité et de contact (nom, prénom, email, téléphone)</li>
              <li>Données liées à la demande (adresse, code postal, message, informations de devis)</li>
              <li>Données de navigation (adresse IP, user-agent, logs techniques)</li>
              <li>Événements de navigation (ex. clics sur les appels) si la mesure est activée</li>
            </ul>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>3. Finalités</h2>
            <ul>
              <li>Répondre aux demandes de devis et de contact</li>
              <li>Gestion commerciale et suivi des demandes</li>
              <li>Amélioration du site et des services</li>
              <li>Sécurité et prévention des abus</li>
              <li>Mesure d'audience, si activée</li>
            </ul>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>4. Bases légales</h2>
            <ul>
              <li>Mesures précontractuelles (réponse à une demande de devis)</li>
              <li>Intérêt légitime (sécurité, amélioration du site)</li>
              <li>Consentement lorsque requis (cookies non essentiels)</li>
              <li>Obligations légales, le cas échéant</li>
            </ul>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>5. Destinataires</h2>
            <p>
              Vos données sont accessibles par l'équipe interne habilitée et nos sous-traitants techniques.
              <br />
              Hébergeur : ----------------------
              <br />
              Autres sous-traitants (email, CRM, analytics) : -----------------------
            </p>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>6. Durées de conservation</h2>
            <ul>
              <li>Leads / devis : ----------------------</li>
              <li>Logs techniques : ----------------------</li>
              <li>Mesure d'audience : ----------------------</li>
            </ul>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>7. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation</li>
              <li>Droit d'opposition</li>
              <li>Droit à la portabilité</li>
              <li>Retrait du consentement lorsque applicable</li>
            </ul>
            <p>
              Pour exercer vos droits, contactez-nous à :{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>. Nous répondons dans les
              meilleurs délais.
            </p>
            <p>
              Vous pouvez également déposer une réclamation auprès de la CNIL : <a href="https://www.cnil.fr">www.cnil.fr</a>.
            </p>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>8. Cookies et traceurs</h2>
            <p>
              Des cookies peuvent être utilisés pour le fonctionnement du site, la mesure d'audience et, le cas échéant,
              des finalités marketing. Les cookies non essentiels nécessitent votre consentement. Certaines mesures
              d'audience peuvent être exemptées de consentement sous conditions (référentiel CNIL).
            </p>
            <p>
              Paramétrage des cookies : ----------------------
            </p>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>9. Transferts hors UE</h2>
            <p>
              Certains sous-traitants peuvent traiter des données hors de l'Union européenne. Le cas échéant, des
              garanties appropriées (ex. clauses contractuelles types) sont mises en place.
              <br />
              ----------------------
            </p>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>10. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles proportionnées pour protéger vos données
              (contrôles d'accès, minimisation, sauvegardes, etc.).
            </p>

            <h2 className={cn(designTokens.typography.h3, "mt-6 text-2xl")}>11. Contact</h2>
            <p>
              Pour toute question, contactez-nous via la page <a href="/contact">Contact</a> ou par téléphone au {siteConfig.contact.phone}.
            </p>

            <p className="mt-6 text-sm text-muted-foreground">Dernière mise à jour : 20 janvier 2026</p>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
