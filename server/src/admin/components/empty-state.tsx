import type { ReactNode } from 'react'

export const EmptyState = ({
  title,
  description,
  action
}: {
  title: string
  description?: string
  action?: ReactNode
}) => (
  <div className="rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center">
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
    {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
  </div>
)
