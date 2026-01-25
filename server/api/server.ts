import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import pinoHttp from 'pino-http'
import { env, corsOrigins } from './config'
import authRouter from './routes/auth'
import usersRouter from './routes/users'
import contactsRouter from './routes/contacts'
import quoteRequestsRouter from './routes/quote-requests'
import dashboardRouter from './routes/dashboard'
import { requireAuth } from './middleware/require-auth'
import { requireRole } from './middleware/require-role'
import { csrfProtection } from './middleware/csrf'
import { errorHandler } from './middleware/error-handler'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(new Error('CORS not allowed'))
    },
    credentials: true
  })
)
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(pinoHttp())
app.use(csrfProtection)

const authLimiter = rateLimit({ windowMs: 60_000, max: 10 })

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth/login', authLimiter)
app.use('/api/auth/refresh', authLimiter)
app.use('/api/auth', authRouter)

app.use('/api/dashboard', requireAuth, dashboardRouter)
app.use('/api/users', requireAuth, requireRole(['ADMIN']), usersRouter)
app.use('/api/contacts', requireAuth, contactsRouter)
app.use('/api/quote-requests', requireAuth, quoteRequestsRouter)

app.use(errorHandler)

app.listen(env.API_PORT, () => {
  console.log(`API listening on http://localhost:${env.API_PORT}`)
})
