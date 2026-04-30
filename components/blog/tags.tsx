// import { Link } from "next-view-transitions";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getTags } from "@/lib/get-tags";

type Props = {};

export async function Tags(props: Props) {
  const tags = await getTags();

  return (
    <div className="not-prose flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge
          key={tag.name}
          variant="outline"
          render={<Link href={`/tags/${tag.name}`} />}
        >
          {tag.name} <span className="opacity-50">({tag.count})</span>
        </Badge>
      ))}
    </div>
  );
}
