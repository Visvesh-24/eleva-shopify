"use client";

import { useState } from "react";
import type { EventItem } from "@/lib/experiences";
import { formatPrice } from "@/lib/format";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import { DemoNote, EMAIL_RE, FormSuccess, TextField, useForm, Checkbox } from "./Form";

/** Inline RSVP / ticket request for an event card. */
export function EventRSVP({ event }: { event: EventItem }) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(2);
  const f = useForm(`event_${event.id}`, { name: "", email: "", age: false }, (v) => ({
    name: v.name.trim() ? undefined : "Please enter your name.",
    email: EMAIL_RE.test(v.email) ? undefined : "Please enter a valid email.",
    age: v.age ? undefined : "Guests must be of legal drinking age.",
  }));
  const cta = event.rsvp === "rsvp" ? "RSVP" : "Get tickets";

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn-primary btn-sm" aria-expanded={false}>
        {cta}
      </button>
    );
  }
  if (f.submitted) {
    return (
      <FormSuccess title={event.rsvp === "rsvp" ? "You're on the list" : "Tickets requested"}>
        {qty} {qty === 1 ? "place" : "places"} for {event.title}. Confirmation{event.price ? " and payment link" : ""} will follow by email.
      </FormSuccess>
    );
  }
  return (
    <form noValidate onSubmit={f.onSubmit({ event: event.id, qty })} className="mt-2 w-full space-y-4 rounded-sm bg-stone-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium">{event.rsvp === "rsvp" ? "Guests" : "Tickets"}</span>
        <QuantityStepper size="sm" value={qty} onChange={(n) => setQty(Math.max(1, Math.min(n, 8)))} max={8} />
        {event.price ? <span className="text-sm tabular-nums">{formatPrice(event.price * qty)}</span> : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField form={`event_${event.id}`} name="name" label="Name" autoComplete="name" required value={f.values.name} onChange={(v) => f.set("name", v)} error={f.errors.name} />
        <TextField form={`event_${event.id}`} name="email" label="Email" type="email" autoComplete="email" required value={f.values.email} onChange={(v) => f.set("email", v)} error={f.errors.email} />
      </div>
      <Checkbox checked={f.values.age} onChange={(v) => f.set("age", v)} error={f.errors.age}>
        All guests are of legal drinking age. *
      </Checkbox>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary btn-sm">
          Confirm {cta === "RSVP" ? "RSVP" : "request"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-sm text-ink-soft underline underline-offset-4">
          Cancel
        </button>
      </div>
      <DemoNote />
    </form>
  );
}
