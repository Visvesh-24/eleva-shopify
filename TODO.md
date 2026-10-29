# TODO: client content and launch checklist

Everything below is **placeholder or mock** in the demo and must be confirmed or replaced before going live. Items marked ⚠️ affect pricing, urgency or claims and must not ship unverified.

## Pricing and stock (`lib/products.ts`)

All prices are mock CAD values (the live site was not reachable from the build environment). ⚠️

| Product | Mock price | Mock stock | Notes |
| --- | --- | --- | --- |
| Reserva Huizar Plata 750 ml | $129 | 24 | |
| Reserva Huizar Plata Rosado 750 ml | $139 | 14 | |
| Reserva Huizar Cristalino Reposado 750 ml | $149 | 18 | |
| Reserva Huizar Extra Añejo Mini 100 ml | $49 | 30 | No PNG photo yet |
| Reserva Huizar Tasting Collection 3 × 100 ml | $119 | 9 | No PNG photo yet; confirm the three expressions in the box |
| Casa Cofradía Añejo 750 ml | $139 | 12 | |
| Casa Cofradía Iguanas Talavera 750 ml | $219 | **4 (shows "Only 4 left")** ⚠️ | Confirm expression (Reposado?) and ABV (38%?) |
| Pechery Dubai Style Chocolate Cream Liqueur 700 ml | $54 | 20 | Confirm ABV and base spirit |
| Pechery Pistachio Cream Liqueur 700 ml | $54 | 16 | Placeholder product, no photo |
| Región Real Blanco 750 ml | $89 | 15 | Placeholder product, no photo; confirm expression |
| Hoyo 19 Blanco 750 ml | $79 | 22 | Placeholder product, no photo; confirm expression |
| Riedel Tequila Glass, Set of 2 / Set of 4 | $59 / $109 | 25 / 10 | Placeholder product, no photo; confirm model |

- [ ] Real prices, sizes, ABV and SKUs for every product
- [ ] Real inventory (or remove low-stock messaging until Shopify inventory is connected) ⚠️
- [ ] Ratings and review counts on every product are mock ⚠️
- [ ] "Not at the LCBO" badge is set on most bottles. Confirm each one ⚠️
- [ ] "Additive-free" badge on every tequila. Confirm each (cream liqueurs are deliberately not badged) ⚠️
- [ ] Tasting notes, serve suggestions and pairings are draft copy for Adriana to approve
- [ ] Best-seller order on the homepage (`app/page.tsx`)

## Store settings (`lib/config.ts`)

- [ ] Free-shipping threshold: **$150** (mock) ⚠️
- [ ] Welcome offer: **10% off**, code **WELCOME10** (mock) ⚠️
- [ ] Gift wrap price: **$12** (mock)
- [ ] Corporate order deadline: **November 20, 2026** (drives the countdown and announcement bar) ⚠️
- [ ] Corporate delivery window: "first two weeks of December" (mock) ⚠️
- [ ] Corporate minimum order: **10 gifts** (mock)
- [ ] Public email address: `hello@elevaimports.com` is a guess
- [ ] Announcement bar messages

## Photography and assets

- [ ] PNG cut-outs for: Extra Añejo Mini, Tasting Collection gift box (only webp shots were supplied, and the brief says PNG only), Pechery Pistachio, Región Real, Hoyo 19, Riedel glasses
- [ ] Portrait of Adriana (homepage "Meet Adriana", About page)
- [ ] Cocktail photography for recipes (cards currently show the bottle on a tinted panel)
- [ ] Lifestyle and gifting photography (optional; current compositions are built from the bottle PNGs)
- [ ] A flat/vector version of the logo would sharpen the footer and age gate (the 3D PNG is soft at small sizes)
- [ ] Open Graph share image (currently the gifting line-up composite)

## Copy and social proof

- [ ] Adriana's biography and certification details (`components/home/MeetAdriana.tsx`); "working directly with family distilleries in Jalisco" needs confirming
- [ ] Testimonials are invented placeholders (`lib/content.ts`) ⚠️
- [ ] Press row uses fictional publication names (`lib/content.ts`). Replace with real press or remove ⚠️
- [ ] Aggregate rating "4.9 from 460+ customers" in the hero and testimonials is mock ⚠️
- [ ] Masterclass formats ("in-person in the GTA or virtual", "tasting kits shipped to remote teams") need confirming
- [ ] Footer "Private tastings and masterclasses across the GTA"

## Compliance and legal

- [ ] Provinces Eleva can legally ship to (footer note and the Shipping & Returns page) ⚠️
- [ ] Age-gate wording and legal ages (19+, 18+ in AB, MB, QC) reviewed by the client
- [ ] Delivery ID check wording ("Proof of age may be required on delivery")
- [ ] Newsletter consent wording (CASL) reviewed
- [ ] Privacy Policy and Terms content (phase 4 pages will be placeholders)

## Integrations (post-demo)

- [ ] Shopify Storefront API (see README, "Shopify migration path")
- [ ] Checkout redirect to Shopify (`CartProvider.checkout`)
- [ ] Newsletter provider (Klaviyo / Shopify Email)
- [ ] GTM / GA4 / Meta Pixel container (`lib/analytics.ts` already pushes events)
