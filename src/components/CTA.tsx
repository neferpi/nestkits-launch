import { siteConfig } from "@/lib/site.config";
import { WaitlistForm } from "./WaitlistForm";

export function CTA() {
  const { cta } = siteConfig;
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 sm:px-12">
          <div className="pointer-events-none absolute inset-0 grid-glow opacity-70" aria-hidden />
          <div className="relative mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{cta.title}</h2>
            <p className="mt-3 text-muted-foreground">{cta.subtitle}</p>
            <div className="mx-auto mt-8 max-w-sm text-left">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
