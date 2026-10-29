import { AgaveIcon, AwardIcon, GiftIcon, GlassIcon } from "@/components/ui/Icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";

const reasons = [
  {
    icon: GlassIcon,
    title: "An exclusive range",
    body: "We import directly from small Mexican houses. Many of our bottles aren't available at the LCBO or anywhere else in Canada.",
  },
  {
    icon: AgaveIcon,
    title: "The additive-free promise",
    body: "Every tequila we carry is 100% blue agave and made without added flavourings, colourings or sweeteners. Just agave, water, time and craft.",
  },
  {
    icon: GiftIcon,
    title: "Gift-ready, always",
    body: "Decanters and ceramics that make an entrance, with gift wrap, personal messages and corporate personalization available.",
  },
  {
    icon: AwardIcon,
    title: "Expert guidance",
    body: "Every bottle is selected by Adriana Martinez, Canada's only Certified Tequila Master. Not sure what to choose? Ask her team.",
  },
];

export function WhyEleva() {
  return (
    <Section tone="ivory" aria-labelledby="why-title">
      <SectionHeading id="why-title" eyebrow="Why Eleva" title="A master's recommendation, not a liquor store" />
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, body }, i) => (
          <FadeIn as="li" key={title} delay={i * 0.06} className="border-t border-copper-light/70 pt-7">
            <Icon size={28} className="text-agave" />
            <h3 className="mt-5 font-serif text-2xl">{title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
          </FadeIn>
        ))}
      </ul>
    </Section>
  );
}
