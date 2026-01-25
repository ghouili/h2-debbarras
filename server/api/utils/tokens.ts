import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { env } from '../config'

export type AccessTokenPayload = {
  sub: string
  role: string
  email: string
}

export const createAccessToken = (payload: AccessTokenPayload) =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL })

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload

export const createRefreshTokenValue = () =>
  crypto.randomBytes(48).toString('hex')

export const hashToken = (token: string) =>
  crypto.createHash('sha256').update(token).digest('hex')
