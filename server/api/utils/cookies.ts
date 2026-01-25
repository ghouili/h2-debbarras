import { Response } from 'express'
import ms from 'ms'
import { env } from '../config'

const commonOptions = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: env.COOKIE_SAMESITE as 'strict' | 'lax' | 'none',
  path: '/'
}

export const setAccessCookie = (res: Response, token: string) => {
  res.cookie('access_token', token, {
    ...commonOptions,
    maxAge: ms(env.ACCESS_TOKEN_TTL)
  })
}

export const setRefreshCookie = (res: Response, token: string, maxAgeMs: number) => {
  res.cookie('refresh_token', token, {
    ...commonOptions,
    maxAge: maxAgeMs
  })
}

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('access_token', { path: '/' })
  res.clearCookie('refresh_token', { path: '/' })
  res.clearCookie('csrf_token', { path: '/' })
}

export const setCsrfCookie = (res: Response, token: string) => {
  res.cookie('csrf_token', token, {
    httpOnly: false,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAMESITE as 'strict' | 'lax' | 'none',
    path: '/'
  })
}
