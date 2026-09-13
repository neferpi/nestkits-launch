import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { WaitlistForm } from "./WaitlistForm";

export function Hero() {
  const { hero } = siteConfig;
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 noise opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]">
            {hero.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#waitlist"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-medium text-accent-foreground transition hover:brightness-110 shadow-[0_0_0_1px_oklch(0.72_0.16_155/0.3),0_8px_24px_-8px_oklch(0.72_0.16_155/0.45)]"
            >
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={hero.secondaryHref}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-transparent px-6 text-base font-medium text-foreground transition hover:border-accent/50 hover:bg-accent-muted/40"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>

        <div id="waitlist" className="mx-auto mt-14 max-w-md scroll-mt-24">
          <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-xl shadow-black/20 backdrop-blur">
            <p className="mb-3 text-center text-sm font-medium text-foreground">
              Join the waitlist
            </p>
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
