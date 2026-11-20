# Original Website Audit — thelogisticco.com

Audit date: 2026-11-19
Method: live crawl of `https://thelogisticco.com/` (WordPress), its `wp-sitemap.xml`, the WP REST API page/post lists, and rendered HTML for every page in the primary navigation.
Theme: "Fastrans" WordPress theme by ThemeXriver (Elementor + Revolution Slider + Contact Form 7 + Click-to-Chat WhatsApp).

---

## 0. Critical findings (action required by the business)

1. **The live site is compromised with injected SEO spam.** Every crawled page carries a hidden block of roughly 150 outbound links to gambling, "hacklink" backlink sellers, adult sites, IPTV and gift-card scams (anchor texts like "Hacklink panel", "jojobet giriş", "vdcasino" and others). This is a typical WordPress compromise. **None of it is carried into the redesign.** We recommend:
   - Treating the WordPress install as compromised: rotate all admin/hosting/database passwords, audit plugins (notably the outdated Revolution Slider) and theme files, and restore from a clean backup or retire the install once the new site is live.
   - Requesting a Google Search Console security review after cutover.
2. **Most secondary content is unedited theme demo content.** The team members, testimonials, projects, blog/news posts, pricing plans, shop products and several "service" posts are the theme's lorem-ipsum placeholders. Some even link to the theme author's demo domain (`themexriver.com/wp/fastrans/...`). These are **not verified business facts** and are excluded (see §6).
3. **No SEO metadata.** No page has a meta description, Open Graph tags or structured data. Titles follow `"<Page> – The Logistic Co"`.

---

## 1. Sitemap and navigation hierarchy (verified, in use)

Primary navigation (header):

```
Home                         /
About                        /about/
Services (dropdown, no page)
 ├─ Air Freight              /air-freight/
 ├─ Sea Freight              /sea-freight/
 ├─ Road Transport           /road-transport/
 ├─ Project / Heavy Lift     /project-heavy-lift-cargo/
 ├─ Custom Clearance         /custom-clearance/
 └─ Specialized Industries   /specialized-industries/
FAQ's                        /our-faqs/
Contact                      /contact/
[CTA] Get a Quote            → /contact/
```

Footer:

- Company blurb (same paragraph as home intro)
- Quick Links: Home, About, Our Services (`/our-services/`), Contact
- Our Services: Air Freight, Sea Freight, Road Transport, Project Cargo, Custom Solutions (these link to theme demo `/service/...` posts)
- Contact: +92 300 8493977, +971 42 666476, sajid@thelogisticco.com
- WhatsApp chat widget (number 923008493977)

### Pages in WordPress that are NOT in navigation (theme demo / unused)

`/home-page-01/` … `/home-11-one-page/` (15 demo home variants), `/our-services/` (demo grid), `/our-team/`, `/our-projects/`, `/project-details/`, `/pricing-plan/`, `/our-news/`, `/coming-soon/`, `/real-time-tracking/`, `/transparent-pricing/`, `/trusted-franchise/`, `/warehoues-storage/`, `/shop/`, `/cart/`, `/checkout/`, `/my-account/` (+ `-2` duplicates), `/sample-page/`, ten demo team-member pages (`/john-doe/`, `/keith-smith/`, …), 21 demo blog posts (2021–2022), 23 `/service/*` posts, 21 `/project/*` posts, 14 `/testimonials/*`, 14 `/faqs/*`, 6 WooCommerce demo products.

**Redesign decision:** rebuild every page in the primary navigation at its exact URL, rebuild `/our-services/` as a real services index (it is linked from the footer), and redirect legacy/demo URLs that may hold link equity (see §9).

---

## 2. Page-by-page content

### 2.1 Home `/`
- `<title>`: "The Logistic Co – To deliver excellence in global freight forwarding"
- Hero: Revolution Slider (images only, no recoverable copy).
- **Global Association Memberships**: logo strip (see §5).
- **20+ Years** — "We have more than [20] years of experience".
- **H2** "Trusted Freight Forwarding, clearance and Logistics Partner Company"
  > We are honored to present ourselves as esteemed leaders in the realm of worldwide freight and logistics, coupled with strong custom clearance services, proudly serving as your local team of supply chain experts across Pakistan and United Arab Emirates. At The Logistic Company, we play a vital role in shaping the national freight forwarding and logistics industry, backed by resilient legacy of custom clearance that has stood the test of time.
