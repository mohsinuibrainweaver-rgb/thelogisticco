# Image Asset Manifest

All website photography was generated with **Higgsfield** (connected MCP integration, model `gpt_image_2_6`, quality `high`, resolution `2k`) on 2026-11-19, reviewed for artifacts, then optimised to WebP (sharp, q82) and saved under `public/images/`. No temporary Higgsfield URLs, stock photos or template assets are referenced by the site.

- **Source files:** original PNGs are kept locally in `assets/source/` (git-ignored because of size). Each can be re-downloaded from the Higgsfield account using the job ID below.
- **Pipeline:** `scripts/image-plan.json` (prompts) → Higgsfield → `node scripts/fetch-images.mjs <index>=<jobId>=<url>` → `public/images/**.webp` + `scripts/image-results.json` → `node scripts/build-manifest.mjs` (this file).
- **Nature of imagery:** all images are **illustrative**. They do not depict The Logistic Company's own staff, vehicles, aircraft, vessels or facilities, and contain no company logos, certification marks or readable branding. Replace them with real company photography where available.

### Shared style suffix (appended to every prompt)
> Photorealistic editorial documentary photograph, full-frame camera, natural light, restrained cinematic colour grade with deep navy-blue shadows, warm amber highlights and desaturated steel greys, subtle fine film grain. Accurate real-world scale, perspective and industrial detail. Any shipping containers are plain and weathered (rust red, slate blue, grey, off-white) with no lettering, logos or numbers. No text, no signage, no watermarks, no brand names, no company liveries, no faces looking at the camera.

### Review notes
- **#7 Air Freight hero** — the first generation was **rejected** (aircraft fuselage too short, wing placed too far forward). It was regenerated with explicit proportion guidance; the approved version is listed below.
- All other first generations passed review (scale, perspective, no text/logos, consistent grade).
- Higgsfield rate-limited at ~4 concurrent jobs; failed submissions created no jobs and were resubmitted.

## Assets

