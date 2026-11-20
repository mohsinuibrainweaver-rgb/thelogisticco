// Trims each stack container to its opaque bounds and fits it to the hanging container's body ratio (445:1600),
// so stacked boxes and the landing container line up exactly. Usage: node scripts/normalize-stack.mjs
import sharp from 'sharp';
import fs from 'node:fs';
const W = 1600, H = 445;
const log = JSON.parse(fs.readFileSync('scripts/image-results.json', 'utf8'));
for (const [i, c] of [[30, 'blue'], [31, 'grey'], [32, 'white']]) {
  const src = `assets/source/home/stack-${c}.png`;
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minx = 1e9, maxx = 0, miny = 1e9, maxy = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 40) { minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); }
  const out = await sharp(src).extract({ left: minx, top: miny, width: maxx - minx + 1, height: maxy - miny + 1 }).resize(W, H, { fit: 'fill' }).webp({ quality: 90, effort: 6, alphaQuality: 95, smartSubsample: true }).toFile(`public/images/home/stack-${c}.webp`);
  Object.assign(log[i], { width: out.width, height: out.height, bytes: out.size });
  console.log(c, 'trim', maxx - minx + 1, 'x', maxy - miny + 1, '(ratio', ((maxy - miny + 1) / (maxx - minx + 1)).toFixed(3) + ') ->', out.width, 'x', out.height);
}
fs.writeFileSync('scripts/image-results.json', JSON.stringify(log, null, 2));

// Brand-red stack box: the hanging container's own body (spreader rows 0–100 removed), so colours match exactly.
{
  const out = await sharp('public/images/home/lab-container.webp').extract({ left: 0, top: 100, width: 1600, height: 445 }).webp({ quality: 90, effort: 6, alphaQuality: 95 }).toFile('public/images/home/stack-red.webp');
  console.log('red', out.width, 'x', out.height, Math.round(out.size / 1024) + 'KB');
}
