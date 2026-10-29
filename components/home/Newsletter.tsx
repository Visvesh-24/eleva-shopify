import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { FadeIn } from "@/components/ui/FadeIn";

export function Newsletter() {
  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="border-t border-line bg-copper-wash py-20 md:py-24">
      <FadeIn className="wrap max-w-2xl text-center">
        <p className="eyebrow">The Eleva list</p>
        <h2 id="newsletter-title" className="h-section mt-4">
          10% off your first bottle
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-ink-soft">
          Be first to hear about new arrivals, limited releases, masterclass dates and Adriana&rsquo;s tasting notes.
        </p>
        <div className="mx-auto mt-8 max-w-lg text-left">
          <NewsletterForm />
        </div>
      </FadeIn>
    </section>
  );
}
