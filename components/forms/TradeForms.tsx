"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { TRADE_DISCOUNT } from "@/lib/experiences";
import { formatPrice, cn } from "@/lib/format";
import { analytics } from "@/lib/analytics";
import { ProductImage } from "@/components/shop/ProductImage";
import { Checkbox, DemoNote, EMAIL_RE, FormSuccess, PHONE_RE, SelectField, TextField, useForm } from "./Form";

const tradePrice = (p: Product) => Math.round((p.variants[0].price * (1 - TRADE_DISCOUNT)) / 100) * 100;

/** Trade account application. */
export function TradeApplicationForm() {
  const f = useForm(
    "trade_application",
    { business: "", type: "", licence: "", contact: "", email: "", phone: "", city: "", volume: "", age: false },
    (v) => ({
      business: v.business.trim() ? undefined : "Please enter your business name.",
      type: v.type ? undefined : "Please choose a business type.",
      licence: v.licence.trim() ? undefined : "Please enter your liquor licence number.",
      contact: v.contact.trim() ? undefined : "Please enter a contact name.",
      email: EMAIL_RE.test(v.email) ? undefined : "Please enter a valid email.",
      phone: PHONE_RE.test(v.phone) ? undefined : "Please enter a valid phone number.",
      city: v.city.trim() ? undefined : "Please enter your city.",
      age: v.age ? undefined : "Please confirm you are authorized to apply.",
    }),
  );
  if (f.submitted)
    return (
      <FormSuccess title="Application received" onReset={f.reset}>
        Thank you. Our trade team will review {f.values.business}&rsquo;s application and contact {f.values.contact} to set up the account.
      </FormSuccess>
    );
  return (
    <form noValidate onSubmit={f.onSubmit({ type: f.values.type })} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField form="trade_application" name="business" label="Business name" autoComplete="organization" required value={f.values.business} onChange={(v) => f.set("business", v)} error={f.errors.business} />
        <SelectField
          form="trade_application"
          name="type"
          label="Business type"
          required
          options={["Restaurant", "Bar or lounge", "Hotel", "Caterer or events", "Retail (where permitted)"].map((t) => ({ value: t, label: t }))}
          value={f.values.type}
          onChange={(v) => f.set("type", v)}
          error={f.errors.type}
        />
        <TextField form="trade_application" name="licence" label="Liquor licence number" required value={f.values.licence} onChange={(v) => f.set("licence", v)} error={f.errors.licence} />
        <TextField form="trade_application" name="city" label="City" autoComplete="address-level2" required value={f.values.city} onChange={(v) => f.set("city", v)} error={f.errors.city} />
        <TextField form="trade_application" name="contact" label="Contact name" autoComplete="name" required value={f.values.contact} onChange={(v) => f.set("contact", v)} error={f.errors.contact} />
        <TextField form="trade_application" name="phone" label="Phone" type="tel" autoComplete="tel" required value={f.values.phone} onChange={(v) => f.set("phone", v)} error={f.errors.phone} />
        <TextField form="trade_application" name="email" label="Email" type="email" autoComplete="email" required value={f.values.email} onChange={(v) => f.set("email", v)} error={f.errors.email} />
        <SelectField
          form="trade_application"
          name="volume"
          label="Expected monthly volume"
          options={["1–2 cases", "3–5 cases", "6–10 cases", "10+ cases"].map((t) => ({ value: t, label: t }))}
          value={f.values.volume}
          onChange={(v) => f.set("volume", v)}
        />
      </div>
      <Checkbox checked={f.values.age} onChange={(v) => f.set("age", v)} error={f.errors.age}>
        I am authorized to open an account on behalf of this licensed business. *
      </Checkbox>
      <button type="submit" className="btn-primary w-full sm:w-auto sm:px-12">
        Apply for a trade account
      </button>
      <DemoNote />
    </form>
  );
}

