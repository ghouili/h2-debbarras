import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"

export function StatsSection() {
  const stats = homeCopy.stats.items

  return (
    <Section bleed className="bg-primary text-primary-foreground">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl font-bold md:text-5xl">{stat.value}</div>
            <div className="mt-2 text-sm opacity-90 md:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
