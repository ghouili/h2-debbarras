"use client"
import { Building, Home, Warehouse, Briefcase } from "lucide-react"
import { siteConfig } from "@/lib/config"
import type { QuoteFormData } from "../quote-funnel"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

const iconMap = {
  building: Building,
  home: Home,
  warehouse: Warehouse,
  briefcase: Briefcase,
}

type Props = {
  formData: QuoteFormData
  updateFormData: (data: Partial<QuoteFormData>) => void
  nextStep: () => void
}

export function ServiceStep({ formData, updateFormData, nextStep }: Props) {
  const handleSelect = (serviceId: string) => {
    updateFormData({ service: serviceId })
    setTimeout(nextStep, 300)
  }

  const allServices = [
    ...siteConfig.services.particulier.debarras,
    ...siteConfig.services.particulier.demenagement,
  ]

  return (
    <div>
      <h2
        className={cn(
          designTokens.textScale["2xl"],
          "mb-6 font-semibold font-heading",
        )}
      >
        Quel type de service souhaitez-vous ?
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {allServices.map((service) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap] || Home
          return (
            <button
              key={service.id}
              onClick={() => handleSelect(service.id)}
              className={`flex items-start gap-4 rounded-lg border-2 p-4 text-left transition-all hover:border-primary ${
                formData.service === service.id ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold font-heading">{service.title}</h3>
                <p className={cn(designTokens.textScale.sm, "text-pretty text-muted-foreground")}>
                  {service.shortDescription}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
