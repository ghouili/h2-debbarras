import type { ApiError } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const getCsrfToken = () => {
  const match = document.cookie.match(/(?:^|; )csrf_token=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : ''
}

const parseJson = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as T
  }

  const data = (await response.json()) as T | ApiError
  if (!response.ok) {
    throw data
  }
  return data as T
}

const request = async <T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> => {
  const csrfToken = getCsrfToken()
  const headers = new Headers(options.headers)
  if (csrfToken && !headers.has('x-csrf-token')) {
    headers.set('x-csrf-token', csrfToken)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include'
  })

  if (response.status === 401 && retry) {
    await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'x-csrf-token': csrfToken }
    })

    return request(path, options, false)
  }

  return parseJson<T>(response)
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    }),
  delete: <T>(path: string) =>
    request<T>(path, {
      method: 'DELETE'
    })
}
