/**
 * Recipes. Each one links to the products it uses so "Shop this recipe" can
 * add them all to cart. Cocktail photography is TODO: cards use the bottle
 * cut-out on a tinted panel until then.
 */
export type Recipe = {
  slug: string;
  name: string;
  tagline: string;
  time: string;
  level: "Easy" | "Intermediate";
  tint: string; // tailwind bg class for the card panel
  heroProduct: string; // product slug whose image represents the recipe
  products: string[]; // product slugs used ("Shop this recipe")
  ingredients: string[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "paloma",
    name: "The Perfect Paloma",
    tagline: "Mexico's favourite highball: bright, salty, refreshing.",
    time: "3 min",
    level: "Easy",
    tint: "bg-[#F6E7E1]",
    heroProduct: "reserva-huizar-plata",
    products: ["reserva-huizar-plata"],
    ingredients: [
      "60 ml Reserva Huizar Plata",
      "15 ml fresh lime juice",
      "Pinch of flaky salt",
      "Grapefruit soda, to top",
      "Grapefruit wedge, to garnish",
    ],
    steps: [
      "Half-rim a highball glass with salt and fill with ice.",
      "Add the tequila and lime juice.",
      "Top with chilled grapefruit soda and stir gently once.",
      "Garnish with a grapefruit wedge.",
    ],
  },
  {
    slug: "classic-margarita",
    name: "Classic Margarita",
    tagline: "Three ingredients, no shortcuts, all agave.",
    time: "4 min",
    level: "Easy",
    tint: "bg-[#EEF0E4]",
    heroProduct: "reserva-huizar-plata",
    products: ["reserva-huizar-plata"],
    ingredients: ["60 ml Reserva Huizar Plata (or Región Real Blanco)", "30 ml fresh lime juice", "20 ml orange liqueur", "Salt, for the rim (optional)"],
    steps: [
      "Shake all ingredients hard with ice for 10 seconds.",
      "Strain into a chilled, salt-rimmed coupe or over fresh ice.",
      "Garnish with a lime wheel.",
    ],
  },
  {
    slug: "rosado-spritz",
    name: "Rosado Spritz",
    tagline: "A blush-pink aperitivo for long afternoons.",
    time: "3 min",
    level: "Easy",
    tint: "bg-[#F7E4EA]",
    heroProduct: "reserva-huizar-plata-rosado",
    products: ["reserva-huizar-plata-rosado"],
    ingredients: ["45 ml Reserva Huizar Plata Rosado", "90 ml dry sparkling wine", "30 ml soda water", "Strawberry and grapefruit twist"],
    steps: [
      "Fill a wine glass with ice.",
      "Add the Rosado, then the sparkling wine and soda.",
      "Stir once and garnish with a sliced strawberry and grapefruit twist.",
    ],
  },
  {
    slug: "dubai-chocolate-martini",
    name: "Dubai Chocolate Espresso Martini",
    tagline: "Dessert and nightcap in one velvety glass.",
    time: "5 min",
    level: "Intermediate",
    tint: "bg-[#EFE5DA]",
    heroProduct: "pechery-dubai-chocolate",
    products: ["pechery-dubai-chocolate", "reserva-huizar-cristalino-reposado"],
    ingredients: [
      "45 ml Pechery Dubai Style Chocolate Cream Liqueur",
      "30 ml Reserva Huizar Cristalino Reposado",
      "30 ml fresh espresso, cooled",
      "Crushed pistachio, to garnish",
    ],
    steps: [
      "Add everything to a shaker with plenty of ice.",
      "Shake hard for 15 seconds to build a silky foam.",
      "Double-strain into a chilled coupe and dust with crushed pistachio.",
    ],
  },
  {
    slug: "cristalino-old-fashioned",
    name: "Cristalino Old Fashioned",
    tagline: "A crystal-clear twist on the classic.",
    time: "4 min",
    level: "Intermediate",
    tint: "bg-[#F3ECDF]",
    heroProduct: "reserva-huizar-cristalino-reposado",
    products: ["reserva-huizar-cristalino-reposado", "riedel-tequila-glass"],
    ingredients: ["60 ml Reserva Huizar Cristalino Reposado", "7 ml agave syrup", "2 dashes orange bitters", "Orange peel"],
    steps: [
      "Stir the tequila, agave syrup and bitters over ice for 20 seconds.",
      "Strain over a single large cube.",
      "Express an orange peel over the glass and drop it in.",
    ],
  },
];

export const getRecipe = (slug: string) => recipes.find((r) => r.slug === slug);
