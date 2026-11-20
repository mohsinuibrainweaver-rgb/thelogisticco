import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/about/", priority: 0.8 },
    { path: "/our-services/", priority: 0.9 },
    ...services.map((s) => ({ path: s.href, priority: 0.9 })),
    { path: "/specialized-industries/", priority: 0.7 },
    { path: "/our-faqs/", priority: 0.6 },
    { path: "/contact/", priority: 0.8 },
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p.path}`, changeFrequency: "monthly", priority: p.priority }));
}
