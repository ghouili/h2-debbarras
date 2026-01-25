import { api } from './client'
import type { User } from '../../../shared/schemas'
import type { PaginatedResponse } from '../types'

export const usersApi = {
  list: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.set(key, String(value))
      }
    })

    return api.get<PaginatedResponse<User>>(`/users?${searchParams.toString()}`)
  },
  get: (id: string) => api.get<{ user: User }>(`/users/${id}`),
  create: (payload: {
    email: string
    password: string
    fullName: string
    role: 'ADMIN' | 'STAFF'
    isActive?: boolean
  }) => api.post<{ user: User }>('/users', payload),
  update: (id: string, payload: Partial<{ email: string; password: string; fullName: string; role: string; isActive: boolean }>) =>
    api.put<{ user: User }>(`/users/${id}`, payload),
  remove: (id: string) => api.delete(`/users/${id}`)
}
