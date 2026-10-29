import { testimonials, press, socialProof } from "@/lib/content";
import { Rating } from "@/components/ui/Rating";
import { FadeIn } from "@/components/ui/FadeIn";

/** Testimonials + press row. MOCK content: see lib/content.ts and TODO.md. */
export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="bg-ivory py-20 md:py-28">
      <div className="wrap">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Kind words</p>
          <h2 id="reviews-title" className="h-section mt-4">
            Loved by guests, gifted by companies
          </h2>
          <div className="mt-5 flex justify-center">
            <Rating value={socialProof.rating} size={16} />
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            {socialProof.rating} average from {socialProof.reviewCount}+ reviews
          </p>
        </FadeIn>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn as="li" key={t.name} delay={i * 0.06} className="flex flex-col rounded-sm bg-white p-8 ring-1 ring-line">
              <span aria-hidden className="font-serif text-6xl leading-none text-copper-light">&ldquo;</span>
              <blockquote className="-mt-4 flex-1 font-serif text-[1.35rem] leading-snug text-ink">{t.quote}</blockquote>
              <footer className="mt-6 border-t border-line pt-5 text-sm">
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-ink-muted">{t.context}</p>
              </footer>
            </FadeIn>
          ))}
        </ul>

        <div className="mt-16 border-t border-line pt-10">
          <p className="eyebrow text-center text-ink-muted">As featured in</p>
          {/* TODO(client): replace placeholder publication names with real press logos. */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
            {press.map((p) => (
              <li key={p} className="font-serif text-xl italic text-ink-muted/80 md:text-2xl">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
