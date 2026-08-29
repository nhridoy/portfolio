import { cn } from "@/lib/utils";

export function H1({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95]",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-12 text-foreground/90",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-sans text-lg font-medium tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function Lead({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function Body({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans text-base sm:text-lg leading-8 text-foreground/70",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function Muted({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-muted-foreground text-sm sm:text-base", className)}
      {...props}
    >
      {children}
    </span>
  );
}

export function Caption({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-muted-foreground text-xs uppercase tracking-widest",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Code({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "font-mono text-sm bg-muted/50 rounded px-1 py-0.5 text-foreground/80",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

export function Quote({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <blockquote
      className={cn(
        "border-l-4 border-muted pl-4 italic text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function Serif({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-serif text-base sm:text-lg leading-8 text-foreground/70",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
