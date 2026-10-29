"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";
import { siteConfig } from "@/lib/config";
import { CheckIcon } from "@/components/ui/Icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter sign-up (front-end validation only).
 * TODO: POST to Shopify Customer API / Klaviyo when wiring the backend.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const { welcomeDiscountPercent, welcomeDiscountCode } = siteConfig.commerce;

  if (done) {
    return (
      <div className="rounded-sm bg-white p-6 text-center ring-1 ring-line" role="status">
        <CheckIcon size={26} className="mx-auto text-agave" />
        <p className="mt-3 font-serif text-2xl">Welcome to Eleva</p>
        <p className="mt-2 text-sm text-ink-soft">
          Use code <strong className="font-semibold tracking-wide text-ink">{welcomeDiscountCode}</strong> for {welcomeDiscountPercent}% off
          your first order.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email.trim())) {
          setError("Please enter a valid email address.");
          return;
        }
        setError(null);
        analytics.formSubmit("newsletter");
        setDone(true);
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "newsletter-error" : "newsletter-note"}
          className="field flex-1"
        />
        <button type="submit" className="btn-primary shrink-0">
          Get {welcomeDiscountPercent}% off
        </button>
      </div>
      {error ? (
        <p id="newsletter-error" className="mt-2 text-sm text-[#A23B2A]" role="alert">
          {error}
        </p>
      ) : null}
      <p id="newsletter-note" className="mt-3 text-xs leading-relaxed text-ink-muted">
        By subscribing you confirm you are of legal drinking age and agree to receive emails from Eleva Imports. Unsubscribe
        anytime.
      </p>
    </form>
  );
}