| # | Page | Section | Purpose | Ratio | Final path | Delivered size | Source size | Higgsfield job | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Home | 01 Hero | Full-screen cinematic opener; lower-left kept empty for headline | 16:9 | `/images/home/hero.webp` | 2400×1357, 333 KB | 2688×1520 | `e0ab18cd-d53d-479b-913b-dd84d837507e` | Generated & approved |
| 2 | Home | 02 Introduction | Portrait editorial image beside company introduction | 3:4 | `/images/home/intro.webp` | 1400×1875, 305 KB | 1744×2336 | `a9be790f-a5f2-4e66-9177-71d1ab830fa8` | Generated & approved |
| 3 | Home | 04 Global connectivity | Ultra-wide band behind verified facts strip | 21:9 | `/images/home/global.webp` | 2400×1029, 497 KB | 2688×1152 | `ea63dc99-1691-4b06-b9f9-a513c539b7ef` | Generated & approved |
| 4 | Home | 07 Visual storytelling | Story panel — the lift | 4:5 | `/images/home/story-crane.webp` | 1400×1750, 272 KB | 1792×2240 | `52853431-bd57-49af-9ccc-0fddc6837571` | Generated & approved |
| 5 | Home | 07 Visual storytelling | Story panel — the crossing | 16:9 | `/images/home/story-sea.webp` | 2400×1357, 504 KB | 2688×1520 | `4f5d0f91-9eb8-4218-b0ff-cd7807500470` | Generated & approved |
| 6 | Home | 08 Contact CTA | Dark CTA background with central negative space | 16:9 | `/images/home/cta.webp` | 2400×1357, 225 KB | 2688×1520 | `63a2606b-1ea5-45bd-a4fe-70d3627cc8db` | Generated & approved |
| 7 | Air Freight | Hero | Service hero / home service preview | 16:9 | `/images/services/air-freight.webp` | 2400×1357, 320 KB | 2688×1520 | `5a2e2b1a-bf5c-49e4-abe1-a04a63125772` | Generated & approved |
| 8 | Air Freight | Sub-services | Sticky detail image | 4:5 | `/images/services/air-freight-detail.webp` | 1400×1750, 320 KB | 1792×2240 | `b441fb14-f744-4514-bb14-da001d8fabce` | Generated & approved |
| 9 | Sea Freight | Hero | Service hero / home service preview | 16:9 | `/images/services/sea-freight.webp` | 2400×1357, 464 KB | 2688×1520 | `f34147ba-28c9-4122-bb64-4b8ce90ba603` | Generated & approved |
| 10 | Sea Freight | Sub-services | Sticky detail image | 4:5 | `/images/services/sea-freight-detail.webp` | 1400×1750, 340 KB | 1792×2240 | `55286a86-e621-4218-956c-cc88bc85cabb` | Generated & approved |
| 11 | Road Transport | Hero | Service hero / home service preview | 16:9 | `/images/services/road-transport.webp` | 2400×1357, 198 KB | 2688×1520 | `f7e346bb-dab9-4d42-b11d-5a8dd6b0a4d8` | Generated & approved |
| 12 | Road Transport | Sub-services | Sticky detail image | 4:5 | `/images/services/road-transport-detail.webp` | 1400×1750, 336 KB | 1792×2240 | `7d9d6203-f785-449e-81ba-a8ffc8f73411` | Generated & approved |
| 13 | Project / Heavy Lift Cargo | Hero | Service hero / home service preview | 16:9 | `/images/services/project-cargo.webp` | 2400×1357, 356 KB | 2688×1520 | `cbe2fa35-b297-479f-a060-36746b7475de` | Generated & approved |
| 14 | Project / Heavy Lift Cargo | Sub-services | Sticky detail image | 4:5 | `/images/services/project-cargo-detail.webp` | 1400×1750, 454 KB | 1792×2240 | `7e982405-be4e-48ad-b197-341c7c732460` | Generated & approved |
| 15 | Custom Clearance | Hero | Service hero / home service preview | 16:9 | `/images/services/customs-clearance.webp` | 2400×1357, 411 KB | 2688×1520 | `4ad6e193-ef28-48b8-90f9-31f2192b6627` | Generated & approved |
| 16 | Custom Clearance | Sub-services | Sticky detail image | 4:5 | `/images/services/customs-clearance-detail.webp` | 1400×1750, 466 KB | 1792×2240 | `a5342244-a3d3-4305-ac55-5d7a905fb567` | Generated & approved |
| 17 | About | Hero | Panoramic about hero | 21:9 | `/images/about/hero.webp` | 2400×1029, 141 KB | 2688×1152 | `47d5c2e6-1a1f-4a5e-94a6-dc16fb712f97` | Generated & approved |
| 18 | About | Mission & vision | Portrait image beside mission/vision; illustrative, not actual staff | 3:4 | `/images/about/operations.webp` | 1400×1875, 221 KB | 1744×2336 | `f1409469-0ad4-41a7-ad0a-3d48ba946a05` | Generated & approved |
| 19 | Specialized Industries | Hero | Industries hero | 16:9 | `/images/industries/hero.webp` | 2400×1357, 396 KB | 2688×1520 | `94722f0e-183f-4768-8207-1390462e29db` | Generated & approved |
| 20 | Specialized Industries | Tile — Textile | Industry tile | 4:5 | `/images/industries/textile.webp` | 1200×1500, 306 KB | 1792×2240 | `2a0783b5-a579-40a8-b139-120a51b52d7b` | Generated & approved |
| 21 | Specialized Industries | Tile — Pharmaceutical | Industry tile | 4:5 | `/images/industries/pharmaceutical.webp` | 1200×1500, 258 KB | 1792×2240 | `448daec6-8ce7-4636-8b9b-ee9ecb8af2cd` | Generated & approved |
| 22 | Specialized Industries | Tile — Automobile | Industry tile | 4:5 | `/images/industries/automobile.webp` | 1200×1500, 273 KB | 1792×2240 | `8f905981-69d1-4f8b-a56f-59c4ca50e573` | Generated & approved |
| 23 | Specialized Industries | Tile — Power & Energy | Industry tile | 4:5 | `/images/industries/power-energy.webp` | 1200×1500, 171 KB | 1792×2240 | `a8cfc2ca-bd73-4af8-8216-f69b62ac8c07` | Generated & approved |
| 24 | Contact | Hero | Contact hero | 16:9 | `/images/contact/hero.webp` | 2400×1357, 329 KB | 2688×1520 | `77dc84ce-8f46-4a66-83e8-6f73b1f3117b` | Generated & approved |
| 25 | FAQ | Hero band | Textural band on FAQ page | 21:9 | `/images/faq/hero.webp` | 2400×1029, 244 KB | 2688×1152 | `7369da0d-1f17-4159-a34c-092223dad635` | Generated & approved |
| 26 | Home | 05 Getting there (scroll animation) | Transparent top-down ship cutout that crosses the screen on scroll (decorative) | 21:9 | `/images/home/ship-topdown.webp` | 2000×502, 308 KB | 2688×1152 | `6a7c4a52-7e1d-4867-9bee-6fb40d5df74c` | Generated & approved |
| 27 | Design lab (/home-lab/) | Hero — port skyline cutout | Transparent port skyline rising in front of the giant word (lab hero) | 21:9 | `/images/home/lab-port-cutout.webp` | 2400×929, 692 KB | 2688×1152 | `ec24dcdb-e0b3-45ff-8067-9703b3ad3d13` | Generated & approved |
| 28 | Design lab (/home-lab/) | Hero — portrait circle | Circular portrait beside the 20+ years stat (illustrative, not an actual employee) | 1:1 | `/images/home/lab-portrait.webp` | 800×800, 44 KB | 2048×2048 | `6165d257-45ee-466e-bebc-c39e04d72fb8` | Generated & approved |
| 29 | Design lab (/home-lab/) | Hero — hanging container | Transparent container on a crane spreader, hung from drawn cables and kept sticky through the hero (decorative) | 16:9 | `/images/home/lab-container.webp` | 1600×545, 230 KB | 2688×1520 | `d8da2618-df54-4d07-b08a-eb7fb617d4d2` | Generated & approved |
| 30 | Design lab (/home-lab/) | Hero — container stack (blue) | Container in the stacked wall the hanging container lands on (decorative); normalised to the hanging container body ratio 445:1600 | 16:9 | `/images/home/stack-blue.webp` | 1600×445, 172 KB | 2688×1520 | `2d49a0fc-c1a6-4565-8403-8e9975f3003c` | Generated & approved |
| 31 | Design lab (/home-lab/) | Hero — container stack (grey) | Container in the stacked wall the hanging container lands on (decorative); normalised to the hanging container body ratio 445:1600 | 16:9 | `/images/home/stack-grey.webp` | 1600×445, 168 KB | 2688×1520 | `8406f187-a0e3-4570-a5f6-ac83f0a899aa` | Generated & approved |
| 32 | Design lab (/home-lab/) | Hero — container stack (white) | Container in the stacked wall the hanging container lands on (decorative); normalised to the hanging container body ratio 445:1600 | 16:9 | `/images/home/stack-white.webp` | 1600×445, 148 KB | 2688×1520 | `2439c491-583c-452d-92be-0b8012cb55a2` | Generated & approved |
| 33 | Design lab (/home-lab/) | Hero — hanging container door end | Door-end face of the 3D hanging container (visible while it is turned 45°); trimmed to its bounds | 1:1 | `/images/home/lab-container-end.webp` | 600×640, 81 KB | 2048×2048 | `5eee0cf5-fd7d-499c-acfe-d50b27304d7d` | Generated & approved |

