"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Header = ({
  className,
}: {
  className?: HTMLAttributes<HTMLElement>["className"];
}) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className={cn("py-5 mb-14 md:py-6", className)}>
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between"
      >
        <Link
          href="/"
          aria-label="Nahid — home"
          className="flex h-12 w-20 items-center justify-start transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <svg
            viewBox="0 0 160 60"
            fill="currentColor"
            aria-hidden="true"
            className={cn("h-auto w-20", isHome && "max-md:text-white")}
          >
            <path d="M16 32H46C55 32 60 28 64 19L66 15C69 8 74 4 83 4H142C151 4 156 8 156 16C156 24 151 28 142 28H114C105 28 100 32 96 41L94 45C91 52 86 56 77 56H16C7 56 4 52 4 44C4 36 7 32 16 32Z" />
          </svg>
        </Link>
        <Link
          href="/blog"
          aria-current={pathname.startsWith("/blog") ? "page" : undefined}
          className={cn(
            "inline-flex min-h-11 items-center justify-center text-sm font-medium underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4",
            isHome
              ? "text-white! [text-shadow:0_1px_5px_rgb(0_0_0/45%)]"
              : "text-foreground",
          )}
        >
          Blog
        </Link>
      </nav>
    </header>
  );
};

export default Header;
