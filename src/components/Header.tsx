import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
            N
          </span>
          <span className="text-foreground group-hover:text-accent transition-colors">
            {siteConfig.shortName}
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/pricing/"
            className="rounded-lg px-3 py-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/#waitlist"
            className="rounded-lg bg-accent px-3 py-1.5 font-medium text-accent-foreground transition hover:brightness-110"
          >
            Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
