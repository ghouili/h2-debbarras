import { Router } from 'express'
import { prisma } from '../db'
import { asyncHandler } from '../middleware/async-handler'

const router = Router()

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const [
      contactsNew,
      contactsInProgress,
      contactsClosed,
      quotesNew,
      quotesQualified,
      quotesScheduled,
      quotesDone,
      quotesLost
    ] = await Promise.all([
      prisma.contact.count({ where: { status: 'NEW' } }),
      prisma.contact.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.contact.count({ where: { status: 'CLOSED' } }),
      prisma.quoteRequest.count({ where: { status: 'NEW' } }),
      prisma.quoteRequest.count({ where: { status: 'QUALIFIED' } }),
      prisma.quoteRequest.count({ where: { status: 'SCHEDULED' } }),
      prisma.quoteRequest.count({ where: { status: 'DONE' } }),
      prisma.quoteRequest.count({ where: { status: 'LOST' } })
    ])

    res.json({
      contacts: {
        NEW: contactsNew,
        IN_PROGRESS: contactsInProgress,
        CLOSED: contactsClosed
      },
      quoteRequests: {
        NEW: quotesNew,
        QUALIFIED: quotesQualified,
        SCHEDULED: quotesScheduled,
        DONE: quotesDone,
        LOST: quotesLost
      }
    })
  })
)

export default router
