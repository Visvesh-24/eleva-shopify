/**
 * Shared filter definitions used by the gift finder (homepage) and the
 * collection page filters. Kept as URL params so links are shareable.
 */
import { minPrice, type Product, type TastingStyle } from "./products";

export const budgets = [
  { value: "under-75", label: "Under $75", min: 0, max: 75_00 },
  { value: "75-150", label: "$75 – $150", min: 75_00, max: 150_00 },
  { value: "150-plus", label: "$150+", min: 150_00, max: Infinity },
] as const;

export type BudgetValue = (typeof budgets)[number]["value"];

export const recipients = [
  { value: "myself", label: "Myself", collection: "all" },
  { value: "new-to-tequila", label: "Someone new to tequila", collection: "start-here" },
  { value: "connoisseur", label: "A connoisseur", collection: "sip-neat" },
  { value: "host", label: "A host or friend", collection: "gift-and-share" },
  { value: "clients", label: "Clients or my team", collection: "corporate-gifts" },
] as const;

export const tastes: { value: TastingStyle; label: string; hint: string }[] = [
  { value: "bright", label: "Bright & crisp", hint: "Citrus, pepper, fresh agave" },
  { value: "smooth", label: "Smooth & silky", hint: "Vanilla, honey, soft oak" },
  { value: "rich", label: "Rich & aged", hint: "Caramel, cocoa, spice" },
  { value: "sweet", label: "Sweet & indulgent", hint: "Berries, chocolate, cream" },
];

export function matchesBudget(p: Product, budget?: string | null): boolean {
  const b = budgets.find((x) => x.value === budget);
  if (!b) return true;
  const price = minPrice(p);
  return price >= b.min && price < b.max;
}

export function matchesTaste(p: Product, taste?: string | null): boolean {
  if (!taste) return true;
  return p.tastingStyles.includes(taste as TastingStyle);
}
