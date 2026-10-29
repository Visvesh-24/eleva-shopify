import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { TrustBadges } from "@/components/shop/TrustBadges";
import { Rating } from "@/components/ui/Rating";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Editorial product spotlight: a client banner (shown uncropped) beside the
 * pitch and a direct Add to cart.
 */
export function ProductSpotlight({
  product,
  banner,
  eyebrow,
  title,
  moreHref,
  moreLabel,
}: {
  product: Product;
  banner: { src: string; alt: string; width: number; height: number };
  eyebrow: string;
  title: string;
  moreHref: string;
  moreLabel: string;
}) {
  const variant = product.variants[0];
  return (
    <section aria-labelledby={`spotlight-${product.slug}`} className="bg-stone-50 py-14 md:py-24 lg:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <Image
            src={banner.src}
            alt={banner.alt}
            width={banner.width}
            height={banner.height}
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="h-auto w-full rounded-sm shadow-card"
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`spotlight-${product.slug}`} className="h-section mt-4">
            {title}
          </h2>
          <p className="mt-3 text-sm text-ink-muted">
            {product.brand} · {product.size}
          </p>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">{product.pitch}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tasting notes">
            {product.chips.map((c) => (
              <li key={c} className="chip">
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <p className="text-2xl font-semibold tabular-nums">{formatPrice(variant.price)}</p>
            <Rating value={product.rating} count={product.reviewCount} />
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <AddToCartButton product={product} className="sm:w-auto sm:px-10" />
            <Link href={`/products/${product.slug}`} className="link-underline">
              View details <ArrowRight size={15} />
            </Link>
          </div>
          <TrustBadges compact additiveFree={Boolean(product.badges.additiveFree)} className="mt-8 max-w-md" />
          <Link href={moreHref} className="mt-6 inline-block text-sm text-ink-soft underline-offset-4 hover:text-copper hover:underline">
            {moreLabel}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
