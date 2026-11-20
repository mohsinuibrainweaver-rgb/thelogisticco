# The Logistic Company: website

A redesign of [thelogisticco.com](https://thelogisticco.com/) built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and GSAP.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## Environment variables

Create `.env.local` (never commit it):

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical origin for metadata, sitemap and JSON-LD. Defaults to `https://thelogisticco.com`. |
| `RESEND_API_KEY` | for the form | API key for [Resend](https://resend.com), the email delivery service. Server-side only. |
| `QUOTE_TO_EMAIL` | for the form | Inbox(es) that receive quote requests. Comma-separated. |
| `QUOTE_FROM_EMAIL` | for the form | Verified sender, e.g. `TLC Website <web@thelogisticco.com>`. |

**Missing dependency:** until the three form variables are set, `POST /api/quote/` returns `503 not_configured`. The form then gives the visitor the same message pre-filled for email, plus a WhatsApp link, so no enquiry is lost. To connect delivery, verify the sending domain in Resend and set the variables in your hosting provider.

## Project structure

```
src/
  app/                      # Routes. Original URLs are preserved (trailingSlash: true)
    page.tsx                # Home
    about/ our-services/ air-freight/ sea-freight/ road-transport/
    project-heavy-lift-cargo/ custom-clearance/ specialized-industries/
    our-faqs/ contact/      # Inner pages
    api/quote/route.ts      # Quote form endpoint
    sitemap.ts robots.ts icon.png apple-icon.png not-found.tsx template.tsx (page transitions)
  content/                  # Verified business content: edit copy here, not in components
    site.ts services.ts industries.ts faqs.ts
  components/
    layout/                 # SiteHeader (always-visible bar: contact strip, all links, Services dropdown), SiteFooter (CTA over image), FloatingActions (WhatsApp + back-to-top)
    motion/                 # GSAP primitives: Reveal, MaskLines, WordReveal, RevealImage, ScrollZoom, HeroMedia, ShipCrossing, Parallax, CountUp
    sections/               # ImageHero, ServiceCard, ServicePage, ActiveList, Accordion, Shared (stats, memberships), QuoteForm
    ui/                     # Button, Marquee, SectionLabel, Logo (original TLC logo)
    seo/JsonLd.tsx
  lib/                      # seo.ts (per-page metadata), schema.ts (JSON-LD), quote.ts (validation)
public/images/              # Higgsfield-generated WebP photography (see docs/image-asset-manifest.md)
public/brand/               # Original logo
scripts/                    # Image pipeline: plan, fetch/optimise, manifest builder, contact sheet
docs/                       # Content audit, design analysis, image manifest
```

## Motion and accessibility

- Content is fully rendered on the server. Animations only enhance it: a small inline script pre-hides reveal targets when motion is allowed, and a CSS fallback reveals them after 2.5s if JavaScript fails.
- `prefers-reduced-motion: reduce` disables every GSAP timeline (through `gsap.matchMedia`) and stops the marquees.
- There is no scroll hijacking or smooth-scroll library. ScrollTrigger is used only for reveals, parallax and one-time counters, and every hook cleans up through `useGSAP` / `mm.revert()`.
- Hover-only interactions (the service image preview) are limited to fine pointers. Touch devices show the images inline instead.
- The header is fixed and never hides. All primary links are visible on desktop. The Services dropdown and the mobile menu are disclosures (`aria-expanded`/`aria-controls`) that close on Escape, on click-outside and on route change.
- The floating WhatsApp and back-to-top buttons are labelled controls. Back-to-top is removed from the tab order until it is shown, and it scrolls instantly under reduced motion.
- Dev note: the scaffold's Turbopack CSS rule does not always hot-reload newly used Tailwind classes. If styles look stale in `npm run dev`, restart the dev server.

## SEO

- Every page has its own title, description, canonical URL, Open Graph and Twitter tags (`src/lib/seo.ts`).
- JSON-LD covers Organization (both offices), Service with offer catalogue, FAQPage and BreadcrumbList.
- `sitemap.xml` and `robots.txt` are generated.
- Legacy WordPress URLs redirect permanently to the new pages (`next.config.ts`; see the audit §9).

## Docs

- `docs/original-website-audit.md`: crawl of the original site, the verified facts, what was excluded and why, and the content gaps. **The live WordPress site is compromised with injected SEO spam; see §0.**
- `docs/design-reference-analysis.md`: patterns taken from the seven references, and the design system.
- `docs/image-asset-manifest.md`: every image's prompt, Higgsfield job ID, path, dimensions and status.

## Design lab

`/home-lab/` (`src/app/home-lab/page.tsx`) is a working copy of the landing page for trying new designs.

- It is hidden from search engines (`noindex, nofollow`, disallowed in `robots.txt`), left out of the sitemap and navigation, and its canonical URL points to `/`.
- A "Design lab · not live" badge marks the page; remove it when porting a design back.
- Shared components (ServiceCard, ActiveList, Accordion, header, footer…) are used by both pages. To change one only for the lab, copy it into `src/app/home-lab/_components/` and import the copy there.
- When a design is approved, port the changes into `src/app/page.tsx`.