- **Mission**: "To deliver excellence in global freight forwarding through a team of passionate experts and customer centric professionals."
- **Vision**: "To become a partner of choice in freight forwarding industry by providing sustainable solutions and a customer driven experience."
- Services teaser ("We are optimists who love to work together."): Air Freight — reliable air cargo solutions for swift global delivery; Sea Freight — efficient ocean freight services for secure international shipments; Road Transport — seamless road logistics ensuring timely deliveries nationwide; Project Cargo — tailored solutions for safe handling of specialized shipments; Custom Clearance — expert services for smooth import and export processes.
- **Specialized Industries** (15): Textile, Engineering, Steel Industry, Ceramic & Tiles, Oil & Gas, Medical Equipment, Heavy Lifts, SOC Handling, Food & Beverages, Automobile, Power & Energy, Wholesale & Retail, Repair & Return, Construction (& Infrastructure), Pharmaceutical. Intro: "Our expertise ensures seamless supply chain management and reliable solutions for your unique industry needs."
- **Counters**: 30+ Operational Countries · 80+ Global Business Associates · 100+ Long Term Clients · 20+ Business Operating Years. *(Also on the About page, so treated as verified.)*
  - Also present on Home only: 25K Parcel Delivered · 300+ Total Branch · 500K Satisfied Clients · 2M Delivered Packages. **These are the theme's default demo counters** (they contradict "100+ long term clients" and a two-office footprint) → **excluded as unverified.**
- **"We Aim to Contribute Well to Your Company"**: Fast Transportation Service; Safety and Reliability; Shipping Worldwide (copy in §3).
- Team, testimonials, projects, "Request a quick quote" (lorem copy) and news are theme demo → excluded.

### 2.2 About `/about/`
Full company statement (verified, used as source copy):
> …At the core of The Logistics Company lies a mission that is both straightforward and impactful: to deliver unparalleled global freight forwarding services. However our vision surpasses the conventional; we aspire to be your preferred partner by offering innovative and sustainable solutions. The commitment is further underpinned by a customer-centric approach, all meticulously executed by a team that genuinely cares and own the commitments. **Our values, innovation, integrity and ownership** stand as the guiding pillars of our operations. As we consistently uphold standards of excellence, we are eager about the prospect of forging a meaningful business partnership with you. At The Logistic Company we seamlessly bridge the gap between ambition and achievement, ensuring that our commitments are not merely made but delivered with sustainability.

- "Global Freight & Logistics Solutions — Offering unparalleled global freight and logistics solutions, including robust custom clearance services, with a dedicated team of supply chain experts."
- "Celebrate excellence in logistics": Shipping Worldwide / Safety and Reliability / Fast Transportation Service.
- Counters: 30+ / 80+ / 100+ / 20+.
- Testimonials block = demo → excluded.

### 2.3 Air Freight `/air-freight/`
Intro: comprehensive range of air freight services… airport to airport or door to door.
Sub-services: **Airport to Airport**, **Door to Door**, **Consolidation**, **Cross Trade**, **Dangerous Goods**, **Courier** (same-day / next-day), **Charter Services** (dedicated aircraft for oversized or time-sensitive cargo), **Temperature Controlled Cargo** (pharmaceuticals, perishables, chemicals).

### 2.4 Sea Freight `/sea-freight/`
Sub-services: **Port to Port**, **Door to Door**, **FCL / LCL**, **Dangerous Goods**, **Cross Trade**, **Reefers**, **Project Cargo**, **Vessel Charter** (full or part vessel; bulk goods, heavy machinery).

### 2.5 Road Transport `/road-transport/`
Sub-services: **Full Truck Loads (FTL)**, **Less Truck Loads (LTL)**, **Urgent Deliveries**, **Temperature Controlled Vehicles**.

### 2.6 Project / Heavy Lift Cargo `/project-heavy-lift-cargo/`
Sub-services: **On-site Survey**, **Crating and Lashing**, **Customs and Project Documentation**, **Break Bulk Cargo Handling**, **Heavy Lift Cranes and Trucking**.

### 2.7 Custom Clearance `/custom-clearance/`
Title: "Professional Custom Clearance Services".
Sub-services: **Import Customs Declaration**, **Export Custom Declarations**, **Goods Handling in Bonded Stocks**, **Customs Warehousing Handling SRO Benefits** (SRO = Statutory Regulatory Order; duty deferment, tax benefits), **Same Day Clearance and Delivery**.

