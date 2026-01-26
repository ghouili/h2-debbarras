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
- PostgreSQL (local install) **or** a managed PostgreSQL instance (Supabase, Neon, RDS, etc.)

## Setup

1. Copy the env file:

   - Create .env from .env.example

2. Configure PostgreSQL (choose one):

   - **Local PostgreSQL**
     1. Install Postgres for your OS.
     2. Create a database + user (example using psql):

        - CREATE USER h2_admin WITH PASSWORD 'change_me';
        - CREATE DATABASE h2debarras_admin OWNER h2_admin;

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

6. Start admin + API:

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
- db:generate: Prisma client generate

## Prisma + DATABASE_URL notes

- URL format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
- If your password contains special characters, URL-encode it.
- Some managed providers require SSL; append ?sslmode=require (or the provider’s recommended option).
