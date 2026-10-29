import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProduct, getProductsBySlugs, getRelatedProducts, minPrice, totalStock } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import { getReviews } from "@/lib/reviews";
import { formatPrice } from "@/lib/format";
import { faqs } from "@/lib/faqs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rating } from "@/components/ui/Rating";
import { Accordion } from "@/components/ui/Accordion";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductPurchase } from "@/components/shop/ProductPurchase";
import { FrequentlyBoughtTogether } from "@/components/shop/FrequentlyBoughtTogether";
import { ProductCard } from "@/components/shop/ProductCard";
import { AwardIcon, CheckIcon, GlassIcon } from "@/components/ui/Icons";
import { FadeIn } from "@/components/ui/FadeIn";

type Params = { slug: string };

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} ${p.size}`,
    description: `${p.shortDescription} ${p.pitch}`.slice(0, 160),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${p.name} | Eleva Imports`,
      description: p.shortDescription,
      images: p.images[0] ? [{ url: p.images[0].src, width: p.images[0].width, height: p.images[0].height, alt: p.images[0].alt }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [pairs, related] = await Promise.all([getProductsBySlugs((product.pairsWithProducts ?? []).slice(0, 2)), getRelatedProducts(product, 4)]);
  const reviews = getReviews(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    sku: product.variants[0].sku,
    image: product.images.map((i) => `${siteConfig.url}${i.src}`),
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      sku: v.sku,
      name: v.title,
      price: (v.price / 100).toFixed(2),
      priceCurrency: "CAD",
      availability: v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${siteConfig.url}/products/${product.slug}`,
    })),
  };

  const details = [
    ["Brand", product.brand],
    ["Type", product.expression ? `${product.type} · ${product.expression}` : product.type],
    ["Size", product.variants.map((v) => v.title).join(" / ")],
    ...(product.abv ? [["Alcohol", product.abv]] : []),
    ...(product.type === "Tequila" ? [["Agave", "100% blue agave (Agave tequilana Weber)"], ["Origin", "Mexico (D.O. Tequila)"]] : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <section className="bg-ivory">
        <div className="wrap pb-16 pt-6 md:pt-8">
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/collections/all" },
              { label: product.name },
            ]}
          />
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-[150px] lg:self-start">
              <ProductGallery product={product} />
            </div>

            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide2 text-copper">{product.brand}</p>
              <h1 className="mt-2 font-serif text-[2.4rem] leading-[1.05] md:text-5xl">{product.name}</h1>
              <p className="mt-2 text-sm text-ink-muted">
                {[product.expression, product.size, product.abv ? `${product.abv} alc./vol.` : null].filter(Boolean).join(" · ")}
              </p>
              <a href="#reviews" className="mt-4 inline-flex hover:opacity-80">
                <Rating value={product.rating} count={product.reviewCount} size={15} />
              </a>
              <p className="mt-5 text-3xl font-semibold tabular-nums">
                {product.variants.length > 1 ? <span className="mr-2 text-base font-normal text-ink-muted">From</span> : null}
                {formatPrice(minPrice(product))}
                <span className="ml-2 text-xs font-normal text-ink-muted">CAD</span>
              </p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">{product.pitch}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {product.badges.additiveFree ? (
                  <li className="chip border-agave/30 text-agave">Additive-free</li>
                ) : null}
                {product.badges.notAtLCBO ? <li className="chip">Not available at the LCBO</li> : null}
                {product.badges.limited ? <li className="chip">Limited availability</li> : null}
                {product.badges.giftReady ? <li className="chip">Gift-ready</li> : null}
              </ul>

              <ProductPurchase product={product} />

              {product.awaitingAssets ? (
                <p className="mt-6 text-xs text-ink-muted">Product photography coming soon.</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Tasting notes + serve */}
      {product.tastingNotes ? (
        <section aria-labelledby="tasting-title" className="border-y border-line bg-white py-16 md:py-24">
          <div className="wrap">
            <FadeIn className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow inline-flex items-center gap-2">
                  <AwardIcon size={15} className="text-agave" /> Adriana&rsquo;s tasting notes
                </p>
                <h2 id="tasting-title" className="h-section mt-3">
                  How it tastes
                </h2>
              </div>
            </FadeIn>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-sm bg-line md:grid-cols-3">
              {(["aroma", "palate", "finish"] as const).map((k) => (
                <div key={k} className="bg-ivory p-8">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-3 font-serif text-2xl leading-snug">{product.tastingNotes![k]}</dd>
                </div>
              ))}
            </dl>
            {product.serve || product.pairsWith?.length ? (
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {product.serve ? (
                  <div className="flex gap-4">
                    <GlassIcon size={26} className="mt-1 shrink-0 text-agave" />
                    <div>
                      <h3 className="font-serif text-2xl">Serve it like</h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{product.serve}</p>
                    </div>
                  </div>
                ) : null}
                {product.pairsWith?.length ? (
                  <div className="flex gap-4">
                    <CheckIcon size={26} className="mt-1 shrink-0 text-agave" />
                    <div>
                      <h3 className="font-serif text-2xl">Pairs with</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {product.pairsWith.map((p) => (
                          <li key={p} className="chip">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="bg-ivory py-16 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="font-serif text-3xl">About this bottle</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{product.description}</p>
            <Accordion
              className="mt-8"
              defaultOpen={0}
              items={[
                {
                  q: "Details",
                  a: (
                    <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                      {details.map(([k, v]) => (
                        <div key={k} className="contents">
                          <dt className="text-ink-muted">{k}</dt>
                          <dd className="text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  ),
                },
                { q: "Shipping", a: faqs.shipping[1].a + " " + faqs.shipping[0].a },
                { q: "Returns", a: faqs.shipping[3].a },
                { q: "Delivery & age verification", a: faqs.shipping[2].a },
              ]}
            />
          </div>

          <div id="reviews" className="scroll-mt-40">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl">Reviews</h2>
                <div className="mt-2 flex items-center gap-3">
                  <Rating value={product.rating} size={16} />
                  <span className="text-sm text-ink-soft">
                    {product.rating.toFixed(1)} out of 5 · {product.reviewCount} reviews
                  </span>
                </div>
              </div>
            </div>
            {/* MOCK reviews: see lib/reviews.ts */}
            <ul className="mt-8 space-y-4">
              {reviews.map((r) => (
                <li key={r.author + r.date} className="rounded-sm bg-white p-6 ring-1 ring-line">
                  <div className="flex items-center justify-between gap-3">
                    <Rating value={r.rating} />
                    <time dateTime={r.date} className="text-xs text-ink-muted">
                      {new Date(`${r.date}T12:00:00`).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                  </div>
                  <p className="mt-3 font-serif text-xl">{r.title}</p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{r.body}</p>
                  <p className="mt-3 text-xs text-ink-muted">
                    {r.author}
                    {r.verified ? " · Verified buyer" : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {pairs.length ? (
        <section className="bg-stone-100 py-16 md:py-20">
          <div className="wrap">
            <FrequentlyBoughtTogether product={product} pairs={pairs} />
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section aria-labelledby="related-title" className="bg-white py-16 md:py-24">
          <div className="wrap">
            <p className="eyebrow">You may also like</p>
            <h2 id="related-title" className="h-section mt-3">
              More from the cellar
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {totalStock(product) <= 0 ? null : <div className="h-20 lg:hidden" aria-hidden />}
    </>
  );
}
