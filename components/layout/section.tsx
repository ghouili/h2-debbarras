import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { PageContainer } from "./page-container"

interface SectionProps {
  children: ReactNode
  className?: string
  bleed?: boolean
  containerClassName?: string
}

export function Section({ children, className, bleed = false, containerClassName }: SectionProps) {
  const basePadding = "py-12 md:py-16"

  if (bleed) {
    return (
      <section className={cn(basePadding, className)}>
        <PageContainer className={containerClassName}>{children}</PageContainer>
      </section>
    )
  }

  return (
    <section className={cn(basePadding, className)}>
      <PageContainer className={containerClassName}>{children}</PageContainer>
    </section>
  )
}
