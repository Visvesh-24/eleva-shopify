"use client";

import { siteConfig, formatDeadline } from "@/lib/config";
import { Checkbox, DemoNote, EMAIL_RE, FileField, FormSuccess, PHONE_RE, SelectField, TextArea, TextField, useForm } from "./Form";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

const budgets = [
  { value: "under-100", label: "Under $100 per gift" },
  { value: "100-200", label: "$100 – $200 per gift" },
  { value: "200-300", label: "$200 – $300 per gift" },
  { value: "300-plus", label: "$300+ per gift" },
  { value: "unsure", label: "Not sure yet, please advise" },
];

const today = () => new Date().toISOString().slice(0, 10);

/** Corporate quote / reservation form. Front-end validation only. */
export function CorporateQuoteForm() {
  const { minimumOrder, orderDeadline } = siteConfig.corporate;
  const f = useForm(
    "corporate_quote",
    {
      name: "",
      company: "",
      email: "",
      phone: "",
      quantity: "",
      budget: "",
      date: "",
      message: "",
      logo: null as File | null,
      logoError: "",
      consent: false,
    },
    (v) => ({
      name: v.name.trim() ? undefined : "Please enter your name.",
      company: v.company.trim() ? undefined : "Please enter your company.",
      email: EMAIL_RE.test(v.email) ? undefined : "Please enter a valid work email.",
      phone: !v.phone || PHONE_RE.test(v.phone) ? undefined : "Please enter a valid phone number.",
      quantity:
        Number(v.quantity) >= minimumOrder ? undefined : `Corporate orders start at ${minimumOrder} gifts.`,
      budget: v.budget ? undefined : "Please choose a budget.",
      date: !v.date || v.date >= today() ? undefined : "Please choose a future date.",
      logo: v.logoError || undefined,
      consent: v.consent ? undefined : "Please confirm recipients are of legal drinking age.",
    }),
  );

  if (f.submitted) {
    return (
      <FormSuccess title="Request received" onReset={f.reset}>
        Thank you, {f.values.name.split(" ")[0]}. Our gifting team will be in touch with a proposal for {f.values.quantity}{" "}
        gifts. Need it sooner? Call {siteConfig.contact.phoneDisplay}.
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={f.onSubmit({ quantity: f.values.quantity, budget: f.values.budget })} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField form="corporate_quote" name="name" label="Your name" autoComplete="name" required value={f.values.name} onChange={(v) => f.set("name", v)} error={f.errors.name} />
        <TextField form="corporate_quote" name="company" label="Company" autoComplete="organization" required value={f.values.company} onChange={(v) => f.set("company", v)} error={f.errors.company} />
        <TextField form="corporate_quote" name="email" label="Work email" type="email" autoComplete="email" required value={f.values.email} onChange={(v) => f.set("email", v)} error={f.errors.email} />
        <TextField form="corporate_quote" name="phone" label="Phone" type="tel" autoComplete="tel" value={f.values.phone} onChange={(v) => f.set("phone", v)} error={f.errors.phone} />
        <TextField
          form="corporate_quote"
          name="quantity"
          label="Number of gifts"
          type="number"
          inputMode="numeric"
          min={minimumOrder}
          required
          hint={`Minimum ${minimumOrder}.`}
          value={f.values.quantity}
          onChange={(v) => f.set("quantity", v)}
          error={f.errors.quantity}
        />
        <SelectField form="corporate_quote" name="budget" label="Budget" required options={budgets} value={f.values.budget} onChange={(v) => f.set("budget", v)} error={f.errors.budget} />
        <TextField
          form="corporate_quote"
          name="date"
          label="Delivery date"
          type="date"
          min={today()}
          hint={`Holiday orders close ${formatDeadline(orderDeadline)}.`}
          value={f.values.date}
          onChange={(v) => f.set("date", v)}
          error={f.errors.date}
        />
        <FileField
          form="corporate_quote"
          name="logo"
          label="Company logo"
          accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps"
          hint="PNG, SVG, PDF or AI, up to 10 MB."
          file={f.values.logo}
          onChange={(file, err) => {
            f.set("logo", file);
            f.set("logoError", err ?? "");
          }}
          error={f.errors.logo}
        />
      </div>
      <TextArea
        form="corporate_quote"
        name="message"
        label="Message for your recipients, or anything we should know"
        value={f.values.message}
        onChange={(v) => f.set("message", v)}
        placeholder="e.g. 'Thank you for a wonderful year. From all of us at…'"
      />
      <Checkbox checked={f.values.consent} onChange={(v) => f.set("consent", v)} error={f.errors.consent}>
        I confirm all recipients are of legal drinking age in their province. *
      </Checkbox>
      <button type="submit" className="btn-primary w-full sm:w-auto sm:px-12">
        Reserve my gifts
      </button>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
        <span>Prefer to talk?</span>
        <a href={siteConfig.contact.phoneHref} className="inline-flex items-center gap-2 font-medium text-ink hover:text-copper">
          <PhoneIcon size={16} className="text-copper" /> {siteConfig.contact.phoneDisplay}
        </a>
        <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-ink hover:text-copper">
          <WhatsAppIcon size={16} className="text-agave" /> WhatsApp
        </a>
      </div>
      <DemoNote />
    </form>
  );
}
