# GDSC Blog - Starter

Tech: Next.js (App Router), TypeScript, Tailwind CSS, Prisma, NextAuth

## Quickstart

1. Copy `.env.local.example` to `.env.local` and set DATABASE_URL and NEXTAUTH_SECRET
2. Install deps:
   npm install
3. Generate Prisma client & migrate:
   npx prisma generate
   npx prisma migrate dev --name init
4. Seed:
   node --loader ts-node/esm prisma/seed.ts
5. Run dev:
   npm run dev
