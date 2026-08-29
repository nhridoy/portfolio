"use client";

import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { AnimatedLink } from "./animated-link";
import { Caption } from "./typography";

const Header = ({
  className,
}: {
  className?: HTMLAttributes<HTMLElement>["className"];
}) => {
  const pathName = usePathname();

  return (
    <header className={cn("py-6 mb-14", className)}>
      <nav className="flex justify-between items-start">
        <AnimatedLink href="/" className="hover:no-underline text-foreground">
          <Caption>NAHID</Caption>
        </AnimatedLink>

        <div className="flex items-center gap-4">
          <AnimatedLink href="/blog" className="hover:no-underline">
            <Caption
              className={cn({
                "text-foreground": pathName.includes("blog"),
              })}
            >
              Blog
            </Caption>
          </AnimatedLink>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
