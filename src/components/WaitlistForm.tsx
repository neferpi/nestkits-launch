"use client";

import { FormEvent, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { submitWaitlist } from "@/lib/waitlist";

export function WaitlistForm({ redirectOnSuccess = true }: { redirectOnSuccess?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [demo, setDemo] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const result = await submitWaitlist(email, hp);
    if (result.ok) {
      setStatus("success");
      setDemo(Boolean(result.demo));
      setMessage(result.message);
      if (redirectOnSuccess) {
        const q = new URLSearchParams({
          type: "waitlist",
          ...(result.demo ? { demo: "1" } : {}),
        });
        router.push(`/thank-you/?${q.toString()}`);
      }
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  }

  if (status === "success" && !redirectOnSuccess) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent-muted/30 p-4 text-sm">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div>
          <p className="font-medium text-foreground">You&apos;re on the list</p>
          <p className="mt-1 text-muted-foreground">{message}</p>
          {demo && (
            <p className="mt-2 text-xs text-accent">Demo mode — emails not persisted yet.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      {/* Honeypot — leave empty */}
      <input
        type="text"
        name="company"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />
      <label className="sr-only" htmlFor="waitlist-email">
        Email
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-offset-background focus:ring-2 focus:ring-ring"
      />
      <Button type="submit" className="w-full" size="lg" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Joining…
          </>
        ) : (
          "Get early access"
        )}
      </Button>
      {status === "error" && (
        <p className="text-center text-sm text-danger" role="alert">
          {message}
        </p>
      )}
      <p className="text-center text-xs text-muted-foreground">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
