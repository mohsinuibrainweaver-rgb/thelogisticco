// Verified business content. Source: docs/original-website-audit.md.
// Do not add claims here that are not supported by the audit.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thelogisticco.com").replace(/\/$/, "");

export const company = {
  name: "The Logistic Company",
  shortName: "The Logistic Co",
  monogram: "TLC",
  tagline: "To deliver excellence in global freight forwarding",
  summary:
    "Freight forwarding, customs clearance and logistics partner — a local team of supply chain experts serving Pakistan and the United Arab Emirates.",
  intro:
    "We are honoured to be counted among the leaders in worldwide freight and logistics, backed by strong customs clearance services and a local team of supply chain experts across Pakistan and the United Arab Emirates. At The Logistic Company, we play a vital role in shaping the national freight forwarding and logistics industry, built on a legacy of customs clearance that has stood the test of time.",
  mission:
    "To deliver excellence in global freight forwarding through a team of passionate experts and customer-centric professionals.",
  vision:
    "To become a partner of choice in the freight forwarding industry by providing sustainable solutions and a customer-driven experience.",
  values: [
    { name: "Innovation", note: "Innovative and sustainable solutions that move with your business." },
    { name: "Integrity", note: "Standards of excellence, upheld consistently and transparently." },
    { name: "Ownership", note: "A team that genuinely cares — and owns its commitments." },
  ],
} as const;

export const stats = [
  { value: 20, suffix: "+", label: "Business operating years" },
  { value: 30, suffix: "+", label: "Operational countries" },
  { value: 80, suffix: "+", label: "Global business associates" },
  { value: 100, suffix: "+", label: "Long-term clients" },
] as const;

export const strengths = [
  {
    title: "Shipping Worldwide",
    body: "From local deliveries to global shipments, our network and expertise let us navigate international borders seamlessly — worldwide shipping solutions for your business needs.",
  },
  {
    title: "Safety & Reliability",
    body: "A steadfast commitment to safety protocols and reliable logistics practices means secure handling and delivery of your shipments, with peace of mind at every step.",
  },
  {
    title: "Fast Transportation",
    body: "Swift, efficient transportation keeps your goods moving to schedule — so your operations stay on time and your customers stay satisfied.",
  },
  {
    title: "Customs at the Core",
    body: "A resilient legacy in customs clearance: import and export declarations, bonded handling and same-day clearance, handled by people who know the process.",
  },
] as const;

/**
 * Global association memberships — same logos and order as the original website
 * (Partners-01…07 there; made transparent by scripts/process-partner-logos.mjs).
 */
export const memberships = [
  { name: "WCA World", logo: "/images/partners/wca-world.webp", w: 513, h: 260 },
  { name: "PPL", logo: "/images/partners/ppl.webp", w: 521, h: 260 },
  { name: "FNC — Freight Network Corporation", logo: "/images/partners/fnc.webp", w: 560, h: 208 },
  { name: "ACAAP", logo: "/images/partners/acaap.webp", w: 560, h: 225 },
  { name: "PIFFA", logo: "/images/partners/piffa.webp", w: 348, h: 260 },
  { name: "FIATA", logo: "/images/partners/fiata.webp", w: 262, h: 260 },
  { name: "JCtrans", logo: "/images/partners/jctrans.webp", w: 560, h: 133 },
] as const;

export const offices = [
  {
    city: "Lahore",
    country: "Pakistan",
    code: "PK",
    lines: ["350-A, Shadman Colony 1", "Jail Road, Lahore", "Pakistan"],
    phone: { display: "+92 300 849 3977", href: "tel:+923008493977" },
    mapQuery: "350-A Shadman Colony 1, Jail Road, Lahore, Pakistan",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    code: "AE",
    lines: ["Office #207-13, 2nd Floor, The Atrium Center", "Khalid Bin Waleed Road, Bur Dubai", "United Arab Emirates"],
    phone: { display: "+971 4 266 6476", href: "tel:+97142666476" },
    mapQuery: "The Atrium Center, Khalid Bin Waleed Road, Bur Dubai, UAE",
  },
] as const;

export const contact = {
  email: "sajid@thelogisticco.com",
  whatsapp: { display: "+92 300 849 3977", href: "https://wa.me/923008493977" },
} as const;

export const nav = {
  primary: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    { label: "Services", href: "/our-services/" },
    { label: "Industries", href: "/specialized-industries/" },
    { label: "FAQ", href: "/our-faqs/" },
    { label: "Contact", href: "/contact/" },
  ],
} as const;

export const modes = ["Air Freight", "Sea Freight", "Road Transport", "Project Cargo", "Custom Clearance"] as const;
