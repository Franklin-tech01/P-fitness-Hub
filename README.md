# P Fitness Hub

A gym website built with Next.js (App Router), Prisma + SQLite, NextAuth (Auth.js) and Paystack.

Pages: interactive landing page, gym rules & guidelines, registration with plan selection + Paystack checkout, and a member dashboard.

## Getting started

```bash
npm install
npx prisma migrate dev   # creates dev.db and applies the schema
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — defaults to a local SQLite file, no changes needed for dev.
- `AUTH_SECRET` — random 32-byte secret (already generated for local dev in `.env`).
- `PAYSTACK_SECRET_KEY` / `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` — get test keys from your [Paystack dashboard](https://dashboard.paystack.com/#/settings/developers). Without these, the payment step will show an error when a user tries to pay.
- `NEXT_PUBLIC_APP_URL` — base URL of the app.

## Notes

- Membership plans and pricing live in `src/lib/plans.ts` — edit amounts/durations there.
- Brand colors (black / blue / red) are defined as CSS variables in `src/app/globals.css`.
- Auth uses NextAuth v5 (beta) with the Credentials provider and JWT sessions; `trustHost: true` is required in `src/lib/auth.ts` since this isn't hosted on Vercel.
- Payment flow: `/api/payments/initialize` creates a pending `Membership` row and returns a Paystack reference; the client opens the Paystack inline popup; on success `/api/payments/verify` confirms the transaction server-side with Paystack and activates the membership.
