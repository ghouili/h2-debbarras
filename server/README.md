# Débarras Aurea Admin + API

This repository is split into two projects:

- **Admin SPA** (React + Vite) in the repository root
- **API server** (Express + Prisma) in api-server

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
- PostgreSQL (local install) **or** a managed PostgreSQL instance (Supabase, Neon, RDS, etc.)

## Setup

### 1) API server (api-server)

1. From the repository root, go to the API folder:

   - cd api-server

2. Copy the env file:

   - Create .env from .env.example

2. Configure PostgreSQL (choose one):

   - **Local PostgreSQL**
     1. Install Postgres for your OS.
     2. Create a database + user (example using psql):

      - CREATE USER aurea_admin WITH PASSWORD 'change_me';
      - CREATE DATABASE debarras_aurea_admin OWNER aurea_admin;

     3. Set DATABASE_URL in .env.

   - **Managed PostgreSQL**
     1. Create a database in your provider (Supabase/Neon/RDS/etc.).
     2. Copy the connection string into DATABASE_URL.
     3. If required by the provider, add SSL mode to the URL (e.g. ?sslmode=require).

3. Install dependencies:

   - npm install

4. Generate Prisma client (if needed):

   - npm run db:generate

5. Run migrations + seed:

   - npm run db:migrate
   - npm run db:seed

### 2) Admin app (root)

1. Install dependencies:

   - npm install

2. Start admin + API together:

   - npm run dev

3. Verify (optional):

   - npm run doctor
   - npm run test
   - npm run api:smoke (if the API is running)

Admin UI: http://localhost:5173
API: http://localhost:4000

Default seed credentials (override in .env):

- Email: admin@debarras-aurea.local
- Password: Admin123!

## Scripts (root)

- dev: runs admin + API
- dev:admin: Vite admin only
- dev:api: API dev server (via api-server)
- doctor: API env checks (via api-server)
- db:migrate: Prisma migrate (via api-server)
- db:deploy: Prisma migrate deploy (CI/production via api-server)
- db:seed: Prisma seed (via api-server)
- db:generate: Prisma client generate (via api-server)
- db:reset: Prisma reset (DEV ONLY via api-server)
- typecheck: TypeScript typecheck (admin)
- test: lint + typecheck + build (admin)
- api:smoke: health check against /api/health (via api-server)
- build:all: build admin + API

## Scripts (api-server)

- dev: API dev server
- lint: API lint
- typecheck: API typecheck
- test: lint + typecheck + build + api:smoke
- db:migrate/db:deploy/db:seed/db:generate/db:reset

## Prisma + DATABASE_URL notes

- URL format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
- If your password contains special characters, URL-encode it.
- Some managed providers require SSL; append ?sslmode=require (or the provider’s recommended option).

## Notes

- db:reset wipes and recreates the database. Use only in local development.
- api:smoke is non-blocking if the API is not running.
