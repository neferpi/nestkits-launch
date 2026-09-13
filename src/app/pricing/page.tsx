import type { Metadata } from "next";
import { PricingCards } from "@/components/PricingCards";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Plans for ${siteConfig.name} — waitlist, early bird, and founder tiers.`,
};

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h1>
        <p className="mt-3 text-muted-foreground">
          Start free on the waitlist. Early bird locks launch pricing via Stripe Checkout.
        </p>
      </div>
      <div className="mt-12">
        <PricingCards />
      </div>
      <p className="mx-auto mt-10 max-w-lg text-center text-xs text-muted-foreground">
        Stripe runs in test mode until you flip live keys. Missing env vars show a setup message — see{" "}
        <code className="rounded bg-muted px-1 py-0.5">docs/STRIPE.md</code>.
      </p>
    </main>
  );
}
