# Design Reference Analysis & Design Strategy

Reviewed on 2026-11-19 in a live browser. Go Uncharted and Folvex are the primary references; the other five are secondary. No template is copied: below are the patterns taken from each and how they are adapted for The Logistic Company (TLC).

---

## 1. Reference teardown

### Primary: Go Uncharted (gouncharted.framer.website): storytelling and atmosphere
| Observed pattern | Adaptation for TLC |
|---|---|
| Full-bleed photographic hero with an uppercase, heavy headline anchored **bottom-left** and a short justified paragraph bottom-right | Home hero: container vessel at dusk, headline bottom-left, intro paragraph and CTAs bottom-right. Text sits in space we planned into the image. |
| Floating, compact **dark pill navigation** centred at the top (MENU · name · CTA) | A floating ink pill nav with the TLC wordmark, a "Menu" trigger and a red "Get a Quote" button. It opens a full-screen editorial menu. |
| Warm off-white "paper" canvas and long light-weight editorial sentences ("Where the light, the season and the road…") | A bone `#F2EEE7` canvas. The company introduction is set as one oversized, light-weight sentence with key words in ink and the rest in stone grey. |
| Small **monospace metadata labels** ("GETTING THERE", "THE JOURNAL") | Monospace eyebrows with section indexes: `01 — WHO WE ARE`, `MODE / AIR`. |
| Destination cards with **metadata chips** over the photo (Country · Season · Nights) | Service features carry chips such as `AIR` · `8 SERVICES` · `PK ⇄ UAE ⇄ WORLD`. They show structure without made-up numbers. |
| Full-bleed image with a **ruled metadata strip** (Window / Nights / Group / Why this week) | "Global connectivity" band: a full-bleed terminal image with a ruled strip of verified facts (30+ countries · 80+ associates · 2 offices · 20+ years). |
| Testimonials as a **numbered list with one active item**, the rest faded | Used for **Why choose us** and the **FAQ**: numbered rows, the active row in ink and the rest faded. No invented testimonials. |
| Sparse text, large imagery, generous negative space | Each section makes one statement, with a lot of air between sections (`py-28 → py-44`). |

### Primary: Folvex (folvex.framer.website): typography, layouts and interactions
| Observed pattern | Adaptation |
|---|---|
| **Giant condensed uppercase** type (Bebas-style) used as graphic texture | Archivo at condensed width (`wdth 62`), weight 800, for display headlines and numbers. |
| **Rotated, opposing-direction marquees** ("UI/UX · DESIGN · DEVELOPMENT") | Two counter-scrolling, slightly rotated marquees of verified modes: `AIR FREIGHT · SEA FREIGHT · ROAD TRANSPORT · PROJECT CARGO · CUSTOM CLEARANCE`. They pause under `prefers-reduced-motion`. |
| Section labels in **parentheses**: "(About)", "(Services)" | Parenthetical labels alongside the monospace index: `(Services)`, `(Industries)`. |
| Services as **interactive rows**: hovering reveals an image | Home service list: large condensed rows. Hover on desktop shows a cursor-following image preview. On touch devices the images display inline, so nothing depends on hover. |
| Stacked full-width work images with title and date beneath | Service pages: a stacked image followed by the sub-service index. |
| Black testimonial band, big "LET'S BUILD TOGETHER" CTA with floating images | An ink CTA band, "LET'S MOVE / YOUR CARGO", with parallax images drifting around the headline. |
| Dark footer with a large "HAVE ANY PROJECT IDEA? SAY HELLO →" | An ink footer with an oversized "Ship with TLC →", contact columns and a giant wordmark cut off at the bottom edge. |

