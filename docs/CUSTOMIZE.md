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
| `plans` | Pricing cards + Stripe price id placeholders |
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

## Plans

- `href` set → link button (waitlist uses `/#waitlist`)
- `href: null` + `stripePriceId` → Checkout button via `/api/checkout`
- Update `functions/api/checkout.ts` if you add a fourth paid plan

## Components

Lightweight shadcn-style primitives under `src/components/ui/` (Button). Swap Lucide icons freely.

## SEO

`robots.ts` + `sitemap.ts` read `siteConfig.url`. Set a real production URL before indexing.
