/**
 * Stripe Checkout helpers (client + docs).
 * Real session creation runs in functions/api/checkout.ts on Cloudflare Pages.
 */

import { siteConfig } from "./site.config";

export function getStripePublishableKey(): string | undefined {
  if (typeof process !== "undefined") {
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  }
  return undefined;
}

export function hasStripeConfigured(): boolean {
  const key = getStripePublishableKey();
  return Boolean(key && key.length > 10 && !key.includes("REPLACE"));
}

export function planById(id: string) {
  return siteConfig.plans.find((p) => p.id === id);
}

/** Client-side checkout kickoff → Pages Function */
export async function startCheckout(planId: string): Promise<{
  ok: boolean;
  url?: string;
  demo?: boolean;
  message?: string;
}> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });
    const data = (await res.json()) as {
      url?: string;
      demo?: boolean;
      message?: string;
      error?: string;
    };
    if (!res.ok) {
      return {
        ok: false,
        demo: data.demo,
        message: data.message || data.error || "Checkout unavailable",
      };
    }
    return {
      ok: true,
      url: data.url,
      demo: data.demo,
      message: data.message,
    };
  } catch {
    return {
      ok: false,
      demo: true,
      message:
        "Stripe Checkout API not reachable. Deploy with Pages Functions and set STRIPE_SECRET_KEY — see docs/STRIPE.md.",
    };
  }
}
