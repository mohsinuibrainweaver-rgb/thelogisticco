// Builds the faded map backdrops for the two office cards (design lab → Shipping worldwide).
// Source: OpenStreetMap standard tiles (© OpenStreetMap contributors, ODbL) — 4×2 tiles at zoom 15 around each office,
// fetched once at build time (16 tiles in total, well within the tile usage policy), then desaturated and tinted to the
// page palette so they sit quietly behind the card. The card shows the required attribution.
// Output: public/images/maps/lahore.webp, dubai.webp (1024×512).
// Usage: node scripts/make-office-maps.mjs
import fs from "node:fs";
import sharp from "sharp";

const Z = 15;
const OFFICES = [
  // Approximate positions of the two offices listed on the original website's contact page.
  { slug: "lahore", lat: 31.5365, lon: 74.3345 }, // Shadman Colony 1, Jail Road, Lahore
  { slug: "dubai", lat: 25.2581, lon: 55.2972 }, //  The Atrium Center, Khalid Bin Waleed Road, Bur Dubai
];

const tileXY = (lat, lon, z) => {
  const n = 2 ** z;
  const x = ((lon + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return { x, y };
};

fs.mkdirSync("public/images/maps", { recursive: true });

for (const o of OFFICES) {
  const { x, y } = tileXY(o.lat, o.lon, Z);
  // 4 columns × 2 rows, with the office in the middle of the mosaic
  const x0 = Math.floor(x) - 1;
  const y0 = Math.floor(y);
  const tiles = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const res = await fetch(`https://tile.openstreetmap.org/${Z}/${x0 + c}/${y0 + r}.png`, {
        headers: { "User-Agent": "tlc-website-build/1.0 (static map backdrop, 16 tiles)" },
      });
      if (!res.ok) throw new Error(`tile ${x0 + c}/${y0 + r}: HTTP ${res.status}`);
      tiles.push({ input: Buffer.from(await res.arrayBuffer()), left: c * 256, top: r * 256 });
      await new Promise((r2) => setTimeout(r2, 300));
    }
  }
  const mosaic = await sharp({ create: { width: 1024, height: 512, channels: 3, background: "#f3efe8" } })
    .composite(tiles)
    .png()
    .toBuffer();
  const meta = await sharp(mosaic)
    .greyscale()
    .linear(0.62, 96) // flatten contrast, lift towards paper
    .tint("#cfc6b8") // warm paper-ish tint
    .webp({ quality: 80 })
    .toFile(`public/images/maps/${o.slug}.webp`);
  console.log(o.slug, `${meta.width}x${meta.height}`, `${Math.round(meta.size / 1024)} KB`, `office at ${((x - x0) * 256).toFixed(0)},${((y - y0) * 256).toFixed(0)}`);
}
