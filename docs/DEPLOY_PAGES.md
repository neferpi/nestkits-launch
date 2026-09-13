# Deploy to Cloudflare Pages

NestKits Launch ships as **static `out/` + Pages Functions** in `functions/`.

## Prerequisites

- Cloudflare account
- Node 20+
- `npx wrangler` (no global install required)

## One-shot deploy

```bash
npm install
npm run build
npx wrangler pages project create nestkits-launch   # once
npx wrangler pages deploy out --project-name=nestkits-launch
```

Wrangler uploads `out/` and the `functions/` directory automatically when present at the repo root.

## KV binding

```bash
npx wrangler kv namespace create WAITLIST
```

Copy the `id` into `wrangler.toml` under `[[kv_namespaces]]`.

In the Pages dashboard: **Settings → Bindings → KV namespace** → binding name **`WAITLIST`** → select the namespace.

Or with wrangler (Pages project config), ensure the binding name matches exactly: `WAITLIST`.

## Secrets

```bash
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name=nestkits-launch
npx wrangler pages secret put STRIPE_PRICE_EARLY_BIRD --project-name=nestkits-launch
npx wrangler pages secret put STRIPE_PRICE_FOUNDER --project-name=nestkits-launch
npx wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name=nestkits-launch
npx wrangler pages secret put SITE_URL --project-name=nestkits-launch
```

Optional Resend:

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name=nestkits-launch
npx wrangler pages secret put WAITLIST_FROM_EMAIL --project-name=nestkits-launch
```

## Git-connected Pages (optional)

1. Push this repo to GitHub
2. Cloudflare Dashboard → Workers & Pages → Create → Connect to Git
3. Build command: `npm run build`
4. Build output directory: `out`
5. Root directory: `/` (or monorepo path if nested)
6. Add KV binding + secrets as above

## Custom domain

Pages → Custom domains → add your domain → follow DNS instructions.

## Verify

1. Open the Pages URL — landing loads dark UI
2. Submit waitlist — should persist once KV is bound
3. Pricing → Early bird — setup message until Stripe secrets exist; then Checkout redirects

## Caveats

- This pack uses **static export**, not OpenNext full SSR. API routes are Pages Functions only.
- `NEXT_PUBLIC_*` vars are compile-time — rebuild after changing them.
- Trailing slashes are enabled (`trailingSlash: true`) to match Pages static routing.
