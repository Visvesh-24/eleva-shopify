# TODO: client content and launch checklist

Everything below is **placeholder or mock** in the demo and must be confirmed or replaced before going live. Items marked ⚠️ affect pricing, urgency or claims and must not ship unverified.

## Pricing and stock (`lib/products.ts`)

All prices are mock CAD values (the live site was not reachable from the build environment). ⚠️

| Product | Mock price | Mock stock | Notes |
| --- | --- | --- | --- |
| Reserva Huizar Plata 750 ml | $129 | 24 | Label reads 35% Alc. Vol. (updated) |
| Reserva Huizar Plata Rosado 750 ml | $139 | 14 | |
| Reserva Huizar Cristalino Reposado 750 ml | $149 | 18 | |
| Reserva Huizar Extra Añejo Mini 100 ml | $49 | 30 | No PNG photo yet |
| Reserva Huizar Tasting Collection 3 × 100 ml | $119 | 9 | No PNG photo yet; confirm the three expressions in the box |
| Casa Cofradía Añejo 750 ml | $139 | 12 | ⚠️ Label in the supplied banner reads **"Edición Especial, 20% Alc. Vol."**. At 20% it cannot be an añejo tequila (35% minimum). Confirm product name and type; the additive-free badge is withheld until then |
| Casa Cofradía Iguanas Talavera 750 ml | $219 | **4 (shows "Only 4 left")** ⚠️ | Label reads Tequila Reposado, 40%, 100% agave azul (updated) |
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

## Experiences, events and trade (`lib/experiences.ts`)

- [ ] Masterclass sessions: dates, times, venues, prices ($85–$110 per guest) and **seats left** (drives "Only X seats left") are mock ⚠️
- [ ] Masterclass format details (duration, group sizes, light bites, virtual kits) and "from" prices on the audience cards
- [ ] Events: all three upcoming events, venues ("TBC"), prices and dates are mock ⚠️
- [ ] Past-events gallery uses brand photography; replace with real event photos
- [ ] Corporate gift tiers: names, price ranges and minimums are mock ⚠️
- [ ] Corporate proof timeline ("approve within 3 business days") is mock
- [ ] Trade pricing is a flat 20% off retail (`TRADE_DISCOUNT`), illustrative only ⚠️
- [ ] Trade claims: "reviewed within two business days", "free tastings for licensed venues in the GTA", minimum one mixed case of 6
- [ ] Quick Reorder shows a demo account ("Casa Verde Cocina") with mock order history; replace with the Shopify B2B / customer account integration
- [ ] Product reviews on product pages are mock (`lib/reviews.ts`) ⚠️

## Policies and help content

- [ ] All FAQ answers (`lib/faqs.ts`), especially shipping areas (currently "within Ontario"), delivery times, returns window (48 hours) and corporate minimums ⚠️
- [ ] Shipping & Returns page: draft policy, confirm every line ⚠️
- [ ] Privacy Policy and Terms of Service: placeholder templates, need legal review (PIPEDA, CASL) ⚠️
- [ ] Contact page: business hours ("Mon–Sat 10–6, to be confirmed"), tasting-room address, and a real Google Maps embed (currently an illustrated placeholder)
- [ ] About page story and certification copy (draft); add certifying body and year
- [ ] Recipes and guides copy for Adriana to review
- [ ] Product "Origin" detail shows "Mexico (D.O. Tequila)"; confirm region per producer

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
- [x] Portraits of Adriana: supplied (agave field portrait → Meet Adriana; barrel room → Masterclass banner)
- [x] Brand banners: supplied and shown **uncropped** (Eleva × Huizar banner → hero + share image; Pechery lifestyle → homepage spotlight, recipe card, Cream Liqueurs collection, Pechery gallery)
- [ ] Casa Cofradía × Iguanas banner: shared in chat but the file did not come through. Add it to `public/images/lifestyle/` (or `/products`) and it will go on Gift & Share, Gift Sets and the Shop mega-menu card
- [ ] Cocktail photography for recipes (cards currently show the bottle on a tinted panel)
- [ ] Lifestyle and gifting photography (optional; current compositions are built from the bottle PNGs)
- [ ] A flat/vector version of the logo would sharpen the footer and age gate (the 3D PNG is soft at small sizes)
- [ ] Open Graph share image (currently the gifting line-up composite)

## Copy and social proof

- [ ] The pull quote "Great tequila should taste of the agave, the land and the people who made it." is placeholder copy, not a real quote from Adriana ⚠️
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

- [ ] Every form is front-end only (corporate quote, masterclass booking, event RSVP, contact, trade application, trade order, reorder, account sign-in/register, newsletter). Wire each to email/CRM/Shopify; all already fire `form_submit` analytics events
- [ ] Corporate quote logo upload: needs storage (e.g. Shopify Files, S3) when wired

- [ ] Shopify Storefront API (see README, "Shopify migration path")
- [ ] Checkout redirect to Shopify (`CartProvider.checkout`)
- [ ] Newsletter provider (Klaviyo / Shopify Email)
- [ ] GTM / GA4 / Meta Pixel container (`lib/analytics.ts` already pushes events)
