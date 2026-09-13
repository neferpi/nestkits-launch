/**
 * NestKits · Launch — single source of brand & copy.
 * Rebrand the whole site by editing this file.
 */

export const siteConfig = {
  name: "Acme Launch",
  shortName: "Acme",
  tagline: "Ship your indie product this weekend.",
  description:
    "The credible pre-launch page for solo founders — landing, waitlist, and early-bird checkout on Cloudflare Pages.",
  url: "https://launch.demo.example.com",
  ogImage: "/og.png",
  twitter: "@neferpi",
  email: "hello@example.com",

  hero: {
    eyebrow: "Now in early access",
    title: "Validate before you build.",
    subtitle:
      "A polished launch page with waitlist capture and Stripe Checkout — opinionated Nest defaults, ready for Cloudflare Pages.",
    primaryCta: "Join the waitlist",
    secondaryCta: "See pricing",
    secondaryHref: "/pricing/",
  },

  socialProof: {
    label: "Trusted by indie builders",
    logos: [
      { name: "PixelForge" },
      { name: "CronNest" },
      { name: "Stamply" },
      { name: "UnitNest" },
      { name: "HookCheck" },
    ],
    stats: [
      { value: "2.4k+", label: "waitlist signups" },
      { value: "$18k", label: "presale revenue" },
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
      title: "Stripe Checkout stub",
      description:
        "Early-bird / founder SKUs with a Checkout session helper and webhook stub. Takes money when you're ready.",
      icon: "creditCard" as const,
    },
  ],

  faq: [
    {
      q: "Is this a full SaaS boilerplate?",
      a: "No. NestKits Launch is landing + waitlist + pricing + Stripe Checkout stub. Auth, dashboard, and billing portal ship in NestKits SaaS Shell.",
    },
    {
      q: "Does it deploy to Cloudflare Pages?",
      a: "Yes. Static Next.js export to out/ plus Pages Functions for waitlist and Stripe. Docs match CF Pages in 2026 — no abandoned next-on-pages.",
    },
    {
      q: "What if I don't have Stripe or KV yet?",
      a: "Demo mode. Waitlist returns success with a setup note; pricing buttons explain missing keys. Ship the page first, wire payments later.",
    },
    {
      q: "Can I use this commercially?",
      a: "Yes — single-seat commercial license for your own projects. You may not resell or redistribute the template itself.",
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
      priceNote: "Join early access",
      description: "Get notified when we launch. No card required.",
      features: [
        "Early access invite",
        "Product updates",
        "Founder newsletter",
      ],
      cta: "Join waitlist",
      href: "/#waitlist",
      highlighted: false,
      stripePriceId: null as string | null,
    },
    {
      id: "early-bird",
      name: "Early bird",
      price: "$39",
      priceNote: "one-time · first 50",
      description: "Lock launch pricing and skip the waitlist.",
      features: [
        "Everything in Waitlist",
        "Lifetime lifetime access",
        "Founder Slack channel",
        "Priority support (7 days)",
      ],
      cta: "Get early bird",
      href: null,
      highlighted: true,
      stripePriceId: "price_EARLY_BIRD_REPLACE",
    },
    {
      id: "founder",
      name: "Founder",
      price: "$99",
      priceNote: "one-time · limited",
      description: "For founders who want the bundle path later.",
      features: [
        "Everything in Early bird",
        "1:1 setup call (30 min)",
        "Custom OG image review",
        "Pack #2 Docs coupon",
      ],
      cta: "Get founder",
      href: null,
      highlighted: false,
      stripePriceId: "price_FOUNDER_REPLACE",
    },
  ],

  cta: {
    title: "Ready to look legit and take emails?",
    subtitle:
      "Clone, edit site.config.ts, deploy to Cloudflare Pages. Under 30 minutes if the docs match — and they do.",
    button: "Join the waitlist",
  },

  footer: {
    blurb: "A NestKits starter by neferpi.",
    links: [
      { label: "Pricing", href: "/pricing/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type Plan = (typeof siteConfig.plans)[number];
