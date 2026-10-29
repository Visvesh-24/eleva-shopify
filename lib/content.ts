/**
 * Editorial content: testimonials, press and social proof.
 * ALL OF THIS IS MOCK / PLACEHOLDER CONTENT (see TODO.md). Replace with real,
 * attributable reviews and genuine press before launch.
 */

export const socialProof = {
  rating: 4.9, // MOCK aggregate rating
  reviewCount: 460, // MOCK
};

export type Testimonial = { quote: string; name: string; context: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "We sent forty personalized bottles to our clients and the response was unbelievable. Adriana's team handled everything, from logos to delivery.",
    name: "Michelle R.",
    context: "Corporate client, Toronto",
  },
  {
    quote:
      "The Cristalino converted my whole family. I didn't know tequila could taste like this, and I'd never seen it at the LCBO.",
    name: "Daniel P.",
    context: "Verified buyer",
  },
  {
    quote:
      "The masterclass was the highlight of our team offsite. Adriana is a brilliant teacher, warm, funny and deeply knowledgeable.",
    name: "Priya S.",
    context: "Masterclass guest",
  },
];

/** Placeholder publication names. Do NOT ship without real press. */
export const press = ["The Agave Review", "Toronto Table", "Spirits Journal", "Maison & Bar", "The Gift Edit"];
