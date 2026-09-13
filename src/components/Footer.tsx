import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-medium text-foreground">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{siteConfig.footer.blurb}</p>
        </div>
        <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {siteConfig.footer.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-foreground">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
