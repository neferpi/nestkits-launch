# Quickstart (<10 minutes)

**Default path: free waitlist only.** Stripe is optional (see `docs/STRIPE.md`) when you later want to charge *your* customers.

## 1. Install

```bash
npm install
cp .env.example .env.local
```

## 2. Rebrand

Edit `src/lib/site.config.ts` — name, tagline, features, plans, FAQ.

## 3. Run locally (UI only)

```bash
npm run dev
```

Open http://localhost:3000. Waitlist hits `/api/*` which needs Pages Functions — without them, forms enter **demo mode** (success + setup note). You do **not** need Stripe to try the waitlist.

## 4. Build

```bash
npm run build
```

Output lands in `out/` (static export).

## 5. Full local stack (static + Functions)

```bash
npm run build
npx wrangler pages dev out --kv WAITLIST
```

Create a real KV namespace when you're ready (`docs/WAITLIST.md`).

## 6. Deploy

See `docs/DEPLOY_PAGES.md`.

```bash
npm run build
npx wrangler pages deploy out --project-name=nestkits-launch
```

## 7. (Optional) Stripe later

Only when you want Checkout for *your* customers — `docs/STRIPE.md`. NestKits itself stays free / MIT.
