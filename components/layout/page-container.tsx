import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[86vw] px-0 sm:px-6 lg:px-8", className)}>{children}</div>
}
