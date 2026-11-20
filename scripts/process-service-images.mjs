// Converts the original website's service banner images to WebP for the design-lab Services section.
// Sources (all from thelogisticco.com/wp-content/uploads/):
//   air.jpg     2024/04/air.jpg                                     (Air Freight page banner, 1955×591)
//   sea.jpg     2024/05/image-29.jpg                                (Sea Freight page image, 370×400)
//   road.jpg    2024/04/truck.jpg                                   (Road Transport page banner, 1955×591)
//   project.jpg 2024/05/88c0b9f6e6155ef5b18e20ee4db0f33a68c146f6.jpg (Project Cargo page banner, 1920×800)
//   customs.jpg 2024/04/c1.jpg                                      (Custom Clearance page banner, 1955×591)
// Usage: node scripts/process-service-images.mjs <folder with air.jpg sea.jpg road.jpg project.jpg customs.jpg>
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src) throw new Error("Pass the folder that holds the downloaded originals");
const out = "public/images/services";
fs.mkdirSync(out, { recursive: true });

for (const slug of ["air", "sea", "road", "project", "customs"]) {
  const dest = path.join(out, `original-${slug}.webp`);
  const meta = await sharp(path.join(src, `${slug}.jpg`))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(dest);
  console.log(dest, `${meta.width}x${meta.height}`, `${Math.round(meta.size / 1024)} KB`);
}
