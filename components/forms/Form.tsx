"use client";

/**
 * Form primitives with front-end validation only. Every form calls
 * analytics.formSubmit on success. Backend wiring (Shopify customer API,
 * email service or CRM) is a TODO listed in TODO.md.
 */
import { useId, useState, type ReactNode, type FormEvent } from "react";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/format";
import { CheckIcon, ChevronDown } from "@/components/ui/Icons";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^[+()\d\s.-]{10,}$/;

export type Errors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, unknown>>(
  name: string,
  initial: T,
  validate: (v: T) => Errors<T>,
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (extra?: Record<string, unknown>) => (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    const clean = Object.fromEntries(Object.entries(errs).filter(([, v]) => v)) as Errors<T>;
    setErrors(clean);
    if (Object.keys(clean).length) {
      // Move focus to the first invalid field for keyboard and screen-reader users.
      const first = Object.keys(clean)[0];
      (document.querySelector(`[data-field="${name}-${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    analytics.formSubmit(name, extra);
    setSubmitted(true);
  };

  return { values, errors, set, onSubmit, submitted, reset: () => { setValues(initial); setSubmitted(false); } };
}

type BaseProps = {
  form: string;
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

function FieldShell({ id, label, error, hint, required, className, children }: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.8125rem] font-medium text-ink">
        {label}
        {required ? <span className="text-copper"> *</span> : <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-[#A23B2A]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
  min,
  inputMode,
  ...base
}: BaseProps & {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  min?: string | number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const id = `${base.form}-${base.name}-${useId()}`;
  return (
    <FieldShell {...base} id={id}>
      <input
        id={id}
        data-field={`${base.form}-${base.name}`}
        name={base.name}
        type={type}
        value={value}
        min={min}
        inputMode={inputMode}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(base.error)}
        aria-describedby={base.error ? `${id}-error` : base.hint ? `${id}-hint` : undefined}
        required={base.required}
        className={cn("field", base.error && "border-[#A23B2A]")}
      />
    </FieldShell>
  );
}

export function TextArea({ value, onChange, rows = 4, placeholder, ...base }: BaseProps & { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  const id = `${base.form}-${base.name}-${useId()}`;
  return (
    <FieldShell {...base} id={id}>
      <textarea
        id={id}
        data-field={`${base.form}-${base.name}`}
        name={base.name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(base.error)}
        aria-describedby={base.error ? `${id}-error` : base.hint ? `${id}-hint` : undefined}
        className={cn("field resize-y", base.error && "border-[#A23B2A]")}
      />
    </FieldShell>
  );
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder = "Select…",
  ...base
}: BaseProps & { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string }) {
  const id = `${base.form}-${base.name}-${useId()}`;
  return (
    <FieldShell {...base} id={id}>
      <div className="relative">
        <select
          id={id}
          data-field={`${base.form}-${base.name}`}
          name={base.name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(base.error)}
          aria-describedby={base.error ? `${id}-error` : base.hint ? `${id}-hint` : undefined}
          className={cn("field appearance-none pr-10", base.error && "border-[#A23B2A]")}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft" />
      </div>
    </FieldShell>
  );
}

export function FileField({
  file,
  onChange,
  accept,
  maxMb = 10,
  ...base
}: BaseProps & { file: File | null; onChange: (f: File | null, error?: string) => void; accept: string; maxMb?: number }) {
  const id = `${base.form}-${base.name}-${useId()}`;
  return (
    <FieldShell {...base} id={id}>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center justify-between gap-3 rounded-sm border border-dashed border-stone-300 bg-white px-4 py-3 text-sm hover:border-copper has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-copper",
          base.error && "border-[#A23B2A]",
        )}
      >
        <span className={cn("truncate", file ? "text-ink" : "text-ink-muted")}>{file ? file.name : "Choose a file…"}</span>
        <span className="shrink-0 text-xs font-semibold uppercase tracking-label text-copper">Browse</span>
        <input
          id={id}
          data-field={`${base.form}-${base.name}`}
          type="file"
          accept={accept}
          className="sr-only"
          aria-describedby={base.error ? `${id}-error` : base.hint ? `${id}-hint` : undefined}
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            if (f && f.size > maxMb * 1024 * 1024) onChange(null, `File is larger than ${maxMb} MB.`);
            else onChange(f);
          }}
        />
      </label>
    </FieldShell>
  );
}

export function Checkbox({ checked, onChange, children, error }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode; error?: string }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--c-copper))]" />
        <span>{children}</span>
      </label>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-[#A23B2A]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormSuccess({ title, children, onReset }: { title: string; children: ReactNode; onReset?: () => void }) {
  return (
    <div role="status" className="rounded-sm bg-white p-8 text-center ring-1 ring-line md:p-12">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-copper-wash text-agave">
        <CheckIcon size={26} />
      </span>
      <p className="mt-5 font-serif text-3xl">{title}</p>
      <div className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">{children}</div>
      {onReset ? (
        <button type="button" onClick={onReset} className="link-underline mt-6">
          Send another
        </button>
      ) : null}
    </div>
  );
}

/** Small note under every demo form. */
export function DemoNote() {
  return <p className="text-xs text-ink-muted">Demo form: nothing is sent yet. Required fields are marked *.</p>;
}
