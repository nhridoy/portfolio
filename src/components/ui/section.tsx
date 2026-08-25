"use client";

import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function Section({ children, className, id, ref }: SectionProps) {
  return (
    <section
      id={id}
      ref={ref}
      className={cn("py-20 md:py-28 first:pt-28", className)}
    >
      {children}
    </section>
  );
}
