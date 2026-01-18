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
    <Section className="border-b border-border bg-white py-8 md:py-12">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {badges.map((badge) => {
          const Icon = badge.icon
          return (
            <div key={badge.label} className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{badge.label}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
