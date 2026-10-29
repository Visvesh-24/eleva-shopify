import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { FadeIn } from "@/components/ui/FadeIn";
import { Sparkle } from "@/components/ui/Sparkle";

export function Newsletter() {
  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="relative overflow-hidden border-t border-line bg-copper-wash py-14 md:py-24">
      <Sparkle className="absolute left-[8%] top-10 h-4 w-4 animate-twinkle text-copper-light" />
      <Sparkle className="absolute right-[10%] top-1/3 h-5 w-5 animate-twinkle text-copper [animation-delay:-1.4s]" />
      <Sparkle className="absolute bottom-10 left-[22%] h-3 w-3 animate-twinkle text-copper-light [animation-delay:-2.6s]" />
      <FadeIn className="wrap relative max-w-2xl text-center">
        <p className="eyebrow">The Eleva list</p>
        <h2 id="newsletter-title" className="h-section mt-4">
          10% off your first bottle
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[1rem] leading-relaxed text-ink-soft md:mt-5 md:text-[1.0625rem]">
          Be first to hear about new arrivals, limited releases, masterclass dates and Adriana&rsquo;s tasting notes.
        </p>
        <div className="mx-auto mt-8 max-w-lg text-left">
          <NewsletterForm />
        </div>
      </FadeIn>
    </section>
  );
}
