import type { Response, NextFunction } from 'express'
import type { AuthenticatedRequest } from './require-auth'
import { ApiError } from '../utils/errors'

export const requireRole = (roles: string[]) =>
  (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, 'forbidden', 'Accès refusé.'))
    }
    return next()
  }
