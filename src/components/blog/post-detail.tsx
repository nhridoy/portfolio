// @flow

import { IconArrowBack, IconPoint } from "@tabler/icons-react";
import Link from "next/link";
// import { Link } from "next-view-transitions";
import type * as React from "react";
import type { CustomMetadata } from "@/app/[...route]/page";
import GiscusComments from "@/components/blog/giscus-comments";
import { Posts } from "@/components/blog/posts";
import { formatDate } from "@/lib/format-date";
import { H2, Muted } from "../ui/typography";

type Props = {
  metadata: CustomMetadata;
  children: React.ReactNode;
};

export function PostDetail({ metadata, children }: Props) {
  return (
    <>
      <div className="flex items-center gap-4 text-sm mb-6">
        <Link
          href="/blog"
          className="hover:underline no-underline flex items-center gap-1"
        >
          <IconArrowBack className="w-4" />
          Back to Blogs
        </Link>
        <IconPoint className="w-3" />
        <Muted>{formatDate(metadata.date)}</Muted>
      </div>

      {metadata.title && typeof metadata.title === "string" && (
        <H2 className="mb-6">{metadata.title}</H2>
      )}

      <div className="pros">{children}</div>

      <H2 className="mt-12">Related</H2>
      <div className="mt-6">
        <Posts
          tags={metadata.tags}
          excludeByTitle={metadata.title as string}
          first={5}
        />
      </div>

      {metadata.enableComment === true && (
        <div className="pt-32">
          <GiscusComments />
        </div>
      )}
    </>
  );
}