/** Mock trade price list with quantity inputs and an order request summary. */
export function TradeOrderForm({ products }: { products: Product[] }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [sent, setSent] = useState(false);
  const lines = useMemo(() => products.filter((p) => (qty[p.slug] ?? 0) > 0), [products, qty]);
  const bottles = lines.reduce((n, p) => n + qty[p.slug], 0);
  const total = lines.reduce((n, p) => n + tradePrice(p) * qty[p.slug], 0);

  if (sent)
    return (
      <FormSuccess title="Order request sent" onReset={() => { setSent(false); setQty({}); }}>
        {bottles} bottles across {lines.length} products. We&rsquo;ll confirm stock, delivery and invoice details by email.
      </FormSuccess>
    );

  return (
    <div>
      <div className="relative overflow-x-auto rounded-sm ring-1 ring-line">
        <table className="w-full min-w-[640px] bg-white text-sm">
          <caption className="sr-only">Trade price list</caption>
          <thead className="bg-stone-50 text-left text-[0.6875rem] uppercase tracking-label text-ink-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Product</th>
              <th scope="col" className="px-4 py-3 font-semibold">Size</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Retail</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Trade</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">Bottles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.slug} className={cn((qty[p.slug] ?? 0) > 0 && "bg-copper-wash/50")}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 shrink-0 overflow-hidden rounded-sm border border-line">
                      <ProductImage product={p} sizes="40px" zoom={false} compact />
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-soft">{p.variants[0].title}</td>
                <td className="px-4 py-3 text-right tabular-nums text-ink-muted">{formatPrice(p.variants[0].price)}</td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums">{formatPrice(tradePrice(p))}</td>
                <td className="px-4 py-3 text-right">
                  <label className="sr-only" htmlFor={`qty-${p.slug}`}>
                    Bottles of {p.name}
                  </label>
                  <input
                    id={`qty-${p.slug}`}
                    type="number"
                    min={0}
                    step={1}
                    inputMode="numeric"
                    value={qty[p.slug] ?? ""}
                    placeholder="0"
                    onChange={(e) => setQty((q) => ({ ...q, [p.slug]: Math.max(0, Math.floor(Number(e.target.value) || 0)) }))}
                    className="w-20 rounded-sm border border-stone-300 px-3 py-2 text-right tabular-nums focus:border-copper focus:outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-sm bg-stone-50 p-5 sm:flex-row sm:items-center">
        <p className="text-sm text-ink-soft">
          {bottles} bottles · Estimated <strong className="text-lg font-semibold text-ink tabular-nums">{formatPrice(total)}</strong> before HST
          {bottles > 0 && bottles < 6 ? <span className="block text-xs text-copper">Minimum order is one mixed case (6 bottles).</span> : null}
        </p>
        <button
          type="button"
          disabled={bottles < 6}
          onClick={() => {
            analytics.formSubmit("trade_order", { bottles, value: total / 100 });
            setSent(true);
          }}
          className="btn-primary"
        >
          Send order request
        </button>
      </div>
      <p className="mt-3 text-xs text-ink-muted">Demo pricing: trade prices shown are illustrative only.</p>
    </div>
  );
}

/** Quick reorder from (mock) past orders with editable quantities. */
export function QuickReorder({
  orders,
  products,
}: {
  orders: { id: string; date: string; lines: { slug: string; qty: number }[] }[];
  products: Product[];
}) {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const [qty, setQty] = useState<Record<string, number>>(() => Object.fromEntries(orders[0].lines.map((l) => [l.slug, l.qty])));
  const [sent, setSent] = useState(false);
  const bottles = Object.values(qty).reduce((n, q) => n + q, 0);
  const total = Object.entries(qty).reduce((n, [s, q]) => n + (bySlug.get(s) ? tradePrice(bySlug.get(s)!) * q : 0), 0);
  const loadOrder = (o: (typeof orders)[number]) => setQty(Object.fromEntries(o.lines.map((l) => [l.slug, l.qty])));

  if (sent)
    return (
      <FormSuccess title="Reorder submitted" onReset={() => setSent(false)}>
        {bottles} bottles. You&rsquo;ll receive a confirmation and invoice by email.
      </FormSuccess>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div>
        <h2 className="eyebrow mb-4 text-ink">Past orders</h2>
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-sm bg-white p-4 ring-1 ring-line">
              <p className="flex justify-between text-sm">
                <span className="font-semibold">{o.id}</span>
                <time dateTime={o.date} className="text-ink-muted">
                  {new Date(`${o.date}T12:00:00`).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}
                </time>
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                {o.lines.reduce((n, l) => n + l.qty, 0)} bottles · {o.lines.length} products
              </p>
              <button type="button" onClick={() => loadOrder(o)} className="link-underline mt-3 text-[0.6875rem]">
                Load this order
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="divide-y divide-line rounded-sm bg-white ring-1 ring-line">
          {products
            .filter((p) => p.type !== "Glassware" || (qty[p.slug] ?? 0) > 0)
            .map((p) => (
              <li key={p.slug} className="flex items-center gap-4 p-4">
                <div className="w-12 shrink-0 overflow-hidden rounded-sm border border-line">
                  <ProductImage product={p} sizes="48px" zoom={false} compact />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-ink-muted">
                    {p.variants[0].title} · Trade {formatPrice(tradePrice(p))}
                  </p>
                </div>
                <label className="sr-only" htmlFor={`re-${p.slug}`}>
                  Bottles of {p.name}
                </label>
                <input
                  id={`re-${p.slug}`}
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={qty[p.slug] ?? ""}
                  placeholder="0"
                  onChange={(e) => setQty((q) => ({ ...q, [p.slug]: Math.max(0, Math.floor(Number(e.target.value) || 0)) }))}
                  className="w-20 rounded-sm border border-stone-300 px-3 py-2 text-right text-sm tabular-nums focus:border-copper focus:outline-none"
                />
              </li>
            ))}
        </ul>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-sm bg-stone-50 p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-soft">
            {bottles} bottles · <strong className="text-lg font-semibold text-ink tabular-nums">{formatPrice(total)}</strong> before HST
          </p>
          <button
            type="button"
            disabled={bottles < 6}
            onClick={() => {
              analytics.formSubmit("trade_reorder", { bottles, value: total / 100 });
              setSent(true);
            }}
            className="btn-primary"
          >
            Submit reorder
          </button>
        </div>
      </div>
    </div>
  );
}
