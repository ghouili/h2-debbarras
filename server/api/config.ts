import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  COOKIE_SECURE: z.string().optional().default('false'),
  COOKIE_SAMESITE: z.enum(['strict', 'lax', 'none']).optional().default('strict'),
  CORS_ORIGIN: z.string().optional().default('http://localhost:5173'),
  API_PORT: z.string().optional().default('4000'),
  ACCESS_TOKEN_TTL: z.string().optional().default('15m'),
  REFRESH_TOKEN_TTL: z.string().optional().default('7d')
})

const parsed = envSchema.safeParse(process.env)
if (!parsed.success) {
  console.error('Invalid environment configuration', parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = {
  ...parsed.data,
  COOKIE_SECURE: parsed.data.COOKIE_SECURE === 'true',
  API_PORT: Number(parsed.data.API_PORT)
}

export const corsOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