## Prompts and alt text

### 1. Home — 01 Hero
- **File:** `/images/home/hero.webp`
- **Alt text:** Loaded container ship entering a commercial port at dusk
- **Composition:** Full-screen cinematic opener; lower-left kept empty for headline
- **Prompt:** A large modern container ship, fully loaded with stacked containers, gliding into a commercial port at blue-hour dusk, seen from a low elevated angle across calm dark water. The ship occupies the right two-thirds of the frame; distant ship-to-shore gantry cranes with small warm lights line the horizon. The lower-left third of the frame is calm dark water and soft sky, intentionally empty for a headline. Quiet, monumental, cinematic.

### 2. Home — 02 Introduction
- **File:** `/images/home/intro.webp`
- **Alt text:** Canyon of stacked shipping containers beneath a gantry crane at a container terminal
- **Composition:** Portrait editorial image beside company introduction
- **Prompt:** Looking up a narrow canyon between towering stacks of shipping containers at a container terminal in early morning light, a single ship-to-shore gantry crane visible at the top of the frame against pale sky, long soft shadows, strong vertical composition.

### 3. Home — 04 Global connectivity
- **File:** `/images/home/global.webp`
- **Alt text:** Aerial view of a container terminal grid with a ship at the quay
- **Composition:** Ultra-wide band behind verified facts strip
- **Prompt:** Straight-down aerial drone photograph of a vast container terminal: rows of stacked containers forming a geometric grid, a container ship moored at the quay with gantry cranes, a few trucks moving on lanes, late-afternoon low sun casting long shadows. Graphic, abstract, ultra-wide.

