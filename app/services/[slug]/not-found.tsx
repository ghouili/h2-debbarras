import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

export default function ServiceNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className={cn(designTokens.typography.h2, "mt-4 text-2xl")}>
          Service non trouvé
        </h1>
        <p className="mt-2 text-muted-foreground">
          Le service que vous recherchez n'existe pas ou a été déplacé.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voir tous les services
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
