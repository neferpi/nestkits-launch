# Stripe Checkout stub (optional)

> **Default path is free waitlist only.** Stripe is off by default.
> Enable it only when *you* (the template user) want to charge *your* customers.
> NestKits Launch itself is free / MIT — commercial Gumroad sales are paused.

## What you get

- Optional pricing CTAs that can open Stripe Checkout (when you set `href: null` + a price id in `site.config.ts`)
- `functions/api/checkout.ts` — creates a Checkout Session via Stripe REST
- `functions/stripe-webhook.ts` — signature-aware stub + idempotent event log to KV
- Graceful **setup message** when secrets/price IDs are missing (no crash)

## When to skip this

Ship the landing + waitlist first. You do **not** need Stripe keys, products, or webhooks to deploy NestKits Launch.

## Enable later (test mode)

1. In `src/lib/site.config.ts`, for a paid plan set `href: null` and a `stripePriceId` (or rely on env price ids in the Function)
2. Create a Stripe account → Developers → API keys → copy **test** secret key
3. Products → Add product → one-time prices for the SKUs you want
4. Copy Price IDs (`price_…`)
5. Set Pages secrets:

```bash
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name=nestkits-launch
npx wrangler pages secret put STRIPE_PRICE_EARLY_BIRD --project-name=nestkits-launch
npx wrangler pages secret put STRIPE_PRICE_FOUNDER --project-name=nestkits-launch
npx wrangler pages secret put SITE_URL --project-name=nestkits-launch
```

6. Optional publishable key in `.env.local` for future Elements use:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_…
```

7. Redeploy, open `/pricing/`, click a paid plan → Stripe Checkout (test card `4242…`)

## Webhook

```bash
# Local forward (Stripe CLI)
stripe listen --forward-to localhost:8788/stripe-webhook

npx wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name=nestkits-launch
```

In Dashboard → Webhooks → endpoint `https://YOUR_DOMAIN/stripe-webhook` → event `checkout.session.completed`.

The stub verifies the secret is set and the `stripe-signature` header exists, then logs the event id to KV (`stripe:event:…`) for basic idempotency. **Replace with full HMAC verification (Stripe SDK / Web Crypto) before production money.**

## Success URL

Checkout redirects to `/thank-you/?type=purchase`.

## Going live

Swap test keys for live keys, recreate live Prices, update secrets, flip the webhook to live mode.
