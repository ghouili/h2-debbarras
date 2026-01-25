import 'dotenv/config'
import argon2 from 'argon2'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@h2debarras.local'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'Admin123!'
  const adminName = process.env.SEED_ADMIN_NAME ?? 'Admin H2Débarras'

  const passwordHash = await argon2.hash(adminPassword, {
    type: argon2.argon2id
  })

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      fullName: adminName,
      passwordHash,
      role: 'ADMIN',
      isActive: true
    },
    create: {
      email: adminEmail,
      fullName: adminName,
      passwordHash,
      role: 'ADMIN',
      isActive: true
    }
  })

  await prisma.contact.createMany({
    data: [
      {
        fullName: 'Sophie Martin',
        email: 'sophie@example.com',
        phone: '0600000001',
        source: 'web',
        message: 'Besoin de débarrasser une cave.',
        status: 'NEW'
      },
      {
        fullName: 'Louis Dupont',
        email: 'louis@example.com',
        phone: '0600000002',
        source: 'call',
        message: 'Demande urgente pour appartement.',
        status: 'IN_PROGRESS'
      }
    ],
    skipDuplicates: true
  })

  await prisma.quoteRequest.createMany({
    data: [
      {
        fullName: 'Camille Leroy',
        phone: '0600000003',
        email: 'camille@example.com',
        postalCode: '75012',
        departmentCode: '75',
        city: 'Paris',
        serviceType: 'APPARTEMENT',
        volumeEstimate: '12m³',
        accessNotes: 'Ascenseur disponible',
        status: 'NEW'
      },
      {
        fullName: 'Hugo Bernard',
        phone: '0600000004',
        email: 'hugo@example.com',
        postalCode: '92100',
        departmentCode: '92',
        city: 'Boulogne-Billancourt',
        serviceType: 'MAISON',
        volumeEstimate: '35m³',
        accessNotes: 'Stationnement facile',
        status: 'QUALIFIED'
      }
    ],
    skipDuplicates: true
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
