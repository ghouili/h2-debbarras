import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"

export function StatsSection() {
  const stats = homeCopy.stats.items

  return (
    <Section bleed className="bg-primary text-primary-foreground">
      <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4" role="list" aria-label="Nos chiffres clés">
        {stats.map((stat) => (
          <li key={stat.label} className="text-center">
            <div className="text-2xl font-bold sm:text-3xl lg:text-4xl">{stat.value}</div>
            <div className="mt-1 text-xs opacity-90 sm:text-sm">{stat.label}</div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
