/**
 * Collections data layer. Mirrors Shopify collections (handle = collection
 * handle). Swap `getCollection(s)` for Storefront API calls when migrating.
 */

export type Collection = {
  handle: string;
  title: string;
  /** Short line for cards and the collection hero. */
  tagline: string;
  intro: string;
  image: { src: string; alt: string };
  /** Background tint behind cut-out bottle images on collection cards. */
  tone: "stone" | "ivory" | "copper";
  /** Featured on the homepage "Our Collections" grid. */
  featured?: boolean;
  /** Related collections for the cross-sell banner. */
  related: string[];
};

const collections: Collection[] = [
  {
    handle: "corporate-gifts",
    title: "Corporate Gifts",
    tagline: "Personalized with your logo. One invoice.",
    intro:
      "Exclusive Mexican spirits your clients and team won't find at the LCBO, personalized with your logo and message and delivered for you.",
    image: { src: "/images/lifestyle/gifting-lineup.png", alt: "A line-up of Eleva gift bottles: Casa Cofradía, Reserva Huizar and Talavera Iguanas" },
    tone: "stone",
    featured: true,
    related: ["gift-sets", "gift-and-share", "glassware"],
  },
  {
    handle: "sip-neat",
    title: "Sip Neat",
    tagline: "For slow evenings and a good glass.",
    intro:
      "Expressions with enough depth to enjoy on their own: silky cristalinos, oak-aged añejos and clean, peppery blancos. Pour into a tequila glass and take your time.",
    image: { src: "/images/products/huizar-cristalino.png", alt: "Reserva Huizar Cristalino Reposado decanter" },
    tone: "stone",
    featured: true,
    related: ["glassware", "boutique-tequila-collection", "start-here"],
  },
  {
    handle: "mix-and-pour",
    title: "Mix & Pour",
    tagline: "Bright agave for better cocktails.",
    intro:
      "Bartender-approved bottles that make a margarita or paloma taste like it should. Additive-free agave shines through citrus, soda and ice.",
    image: { src: "/images/products/huizar-plata.png", alt: "Reserva Huizar Plata cobalt decanter" },
    tone: "ivory",
    featured: true,
    related: ["sip-neat", "cream-liqueurs", "glassware"],
  },
  {
    handle: "gift-and-share",
    title: "Gift & Share",
    tagline: "Bottles that make an entrance.",
    intro:
      "Hand-painted ceramics, crystal decanters and bottles with a story. Gift-ready, and chosen to impress anyone who appreciates something special.",
    image: { src: "/images/products/cofradia-iguanas.png", alt: "Casa Cofradía Iguanas hand-painted Talavera bottle" },
    tone: "stone",
    featured: true,
    related: ["gift-sets", "corporate-gifts", "glassware"],
  },
  {
    handle: "start-here",
    title: "Start Here",
    tagline: "Tasting minis to find your style.",
    intro:
      "New to sipping tequila? Start small. Our 100 ml minis and tasting flights let you compare expressions side by side before committing to a full bottle.",
    image: { src: "/images/lifestyle/trio-decanters.png", alt: "Three Reserva Huizar decanters: Rosado, Cristalino and Plata" },
    tone: "ivory",
    featured: true,
    related: ["sip-neat", "gift-sets", "glassware"],
  },
  {
    handle: "boutique-tequila-collection",
    title: "Boutique Tequila Collection",
    tagline: "Crystal decanters, small-batch houses.",
    intro:
      "Our boutique range of faceted crystal decanters and small-batch houses, imported directly by Eleva and selected by Adriana for their craft and their table presence.",
    image: { src: "/images/products/huizar-rosado.png", alt: "Reserva Huizar Plata Rosado magenta decanter" },
    tone: "stone",
    featured: true,
    related: ["gift-and-share", "sip-neat", "corporate-gifts"],
  },
  {
    handle: "glassware",
    title: "Glassware",
    tagline: "Taste the agave, not the alcohol.",
    intro: "The right glass changes everything. Crystal tequila glasses chosen by Adriana for tastings at home.",
    image: { src: "/images/products/huizar-cristalino.png", alt: "Crystal tequila decanter" },
    tone: "ivory",
    related: ["sip-neat", "gift-sets"],
  },
  {
    handle: "cream-liqueurs",
    title: "Cream Liqueurs",
    tagline: "Dessert in a glass.",
    intro: "Indulgent cream liqueurs for after dinner, coffee and celebration.",
    image: { src: "/images/products/pechery-dubai-chocolate.png", alt: "Pechery Dubai Style Chocolate Cream Liqueur" },
    tone: "copper",
    related: ["mix-and-pour", "gift-and-share"],
  },
  {
    handle: "gift-sets",
    title: "Gift Sets",
    tagline: "Beautifully boxed, ready to give.",
    intro: "Tasting flights and curated sets, boxed and ready to give, with gift messages available at checkout.",
    image: { src: "/images/lifestyle/gift-pair.png", alt: "Casa Cofradía Añejo and Iguanas Talavera bottles" },
    tone: "stone",
    related: ["corporate-gifts", "start-here", "glassware"],
  },
];

export const allProductsCollection: Collection = {
  handle: "all",
  title: "All Products",
  tagline: "The full Eleva cellar.",
  intro:
    "Every bottle in our range, each one additive-free agave or a carefully chosen companion, and many you won't find at the LCBO.",
  image: { src: "/images/lifestyle/trio-decanters.png", alt: "Three Reserva Huizar decanters" },
  tone: "stone",
  related: ["sip-neat", "gift-and-share", "start-here"],
};

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getFeaturedCollections(): Promise<Collection[]> {
  return collections.filter((c) => c.featured);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  if (handle === "all") return allProductsCollection;
  return collections.find((c) => c.handle === handle);
}
