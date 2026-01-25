export type PaginationParams = {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
}

export const getPagination = (query: Record<string, unknown>): PaginationParams => {
  const page = Math.max(1, Number(query.page ?? 1))
  const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)))
  const sort = typeof query.sort === 'string' ? query.sort : undefined
  const order = query.order === 'asc' ? 'asc' : 'desc'

  return { page, limit, sort, order }
}
