import Link from "next/link";
import { cn } from "@/lib/utils";

interface AnimatedLinkProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export function AnimatedLink({
  href,
  children,
  external = false,
  className,
  ...props
}: Readonly<AnimatedLinkProps>) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-foreground hover:underline underline-offset-4",
          className,
        )}
        style={{
          cursor: "pointer",
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "text-foreground hover:underline underline-offset-4",
        className,
      )}
      style={{
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
