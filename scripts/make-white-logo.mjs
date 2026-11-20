// Builds a white, background-free version of the ORIGINAL logo (public/brand/tlc-logo.png):
// every coloured/dark pixel becomes white; the pale globe becomes a soft translucent white so "TLC" stays legible.
import sharp from 'sharp';
const { data, info } = await sharp('public/brand/tlc-logo.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const strength = Math.min(1, Math.max(0, (1 - L) * 2.4)); // dark/saturated → 1, pale grey globe → ~0.25
  out[i] = 255; out[i + 1] = 255; out[i + 2] = 255;
  out[i + 3] = Math.round(a * strength);
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png({ compressionLevel: 9 }).toFile('public/brand/tlc-logo-white.png');
console.log('white logo', info.width, 'x', info.height);
