import { Router } from 'express'
import { prisma } from '../db'
import { asyncHandler } from '../middleware/async-handler'
import { ApiError, formatZodError } from '../utils/errors'
import { getPagination } from '../utils/pagination'
import { quoteRequestCreateSchema, quoteRequestUpdateSchema } from '../../shared/schemas'

const router = Router()

const toQuoteDto = (quote: {
  id: string
  fullName: string
  phone: string
  email: string | null
  postalCode: string
  departmentCode: string | null
  city: string | null
  serviceType: string
  volumeEstimate: string | null
  accessNotes: string | null
  preferredDate: Date | null
  status: string
  createdAt: Date
  updatedAt: Date
}) => ({
  id: quote.id,
  fullName: quote.fullName,
  phone: quote.phone,
  email: quote.email,
  postalCode: quote.postalCode,
  departmentCode: quote.departmentCode,
  city: quote.city,
  serviceType: quote.serviceType,
  volumeEstimate: quote.volumeEstimate,
  accessNotes: quote.accessNotes,
  preferredDate: quote.preferredDate ? quote.preferredDate.toISOString() : null,
  status: quote.status,
  createdAt: quote.createdAt.toISOString(),
  updatedAt: quote.updatedAt.toISOString()
})

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { page, limit, sort, order } = getPagination(req.query)
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : ''
    const status = typeof req.query.status === 'string' ? req.query.status : undefined
    const serviceType = typeof req.query.serviceType === 'string' ? req.query.serviceType : undefined

    const where = {
      AND: [
        status ? { status } : {},
        serviceType ? { serviceType } : {},
        search
          ? {
              OR: [
                { fullName: { contains: search, mode: 'insensitive' as const } },
                { phone: { contains: search, mode: 'insensitive' as const } },
                { postalCode: { contains: search, mode: 'insensitive' as const } }
              ]
            }
          : {}
      ]
    }

    const allowedSort = ['createdAt', 'fullName', 'status', 'serviceType']
    const orderBy = allowedSort.includes(sort ?? '') ? { [sort!]: order } : { createdAt: 'desc' }

    const [data, total] = await Promise.all([
      prisma.quoteRequest.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.quoteRequest.count({ where })
    ])

    res.json({
      data: data.map(toQuoteDto),
      meta: { page, limit, total }
    })
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = quoteRequestCreateSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new ApiError(400, 'validation_error', 'Données invalides.', formatZodError(parsed.error))
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        ...parsed.data,
        preferredDate: parsed.data.preferredDate ? new Date(parsed.data.preferredDate) : null
      }
    })

    res.status(201).json({ quoteRequest: toQuoteDto(quote) })
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const quote = await prisma.quoteRequest.findUnique({ where: { id: req.params.id } })
    if (!quote) {
      throw new ApiError(404, 'not_found', 'Demande de devis introuvable.')
    }

    res.json({ quoteRequest: toQuoteDto(quote) })
  })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const parsed = quoteRequestUpdateSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new ApiError(400, 'validation_error', 'Données invalides.', formatZodError(parsed.error))
    }

    const quote = await prisma.quoteRequest.update({
      where: { id: req.params.id },
      data: {
        ...parsed.data,
        preferredDate: parsed.data.preferredDate ? new Date(parsed.data.preferredDate) : undefined
      }
    })

    res.json({ quoteRequest: toQuoteDto(quote) })
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await prisma.quoteRequest.delete({ where: { id: req.params.id } })
    res.status(204).send()
  })
)

export default router
