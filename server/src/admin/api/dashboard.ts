import { api } from './client'

export type DashboardData = {
  contacts: Record<'NEW' | 'IN_PROGRESS' | 'CLOSED', number>
  quoteRequests: Record<'NEW' | 'QUALIFIED' | 'SCHEDULED' | 'DONE' | 'LOST', number>
}

export const dashboardApi = {
  get: () => api.get<DashboardData>('/dashboard')
}
