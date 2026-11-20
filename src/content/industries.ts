// The 15 specialised industries listed on the original site (titles only were published).
// Images exist for four illustrative tiles; the rest render as typographic tiles.

export type Industry = { name: string; image?: { src: string; alt: string } };

export const industries: Industry[] = [
  { name: "Textile", image: { src: "/images/industries/textile.webp", alt: "Textile bales and fabric rolls loaded inside a shipping container" } },
  { name: "Engineering" },
  { name: "Steel Industry" },
  { name: "Ceramic & Tiles" },
  { name: "Oil & Gas" },
  { name: "Medical Equipment" },
  { name: "Heavy Lifts" },
  { name: "SOC Handling" },
  { name: "Food & Beverages" },
  { name: "Automobile", image: { src: "/images/industries/automobile.webp", alt: "Rows of new cars at a port vehicle terminal beside a car carrier ship" } },
  { name: "Power & Energy", image: { src: "/images/industries/power-energy.webp", alt: "Wind turbine blade on a specialised trailer at a port" } },
  { name: "Wholesale & Retail" },
  { name: "Repair & Return" },
  { name: "Construction & Infrastructure" },
  { name: "Pharmaceutical", image: { src: "/images/industries/pharmaceutical.webp", alt: "Cold-chain pharmaceutical pallets in a refrigerated cargo facility" } },
];

export const industriesIntro =
  "Our expertise ensures seamless supply chain management and reliable solutions for your unique industry needs.";