Each service page closes with "How it works? — Choose our … services … Contact us today to learn more or to request a quote." (No actual process steps were published.)

Each service page sidebar also shows "24/7 ONLINE SUPPORT — Get immediate quotes & book shipment" and "Download Now: Company Report 2020 / 2021". These are theme widgets; the report links are dead demo files and "24/7" is not stated anywhere else → **excluded as unverified.**

### 2.8 Specialized Industries `/specialized-industries/`
The 15 industries listed in §2.1 (titles only — no per-industry descriptions exist), plus the three strengths (Shipping Worldwide, Safety and Reliability, Fast Transportation Service).

### 2.9 FAQ `/our-faqs/` — "Discover Frequently Asked Questions from Our Support"
| Question | Answer (verified) |
|---|---|
| What is the estimated delivery time for shipments? | Delivery times vary depending on the mode of transport, distance, and specific requirements of your shipment. We strive to provide accurate delivery estimates when you request a quote. |
| What documentation is required for international shipments? | A commercial invoice, packing list, bill of lading or airway bill, and any other relevant documents specific to the shipment. |
| Can you provide tracking for my shipment? | Yes, we offer tracking services for your shipments. You can track your shipment online or contact our customer service team for updates. |
| What services do you offer? | Air freight, sea freight, road transport, custom clearance, and project cargo handling. |
| How can I request a quote? | By contacting customer service via phone or email, or by filling out the request form on the website. |
| Do you offer door-to-door delivery? | Yes. |
| How do you handle project cargo? | Tailored solutions for large-scale or complex shipments, including planning, coordination, and execution… *(answer truncated on the live site)* |
| Do you offer insurance for my shipments? | Yes, insurance options are offered to protect goods during transit. |
| How can I contact your customer service team? | Via phone or email. |
| How do you ensure the safety of my goods? | Strict safety protocols, high-quality packaging materials, and an experienced team that monitors shipments… *(truncated on the live site)* |
| Where are you located? | Lahore, Pakistan, and Dubai, UAE. |
| What types of goods can you transport? | General cargo, perishable items, hazardous materials, oversized and overweight items, and project cargo. |
| What is the process for custom clearance? | The team handles documentation, inspections, and fees for a smooth and efficient clearance. |
| What are your standard shipping rates? | Rates vary by service, distance and type of goods; contact the team for a detailed quote. |

Note: the FAQ says "track your shipment online", but **no online tracking tool exists on the site**. The redesign keeps the answer limited to "contact our team for shipment updates" and flags the online tracking tool as a missing dependency.

### 2.10 Contact `/contact/` — "Get in Touch And We'll Help Your Business"
- **Lahore office**: 350-A, Shadman Colony 1, Jail Road, Lahore, Pakistan
- **Dubai office**: Office #207-13, 2nd Floor, The Atrium Center, Khalid Bin Waleed Road, Bur Dubai, UAE
- **Phone**: +92 300 8493977 (Pakistan) · +971 42 666476 (UAE)
- **Email**: sajid@thelogisticco.com
- **WhatsApp**: +92 300 8493977
- Form "Get a Quote / Book An Appointment" (Contact Form 7): Name*, Email, Affiliation, Number, Inquiry Department, Date, Message.

---

## 3. Verified strengths copy
- **Fast Transportation Service** — swift and efficient transportation solutions ensure goods reach their destination on schedule.
- **Safety and Reliability** — steadfast commitment to safety protocols and reliable logistics practices; secure handling and delivery.
- **Shipping Worldwide** — from local deliveries to global shipments, an extensive network navigating international borders.
- **Values** — Innovation, Integrity, Ownership.

## 4. Company facts (verified)
| Fact | Source |
|---|---|
| Name: The Logistic Company (short: The Logistic Co, TLC) | Logo, titles |
| Freight forwarding, customs clearance and logistics | Home, About |
| Markets: Pakistan and United Arab Emirates | Home, About |
| Offices: Lahore and Dubai (Bur Dubai) | Contact, FAQ |
| 20+ years of operation | Home, About |
| 30+ operational countries | Home, About |
| 80+ global business associates | Home, About |
| 100+ long-term clients | Home, About |
| Association memberships (logos) | Home |

