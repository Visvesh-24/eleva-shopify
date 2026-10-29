/**
 * Store-wide settings. Anything marked MOCK is demo data and is listed in
 * TODO.md so the client confirms it before launch (no fake urgency goes live).
 */
export const siteConfig = {
  name: "Eleva Imports",
  url: "https://elevaimports.com",
  description:
    "Additive-free, 100% blue agave tequila and agave spirits, curated in Toronto by Adriana Martinez, Canada's only Certified Tequila Master.",
  locale: "en-CA",
  currency: "CAD",

  contact: {
    phoneDisplay: "905-718-1247",
    phoneHref: "tel:+19057181247",
    whatsapp: "https://wa.me/19057181247",
    instagram: "https://www.instagram.com/adrianatequilamaster",
    instagramHandle: "@adrianatequilamaster",
    email: "hello@elevaimports.com", // TODO(client): confirm public email
    city: "Toronto, Ontario",
  },

  commerce: {
    freeShippingThreshold: 150_00, // MOCK: cents. Confirm with client.
    welcomeDiscountPercent: 10, // MOCK: confirm first-order offer + code
    welcomeDiscountCode: "WELCOME10", // MOCK
    giftWrapPrice: 12_00, // MOCK
    lowStockThreshold: 5, // show "only X left" at or below this stock level
  },

  corporate: {
    // MOCK: corporate holiday ordering deadline. Drives urgency copy everywhere.
    orderDeadline: "2026-11-20",
    deliveryWindow: "the first two weeks of December", // MOCK
    minimumOrder: 10, // MOCK: minimum gifts per corporate order
  },

  announcements: [
    { text: "✦ Holiday Edit · Free shipping $150+", href: "/collections/gift-and-share" },
    { text: "10% off your first order when you join the list", href: "#newsletter" },
    { text: "Corporate gifting orders close November 20", href: "/corporate-gifts" },
  ],
} as const;

/** Days remaining until an ISO date (local time). Negative when passed. */
export function daysUntil(isoDate: string, from: Date = new Date()): number {
  const target = new Date(`${isoDate}T23:59:59`);
  return Math.ceil((target.getTime() - from.getTime()) / 86_400_000);
}

/** "November 20" style label for a deadline. */
export function formatDeadline(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
  });
}
