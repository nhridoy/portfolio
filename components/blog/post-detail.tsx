// @flow

import { IconArrowBack, IconPoint } from "@tabler/icons-react";
// import { Link } from "next-view-transitions";
import type * as React from "react";
import type { CustomMetadata } from "@/app/blog/[[...mdxPath]]/page";
import GiscusComments from "@/components/blog/giscus-comments";
import { Posts } from "@/components/blog/posts";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";

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
        <div>{formatDate(metadata.date)}</div>
      </div>

      {children}

      <h2>Related</h2>
      <Posts
        tags={metadata.tags}
        excludeByTitle={metadata.title as string}
        first={5}
      />

      {metadata.enableComment === true && (
        <div className="pt-32">
          <GiscusComments />
        </div>
      )}
    </>
  );
}
