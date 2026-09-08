import type { Metadata } from "next";
import Posts from "@/components/blog/posts";
import Tags from "@/components/blog/tags";
import { H2 } from "@/components/ui/typography";
import { getTags } from "@/lib/get-tags";
import { pageMetadata } from "@/lib/seo";

type TagPageParams = {
  tag: string;
};

type TagPageProps = {
  params: Promise<TagPageParams>;
};

export async function generateMetadata(props: TagPageProps): Promise<Metadata> {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);
  return pageMetadata(
    `${tag} articles`,
    `Read articles about ${tag} by Nahidujjaman Hridoy.`,
    `/tags/${encodeURIComponent(tag)}`,
  );
}

export async function generateStaticParams(): Promise<TagPageParams[]> {
  const allTags = await getTags();
  return [...new Set(allTags)].map((item) => ({ tag: item.name }));
}

export default async function TagPage(props: Readonly<TagPageProps>) {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  return (
    <>
      <h1 className="text-3xl font-medium">
        Posts Tagged with &quot;{decodedTag}&quot;
      </h1>

      <div className="mt-6">
        <Posts tags={[decodedTag]} isRelated />
      </div>

      <H2 className="mt-12">More tags</H2>
      <div className="my-4">
        <Tags />
      </div>
    </>
  );
}
