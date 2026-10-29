const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  currencyDisplay: "narrowSymbol",
});

const cadRound = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

/** Format an amount in cents as CAD for en-CA, e.g. 12900 -> "$129.00". */
export function formatPrice(cents: number, opts: { round?: boolean } = {}): string {
  return (opts.round ? cadRound : cad).format(cents / 100);
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
