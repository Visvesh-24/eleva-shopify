"use client";

import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { TruckIcon } from "@/components/ui/Icons";

/** Progress toward the free-shipping threshold (raises order value). */
export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const threshold = siteConfig.commerce.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
  return (
    <div>
      <p className="flex items-center gap-2 text-[0.8125rem] text-ink-soft" aria-live="polite">
        <TruckIcon size={16} className="shrink-0 text-copper" />
        {remaining > 0 ? (
          <span>
            You&rsquo;re <strong className="font-semibold text-ink">{formatPrice(remaining)}</strong> away from free shipping
          </span>
        ) : (
          <span className="font-medium text-ink">You&rsquo;ve unlocked free shipping</span>
        )}
      </p>
      <div
        className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-stone-200"
        role="progressbar"
        aria-label="Progress to free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="h-full bg-copper transition-[width] duration-700 ease-lux" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
