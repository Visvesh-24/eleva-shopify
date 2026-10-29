"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const AGE_KEY = "eleva.age-verified.v1";

/**
 * Inline script run in <head> before paint: marks <html data-age-ok> when the
 * visitor already confirmed their age, so the gate never flashes for them.
 */
export const ageGateScript = `try{if(localStorage.getItem("${AGE_KEY}")==="1")document.documentElement.setAttribute("data-age-ok","")}catch(e){}`;

/**
 * Full-screen age gate shown on first visit. It is server-rendered and hidden
 * via CSS (html[data-age-ok]) so content stays crawlable.
 */
export function AgeGate() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const confirm = () => {
    try {
      window.localStorage.setItem(AGE_KEY, "1");
    } catch {
      /* private mode: gate will show again next visit */
    }
    document.documentElement.setAttribute("data-age-ok", "");
  };

  return (
    <div
      id="age-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ivory px-6 py-10"
    >
      <div className="w-full max-w-md text-center animate-fade-in">
        <Image
          src="/images/brand/logo-full.png"
          alt="Eleva Imports"
          width={1254}
          height={1254}
          priority
          sizes="128px"
          className="mx-auto h-28 w-28 md:h-32 md:w-32"
        />
        <span aria-hidden className="hairline-copper mx-auto mt-8 block w-12" />
        <p className="eyebrow mt-8">Welcome</p>
        <h2 id="age-gate-title" className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
          Are you of legal drinking age?
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">
          You must be of legal drinking age in your province (19+, or 18+ in Alberta, Manitoba and Québec) to enter this site.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button type="button" onClick={confirm} className="btn-primary w-full" disabled={!mounted} autoFocus>
            I am of legal drinking age
          </button>
          <a href="https://www.google.com" className="btn-secondary w-full" rel="noopener noreferrer">
            I am not. Exit site
          </a>
        </div>
        <p className="mt-8 text-xs text-ink-muted">Please enjoy responsibly.</p>
      </div>
    </div>
  );
}