### 4. Home — 07 Visual storytelling
- **File:** `/images/home/story-crane.webp`
- **Alt text:** Gantry crane lifting a container from a vessel at night
- **Composition:** Story panel — the lift
- **Prompt:** Low-angle photograph of a ship-to-shore gantry crane lifting a single container from a vessel at night, floodlights creating warm pools of light in light mist, the container suspended mid-air on steel cables.

### 5. Home — 07 Visual storytelling
- **File:** `/images/home/story-sea.webp`
- **Alt text:** Container vessel crossing open ocean with a long white wake
- **Composition:** Story panel — the crossing
- **Prompt:** Aerial photograph of a large container vessel sailing across deep blue open ocean, a long white wake trailing diagonally across the frame, seen from high above and behind at a three-quarter angle, soft overcast light, vast negative space of sea.

### 6. Home — 08 Contact CTA
- **File:** `/images/home/cta.webp`
- **Alt text:** Illuminated container port at night reflected in still water
- **Composition:** Dark CTA background with central negative space
- **Prompt:** Wide photograph of a container port at night: a row of illuminated gantry cranes reflected in still black water, warm sodium lights against a cool deep-blue sky after sunset. The centre of the frame is dark calm water and sky, leaving generous empty space for large text.

### 7. Air Freight — Hero
- **File:** `/images/services/air-freight.webp`
- **Alt text:** Cargo aircraft with nose door raised being loaded at night
- **Composition:** Service hero / home service preview
- **Prompt:** A wide-body cargo freighter aircraft in plain unbranded white parked on an airport apron at night with its nose cargo door raised, ground crew silhouettes in hi-vis vests guiding a palletised unit load device on a cargo loader into the aircraft, wet tarmac reflecting floodlights. The left third of the frame is darker sky and tarmac for text.

### 8. Air Freight — Sub-services
- **File:** `/images/services/air-freight-detail.webp`
- **Alt text:** Netted air cargo pallets on a roller deck in a cargo terminal
- **Composition:** Sticky detail image
- **Prompt:** Air cargo unit load device pallets wrapped in netting on a roller deck inside an airport cargo terminal, a cargo aircraft visible through the open hangar door at dusk, calm orderly scene.

### 9. Sea Freight — Hero
- **File:** `/images/services/sea-freight.webp`
- **Alt text:** Container ship at a quay worked by gantry cranes in late-afternoon light
- **Composition:** Service hero / home service preview
- **Prompt:** A heavily laden container ship at a quay being worked by several gantry cranes in golden late-afternoon light, photographed from water level, stacks of containers and the ship's hull forming strong horizontal lines, sky occupying the upper third.

### 10. Sea Freight — Sub-services
- **File:** `/images/services/sea-freight-detail.webp`
- **Alt text:** Refrigerated reefer containers plugged in at a port terminal
- **Composition:** Sticky detail image
- **Prompt:** Rows of refrigerated reefer containers stacked at a port terminal with power cables plugged in, a worker in a hi-vis vest seen from behind checking a unit, overcast morning light.

### 11. Road Transport — Hero
- **File:** `/images/services/road-transport.webp`
- **Alt text:** Truck hauling a shipping container on a highway at sunrise
- **Composition:** Service hero / home service preview
- **Prompt:** A modern unbranded semi-trailer truck hauling a shipping container on a long straight highway through arid plains at sunrise, slight motion blur on the road surface, faint mountains in the distance, dust haze catching the low sun. Truck right of centre, travelling toward the left.

