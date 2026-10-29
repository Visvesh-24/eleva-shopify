import Link from "next/link";
import type { Product } from "@/lib/products";
import { minPrice, totalStock } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import { formatPrice, cn } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { AddToCartButton } from "./AddToCartButton";
import { Rating } from "@/components/ui/Rating";

/**
 * Product card: image (gentle zoom), brand, name, tasting chips, rating, CAD
 * price, quick add (on hover for pointer devices, always visible on touch).
 */
export function ProductCard({ product, priority = false, className }: { product: Product; priority?: boolean; className?: string }) {
  const stock = totalStock(product);
  const lowStock = stock > 0 && stock <= siteConfig.commerce.lowStockThreshold;
  const multiVariant = product.variants.length > 1;
  const href = `/products/${product.slug}`;

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative overflow-hidden rounded-sm border border-line bg-white">
        <Link href={href} tabIndex={-1} aria-hidden>
          <ProductImage product={product} priority={priority} />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badges.notAtLCBO ? (
            <span className="rounded-sm bg-white/95 px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-label text-copper ring-1 ring-line">
              Not at the LCBO
            </span>
          ) : null}
          {product.badges.limited ? (
            <span className="rounded-sm bg-ink px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-label text-white">
              Limited
            </span>
          ) : null}
        </div>

        {/* Quick add: revealed on hover/focus with a mouse, always shown on touch screens */}
        <div className="absolute inset-x-3 bottom-3 transition-all duration-300 ease-lux [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100">
          {multiVariant ? (
            <Link
              href={href}
              className="flex h-11 w-full items-center justify-center rounded-sm bg-white/95 text-[0.75rem] font-semibold uppercase tracking-label text-ink shadow-card ring-1 ring-line hover:bg-copper hover:text-white"
            >
              Choose options<span className="sr-only"> for {product.name}</span>
            </Link>
          ) : (
            <AddToCartButton product={product} variantStyle="quick" />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[0.625rem] font-semibold uppercase tracking-wide2 text-copper">{product.brand}</p>
        <h3 className="mt-1 font-serif text-[1.25rem] leading-snug">
          <Link href={href} className="hover:text-copper">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-xs text-ink-muted">
          {[product.expression, product.size].filter(Boolean).join(" · ")}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tasting notes">
          {product.chips.slice(0, 3).map((c) => (
            <li key={c} className="chip">
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          {lowStock ? <p className="mb-1.5 text-xs font-medium text-copper">Only {stock} left in stock</p> : null}
          <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
            <Rating value={product.rating} count={product.reviewCount} />
            <p className="text-[0.9375rem] font-semibold tabular-nums">
              {multiVariant ? <span className="mr-1 text-xs font-normal text-ink-muted">From</span> : null}
              {formatPrice(minPrice(product))}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
