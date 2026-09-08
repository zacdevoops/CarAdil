# CarAdil

Modern car rental website for Morocco.

## Overview

CarAdil is a public Next.js site for requesting a car rental. Visitors browse the catalogue, open a vehicle page, and send a booking request. An agent confirms availability — there is no instant checkout in this baseline.

## Tech stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- Zod
- Prisma 6 (PostgreSQL)
- lucide-react

## Main customer flow

Home → Cars → Car detail → Booking request → Confirmation

The booking API currently returns a planned-next-step response. Persistence and admin email are not wired yet.

## Project structure

```
app/            Routes, layout, SEO, booking API stub
components/     Header, catalogue, booking form, home sections
content/        Cars, locations, copy, site config
lib/            Validation, Prisma client, email/booking stubs
emails/         Reserved for transactional templates
prisma/         BookingRequest schema
public/         Images and static assets
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection (server only) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp digits without `+` |
| `RESEND_API_KEY` | Email (not used yet) |
| `BOOKING_ADMIN_EMAIL` | Admin inbox (not used yet) |
| `EMAIL_FROM` | From address (not used yet) |

Never commit `.env` or `.env.local`.

## Local development

```bash
cp .env.example .env.local
npm install
npm run prisma:generate
npm run dev
```

App: http://localhost:3000

## Production build

```bash
npm run typecheck
npm run lint
npm run prisma:validate
npm run build
npm start
```

## Database

Prisma models a `booking_requests` table. Generate the client with `npm run prisma:generate`. Apply migrations when you connect a real database.

## Current project status

Public site UI and content architecture are in place. Booking requests are validated in the browser; server persistence and email sending are reserved for the next backend step. Fleet photos can be added under `public/images/cars/{slug}.jpg`.
