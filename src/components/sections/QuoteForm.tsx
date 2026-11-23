"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { contact } from "@/content/site";
import { departments, quoteToText, validateQuote, type FieldErrors, type QuoteInput } from "@/lib/quote";
import { cn } from "@/lib/cn";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "fallback"; mailto: string; reason: string };

const field =
  "peer w-full rounded-[14px] border-0 bg-paper px-4 py-3.5 text-base text-ink outline-none ring-1 ring-ink/10 transition-[box-shadow,background-color] placeholder:text-stone/60 focus:bg-white focus:ring-2 focus:ring-ink aria-[invalid=true]:ring-signal-strong";

export function QuoteForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Partial<Record<keyof QuoteInput, string>>;
    const { data, errors: errs } = validateQuote(raw);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`Quote request — ${data.department || "General"}`)}&body=${encodeURIComponent(quoteToText(data))}`;
    try {
      const res = await fetch("/api/quote/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus({ kind: "sent" });
        formRef.current?.reset();
        return;
      }
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus({ kind: "idle" });
        return;
      }
      setStatus({
        kind: "fallback",
        mailto,
        reason: json.code === "not_configured" ? "Online submissions are being set up." : "We couldn't send your request online.",
      });
    } catch {
      setStatus({ kind: "fallback", mailto, reason: "We couldn't reach the server." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="py-6">
        <span className="grid size-14 place-items-center rounded-full bg-signal text-white">
          <Check aria-hidden className="size-6" />
        </span>
        <h3 className="font-title mt-8 text-[clamp(2.6rem,5vw,4rem)]">Request received.</h3>
        <p className="mt-4 max-w-md text-lg text-stone">Thank you. Our team will review your shipment details and get back to you by email.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="link-line mt-8 font-medium">
          Send another request
        </button>
      </div>
    );
  }

  const err = (k: keyof QuoteInput) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 text-sm text-signal-deep">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof QuoteInput) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });
  const label = (k: keyof QuoteInput, text: string, req?: boolean) => (
    <label htmlFor={`${uid}-${k}`} className="label-mono mb-2.5 block text-stone">
      {text}
      {req && <span className="text-signal-deep"> *</span>}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-5 gap-y-6 sm:grid-cols-2" aria-describedby={`${uid}-note`}>
      <p id={`${uid}-note`} className="label-mono text-stone sm:col-span-2">
        Fields marked * are required.
      </p>
      <div>
        {label("name", "Your name", true)}
        <input {...a11y("name")} type="text" autoComplete="name" required className={field} />
        {err("name")}
      </div>
      <div>
        {label("email", "Email", true)}
        <input {...a11y("email")} type="email" autoComplete="email" required className={field} />
        {err("email")}
      </div>
      <div>
        {label("company", "Company / affiliation")}
        <input {...a11y("company")} type="text" autoComplete="organization" className={field} />
      </div>
      <div>
        {label("phone", "Phone number")}
        <input {...a11y("phone")} type="tel" autoComplete="tel" inputMode="tel" className={field} />
        {err("phone")}
      </div>
      <div>
        {label("department", "Service")}
        <select {...a11y("department")} defaultValue="" className={cn(field, "cursor-pointer appearance-none")}>
          <option value="">Choose a service</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {err("department")}
      </div>
      <div>
        {label("date", "Preferred date")}
        <input {...a11y("date")} type="date" className={field} />
        {err("date")}
      </div>
      <div className="sm:col-span-2">
        {label("message", "Shipment details", true)}
        <textarea
          {...a11y("message")}
          rows={5}
          required
          placeholder="Origin, destination, cargo type, weight / volume, timing…"
          className={cn(field, "resize-y")}
        />
        {err("message")}
      </div>
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status.kind === "sending"} className="btn btn-dark h-14 disabled:opacity-70">
          <span>{status.kind === "sending" ? "Sending…" : "Send request"}</span>
          <span className="btn-icon" aria-hidden>
            {status.kind === "sending" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <ArrowRight className="size-4" />
                <ArrowRight className="size-4" />
              </>
            )}
          </span>
        </button>
        <p className="max-w-xs text-sm text-stone">We only use your details to respond to this enquiry.</p>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {status.kind === "fallback" && (
          <div className="rounded-[18px] border border-signal/40 bg-signal/5 p-5">
            <p className="font-medium">{status.reason}</p>
            <p className="mt-1 text-stone">Your details are ready to send. Choose a channel below:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={status.mailto} className="btn btn-outline btn-plain h-11">
                <span>Send by email</span>
              </a>
              <a href={contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-plain h-11">
                <span>WhatsApp us</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
