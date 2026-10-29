/**
 * Product data layer.
 *
 * Every page and component reads products ONLY through the async accessors at
 * the bottom of this file. To move to Shopify, re-implement those accessors
 * against the Storefront API (see README.md, "Shopify migration") and map the
 * response onto these types. The UI does not change.
 *
 * Prices are in cents (CAD). Prices, ratings, review counts and stock levels
 * are MOCK values (see TODO.md). Tasting notes are draft copy for Adriana to
 * approve. Products with `images: []` render an elegant placeholder until the
 * client supplies photography. Only the PNG cut-outs from /products are used.
 */

export type ProductType = "Tequila" | "Cream Liqueur" | "Glassware" | "Gift Set";

/** Tasting styles power the gift finder and the "tasting style" filter. */
export type TastingStyle = "bright" | "smooth" | "rich" | "sweet";

export const tastingStyleLabels: Record<TastingStyle, string> = {
  bright: "Bright & crisp",
  smooth: "Smooth & silky",
  rich: "Rich & aged",
  sweet: "Sweet & indulgent",
};

export type ProductImage = { src: string; alt: string; width: number; height: number };

export type ProductVariant = {
  id: string;
  sku: string;
  title: string; // e.g. "750 ml", "Set of 2"
  price: number; // cents CAD
  compareAtPrice?: number;
  stock: number; // MOCK inventory. Drives low-stock messaging.
};

export type Product = {
  id: string;
  slug: string; // = Shopify product handle
  name: string;
  brand: string;
  type: ProductType;
  expression?: string; // Blanco, Reposado, Añejo...
  size: string;
  abv?: string;
  shortDescription: string; // one line for cards
  pitch: string; // short sales paragraph for the product page
  description: string;
  tastingNotes?: { aroma: string; palate: string; finish: string };
  chips: string[]; // 2-3 tasting-note chips for cards
  tastingStyles: TastingStyle[];
  serve?: string;
  pairsWith?: string[];
  rating: number; // MOCK
  reviewCount: number; // MOCK
  images: ProductImage[];
  variants: ProductVariant[];
  collections: string[]; // collection handles, see lib/collections.ts
  badges: { additiveFree?: boolean; notAtLCBO?: boolean; giftReady?: boolean; limited?: boolean };
  bestSeller?: boolean;
  /** Placeholder product with no photography yet. */
  awaitingAssets?: boolean;
  /** Suggested pairing (handles) for "Frequently bought together" + upsells. */
  pairsWithProducts?: string[];
};

/** All product shots are transparent PNG cut-outs on a 4:5 canvas. */
const img = (slug: string, alt: string): ProductImage => ({
  src: `/images/products/${slug}.png`,
  alt,
  width: 1000,
  height: 1250,
});

