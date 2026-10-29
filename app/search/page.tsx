import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { getCollections } from "@/lib/collections";
import { searchProducts } from "@/lib/search";
import { recipes } from "@/lib/recipes";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/shop/ProductCard";
import { SearchIcon, ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

const suggestions = ["Cristalino", "Rosado", "Añejo", "Gift set", "Chocolate", "Glass"];

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const term = q.trim();
  const [products, collections] = await Promise.all([getAllProducts(), getCollections()]);
  const results = term ? searchProducts(products, term) : [];
  const norm = term.toLowerCase();
  const matchingCollections = term ? collections.filter((c) => `${c.title} ${c.tagline}`.toLowerCase().includes(norm)) : [];
  const matchingRecipes = term ? recipes.filter((r) => `${r.name} ${r.tagline} ${r.ingredients.join(" ")}`.toLowerCase().includes(norm)) : [];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Search" }]}
        title={term ? <>Results for &ldquo;{term}&rdquo;</> : "Search the cellar"}
        intro={
          term ? (
            <p>
              {results.length} {results.length === 1 ? "product" : "products"} found
            </p>
          ) : (
            <p>Search by bottle, style or tasting note.</p>
          )
        }
      >
        <form action="/search" role="search" className="mt-8 flex max-w-xl items-center gap-3 border-b border-ink pb-2">
          <SearchIcon size={20} className="text-ink-soft" />
          <label htmlFor="search-page-q" className="sr-only">
            Search products
          </label>
          <input
            id="search-page-q"
            name="q"
            type="search"
            defaultValue={term}
            placeholder="Try “añejo” or “gift set”"
            className="min-w-0 flex-1 bg-transparent py-2 font-serif text-2xl outline-none placeholder:text-ink-muted/70"
          />
          <button type="submit" className="btn-primary btn-sm">
            Search
          </button>
        </form>
      </PageHeader>

      <div className="wrap py-12 md:py-16">
        {matchingCollections.length || matchingRecipes.length ? (
          <ul className="mb-10 flex flex-wrap gap-2">
            {matchingCollections.map((c) => (
              <li key={c.handle}>
                <Link href={`/collections/${c.handle}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-copper">
                  Collection: {c.title} <ArrowRight size={13} />
                </Link>
              </li>
            ))}
            {matchingRecipes.map((r) => (
              <li key={r.slug}>
                <Link href={`/recipes#${r.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-copper">
                  Recipe: {r.name} <ArrowRight size={13} />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {results.length ? (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {results.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-xl">
            {term ? <p className="font-serif text-2xl">Nothing matched &ldquo;{term}&rdquo;</p> : null}
            <p className="mt-3 text-sm text-ink-soft">Popular searches:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <li key={s}>
                  <Link href={`/search?q=${encodeURIComponent(s)}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm hover:border-copper hover:text-copper">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ink-soft">
              Prefer a personal recommendation? Call <a href="tel:+19057181247" className="underline">905-718-1247</a> or{" "}
              <Link href="/collections/all" className="underline">
                browse every bottle
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </>
  );
}