## 5. Brand assets
- **Logo** (`HHEHEHE-1024x492-1.png`): globe outline with a blue-violet orbit swoosh, "TLC" monogram in red, wordmark "The" (charcoal) "Logistic" (coral red, rounded geometric sans) "Company" (blue-violet, bold italic serif). Saved to `public/brand/tlc-logo-original.png`.
- **Brand colours** (sampled from the logo): coral red `#E0524A`, blue-violet `#4F5BD5`, charcoal `#333333`.
- **Global Association Memberships** (logo strip on home): **WCA World**, **PPL** (PPL Middle East Meet 2017 badge), **FNC — Freight Network Corporation** ("Certified Member"), **ACAAP**, **PIFFA**, **FIATA**, **JCtrans**. The redesign lists these names as typography (no third-party logos reproduced); membership numbers or dates were not published.
- Photography on the live site is theme demo / stock imagery and is not reused.

## 6. Excluded as unverified or demo content
- Team members (John Doe, Johnny Watson, Keith Smith and seven others)
- Testimonials (John Doe, Jane Salima, Steve Powers, Erin Chang, …) — **no real client testimonials exist**
- Projects/case studies (21 demo posts, some echoing real-sounding titles like "CT scanner from Italy to the UK")
- Blog/news posts (21 demo posts, lorem ipsum)
- Counters 25K / 300+ / 500K / 2M
- Pricing plans, shop products, "Coming soon", "Real-time tracking", "Transparent pricing", "Trusted franchise", "Warehouse storage" demo pages
- "24/7 online support", "Company Report 2020/2021" downloads
- Rail freight, train freight, cars freight, warehousing as standalone services (demo `/service/*` posts only — not in navigation). Warehousing appears only as **customs/bonded warehousing** under Custom Clearance.

## 7. Forms
| Form | Location | Fields | Backend |
|---|---|---|---|
| Quote / appointment | `/contact/` | Name*, Email, Affiliation, Number, Inquiry Department, Date, Message | Contact Form 7 (WordPress mail) |
| Quick quote | Home | Name, Subject, Email, Phone, Message | Contact Form 7 |

The new site provides one validated quote/contact form (`/contact/`) posting to a Next.js route handler. **Missing dependency:** an email delivery provider (e.g. SMTP or Resend) and the destination inbox must be configured via environment variables — see `README.md`. Until then, submissions fall back to the WhatsApp/email links shown beside the form.

## 8. SEO metadata on the live site
- Titles only (`<Page> – The Logistic Co`), canonical URLs present.
- No meta descriptions, OG/Twitter tags, structured data, or a robots/sitemap strategy beyond WP defaults.

## 9. URL preservation and redirects
All navigation URLs are preserved with trailing slashes (`trailingSlash: true`). Redirects (301) added for legacy URLs:

| Legacy | Target |
|---|---|
| `/index.php/:path*` | `/:path*` |
| `/service/air-freight/`, `/service/air-freight-service/` | `/air-freight/` |
| `/service/sea-freight/`, `/service/sea-freight-2/`, `/service/sea-transportation/` | `/sea-freight/` |
| `/service/road-transport/`, `/service/road-transportation/`, `/service/transportation/` | `/road-transport/` |
| `/service/project-cargo/` | `/project-heavy-lift-cargo/` |
| `/service/custom-clearance/`, `/service/custom-solutions/` | `/custom-clearance/` |
| `/service/:slug/` (others) | `/our-services/` |
| `/faqs/:slug/` | `/our-faqs/` |
| `/our-team/`, `/our-projects/`, `/project/:slug/`, `/team/:slug/`, `/testimonials/:slug/` | `/about/` |
| `/our-news/`, `/pricing-plan/`, `/coming-soon/`, `/shop/`, `/cart/`, `/checkout/`, `/my-account/` | `/` |

## 10. Content gaps to be supplied by the business
- Real photography of offices, staff, fleet or operations (current imagery is illustrative, AI-generated via Higgsfield — see `image-asset-manifest.md`)
- Founding year and company history/milestones
- Named leadership / team
- Genuine client testimonials (with permission)
- Membership IDs/years for WCA, FNC, FIATA, PIFFA, etc.
- Social media profiles (none published apart from WhatsApp)
- Privacy policy / terms (none exist; recommended before collecting form data at scale)
- Per-industry descriptions for the 15 specialized industries
- Real "how it works" process steps per service
- Online shipment tracking (mentioned in FAQ, not implemented)
