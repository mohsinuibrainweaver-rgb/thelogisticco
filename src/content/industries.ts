// The 15 specialised industries listed on the original site (titles only were published).
// Images exist for four illustrative tiles; the rest render as typographic tiles.

export type Industry = {
  name: string;
  /** The tile image from the original website (scripts/fetch-industry-images.mjs). */
  cover: string;
  image?: { src: string; alt: string };
};

export const industries: Industry[] = [
  { name: "Textile", cover: "/images/industries/original-textile.webp", image: { src: "/images/industries/textile.webp", alt: "Textile bales and fabric rolls loaded inside a shipping container" } },
  { name: "Engineering", cover: "/images/industries/original-engineering.webp" },
  { name: "Steel Industry", cover: "/images/industries/original-steel-industry.webp" },
  { name: "Ceramic & Tiles", cover: "/images/industries/original-ceramic-tiles.webp" },
  { name: "Oil & Gas", cover: "/images/industries/original-oil-gas.webp" },
  { name: "Medical Equipment", cover: "/images/industries/original-medical-equipment.webp" },
  { name: "Heavy Lifts", cover: "/images/industries/original-heavy-lifts.webp" },
  { name: "SOC Handling", cover: "/images/industries/original-soc-handling.webp" },
  { name: "Food & Beverages", cover: "/images/industries/original-food-beverages.webp" },
  { name: "Automobile", cover: "/images/industries/original-automobile.webp", image: { src: "/images/industries/automobile.webp", alt: "Rows of new cars at a port vehicle terminal beside a car carrier ship" } },
  { name: "Power & Energy", cover: "/images/industries/original-power-energy.webp", image: { src: "/images/industries/power-energy.webp", alt: "Wind turbine blade on a specialised trailer at a port" } },
  { name: "Wholesale & Retail", cover: "/images/industries/original-wholesale-retail.webp" },
  { name: "Repair & Return", cover: "/images/industries/original-repair-return.webp" },
  { name: "Construction & Infrastructure", cover: "/images/industries/original-construction.webp" },
  { name: "Pharmaceutical", cover: "/images/industries/original-pharmaceutical.webp", image: { src: "/images/industries/pharmaceutical.webp", alt: "Cold-chain pharmaceutical pallets in a refrigerated cargo facility" } },
];

export const industriesIntro =
  "Our expertise ensures seamless supply chain management and reliable solutions for your unique industry needs.";
