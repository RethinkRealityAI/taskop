"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { submitNetlifyForm } from "@/lib/netlify-forms";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("company-website") as HTMLInputElement | null)?.value ?? "";
    if (honeypot) return;
    setStatus("loading");
    try {
      await submitNetlifyForm("newsletter", { email, "company-website": honeypot });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink" role="status">
        <Check className="size-4 text-accent" aria-hidden /> You&apos;re subscribed. Thank you.
      </p>
    );
  }

  return (
    <form name="newsletter" onSubmit={onSubmit} className="mt-4" noValidate>
      <input type="hidden" name="form-name" value="newsletter" />
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <p className="hidden" aria-hidden>
        <label>
          Don&apos;t fill this out: <input name="company-website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="flex items-center rounded-full bg-surface p-1 ring-1 ring-transparent transition-shadow focus-within:ring-accent">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@organization.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink placeholder:text-ink-3 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-accent disabled:opacity-60"
          aria-label="Subscribe"
        >
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-600" role="alert">
          Something went wrong. Please email {`hello@taskopglobalconsulting.com`} instead.
        </p>
      )}
    </form>
  );
}
