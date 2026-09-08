import type { Metadata } from "next";
import type { Graph } from "schema-dts";

export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://iamnahid.com",
).origin;
export const SITE_NAME = "Nahidujjaman Hridoy";
export const SITE_DESCRIPTION =
  "Software engineer in Bangladesh building thoughtful interfaces and dependable systems with React, Next.js, Django, and AWS. Explore projects and get in touch.";
export const absoluteUrl = (path = "/") => new URL(path, `${SITE_URL}/`).href;
export const personId = `${SITE_URL}/#person`;
export const websiteId = `${SITE_URL}/#website`;
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} | Software Engineer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
export const homeGraph: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_NAME,
      url: absoluteUrl(),
      image: absoluteUrl("/images/hero-portrait.png"),
      jobTitle: "Software Engineer",
      email: "hi@iamnahid.com",
      homeLocation: { "@type": "Country", name: "Bangladesh" },
      sameAs: [
        "https://github.com/nhridoy",
        "https://www.linkedin.com/in/nahidujjaman-hridoy",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Django",
        "AWS",
        "Full-stack development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl(),
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: absoluteUrl(),
      name: `${SITE_NAME} | Software Engineer`,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
  ],
};
