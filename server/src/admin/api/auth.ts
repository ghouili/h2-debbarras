import { api } from './client'
import type { User } from '../../../shared/schemas'

export const authApi = {
  login: (payload: { email: string; password: string }) =>
    api.post<{ user: User }>('/auth/login', payload),
  logout: () => api.post<{ ok: boolean }>('/auth/logout'),
  me: () => api.get<{ user: User }>('/auth/me')
}
