import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCollection, getCollections, type Collection } from "@/lib/collections";
import { getProductsByCollection } from "@/lib/products";
import { CollectionView } from "@/components/shop/CollectionView";
import { PageHeader } from "@/components/ui/PageHeader";
import { AgaveIcon, ArrowRight, AwardIcon, GlassIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

type Params = { handle: string };

export async function generateStaticParams() {
  const collections = await getCollections();
  return [{ handle: "all" }, ...collections.map((c) => ({ handle: c.handle }))];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { handle } = await params;
  const c = await getCollection(handle);
  if (!c) return {};
  return {
    title: c.title,
    description: c.intro,
    alternates: { canonical: `/collections/${c.handle}` },
    openGraph: { title: `${c.title} | Eleva Imports`, description: c.intro },
  };
}

const tones: Record<Collection["tone"], string> = { stone: "bg-stone-100", ivory: "bg-stone-50", copper: "bg-copper-wash" };

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) notFound();
  const [products, all] = await Promise.all([getProductsByCollection(handle), getCollections()]);
  const related = collection.related.map((h) => all.find((c) => c.handle === h)).filter((c): c is Collection => Boolean(c));

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Shop", href: "/collections/all" }, { label: collection.title }]}
        eyebrow={collection.tagline}
        title={collection.title}
        intro={<p>{collection.intro}</p>}
      >
        {/* Trust line at the top of every collection */}
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink">
          <li className="flex items-center gap-2">
            <AwardIcon size={16} className="text-agave" /> Selected by Canada&rsquo;s only Certified Tequila Master
          </li>
          <li className="flex items-center gap-2">
            <AgaveIcon size={16} className="text-agave" /> Additive-free tequila
          </li>
          <li className="flex items-center gap-2">
            <GlassIcon size={16} className="text-agave" /> Many not available at the LCBO
          </li>
        </ul>
      </PageHeader>

      {handle === "corporate-gifts" ? (
        <div className="border-b border-line bg-charcoal text-white">
          <div className="wrap flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
            <p className="text-sm text-white/85">
              Ordering 10+ gifts? We&rsquo;ll personalize them with your logo and deliver to every recipient.
            </p>
            <Link href="/corporate-gifts#quote" className="btn btn-sm shrink-0 bg-copper-pale text-ink hover:bg-white">
              Get a corporate quote
            </Link>
          </div>
        </div>
      ) : null}

      <Suspense fallback={<div className="wrap min-h-[60vh] py-14" aria-busy="true" />}>
        <CollectionView products={products} collections={all} showCollectionFilter={handle === "all"} />
      </Suspense>

      {/* Cross-sell to related collections */}
      {related.length ? (
        <section aria-labelledby="related-collections" className="border-t border-line bg-white py-16 md:py-20">
          <div className="wrap">
            <p className="eyebrow">Keep exploring</p>
            <h2 id="related-collections" className="h-section mt-3">
              You might also love
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {related.map((c) => (
                <li key={c.handle}>
                  <Link href={`/collections/${c.handle}`} className="group flex items-center gap-5 rounded-sm bg-ivory p-4 ring-1 ring-line hover:ring-copper">
                    <div className={cn("relative aspect-square w-24 shrink-0 overflow-hidden rounded-sm", tones[c.tone])}>
                      <Image
                        src={c.image.src}
                        alt=""
                        fill
                        sizes="96px"
                        className={cn("object-contain transition-transform duration-500 group-hover:scale-105", c.image.fit !== "full" && "p-2")}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-serif text-xl leading-snug group-hover:text-copper">{c.title}</p>
                      <p className="mt-1 text-xs text-ink-muted">{c.tagline}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-label text-copper">
                        Shop <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
