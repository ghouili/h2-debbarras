import { Button } from './ui/button'

type PaginationProps = {
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ page, total, limit, onPageChange }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Page {page} sur {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>
          Précédent
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}
