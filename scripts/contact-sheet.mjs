// Builds a review contact sheet: node scripts/contact-sheet.mjs out.jpg a.webp b.webp ...
import sharp from 'sharp';
const [out, ...files] = process.argv.slice(2);
const W = 900, H = 600;
const tiles = await Promise.all(files.map(f => sharp(f).resize(W, H, { fit: 'contain', background: '#222' }).toBuffer()));
const cols = 2, rows = Math.ceil(tiles.length / cols);
await sharp({ create: { width: W * cols, height: H * rows, channels: 3, background: '#111' } })
  .composite(tiles.map((t, i) => ({ input: t, left: (i % cols) * W, top: Math.floor(i / cols) * H })))
  .jpeg({ quality: 80 }).toFile(out);
console.log('ok', out);
