"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/format";

const bottles = [
  { slug: "huizar-cristalino", label: "Cristalino" },
  { slug: "huizar-plata", label: "Plata" },
  { slug: "huizar-rosado", label: "Rosado" },
  { slug: "cofradia-iguanas", label: "Iguanas" },
];

/**
 * Personalization preview: visitors upload a logo and type a message to see
 * a mock gift tag beside the bottle. Purely client-side (object URL).
 */
export function LogoPreview() {
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("Thank you for an exceptional year.");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [bottle, setBottle] = useState(bottles[0].slug);

  useEffect(() => () => void (logoUrl && URL.revokeObjectURL(logoUrl)), [logoUrl]);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative mx-auto flex w-full max-w-lg items-end justify-center gap-4 rounded-sm bg-gradient-to-b from-stone-50 to-stone-200 px-6 pb-10 pt-12 sm:gap-8">
        <div className="relative w-[46%]">
          <Image src={`/images/products/${bottle}.png`} alt="Selected gift bottle" width={1000} height={1250} sizes="240px" className="h-auto w-full" />
        </div>
        {/* Gift tag mockup */}
        <div className="relative mb-6 w-[44%] rotate-[-3deg] rounded-sm bg-white p-5 text-center shadow-card ring-1 ring-line">
          <span aria-hidden className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-stone-300" />
          <div className="mt-3 flex h-14 items-center justify-center">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt="Your uploaded logo" className="max-h-14 max-w-full object-contain" />
            ) : (
              <span className="font-serif text-xl tracking-[0.18em] text-ink-muted">{company ? company.toUpperCase() : "YOUR LOGO"}</span>
            )}
          </div>
          <span aria-hidden className="hairline-copper mx-auto mt-3 block w-8" />
          <p className="mt-3 break-words font-serif text-[0.95rem] italic leading-snug text-ink">{message || " "}</p>
          {company ? <p className="mt-2 text-[0.5625rem] font-semibold uppercase tracking-label text-copper">{company}</p> : null}
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <p className="mb-2 text-[0.8125rem] font-medium text-ink">Choose a bottle</p>
          <div className="flex flex-wrap gap-2">
            {bottles.map((b) => (
              <button
                key={b.slug}
                type="button"
                aria-pressed={bottle === b.slug}
                onClick={() => setBottle(b.slug)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm",
                  bottle === b.slug ? "border-copper bg-copper text-white" : "border-stone-300 bg-white hover:border-copper",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-[0.8125rem] font-medium text-ink">Company name</span>
          <input className="field" value={company} maxLength={40} onChange={(e) => setCompany(e.target.value)} placeholder="Your company" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.8125rem] font-medium text-ink">Message</span>
          <input className="field" value={message} maxLength={80} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.8125rem] font-medium text-ink">Upload a logo to preview</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setLogoUrl(URL.createObjectURL(f));
            }}
            className="block w-full text-sm text-ink-soft file:mr-4 file:rounded-sm file:border-0 file:bg-stone-100 file:px-4 file:py-2.5 file:text-xs file:font-semibold file:uppercase file:tracking-label file:text-ink hover:file:bg-stone-200"
          />
          <span className="mt-1.5 block text-xs text-ink-muted">Preview only. Your logo stays on your device.</span>
        </label>
      </div>
    </div>
  );
}
