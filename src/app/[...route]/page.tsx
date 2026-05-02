import type { Metadata } from "next";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import type React from "react";
import { PostDetail } from "@/components/blog/post-detail";
import { useMDXComponents as getMDXComponents } from "../../mdx-components";

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
  const { metadata } = await importPage(params.route);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: PageProps) {
  const params = await props.params;

  const result = await importPage(params.route);
  const {
    default: MDXContent,
    toc,
    metadata,
  } = result as {
    default: React.ComponentType<any>;
    toc: any;
    metadata: CustomMetadata;
  };

  const isPostPage =
    params.route && params.route.length > 1 && params.route.includes("blog");

  return (
    // @ts-expect-error
    <Wrapper toc={toc} metadata={metadata}>
      {isPostPage && (
        <PostDetail metadata={metadata}>
          <MDXContent {...props} params={params} />
        </PostDetail>
      )}

      {!isPostPage && <MDXContent {...props} params={params} />}
    </Wrapper>
  );
}
