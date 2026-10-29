"use client";

/**
 * Client-side cart persisted to localStorage.
 *
 * Shopify migration: replace the reducer actions with Storefront API
 * `cartCreate` / `cartLinesAdd` / `cartLinesUpdate` mutations, store the cart
 * ID in localStorage instead of the lines, and redirect to `cart.checkoutUrl`
 * in `checkout()` (see README.md).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import type { Product, ProductVariant } from "@/lib/products";
import { analytics, toItem } from "@/lib/analytics";
import { siteConfig } from "@/lib/config";

export type CartLine = {
  variantId: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  type: Product["type"];
  variantTitle: string;
  price: number;
  image?: Product["images"][number];
  quantity: number;
  maxQuantity: number;
};

type CartState = {
  lines: CartLine[];
  giftMessage: string;
  giftWrap: boolean;
  open: boolean;
  hydrated: boolean;
};

type Action =
  | { type: "hydrate"; state: Partial<CartState> }
  | { type: "add"; line: CartLine }
  | { type: "setQty"; variantId: string; quantity: number }
  | { type: "remove"; variantId: string }
  | { type: "gift"; giftMessage?: string; giftWrap?: boolean }
  | { type: "open"; open: boolean }
  | { type: "clear" };

const STORAGE_KEY = "eleva.cart.v1";
const clamp = (n: number, max: number) => Math.max(1, Math.min(n, Math.max(1, max)));

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return { ...state, ...action.state, hydrated: true };
    case "add": {
      const existing = state.lines.find((l) => l.variantId === action.line.variantId);
      const lines = existing
        ? state.lines.map((l) =>
            l.variantId === action.line.variantId
              ? { ...l, quantity: clamp(l.quantity + action.line.quantity, l.maxQuantity) }
              : l,
          )
        : [...state.lines, { ...action.line, quantity: clamp(action.line.quantity, action.line.maxQuantity) }];
      return { ...state, lines };
    }
    case "setQty":
      return {
        ...state,
        lines: state.lines.map((l) => (l.variantId === action.variantId ? { ...l, quantity: clamp(action.quantity, l.maxQuantity) } : l)),
      };
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.variantId !== action.variantId) };
    case "gift":
      return {
        ...state,
        giftMessage: action.giftMessage ?? state.giftMessage,
        giftWrap: action.giftWrap ?? state.giftWrap,
      };
    case "open":
      return { ...state, open: action.open };
    case "clear":
      return { ...state, lines: [], giftMessage: "", giftWrap: false };
  }
}

type CartContextValue = CartState & {
  count: number;
  subtotal: number;
  giftWrapTotal: number;
  freeShippingRemaining: number;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number, opts?: { openDrawer?: boolean }) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  setGift: (gift: { giftMessage?: string; giftWrap?: boolean }) => void;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    lines: [],
    giftMessage: "",
    giftWrap: false,
    open: false,
    hydrated: false,
  });

  // Load once on mount (localStorage may be unavailable in private mode).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      dispatch({ type: "hydrate", state: raw ? JSON.parse(raw) : {} });
    } catch {
      dispatch({ type: "hydrate", state: {} });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      const { lines, giftMessage, giftWrap } = state;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, giftMessage, giftWrap }));
    } catch {
      /* storage full or blocked: cart still works for this session */
    }
  }, [state]);

  const stateRef = useRef(state);
  stateRef.current = state;

  const addItem = useCallback<CartContextValue["addItem"]>((product, variant, quantity = 1, opts = {}) => {
    const v = variant ?? product.variants[0];
    if (v.stock <= 0) return;
    dispatch({
      type: "add",
      line: {
        variantId: v.id,
        sku: v.sku,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        type: product.type,
        variantTitle: v.title,
        price: v.price,
        image: product.images[0],
        quantity,
        maxQuantity: v.stock,
      },
    });
    analytics.addToCart(product, v, quantity);
    if (opts.openDrawer !== false) dispatch({ type: "open", open: true });
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = state.lines.reduce((n, l) => n + l.price * l.quantity, 0);
    const giftWrapTotal = state.giftWrap && count > 0 ? siteConfig.commerce.giftWrapPrice : 0;
    return {
      ...state,
      count,
      subtotal,
      giftWrapTotal,
      freeShippingRemaining: Math.max(0, siteConfig.commerce.freeShippingThreshold - subtotal),
      addItem,
      setQuantity: (variantId, quantity) => dispatch({ type: "setQty", variantId, quantity }),
      removeItem: (variantId) => dispatch({ type: "remove", variantId }),
      setGift: (gift) => dispatch({ type: "gift", ...gift }),
      openCart: () => dispatch({ type: "open", open: true }),
      closeCart: () => dispatch({ type: "open", open: false }),
      checkout: () => {
        const s = stateRef.current;
        analytics.beginCheckout(
          subtotal + giftWrapTotal,
          s.lines.map((l) => ({
            ...toItem(
              { name: l.name, brand: l.brand, type: l.type } as Product,
              { sku: l.sku, title: l.variantTitle, price: l.price } as ProductVariant,
              l.quantity,
            ),
          })),
        );
        // Checkout stub. With Shopify: window.location.href = cart.checkoutUrl
        window.location.href = "/checkout";
      },
    };
  }, [state, addItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
