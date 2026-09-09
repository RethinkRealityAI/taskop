"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const SECTORS = ["Pharmaceuticals / Health Institution", "Non-Profit Organization", "Business Corporation", "Other"] as const;

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  sector: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  sector: "",
  message: "",
};

const inputClass =
  "h-12 w-full rounded-xl bg-surface px-4 text-ink ring-1 ring-transparent transition placeholder:text-ink-3 focus:bg-white focus:outline-none focus:ring-accent";

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!v.lastName.trim()) errors.lastName = "Please enter your last name.";
  if (!v.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = "Please enter a valid email address.";
  if (!v.message.trim()) errors.message = "Please tell us a little about your project.";
  return errors;
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between font-sans text-sm font-semibold text-ink">
        <span>{label}</span>
        {optional && <span className="text-xs font-medium text-ink-3">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  function set<K extends keyof Values>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = e.target.value;
      setValues((v) => ({ ...v, [key]: next }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };
  }

  function fieldProps(key: keyof Values) {
    const err = errors[key];
    return {
      id: key,
      name: key,
      value: values[key],
      onChange: set(key),
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `${key}-error` : undefined,
      className: cn(inputClass, err && "ring-red-500 focus:ring-red-500"),
    };
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("company-website") as HTMLInputElement | null)?.value ?? "";
    if (honeypot) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstError = (Object.keys(nextErrors) as Array<keyof Values>)[0];
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("loading");
    try {
      await submitNetlifyForm("contact", {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        organization: values.organization.trim(),
        sector: values.sector,
        message: values.message.trim(),
        "company-website": honeypot,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-start gap-5 py-4 md:py-6" role="status">
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <div>
          <h2 className="text-2xl sm:text-3xl">Thanks, {values.firstName.trim()}.</h2>
          <p className="mt-3 max-w-md text-lg text-ink-2">
            We&apos;ve received your message and will be in touch shortly.
          </p>
        </div>
        <Button href="/" variant="secondary" icon>
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <form name="contact" onSubmit={onSubmit} noValidate className="space-y-6">
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden" aria-hidden>
        <label>
          Don&apos;t fill this out: <input name="company-website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Send us a message</h2>
        <p className="mt-2 text-ink-2">Fields marked optional can be left blank.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="firstName" label="First name" error={errors.firstName}>
          <input type="text" autoComplete="given-name" required {...fieldProps("firstName")} />
        </Field>
        <Field id="lastName" label="Last name" error={errors.lastName}>
          <input type="text" autoComplete="family-name" required {...fieldProps("lastName")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" required {...fieldProps("email")} />
        </Field>
        <Field id="phone" label="Phone" optional>
          <input type="tel" autoComplete="tel" inputMode="tel" {...fieldProps("phone")} />
        </Field>
      </div>

      <Field id="organization" label="Organization" optional>
        <input type="text" autoComplete="organization" {...fieldProps("organization")} />
      </Field>

      <Field id="sector" label="Sector" optional>
        <div className="relative">
          <select {...fieldProps("sector")} className={cn(inputClass, "appearance-none pr-11", !values.sector && "text-ink-3")}>
            <option value="">Select a sector</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-3"
            aria-hidden
          />
        </div>
      </Field>

      <Field id="message" label="How can we help?" error={errors.message}>
        <textarea
          rows={5}
          required
          placeholder="Tell us about your project or program, timelines and what success looks like."
          {...fieldProps("message")}
          className={cn(inputClass, "h-auto min-h-36 resize-y py-3", errors.message && "ring-red-500 focus:ring-red-500")}
        />
      </Field>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            Something went wrong sending your message. Please try again or email us directly at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending
            </span>
          ) : (
            "Send message"
          )}
        </Button>
        <p className="text-sm text-ink-3">We reply within two business days.</p>
      </div>
    </form>
  );
}
