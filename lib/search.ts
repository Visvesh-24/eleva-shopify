import type { Product } from "./products";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/**
 * Lightweight client/server product search (accent-insensitive, every word
 * must match). Replace with Storefront API `search` / predictive search later.
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return products
    .map((p) => {
      const haystack = normalize(
        [
          p.name,
          p.brand,
          p.type,
          p.expression,
          p.size,
          p.shortDescription,
          p.chips.join(" "),
          p.tastingNotes ? Object.values(p.tastingNotes).join(" ") : "",
          p.collections.join(" ").replace(/-/g, " "),
          p.type === "Gift Set" ? "gift set box" : "",
          p.size.includes("100") ? "mini minis" : "",
        ].join(" "),
      );
      const title = normalize(p.name);
      const hits = words.filter((w) => haystack.includes(w)).length;
      const titleHits = words.filter((w) => title.includes(w)).length;
      return { p, score: hits === words.length ? hits + titleHits * 2 : 0 };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}
