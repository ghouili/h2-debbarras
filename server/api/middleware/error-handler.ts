import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/errors'

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    })
    return
  }

  void _next

  res.status(500).json({
    error: {
      code: 'internal_error',
      message: 'Une erreur interne est survenue.'
    }
  })
}