### 12. Road Transport — Sub-services
- **File:** `/images/services/road-transport-detail.webp`
- **Alt text:** Line of freight trucks at a logistics depot at dawn
- **Composition:** Sticky detail image
- **Prompt:** A line of parked unbranded freight trucks with container chassis at a logistics depot at dawn, headlights on, cool blue ambient light mixed with warm lamps, wet ground reflecting lights.

### 13. Project / Heavy Lift Cargo — Hero
- **File:** `/images/services/project-cargo.webp`
- **Alt text:** Industrial transformer moving on a multi-axle modular trailer through a port
- **Composition:** Service hero / home service preview
- **Prompt:** A massive industrial power transformer secured on a multi-axle hydraulic modular trailer being moved slowly through a port at dusk, a few workers in hi-vis vests walking alongside, a heavy-lift crawler crane in the background, chains and lashings visible.

### 14. Project / Heavy Lift Cargo — Sub-services
- **File:** `/images/services/project-cargo-detail.webp`
- **Alt text:** Chains and lashings securing crated machinery on a break bulk deck
- **Composition:** Sticky detail image
- **Prompt:** Detail of heavy steel chains and ratchet lashings securing large wooden-crated industrial machinery on the deck of a break bulk vessel, overcast light, wet steel deck.

### 15. Custom Clearance — Hero
- **File:** `/images/services/customs-clearance.webp`
- **Alt text:** Inspector reviewing an open container inside a bonded warehouse
- **Composition:** Service hero / home service preview
- **Prompt:** Inside a large bonded customs warehouse: an inspector in a hi-vis vest seen from behind holding a tablet, examining an open shipping container with neatly stacked cartons and pallets, high ceiling with daylight from skylights, orderly racking receding into the distance.

### 16. Custom Clearance — Sub-services
- **File:** `/images/services/customs-clearance-detail.webp`
- **Alt text:** Aisle of pallet racking in a bonded warehouse
- **Composition:** Sticky detail image
- **Prompt:** Long aisle of tall pallet racking in a secure bonded warehouse, sealed shrink-wrapped pallets without labels, cool daylight, symmetrical composition, a forklift parked at the far end.

### 17. About — Hero
- **File:** `/images/about/hero.webp`
- **Alt text:** Port cranes and a moored ship silhouetted at dawn
- **Composition:** Panoramic about hero
- **Prompt:** Panoramic photograph of a commercial port at dawn: silhouettes of gantry cranes and a moored container ship against a soft peach and pale blue sky, light mist over the water, calm and expansive; the upper half of the frame is open sky.

### 18. About — Mission & vision
- **File:** `/images/about/operations.webp`
- **Alt text:** Logistics professionals reviewing a plan on a terminal quay
- **Composition:** Portrait image beside mission/vision; illustrative, not actual staff
- **Prompt:** Three logistics professionals in hi-vis vests and hard hats seen from behind and in profile, reviewing plans on a tablet on a container terminal quay at golden hour, stacks of containers and a crane softly out of focus behind them.

### 19. Specialized Industries — Hero
- **File:** `/images/industries/hero.webp`
- **Alt text:** Steel coils and pipes staged on a quay for loading
- **Composition:** Industries hero
- **Prompt:** Steel coils and bundles of large steel pipes staged on a port quay ready for loading onto a break bulk ship, low evening sun raking across the steel, a mobile harbour crane in the background.

### 20. Specialized Industries — Tile — Textile
- **File:** `/images/industries/textile.webp`
- **Alt text:** Textile bales and fabric rolls loaded in a container
- **Composition:** Industry tile
- **Prompt:** Compressed textile bales and rolls of fabric neatly loaded inside an open shipping container, warm warehouse light falling across the cargo.

### 21. Specialized Industries — Tile — Pharmaceutical
- **File:** `/images/industries/pharmaceutical.webp`
- **Alt text:** Cold-chain pharmaceutical pallets in a refrigerated facility
- **Composition:** Industry tile
- **Prompt:** Temperature-controlled pharmaceutical cargo: insulated thermal-cover pallets with cold-chain packaging in a clean refrigerated air cargo facility, cool white-blue light, no labels.

