import { z } from 'zod'

export const roleEnum = z.enum(['ADMIN', 'STAFF'])
export const contactStatusEnum = z.enum(['NEW', 'IN_PROGRESS', 'CLOSED'])
export const quoteStatusEnum = z.enum(['NEW', 'QUALIFIED', 'SCHEDULED', 'DONE', 'LOST'])
export const serviceTypeEnum = z.enum([
  'MAISON',
  'APPARTEMENT',
  'CAVE_GRENIER',
  'SUCCESSION',
  'AUTRE'
])

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8)
  })
  .strict()

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(1),
  role: roleEnum,
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastLoginAt: z.string().nullable()
})

export const userCreateSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    fullName: z.string().min(1),
    role: roleEnum.default('STAFF'),
    isActive: z.boolean().optional()
  })
  .strict()

export const userUpdateSchema = z
  .object({
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    fullName: z.string().min(1).optional(),
    role: roleEnum.optional(),
    isActive: z.boolean().optional()
  })
  .strict()

export const contactSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  source: z.string().nullable(),
  postalCode: z.string().nullable(),
  message: z.string().nullable(),
  consent: z.boolean(),
  status: contactStatusEnum,
  createdAt: z.string(),
  updatedAt: z.string()
})

export const contactCreateSchema = z
  .object({
    fullName: z.string().min(1),
    email: z.string().email().nullable().optional(),
    phone: z.string().nullable().optional(),
    source: z.string().nullable().optional(),
    postalCode: z.string().nullable().optional(),
    message: z.string().nullable().optional(),
    consent: z.boolean().optional().default(false),
    status: contactStatusEnum.default('NEW')
  })
  .strict()

export const contactUpdateSchema = z
  .object({
    fullName: z.string().min(1).optional(),
    email: z.string().email().nullable().optional(),
    phone: z.string().nullable().optional(),
    source: z.string().nullable().optional(),
    postalCode: z.string().nullable().optional(),
    message: z.string().nullable().optional(),
    consent: z.boolean().optional(),
    status: contactStatusEnum.optional()
  })
  .strict()

export const quoteRequestSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1),
  phone: z.string().min(3),
  email: z.string().email().nullable(),
  postalCode: z.string().min(2),
  departmentCode: z.string().nullable(),
  city: z.string().nullable(),
  serviceType: serviceTypeEnum,
  volumeEstimate: z.string().nullable(),
  accessNotes: z.string().nullable(),
  preferredDate: z.string().nullable(),
  status: quoteStatusEnum,
  createdAt: z.string(),
  updatedAt: z.string()
})

export const quoteRequestCreateSchema = z
  .object({
    fullName: z.string().min(1),
    phone: z.string().min(3),
    email: z.string().email().nullable().optional(),
    postalCode: z.string().min(2),
    departmentCode: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    serviceType: serviceTypeEnum,
    volumeEstimate: z.string().nullable().optional(),
    accessNotes: z.string().nullable().optional(),
    preferredDate: z.string().nullable().optional(),
    status: quoteStatusEnum.default('NEW')
  })
  .strict()

export const quoteRequestUpdateSchema = z
  .object({
    fullName: z.string().min(1).optional(),
    phone: z.string().min(3).optional(),
    email: z.string().email().nullable().optional(),
    postalCode: z.string().min(2).optional(),
    departmentCode: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    serviceType: serviceTypeEnum.optional(),
    volumeEstimate: z.string().nullable().optional(),
    accessNotes: z.string().nullable().optional(),
    preferredDate: z.string().nullable().optional(),
    status: quoteStatusEnum.optional()
  })
  .strict()

export type Role = z.infer<typeof roleEnum>
export type ContactStatus = z.infer<typeof contactStatusEnum>
export type QuoteStatus = z.infer<typeof quoteStatusEnum>
export type ServiceType = z.infer<typeof serviceTypeEnum>
export type User = z.infer<typeof userSchema>
export type Contact = z.infer<typeof contactSchema>
export type QuoteRequest = z.infer<typeof quoteRequestSchema>
