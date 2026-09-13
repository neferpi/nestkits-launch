import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of service stub for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: stub — replace before launch.</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          By using {siteConfig.name}, you agree to these terms. During beta, access is free via
          the waitlist. If you later enable paid checkout for your own customers, refunds follow
          the policy you state at purchase time.
        </p>
        <p>
          NestKits Launch itself is MIT-licensed open source from neferpi — use it to build your
          own products. Customize this page for your jurisdiction and product terms.
        </p>
        <p>
          Contact:{" "}
          <a className="text-accent hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </p>
        <p className="rounded-xl border border-border bg-card p-4 text-xs">
          This is a template stub. Customize for your jurisdiction and product.
        </p>
      </div>
    </main>
  );
}
