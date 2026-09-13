/**
 * POST /api/checkout
 * Creates a Stripe Checkout Session for early-bird / founder plans.
 * Graceful demo response when STRIPE_SECRET_KEY is missing.
 */

interface Env {
  STRIPE_SECRET_KEY?: string;
  STRIPE_PRICE_EARLY_BIRD?: string;
  STRIPE_PRICE_FOUNDER?: string;
  SITE_URL?: string;
}

type Body = { planId?: string };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: Body;
  try {
    body = (await context.request.json()) as Body;
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const planId = body.planId;
  if (planId !== "early-bird" && planId !== "founder") {
    return json({ error: "Unknown plan" }, 400);
  }

  const secret = context.env.STRIPE_SECRET_KEY;
  const priceId =
    planId === "early-bird"
      ? context.env.STRIPE_PRICE_EARLY_BIRD
      : context.env.STRIPE_PRICE_FOUNDER;

  if (!secret || !priceId || priceId.includes("REPLACE")) {
    return json(
      {
        demo: true,
        message:
          "Stripe not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_* in Pages secrets — see docs/STRIPE.md.",
      },
      503,
    );
  }

  const siteUrl = (context.env.SITE_URL || new URL(context.request.url).origin).replace(
    /\/$/,
    "",
  );

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", `${siteUrl}/thank-you/?type=purchase`);
  params.set("cancel_url", `${siteUrl}/pricing/`);
  params.set("line_items[0][price]", priceId);
  params.set("line_items[0][quantity]", "1");
  params.set("metadata[planId]", planId);

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const session = (await stripeRes.json()) as { id?: string; url?: string; error?: { message?: string } };
  if (!stripeRes.ok || !session.url) {
    return json(
      { error: session.error?.message || "Failed to create Checkout session" },
      502,
    );
  }

  return json({ url: session.url });
};
