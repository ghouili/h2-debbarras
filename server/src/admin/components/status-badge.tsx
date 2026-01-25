import { Badge } from './ui/badge'

const statusStyles: Record<string, string> = {
  NEW: 'bg-accent text-accent-foreground',
  IN_PROGRESS: 'bg-warning/15 text-warning',
  CLOSED: 'bg-success/15 text-success',
  QUALIFIED: 'bg-primary/15 text-primary',
  SCHEDULED: 'bg-warning/15 text-warning',
  DONE: 'bg-success/15 text-success',
  LOST: 'bg-danger/15 text-danger'
}

export const StatusBadge = ({ status }: { status: string }) => (
  <Badge className={statusStyles[status] ?? 'bg-muted text-muted-foreground'}>{status}</Badge>
)
