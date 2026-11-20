import { company, contact, offices, SITE_URL } from "@/content/site";
import type { Service } from "@/content/services";
import type { Faq } from "@/content/faqs";

const postal = (o: (typeof offices)[number]) => ({
  "@type": "PostalAddress",
  streetAddress: o.lines.slice(0, -1).join(", "),
  addressLocality: o.city,
  addressCountry: o.code,
});

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    alternateName: [company.shortName, company.monogram],
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/tlc-logo.png`,
    email: contact.email,
    description: company.summary,
    slogan: company.tagline,
    areaServed: ["PK", "AE"],
    address: offices.map(postal),
    contactPoint: offices.map((o) => ({
      "@type": "ContactPoint",
      telephone: o.phone.href.replace("tel:", ""),
      contactType: "customer service",
      areaServed: o.code,
      availableLanguage: ["en"],
    })),
    department: offices.map((o) => ({
      "@type": "LocalBusiness",
      name: `${company.name} — ${o.city}`,
      address: postal(o),
      telephone: o.phone.href.replace("tel:", ""),
      email: contact.email,
    })),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.intro,
    url: `${SITE_URL}${s.href}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["PK", "AE"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.name,
      itemListElement: s.subServices.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x.title, description: x.body } })),
    },
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, item: `${SITE_URL}${x.href}` })),
  };
}
