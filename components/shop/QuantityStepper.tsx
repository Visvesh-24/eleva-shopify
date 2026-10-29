"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

export function QuantityStepper({
  value,
  onChange,
  max = 99,
  label = "Quantity",
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  max?: number;
  label?: string;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-12";
  const w = size === "sm" ? "w-8" : "w-11";
  return (
    <div className={cn("inline-flex items-center rounded-sm border border-stone-300 bg-white", h)} role="group" aria-label={label}>
      <button
        type="button"
        className={cn("flex h-full items-center justify-center text-ink-soft hover:text-ink disabled:opacity-30", w)}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <MinusIcon size={14} />
      </button>
      <span className="min-w-[2ch] text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={cn("flex h-full items-center justify-center text-ink-soft hover:text-ink disabled:opacity-30", w)}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon size={14} />
      </button>
    </div>
  );
}
