// Optimises the four Higgsfield photographs used for the design lab's "In numbers" hover reveals.
// Sources (assets/source/, git-ignored; re-downloadable by Higgsfield job ID — see docs/image-asset-manifest.md):
//   kpi-years.png      ad2b7cd1-280e-4755-87a1-5e595c5857d7   (20+ business operating years)
//   kpi-countries.png  3e6aac17-cb44-4888-96af-f376b87545c4   (30+ operational countries)
//   kpi-associates.png 6d5fe0ad-b303-49d6-8fd4-31852c16a63e   (80+ global business associates)
//   kpi-clients.png    f7b3f176-655a-4879-b56b-8d4854139e93   (100+ long-term clients)
// Usage: node scripts/process-kpi-images.mjs
import fs from "node:fs";
import sharp from "sharp";

fs.mkdirSync("public/images/kpis", { recursive: true });
for (const n of ["years", "countries", "associates", "clients"]) {
  const meta = await sharp(`assets/source/kpi-${n}.png`)
    .resize({ width: 900, height: 1125, fit: "cover" })
    .webp({ quality: 80 })
    .toFile(`public/images/kpis/${n}.webp`);
  console.log(n, `${meta.width}x${meta.height}`, `${Math.round(meta.size / 1024)} KB`);
}
