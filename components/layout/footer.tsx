import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { PageContainer } from "./page-container"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerServices = siteConfig.services.particulier.debarras.slice(0, 4)

  return (
    <footer className="border-t border-border bg-secondary">
      <PageContainer className="py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Image src="/logo.png" alt={siteConfig.name} width={140} height={35} className=" h-16 w-auto" />
            <p className="text-pretty text-sm text-muted-foreground">
              Votre partenaire de confiance pour tous vos besoins de débarras en Île-de-France.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground transition-colors hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/zones" className="text-muted-foreground transition-colors hover:text-foreground">
                  Zones d'intervention
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="text-muted-foreground transition-colors hover:text-foreground">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Nos services</h3>
            <ul className="space-y-2 text-sm">
              {footerServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-foreground">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              © {currentYear} {siteConfig.name}. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Link href="/mentions-legales" className="transition-colors hover:text-foreground">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="transition-colors hover:text-foreground">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
}