### Secondary references
| Reference | Pattern taken | Use |
|---|---|---|
| **Shelta** | Stats as large numerals over a thin rule with a caption; corporate restraint | Credibility section: four verified numbers on hairline rules with a count-up animation that runs once and respects reduced motion. |
| **Tripleo** | A category bar docked to the bottom of the hero; photography-first storytelling | Home hero: a five-mode tab bar docked to the bottom edge that links to each service. |
| **Nomia** | Two-tone sentence (ink and grey) and polished small UI | Two-tone editorial sentences on Home and About. |
| **Travelo** | Grouped content and simple, obvious CTAs | Contact page: grouped office cards and a single clear CTA. |
| **Car Dealership** | Luxurious dark product tiles with an image and label overlaid bottom-left; moody, low-key photography | Industries grid: dark image tiles, with labels overlaid bottom-left and a hover zoom. The overall photographic grade is low-key. |

---

## 2. Visual identity: "Cargo Editorial"

**Personality:** premium, global, confident, cinematic, trustworthy.
**Idea:** freight told as an editorial journal. The photographs carry the scale, the type carries the confidence, and monospace metadata carries the operational precision.

### Colour (refined from the logo)
| Token | Hex | Role |
|---|---|---|
| `ink` | `#0D111C` | Primary text, dark sections; a navy-black blend of the logo's charcoal and blue |
| `paper` | `#F2EEE7` | Main canvas (warm bone) |
| `paper-2` | `#E8E2D7` | Alternate bands and image placeholders |
| `stone` | `#6E6A62` | Secondary text on paper (≥ 4.5:1) |
| `line` | `#D6CFC2` | Hairlines on paper |
| `signal` | `#E0523F` | Brand coral red, used for CTAs, active states and the index dot. On paper it is reserved for large text and UI elements; on ink it is used freely |
| `signal-deep` | `#B93A2A` | Red text on paper (AA) |
| `indigo` | `#4D57C8` | The logo's blue-violet, used rarely: links in body copy and focus rings |

No gradients except dark photo scrims for legibility.

### Typography
- **Archivo** (variable, width axis), with three settings:
  - *Display Condensed*: `wdth 62`, weight 800, uppercase, tracking −0.01em, line-height 0.86 (Folvex energy)
  - *Editorial*: `wdth 100`, weight 300–400, sentence case, tracking −0.035em (Go Uncharted sentences)
  - *Body*: `wdth 100`, weight 400, 17–19px, line-height 1.6
- **IBM Plex Mono**, 11–12px uppercase, tracking 0.08em, for labels, metadata and indexes.
- Fluid scale using `clamp()`. Display sizes run 3.5rem to 13rem.

### Layout principles
- A 12-column grid with a 20/32/48px gutter scale and a max width of 1680px. Display type is allowed to run edge to edge.
- Asymmetric splits (5/7, 4/8) and deliberate offsets. Uniform three-column card grids are avoided.
- Corners are square or nearly square (2px). The only rounded elements are the floating nav pill and the buttons.
- Every section opens with a mono index label (`01 — (About)`).

### Motion guidelines
- **GSAP + ScrollTrigger** handles scroll reveals, the image clip reveal, parallax, the count-up and the hover preview. No scroll hijacking and no smooth-scroll library.
- **CSS** handles marquees, button hovers and image hover scale.
- Durations are 0.6–1.2s with `expo.out` / `power3.out` easing. Stagger is at most 0.08s.
- Text reveal: lines slide up from a masked baseline. Used on hero and section headlines only.
- Image reveal: `clip-path inset` from the bottom with a slight scale from 1.15 to 1.
- Parallax: at most ±8% translate, and only on decorative images.
- `prefers-reduced-motion`: every GSAP timeline is skipped (`gsap.matchMedia`), marquees stop, and content is visible by default. Animations only enhance content that is already rendered, so they cause no layout shift.
- Cleanup: every hook uses `gsap.context()` / `useGSAP` and reverts on unmount.

### Component plan
`SiteHeader` (floating pill + full-screen menu), `SiteFooter`, `Marquee`, `SectionLabel`, `RevealText`, `RevealImage`, `Parallax`, `CountUp`, `ServiceRows` (hover preview), `MetaChips`, `NumberedList`, `FaqList` (accessible disclosure), `PageHero` variants (`full`, `split`, `type-led`), `CtaBand`, `QuoteForm`, `IndustryGrid`, `MembershipStrip`, `Button`.
Content lives in `src/content/*.ts` (company, services, industries, faqs). Pages are Server Components, and only the motion and interactive pieces are client components.

