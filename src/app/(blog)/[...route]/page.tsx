import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import type { Graph } from "schema-dts";
import { JsonLd } from "@/components/seo/json-ld";
import {
  absoluteUrl,
  pageMetadata,
  personId,
  SITE_NAME,
  websiteId,
} from "@/lib/seo";
import { useMDXComponents as getMDXComponents } from "../../../mdx-components";

const PostDetail = dynamic(() => import("@/components/blog/post-detail"), {
  ssr: true,
});

// Define types for params and metadata
type PageParams = {
  route: string[];
};

type PageProps = {
  params: Promise<PageParams>;
};

export type CustomMetadata = Metadata & {
  date?: string;
  enableComment?: boolean;
  tags?: string[];
};

export const generateStaticParams = generateStaticParamsFor("route");

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { metadata: rawMetadata } = await importPage(params.route);
  const metadata = rawMetadata as CustomMetadata;
  const path = `/${params.route.map(encodeURIComponent).join("/")}`;
  const isPost = params.route.length > 1;
  const title =
    typeof metadata.title === "string"
      ? metadata.title
      : "Software Engineering Blog";
  const description =
    typeof metadata.description === "string"
      ? metadata.description
      : "Articles on React, Next.js, Python, and building reliable software by Nahidujjaman Hridoy.";
  const result = pageMetadata(title, description, path);
  return {
    ...result,
    openGraph: {
      ...result.openGraph,
      type: isPost ? "article" : "website",
      ...(isPost && metadata.date
        ? {
            publishedTime: new Date(metadata.date).toISOString(),
            authors: [absoluteUrl()],
          }
        : {}),
    },
  };
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: Readonly<PageProps>) {
  const params = await props.params;

  const {
    default: MDXContent,
    toc,
    metadata: rawMetadata,
    sourceCode,
  } = await importPage(params.route);

  const metadata = rawMetadata as CustomMetadata;
  const isPostPage =
    params.route && params.route.length > 1 && params.route.includes("blog");

  const path = `/${params.route.map(encodeURIComponent).join("/")}`;
  const title =
    typeof metadata.title === "string"
      ? metadata.title
      : "Software Engineering Blog";
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl("/blog"),
          },
          ...(isPostPage
            ? [
                {
                  "@type": "ListItem" as const,
                  position: 3,
                  name: title,
                  item: absoluteUrl(path),
                },
              ]
            : []),
        ],
      },
      ...(isPostPage
        ? [
            {
              "@type": "BlogPosting" as const,
              "@id": `${absoluteUrl(path)}#article`,
              headline: title,
              description: metadata.description || undefined,
              url: absoluteUrl(path),
              mainEntityOfPage: absoluteUrl(path),
              author: {
                "@type": "Person" as const,
                "@id": personId,
                name: SITE_NAME,
                url: absoluteUrl(),
              },
              publisher: {
                "@type": "Person" as const,
                name: SITE_NAME,
                url: absoluteUrl(),
              },
              ...(metadata.date
                ? { datePublished: new Date(metadata.date).toISOString() }
                : {}),
              image: absoluteUrl("/opengraph-image"),
              inLanguage: "en",
            },
          ]
        : [
            {
              "@type": "CollectionPage" as const,
              url: absoluteUrl(path),
              name: title,
              isPartOf: { "@id": websiteId },
            },
          ]),
    ],
  };
  return (
    <Wrapper toc={toc} metadata={rawMetadata} sourceCode={sourceCode}>
      <JsonLd data={graph} />
      {!isPostPage && (
        <h1 className="text-3xl font-medium mb-8">Software Engineering Blog</h1>
      )}
      {isPostPage && (
        <PostDetail metadata={metadata} toc={toc}>
          <MDXContent {...props} params={params} />
        </PostDetail>
      )}

      {!isPostPage && <MDXContent {...props} params={params} />}
    </Wrapper>
  );
}
