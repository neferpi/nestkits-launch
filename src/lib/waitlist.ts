/**
 * Waitlist client adapter.
 * Storage lives in Cloudflare KV via functions/api/waitlist.ts.
 * Local / demo: graceful success when the Function is missing.
 */

export type WaitlistResult = {
  ok: boolean;
  demo?: boolean;
  message: string;
};

export async function submitWaitlist(email: string, hp?: string): Promise<WaitlistResult> {
  // Honeypot filled → fake success (bots)
  if (hp && hp.trim().length > 0) {
    return { ok: true, message: "You're on the list." };
  }

  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, message: "Enter a valid email address." };
  }

  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalized }),
    });
    const data = (await res.json()) as {
      ok?: boolean;
      demo?: boolean;
      message?: string;
      error?: string;
    };
    if (!res.ok) {
      return {
        ok: false,
        demo: data.demo,
        message: data.message || data.error || "Something went wrong.",
      };
    }
    return {
      ok: true,
      demo: data.demo,
      message: data.message || "You're on the list.",
    };
  } catch {
    // Demo mode: local static preview without Functions
    return {
      ok: true,
      demo: true,
      message:
        "Demo mode — signup accepted locally. Deploy with KV + Pages Functions to persist emails (docs/WAITLIST.md).",
    };
  }
}
