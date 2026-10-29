/**
 * Masterclass sessions, events and corporate gifting tiers.
 * ALL DATES, PRICES AND SEAT COUNTS ARE MOCK (see TODO.md). Seats-left
 * messaging is driven by `seatsLeft`, so no scarcity is shown without data.
 */

export type Session = {
  id: string;
  title: string;
  date: string; // ISO date
  time: string;
  location: string;
  format: "In person" | "Virtual";
  pricePerGuest: number; // cents
  seatsLeft: number;
  description: string;
};

export const masterclassSessions: Session[] = [
  {
    id: "mc-2026-11-14",
    title: "Tequila Fundamentals: Blanco to Añejo",
    date: "2026-11-14",
    time: "7:00 – 9:00 pm",
    location: "Downtown Toronto (venue shared on booking)",
    format: "In person",
    pricePerGuest: 95_00,
    seatsLeft: 6,
    description: "Taste five additive-free expressions side by side and learn how agave, cooking and barrels shape every sip.",
  },
  {
    id: "mc-2026-11-28",
    title: "Agave & Chocolate Pairing",
    date: "2026-11-28",
    time: "6:30 – 8:30 pm",
    location: "Downtown Toronto (venue shared on booking)",
    format: "In person",
    pricePerGuest: 110_00,
    seatsLeft: 12,
    description: "A festive pairing of aged tequilas and fine chocolate, including our Pechery cream liqueurs.",
  },
  {
    id: "mc-2026-12-05",
    title: "Virtual Masterclass with Tasting Kit",
    date: "2026-12-05",
    time: "7:00 – 8:30 pm",
    location: "Online (kit shipped in Ontario)",
    format: "Virtual",
    pricePerGuest: 85_00,
    seatsLeft: 20,
    description: "Join from home with a tasting kit of four 30 ml samples delivered to your door.",
  },
  {
    id: "mc-2027-01-23",
    title: "Mezcal & the Wider World of Agave",
    date: "2027-01-23",
    time: "7:00 – 9:00 pm",
    location: "Downtown Toronto (venue shared on booking)",
    format: "In person",
    pricePerGuest: 105_00,
    seatsLeft: 14,
    description: "Beyond tequila: espadín, wild agaves and the traditions behind Mexico's artisanal spirits.",
  },
];

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number | null; // null = free
  description: string;
  rsvp: "tickets" | "rsvp";
};

export const upcomingEvents: EventItem[] = [
  {
    id: "ev-holiday-tasting",
    title: "Holiday Gift Tasting Evening",
    date: "2026-11-21",
    time: "5:00 – 8:00 pm",
    venue: "Eleva tasting room (TBC)",
    city: "Toronto",
    price: null,
    description: "Taste our gifting range, see corporate personalization samples, and shop holiday gifts with event-only gift wrap.",
    rsvp: "rsvp",
  },
  {
    id: "ev-tequila-tacos",
    title: "Tequila & Tacos Pop-Up",
    date: "2026-12-12",
    time: "2:00 – 6:00 pm",
    venue: "Partner restaurant (TBC)",
    city: "Toronto",
    price: 45_00,
    description: "Three tequila flights paired with tacos from a partner kitchen, hosted by Adriana.",
    rsvp: "tickets",
  },
  {
    id: "ev-valentines",
    title: "Rosado & Roses: Valentine's Tasting",
    date: "2027-02-12",
    time: "7:00 – 9:00 pm",
    venue: "Downtown Toronto (TBC)",
    city: "Toronto",
    price: 75_00,
    description: "A romantic evening of Rosado cocktails, sipping tequilas and chocolate. Tickets sold per pair.",
    rsvp: "tickets",
  },
];

export type GiftTier = {
  name: string;
  priceRange: string;
  minimum: number;
  includes: string[];
  productSlug: string;
  featured?: boolean;
};

export const giftTiers: GiftTier[] = [
  {
    name: "The Signature",
    priceRange: "$140 – $180 per gift",
    minimum: 10,
    includes: ["One 750 ml Reserva Huizar Plata or Rosado", "Gift box with your logo", "Printed message card"],
    productSlug: "reserva-huizar-plata",
  },
  {
    name: "The Connoisseur",
    priceRange: "$220 – $280 per gift",
    minimum: 10,
    includes: ["Reserva Huizar Cristalino Reposado", "Pair of Riedel tequila glasses", "Logo gift box + tasting card by Adriana"],
    productSlug: "reserva-huizar-cristalino-reposado",
    featured: true,
  },
  {
    name: "The Collector",
    priceRange: "$260 – $340 per gift",
    minimum: 5,
    includes: ["Hand-painted Cofradía Iguanas Talavera bottle", "Premium presentation box", "Personal note from your team"],
    productSlug: "casa-cofradia-iguanas-talavera",
  },
  {
    name: "The Discovery Flight",
    priceRange: "$120 – $150 per gift",
    minimum: 20,
    includes: ["Three 100 ml Reserva Huizar minis", "Windowed gift box with your logo", "Guided tasting card"],
    productSlug: "reserva-huizar-tasting-collection",
  },
];

/** Mock past orders for the trade Quick Reorder page. */
export const tradeAccount = {
  business: "Casa Verde Cocina (demo account)",
  contact: "Demo Manager",
  orders: [
    {
      id: "TR-10482",
      date: "2026-10-08",
      lines: [
        { slug: "reserva-huizar-plata", qty: 12 },
        { slug: "reserva-huizar-cristalino-reposado", qty: 6 },
        { slug: "pechery-dubai-chocolate", qty: 6 },
      ],
    },
    {
      id: "TR-10391",
      date: "2026-09-10",
      lines: [
        { slug: "reserva-huizar-plata", qty: 12 },
        { slug: "reserva-huizar-plata-rosado", qty: 6 },
        { slug: "region-real-blanco", qty: 12 },
      ],
    },
  ],
};

/** Mock trade pricing: retail minus a flat trade discount. */
export const TRADE_DISCOUNT = 0.2;
