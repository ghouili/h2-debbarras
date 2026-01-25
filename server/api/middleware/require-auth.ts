import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/errors'
import { verifyAccessToken } from '../utils/tokens'

export type AuthUser = {
  id: string
  role: string
  email: string
}

export type AuthenticatedRequest = Request & { user?: AuthUser }

export const requireAuth = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token
  if (!token) {
    return next(new ApiError(401, 'unauthorized', 'Non authentifié.'))
  }

  try {
    const payload = verifyAccessToken(token)
    req.user = { id: payload.sub, role: payload.role, email: payload.email }
    return next()
  } catch {
    return next(new ApiError(401, 'unauthorized', 'Session invalide ou expirée.'))
  }
}
