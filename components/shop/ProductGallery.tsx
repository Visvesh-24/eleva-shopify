"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import type { Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/format";

/**
 * PDP gallery: main image with hover zoom that follows the cursor (pointer
 * devices only), plus thumbnails. Supplied photography (fit "full") is never
 * cropped; it is letterboxed on white.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const [origin, setOrigin] = useState("50% 50%");
  const [zoom, setZoom] = useState(false);
  const image = product.images[index];

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {product.images.length > 1 ? (
        <ul className="flex gap-3 md:flex-col" aria-label="Product images">
          {product.images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1} of ${product.images.length}`}
                aria-current={i === index}
                className={cn(
                  "relative block aspect-[4/5] w-16 overflow-hidden rounded-sm border bg-white md:w-20",
                  i === index ? "border-copper" : "border-line hover:border-stone-300",
                )}
              >
                <Image src={img.src} alt="" fill sizes="80px" className={cn("object-contain", img.fit !== "full" && "p-1.5")} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex-1">
        {image ? (
          <div
            className="relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-sm border border-line bg-white"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={onMove}
          >
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              style={{ transformOrigin: origin }}
              className={cn(
                "animate-fade-in object-contain transition-transform duration-300 ease-out",
                image.fit !== "full" && "p-[7%]",
                zoom && "[@media(hover:hover)]:scale-[1.8]",
              )}
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-sm border border-line">
            <ProductImage product={product} priority zoom={false} />
          </div>
        )}
      </div>
    </div>
  );
}
