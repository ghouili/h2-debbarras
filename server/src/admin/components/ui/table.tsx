import type { HTMLAttributes, TableHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export const Table = ({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) => (
  <table className={cn('w-full text-sm', className)} {...props} />
)

export const TableHead = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('bg-muted text-xs uppercase text-muted-foreground', className)} {...props} />
)

export const TableBody = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('divide-y divide-border', className)} {...props} />
)

export const TableRow = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn('hover:bg-muted/50', className)} {...props} />
)

export const TableCell = ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('px-4 py-3', className)} {...props} />
)

export const TableHeaderCell = ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('px-4 py-3 text-left font-semibold', className)} {...props} />
)
