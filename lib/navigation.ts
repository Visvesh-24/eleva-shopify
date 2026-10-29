/** Header + footer navigation. Matches the live site's nav structure. */

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/collections/all",
    children: [
      { label: "All Products", href: "/collections/all" },
      { label: "Sip Neat", href: "/collections/sip-neat", description: "Cristalinos, añejos, blancos to savour" },
      { label: "Mix & Pour", href: "/collections/mix-and-pour", description: "Bright agave for cocktails" },
      { label: "Gift & Share", href: "/collections/gift-and-share", description: "Bottles that make an entrance" },
      { label: "Start Here (Tasting Minis)", href: "/collections/start-here", description: "100 ml minis and flights" },
      { label: "Boutique Tequila Collection", href: "/collections/boutique-tequila-collection", description: "Crystal decanters" },
      { label: "Glassware", href: "/collections/glassware" },
      { label: "Cream Liqueurs", href: "/collections/cream-liqueurs" },
      { label: "Gift Sets", href: "/collections/gift-sets" },
    ],
  },
  { label: "Corporate Gifts", href: "/corporate-gifts" },
  { label: "Tequila/Mezcal Masterclass", href: "/masterclass" },
  { label: "Events", href: "/events" },
  { label: "Recipes & Resources", href: "/recipes" },
  { label: "About Us", href: "/about" },
  {
    label: "For Restaurants & Bars",
    href: "/trade",
    children: [
      { label: "Build Your Agave Program", href: "/trade", description: "Tastings, menus and staff training" },
      { label: "Trade Ordering", href: "/trade/ordering", description: "Apply for a trade account" },
      { label: "Quick Reorder", href: "/trade/reorder", description: "Reorder your usual list" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/collections/all" },
      { label: "Sip Neat", href: "/collections/sip-neat" },
      { label: "Mix & Pour", href: "/collections/mix-and-pour" },
      { label: "Gift & Share", href: "/collections/gift-and-share" },
      { label: "Start Here", href: "/collections/start-here" },
      { label: "Boutique Collection", href: "/collections/boutique-tequila-collection" },
      { label: "Gift Sets", href: "/collections/gift-sets" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { label: "Corporate Gifts", href: "/corporate-gifts" },
      { label: "Masterclass", href: "/masterclass" },
      { label: "Events", href: "/events" },
      { label: "Recipes & Resources", href: "/recipes" },
      { label: "For Restaurants & Bars", href: "/trade" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
