"use client";

import { DemoNote, EMAIL_RE, FormSuccess, PHONE_RE, SelectField, TextArea, TextField, useForm } from "./Form";

const topics = [
  { value: "order", label: "An order or delivery" },
  { value: "recommendation", label: "A bottle recommendation" },
  { value: "corporate", label: "Corporate gifting" },
  { value: "masterclass", label: "Masterclass or private event" },
  { value: "trade", label: "Restaurant or bar account" },
  { value: "press", label: "Press or partnerships" },
  { value: "other", label: "Something else" },
];

export function ContactForm() {
  const f = useForm("contact", { name: "", email: "", phone: "", topic: "", message: "" }, (v) => ({
    name: v.name.trim() ? undefined : "Please enter your name.",
    email: EMAIL_RE.test(v.email) ? undefined : "Please enter a valid email.",
    phone: !v.phone || PHONE_RE.test(v.phone) ? undefined : "Please enter a valid phone number.",
    topic: v.topic ? undefined : "Please choose a topic.",
    message: v.message.trim().length >= 10 ? undefined : "Please add a short message.",
  }));

  if (f.submitted) {
    return (
      <FormSuccess title="Message sent" onReset={f.reset}>
        Thank you, {f.values.name.split(" ")[0]}. We&rsquo;ll reply to {f.values.email} as soon as we can.
      </FormSuccess>
    );
  }
  return (
    <form noValidate onSubmit={f.onSubmit({ topic: f.values.topic })} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField form="contact" name="name" label="Name" autoComplete="name" required value={f.values.name} onChange={(v) => f.set("name", v)} error={f.errors.name} />
        <TextField form="contact" name="email" label="Email" type="email" autoComplete="email" required value={f.values.email} onChange={(v) => f.set("email", v)} error={f.errors.email} />
        <TextField form="contact" name="phone" label="Phone" type="tel" autoComplete="tel" value={f.values.phone} onChange={(v) => f.set("phone", v)} error={f.errors.phone} />
        <SelectField form="contact" name="topic" label="Topic" required options={topics} value={f.values.topic} onChange={(v) => f.set("topic", v)} error={f.errors.topic} />
      </div>
      <TextArea form="contact" name="message" label="Message" required rows={5} value={f.values.message} onChange={(v) => f.set("message", v)} error={f.errors.message} />
      <button type="submit" className="btn-primary w-full sm:w-auto sm:px-12">
        Send message
      </button>
      <DemoNote />
    </form>
  );
}
