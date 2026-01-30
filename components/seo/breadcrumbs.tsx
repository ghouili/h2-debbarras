import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className={cn(
          designTokens.textScale.sm,
          "flex flex-wrap items-center gap-2 text-muted-foreground",
        )}
      >
        <li className="flex items-center gap-2">
          <Link href="/" className="-m-2 flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-muted hover:text-foreground">
            <Home className="h-4 w-4" />
            <span className="sr-only">Accueil</span>
          </Link>
          <ChevronRight className="h-4 w-4" />
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
                {index < items.length - 1 && <ChevronRight className="h-4 w-4" />}
              </>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
