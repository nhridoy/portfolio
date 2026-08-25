import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { generateStaticParamsFor, importPage } from "nextra/pages";
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
  const { metadata } = await importPage(params.route);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: Readonly<PageProps>) {
  const params = await props.params;

  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.route);

  const isPostPage =
    params.route && params.route.length > 1 && params.route.includes("blog");

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      {isPostPage && (
        <PostDetail metadata={metadata} toc={toc}>
          <MDXContent {...props} params={params} />
        </PostDetail>
      )}

      {!isPostPage && <MDXContent {...props} params={params} />}
    </Wrapper>
  );
}