### 22. Specialized Industries — Tile — Automobile
- **File:** `/images/industries/automobile.webp`
- **Alt text:** Rows of new cars at a port vehicle terminal beside a car carrier
- **Composition:** Industry tile
- **Prompt:** New unbranded cars lined up in rows on a port vehicle terminal beside a roll-on roll-off car carrier ship, overcast afternoon light.

### 23. Specialized Industries — Tile — Power & Energy
- **File:** `/images/industries/power-energy.webp`
- **Alt text:** Wind turbine blade on a specialised trailer at a port
- **Composition:** Industry tile
- **Prompt:** A single long wind turbine blade on a specialised extendable trailer at a port in early morning light, a crane and the sea in the background.

### 24. Contact — Hero
- **File:** `/images/contact/hero.webp`
- **Alt text:** Truck light trails at a port gate at night
- **Composition:** Contact hero
- **Prompt:** Long-exposure night photograph of a port access road with light trails from trucks, container stacks and illuminated gantry cranes beyond, deep blue sky.

### 25. FAQ — Hero band
- **File:** `/images/faq/hero.webp`
- **Alt text:** Close-up of corrugated container doors in muted colours
- **Composition:** Textural band on FAQ page
- **Prompt:** Close-up abstract texture of corrugated steel shipping container doors in muted rust red, slate blue and grey standing side by side, raking side light, shallow depth of field, no markings.

### 26. Home — 05 Getting there (scroll animation)
- **File:** `/images/home/ship-topdown.webp`
- **Alt text:** 
- **Composition:** Transparent top-down ship cutout that crosses the screen on scroll (decorative)
- **Prompt:** Exact top-down orthographic aerial view of a large modern container ship, isolated on a fully transparent background, bow pointing to the right, hull perfectly horizontal and centred, the deck fully loaded with neat rows of plain weathered containers in rust red, slate blue, grey and off-white, white superstructure near the stern, accurate real-world proportions and fine industrial detail, soft even daylight, photorealistic. No water, no wake, no shadow on ground, no text, no logos, no numbers, no markings. (Generated with background: transparent; style suffix not applied.)

### 27. Design lab (/home-lab/) — Hero — port skyline cutout
- **File:** `/images/home/lab-port-cutout.webp`
- **Alt text:** Container port with gantry cranes, stacked containers and a moored ship
- **Composition:** Transparent port skyline rising in front of the giant word (lab hero)
- **Prompt:** Wide panoramic cutout of a modern container port seen from water level: three tall ship-to-shore gantry cranes, dense stacks of shipping containers along the quay and a large fully loaded container ship moored in front, all isolated on a fully transparent background, no sky, no water. Photorealistic soft daylight. No text, logos or lettering. (background: transparent)

### 28. Design lab (/home-lab/) — Hero — portrait circle
- **File:** `/images/home/lab-portrait.webp`
- **Alt text:** Logistics operations manager in a hard hat holding a tablet (illustrative)
- **Composition:** Circular portrait beside the 20+ years stat (illustrative, not an actual employee)
- **Prompt:** Waist-up portrait of a confident logistics operations manager wearing a white hard hat, light blue shirt and a hi-vis vest, holding a tablet, friendly natural expression, soft even studio light, plain very light warm grey seamless background, photorealistic editorial portrait. No text, logos, badges or name tags.

### 29. Design lab (/home-lab/) — Hero — hanging container
- **File:** `/images/home/lab-container.webp`
- **Alt text:** 
- **Composition:** Transparent container on a crane spreader, hung from drawn cables and kept sticky through the hero (decorative)
- **Prompt:** Straight side view of a single 40-foot steel shipping container in weathered coral red, hanging level from a yellow crane spreader frame locked onto its top corner castings; nothing above the spreader. Isolated on a fully transparent background. No text, logos, numbers or markings. (background: transparent)

