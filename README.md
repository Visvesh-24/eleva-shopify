# Eleva Imports: storefront demo

Front-end-only, Shopify-style storefront for **Eleva Imports**, Toronto importer of additive-free, 100% blue agave tequila, curated by Adriana Martinez, Canada's only Certified Tequila Master.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**. Framer Motion is used only for subtle fades, hover states and drawers.

> Status: **Phase 1** (design system, header/footer, homepage, cart drawer, search overlay, age gate). Collection/product pages, Corporate Gifts and the remaining pages follow in phases 2–4. Links to those pages return the on-brand 404 until then.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
npm run lint && npm run typecheck
```

Requires Node 18.18+ (tested on Node 22).

### Deploy to Vercel

Import the repo in Vercel and accept the defaults (framework: Next.js, no environment variables needed). Every page is statically generated.

## Project structure

```
app/                    Routes (App Router). layout.tsx holds providers, header, footer, overlays
components/
  layout/               AnnouncementBar, Header (+ mega menu), MobileMenu, SearchOverlay, Footer, AgeGate, WhatsAppButton
  home/                 One component per homepage section
  shop/                 ProductCard, ProductImage (+ placeholder art), CartProvider, CartDrawer, AddToCartButton…
  forms/                NewsletterForm (front-end validation only)
  ui/                   Icons, Section/SectionHeading, FadeIn, Drawer (focus-trapped), Rail, Rating
lib/
  products.ts           Typed product catalog + async accessors (the only way UI reads products)
  collections.ts        Collections + accessors
  config.ts             Store settings: contact, free-shipping threshold, corporate deadline…
  analytics.ts          window.dataLayer event layer (view_item, add_to_cart, begin_checkout, form_submit, search)
  filters.ts            Budget / recipient / taste definitions shared by gift finder and collection filters
  recipes.ts, content.ts, navigation.ts, search.ts, format.ts
public/images/
  products/             Product cut-outs (PNG, 1000×1250, transparent), generated from /products
  lifestyle/            Client photography and banners (always shown uncropped, native ratio)
                        + multi-bottle compositions built from the product PNGs
  brand/                logo-full.png (original), logo-mark.png (cropped "A" mark)
products/               Original client images (source only, not served)
```

## Design system

Tokens live in `app/globals.css` (CSS variables) and are exposed through `tailwind.config.ts`.

| Token | Value | Use |
| --- | --- | --- |
| `ivory` | #FAF8F4 | Page background |
| `white` | #FFFFFF | Cards, header, drawers |
| `stone-50…300` | #F6F3EE → #D6CFC4 | Soft surfaces, borders |
| `ink` / `ink-soft` / `ink-muted` | #1C1B19 / #57534D / #6B655C | Text |
| `copper` | #8F6040 | Primary buttons, links, accents (5.4:1 on white, WCAG AA) |
| `copper-light` | #C9A27E | Hairlines and decoration only |
| `copper-pale` | #D2AE8A | Accent and CTA on charcoal (8.3:1) |
| `charcoal` | #1C1B19 | Dark sections: corporate gifting and trade only |
| `agave` | #56704F | Trust icons only |

The accent is copper rather than the brief's gold, tuned to the copper logo.

- **Type:** Cormorant Garamond (headings, via `next/font`) + Manrope (UI/body). Small-caps eyebrow labels with wide tracking (`.eyebrow`).
- **Buttons:** `.btn-primary` (copper) and `.btn-secondary` (outline). One primary CTA per section.
- **Motion:** one reveal (`FadeIn`: fade-up, once), hover zoom on imagery, drawer slides. All disabled under `prefers-reduced-motion`.
- **Imagery:** product shots on white 4:5 cards; products without photography render an elegant line-art placeholder (`ProductImage`).

## Commerce architecture

All product, collection and cart logic sits behind small typed interfaces so the data source can change without touching UI.

- `lib/products.ts` exports `Product` / `ProductVariant` types and async accessors (`getAllProducts`, `getProduct`, `getProductsByCollection`, `getBestSellers`, `getProductsBySlugs`, `getRelatedProducts`).
- `lib/collections.ts` exports `getCollections`, `getFeaturedCollections`, `getCollection`.
- `components/shop/CartProvider.tsx` owns the cart (persisted in `localStorage`) and exposes `addItem`, `setQuantity`, `removeItem`, `setGift`, `checkout`.
- Prices are integers in cents, CAD, formatted with `Intl.NumberFormat("en-CA")`.
- **Checkout is a stub.** `checkout()` fires `begin_checkout` and routes to `/checkout`. No payment is processed or simulated.

### Shopify migration path

1. Create a Storefront API access token (Shopify admin → Apps → Develop apps → Storefront API). Add `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_TOKEN` to Vercel env vars.
2. Add a tiny `lib/shopify.ts` fetch helper (`POST https://{domain}/api/2025-01/graphql.json` with the `X-Shopify-Storefront-Access-Token` header).
3. Re-implement the accessors in `lib/products.ts` / `lib/collections.ts` with `products`, `product(handle:)` and `collection(handle:) { products }` queries. Map the response onto the existing types:
   - `handle` → `slug`, `vendor` → `brand`, `productType` → `type`
   - `variants.nodes` → `variants` (`price.amount` × 100 → cents, `quantityAvailable` → `stock`)
   - `images.nodes` → `images`
   - Tasting notes, chips, tasting styles, serve/pairing → product **metafields** (e.g. `eleva.aroma`, `eleva.palate`, `eleva.finish`, `eleva.tasting_styles`)
   - Ratings → your reviews app's metafields (Judge.me / Okendo / Shopify Product Reviews)
4. Replace the cart reducer in `CartProvider` with `cartCreate` / `cartLinesAdd` / `cartLinesUpdate` / `cartLinesRemove` mutations. Store only the cart ID in `localStorage`. Gift message and gift wrap become cart `attributes` / a gift-wrap product.
5. In `checkout()`, redirect to `cart.checkoutUrl` (Shopify-hosted checkout handles tax, shipping, payment and age confirmation).
6. Swap `lib/search.ts` for the Storefront `predictiveSearch` / `search` queries.
7. Point `next.config.ts` image domains at `cdn.shopify.com` (already allowed).

Pages already consume the accessors asynchronously, so no component changes are required.

### Analytics

`lib/analytics.ts` pushes GA4-shaped events to `window.dataLayer`: `view_item`, `add_to_cart`, `begin_checkout`, `form_submit`, `search`. Add a Google Tag Manager container (and Meta Pixel via GTM) to `app/layout.tsx` to start collecting. Events are logged to the console in development.

## Compliance

- Full-screen age gate on first visit (remembered in `localStorage`; an inline script hides it before paint for returning visitors). The exit link leaves the site.
- The footer carries the responsible-drinking, legal-age and provincial-shipping notes.
- Urgency and scarcity only come from data: `stock` in `lib/products.ts` (low-stock message at ≤ `lowStockThreshold`) and `corporate.orderDeadline` in `lib/config.ts` (the countdown hides itself after the deadline). Every mock value is listed in `TODO.md`.
