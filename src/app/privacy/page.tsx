import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy policy stub for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: stub — replace before launch.</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          {siteConfig.name} (&quot;we&quot;) collects email addresses you submit via the waitlist
          form and payment-related data processed by Stripe when you purchase.
        </p>
        <p>
          Waitlist emails are stored in Cloudflare KV (or your configured store). We use them to
          notify you about product availability and related updates. We do not sell your email.
        </p>
        <p>
          Payments are processed by Stripe; we do not store full card numbers. See Stripe&apos;s
          privacy policy for processor details.
        </p>
        <p>
          Contact:{" "}
          <a className="text-accent hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </p>
        <p className="rounded-xl border border-border bg-card p-4 text-xs">
          This is a template stub. Have counsel review before publishing a live product.
        </p>
      </div>
    </main>
  );
}
