// Optimises the two Higgsfield images used by the design lab's Shipping worldwide and In focus sections.
// Sources (kept in assets/source/, git-ignored; re-downloadable from Higgsfield by job ID — see docs/image-asset-manifest.md):
//   ship-a.png     job 8a3ef307-0840-4490-806a-8c440966c176  (transparent top-down container ship, 2688×1152)
//   focus-photo.png job 07eaada2-c0f8-4a65-adb6-5ad1a25a69d1 (golden-hour customs professional at a container terminal, 2688×1520)
// Usage: node scripts/process-lab-images.mjs
import sharp from "sharp";

const ship = await sharp("assets/source/ship-a.png")
  .trim({ threshold: 4 }) // remove the empty transparent margin so the ship fills its box
  .resize({ width: 2000, withoutEnlargement: true })
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile("public/images/home/ship-topdown-clean.webp");
console.log("ship", `${ship.width}x${ship.height}`, `${Math.round(ship.size / 1024)} KB`);

const photo = await sharp("assets/source/focus-photo.png")
  .resize({ width: 2200, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile("public/images/services/customs-focus.webp");
console.log("photo", `${photo.width}x${photo.height}`, `${Math.round(photo.size / 1024)} KB`);

// About → "Our mission" card photo. Higgsfield `gpt_image_2_6` (high, 2k, 3:2), job 68847551-0109-4a7a-9c5a-8a53cc57d23c
// (three logistics professionals planning around a tablet at a container terminal at golden hour), 2048×1360 → 1600×1062.
// Source kept in assets/source/mission-a.png.
const mission = await sharp("assets/source/mission-a.png")
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile("public/images/about/mission-team.webp");
console.log("mission", `${mission.width}x${mission.height}`, `${Math.round(mission.size / 1024)} KB`);
