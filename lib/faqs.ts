/**
 * FAQ content, grouped by topic. Draft answers: the client must confirm every
 * policy detail (shipping provinces, timelines, minimums) before launch.
 */
export type FAQ = { q: string; a: string };

export const faqs: Record<"shopping" | "shipping" | "corporate" | "masterclass" | "trade", FAQ[]> = {
  shopping: [
    {
      q: "What does \"additive-free\" mean?",
      a: "Mexican regulations allow small amounts of additives such as glycerin, caramel colour, oak extract and sugar syrup to be used without being listed on the label. The additive-free tequilas we carry are made from 100% blue agave, water and yeast only, so what you taste comes from the agave, the cooking, the fermentation and the barrel.",
    },
    {
      q: "Why can't I find these bottles at the LCBO?",
      a: "Eleva imports directly from small, family-run producers in Mexico. Many of our bottles are not listed at the LCBO or any other Canadian retailer, which is why our customers come to us.",
    },
    {
      q: "Which tequila should I choose?",
      a: "For cocktails, start with a bright blanco. For sipping, a cristalino or añejo is smooth and approachable. If you're unsure, try a 100 ml mini or a tasting set, or call us at 905-718-1247 for a personal recommendation.",
    },
    {
      q: "Can I add a gift message?",
      a: "Yes. Add a gift message and signature gift wrap in your cart or on any product page. The message is printed on a card and no prices are included in gift parcels.",
    },
  ],
  shipping: [
    {
      q: "Where do you ship?",
      a: "We currently ship within Ontario, with same-week delivery across the GTA. Shipping availability to other provinces varies with provincial regulations. Contact us to confirm delivery to your address.",
    },
    {
      q: "How long does delivery take?",
      a: "Orders are prepared in Toronto within 1–2 business days. GTA deliveries usually arrive within 2–4 business days, and the rest of Ontario within 3–6 business days.",
    },
    {
      q: "Do I need to be home to receive my order?",
      a: "Yes. An adult of legal drinking age must sign for alcohol deliveries, and proof of age may be required.",
    },
    {
      q: "What is your returns policy?",
      a: "Because alcohol is a regulated product, we can't accept returns of opened bottles. If your order arrives damaged or incorrect, contact us within 48 hours with a photo and we'll make it right.",
    },
  ],
  corporate: [
    {
      q: "What's the minimum order for corporate gifts?",
      a: "Personalized corporate orders start at 10 gifts. For smaller orders, our gift sets and gift messages are a great alternative.",
    },
    {
      q: "Can you personalize bottles with our logo?",
      a: "Yes. We add your logo and message to a custom gift card, tag and gift box. Ask us about engraving and custom labels for larger orders. You'll approve a digital proof before anything is produced.",
    },
    {
      q: "Can you ship to each recipient individually?",
      a: "Yes. Send us a list of recipients and we'll deliver to every address, with one order and one invoice for you.",
    },
    {
      q: "When is the holiday ordering deadline?",
      a: "Holiday corporate orders close on November 20 for delivery in the first two weeks of December. Orders after the deadline are accepted when stock and production time allow.",
    },
    {
      q: "Do you offer invoicing?",
      a: "Yes. Corporate clients receive a single invoice for the full order, including personalization and delivery.",
    },
  ],
  masterclass: [
    {
      q: "How long is a masterclass?",
      a: "Most masterclasses run 90 minutes to 2 hours and include a guided tasting of 4–5 expressions.",
    },
    {
      q: "Can you host at our office or home?",
      a: "Yes. Private and corporate masterclasses can be hosted at your venue anywhere in the GTA, at a partner venue, or virtually with tasting kits shipped to each guest.",
    },
    {
      q: "Is food included?",
      a: "Public sessions include light bites. For private events we can recommend caterers and pairings.",
    },
    {
      q: "How many guests can attend?",
      a: "Private sessions start at 6 guests. Corporate sessions can accommodate up to 60 guests in person, and more virtually.",
    },
  ],
  trade: [
    {
      q: "Who can open a trade account?",
      a: "Licensed restaurants, bars, hotels and caterers in Ontario. We'll ask for your liquor licence number when you apply.",
    },
    {
      q: "Is there a minimum order?",
      a: "Trade orders start at one case (6 bottles), which can be mixed across products.",
    },
    {
      q: "Do you offer staff training?",
      a: "Yes. Every trade partner can book staff training sessions with Adriana, plus menu and cocktail development support.",
    },
  ],
};

export const allFaqs = [
  { title: "Shopping & products", items: faqs.shopping },
  { title: "Shipping & returns", items: faqs.shipping },
  { title: "Corporate gifting", items: faqs.corporate },
  { title: "Masterclasses & events", items: faqs.masterclass },
  { title: "Restaurants & bars", items: faqs.trade },
];
