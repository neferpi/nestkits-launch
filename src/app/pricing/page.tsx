import type { Metadata } from "next";
import { PricingCards } from "@/components/PricingCards";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Plans for ${siteConfig.name} — free waitlist during beta; paid tiers coming soon.`,
};

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
          Free during beta
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing</h1>
        <p className="mt-3 text-muted-foreground">
          Join the waitlist — no card required. Paid early-bird / founder tiers are coming soon.
          Stripe Checkout stays optional for when you want to charge <em>your</em> customers.
        </p>
      </div>
      <div className="mt-12">
        <PricingCards />
      </div>
      <p className="mx-auto mt-10 max-w-lg text-center text-xs text-muted-foreground">
        Default path is free waitlist only. To enable Checkout later for your own product, see{" "}
        <code className="rounded bg-muted px-1 py-0.5">docs/STRIPE.md</code>.
      </p>
    </main>
  );
}
