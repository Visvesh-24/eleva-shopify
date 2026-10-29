"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUI } from "./UIProvider";
import { CloseIcon, SearchIcon, ArrowRight } from "@/components/ui/Icons";
import { ProductImage } from "@/components/shop/ProductImage";
import { formatPrice } from "@/lib/format";
import { minPrice, type Product } from "@/lib/products";
import { searchProducts } from "@/lib/search";
import { analytics } from "@/lib/analytics";

const popular = ["Cristalino", "Rosado", "Gift set", "Añejo", "Chocolate", "Minis"];

/** Header search overlay with live product suggestions. */
export function SearchOverlay({ products }: { products: Product[] }) {
  const { searchOpen, setSearchOpen } = useUI();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useMemo(() => (q.trim() ? searchProducts(products, q).slice(0, 5) : []), [products, q]);

  useEffect(() => {
    if (!searchOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, setSearchOpen]);

  const close = () => setSearchOpen(false);
  const submit = (term: string) => {
    if (!term.trim()) return;
    analytics.search(term);
    close();
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  return (
    <AnimatePresence>
      {searchOpen ? (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search">
          <motion.div
            className="absolute inset-0 bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90vh] overflow-y-auto bg-white shadow-card"
          >
            <div className="wrap py-6 md:py-10">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(q);
                }}
                className="flex items-center gap-3 border-b border-ink pb-3"
              >
                <SearchIcon size={22} className="shrink-0 text-ink-soft" />
                <label htmlFor="site-search" className="sr-only">
                  Search products
                </label>
                <input
                  ref={inputRef}
                  id="site-search"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search tequila, gifts, tasting notes…"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent font-serif text-2xl outline-none placeholder:text-ink-muted/70 md:text-4xl"
                />
                <button type="button" onClick={close} className="p-2 text-ink-soft hover:text-ink" aria-label="Close search">
                  <CloseIcon size={22} />
                </button>
              </form>

              {q.trim() ? (
                <div className="mt-6" aria-live="polite">
                  {results.length ? (
                    <>
                      <p className="eyebrow mb-3">Products</p>
                      <ul className="divide-y divide-line">
                        {results.map((p) => (
                          <li key={p.slug}>
                            <Link href={`/products/${p.slug}`} onClick={close} className="flex items-center gap-4 py-3 hover:bg-stone-50">
                              <div className="w-14 shrink-0">
                                <ProductImage product={p} sizes="56px" zoom={false} compact />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-serif text-lg">{p.name}</p>
                                <p className="truncate text-xs text-ink-muted">{p.chips.join(" · ")}</p>
                              </div>
                              <p className="text-sm font-medium tabular-nums">{formatPrice(minPrice(p))}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <button type="button" onClick={() => submit(q)} className="link-underline mt-5">
                        See all results for &ldquo;{q}&rdquo; <ArrowRight size={15} />
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-ink-soft">
                      No matches for &ldquo;{q}&rdquo;. Try a style like &ldquo;añejo&rdquo; or call us at 905-718-1247 for a recommendation.
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-6">
                  <p className="eyebrow mb-3">Popular searches</p>
                  <ul className="flex flex-wrap gap-2">
                    {popular.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQ(term)}
                          className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft hover:border-copper hover:text-copper"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
