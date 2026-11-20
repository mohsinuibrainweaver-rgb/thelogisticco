// The original website's About image (truck + plane) has a pink triangle painted into it.
// To sit on the lab About card's own single pink triangle, this removes that baked pink (and keeps the
// truck's soft ground shadow as a translucent dark layer). Artwork itself is unchanged.
// Usage: node scripts/cutout-truck-plane.mjs
import sharp from "sharp";

const SRC = "public/images/about/original-truck-plane.webp";
const OUT = "public/images/about/original-truck-plane-cutout.webp";
const P = [254, 227, 229]; // the baked pink

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// Is this pixel "pink × k" (pink in shadow)? Returns k (0..1) or -1.
function pinkK(i) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const k = r / P[0];
  if (k < 0.55 || k > 1.02) return -1;
  const dg = Math.abs(g - P[1] * k), db = Math.abs(b - P[2] * k);
  return dg < 9 && db < 9 ? Math.min(1, k) : -1;
}

// Flood-fill from transparent pixels / image border through pink-ish pixels only.
const seen = new Uint8Array(W * H);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const n = y * W + x;
  if (seen[n]) return;
  const i = n * 4;
  if (data[i + 3] < 250 || pinkK(i) >= 0) {
    seen[n] = 1;
    stack.push(n);
  }
};
for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
while (stack.length) {
  const n = stack.pop();
  const x = n % W, y = (n - x) / W;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}

const out = Buffer.from(data);
for (let n = 0; n < W * H; n++) {
  if (!seen[n]) continue;
  const i = n * 4;
  const a0 = data[i + 3] / 255;
  const k = pinkK(i);
  if (data[i + 3] < 250 && k < 0) { out[i + 3] = 0; continue; }
  if (k < 0) { out[i + 3] = 0; continue; }
  // pure pink → fully transparent; shadowed pink → dark, alpha = 1 − k (what the shadow would be over pink)
  const shadow = Math.max(0, 1 - k);
  const a = shadow < 0.02 ? 0 : Math.min(1, shadow * 1.05);
  out[i] = 40; out[i + 1] = 20; out[i + 2] = 28;
  out[i + 3] = Math.round(a * a0 * 255);
}

// Un-fringe: opaque pixels touching removed pixels that are still pinkish get their pink pulled toward neutral.
const final = Buffer.from(out);
for (let y = 1; y < H - 1; y++) {
  for (let x = 1; x < W - 1; x++) {
    const n = y * W + x;
    if (seen[n] || out[n * 4 + 3] < 10) continue;
    const touches = seen[n - 1] || seen[n + 1] || seen[n - W] || seen[n + W];
    if (!touches) continue;
    const i = n * 4;
    const k = pinkK(i);
    if (k >= 0.9) { final[i + 3] = Math.round(final[i + 3] * 0.35); }
  }
}

const meta = await sharp(final, { raw: { width: W, height: H, channels: 4 } })
  .trim({ threshold: 1 })
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(OUT);
console.log(OUT, `${meta.width}x${meta.height}`, `${Math.round(meta.size / 1024)} KB`);
