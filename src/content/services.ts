// Verified service content (source: original service pages, see docs/original-website-audit.md §2.3–2.7).

export type SubService = { title: string; body: string };

export type Service = {
  slug: string;
  href: string;
  index: string;
  name: string;
  short: string;
  mode: string;
  headline: [string, string];
  tagline: string;
  intro: string;
  closing: string;
  image: { src: string; alt: string };
  /** Portrait photograph used on the site's cards and page heroes (Higgsfield, scripts/process-service-photos.mjs). */
  photo: { src: string; alt: string };
  detailImage: { src: string; alt: string };
  subServices: SubService[];
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "air-freight",
    href: "/air-freight/",
    index: "01",
    name: "Air Freight",
    short: "Reliable air cargo solutions for swift global delivery.",
    mode: "Air",
    headline: ["Air", "Freight"],
    tagline: "When time is the cargo.",
    intro:
      "A comprehensive range of air freight services designed for efficient, on-time delivery of your cargo — whether you are shipping airport to airport or need complete door-to-door service.",
    closing:
      "Choose our air freight services for reliable, efficient transportation tailored to your specific needs. Contact us to learn more or to request a quote.",
    image: { src: "/images/services/air-freight.webp", alt: "Cargo aircraft with its nose door raised being loaded on an airport apron at night" },
    photo: { src: "/images/services/hf-air.webp", alt: "Cargo aircraft with its nose door raised being loaded with palletised cargo at blue hour" },
    detailImage: { src: "/images/services/air-freight-detail.webp", alt: "Netted air cargo pallets on a roller deck in a cargo terminal at dusk" },
    subServices: [
      { title: "Airport to Airport", body: "For customers who prefer to handle their own customs clearance and delivery — efficient transportation of your cargo between major airports worldwide, fast and reliable." },
      { title: "Door to Door", body: "We handle every aspect of the shipment, from collecting your cargo at origin to delivering it directly to its final destination — saving you time and effort." },
      { title: "Consolidation", body: "Combine multiple smaller shipments into one larger consignment to reduce costs and streamline logistics — ideal for maximising efficiency and lowering shipping spend." },
      { title: "Cross Trade", body: "Ship cargo directly from one foreign country to another without transiting through your home country, saving both time and money." },
      { title: "Dangerous Goods", body: "Hazardous materials require specialised handling. Our team manages dangerous goods according to international regulations for safe, compliant transport." },
      { title: "Courier", body: "Fast, reliable transport of small packages and documents, with same-day or next-day options for urgent shipping needs." },
      { title: "Charter Services", body: "Dedicated aircraft and personalised service for specialised, large-scale, oversized or time-sensitive cargo." },
      { title: "Temperature Controlled Cargo", body: "Safe transport of temperature-sensitive goods such as pharmaceuticals, perishable food and chemicals, with precise control of the environment throughout." },
    ],
    seoTitle: "Air Freight Services — Airport & Door to Door",
    seoDescription:
      "Air freight from Pakistan and the UAE: airport-to-airport, door-to-door, consolidation, cross trade, dangerous goods, courier, charter and temperature-controlled cargo.",
  },
  {
    slug: "sea-freight",
    href: "/sea-freight/",
    index: "02",
    name: "Sea Freight",
    short: "Efficient ocean freight for secure international shipments.",
    mode: "Sea",
    headline: ["Sea", "Freight"],
    tagline: "Port to port. Door to door.",
    intro:
      "Sea freight services tailored to your shipping needs — port-to-port or door-to-door — for reliable and efficient transportation of your cargo across the globe.",
    closing:
      "Choose our sea freight services for reliable, efficient transportation tailored to your specific needs. Contact us to learn more or to request a quote.",
    image: { src: "/images/services/sea-freight.webp", alt: "Container ship at a quay being worked by gantry cranes in late-afternoon light" },
    photo: { src: "/images/services/hf-sea.webp", alt: "Container ship at a quay being worked by gantry cranes in golden light" },
    detailImage: { src: "/images/services/sea-freight-detail.webp", alt: "Refrigerated reefer containers plugged in at a port terminal" },
    subServices: [
      { title: "Port to Port", body: "Cost-effective, efficient transportation between major ports worldwide — ideal if you prefer to manage your own customs clearance and onward delivery." },
      { title: "Door to Door", body: "We manage the entire shipping process, from collection at origin to delivery at final destination, simplifying your shipping experience." },
      { title: "FCL / LCL", body: "Full Container Load for shipments that fill an entire container; Less than Container Load to share space with other shippers and optimise cost." },
      { title: "Dangerous Goods", body: "Safe, compliant transport of hazardous materials in line with international regulations, with peace of mind throughout." },
      { title: "Cross Trade", body: "Shipments directly from one foreign country to another without transiting through your home country — saving time and money." },
      { title: "Reefers", body: "Temperature-controlled transport for perishable food, pharmaceuticals and chemicals, with precise temperature control so cargo arrives in perfect condition." },
      { title: "Project Cargo", body: "Customised solutions for oversized or complex cargo — specialised handling for heavy machinery, large equipment and other unique items." },
      { title: "Vessel Charter", body: "Lease a full vessel or part of one for bulk goods, heavy machinery and other specialised cargo, with tailored solutions." },
    ],
    seoTitle: "Sea Freight Services — FCL, LCL & Reefer",
    seoDescription:
      "Ocean freight from Pakistan and the UAE: port-to-port, door-to-door, FCL/LCL, reefers, dangerous goods, cross trade, project cargo and vessel charter.",
  },
  {
    slug: "road-transport",
    href: "/road-transport/",
    index: "03",
    name: "Road Transport",
    short: "Seamless road logistics for timely deliveries nationwide.",
    mode: "Road",
    headline: ["Road", "Transport"],
    tagline: "The last mile, done right.",
    intro:
      "Flexible, reliable road transport options for your specific shipping needs — from full truck loads to urgent deliveries, designed for efficiency and convenience.",
    closing:
      "Choose our road transport services for dependable, efficient transportation tailored to your needs. Contact us to learn more or to request a quote.",
    image: { src: "/images/services/road-transport.webp", alt: "Truck hauling a shipping container on a highway at sunrise" },
    photo: { src: "/images/services/hf-road.webp", alt: "Freight truck pulling a container along an empty highway at sunrise" },
    detailImage: { src: "/images/services/road-transport-detail.webp", alt: "Line of freight trucks with container chassis at a logistics depot at dawn" },
    subServices: [
      { title: "Full Truck Loads", body: "FTL for large shipments that need an entire truck — exclusive use of the vehicle for faster, more direct delivery to your destination." },
      { title: "Less Truck Loads", body: "LTL for smaller shipments — consolidated with other cargo to optimise space and cost, a cost-effective choice for smaller loads." },
      { title: "Urgent Deliveries", body: "Expedited options for critical shipments. We prioritise your cargo so it reaches its destination quickly and safely, meeting tight deadlines." },
      { title: "Temperature Controlled Vehicles", body: "Refrigerated vehicles maintain the required conditions throughout transit for perishables, pharmaceuticals and chemicals, preserving cargo quality." },
    ],
    seoTitle: "Road Transport — FTL, LTL & Temperature Controlled",
    seoDescription:
      "Road freight services: full truck loads, less truck loads, urgent deliveries and temperature-controlled vehicles for timely deliveries nationwide.",
  },
  {
    slug: "project-heavy-lift-cargo",
    href: "/project-heavy-lift-cargo/",
    index: "04",
    name: "Project / Heavy Lift Cargo",
    short: "Tailored solutions for oversized and specialised shipments.",
    mode: "Project",
    headline: ["Heavy", "Lift"],
    tagline: "Built for the out-of-gauge.",
    intro:
      "Complex and oversized shipments need a plan. From on-site surveys to specialised handling and transportation, we deliver heavy and project cargo safely and efficiently.",
    closing:
      "Choose our project and heavy lift cargo services for reliable, efficient solutions tailored to your requirements. Contact us to learn more or to request a quote.",
    image: { src: "/images/services/project-cargo.webp", alt: "Industrial transformer moving on a multi-axle modular trailer through a port at dusk" },
    photo: { src: "/images/services/hf-project.webp", alt: "A turbine being lifted by a heavy-lift crane onto a heavy-haul trailer at a quay at dusk" },
    detailImage: { src: "/images/services/project-cargo-detail.webp", alt: "Chains and lashings securing crated machinery on a break bulk vessel deck" },
    subServices: [
      { title: "On-site Survey", body: "Detailed surveys of your project's requirements and challenges — routes, access points and potential obstacles — to build a comprehensive plan for safe transport." },
      { title: "Crating and Lashing", body: "Customised packaging and professional securing of your cargo to prevent damage in transit." },
      { title: "Customs and Project Documentation", body: "We handle the paperwork, ensuring compliance with international regulations and smooth customs clearance for project shipments." },
      { title: "Break Bulk Cargo Handling", body: "Loading, unloading and transport of non-containerised or oversized cargo, delivered safely and on time." },
      { title: "Heavy Lift Cranes and Trucking", body: "Specialised heavy-lift cranes and trucking for oversized and heavy cargo, transported safely and securely." },
    ],
    seoTitle: "Project & Heavy Lift Cargo Logistics",
    seoDescription:
      "Project and heavy lift cargo: on-site surveys, crating and lashing, project documentation, break bulk handling, heavy-lift cranes and trucking.",
  },
  {
    slug: "custom-clearance",
    href: "/custom-clearance/",
    index: "05",
    name: "Custom Clearance",
    short: "Expert services for smooth import and export processes.",
    mode: "Customs",
    headline: ["Custom", "Clearance"],
    tagline: "Our legacy. Your clearance.",
    intro:
      "Professional customs clearance that streamlines importing and exporting — compliant with international regulations, from declarations to bonded stock and customs warehousing.",
    closing:
      "Choose our professional customs clearance services for efficient, compliant and stress-free processing. Contact us to learn more or to request a quote.",
    image: { src: "/images/services/customs-clearance.webp", alt: "Inspector reviewing an open container inside a bonded customs warehouse" },
    photo: { src: "/images/services/hf-customs.webp", alt: "Customs officer checking documents beside an open shipping container in a bonded warehouse" },
    detailImage: { src: "/images/services/customs-clearance-detail.webp", alt: "Aisle of pallet racking in a secure bonded warehouse" },
    subServices: [
      { title: "Import Customs Declaration", body: "Preparation and submission of import declarations so goods are processed efficiently and in compliance — we handle the paperwork and liaise with customs on your behalf." },
      { title: "Export Customs Declarations", body: "All documentation and formalities for your exports, ensuring shipments meet every export requirement." },
      { title: "Goods Handling in Bonded Stocks", body: "Store goods in a bonded warehouse without immediate duty payment — helping you manage cash flow and keep your supply chain flexible." },
      { title: "Customs Warehousing & SRO Benefits", body: "Secure customs warehousing with Statutory Regulatory Order (SRO) benefits, including duty deferment and tax advantages tailored to your business." },
      { title: "Same Day Clearance and Delivery", body: "For urgent shipments, we prioritise clearance and delivery to minimise delays — fast, reliable service." },
    ],
    seoTitle: "Customs Clearance Services — Import, Export & Bonded",
    seoDescription:
      "Professional customs clearance in Pakistan and the UAE: import and export declarations, bonded stock handling, customs warehousing with SRO benefits, same-day clearance.",
  },
];

export const getService = (slug: string) => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
};