### 30. Design lab (/home-lab/) — Hero — container stack (blue)
- **File:** `/images/home/stack-blue.webp`
- **Alt text:** 
- **Composition:** Container in the stacked wall the hanging container lands on (decorative); normalised to the hanging container body ratio 445:1600
- **Prompt:** Straight side view (orthographic) of a single 40-foot steel shipping container in weathered slate blue, long side facing camera, corrugated wall, corner castings visible, nothing on top, isolated on a fully transparent background. No text, logos, numbers or markings. (background: transparent)

### 31. Design lab (/home-lab/) — Hero — container stack (grey)
- **File:** `/images/home/stack-grey.webp`
- **Alt text:** 
- **Composition:** Container in the stacked wall the hanging container lands on (decorative); normalised to the hanging container body ratio 445:1600
- **Prompt:** Straight side view (orthographic) of a single 40-foot steel shipping container in weathered light grey, long side facing camera, corrugated wall, corner castings visible, nothing on top, isolated on a fully transparent background. No text, logos, numbers or markings. (background: transparent)

### 32. Design lab (/home-lab/) — Hero — container stack (white)
- **File:** `/images/home/stack-white.webp`
- **Alt text:** 
- **Composition:** Container in the stacked wall the hanging container lands on (decorative); normalised to the hanging container body ratio 445:1600
- **Prompt:** Straight side view (orthographic) of a single 40-foot steel shipping container in weathered off-white, long side facing camera, corrugated wall, corner castings visible, nothing on top, isolated on a fully transparent background. No text, logos, numbers or markings. (background: transparent)

### 33. Design lab (/home-lab/) — Hero — hanging container door end
- **File:** `/images/home/lab-container-end.webp`
- **Alt text:** 
- **Composition:** Door-end face of the 3D hanging container (visible while it is turned 45°); trimmed to its bounds
- **Prompt:** Straight-on orthographic front view of the door end of a single steel shipping container in weathered coral red, two closed doors with four vertical locking bars, corner castings, isolated on a fully transparent background. No text, logos, numbers or markings. (background: transparent)

