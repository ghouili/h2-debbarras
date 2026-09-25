import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

export function StatsSection() {
  const stats = homeCopy.stats.items

  return (
    <Section bleed className="bg-primary text-primary-foreground">
      <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4" aria-label="Nos chiffres clés">
        {stats.map((stat) => (
          <li key={stat.label} className="text-center">
            <div className={cn(designTokens.textScale["2xl3xl4xl"], "font-bold")}>
              {stat.value}
            </div>
            <div className={cn(designTokens.textScale.xs, "mt-1 opacity-90")}>
              {stat.label}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
