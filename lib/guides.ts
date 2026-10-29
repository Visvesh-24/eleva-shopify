/** Educational resources shown on Recipes & Resources. Draft copy for Adriana to approve. */
export type Guide = { slug: string; title: string; summary: string; sections: { heading: string; body: string }[] };

export const guides: Guide[] = [
  {
    slug: "blanco-reposado-anejo",
    title: "Blanco vs reposado vs añejo",
    summary: "What the age statements on a tequila label actually mean, and which one to pour when.",
    sections: [
      {
        heading: "Blanco (plata)",
        body: "Unaged or rested for under two months. The purest expression of cooked agave: bright, peppery, citrus and herbal. Perfect for cocktails and for tasting the character of a distillery.",
      },
      {
        heading: "Reposado",
        body: "Rested in oak for two months to a year. The barrel adds vanilla, honey and soft spice while keeping the agave in the foreground. A great all-rounder for sipping and stirred cocktails.",
      },
      {
        heading: "Añejo and extra añejo",
        body: "Añejo is aged one to three years in oak; extra añejo for more than three. Expect caramel, dried fruit, chocolate and baking spice. Sip slowly, like a fine cognac.",
      },
      {
        heading: "Cristalino",
        body: "An aged tequila that is filtered after barrel ageing to remove colour. It keeps the smoothness of the barrel with the clarity of a blanco, which makes it a favourite for first-time sippers.",
      },
    ],
  },
  {
    slug: "how-to-taste",
    title: "How to taste tequila like a master",
    summary: "Five steps Adriana teaches in every masterclass. No shots, no salt, no lime required.",
    sections: [
      { heading: "1. Choose the right glass", body: "A tulip-shaped tequila glass (like the Riedel) gathers the aromas a shot glass throws away." },
      { heading: "2. Look", body: "Tilt the glass and observe the colour and the 'legs' that run down the side." },
      { heading: "3. Smell gently", body: "Keep your mouth slightly open and nose just above the rim. Look for cooked agave, citrus, pepper, vanilla or oak." },
      { heading: "4. Sip slowly", body: "Take a small sip and let it coat your tongue for a few seconds before swallowing. The second sip always tells you more than the first." },
      { heading: "5. Notice the finish", body: "How long does the flavour linger? Is it peppery, sweet or dry? A long, clean finish is a sign of quality." },
    ],
  },
  {
    slug: "what-additive-free-means",
    title: "What \"additive-free\" really means",
    summary: "Why some tequilas taste of vanilla frosting, and how to find the ones that taste of agave.",
    sections: [
      {
        heading: "The 1% rule",
        body: "Mexican regulations allow up to 1% of a tequila's volume to be additives (glycerin, caramel colour, oak extract and sugar-based syrup) without listing them on the label. That small amount can dramatically change the taste.",
      },
      {
        heading: "Why it matters",
        body: "Additives can mask shortcuts in production and make many tequilas taste alike. Additive-free tequila lets the agave, the terroir and the craft of the producer speak for themselves.",
      },
      {
        heading: "How we choose",
        body: "Adriana selects producers who make tequila from 100% blue agave, water and yeast only, and verifies their process before a bottle joins the Eleva range.",
      },
    ],
  },
];
