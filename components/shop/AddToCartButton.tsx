"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import type { Product, ProductVariant } from "@/lib/products";
import { CheckIcon, PlusIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

/** Add-to-cart button with a short "Added" confirmation. */
export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  className,
  variantStyle = "primary",
  label = "Add to cart",
  openDrawer = true,
}: {
  product: Product;
  variant?: ProductVariant;
  quantity?: number;
  className?: string;
  variantStyle?: "primary" | "quick";
  label?: string;
  openDrawer?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const v = variant ?? product.variants[0];
  const soldOut = v.stock <= 0;

  const onClick = () => {
    addItem(product, v, quantity, { openDrawer });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  if (variantStyle === "quick") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={soldOut}
        className={cn(
          "flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-white/95 text-[0.75rem] font-semibold uppercase tracking-label text-ink shadow-card ring-1 ring-line backdrop-blur transition-colors hover:bg-copper hover:text-white hover:ring-copper disabled:opacity-60",
          className,
        )}
        aria-label={soldOut ? `${product.name} is sold out` : `Add ${product.name} to cart`}
      >
        {soldOut ? "Sold out" : added ? (<><CheckIcon size={15} /> Added</>) : (<><PlusIcon size={15} /> Quick add</>)}
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={soldOut} className={cn("btn-primary w-full", className)}>
      {soldOut ? "Sold out" : added ? (<><CheckIcon size={16} /> Added to cart</>) : label}
    </button>
  );
}
