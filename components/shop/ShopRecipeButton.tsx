"use client";

import { useCart } from "./CartProvider";
import type { Product } from "@/lib/products";
import { BagIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

/** "Shop this cocktail": adds every bottle a recipe uses, then opens the cart. */
export function ShopRecipeButton({ products, className }: { products: Product[]; className?: string }) {
  const { addItem, openCart } = useCart();
  const available = products.filter((p) => p.variants[0].stock > 0);
  if (!available.length) return null;
  return (
    <button
      type="button"
      className={cn("link-underline", className)}
      onClick={() => {
        available.forEach((p) => addItem(p, undefined, 1, { openDrawer: false }));
        openCart();
      }}
    >
      <BagIcon size={15} /> Shop this cocktail
      {available.length > 1 ? <span className="normal-case tracking-normal text-ink-muted">({available.length} items)</span> : null}
    </button>
  );
}
