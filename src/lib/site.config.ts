/**
 * NestKits · Launch — single source of brand & copy.
 * Rebrand the whole site by editing this file.
 *
 * Default path: free waitlist only. Stripe Checkout is optional —
 * enable when *you* (the template user) want to charge *your* customers.
 */

export const siteConfig = {
  name: "Acme Launch",
  shortName: "Acme",
  tagline: "Ship your indie product this weekend.",
  description:
    "The credible pre-launch page for solo founders — landing and waitlist on Cloudflare Pages. Optional Stripe when you're ready to charge your customers.",
  url: "https://nestkits-launch.pages.dev",
  ogImage: "/og.png",
  twitter: "@neferpi",
  email: "hello@example.com",

  hero: {
    eyebrow: "Free during beta",
    title: "Validate before you build.",
    subtitle:
      "A polished launch page with waitlist capture on Cloudflare Pages — opinionated Nest defaults. Stripe is optional and off by default.",
    primaryCta: "Join the waitlist",
    secondaryCta: "See plans",
    secondaryHref: "/pricing/",
  },

  socialProof: {
    label: "Built for indie builders",
    logos: [
      { name: "PixelForge" },
      { name: "CronNest" },
      { name: "Stamply" },
      { name: "UnitNest" },
      { name: "HookCheck" },
    ],
    stats: [
      { value: "2.4k+", label: "waitlist signups" },
      { value: "Free", label: "during beta" },
      { value: "48h", label: "avg. time to launch" },
    ],
  },

  features: [
    {
      title: "Landing that converts",
      description:
        "Hero, social proof, features, FAQ, and CTA — dark-first Nest UI, not generic AI slop. Edit copy in one config.",
      icon: "sparkles" as const,
    },
    {
      title: "Waitlist on Cloudflare KV",
      description:
        "Pages Function + KV binding. Honeypot, demo mode when keys are missing, optional Resend confirm path.",
      icon: "mail" as const,
    },
    {
      title: "Optional Stripe Checkout",
      description:
        "Stub ready when *you* want to charge *your* customers. Off by default — ship waitlist first.",
      icon: "creditCard" as const,
    },
  ],

  faq: [
    {
      q: "Is this a full SaaS boilerplate?",
      a: "No. NestKits Launch is landing + waitlist + optional Stripe Checkout stub. Auth, dashboard, and billing portal ship in NestKits SaaS Shell.",
    },
    {
      q: "Does it deploy to Cloudflare Pages?",
      a: "Yes. Static Next.js export to out/ plus Pages Functions for waitlist and Stripe. Docs match CF Pages in 2026 — no abandoned next-on-pages.",
    },
    {
      q: "Do I need Stripe to ship?",
      a: "No. Default path is free waitlist only. Demo mode works without KV or Stripe. Turn on Checkout later if you want to charge your own customers — see docs/STRIPE.md.",
    },
    {
      q: "Is NestKits Launch free?",
      a: "Yes — MIT licensed by neferpi. Commercial Gumroad sales are paused. Use it for personal and commercial projects.",
    },
    {
      q: "How do I rebrand?",
      a: "Edit src/lib/site.config.ts. Product name, tagline, features, plans, and social proof all live there. See docs/CUSTOMIZE.md.",
    },
  ],

  plans: [
    {
      id: "waitlist",
      name: "Waitlist",
      price: "Free",
      priceNote: "join early access",
      description: "Get notified when we launch. No card required.",
      features: [
        "Early access invite",
        "Product updates",
        "Founder newsletter",
      ],
      cta: "Join waitlist",
      href: "/#waitlist",
      highlighted: true,
      stripePriceId: null as string | null,
    },
    {
      id: "early-bird",
      name: "Early bird",
      price: "Soon",
      priceNote: "free during beta",
      description: "Paid early-bird is coming later. Join the waitlist for now.",
      features: [
        "Everything in Waitlist",
        "Launch pricing lock (soon)",
        "Founder updates",
        "No checkout required today",
      ],
      cta: "Join waitlist",
      href: "/#waitlist",
      highlighted: false,
      // Optional: set a real price id + href:null when *you* want Checkout for your customers
      stripePriceId: null as string | null,
    },
    {
      id: "founder",
      name: "Founder",
      price: "Soon",
      priceNote: "coming soon",
      description: "Higher tier later. Waitlist is the path during beta.",
      features: [
        "Everything in Early bird",
        "Setup call (when live)",
        "Custom review (when live)",
        "Join waitlist today",
      ],
      cta: "Join waitlist",
      href: "/#waitlist",
      highlighted: false,
      stripePriceId: null as string | null,
    },
  ],

  cta: {
    title: "Ready to look legit and take emails?",
    subtitle:
      "Clone, edit site.config.ts, deploy to Cloudflare Pages. Under 30 minutes if the docs match — and they do.",
    button: "Join the waitlist",
  },

  footer: {
    blurb: "A free NestKits starter by neferpi · MIT.",
    links: [
      { label: "Pricing", href: "/pricing/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type Plan = (typeof siteConfig.plans)[number];
