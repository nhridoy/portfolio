import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { span as Span } from "framer-motion/m";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button cursor-pointer inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
        interactive: "text-primary w-theme-75 p-0!",
      },
      size: {
        default:
          "h-10 px-4 py-2 gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 px-3 gap-1 rounded-[min(var(--radius-md),12px)] text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-10",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const DURATION = 0.7;
const STAGGER = 0.025;

const transition = {
  duration: DURATION,
  ease: "easeInOut" as const,
};

function InteractiveText({
  children,
  hovered,
}: {
  children: React.ReactNode;
  hovered: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shiftDistance, setShiftDistance] = useState(0);

  const text = String(children);
  const characters = text.split("");
  const total = characters.length;

  useLayoutEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const textWidth = textRef.current.getBoundingClientRect().width;
      setShiftDistance(Math.max(0, containerWidth - textWidth));
    }
  }, []);

  return (
    <span
      ref={containerRef}
      className="relative inline-flex w-full overflow-hidden select-none"
    >
      <span ref={textRef} className="inline-flex whitespace-pre">
        {characters.map((character, index) => {
          // Last character moves first on hover (t -> e -> x -> t -> ...)
          const reverseIndex = total - 1 - index;
          return (
            <Span
              // biome-ignore lint/suspicious/noArrayIndexKey: <Not a bug>
              key={`${character}-${index}`}
              animate={{ x: hovered ? shiftDistance : 0 }}
              transition={{
                ...transition,
                delay: hovered ? reverseIndex * STAGGER : index * STAGGER,
              }}
              className="relative inline-block"
            >
              {character === " " ? "\u00A0" : character}
            </Span>
          );
        })}
      </span>
    </span>
  );
}

function InteractiveButton({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  const characterCount = String(children).length;
  const lastIndex = characterCount - 1;

  return (
    <Span
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex items-center w-full"
    >
      {/* Left Arrow */}
      <span className="absolute left-0 size-full overflow-hidden">
        <Span
          animate={{ x: hovered ? 0 : "calc(var(--theme-motion-shift) * -1)" }}
          transition={{
            ...transition,
            delay: hovered ? lastIndex * STAGGER : 0,
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2"
        >
          <ArrowRight className="size-theme-6" />
        </Span>
      </span>
      {/* Text */}
      <InteractiveText hovered={hovered}>{children}</InteractiveText>

      {/* Right Arrow */}
      <span className="absolute right-0 size-full overflow-hidden">
        <Span
          animate={
            hovered
              ? {
                  x: "var(--theme-motion-shift)",
                  y: "calc(var(--theme-motion-shift) * -1)",
                }
              : {
                  x: ["calc(var(--theme-motion-shift) * -1)", 0],
                  y: ["var(--theme-motion-shift)", 0],
                }
          }
          transition={{
            ...transition,
            delay: hovered ? 0 : lastIndex * STAGGER,
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          <ArrowUpRight className="size-theme-6" />
        </Span>
      </span>

      {/* Underline */}
      <span className="absolute inset-x-0 -bottom-theme-0.5 h-px overflow-hidden">
        {/* Underline associated with FIRST character */}
        <Span
          animate={{
            x: hovered ? "100%" : "0%",
          }}
          transition={{
            ...transition,
            delay: hovered ? 0 : lastIndex * STAGGER,
          }}
          className="absolute inset-0 bg-current"
        />
        {/* Underline associated with LAST character */}
        <Span
          animate={{
            x: hovered ? "0%" : "-100%",
          }}
          transition={{
            ...transition,
            delay: hovered ? lastIndex * STAGGER : 0,
          }}
          className="absolute inset-0 bg-current"
        />
      </span>
    </Span>
  );
}

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {variant === "interactive" ? (
        <InteractiveButton>{children}</InteractiveButton>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
