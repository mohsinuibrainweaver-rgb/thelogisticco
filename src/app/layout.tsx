import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { company, SITE_URL } from "@/content/site";
import { organizationSchema } from "@/lib/schema";

const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — Freight Forwarding & Customs Clearance`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "The Logistic Company is a freight forwarding, customs clearance and logistics partner for Pakistan and the UAE — air freight, sea freight, road transport and project cargo.",
  applicationName: company.name,
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_US",
    images: [{ url: "/images/home/hero.webp", width: 2400, height: 1357, alt: "Container ship entering a commercial port at dusk" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0d111c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh bg-paper text-ink">
        <script
          // Pre-hide reveal targets before first paint when motion is allowed (see globals.css).
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <MotionProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <FloatingActions />
        </MotionProvider>
      </body>
    </html>
  );
}