## Non-photographic brand assets
| Asset | Path | Source |
|---|---|---|
| Original TLC logo (as downloaded) | `/brand/tlc-logo-original.png` | Original website, unmodified |
| Original TLC logo (web) | `/brand/tlc-logo.png` | Same artwork, transparent margins trimmed only. Used on light backgrounds (header, About card) and in JSON-LD |
| Original TLC logo (white) | `/brand/tlc-logo-white.png` | Generated from `tlc-logo.png` by `scripts/make-white-logo.mjs`: every pixel set to white, alpha from the original's darkness (no redraw, no background). Used on dark backgrounds (footer, design-lab hanging container) |
| Favicon / Apple icon | `src/app/icon.png`, `src/app/apple-icon.png` | Cropped from the original logo's emblem (no redraw) |
| Original About image (truck + plane, TLC logo) | `/images/about/original-truck-plane.webp` | Original website (`Truck-2-2.png`, 570×542), converted to WebP only (kept as source for the cutout below) |
| Original About image, cutout | `/images/about/original-truck-plane-cutout.webp` | Same artwork with the baked-in pink triangle removed by `scripts/cutout-truck-plane.mjs` (truck ground shadow kept); used on the design-lab About card's own pink triangle |
| Original service images (Air, Sea, Road, Project Cargo, Custom Clearance) | `/images/services/original-{air,sea,road,project,customs}.webp` | Original website's service-page banners (`2024/04/air.jpg`, `2024/05/image-29.jpg` (only 370×400 at source), `2024/04/truck.jpg`, `2024/05/88c0b9f6….jpg`, `2024/04/c1.jpg`), resized and converted to WebP by `scripts/process-service-images.mjs`. Used in the design-lab stacked Services section (the homepage's own thumbnails are only 270×150) |
| Clean top-down container ship (transparent) | `/images/home/ship-topdown-clean.webp` | **Higgsfield** `gpt_image_2_6` (high, 2k, `background: transparent`), job `8a3ef307-0840-4490-806a-8c440966c176`, 2688×1152 source → trimmed, 2000×477 WebP via `scripts/process-lab-images.mjs`. Replaces the earlier ship cut-out in the design-lab Shipping worldwide section. Illustrative; no markings |
| Customs-clearance feature photo | `/images/services/customs-focus.webp` | **Higgsfield** `gpt_image_2_6` (high, 2k, 16:9), job `07eaada2-c0f8-4a65-adb6-5ad1a25a69d1`, 2688×1520 source → 2200×1244 WebP. Illustrative (generic hi-vis worker at a container terminal, not a TLC employee). Used in the design-lab In focus section |
| Office map backdrops (Lahore, Dubai) | `/images/maps/lahore.webp`, `dubai.webp` | OpenStreetMap standard tiles (zoom 15, 4×2 tiles each), desaturated/tinted by `scripts/make-office-maps.mjs`. © OpenStreetMap contributors (ODbL) — attribution is shown on each card. Centred on the approximate office locations |
| Service card photos (5) | `/images/services/hf-{air,sea,road,project,customs}.webp` | **Higgsfield** `gpt_image_2_6` (high, 2k, 4:5), jobs `abe25b16-08ed-42ed-a7cc-09903b896a98` (air), `95ab9c74-b6d6-492a-a736-38c694a1f4da` (sea), `a67e4f6f-e48f-4be8-9534-72cca77c3845` (road), `8c04ab98-939f-44c4-8f79-45d19bda20d0` (project cargo), `6bd5cd8e-ff8b-4f10-bb64-bf5bffe29ddd` (customs). 1792×2240 sources → 1000×1250 WebP via `scripts/process-service-photos.mjs`. Replace the earlier original-site banners in the design-lab Services section. A first customs render (job `62e6a08c-206a-4831-89b7-a425823534df`) was rejected for printed text on the vest. Illustrative; no logos |
| About "Our mission" photo | `/images/about/mission-team.webp` | **Higgsfield** `gpt_image_2_6` (high, 2k, 3:2), job `68847551-0109-4a7a-9c5a-8a53cc57d23c` (three logistics professionals planning around a tablet at a container terminal at golden hour; no faces to camera, no logos), 2048×1360 source → 1600×1063 WebP via `scripts/process-lab-images.mjs`. A second candidate (job `dd7bcd6f-d3c5-494c-b042-6c4223ab44cb`) was generated and not used |
| Sea surface strip | `/images/home/sea.webp` | **Higgsfield** `gpt_image_2_6` (high, 2k, 21:9), job `7d2158cf-34db-4cc0-b3ff-1c6c871f6eb3` (top-down sea water, no ship/foam), 2688×1152 source → desaturated, joined to its mirror image so it loops seamlessly, 3200×686 WebP via `scripts/process-water.mjs`. Used behind the ship in the design-lab Shipping worldwide section. A second candidate (job `76ca0ed1-d79c-4b43-b175-e5618037a058`) was generated and not used |
| KPI hover photos (4) | `/images/kpis/{years,countries,associates,clients}.webp` | **Higgsfield** `gpt_image_2_6` (high, 2k, 4:5), jobs `ad2b7cd1-280e-4755-87a1-5e595c5857d7` (20+ years: senior logistics manager with paperwork), `3e6aac17-cb44-4888-96af-f376b87545c4` (30+ countries: container ship leaving port at sunrise), `6d5fe0ad-b303-49d6-8fd4-31852c16a63e` (80+ associates: handshake at a container yard), `f7b3f176-655a-4879-b56b-8d4854139e93` (100+ clients: delivery handover at a loading dock). 1792×2240 sources → 900×1125 WebP via `scripts/process-kpi-images.mjs`. Illustrative, no faces to camera, no logos. Used in the design-lab In numbers section |
| Association membership logos (WCA World, PPL, FNC, ACAAP, PIFFA, FIATA, JCtrans) | `/images/partners/*.webp` | Original website (`Partners-01.jpg`…`Partners-06.jpg`, `Partners-7.jpg`, 900×500 each). White background removed and trimmed by `scripts/process-partner-logos.mjs` (colours un-blended from white, artwork unchanged). Used in the Global association memberships section |
| Specialized Industries tile images (15) | `/images/industries/original-*.webp` | Original website (`2024/04/Textile.jpg` … `Pharmaceutical.jpg`, 500×342 each), converted to WebP by `scripts/fetch-industry-images.mjs`. Used for the hover reveal in the design-lab Specialized Industries section |
