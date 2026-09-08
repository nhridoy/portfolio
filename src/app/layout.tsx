import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Cormorant, Inter, Outfit, Playfair_Display } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

import { DeferredProviders } from "@/components/providers/deferred-providers";
import { cn } from "@/lib/utils";

const Footer = dynamic(() => import("@/components/ui/footer"));
const ReadingProgress = dynamic(
  () => import("@/components/ui/reading-progress"),
);

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Software Engineer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Expert",
    "TypeScript",
    "Django",
    "Python",
    "AWS",
    "DevOps",
    "Docker",
    "PostgreSQL",
    "E-Commerce",
    "Streaming Platform",
    "ERP System",
    "Mobile App Development",
    "Bangladesh",
    "Swiss Clients",
    "South Korean Clients",
    "Nahidujjaman Hridoy",
    "nhridoy",
    "Portfolio",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  other: process.env.WEBMCP_ORIGIN_TRIAL_TOKEN
    ? { "origin-trial": process.env.WEBMCP_ORIGIN_TRIAL_TOKEN }
    : undefined,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        playfair.variable,
        outfit.variable,
        cormorant.variable,
        "scroll-smooth",
        "no-scrollbar",
      )}
      suppressHydrationWarning={process.env.NODE_ENV === "production"}
    >
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10000] focus:bg-background focus:p-3 focus:text-foreground"
        >
          Skip to content
        </a>
        <DeferredProviders>
          <ReadingProgress />
          {children}
          <Footer />
        </DeferredProviders>
      </body>
    </html>
  );
}
