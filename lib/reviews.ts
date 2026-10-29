/**
 * MOCK product reviews (see TODO.md). Replace with a reviews app
 * (Judge.me / Okendo / Shopify Product Reviews) via product metafields.
 */
import type { Product } from "./products";

export type Review = { author: string; rating: number; date: string; title: string; body: string; verified: boolean };

const pool: Omit<Review, "date">[] = [
  { author: "Sofia M.", rating: 5, title: "Beautiful bottle, even better inside", body: "Bought it as a gift and ended up getting one for myself. Smooth, clean and nothing like the tequila I grew up thinking I didn't like.", verified: true },
  { author: "James T.", rating: 5, title: "A real conversation piece", body: "Everyone at dinner asked about it. Adriana's tasting notes were spot on.", verified: true },
  { author: "Lauren K.", rating: 4, title: "Lovely, arrived quickly", body: "Well packed and delivered in two days in Toronto. Gift wrap was gorgeous.", verified: true },
  { author: "Marco D.", rating: 5, title: "Can't find this anywhere else", body: "Looked for it at the LCBO for months. So glad I found Eleva.", verified: true },
  { author: "Priya S.", rating: 5, title: "Worth every penny", body: "You can really taste the agave. Sipped it neat after the masterclass and I'm a convert.", verified: false },
];

/** Deterministic selection of three mock reviews per product. */
export function getReviews(product: Product): Review[] {
  const seed = product.slug.length;
  const dates = ["2026-10-12", "2026-09-28", "2026-08-30"];
  return [0, 1, 2].map((i) => ({ ...pool[(seed + i) % pool.length], date: dates[i] }));
}
