import { Router } from 'express'
import argon2 from 'argon2'
import ms from 'ms'
import { prisma } from '../db'
import { loginSchema } from '../../shared/schemas'
import { ApiError, formatZodError } from '../utils/errors'
import { asyncHandler } from '../middleware/async-handler'
import { createAccessToken, createRefreshTokenValue, hashToken } from '../utils/tokens'
import { clearAuthCookies, setAccessCookie, setCsrfCookie, setRefreshCookie } from '../utils/cookies'
import { env } from '../config'
import { requireAuth } from '../middleware/require-auth'

const router = Router()

const toUserDto = (user: { id: string; email: string; fullName: string; role: string; isActive: boolean; createdAt: Date; updatedAt: Date; lastLoginAt: Date | null }) => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt.toISOString(),
  updatedAt: user.updatedAt.toISOString(),
  lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null
})

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new ApiError(400, 'validation_error', 'Données invalides.', formatZodError(parsed.error))
    }

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
    if (!user || !user.isActive) {
      throw new ApiError(401, 'invalid_credentials', 'Identifiants invalides.')
    }

    const passwordValid = await argon2.verify(user.passwordHash, parsed.data.password)
    if (!passwordValid) {
      throw new ApiError(401, 'invalid_credentials', 'Identifiants invalides.')
    }

    const accessToken = createAccessToken({
      sub: user.id,
      role: user.role,
      email: user.email
    })

    const refreshToken = createRefreshTokenValue()
    const refreshHash = hashToken(refreshToken)
    const refreshTtl = ms(env.REFRESH_TOKEN_TTL)

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshHash,
        expiresAt: new Date(Date.now() + refreshTtl)
      }
    })

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    setAccessCookie(res, accessToken)
    setRefreshCookie(res, refreshToken, refreshTtl)
    setCsrfCookie(res, refreshToken.slice(0, 16))

    res.json({ user: toUserDto(user) })
  })
)

router.post(
  '/logout',
  requireAuth,
  asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refresh_token
    if (refreshToken) {
      await prisma.refreshToken.updateMany({
        where: { tokenHash: hashToken(refreshToken), revokedAt: null },
        data: { revokedAt: new Date() }
      })
    }

    clearAuthCookies(res)
    res.json({ ok: true })
  })
)

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } })
    if (!user) {
      throw new ApiError(401, 'unauthorized', 'Session invalide.')
    }

    res.json({ user: toUserDto(user) })
  })
)

router.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refresh_token
    if (!refreshToken) {
      throw new ApiError(401, 'unauthorized', 'Session expirée.')
    }

    const refreshHash = hashToken(refreshToken)
    const stored = await prisma.refreshToken.findFirst({
      where: { tokenHash: refreshHash, revokedAt: null }
    })

    if (!stored || stored.expiresAt < new Date()) {
      throw new ApiError(401, 'unauthorized', 'Session expirée.')
    }

    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() }
    })

    const user = await prisma.user.findUnique({ where: { id: stored.userId } })
    if (!user || !user.isActive) {
      throw new ApiError(401, 'unauthorized', 'Session expirée.')
    }

    const newAccess = createAccessToken({
      sub: user.id,
      role: user.role,
      email: user.email
    })
    const newRefresh = createRefreshTokenValue()
    const newHash = hashToken(newRefresh)
    const refreshTtl = ms(env.REFRESH_TOKEN_TTL)

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: newHash,
        expiresAt: new Date(Date.now() + refreshTtl)
      }
    })

    setAccessCookie(res, newAccess)
    setRefreshCookie(res, newRefresh, refreshTtl)
    setCsrfCookie(res, newRefresh.slice(0, 16))

    res.json({ user: toUserDto(user) })
  })
)

export default router
