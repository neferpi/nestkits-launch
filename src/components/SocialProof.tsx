import { siteConfig } from "@/lib/site.config";

export function SocialProof() {
  const { socialProof } = siteConfig;
  return (
    <section className="border-y border-border/60 bg-card/30 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {socialProof.label}
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {socialProof.logos.map((logo) => (
            <li
              key={logo.name}
              className="text-sm font-semibold tracking-wide text-muted-foreground/80"
            >
              {logo.name}
            </li>
          ))}
        </ul>
        <dl className="mt-10 grid grid-cols-3 gap-4 text-center">
          {socialProof.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
