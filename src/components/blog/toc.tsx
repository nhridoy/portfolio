import type { Heading } from "nextra";
import type { FC } from "react";
import { AnimatedLink } from "../ui/animated-link";

export const Toc: FC<{ toc: Heading[] }> = ({ toc }) => {
  return (
    <div className="flex flex-col gap-2 mt-4 border-l-2 border-muted pl-4">
      {toc.map((heading) => (
        <AnimatedLink key={heading.id} href={`#${heading.id}`}>
          {heading.value}
        </AnimatedLink>
      ))}
    </div>
  );
};
