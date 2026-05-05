// @flow

import { IconArrowBack, IconPoint } from "@tabler/icons-react";
import Link from "next/link";
import type { Heading } from "nextra";
// import { Link } from "next-view-transitions";
import type * as React from "react";
import type { CustomMetadata } from "@/app/(blog)/[...route]/page";
import GiscusComments from "@/components/blog/giscus-comments";
import { Posts } from "@/components/blog/posts";
import { formatDate } from "@/lib/format-date";
import { H2, Muted } from "../ui/typography";
import { Toc } from "./toc";

type Props = {
  metadata: CustomMetadata;
  children: React.ReactNode;
  toc: Heading[];
};

export function PostDetail({ metadata, children, toc }: Props) {
  return (
    <>
      <div className="flex items-center justify-between gap-4 text-sm mb-6">
        <Link
          href="/blog"
          className="hover:underline no-underline flex items-center gap-1"
        >
          <IconArrowBack className="w-4" />
          Back to Blogs
        </Link>
        <div className="flex items-center gap-2 text-muted-foreground">
          <IconPoint className="w-3" />
          <Muted>{formatDate(metadata.date)}</Muted>
        </div>
      </div>
      <article className="grid! grid-cols-1 md:grid-cols-6 gap-12">
        <div className="order-2 md:order-1 col-span-1 md:col-span-4 x:prose x:max-md:prose-sm x:dark:prose-invert mx-0!">
          {children}
        </div>

        <div className="order-1 md:order-2 col-span-1 md:col-span-2 h-full">
          <div className="md:sticky top-10">
            <H2>Table of Contents</H2>
            <Toc toc={toc} />
          </div>
        </div>
      </article>

      <H2 className="mt-6">Related</H2>
      <div className="mt-6">
        <Posts
          tags={metadata.tags}
          excludeByTitle={metadata.title as string}
          first={4}
          isRelated
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
