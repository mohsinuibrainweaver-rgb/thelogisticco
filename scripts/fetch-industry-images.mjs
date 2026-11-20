// Downloads the original website's 15 "Specialized Industries" tile images and saves them as WebP.
// Source: https://thelogisticco.com/wp-content/uploads/2024/04/<Name>.jpg (500×342 each).
// Output: public/images/industries/original-<slug>.webp   (slugs match src/content/industries.ts order)
// Usage: node scripts/fetch-industry-images.mjs
import fs from "node:fs";
import sharp from "sharp";

const FILES = [
  ["textile", "Textile"],
  ["engineering", "Engineering"],
  ["steel-industry", "Steel-Industry"],
  ["ceramic-tiles", "Ceramic-and-Tiles"],
  ["oil-gas", "Oil-Gas"],
  ["medical-equipment", "Medical-Equipment"],
  ["heavy-lifts", "Heavy-Lifts"],
  ["soc-handling", "SOC-Handling"],
  ["food-beverages", "Food-Beverages"],
  ["automobile", "Automobile"],
  ["power-energy", "Power-Energy"],
  ["wholesale-retail", "Wholesale-Retail"],
  ["repair-return", "Repair-Return"],
  ["construction", "Construction-Infrastructure"],
  ["pharmaceutical", "Pharmaceutical"],
];

const out = "public/images/industries";
fs.mkdirSync(out, { recursive: true });
for (const [slug, file] of FILES) {
  const res = await fetch(`https://thelogisticco.com/wp-content/uploads/2024/04/${file}.jpg`);
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(buf).webp({ quality: 86 }).toFile(`${out}/original-${slug}.webp`);
  console.log(slug, `${meta.width}x${meta.height}`, `${Math.round(meta.size / 1024)} KB`);
}
