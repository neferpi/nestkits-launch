"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";

function Inner() {
  const params = useSearchParams();
  const isPurchase = params.get("type") === "purchase";
  const isDemo = params.get("demo") === "1";

  return (
    <main className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-muted text-accent">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">
        {isPurchase ? "Payment received" : "You're on the list"}
      </h1>
      <p className="mt-4 text-muted-foreground">
        {isPurchase
          ? "Thanks for backing early access. Check your email for the receipt and next steps."
          : "We'll email you when it's time. No spam — just launch updates."}
      </p>
      {isDemo && (
        <p className="mt-4 rounded-xl border border-accent/30 bg-accent-muted/30 px-4 py-3 text-sm text-accent">
          Demo mode — this response was simulated because KV/Stripe isn&apos;t wired yet.
        </p>
      )}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-medium text-accent-foreground hover:brightness-110"
        >
          Back home
        </Link>
        <Link
          href="/pricing/"
          className="inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-medium hover:bg-muted"
        >
          View pricing
        </Link>
      </div>
    </main>
  );
}

export function ThankYouContent() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-24 text-center">
          <p className="text-muted-foreground">Loading…</p>
        </main>
      }
    >
      <Inner />
    </Suspense>
  );
}
