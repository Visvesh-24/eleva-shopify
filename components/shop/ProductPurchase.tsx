"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { siteConfig, formatDeadline } from "@/lib/config";
import { formatPrice, cn } from "@/lib/format";
import { analytics } from "@/lib/analytics";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";
import { TrustBadges } from "./TrustBadges";
import { CheckIcon, GiftIcon, TruckIcon } from "@/components/ui/Icons";

/**
 * Variant selector, quantity, Add to cart, gift options and delivery info.
 * Shows a sticky Add to cart bar on mobile once the main button scrolls away.
 */
export function ProductPurchase({ product }: { product: Product }) {
  const cart = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const soldOut = variant.stock <= 0;
  const lowStock = !soldOut && variant.stock <= siteConfig.commerce.lowStockThreshold;
  const isLiquor = product.type !== "Glassware";

  useEffect(() => {
    analytics.viewItem(product, product.variants[0]);
  }, [product]);

  // Sticky mobile bar: visible once the main CTA has scrolled above the viewport.
  // (A scroll check rather than IntersectionObserver, which misses jumps past the button.)
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = buttonRef.current;
      if (el) setShowSticky(el.getBoundingClientRect().bottom < 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Lift the floating WhatsApp button above the sticky bar.
  useEffect(() => {
    const root = document.documentElement;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    root.style.setProperty("--sticky-bar-h", showSticky && mobile ? "76px" : "0px");
    return () => {
      root.style.removeProperty("--sticky-bar-h");
    };
  }, [showSticky]);

  const add = () => {
    cart.addItem(product, variant, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const label = soldOut ? "Sold out" : added ? "Added to cart" : `Add to cart · ${formatPrice(variant.price * qty)}`;

  return (
    <div>
      {product.variants.length > 1 ? (
        <fieldset className="mt-8">
          <legend className="eyebrow mb-3 text-ink">Size</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <label
                key={v.id}
                className={cn(
                  "cursor-pointer rounded-sm border px-5 py-3 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-copper",
                  v.id === variantId ? "border-ink bg-ink text-white" : "border-stone-300 bg-white hover:border-ink",
                  v.stock <= 0 && "opacity-50 line-through",
                )}
              >
                <input
                  type="radio"
                  name="variant"
                  value={v.id}
                  checked={v.id === variantId}
                  onChange={() => {
                    setVariantId(v.id);
                    setQty(1);
                  }}
                  className="sr-only"
                />
                {v.title} · {formatPrice(v.price)}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {lowStock ? (
        <p className="mt-6 flex items-center gap-2 text-sm font-medium text-copper">
          <span className="h-2 w-2 rounded-full bg-copper" aria-hidden /> Only {variant.stock} left in stock
        </p>
      ) : !soldOut ? (
        <p className="mt-6 flex items-center gap-2 text-sm text-agave">
          <span className="h-2 w-2 rounded-full bg-agave" aria-hidden /> In stock, ready to ship from Toronto
        </p>
      ) : null}

      <div className="mt-4 flex gap-3">
        <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, variant.stock)} />
        <button ref={buttonRef} type="button" onClick={add} disabled={soldOut} className="btn-primary flex-1">
          {added ? <CheckIcon size={16} /> : null}
          {label}
        </button>
      </div>

      <TrustBadges className="mt-6" additiveFree={Boolean(product.badges.additiveFree)} />

      {/* Gift options write to the cart so they carry through to checkout */}
      {isLiquor || product.badges.giftReady ? (
        <div className="mt-8 rounded-sm border border-line bg-stone-50 p-5">
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={cart.giftWrap}
              onChange={(e) => cart.setGift({ giftWrap: e.target.checked })}
              className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-copper))]"
            />
            <span>
              <span className="flex items-center gap-1.5 font-medium">
                <GiftIcon size={16} className="text-copper" /> Make it a gift
              </span>
              <span className="text-xs text-ink-muted">
                Signature gift wrap +{formatPrice(siteConfig.commerce.giftWrapPrice)}. Prices are never included in gift parcels.
              </span>
            </span>
          </label>
          {cart.giftWrap ? (
            <label className="mt-4 block">
              <span className="text-xs font-medium text-ink-soft">Gift message (optional)</span>
              <textarea
                rows={2}
                maxLength={250}
                value={cart.giftMessage}
                onChange={(e) => cart.setGift({ giftMessage: e.target.value })}
                placeholder="Cheers to a wonderful year…"
                className="field mt-1.5 resize-none text-sm"
              />
            </label>
          ) : null}
        </div>
      ) : null}

      {/* Delivery info (MOCK timings: see TODO.md) */}
      <div className="mt-6 flex gap-3 text-sm text-ink-soft">
        <TruckIcon size={20} className="mt-0.5 shrink-0 text-copper" />
        <div>
          <p>
            <span className="font-medium text-ink">Free shipping</span> on orders over{" "}
            {formatPrice(siteConfig.commerce.freeShippingThreshold, { round: true })}. Ships from Toronto in 1–2 business days.
          </p>
          <p className="mt-1">
            Gifting for a team? Corporate orders close {formatDeadline(siteConfig.corporate.orderDeadline)}.
          </p>
        </div>
      </div>

      {/* Sticky mobile Add to cart */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden",
          showSticky ? "translate-y-0" : "translate-y-full",
        )}
        aria-hidden={!showSticky}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-lg leading-tight">{product.name}</p>
            <p className="text-xs text-ink-muted">
              {variant.title} · {formatPrice(variant.price)}
            </p>
          </div>
          <button type="button" onClick={add} disabled={soldOut} tabIndex={showSticky ? 0 : -1} className="btn-primary btn-sm shrink-0">
            {soldOut ? "Sold out" : added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
