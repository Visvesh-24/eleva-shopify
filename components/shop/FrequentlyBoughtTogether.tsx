"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";
import { ProductImage } from "./ProductImage";
import { formatPrice, cn } from "@/lib/format";
import { PlusIcon } from "@/components/ui/Icons";

/** Bundle builder: main product + suggested pairings, add selected in one click. */
export function FrequentlyBoughtTogether({ product, pairs }: { product: Product; pairs: Product[] }) {
  const items = [product, ...pairs].filter((p) => p.variants[0].stock > 0);
  const [selected, setSelected] = useState(() => new Set(items.map((p) => p.slug)));
  const { addItem, openCart } = useCart();
  if (items.length < 2) return null;

  const chosen = items.filter((p) => selected.has(p.slug));
  const total = chosen.reduce((n, p) => n + p.variants[0].price, 0);
  const toggle = (slug: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  return (
    <section aria-labelledby="fbt-title" className="rounded-sm bg-white p-6 ring-1 ring-line md:p-10">
      <h2 id="fbt-title" className="font-serif text-3xl">
        Frequently bought together
      </h2>
      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_280px]">
        <ul className="flex flex-wrap items-center gap-3 sm:gap-4">
          {items.map((p, i) => (
            <li key={p.slug} className="flex items-center gap-3 sm:gap-4">
              {i > 0 ? <PlusIcon size={18} className="text-ink-muted" aria-hidden /> : null}
              <label className={cn("block w-28 cursor-pointer sm:w-36", !selected.has(p.slug) && "opacity-45")}>
                <div className="relative overflow-hidden rounded-sm border border-line">
                  <ProductImage product={p} sizes="144px" zoom={false} compact />
                  <input
                    type="checkbox"
                    checked={selected.has(p.slug)}
                    onChange={() => toggle(p.slug)}
                    className="absolute left-2 top-2 h-4 w-4 accent-[rgb(var(--c-copper))]"
                    aria-label={`Include ${p.name}`}
                  />
                </div>
                <span className="mt-2 block text-xs font-medium leading-snug">
                  {i === 0 ? "This item: " : ""}
                  {i === 0 ? p.name : <Link href={`/products/${p.slug}`} className="hover:text-copper">{p.name}</Link>}
                </span>
                <span className="text-xs text-ink-muted">{formatPrice(p.variants[0].price)}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-sm text-ink-soft">
            Total for {chosen.length} {chosen.length === 1 ? "item" : "items"}
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{formatPrice(total)}</p>
          <button
            type="button"
            disabled={!chosen.length}
            onClick={() => {
              chosen.forEach((p) => addItem(p, undefined, 1, { openDrawer: false }));
              openCart();
            }}
            className="btn-primary mt-4 w-full"
          >
            Add selected to cart
          </button>
        </div>
      </div>
    </section>
  );
}
