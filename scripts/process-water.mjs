// Builds the seamless sea-surface strip used behind the ship in the design lab's Shipping worldwide section.
// Source: Higgsfield `gpt_image_2_6` (high, 2k, 21:9), job 7d2158cf-34db-4cc0-b3ff-1c6c871f6eb3 — a top-down sea surface
// with no ship, no foam and no horizon (assets/source/water-a.png, 2688×1152).
// The image is softened to a paler, less saturated tone (so dark headline text stays readable on it) and joined to its
// own mirror image, so the left and right edges of the result are identical and the strip can scroll forever.
// Output: public/images/home/sea.webp (3200×686 = 2 × 1600×686).
// Usage: node scripts/process-water.mjs
import sharp from "sharp";

const W = 1600;
const H = Math.round((W * 1152) / 2688);
const base = await sharp("assets/source/water-a.png")
  .resize(W, H, { fit: "cover" })
  .modulate({ saturation: 0.5, brightness: 1.08 })
  .linear(0.84, 36) // lift the blacks / flatten contrast slightly
  .toBuffer();
const flipped = await sharp(base).flop().toBuffer();
const out = await sharp({ create: { width: W * 2, height: H, channels: 3, background: "#cfe6ee" } })
  .composite([
    { input: base, left: 0, top: 0 },
    { input: flipped, left: W, top: 0 },
  ])
  .webp({ quality: 80 })
  .toFile("public/images/home/sea.webp");
console.log("sea", `${out.width}x${out.height}`, `${Math.round(out.size / 1024)} KB`);
