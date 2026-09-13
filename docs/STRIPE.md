# Stripe Checkout stub

## What you get

- Pricing page CTAs for Early bird / Founder
- `functions/api/checkout.ts` — creates a Checkout Session via Stripe REST
- `functions/stripe-webhook.ts` — signature-aware stub + idempotent event log to KV
- Graceful **setup message** when secrets/price IDs are missing (no crash)

## Test-mode checklist

1. Create a Stripe account → Developers → API keys → copy **test** secret key
2. Products → Add product → one-time prices for Early bird ($39) and Founder ($99)
3. Copy Price IDs (`price_…`)
4. Set Pages secrets:

```bash
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name=nestkits-launch
npx wrangler pages secret put STRIPE_PRICE_EARLY_BIRD --project-name=nestkits-launch
npx wrangler pages secret put STRIPE_PRICE_FOUNDER --project-name=nestkits-launch
npx wrangler pages secret put SITE_URL --project-name=nestkits-launch
```

5. Optional publishable key in `.env.local` for future Elements use:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_…
```

6. Redeploy, open `/pricing/`, click Early bird → Stripe Checkout (test card `4242…`)

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
