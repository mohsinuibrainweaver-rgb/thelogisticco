// Shared quote-form schema (client + server). No external validation library needed.

export const departments = ["Air Freight", "Sea Freight", "Road Transport", "Project / Heavy Lift Cargo", "Custom Clearance", "General enquiry"] as const;

export type QuoteInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  department: string;
  date: string;
  message: string;
  website: string; // honeypot — must stay empty
};

export type FieldErrors = Partial<Record<keyof QuoteInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

export function validateQuote(raw: Partial<Record<keyof QuoteInput, unknown>>): { data: QuoteInput; errors: FieldErrors } {
  const s = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const data: QuoteInput = {
    name: s(raw.name, 120),
    email: s(raw.email, 200),
    company: s(raw.company, 160),
    phone: s(raw.phone, 40),
    department: s(raw.department, 60),
    date: s(raw.date, 20),
    message: s(raw.message, 4000),
    website: s(raw.website, 200),
  };
  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.phone && !PHONE.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (data.department && !(departments as readonly string[]).includes(data.department)) errors.department = "Please choose a service.";
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) errors.date = "Please choose a valid date.";
  if (data.message.length < 10) errors.message = "Please tell us a little about your shipment (at least 10 characters).";
  return { data, errors };
}

export function quoteToText(d: QuoteInput) {
  return [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Company: ${d.company || "—"}`,
    `Phone: ${d.phone || "—"}`,
    `Service: ${d.department || "—"}`,
    `Preferred date: ${d.date || "—"}`,
    "",
    d.message,
  ].join("\n");
}
