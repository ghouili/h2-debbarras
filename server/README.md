# H2 Débarras Admin + API

This folder hosts the admin dashboard (React + Vite) and a colocated Node.js API (Express + Prisma).

## Stack highlights

- Admin UI: React, React Router, React Query, Tailwind
- API: Express, Prisma, JWT cookies, CSRF protection
- DB: PostgreSQL

### Added dependencies (why)

- Prisma: schema + migrations + seed
- Argon2: secure password hashing
- Express + security middleware: API server with safe defaults
- React Query + TanStack Table: admin data management
- Tailwind: UI parity with the main site

## Prerequisites

- Node.js LTS
- PostgreSQL (local or Docker)

## Setup

1. Copy the env file:

   - Create .env from .env.example

2. Start PostgreSQL (optional Docker):

   - docker-compose up -d

3. Install dependencies:

   - npm install

4. Run migrations + seed:

   - npm run db:migrate
   - npm run db:seed

5. Start admin + API:

   - npm run dev

Admin UI: http://localhost:5173
API: http://localhost:4000

Default seed credentials (override in .env):

- Email: admin@h2debarras.local
- Password: Admin123!

## Scripts

- dev: runs admin + API
- dev:admin: Vite admin only
- dev:api: Express API only
- db:migrate: Prisma migrate
- db:seed: Prisma seed
