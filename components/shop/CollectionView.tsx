"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { minPrice } from "@/lib/products";
import type { Collection } from "@/lib/collections";
import { budgets, tastes, matchesBudget, matchesTaste } from "@/lib/filters";
import { ProductCard } from "./ProductCard";
import { Drawer } from "@/components/ui/Drawer";
import { CloseIcon, ChevronDown } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "best", label: "Best selling" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Name A–Z" },
];

const sizeGroup = (p: Product) =>
  p.type === "Glassware" ? "Glassware" : p.size.includes("×") ? "Sets & flights" : p.size.includes("100") ? "100 ml minis" : p.size;

type FilterKey = "collection" | "type" | "budget" | "size" | "taste";

/**
 * Filter + sort + grid for collection pages. Filters live in the URL
 * (?type=&budget=&size=&taste=&collection=&sort=) so the gift finder and
 * shared links land on the same filtered view.
 */
export function CollectionView({
  products,
  collections,
  showCollectionFilter,
}: {
  products: Product[];
  collections: Collection[];
  showCollectionFilter: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [drawer, setDrawer] = useState(false);

  const active: Record<FilterKey, string | null> = {
    collection: params.get("collection"),
    type: params.get("type"),
    budget: params.get("budget"),
    size: params.get("size"),
    taste: params.get("taste"),
  };
  const sort = params.get("sort") ?? "featured";

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || next.get(key) === value) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const clearAll = () => router.replace(sort !== "featured" ? `${pathname}?sort=${sort}` : pathname, { scroll: false });

  const groups = useMemo(() => {
    const types = Array.from(new Set(products.map((p) => p.type)));
    const sizes = Array.from(new Set(products.map(sizeGroup)));
    const g: { key: FilterKey; title: string; options: { value: string; label: string }[] }[] = [];
    if (showCollectionFilter)
      g.push({ key: "collection", title: "Collection", options: collections.map((c) => ({ value: c.handle, label: c.title })) });
    if (types.length > 1) g.push({ key: "type", title: "Type", options: types.map((t) => ({ value: t, label: t })) });
    g.push({ key: "budget", title: "Price", options: budgets.map((b) => ({ value: b.value, label: b.label })) });
    if (sizes.length > 1) g.push({ key: "size", title: "Size", options: sizes.map((s) => ({ value: s, label: s })) });
    g.push({ key: "taste", title: "Tasting style", options: tastes.map((t) => ({ value: t.value, label: t.label })) });
    return g;
  }, [products, collections, showCollectionFilter]);

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!active.collection || p.collections.includes(active.collection)) &&
        (!active.type || p.type === active.type) &&
        (!active.size || sizeGroup(p) === active.size) &&
        matchesBudget(p, active.budget) &&
        matchesTaste(p, active.taste),
    );
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => minPrice(a) - minPrice(b));
    if (sort === "price-desc") sorted.sort((a, b) => minPrice(b) - minPrice(a));
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "best") sorted.sort((a, b) => Number(Boolean(b.bestSeller)) - Number(Boolean(a.bestSeller)) || b.reviewCount - a.reviewCount);
    // "featured": photographed products first, then catalogue order
    if (sort === "featured") sorted.sort((a, b) => Number(Boolean(a.awaitingAssets)) - Number(Boolean(b.awaitingAssets)));
    return sorted;
  }, [products, active.collection, active.type, active.size, active.budget, active.taste, sort]);

  const activeChips = groups.flatMap((g) => {
    const v = active[g.key];
    const opt = g.options.find((o) => o.value === v);
    return opt ? [{ key: g.key, label: opt.label }] : [];
  });

  const filterPanel = (
    <div className="space-y-8">
      {groups.map((g) => (
        <fieldset key={g.key}>
          <legend className="eyebrow mb-3 text-ink">{g.title}</legend>
          <div className="flex flex-wrap gap-2">
            {g.options.map((o) => {
              const on = active[g.key] === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setParam(g.key, o.value)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-[0.8125rem] transition-colors",
                    on ? "border-copper bg-copper text-white" : "border-stone-300 bg-white text-ink hover:border-copper",
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
      {activeChips.length ? (
        <button type="button" onClick={clearAll} className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink">
          Clear all filters
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="wrap grid gap-10 py-10 md:py-14 lg:grid-cols-[250px_1fr] lg:gap-12">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="sticky top-[150px]">{filterPanel}</div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-sm text-ink-soft" aria-live="polite">
            <strong className="font-semibold text-ink">{filtered.length}</strong> {filtered.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="btn-secondary btn-sm lg:hidden"
            >
              Filter{activeChips.length ? ` (${activeChips.length})` : ""}
            </button>
            <label className="relative">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}
                className="h-10 appearance-none rounded-sm border border-stone-300 bg-white pl-4 pr-10 text-[0.8125rem] text-ink focus:border-copper focus:outline-none"
              >
                {sorts.map((s) => (
                  <option key={s.value} value={s.value}>
                    Sort: {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
            </label>
          </div>
        </div>

        {activeChips.length ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
            {activeChips.map((c) => (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={() => setParam(c.key, null)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-xs text-ink hover:bg-stone-200"
                >
                  {c.label} <CloseIcon size={12} />
                  <span className="sr-only">Remove filter</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {filtered.length ? (
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
            {filtered.map((p, i) => (
              <li key={p.slug}>
                <ProductCard product={p} priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 rounded-sm bg-white p-10 text-center ring-1 ring-line">
            <p className="font-serif text-2xl">No bottles match those filters</p>
            <p className="mt-2 text-sm text-ink-soft">Try removing a filter, or call 905-718-1247 for a personal recommendation.</p>
            <button type="button" onClick={clearAll} className="btn-primary mt-6">
              Clear filters
            </button>
          </div>
        )}
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)} side="left" label="Filters">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <p className="font-serif text-2xl">Filter</p>
          <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="-mr-2 p-2">
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{filterPanel}</div>
        <div className="border-t border-line p-5">
          <button type="button" onClick={() => setDrawer(false)} className="btn-primary w-full">
            Show {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </button>
        </div>
      </Drawer>
    </div>
  );
}
