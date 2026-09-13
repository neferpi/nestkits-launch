# Customize

## Brand & copy (5 minutes)

Everything lives in `src/lib/site.config.ts`:

| Field | Effect |
|-------|--------|
| `name` / `shortName` | Header, titles, footer |
| `tagline` / `description` | Metadata + hero |
| `hero.*` | Eyebrow, title, CTAs |
| `socialProof` | Logo strip + stats |
| `features` | Three feature cards (`icon`: `sparkles` \| `mail` \| `creditCard`) |
| `faq` | FAQ pairs |
| `plans` | Pricing cards (default: waitlist-first; Stripe optional) |
| `cta` | Bottom band |
| `footer` | Blurb + links |
| `url` | canonical / sitemap / OG base |

## Theme

Dark-first OKLCH tokens in `src/app/globals.css`:

- `--background`, `--foreground`, `--card`, `--border`
- `--accent` (Nest green) — change hue for a new brand color

Fonts: Geist Sans / Mono via `next/font` in `layout.tsx`.

## Sections on/off

Landing is composed in `src/app/page.tsx`. Comment out `<FAQ />` or `<SocialProof />` to drop a section.

## Plans (waitlist default · Stripe optional)

**Default path is free waitlist only.** Paid CTAs are demoted / “coming soon” during beta.

- `href` set → link button (waitlist uses `/#waitlist`) — **recommended default**
- `href: null` + `stripePriceId` → Checkout button via `/api/checkout` — enable later when *you* want to charge *your* customers
- Update `functions/api/checkout.ts` if you add another paid plan
- See `docs/STRIPE.md` — NestKits Launch itself is MIT; Gumroad commercial plan is paused

## Components

Lightweight shadcn-style primitives under `src/components/ui/` (Button). Swap Lucide icons freely.

## SEO

`robots.ts` + `sitemap.ts` read `siteConfig.url`. Set a real production URL before indexing.
