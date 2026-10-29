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
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, body }, i) => (
          <FadeIn
            as="li"
            key={title}
            delay={i * 0.06}
            className="group flex gap-4 rounded-md bg-white p-5 shadow-[0_1px_2px_rgb(28_27_25/0.04)] ring-1 ring-line transition-shadow duration-500 hover:shadow-card sm:flex-col sm:p-7"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-copper-wash text-agave ring-1 ring-copper-light/40 transition-transform duration-500 group-hover:-translate-y-1">
              <Icon size={22} />
            </span>
            <div>
              <h3 className="font-serif text-[1.35rem] leading-tight sm:mt-1 sm:text-2xl">{title}</h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft sm:mt-3 sm:text-[0.9375rem]">{body}</p>
            </div>
          </FadeIn>
        ))}
      </ul>
    </Section>
  );
}
