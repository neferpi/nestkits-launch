# Deploy to Cloudflare Pages

NestKits Launch ships as **static `out/` + Pages Functions** in `functions/`.

## Prerequisites

- Cloudflare account
- Node 20+ (this repo pins **wrangler@3**; wrangler 4+ may need Node 22+)
- `npx wrangler` via the project dependency

## One-shot deploy

```bash
npm install
npm run build
npx wrangler pages project create nestkits-launch   # once
npx wrangler pages deploy out --project-name=nestkits-launch
```

Wrangler uploads `out/` and the `functions/` directory when present at the repo root.

## KV binding

```bash
npx wrangler kv namespace create WAITLIST
npx wrangler kv namespace create WAITLIST --preview
```

Paste the ids into `wrangler.toml` under `[[kv_namespaces]]` (binding name must be **`WAITLIST`**).

**Important:** never leave `REPLACE_WITH_KV_NAMESPACE_ID` as a live `id` — Wrangler validates hex and deploy fails. See `wrangler.toml.example`.

Alternatively bind **WAITLIST** in Pages → Settings → Bindings (handy for Git-connected builds). For `wrangler pages deploy` direct uploads, putting ids in `wrangler.toml` is the reliable path.

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
5. Root directory: `/`
6. Add KV binding + secrets as above
7. Optional: set `NODE_VERSION=22` if you upgrade to wrangler 4

## Custom domain

Pages → Custom domains → add your domain → follow DNS instructions.

## Verify

1. Open the Pages URL — landing loads dark UI
2. Submit waitlist — persists once KV is bound (otherwise demo mode JSON)
3. Pricing → Early bird — setup message until Stripe secrets exist; then Checkout redirects

## Caveats

- **Static export**, not OpenNext full SSR. APIs are Pages Functions only.
- `NEXT_PUBLIC_*` vars are compile-time — rebuild after changing them.
- Trailing slashes enabled (`trailingSlash: true`) for Pages static routing.
- Local full stack: `npm run build && npx wrangler pages dev out --kv WAITLIST`
