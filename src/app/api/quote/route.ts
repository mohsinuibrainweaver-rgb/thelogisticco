import { NextResponse } from "next/server";
import { quoteToText, validateQuote } from "@/lib/quote";

/**
 * Quote / contact form endpoint.
 * Delivery uses the Resend HTTP API when configured:
 *   RESEND_API_KEY   — API key (server-side only, never exposed to the client)
 *   QUOTE_TO_EMAIL   — inbox that receives enquiries (e.g. the sales mailbox)
 *   QUOTE_FROM_EMAIL — verified sender, e.g. "TLC Website <web@thelogisticco.com>"
 * Without these, the endpoint returns 503 and the form offers email/WhatsApp fallbacks.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { data, errors } = validateQuote((body ?? {}) as Record<string, unknown>);

  // Honeypot: silently accept bot submissions without sending anything.
  if (data.website) return NextResponse.json({ ok: true });

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { ok: false, code: "not_configured", error: "Online submissions are not connected yet." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((x) => x.trim()),
      reply_to: data.email,
      subject: `Quote request — ${data.department || "General"} — ${data.name}`,
      text: quoteToText(data),
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "We couldn't send your message right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
