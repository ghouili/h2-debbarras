import { api } from './client'
import type { QuoteRequest } from '../../../shared/schemas'
import type { PaginatedResponse } from '../types'

export const quoteRequestsApi = {
  list: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.set(key, String(value))
      }
    })

    return api.get<PaginatedResponse<QuoteRequest>>(`/quote-requests?${searchParams.toString()}`)
  },
  get: (id: string) => api.get<{ quoteRequest: QuoteRequest }>(`/quote-requests/${id}`),
  create: (payload: Partial<QuoteRequest>) =>
    api.post<{ quoteRequest: QuoteRequest }>('/quote-requests', payload),
  update: (id: string, payload: Partial<QuoteRequest>) =>
    api.put<{ quoteRequest: QuoteRequest }>(`/quote-requests/${id}`, payload),
  remove: (id: string) => api.delete(`/quote-requests/${id}`)
}
