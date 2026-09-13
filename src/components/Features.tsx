import { CreditCard, Mail, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

const icons = {
  sparkles: Sparkles,
  mail: Mail,
  creditCard: CreditCard,
} as const;

export function Features() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Everything to look legit and capture emails
          </h2>
          <p className="mt-3 text-muted-foreground">
            Free starters get you a pretty page. NestKits gets you on Cloudflare with a waitlist that stores — Stripe optional later for your customers.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {siteConfig.features.map((f) => {
            const Icon = icons[f.icon];
            return (
              <li
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 transition hover:border-accent/40"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-muted text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
