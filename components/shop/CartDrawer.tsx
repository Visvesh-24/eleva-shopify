"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { Drawer } from "@/components/ui/Drawer";
import { CloseIcon, GiftIcon, PlusIcon } from "@/components/ui/Icons";
import { ProductImage } from "./ProductImage";
import { QuantityStepper } from "./QuantityStepper";
import { FreeShippingBar } from "./FreeShippingBar";
import { TrustBadges } from "./TrustBadges";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/config";
import type { Product } from "@/lib/products";

/**
 * Cart drawer: line items, free-shipping progress, "Complete the gift" upsells,
 * gift wrap + message, subtotal and the checkout stub.
 */
export function CartDrawer({ upsells }: { upsells: Product[] }) {
  const cart = useCart();
  const inCart = new Set(cart.lines.map((l) => l.slug));
  const suggestions = upsells.filter((p) => !inCart.has(p.slug)).slice(0, 3);

  return (
    <Drawer open={cart.open} onClose={cart.closeCart} label="Shopping cart">
      <header className="flex items-center justify-between border-b border-line px-6 py-5">
        <h2 className="font-serif text-2xl">
          Your cart{" "}
          <span className="font-sans text-sm font-normal text-ink-muted">
            ({cart.count} {cart.count === 1 ? "item" : "items"})
          </span>
        </h2>
        <button type="button" onClick={cart.closeCart} aria-label="Close cart" className="-mr-2 p-2 text-ink-soft hover:text-ink">
          <CloseIcon />
        </button>
      </header>

      {cart.lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="font-serif text-2xl">Your cart is empty</p>
          <p className="mt-3 text-sm text-ink-soft">Not sure where to start? Let a master guide your first bottle.</p>
          <div className="mt-8 flex w-full flex-col gap-3">
            <Link href="/collections/all" onClick={cart.closeCart} className="btn-primary">
              Shop the collection
            </Link>
            <Link href="/collections/start-here" onClick={cart.closeCart} className="btn-secondary">
              Start with tasting minis
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            <div className="border-b border-line bg-stone-50 px-6 py-4">
              <FreeShippingBar subtotal={cart.subtotal} />
            </div>

            <ul className="divide-y divide-line px-6">
              {cart.lines.map((line) => (
                <li key={line.variantId} className="flex gap-4 py-5">
                  <Link
                    href={`/products/${line.slug}`}
                    onClick={cart.closeCart}
                    className="w-20 shrink-0 overflow-hidden rounded-sm border border-line"
                  >
                    <ProductImage
                      product={{ name: line.name, brand: line.brand, type: line.type, images: line.image ? [line.image] : [] }}
                      sizes="80px"
                      zoom={false}
                      compact
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[0.625rem] font-semibold uppercase tracking-label text-copper">{line.brand}</p>
                        <Link
                          href={`/products/${line.slug}`}
                          onClick={cart.closeCart}
                          className="mt-0.5 block font-serif text-lg leading-snug hover:text-copper"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-muted">{line.variantTitle}</p>
                      </div>
                      <p className="shrink-0 text-sm font-medium tabular-nums">{formatPrice(line.price * line.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityStepper
                        size="sm"
                        value={line.quantity}
                        max={line.maxQuantity}
                        onChange={(q) => cart.setQuantity(line.variantId, q)}
                        label={`Quantity for ${line.name}`}
                      />
                      <button
                        type="button"
                        onClick={() => cart.removeItem(line.variantId)}
                        className="text-xs text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                      >
                        Remove<span className="sr-only"> {line.name}</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {suggestions.length ? (
              <section aria-labelledby="cart-upsell" className="border-t border-line bg-stone-50 px-6 py-6">
                <h3 id="cart-upsell" className="eyebrow mb-4">
                  Complete the gift
                </h3>
                <ul className="space-y-3">
                  {suggestions.map((p) => (
                    <li key={p.slug} className="flex items-center gap-3 rounded-sm bg-white p-2 pr-3">
                      <div className="w-12 shrink-0">
                        <ProductImage product={p} sizes="48px" zoom={false} compact />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-ink-muted">
                          {p.variants[0].title} · {formatPrice(p.variants[0].price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.addItem(p, undefined, 1, { openDrawer: false })}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-300 text-ink hover:border-copper hover:text-copper"
                        aria-label={`Add ${p.name} to cart`}
                      >
                        <PlusIcon size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="space-y-3 border-t border-line px-6 py-6">
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={cart.giftWrap}
                  onChange={(e) => cart.setGift({ giftWrap: e.target.checked })}
                  className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-copper))]"
                />
                <span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <GiftIcon size={16} className="text-copper" /> Add signature gift wrap
                  </span>
                  <span className="text-xs text-ink-muted">
                    Linen-finish box and hand-tied ribbon, +{formatPrice(siteConfig.commerce.giftWrapPrice)}
                  </span>
                </span>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-ink-soft">Gift message (optional)</span>
                <textarea
                  value={cart.giftMessage}
                  onChange={(e) => cart.setGift({ giftMessage: e.target.value.slice(0, 250) })}
                  rows={2}
                  maxLength={250}
                  placeholder="Wishing you a wonderful holiday season…"
                  className="field mt-1.5 resize-none text-sm"
                />
              </label>
            </div>
          </div>

          <footer className="border-t border-line bg-white px-6 pb-6 pt-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-medium tabular-nums">{formatPrice(cart.subtotal)}</dd>
              </div>
              {cart.giftWrapTotal ? (
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Gift wrap</dt>
                  <dd className="tabular-nums">{formatPrice(cart.giftWrapTotal)}</dd>
                </div>
              ) : null}
            </dl>
            <p className="mt-2 text-xs text-ink-muted">Taxes and shipping calculated at checkout. All prices in CAD.</p>
            <button type="button" onClick={cart.checkout} className="btn-primary mt-4 w-full">
              Checkout · {formatPrice(cart.subtotal + cart.giftWrapTotal)}
            </button>
            <TrustBadges compact className="mt-4" />
          </footer>
        </>
      )}
    </Drawer>
  );
}
