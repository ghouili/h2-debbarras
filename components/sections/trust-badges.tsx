import { Shield, Recycle, Clock, Award } from "lucide-react"
import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"

export function TrustBadges() {
  const icons = [Clock, Shield, Recycle, Award]

  const badges = homeCopy.benefitsRow.items.map((label, index) => ({
    icon: icons[index] ?? Clock,
    label,
  }))

  return (
    <Section className="border-b border-border bg-white py-5 sm:py-6 md:py-8">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4" aria-label="Nos garanties">
        {badges.map((badge) => {
          const Icon = badge.icon
          return (
            <li key={badge.label} className="flex flex-col items-center gap-1.5 sm:gap-2 text-center">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground">{badge.label}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
