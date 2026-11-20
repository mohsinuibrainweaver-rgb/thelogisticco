// Optimises the five Higgsfield service-card photographs (design lab → Services).
// Sources in assets/source/ (git-ignored; re-downloadable by job ID — see docs/image-asset-manifest.md):
//   svc-air.png     abe25b16-08ed-42ed-a7cc-09903b896a98   cargo aircraft being loaded at blue hour
//   svc-sea.png     95ab9c74-b6d6-492a-a736-38c694a1f4da   container ship at a quay under gantry cranes, golden light
//   svc-road.png    a67e4f6f-e48f-4be8-9534-72cca77c3845   freight truck on an empty highway at sunrise
//   svc-project.png 8c04ab98-939f-44c4-8f79-45d19bda20d0   turbine lifted by a heavy-lift crane at a quay at dusk
//   svc-customs.png 6bd5cd8e-ff8b-4f10-bb64-bf5bffe29ddd   customs officer checking documents beside an open container
// (an earlier customs render, job 62e6a08c-…, was rejected: it had "CUSTOMS CLEARANCE OFFICER" printed on the vest)
// Output: public/images/services/hf-{air,sea,road,project,customs}.webp (1000×1250).
import sharp from "sharp";
for (const n of ["air", "sea", "road", "project", "customs"]) {
  const m = await sharp(`assets/source/svc-${n}.png`).resize({ width: 1000, height: 1250, fit: "cover" }).webp({ quality: 80 }).toFile(`public/images/services/hf-${n}.webp`);
  console.log(n, `${m.width}x${m.height}`, `${Math.round(m.size / 1024)} KB`);
}
