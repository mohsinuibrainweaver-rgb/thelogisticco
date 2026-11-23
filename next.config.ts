import type { NextConfig } from "next";

// Legacy WordPress URLs → new pages (see docs/original-website-audit.md §9).
const legacy: Array<[string, string]> = [
  ["/service/air-freight", "/air-freight/"],
  ["/service/air-freight-service", "/air-freight/"],
  ["/service/sea-freight", "/sea-freight/"],
  ["/service/sea-freight-2", "/sea-freight/"],
  ["/service/sea-transportation", "/sea-freight/"],
  ["/service/road-transport", "/road-transport/"],
  ["/service/road-transportation", "/road-transport/"],
  ["/service/transportation", "/road-transport/"],
  ["/service/project-cargo", "/project-heavy-lift-cargo/"],
  ["/service/custom-clearance", "/custom-clearance/"],
  ["/service/custom-solutions", "/custom-clearance/"],
  ["/service/:slug", "/our-services/"],
  ["/faqs/:slug", "/our-faqs/"],
  ["/our-team", "/about/"],
  ["/our-projects", "/about/"],
  ["/project-details", "/about/"],
  ["/project/:slug", "/about/"],
  ["/team/:slug", "/about/"],
  ["/testimonials/:slug", "/about/"],
  ["/our-news", "/"],
  ["/pricing-plan", "/"],
  ["/coming-soon", "/"],
  ["/shop", "/"],
  ["/cart", "/"],
  ["/checkout", "/"],
  ["/my-account", "/"],
  ["/warehoues-storage", "/custom-clearance/"],
  ["/real-time-tracking", "/contact/"],
  ["/transparent-pricing", "/contact/"],
  ["/trusted-franchise", "/about/"],
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/brand/**" }],
  },
  async redirects() {
    return [
      // the old design-lab preview now lives on the homepage
      { source: "/home-lab/", destination: "/", permanent: false },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.php/:path+", destination: "/:path+/", permanent: true },
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
