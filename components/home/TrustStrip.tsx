import { AgaveIcon, AwardIcon, MapPinIcon, ShieldIcon, GlassIcon } from "@/components/ui/Icons";

const items = [
  { icon: AwardIcon, label: "Certified Tequila Master" },
  { icon: ShieldIcon, label: "Additive-free" },
  { icon: AgaveIcon, label: "100% blue agave" },
  { icon: GlassIcon, label: "Exclusive, not at the LCBO" },
  { icon: MapPinIcon, label: "Curated in Toronto" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why customers trust Eleva" className="border-y border-line bg-white">
      <ul className="wrap grid grid-cols-2 gap-x-4 gap-y-5 py-7 sm:grid-cols-3 lg:grid-cols-5 lg:py-8">
        {items.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            className={`flex items-center justify-center gap-2.5 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink lg:whitespace-nowrap lg:tracking-[0.1em] xl:tracking-[0.14em] ${
              i === items.length - 1 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <Icon size={20} className="shrink-0 text-agave" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
