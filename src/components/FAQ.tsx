import { siteConfig } from "@/lib/site.config";

export function FAQ() {
  return (
    <section className="py-20 sm:py-24" id="faq">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          FAQ
        </h2>
        <dl className="mx-auto mt-10 max-w-2xl divide-y divide-border">
          {siteConfig.faq.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="font-medium text-foreground">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
