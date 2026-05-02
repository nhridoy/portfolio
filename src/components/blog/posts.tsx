import { IconArrowNarrowRight, IconTags } from "@tabler/icons-react";
// import { Link } from "next-view-transitions";
import { formatDate } from "@/lib/format-date";
import { getPosts, type PostItem } from "@/lib/get-posts";
import { AnimatedLink } from "../ui/animated-link";
import { Button } from "../ui/button";
import { Body, H3, Muted } from "../ui/typography";

type Props = {
  posts?: PostItem[];
  tags?: string[];
  excludeByTitle?: string;
  first?: number;
  showViewAllButton?: boolean;
};

export async function Posts({
  posts,
  tags,
  excludeByTitle,
  first,
  showViewAllButton,
}: Props) {
  const displayPosts =
    posts ?? (await getPosts({ tags, excludeByTitle, first }));

  return (
    <div className="space-y-8">
      {displayPosts.map((post) => {
        return (
          <div
            key={post.route}
            className="flex flex-col sm:flex-row sm:items-start gap-3"
          >
            <div className="sm:flex-1">
              <H3>
                <AnimatedLink href={post.route} className="hover:underline">
                  {post.title}
                </AnimatedLink>
              </H3>

              {post.frontMatter.description && (
                <Body className="mt-2">{post.frontMatter.description}</Body>
              )}

              <div className="flex gap-2 items-center mt-3 text-sm">
                <IconTags className="w-4 min-w-4 -translate-y-0.5 text-muted-foreground" />
                <div className="flex flex-wrap gap-x-2 text-muted-foreground">
                  {post.frontMatter.tags.map((tagName, index: number) => {
                    return (
                      <AnimatedLink
                        key={tagName}
                        href={`/tags/${tagName}`}
                        className="text-sm text-muted-foreground hover:underline"
                      >
                        <span>
                          {tagName}
                          {index < post.frontMatter.tags.length - 1 && ", "}
                        </span>
                      </AnimatedLink>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full sm:w-40 sm:text-right">
              <Muted>{formatDate(post.frontMatter.date)}</Muted>
            </div>
          </div>
        );
      })}

      {showViewAllButton === true && (
        <Button
          variant="link"
          className="flex gap-2 items-center hover:underline"
        >
          View all posts <IconArrowNarrowRight className="w-4" />
        </Button>
      )}
    </div>
  );
}
