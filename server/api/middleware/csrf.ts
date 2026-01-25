import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/errors'

const safeMethods = ['GET', 'HEAD', 'OPTIONS']
const exemptPaths = ['/api/auth/login', '/api/auth/refresh']

export const csrfProtection = (req: Request, _res: Response, next: NextFunction) => {
  if (safeMethods.includes(req.method)) {
    return next()
  }

  if (exemptPaths.includes(req.path)) {
    return next()
  }

  const csrfCookie = req.cookies?.csrf_token
  const csrfHeader = req.header('x-csrf-token')

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return next(new ApiError(403, 'csrf_invalid', 'Jeton CSRF manquant ou invalide.'))
  }

  return next()
}
