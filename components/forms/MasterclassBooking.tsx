"use client";

import { useEffect, useState } from "react";
import type { Session } from "@/lib/experiences";
import { formatPrice, cn } from "@/lib/format";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import { CalendarIcon } from "@/components/ui/Icons";
import { Checkbox, DemoNote, EMAIL_RE, FormSuccess, PHONE_RE, SelectField, TextArea, TextField, useForm } from "./Form";

const PRIVATE = "private";
const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" });

/**
 * Booking selector: pick a public session (or request a private date), choose
 * guests, see the estimate, then send a booking request.
 */
export function MasterclassBooking({ sessions }: { sessions: Session[] }) {
  const [sessionId, setSessionId] = useState(sessions[0]?.id ?? PRIVATE);
  const [guests, setGuests] = useState(2);
  const session = sessions.find((s) => s.id === sessionId);
  const maxGuests = session ? session.seatsLeft : 60;

  // "Book" links point at #book-<sessionId>: preselect that session and scroll to the form.
  useEffect(() => {
    const pick = () => {
      const m = window.location.hash.match(/^#book-(.+)$/);
      if (!m || !sessions.some((s) => s.id === m[1])) return;
      setSessionId(m[1]);
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [sessions]);

  const f = useForm(
    "masterclass_request",
    { name: "", email: "", phone: "", privateDate: "", format: "", notes: "", age: false },
    (v) => ({
      name: v.name.trim() ? undefined : "Please enter your name.",
      email: EMAIL_RE.test(v.email) ? undefined : "Please enter a valid email.",
      phone: !v.phone || PHONE_RE.test(v.phone) ? undefined : "Please enter a valid phone number.",
      privateDate: sessionId !== PRIVATE || v.privateDate ? undefined : "Choose a preferred date.",
      format: sessionId !== PRIVATE || v.format ? undefined : "Choose a format.",
      age: v.age ? undefined : "All guests must be of legal drinking age.",
    }),
  );

  if (f.submitted) {
    return (
      <FormSuccess title="Booking request sent" onReset={f.reset}>
        {session ? `${session.title}, ${fmt(session.date)}, for ${guests} ${guests === 1 ? "guest" : "guests"}.` : `Private masterclass for ${guests} guests.`}{" "}
        We&rsquo;ll confirm availability and payment details by email.
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={f.onSubmit({ session: sessionId, guests })} className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <fieldset>
          <legend className="mb-4 font-serif text-2xl">1. Choose a session</legend>
          <div className="space-y-3">
            {[...sessions.map((s) => ({ id: s.id, s })), { id: PRIVATE, s: undefined }].map(({ id, s }) => (
              <label
                key={id}
                className={cn(
                  "flex cursor-pointer items-start gap-4 rounded-sm border bg-white p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-copper",
                  sessionId === id ? "border-copper ring-1 ring-copper" : "border-line hover:border-stone-300",
                )}
              >
                <input
                  type="radio"
                  name="session"
                  value={id}
                  checked={sessionId === id}
                  onChange={() => {
                    setSessionId(id);
                    setGuests((g) => Math.min(g, s ? s.seatsLeft : 60));
                  }}
                  className="mt-1 h-4 w-4 accent-[rgb(var(--c-copper))]"
                />
                <span className="flex-1">
                  {s ? (
                    <>
                      <span className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-medium">{s.title}</span>
                        <span className="text-sm tabular-nums">{formatPrice(s.pricePerGuest)} / guest</span>
                      </span>
                      <span className="mt-1 block text-xs text-ink-muted">
                        {fmt(s.date)} · {s.time} · {s.format}
                      </span>
                      {s.seatsLeft <= 8 ? <span className="mt-1 block text-xs font-medium text-copper">Only {s.seatsLeft} seats left</span> : null}
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Private or corporate masterclass</span>
                      <span className="mt-1 block text-xs text-ink-muted">Your date, your venue or ours, from 6 guests. Quoted on request.</span>
                    </>
                  )}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-sm bg-stone-50 p-5">
          <div>
            <p className="font-serif text-2xl">2. Guests</p>
            <p className="text-xs text-ink-muted">{session ? `Up to ${session.seatsLeft} available` : "6–60 guests in person"}</p>
          </div>
          <QuantityStepper value={guests} onChange={(n) => setGuests(Math.max(1, Math.min(n, maxGuests)))} max={maxGuests} label="Number of guests" />
        </div>
        {session ? (
          <p className="mt-4 text-right text-sm text-ink-soft">
            Estimated total <strong className="ml-2 text-xl font-semibold text-ink tabular-nums">{formatPrice(session.pricePerGuest * guests)}</strong>
            <span className="block text-xs text-ink-muted">Plus HST. Payment is arranged after confirmation.</span>
          </p>
        ) : null}
      </div>

      <div className="space-y-5 rounded-sm bg-white p-6 ring-1 ring-line md:p-8">
        <p className="flex items-center gap-2 font-serif text-2xl">
          <CalendarIcon size={20} className="text-copper" /> 3. Your details
        </p>
        <TextField form="masterclass_request" name="name" label="Name" autoComplete="name" required value={f.values.name} onChange={(v) => f.set("name", v)} error={f.errors.name} />
        <TextField form="masterclass_request" name="email" label="Email" type="email" autoComplete="email" required value={f.values.email} onChange={(v) => f.set("email", v)} error={f.errors.email} />
        <TextField form="masterclass_request" name="phone" label="Phone" type="tel" autoComplete="tel" value={f.values.phone} onChange={(v) => f.set("phone", v)} error={f.errors.phone} />
        {sessionId === PRIVATE ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField form="masterclass_request" name="privateDate" label="Preferred date" type="date" min={new Date().toISOString().slice(0, 10)} required value={f.values.privateDate} onChange={(v) => f.set("privateDate", v)} error={f.errors.privateDate} />
            <SelectField
              form="masterclass_request"
              name="format"
              label="Format"
              required
              options={[
                { value: "in-person-eleva", label: "In person, at our venue" },
                { value: "in-person-client", label: "In person, at your venue" },
                { value: "virtual", label: "Virtual with tasting kits" },
              ]}
              value={f.values.format}
              onChange={(v) => f.set("format", v)}
              error={f.errors.format}
            />
          </div>
        ) : null}
        <TextArea form="masterclass_request" name="notes" label="Occasion or notes" rows={3} value={f.values.notes} onChange={(v) => f.set("notes", v)} />
        <Checkbox checked={f.values.age} onChange={(v) => f.set("age", v)} error={f.errors.age}>
          All guests will be of legal drinking age. *
        </Checkbox>
        <button type="submit" className="btn-primary w-full">
          Request booking
        </button>
        <DemoNote />
      </div>
    </form>
  );
}