### Page inventory and per-page art direction
| URL | Hero variant | Signature section |
|---|---|---|
| `/` | Full-bleed cinematic, mode bar docked | Hover service rows, counter-marquee, connectivity strip, numbered strengths, ink CTA |
| `/about/` | Type-led: giant "SINCE 20+ YEARS" crop, then a wide image | Two-tone manifesto, mission/vision split, values as oversized words, memberships |
| `/our-services/` | Type-led list of five modes with large numerals | Alternating full-width image features |
| `/air-freight/`, `/sea-freight/`, `/road-transport/`, `/project-heavy-lift-cargo/`, `/custom-clearance/` | Split hero (portrait image plus condensed title). Each service gets its own image and accent chip | Numbered sub-service index (sticky image on desktop), "Other services" rail, CTA |
| `/specialized-industries/` | Wide image with a ruled strip | Car-dealership-style dark tile mosaic of 15 industries |
| `/our-faqs/` | Minimal type hero | Numbered disclosure list with one item open |
| `/contact/` | Split: image and offices | Two office "cards" as ruled columns, quote form, WhatsApp/phone/email |

---

## v2 revision (2026-11-19): closer to Go Uncharted

At the client's request, the second pass follows Go Uncharted's design language much more closely and makes the site cleaner, with more motion. The content stays original and is drawn only from verified business facts.

| Go Uncharted pattern | v2 implementation |
|---|---|
| Compact dark bar (MENU · name · CTA) that **expands downward** into a menu panel with large links and mono descriptors | `SiteHeader`: frosted ink bar with a GSAP height animation and staggered links. Escape and click-outside close it, and the active page is marked with a dot |
| Wide, heavy uppercase hero lines anchored bottom-left; short paragraph and light button bottom-right; ruled strip with location and social links | Home and every inner hero (`ImageHero`): `font-display` (Archivo wdth 104 / 750), slow zoom-out on load, parallax drift on scroll, bottom metadata strip |
| Large regular-weight manifesto sentence; mono footnote; outline button | `WordReveal`: words brighten from faint to full ink as you scroll (scrubbed) |
| Beige partner tiles in a marquee | `MembershipMarquee`: the seven verified association memberships as name tiles |
| Destination cards: big photo, **glass chips**, uppercase title, one line, "View destination" | `ServiceCard` in an asymmetric grid: chips (mode · N services · door to door), image settles from a zoom on scroll, arrow tile rotates on hover |
| "Fly in from anywhere": a plane crosses the text on scroll | `ShipCrossing`: a Higgsfield-generated top-down container ship (transparent cutout) sails across "Moving cargo across 30+ countries." (scrubbed, no pinning) |
| "In focus" full-bleed photo with a metadata strip | Customs clearance In Focus band (declarations, bonded, SRO, same-day) |
| Journal list with numbers on the right | Specialised industries index |
| "In their words": active item in ink, others faded, sticky image and pager | `ActiveList` for strengths and values. **There are no testimonials, because none are verified** |
| Centred "Questions, answered" and numbered accordion | `Accordion` with smooth grid-rows animation and full ARIA |
| CTA and footer over one full-bleed photograph | `SiteFooter` |
| Rectangular buttons with a square arrow tile | `.btn` system: the arrow slides out and back in on hover |

New site-wide utilities: a **floating WhatsApp button** (expands with a label on hover; pre-filled message) and a **back-to-top button** with a coral scroll-progress ring. Both respect reduced motion.

Palette v2: warmer paper `#F3EFE8`, beige tiles `#EBE5DB`, ink `#12151D`. Coral is now an accent only (active states, progress ring, small dots), which keeps the page cleaner.
