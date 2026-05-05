import { useMDXComponents as getNextraComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog"; // nextra-theme-blog or your custom theme
import { AnimatedLink } from "./components/ui/animated-link";
import { H1, H2, H3 } from "./components/ui/typography";

// const components: MDXComponents = {};

// export function useMDXComponents(): MDXComponents {
//   return components;
// }

// Get the default MDX components
const themeComponents = getThemeComponents({
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ id, children }) => (
    <H2 id={id} className="group relative">
      {children}
      <AnimatedLink
        href={`#${id}`}
        className="ml-2 opacity-0 group-hover:opacity-100"
      >
        #
      </AnimatedLink>
    </H2>
  ),
  h3: ({ children }) => <H3>{children}</H3>,

  // a: ({ href, children, target }) => {
  //   const external = target === "_blank";
  //   return (
  //     <AnimatedLink href={href as string} external={external}>
  //       {children}
  //     </AnimatedLink>
  //   );
  // },

  DateFormatter: ({ date }) =>
    `Last updated at ${date.toLocaleDateString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`,
});
const defaultComponents = getNextraComponents({
  wrapper({ children }) {
    return children;
  },
});

// Merge components
export function useMDXComponents() {
  return {
    ...themeComponents,
    ...defaultComponents,
  };
}
