import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
}

export const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
    {action ? <div>{action}</div> : null}
  </div>
)
