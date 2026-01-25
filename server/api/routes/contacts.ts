import { Router } from 'express'
import { prisma } from '../db'
import { asyncHandler } from '../middleware/async-handler'
import { ApiError, formatZodError } from '../utils/errors'
import { getPagination } from '../utils/pagination'
import { contactCreateSchema, contactUpdateSchema } from '../../shared/schemas'

const router = Router()

const toContactDto = (contact: {
  id: string
  fullName: string
  email: string | null
  phone: string | null
  source: string | null
  message: string | null
  status: string
  createdAt: Date
  updatedAt: Date
}) => ({
  id: contact.id,
  fullName: contact.fullName,
  email: contact.email,
  phone: contact.phone,
  source: contact.source,
  message: contact.message,
  status: contact.status,
  createdAt: contact.createdAt.toISOString(),
  updatedAt: contact.updatedAt.toISOString()
})

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { page, limit, sort, order } = getPagination(req.query)
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : ''
    const status = typeof req.query.status === 'string' ? req.query.status : undefined

    const where = {
      AND: [
        status ? { status } : {},
        search
          ? {
              OR: [
                { fullName: { contains: search, mode: 'insensitive' as const } },
                { email: { contains: search, mode: 'insensitive' as const } },
                { phone: { contains: search, mode: 'insensitive' as const } }
              ]
            }
          : {}
      ]
    }

    const allowedSort = ['createdAt', 'fullName', 'status']
    const orderBy = allowedSort.includes(sort ?? '') ? { [sort!]: order } : { createdAt: 'desc' }

    const [data, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.contact.count({ where })
    ])

    res.json({
      data: data.map(toContactDto),
      meta: { page, limit, total }
    })
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = contactCreateSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new ApiError(400, 'validation_error', 'Données invalides.', formatZodError(parsed.error))
    }

    const contact = await prisma.contact.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email ?? null,
        phone: parsed.data.phone ?? null,
        source: parsed.data.source ?? null,
        message: parsed.data.message ?? null,
        status: parsed.data.status
      }
    })

    res.status(201).json({ contact: toContactDto(contact) })
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const contact = await prisma.contact.findUnique({ where: { id: req.params.id } })
    if (!contact) {
      throw new ApiError(404, 'not_found', 'Contact introuvable.')
    }

    res.json({ contact: toContactDto(contact) })
  })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const parsed = contactUpdateSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new ApiError(400, 'validation_error', 'Données invalides.', formatZodError(parsed.error))
    }

    const contact = await prisma.contact.update({
      where: { id: req.params.id },
      data: {
        ...parsed.data,
        email: parsed.data.email ?? undefined,
        phone: parsed.data.phone ?? undefined,
        source: parsed.data.source ?? undefined,
        message: parsed.data.message ?? undefined
      }
    })

    res.json({ contact: toContactDto(contact) })
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await prisma.contact.delete({ where: { id: req.params.id } })
    res.status(204).send()
  })
)

export default router
