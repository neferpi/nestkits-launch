# NestKits · Launch

**Free & open indie launch starter by [neferpi](https://github.com/neferpi)** — landing + waitlist + optional Stripe Checkout stub, wired for **Cloudflare Pages**.

> Free starters get you a pretty page. NestKits gets you on Cloudflare with a waitlist that stores — and Stripe wiring you can turn on later if *you* want to charge *your* customers.

**License:** MIT · **Commercial Gumroad plan:** paused (everything free during beta).

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-ready-F38020?logo=cloudflare)](./docs/DEPLOY_PAGES.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## What’s included

- **Next.js App Router** · TypeScript strict · Tailwind v4 · Lucide
- **Dark-first Nest UI** — OKLCH tokens, not generic AI slop
- **`site.config.ts`** — rebrand the whole site in one file
- **Landing** — hero, social proof, 3 features, FAQ, CTA
- **Waitlist** — Pages Function + KV (`WAITLIST`), honeypot, demo mode (**default path**)
- **Pricing** — waitlist-first / free during beta; paid CTAs demoted
- **Optional Stripe stub** — off by default; enable when *you* want to charge *your* customers
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

No KV / Stripe? Forms still succeed with a setup note. Wire secrets when ready — the page ships first. **Default path is free waitlist only.**

## Optional Stripe (for *your* customers)

Stripe Checkout is included as a stub so template users can later charge **their** customers. It is **optional and off by default** — NestKits itself is free/MIT; no Gumroad paywall.

See [`docs/STRIPE.md`](./docs/STRIPE.md) when you want to turn it on.

## Stack notes

| Choice | Why |
|--------|-----|
| Static export + Pages Functions | Pages-native 2026 path; no abandoned next-on-pages |
| KV for waitlist | Zero schema, enough for email capture |
| Stripe Checkout stub (optional) | Ready when *you* want to take money — not required to ship |
| No Clerk/Supabase | Pack #1 stays thin; SaaS Shell is Pack #3 |

## License

[MIT](./LICENSE) — free for personal and commercial use. Commercial Gumroad single-seat plan is **paused**.

## NestKits roadmap

1. **Launch** (this pack) — validate · free / MIT
2. **Docs** — explain
3. **SaaS Shell** — build (auth + OpenNext Workers)

---

Built by [neferpi](https://github.com/neferpi) · NestKits