const products: Product[] = [
  {
    id: "p-huizar-plata",
    slug: "reserva-huizar-plata",
    name: "Reserva Huizar Plata",
    brand: "Reserva Huizar",
    type: "Tequila",
    expression: "Blanco",
    size: "750 ml",
    abv: "40%",
    shortDescription: "Crisp, unaged blanco in a cobalt crystal decanter.",
    pitch:
      "The purest expression of Jalisco agave: bright, clean and peppery. Adriana's pick for a first sip of what additive-free blanco should taste like, and the bottle that steals the bar cart.",
    description:
      "Reserva Huizar Plata is a 100% blue agave blanco, bottled unaged to keep the character of slow-cooked agave front and centre. Presented in a hand-finished cobalt decanter that makes it as much a gift as a pour.",
    tastingNotes: {
      aroma: "Cooked agave, lime zest, white pepper",
      palate: "Clean and bright agave with gentle minerality and a hint of vanilla",
      finish: "Crisp and peppery, medium length",
    },
    chips: ["Citrus", "Cooked agave", "White pepper"],
    tastingStyles: ["bright"],
    serve: "Lightly chilled and neat, or as the base of a two-ingredient Paloma.",
    pairsWith: ["Ceviche", "Oysters", "Citrus salads"],
    rating: 4.8,
    reviewCount: 64,
    images: [
      img("huizar-plata", "Reserva Huizar Plata tequila in a cobalt blue faceted decanter"),
    ],
    variants: [{ id: "v-huizar-plata-750", sku: "RH-PLATA-750", title: "750 ml", price: 129_00, stock: 24 }],
    collections: ["sip-neat", "mix-and-pour", "boutique-tequila-collection", "corporate-gifts"],
    badges: { additiveFree: true, notAtLCBO: true, giftReady: true },
    bestSeller: true,
    pairsWithProducts: ["riedel-tequila-glass", "reserva-huizar-tasting-collection"],
  },
  {
    id: "p-huizar-rosado",
    slug: "reserva-huizar-plata-rosado",
    name: "Reserva Huizar Plata Rosado",
    brand: "Reserva Huizar",
    type: "Tequila",
    expression: "Rosado",
    size: "750 ml",
    abv: "40%",
    shortDescription: "A blush-pink tequila with red berry and rose notes.",
    pitch:
      "Soft, fruity and endlessly giftable. Rosado wins over guests who think they don't like tequila, and the magenta decanter does the rest.",
    description:
      "A 100% blue agave tequila finished to a natural blush, with red fruit and floral notes over a silky agave core. One of the most-requested bottles in our boutique range. You won't find it at the LCBO.",
    tastingNotes: {
      aroma: "Red berries, rose petal, cooked agave",
      palate: "Silky strawberry and agave sweetness, light and round",
      finish: "Soft and fruity with a gentle spice",
    },
    chips: ["Red berries", "Floral", "Silky"],
    tastingStyles: ["smooth", "sweet"],
    serve: "Over a large ice cube with a twist of grapefruit, or in a Rosado Spritz.",
    pairsWith: ["Charcuterie", "Berry desserts", "Brunch"],
    rating: 4.9,
    reviewCount: 41,
    images: [
      img("huizar-rosado", "Reserva Huizar Plata Rosado tequila in a magenta faceted decanter"),
    ],
    variants: [{ id: "v-huizar-rosado-750", sku: "RH-ROSADO-750", title: "750 ml", price: 139_00, stock: 14 }],
    collections: ["sip-neat", "gift-and-share", "boutique-tequila-collection", "corporate-gifts"],
    badges: { additiveFree: true, notAtLCBO: true, giftReady: true },
    bestSeller: true,
    pairsWithProducts: ["riedel-tequila-glass", "pechery-dubai-chocolate"],
  },
  {
    id: "p-huizar-cristalino",
    slug: "reserva-huizar-cristalino-reposado",
    name: "Reserva Huizar Cristalino Reposado",
    brand: "Reserva Huizar",
    type: "Tequila",
    expression: "Cristalino Reposado",
    size: "750 ml",
    abv: "40%",
    shortDescription: "Barrel-rested, then filtered crystal clear. Vanilla and honey.",
    pitch:
      "All the warmth of a barrel-rested reposado with the clarity of a blanco. Smooth enough for a first-time sipper, layered enough for the connoisseur. Our most-gifted bottle.",
    description:
      "Rested in oak, then carefully filtered to remove colour while keeping the vanilla and caramel notes of the barrel. Presented in a faceted crystal decanter with a gold-tinted stopper.",
    tastingNotes: {
      aroma: "Vanilla, toasted oak, caramel",
      palate: "Smooth honey and butterscotch over roasted agave",
      finish: "Long and gentle with soft oak",
    },
    chips: ["Vanilla", "Honey", "Soft oak"],
    tastingStyles: ["smooth"],
    serve: "Neat at room temperature in a tequila glass. Let it open for a minute.",
    pairsWith: ["Aged cheeses", "Crème brûlée", "Roasted nuts"],
    rating: 4.9,
    reviewCount: 88,
    images: [
      img("huizar-cristalino", "Reserva Huizar Cristalino Reposado tequila in a faceted crystal decanter"),
    ],
    variants: [{ id: "v-huizar-cristalino-750", sku: "RH-CRIST-750", title: "750 ml", price: 149_00, stock: 18 }],
    collections: ["sip-neat", "gift-and-share", "boutique-tequila-collection", "corporate-gifts"],
    badges: { additiveFree: true, notAtLCBO: true, giftReady: true },
    bestSeller: true,
    pairsWithProducts: ["riedel-tequila-glass", "reserva-huizar-extra-anejo-mini"],
  },
  {
    id: "p-huizar-extra-anejo-mini",
    slug: "reserva-huizar-extra-anejo-mini",
    name: "Reserva Huizar Extra Añejo Mini",
    brand: "Reserva Huizar",
    type: "Tequila",
    expression: "Extra Añejo",
    size: "100 ml",
    abv: "40%",
    shortDescription: "A 100 ml taste of long-aged extra añejo. Rich and dark.",
    pitch:
      "The easiest way to discover extra añejo: a beautifully finished 100 ml decanter, aged more than three years. Perfect as a stocking stuffer, a place setting gift, or a first step into aged tequila.",
    description:
      "Extra añejo tequila is aged for over three years in oak, giving deep notes of dark chocolate, dried fruit and spice. This miniature decanter mirrors the full-size bottle.",
    tastingNotes: {
      aroma: "Dark chocolate, dried fig, toasted oak",
      palate: "Rich toffee, cinnamon and cocoa with cooked agave underneath",
      finish: "Long, warm and lingering",
    },
    chips: ["Dark chocolate", "Toffee", "Oak"],
    tastingStyles: ["rich"],
    serve: "Neat, slowly, after dinner.",
    pairsWith: ["Dark chocolate", "Espresso", "Cigars"],
    rating: 4.7,
    reviewCount: 29,
    images: [], // Only a webp shot exists; awaiting a PNG cut-out (TODO.md)
    awaitingAssets: true,
    variants: [{ id: "v-huizar-xa-100", sku: "RH-XA-100", title: "100 ml", price: 49_00, stock: 30 }],
    collections: ["start-here", "sip-neat", "gift-and-share"],
    badges: { additiveFree: true, notAtLCBO: true, giftReady: true },
    pairsWithProducts: ["reserva-huizar-tasting-collection", "riedel-tequila-glass"],
  },
  {
    id: "p-huizar-tasting-collection",
    slug: "reserva-huizar-tasting-collection",
    name: "Reserva Huizar Tasting Collection",
    brand: "Reserva Huizar",
    type: "Gift Set",
    size: "3 × 100 ml",
    abv: "40%",
    shortDescription: "Rosado, Cristalino and Añejo minis in a gift box.",
    pitch:
      "Three expressions, one beautiful box. The best place to start your agave journey, and the gift that lets them find their favourite.",
    description:
      "A guided flight of three 100 ml Reserva Huizar decanters (Rosado, Cristalino Reposado and Añejo), presented in a windowed gift box. Includes a tasting card written by Adriana.",
    tastingNotes: {
      aroma: "From red berries to vanilla to toasted oak",
      palate: "A progression from fresh and fruity to rich and aged",
      finish: "Compare side by side to discover your style",
    },
    chips: ["Flight of 3", "Gift box", "Tasting card"],
    tastingStyles: ["smooth", "rich", "sweet"],
    serve: "Taste lightest to richest, in that order, with water between.",
    pairsWith: ["A tasting night with friends", "Dark chocolate"],
    rating: 4.9,
    reviewCount: 52,
    images: [], // Only a webp shot exists; awaiting a PNG cut-out (TODO.md)
    awaitingAssets: true,
    variants: [{ id: "v-huizar-set", sku: "RH-SET-3X100", title: "3 × 100 ml", price: 119_00, stock: 9 }],
    collections: ["start-here", "gift-sets", "gift-and-share", "corporate-gifts", "boutique-tequila-collection"],
    badges: { additiveFree: true, notAtLCBO: true, giftReady: true },
    bestSeller: true,
    pairsWithProducts: ["riedel-tequila-glass", "reserva-huizar-extra-anejo-mini"],
  },
  {
    id: "p-cofradia-anejo",
    slug: "casa-cofradia-anejo",
    name: "Casa Cofradía Añejo",
    brand: "Casa Cofradía",
    type: "Tequila",
    expression: "Añejo",
    size: "750 ml",
    abv: "40%",
    shortDescription: "Oak-aged añejo with caramel, cocoa and cinnamon.",
    pitch:
      "From one of Tequila's most respected family houses, a deeply satisfying añejo in a striking black bell bottle. A gentleman's sipper and a spectacular host gift.",
    description:
      "Aged in American oak, Casa Cofradía Añejo balances cooked agave sweetness with caramel, cocoa and baking spice. Bottled in Casa Cofradía's signature black bell-shaped bottle.",
    tastingNotes: {
      aroma: "Oak, vanilla, cooked agave, cinnamon",
      palate: "Caramel, dried fruit and cocoa",
      finish: "Smooth and lingering with baking spice",
    },
    chips: ["Caramel", "Cocoa", "Cinnamon"],
    tastingStyles: ["rich"],
    serve: "Neat, or with a single drop of water to open the oak.",
    pairsWith: ["Steak", "Mole", "Dark chocolate"],
    rating: 4.8,
    reviewCount: 37,
    images: [
      img("cofradia-anejo", "Casa Cofradía Añejo tequila in a black bell-shaped bottle"),
    ],
    variants: [{ id: "v-cofradia-anejo-750", sku: "CC-ANEJO-750", title: "750 ml", price: 139_00, stock: 12 }],
    collections: ["sip-neat", "gift-and-share", "corporate-gifts"],
    badges: { additiveFree: true, notAtLCBO: true, giftReady: true },
    bestSeller: true,
    pairsWithProducts: ["riedel-tequila-glass", "reserva-huizar-extra-anejo-mini"],
  },
  {
    id: "p-cofradia-iguanas",
    slug: "casa-cofradia-iguanas-talavera",
    name: "Casa Cofradía Iguanas Talavera Edition",
    brand: "Casa Cofradía",
    type: "Tequila",
    expression: "Reposado",
    size: "750 ml",
    abv: "38%",
    shortDescription: "Hand-painted Talavera ceramic. A true collector's piece.",
    pitch:
      "Each bottle is hand-painted ceramic in the Talavera tradition, so no two are exactly alike. It's the gift people keep long after the tequila is gone.",
    description:
      "A smooth reposado presented in a hand-painted Talavera ceramic bottle with sculpted iguanas. Produced in small numbers and imported directly by Eleva.",
    tastingNotes: {
      aroma: "Cooked agave, honey, light oak",
      palate: "Smooth vanilla and caramel over sweet agave",
      finish: "Medium length with soft spice",
    },
    chips: ["Honey", "Vanilla", "Collectible"],
    tastingStyles: ["smooth"],
    serve: "Neat or on a single large ice cube.",
    pairsWith: ["Tacos al pastor", "Grilled pineapple"],
    rating: 5,
    reviewCount: 18,
    images: [
      img("cofradia-iguanas", "Casa Cofradía Iguanas tequila in a hand-painted Talavera ceramic bottle with iguanas"),
    ],
    variants: [{ id: "v-cofradia-iguanas-750", sku: "CC-IGUANAS-750", title: "750 ml", price: 219_00, stock: 4 }],
    collections: ["gift-and-share", "corporate-gifts", "boutique-tequila-collection"],
    badges: { additiveFree: true, notAtLCBO: true, giftReady: true, limited: true },
    bestSeller: true,
    pairsWithProducts: ["riedel-tequila-glass"],
  },
  {
    id: "p-pechery-dubai",
    slug: "pechery-dubai-chocolate",
    name: "Pechery Dubai Style Chocolate Cream Liqueur",
    brand: "Pechery",
    type: "Cream Liqueur",
    size: "700 ml",
    abv: "15%",
    shortDescription: "Dark chocolate, pistachio and toasted kataifi. Velvety.",
    pitch:
      "Inspired by the Dubai chocolate bar everyone's talking about: dark chocolate, pistachio cream and toasted pastry in a velvety liqueur. Pour over ice, into coffee, or over ice cream.",
    description:
      "A rich cream liqueur with dark chocolate and pistachio notes. A dessert in a glass, and a crowd-pleaser on any gift table.",
    tastingNotes: {
      aroma: "Dark chocolate, roasted pistachio, pastry",
      palate: "Velvety cocoa with nutty sweetness",
      finish: "Sweet and lingering",
    },
    chips: ["Dark chocolate", "Pistachio", "Velvety"],
    tastingStyles: ["sweet"],
    serve: "Chilled over ice, in an espresso martini, or poured over vanilla ice cream.",
    pairsWith: ["Espresso", "Ice cream", "Churros"],
    rating: 4.8,
    reviewCount: 73,
    images: [
      img("pechery-dubai-chocolate", "Pechery Dubai Style Chocolate Cream Liqueur with a chocolate splash"),
    ],
    variants: [{ id: "v-pechery-dubai-700", sku: "PE-DUBAI-700", title: "700 ml", price: 54_00, stock: 20 }],
    collections: ["cream-liqueurs", "mix-and-pour", "gift-and-share"],
    badges: { notAtLCBO: true, giftReady: true },
    bestSeller: true,
    pairsWithProducts: ["pechery-pistachio", "reserva-huizar-plata-rosado"],
  },

  /* ---- Awaiting photography (placeholders; see TODO.md) ---- */
  {
    id: "p-pechery-pistachio",
    slug: "pechery-pistachio",
    name: "Pechery Pistachio Cream Liqueur",
    brand: "Pechery",
    type: "Cream Liqueur",
    size: "700 ml",
    abv: "15%",
    shortDescription: "Roasted pistachio cream. Nutty, silky, moreish.",
    pitch: "Silky roasted pistachio in a cream liqueur that's lovely over ice and spectacular in an affogato.",
    description: "A smooth pistachio cream liqueur. Product details to be confirmed by the client.",
    tastingNotes: {
      aroma: "Roasted pistachio, sweet cream",
      palate: "Silky, nutty and gently sweet",
      finish: "Soft and creamy",
    },
    chips: ["Pistachio", "Cream", "Silky"],
    tastingStyles: ["sweet"],
    serve: "Over ice, or poured over espresso and gelato.",
    pairsWith: ["Affogato", "Biscotti"],
    rating: 4.7,
    reviewCount: 22,
    images: [],
    variants: [{ id: "v-pechery-pist-700", sku: "PE-PIST-700", title: "700 ml", price: 54_00, stock: 16 }],
    collections: ["cream-liqueurs", "mix-and-pour", "gift-and-share"],
    badges: { notAtLCBO: true, giftReady: true },
    awaitingAssets: true,
    pairsWithProducts: ["pechery-dubai-chocolate"],
  },
  {
    id: "p-region-real",
    slug: "region-real-blanco",
    name: "Región Real Blanco",
    brand: "Región Real",
    type: "Tequila",
    expression: "Blanco",
    size: "750 ml",
    abv: "40%",
    shortDescription: "An honest, agave-forward blanco built for cocktails.",
    pitch: "Clean, bright and agave-forward. The blanco our bartender friends reach for when the margarita has to be perfect.",
    description: "Product details to be confirmed by the client.",
    tastingNotes: {
      aroma: "Fresh agave, lime, green herbs",
      palate: "Bright and peppery with a touch of sweetness",
      finish: "Clean and crisp",
    },
    chips: ["Fresh agave", "Lime", "Herbal"],
    tastingStyles: ["bright"],
    serve: "Shaken in a classic Margarita.",
    pairsWith: ["Tacos", "Guacamole"],
    rating: 4.6,
    reviewCount: 19,
    images: [],
    variants: [{ id: "v-region-real-750", sku: "RR-BLANCO-750", title: "750 ml", price: 89_00, stock: 15 }],
    collections: ["mix-and-pour", "sip-neat"],
    badges: { additiveFree: true, notAtLCBO: true },
    awaitingAssets: true,
    pairsWithProducts: ["hoyo-19-blanco", "riedel-tequila-glass"],
  },
  {
    id: "p-hoyo-19",
    slug: "hoyo-19-blanco",
    name: "Hoyo 19 Blanco",
    brand: "Hoyo 19",
    type: "Tequila",
    expression: "Blanco",
    size: "750 ml",
    abv: "40%",
    shortDescription: "The clubhouse blanco. Easy, bright and made to share.",
    pitch: "Named for golf's favourite hole: the clubhouse. A bright, easy blanco made for good company.",
    description: "Product details to be confirmed by the client.",
    tastingNotes: {
      aroma: "Citrus, sweet agave",
      palate: "Light and bright with a peppery edge",
      finish: "Short and clean",
    },
    chips: ["Citrus", "Easy-going", "Peppery"],
    tastingStyles: ["bright"],
    serve: "With soda and lime, or in a Ranch Water.",
    pairsWith: ["Barbecue", "Patio afternoons"],
    rating: 4.6,
    reviewCount: 14,
    images: [],
    variants: [{ id: "v-hoyo19-750", sku: "H19-BLANCO-750", title: "750 ml", price: 79_00, stock: 22 }],
    collections: ["mix-and-pour", "gift-and-share", "corporate-gifts"],
    badges: { additiveFree: true, notAtLCBO: true },
    awaitingAssets: true,
    pairsWithProducts: ["region-real-blanco"],
  },
  {
    id: "p-riedel-tequila",
    slug: "riedel-tequila-glass",
    name: "Riedel Tequila Glass",
    brand: "Riedel",
    type: "Glassware",
    size: "Set of 2",
    shortDescription: "The tulip-shaped glass designed to open up agave aromas.",
    pitch:
      "The glass Adriana uses at every masterclass. Its tulip bowl gathers the aromas a shot glass throws away, so you taste the agave, not the alcohol.",
    description: "Crystal tequila glasses by Riedel. Dishwasher safe. Gift boxed.",
    chips: ["Crystal", "Gift boxed", "Masterclass pick"],
    tastingStyles: [],
    rating: 4.9,
    reviewCount: 46,
    images: [],
    variants: [
      { id: "v-riedel-2", sku: "RD-TEQ-2", title: "Set of 2", price: 59_00, stock: 25 },
      { id: "v-riedel-4", sku: "RD-TEQ-4", title: "Set of 4", price: 109_00, stock: 10 },
    ],
    collections: ["glassware", "gift-and-share", "corporate-gifts"],
    badges: { giftReady: true },
    awaitingAssets: true,
    pairsWithProducts: ["reserva-huizar-cristalino-reposado"],
  },
];

/* ------------------------------------------------------------------------- */
/* Accessors. These are the ONLY functions the UI uses. Swap their bodies for */
/* Storefront API calls when migrating to Shopify.                           */
/* ------------------------------------------------------------------------- */

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCollection(handle: string): Promise<Product[]> {
  if (handle === "all") return products;
  return products.filter((p) => p.collections.includes(handle));
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  return products.filter((p) => p.bestSeller).slice(0, limit);
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  return slugs.map((s) => products.find((p) => p.slug === s)).filter((p): p is Product => Boolean(p));
}

/** Simple related products: same collections, excluding itself. */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.slug !== product.slug && p.collections.some((c) => product.collections.includes(c)))
    .slice(0, limit);
}

/* Pure helpers (safe on server and client) */

export const minPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price));
export const totalStock = (p: Product) => p.variants.reduce((n, v) => n + v.stock, 0);
export const isSoldOut = (p: Product) => totalStock(p) <= 0;
