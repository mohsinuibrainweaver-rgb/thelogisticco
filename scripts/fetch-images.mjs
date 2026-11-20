// Downloads approved Higgsfield results and writes optimized WebP files to public/images.
// Usage: node scripts/fetch-images.mjs <index>=<jobId>=<url> [...]
// Source PNGs are kept in assets/source/ (git-ignored; re-downloadable from Higgsfield by job id).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const plan = JSON.parse(fs.readFileSync(path.join(root, 'scripts/image-plan.json'), 'utf8'));
const logPath = path.join(root, 'scripts/image-results.json');
const log = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf8')) : {};

for (const arg of process.argv.slice(2)) {
  const [idx, jobId, ...rest] = arg.split('=');
  const url = rest.join('=');
  const item = plan.images.find((x) => x.i === Number(idx));
  if (!item) { console.error('unknown index', idx); continue; }
  const res = await fetch(url);
  if (!res.ok) { console.error('download failed', idx, res.status); continue; }
  const buf = Buffer.from(await res.arrayBuffer());
  const srcFile = path.join(root, 'assets/source', item.file + '.png');
  fs.mkdirSync(path.dirname(srcFile), { recursive: true });
  fs.writeFileSync(srcFile, buf);
  const meta = await sharp(buf).metadata();
  const outFile = path.join(root, 'public/images', item.file + '.webp');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  const info = await sharp(buf)
    .resize({ width: Math.min(item.w, meta.width), withoutEnlargement: true })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(outFile);
  log[item.i] = {
    file: item.file, jobId, source: `assets/source/${item.file}.png`, sourceWidth: meta.width, sourceHeight: meta.height,
    path: `/images/${item.file}.webp`, width: info.width, height: info.height, bytes: info.size, status: 'generated',
  };
  console.log(`#${idx} ${item.file}: src ${meta.width}x${meta.height} -> webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}
fs.writeFileSync(logPath, JSON.stringify(log, null, 2));
