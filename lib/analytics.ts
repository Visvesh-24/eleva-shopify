/**
 * Analytics event layer stub. Pushes GA4-shaped ecommerce events to
 * window.dataLayer so Google Tag Manager / GA4 / Meta Pixel can be wired later
 * without touching components.
 */
import type { Product, ProductVariant } from "./products";

type EventName = "view_item" | "view_item_list" | "add_to_cart" | "remove_from_cart" | "begin_checkout" | "form_submit" | "search";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: EventName, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // GA4 recommends clearing the previous ecommerce object first.
  if ("ecommerce" in payload) window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({ event, ...payload });
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, payload);
}

/** Map a product/variant to a GA4 `items[]` entry. */
export function toItem(product: Product, variant?: ProductVariant, quantity = 1) {
  const v = variant ?? product.variants[0];
  return {
    item_id: v.sku,
    item_name: product.name,
    item_brand: product.brand,
    item_category: product.type,
    item_variant: v.title,
    price: v.price / 100,
    quantity,
  };
}

export const analytics = {
  viewItem: (p: Product, v?: ProductVariant) =>
    track("view_item", { ecommerce: { currency: "CAD", value: (v ?? p.variants[0]).price / 100, items: [toItem(p, v)] } }),
  addToCart: (p: Product, v: ProductVariant, quantity: number) =>
    track("add_to_cart", { ecommerce: { currency: "CAD", value: (v.price * quantity) / 100, items: [toItem(p, v, quantity)] } }),
  beginCheckout: (value: number, items: ReturnType<typeof toItem>[]) =>
    track("begin_checkout", { ecommerce: { currency: "CAD", value: value / 100, items } }),
  formSubmit: (form: string, extra: Record<string, unknown> = {}) => track("form_submit", { form_name: form, ...extra }),
  search: (term: string) => track("search", { search_term: term }),
};
