# NestKits · Launch

**Indie launch starter** — landing + waitlist + pricing + Stripe Checkout stub, wired for **Cloudflare Pages**.

> Free starters get you a pretty page. NestKits gets you on Cloudflare with a waitlist that stores and a button that can take money.

**Price positioning:** $39 early bird / $49 regular (Gumroad). Commercial single-seat — use for your own projects; **do not resell the template**.

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-ready-F38020?logo=cloudflare)](./docs/DEPLOY_PAGES.md)

## What’s included

- **Next.js App Router** · TypeScript strict · Tailwind v4 · Lucide
- **Dark-first Nest UI** — OKLCH tokens, not generic AI slop
- **`site.config.ts`** — rebrand the whole site in one file
- **Landing** — hero, social proof, 3 features, FAQ, CTA
- **Waitlist** — Pages Function + KV (`WAITLIST`), honeypot, demo mode
- **Pricing** — Waitlist / Early bird / Founder → Stripe Checkout stub
- **Thank-you** — waitlist vs purchase variants
- **Privacy / Terms** stubs
- **Docs** — QUICKSTART, DEPLOY_PAGES, WAITLIST, STRIPE, CUSTOMIZE
- **`wrangler.toml`** example + `functions/` for waitlist, checkout, webhook

## Quick start

```bash
npm install
npm run dev          # UI at localhost:3000 (API → demo mode)
npm run build        # static export → out/
npx wrangler pages deploy out --project-name=nestkits-launch
```

Full steps: [`docs/QUICKSTART.md`](./docs/QUICKSTART.md) · Deploy: [`docs/DEPLOY_PAGES.md`](./docs/DEPLOY_PAGES.md)

## Demo mode

No KV / Stripe? Forms still succeed with a setup note. Wire secrets when ready — the page ships first.

## Stack notes

| Choice | Why |
|--------|-----|
| Static export + Pages Functions | Pages-native 2026 path; no abandoned next-on-pages |
| KV for waitlist | Zero schema, enough for email capture |
| Stripe Checkout stub | Takes money without auth/SaaS tax |
| No Clerk/Supabase | Pack #1 stays thin; SaaS Shell is Pack #3 |

## License

Commercial single-seat — see [`LICENSE`](./LICENSE). Personal + commercial projects OK; no template resale.

## NestKits roadmap

1. **Launch** (this pack) — validate
2. **Docs** — explain
3. **SaaS Shell** — build (auth + OpenNext Workers)

---

Built by [neferpi](https://github.com/neferpi) · NestKits
