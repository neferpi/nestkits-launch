# Waitlist

## Architecture

```
Browser WaitlistForm
  → POST /api/waitlist
  → functions/api/waitlist.ts (Pages Function)
  → Cloudflare KV binding WAITLIST
```

Keys: `email:you@domain.com` → JSON `{ email, createdAt, ua }`.

## Demo mode

If the Function is unreachable (local `next dev` / static preview) **or** KV is unbound, the client/API returns success with `demo: true` and a setup note. Buyers can ship the page before wiring storage.

## Honeypot

The form includes a hidden `company` field. If filled, the API returns a fake success (bots). Documented here so you don't "fix" it.

## Rate limiting

Pages Functions don't include a built-in rate limiter in this stub. Options:

1. Cloudflare WAF rate limiting rule on `/api/waitlist`
2. KV counter per IP (simple sliding window) — extend the Function when you need it
3. Turnstile challenge in front of the form

For most pre-launch volumes, WAF + honeypot is enough.

## Optional Resend confirm

Set secrets:

- `RESEND_API_KEY`
- `WAITLIST_FROM_EMAIL` (e.g. `Waitlist <onboarding@resend.dev>`)

When both are present, the Function sends a plain-text confirm email after KV write.

## Exporting emails

```bash
# List keys (wrangler)
npx wrangler kv key list --namespace-id=YOUR_ID --prefix=email:
```

Or write a small Worker/script to dump values to CSV.

## D1 alternative

Prefer SQL? Create a D1 database, bind as `DB`, and replace the KV `put/get` in `functions/api/waitlist.ts` with:

```sql
CREATE TABLE waitlist (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL
);
```

KV remains the Pack #1 default (zero schema, fine for email lists).
