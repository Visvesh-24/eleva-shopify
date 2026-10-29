"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { budgets, recipients, tastes, matchesBudget, matchesTaste } from "@/lib/filters";
import { ArrowRight, GiftIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";
import { FadeIn } from "@/components/ui/FadeIn";

type Choice = { value: string; label: string; hint?: string };

/**
 * Three-step gift finder. Builds a shareable collection URL with
 * ?budget=&taste= params; the collection page applies them as filters.
 */
export function GiftFinder({ products }: { products: Product[] }) {
  const [who, setWho] = useState<string>("host");
  const [budget, setBudget] = useState<string | null>(null);
  const [taste, setTaste] = useState<string | null>(null);

  const recipient = recipients.find((r) => r.value === who)!;
  const href = useMemo(() => {
    const params = new URLSearchParams();
    if (budget) params.set("budget", budget);
    if (taste) params.set("taste", taste);
    const qs = params.toString();
    return `/collections/${recipient.collection}${qs ? `?${qs}` : ""}`;
  }, [recipient, budget, taste]);

  const matches = useMemo(
    () =>
      products.filter(
        (p) =>
          (recipient.collection === "all" || p.collections.includes(recipient.collection)) &&
          matchesBudget(p, budget) &&
          matchesTaste(p, taste),
      ).length,
    [products, recipient, budget, taste],
  );

  return (
    <section aria-labelledby="giftfinder-title" className="relative overflow-hidden bg-stone-100 py-14 md:py-24 lg:py-28">
      <div className="wrap">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow inline-flex items-center gap-2">
            <GiftIcon size={15} /> Gift finder
          </p>
          <h2 id="giftfinder-title" className="h-section mt-4">
            The perfect bottle in three questions
          </h2>
          <span aria-hidden className="hairline-copper mx-auto mt-6 block w-12" />
        </FadeIn>

        <FadeIn className="mt-9 rounded-md bg-white p-6 shadow-card ring-1 ring-line md:mt-12 md:p-10">
          <div className="grid gap-7 lg:grid-cols-3 lg:gap-8">
            <Step n={1} title="Who are you gifting?" name="who" choices={[...recipients]} value={who} onChange={(v) => setWho(v!)} />
            <Step
              n={2}
              title="What's your budget?"
              name="budget"
              choices={budgets.map((b) => ({ value: b.value, label: b.label }))}
              value={budget}
              onChange={setBudget}
              optional
            />
            <Step n={3} title="What do they enjoy?" name="taste" choices={tastes} value={taste} onChange={setTaste} optional />
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row md:mt-10 md:pt-8">
            <p className="text-sm text-ink-soft" aria-live="polite">
              {matches > 0 ? (
                <>
                  <strong className="font-semibold text-ink">{matches}</strong> {matches === 1 ? "bottle matches" : "bottles match"}{" "}
                  your choices
                </>
              ) : (
                "No exact match. Try widening your budget or taste, or call us for a personal pick."
              )}
            </p>
            <Link href={href} className={cn("btn-primary btn-shine w-full sm:w-auto", matches === 0 && "pointer-events-none opacity-50")} aria-disabled={matches === 0}>
              Show my gift ideas <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  name,
  choices,
  value,
  onChange,
  optional,
}: {
  n: number;
  title: string;
  name: string;
  choices: Choice[];
  value: string | null;
  onChange: (v: string | null) => void;
  optional?: boolean;
}) {
  return (
    <fieldset>
      <legend className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-copper font-serif text-lg text-copper">{n}</span>
        <span className="font-serif text-[1.4rem] sm:text-2xl">{title}</span>
      </legend>
      {/* Mobile: one swipeable row per step keeps the finder short; wraps from sm up */}
      <div className="no-scrollbar relative -mx-6 mt-4 flex scroll-px-6 gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:mt-5 sm:flex-wrap sm:overflow-visible sm:px-0">
        {choices.map((c) => {
          const checked = value === c.value;
          return (
            <label
              key={c.value}
              className={cn(
                "shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-4 py-2.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-copper",
                checked ? "border-copper bg-copper text-white" : "border-stone-300 text-ink hover:border-copper",
              )}
              title={c.hint}
            >
              <input
                type="radio"
                name={name}
                value={c.value}
                checked={checked}
                onChange={() => onChange(c.value)}
                onClick={() => optional && checked && onChange(null)}
                className="sr-only"
              />
              {c.label}
            </label>
          );
        })}
      </div>
      {optional ? <p className="mt-2 text-xs text-ink-muted">Optional. Tap again to clear.</p> : null}
    </fieldset>
  );
}
