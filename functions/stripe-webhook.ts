/**
 * POST /stripe-webhook
 * Stripe webhook stub: verify signature header presence, log event type, idempotent ack.
 * Wire STRIPE_WEBHOOK_SECRET in production. Full constructEvent needs the Stripe SDK
 * or a careful HMAC implementation — this stub documents the path.
 */

interface Env {
  STRIPE_WEBHOOK_SECRET?: string;
  WAITLIST?: KVNamespace;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const secret = context.env.STRIPE_WEBHOOK_SECRET;
  const sig = context.request.headers.get("stripe-signature");

  if (!secret) {
    return json(
      {
        received: false,
        demo: true,
        message: "STRIPE_WEBHOOK_SECRET not set. See docs/STRIPE.md.",
      },
      503,
    );
  }

  if (!sig) {
    return json({ error: "Missing stripe-signature header" }, 400);
  }

  // Stub: production should verify HMAC with the raw body + secret.
  // Keeping this intentional stub so buyers wire Stripe CLI / SDK knowingly.
  const raw = await context.request.text();
  let event: { id?: string; type?: string };
  try {
    event = JSON.parse(raw) as { id?: string; type?: string };
  } catch {
    return json({ error: "Invalid payload" }, 400);
  }

  const eventId = event.id || `anon-${Date.now()}`;
  const kv = context.env.WAITLIST;
  if (kv) {
    const seen = await kv.get(`stripe:event:${eventId}`);
    if (seen) {
      return json({ received: true, duplicate: true });
    }
    await kv.put(
      `stripe:event:${eventId}`,
      JSON.stringify({ type: event.type, at: new Date().toISOString() }),
      { expirationTtl: 60 * 60 * 24 * 7 },
    );
  }

  // Handle interesting events (log-only stub)
  if (event.type === "checkout.session.completed") {
    // Buyer: mark entitlement, send email, etc.
  }

  return json({ received: true, type: event.type || null });
};
