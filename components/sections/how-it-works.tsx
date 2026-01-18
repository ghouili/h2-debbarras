import { homeCopy } from "@/lib/content/home-copy"
import { Section } from "@/components/layout/section"

export function HowItWorks() {
  const copy = homeCopy.howItWorks

  return (
    <Section bleed className="bg-secondary">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{copy.title}</h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">{copy.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {copy.steps.map((item, index) => (
          <div key={`${item.title}-${index}`} className="relative">
            {index < copy.steps.length - 1 && (
              <div className="absolute top-8 left-1/2   hidden h-0.5 w-full bg-border lg:block" />
            )}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {index + 1}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-pretty text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
