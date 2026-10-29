"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { ProductImage } from "./ProductImage";
import { TrustBadges } from "./TrustBadges";
import { FreeShippingBar } from "./FreeShippingBar";
import { formatPrice } from "@/lib/format";
import { ShieldIcon } from "@/components/ui/Icons";

/**
 * Checkout stub. In production CartProvider.checkout() redirects to Shopify's
 * hosted checkout (cart.checkoutUrl) and this page is never reached.
 * No payment details are collected or simulated here.
 */
export function CheckoutStub() {
  const cart = useCart();
  const total = cart.subtotal + cart.giftWrapTotal;

  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
        <div>
          <p className="eyebrow inline-flex items-center gap-2">
            <ShieldIcon size={15} className="text-agave" /> Secure checkout
          </p>
          <h1 className="mt-4 font-serif text-5xl">Checkout</h1>
          <div className="mt-8 rounded-sm bg-white p-8 ring-1 ring-line">
            <p className="font-serif text-2xl">This is a demo storefront</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              When the store is connected to Shopify, this button hands your cart to Shopify&rsquo;s secure, PCI-compliant
              checkout, where shipping, taxes, payment and age confirmation are handled. No payment is taken on this demo.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" disabled className="btn-primary" title="Connects to Shopify checkout after launch">
                Continue to secure payment
              </button>
              <Link href="/collections/all" className="btn-secondary">
                Keep shopping
              </Link>
            </div>
          </div>
          <div className="mt-8 grid gap-4 text-sm text-ink-soft sm:grid-cols-2">
            <p>
              <span className="font-medium text-ink">Need help with a large or corporate order?</span> Call{" "}
              <a href="tel:+19057181247" className="underline">
                905-718-1247
              </a>
              .
            </p>
            <p>Proof of age may be required on delivery. Please enjoy responsibly.</p>
          </div>
        </div>

        <aside aria-labelledby="summary-title" className="h-fit rounded-sm bg-white p-6 ring-1 ring-line md:p-8">
          <h2 id="summary-title" className="font-serif text-2xl">
            Order summary
          </h2>
          {cart.hydrated && cart.lines.length === 0 ? (
            <div className="mt-6">
              <p className="text-sm text-ink-soft">Your cart is empty.</p>
              <Link href="/collections/all" className="btn-primary mt-5 w-full">
                Shop the collection
              </Link>
            </div>
          ) : (
            <>
              <ul className="mt-6 divide-y divide-line">
                {cart.lines.map((l) => (
                  <li key={l.variantId} className="flex items-center gap-4 py-4">
                    <div className="relative w-14 shrink-0 overflow-hidden rounded-sm border border-line">
                      <ProductImage
                        product={{ name: l.name, brand: l.brand, type: l.type, images: l.image ? [l.image] : [] }}
                        sizes="56px"
                        zoom={false}
                        compact
                      />
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[0.625rem] text-white">
                        {l.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{l.name}</p>
                      <p className="text-xs text-ink-muted">{l.variantTitle}</p>
                    </div>
                    <p className="text-sm tabular-nums">{formatPrice(l.price * l.quantity)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-2 border-t border-line pt-5">
                <FreeShippingBar subtotal={cart.subtotal} />
              </div>
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(cart.subtotal)}</dd>
                </div>
                {cart.giftWrapTotal ? (
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Gift wrap</dt>
                    <dd className="tabular-nums">{formatPrice(cart.giftWrapTotal)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Shipping &amp; taxes</dt>
                  <dd className="text-ink-muted">Calculated at payment</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
                  <dt>Total (CAD)</dt>
                  <dd className="tabular-nums">{formatPrice(total)}</dd>
                </div>
              </dl>
              {cart.giftMessage ? (
                <p className="mt-5 rounded-sm bg-stone-50 p-4 text-sm italic text-ink-soft">&ldquo;{cart.giftMessage}&rdquo;</p>
              ) : null}
              <TrustBadges compact className="mt-6" />
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
