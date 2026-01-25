import { api } from './client'
import type { Contact } from '../../../shared/schemas'
import type { PaginatedResponse } from '../types'

export const contactsApi = {
  list: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.set(key, String(value))
      }
    })

    return api.get<PaginatedResponse<Contact>>(`/contacts?${searchParams.toString()}`)
  },
  get: (id: string) => api.get<{ contact: Contact }>(`/contacts/${id}`),
  create: (payload: Partial<Contact>) => api.post<{ contact: Contact }>('/contacts', payload),
  update: (id: string, payload: Partial<Contact>) => api.put<{ contact: Contact }>(`/contacts/${id}`, payload),
  remove: (id: string) => api.delete(`/contacts/${id}`)
}
