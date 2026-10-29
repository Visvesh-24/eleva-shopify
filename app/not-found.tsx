import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-ivory py-28 md:py-40">
      <div className="wrap max-w-xl text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="h-section mt-4">This bottle seems to have been poured</h1>
        <span aria-hidden className="hairline-copper mx-auto mt-6 block w-12" />
        <p className="mt-6 text-[1.0625rem] text-ink-soft">
          The page you&rsquo;re looking for has moved or no longer exists. Let us point you to something worth sipping.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/collections/all" className="btn-primary">
            Shop the collection
          </Link>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
