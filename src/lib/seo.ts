import type { Metadata } from "next";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string };
  absoluteTitle?: boolean;
};

/** Consistent per-page metadata: canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path, image, absoluteTitle }: PageMeta): Metadata {
  const images = image ? [{ url: image.src, alt: image.alt }] : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, ...(images ? { images } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images: images.map((i) => i.url) } : {}) },
  };
}
