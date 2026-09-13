"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { siteConfig, type Plan } from "@/lib/site.config";
import { startCheckout } from "@/lib/stripe";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function PlanCard({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function onBuy() {
    setLoading(true);
    setNote(null);
    const result = await startCheckout(plan.id);
    setLoading(false);
    if (result.ok && result.url) {
      window.location.href = result.url;
      return;
    }
    setNote(
      result.message ||
        "Stripe keys missing. Set STRIPE_SECRET_KEY and price IDs — see docs/STRIPE.md.",
    );
  }

  const isLink = Boolean(plan.href);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-6",
        plan.highlighted
          ? "border-accent shadow-[0_0_0_1px_oklch(0.72_0.16_155/0.35),0_20px_40px_-20px_oklch(0.72_0.16_155/0.35)]"
          : "border-border",
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground">
          Most popular
        </span>
      )}
      <h3 className="text-lg font-semibold">{plan.name}</h3>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
        <span className="text-sm text-muted-foreground">{plan.priceNote}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {isLink ? (
          <Link href={plan.href!} className="block">
            <Button variant={plan.highlighted ? "primary" : "outline"} className="w-full" size="lg">
              {plan.cta}
            </Button>
          </Link>
        ) : (
          <Button
            variant={plan.highlighted ? "primary" : "outline"}
            className="w-full"
            size="lg"
            disabled={loading}
            onClick={onBuy}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting…
              </>
            ) : (
              plan.cta
            )}
          </Button>
        )}
        {note && (
          <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground" role="status">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

export function PricingCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {siteConfig.plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
