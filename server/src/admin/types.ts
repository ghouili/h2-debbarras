export type ApiError = {
  error: {
    code: string
    message: string
    details?: Array<{ path: string; message: string }>
  }
}

export type PaginatedResponse<T> = {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
  }
}
