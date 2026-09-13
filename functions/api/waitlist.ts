/**
 * POST /api/waitlist
 * Stores email in Cloudflare KV (binding: WAITLIST).
 * Demo mode when KV is unbound — returns success with note.
 */

interface Env {
  WAITLIST?: KVNamespace;
  RESEND_API_KEY?: string;
  WAITLIST_FROM_EMAIL?: string;
}

type Body = { email?: string; company?: string };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: Body;
  try {
    body = (await context.request.json()) as Body;
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  // Honeypot
  if (body.company && String(body.company).trim()) {
    return json({ ok: true, message: "You're on the list." });
  }

  const email = String(body.email || "")
    .trim()
    .toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Enter a valid email address." }, 400);
  }

  const kv = context.env.WAITLIST;
  if (!kv) {
    return json({
      ok: true,
      demo: true,
      message:
        "Demo mode — KV binding WAITLIST missing. Signup accepted but not stored. See docs/WAITLIST.md.",
    });
  }

  const key = `email:${email}`;
  const existing = await kv.get(key);
  if (existing) {
    return json({ ok: true, message: "You're already on the list." });
  }

  const record = JSON.stringify({
    email,
    createdAt: new Date().toISOString(),
    ua: context.request.headers.get("user-agent")?.slice(0, 200) || null,
  });
  await kv.put(key, record);

  // Optional Resend confirm (feature-flagged)
  const resendKey = context.env.RESEND_API_KEY;
  const from = context.env.WAITLIST_FROM_EMAIL;
  if (resendKey && from) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: email,
          subject: "You're on the waitlist",
          text: "Thanks for joining. We'll email you when early access opens.",
        }),
      });
    } catch {
      // Non-fatal
    }
  }

  return json({ ok: true, message: "You're on the list." });
};
