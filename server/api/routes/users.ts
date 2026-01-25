import { Router } from 'express'
import argon2 from 'argon2'
import { prisma } from '../db'
import { asyncHandler } from '../middleware/async-handler'
import { ApiError, formatZodError } from '../utils/errors'
import { getPagination } from '../utils/pagination'
import { userCreateSchema, userUpdateSchema } from '../../shared/schemas'

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

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { page, limit, sort, order } = getPagination(req.query)
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : ''

    const where = {
      AND: [
        search
          ? {
              OR: [
                { fullName: { contains: search, mode: 'insensitive' as const } },
                { email: { contains: search, mode: 'insensitive' as const } }
              ]
            }
          : {}
      ]
    }

    const allowedSort = ['createdAt', 'fullName', 'email', 'role']
    const orderBy = allowedSort.includes(sort ?? '') ? { [sort!]: order } : { createdAt: 'desc' }

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.user.count({ where })
    ])

    res.json({
      data: data.map(toUserDto),
      meta: { page, limit, total }
    })
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = userCreateSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new ApiError(400, 'validation_error', 'Données invalides.', formatZodError(parsed.error))
    }

    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } })
    if (existing) {
      throw new ApiError(409, 'email_exists', 'Cet email est déjà utilisé.')
    }

    const passwordHash = await argon2.hash(parsed.data.password, { type: argon2.argon2id })

    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        fullName: parsed.data.fullName,
        passwordHash,
        role: parsed.data.role,
        isActive: parsed.data.isActive ?? true
      }
    })

    res.status(201).json({ user: toUserDto(user) })
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } })
    if (!user) {
      throw new ApiError(404, 'not_found', 'Utilisateur introuvable.')
    }

    res.json({ user: toUserDto(user) })
  })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const parsed = userUpdateSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new ApiError(400, 'validation_error', 'Données invalides.', formatZodError(parsed.error))
    }

    const existing = await prisma.user.findUnique({ where: { id: req.params.id } })
    if (!existing) {
      throw new ApiError(404, 'not_found', 'Utilisateur introuvable.')
    }

    const data: {
      email?: string
      fullName?: string
      passwordHash?: string
      role?: string
      isActive?: boolean
    } = {}

    if (parsed.data.email) data.email = parsed.data.email
    if (parsed.data.fullName) data.fullName = parsed.data.fullName
    if (parsed.data.role) data.role = parsed.data.role
    if (typeof parsed.data.isActive === 'boolean') data.isActive = parsed.data.isActive

    if (parsed.data.password) {
      data.passwordHash = await argon2.hash(parsed.data.password, { type: argon2.argon2id })
    }

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data
    })

    res.json({ user: toUserDto(user) })
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { isActive: false }
    })

    res.json({ user: toUserDto(user) })
  })
)

export default router
