// Turns the original website's membership logos (JPGs on white, thelogisticco.com/wp-content/uploads/2024/04/Partners-0N.jpg)
// into transparent, trimmed WebPs — colours are un-blended from white, the artwork itself is not changed.
// Usage: node scripts/process-partner-logos.mjs <folder containing Partners-01.jpg … Partners-07.jpg>
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src) throw new Error("Pass the folder that holds the downloaded Partners-0N.jpg files");

// Original order on thelogisticco.com.
const LOGOS = ["wca-world", "ppl", "fnc", "acaap", "piffa", "fiata", "jctrans"];
const out = "public/images/partners";
fs.mkdirSync(out, { recursive: true });

for (const [i, slug] of LOGOS.entries()) {
  const file = path.join(src, `Partners-0${i + 1}.jpg`);
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let p = 0, q = 0; p < data.length; p += 3, q += 4) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    // Opacity = distance from white (small floor removes JPEG noise in the background).
    let a = (255 - Math.min(r, g, b)) / 255;
    a = Math.max(0, Math.min(1, (a - 0.04) / 0.96));
    const un = (c) => (a > 0 ? Math.max(0, Math.min(255, Math.round(255 - (255 - c) / a))) : 0);
    rgba[q] = un(r);
    rgba[q + 1] = un(g);
    rgba[q + 2] = un(b);
    rgba[q + 3] = Math.round(a * 255);
  }
  const dest = path.join(out, `${slug}.webp`);
  const trimmed = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();
  const meta = await sharp(trimmed)
    .resize({ width: 560, height: 260, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(dest);
  console.log(slug, `${meta.width}x${meta.height}`, `${Math.round(meta.size / 1024)} KB`);
}
