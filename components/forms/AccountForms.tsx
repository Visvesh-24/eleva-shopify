"use client";

import { DemoNote, EMAIL_RE, FormSuccess, TextField, useForm, Checkbox } from "./Form";

/** Sign-in / register stubs. Replace with Shopify Customer Account API. */
export function AccountForms() {
  const signIn = useForm("sign_in", { email: "", password: "" }, (v) => ({
    email: EMAIL_RE.test(v.email) ? undefined : "Enter a valid email.",
    password: v.password.length >= 6 ? undefined : "Enter your password.",
  }));
  const reg = useForm("register", { first: "", last: "", email: "", password: "", age: false, news: true }, (v) => ({
    first: v.first.trim() ? undefined : "Enter your first name.",
    last: v.last.trim() ? undefined : "Enter your last name.",
    email: EMAIL_RE.test(v.email) ? undefined : "Enter a valid email.",
    password: v.password.length >= 8 ? undefined : "Use at least 8 characters.",
    age: v.age ? undefined : "You must be of legal drinking age to create an account.",
  }));

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="rounded-sm bg-ivory p-8 ring-1 ring-line md:p-10">
        <h2 className="font-serif text-3xl">Sign in</h2>
        {signIn.submitted ? (
          <div className="mt-6">
            <FormSuccess title="Demo sign-in">Customer accounts will connect to Shopify at launch.</FormSuccess>
          </div>
        ) : (
          <form noValidate onSubmit={signIn.onSubmit()} className="mt-6 space-y-5">
            <TextField form="sign_in" name="email" label="Email" type="email" autoComplete="email" required value={signIn.values.email} onChange={(v) => signIn.set("email", v)} error={signIn.errors.email} />
            <TextField form="sign_in" name="password" label="Password" type="password" autoComplete="current-password" required value={signIn.values.password} onChange={(v) => signIn.set("password", v)} error={signIn.errors.password} />
            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
            <DemoNote />
          </form>
        )}
      </div>
      <div className="rounded-sm bg-white p-8 ring-1 ring-line md:p-10">
        <h2 className="font-serif text-3xl">Create an account</h2>
        <p className="mt-2 text-sm text-ink-soft">New members get 10% off their first order.</p>
        {reg.submitted ? (
          <div className="mt-6">
            <FormSuccess title="Welcome to Eleva">Your account will be created when the store connects to Shopify.</FormSuccess>
          </div>
        ) : (
          <form noValidate onSubmit={reg.onSubmit()} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField form="register" name="first" label="First name" autoComplete="given-name" required value={reg.values.first} onChange={(v) => reg.set("first", v)} error={reg.errors.first} />
              <TextField form="register" name="last" label="Last name" autoComplete="family-name" required value={reg.values.last} onChange={(v) => reg.set("last", v)} error={reg.errors.last} />
            </div>
            <TextField form="register" name="email" label="Email" type="email" autoComplete="email" required value={reg.values.email} onChange={(v) => reg.set("email", v)} error={reg.errors.email} />
            <TextField form="register" name="password" label="Password" type="password" autoComplete="new-password" required hint="At least 8 characters." value={reg.values.password} onChange={(v) => reg.set("password", v)} error={reg.errors.password} />
            <Checkbox checked={reg.values.age} onChange={(v) => reg.set("age", v)} error={reg.errors.age}>
              I confirm I am of legal drinking age in my province. *
            </Checkbox>
            <Checkbox checked={reg.values.news} onChange={(v) => reg.set("news", v)}>
              Email me new arrivals, events and offers. Unsubscribe anytime.
            </Checkbox>
            <button type="submit" className="btn-primary w-full">
              Create account
            </button>
            <DemoNote />
          </form>
        )}
      </div>
    </div>
  );
}
