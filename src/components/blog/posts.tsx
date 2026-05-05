import { ArrowRight, Tags } from "lucide-react";
import { Search } from "nextra/components";
import { formatDate } from "@/lib/format-date";
import { getPosts, type PostItem } from "@/lib/get-posts";
import { getTags } from "@/lib/get-tags";
import { cn } from "@/lib/utils";
import { AnimatedLink } from "../ui/animated-link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Body, H2, H3, Muted } from "../ui/typography";

type Props = {
  posts?: PostItem[];
  tags?: string[];
  excludeByTitle?: string;
  first?: number;
  showViewAllButton?: boolean;
  isRelated?: boolean;
};

export default async function Posts({
  posts,
  tags,
  excludeByTitle,
  first,
  showViewAllButton,
  isRelated,
}: Readonly<Props>) {
  const displayPosts =
    posts ?? (await getPosts({ tags, excludeByTitle, first }));
  const allTags = await getTags();

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
      <div
        className={cn("space-y-8 col-span-1 md:col-span-4", {
          "md:col-span-6": isRelated,
        })}
      >
        <div
          className={cn("md:hidden block", {
            hidden: isRelated,
          })}
        >
          <Search />
        </div>

        {!isRelated && <H2>Recent Posts</H2>}
        <div
          className={cn("grid grid-cols-1 gap-8", {
            "sm:grid-cols-2": isRelated,
          })}
        >
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
                    <Tags className="w-4 min-w-4 -translate-y-0.5 text-muted-foreground" />
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
        </div>

        {showViewAllButton === true && (
          <Button
            variant="link"
            className="flex gap-2 items-center hover:underline"
          >
            View all posts <ArrowRight className="w-4" />
          </Button>
        )}
      </div>

      <div
        className={cn("col-span-1 md:col-span-2", {
          hidden: isRelated,
        })}
      >
        <H2>All Tags</H2>
        <div className="space-y-2 space-x-2">
          {allTags.map((tag) => (
            <Badge
              key={tag.name}
              render={
                <AnimatedLink
                  href={`/tags/${tag.name}`}
                  className="hover:underline"
                >
                  {tag.name}
                </AnimatedLink>
              }
            />
          ))}
        </div>

        <Search className="hidden md:block mt-8" placeholder="Search..." />
      </div>
    </div>
  );
}
