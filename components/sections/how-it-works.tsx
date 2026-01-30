import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"
import { designTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

export function HowItWorks() {
  const copy = homeCopy.howItWorks

  return (
    <Section bleed className="bg-secondary">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={cn(
            designTokens.typography.h2,
            designTokens.textScale["2xl3xl"],
            "text-balance",
          )}
        >
          {copy.title}
        </h2>
        <p
          className={cn(
            designTokens.textScale.baseLg,
            "mt-3 text-pretty text-muted-foreground",
          )}
        >
          {copy.subtitle}
        </p>
      </div>

      <ol className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((item, index) => (
          <li key={`${item.title}-${index}`} className="relative">
            {index < copy.steps.length - 1 && (
              <div className="absolute top-6 left-1/2 hidden h-0.5 w-full bg-border lg:block" aria-hidden="true" />
            )}
            <div className="relative flex flex-col items-center text-center">
              <div
                className={cn(
                  designTokens.textScale.baseLg,
                  "mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground sm:h-14 sm:w-14",
                )}
                aria-hidden="true"
              >
                {index + 1}
              </div>
              <h3
                className={cn(
                  designTokens.typography.h4,
                  designTokens.textScale.baseLg,
                  "mb-1.5",
                )}
              >
                {item.title}
              </h3>
              <p className={cn(designTokens.textScale.base, "text-pretty text-muted-foreground")}>
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
