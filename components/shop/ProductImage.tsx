import Image from "next/image";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/format";

/**
 * Product image in a fixed 4:5 frame. Falls back to a branded placeholder
 * (fine-line bottle illustration + name) when photography is not supplied yet.
 */
export function ProductImage({
  product,
  index = 0,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw",
  priority = false,
  className,
  zoom = true,
  compact = false,
}: {
  product: Pick<Product, "name" | "brand" | "images" | "type">;
  index?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  zoom?: boolean;
  /** Smaller placeholder typography (thumbnails, cart rows). */
  compact?: boolean;
}) {
  const image = product.images[index];
  return (
    <div className={cn("relative aspect-[4/5] w-full overflow-hidden bg-white", className)}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "transition-transform duration-700 ease-lux",
            image.fit === "full" ? "object-contain" : "object-contain p-[6%]",
            zoom && "group-hover:scale-[1.04]",
          )}
        />
      ) : (
        <PlaceholderArt product={product} compact={compact} />
      )}
    </div>
  );
}

function PlaceholderArt({ product, compact }: { product: Pick<Product, "name" | "brand" | "type">; compact: boolean }) {
  const isGlass = product.type === "Glassware";
  const isSet = product.type === "Gift Set";
  return (
    <div
      role="img"
      aria-label={`${product.name}: photography coming soon`}
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 px-4 text-center"
    >
      <svg
        aria-hidden
        viewBox="0 0 120 160"
        className={cn("text-copper-light", compact ? "h-[46%]" : "mb-4 h-[52%]")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {isGlass ? (
          <>
            <path d="M40 20h40c2 30-6 52-20 56-14-4-22-26-20-56Z" />
            <path d="M60 76v50M44 130h32" />
            <path d="M43 44c10 3 24 3 34 0" opacity=".6" />
          </>
        ) : isSet ? (
          <>
            {[22, 60, 98].map((x) => (
              <g key={x}>
                <path d={`M${x - 6} 52h12v10l6 8v62h-24V70l6-8V52Z`} />
                <rect x={x - 5} y="40" width="10" height="12" />
              </g>
            ))}
            <path d="M6 142h108" />
          </>
        ) : (
          <>
            <rect x="50" y="10" width="20" height="16" rx="2" />
            <path d="M52 26h16v14l14 16v86a6 6 0 0 1-6 6H44a6 6 0 0 1-6-6V56l14-16V26Z" />
            <path d="M44 82h32v36H44z" opacity=".7" />
            <path d="M60 92v16M54 100c4-2 8-2 12 0" opacity=".7" />
          </>
        )}
      </svg>
      {!compact ? (
        <>
          <p className="text-[0.625rem] font-semibold uppercase tracking-wide2 text-copper">{product.brand}</p>
          <p className="mt-1 line-clamp-2 font-serif text-base leading-tight text-ink">{product.name}</p>
          <p className="mt-2 text-[0.625rem] uppercase tracking-label text-ink-muted">Photography coming soon</p>
        </>
      ) : null}
    </div>
  );
}
