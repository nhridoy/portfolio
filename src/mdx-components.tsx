import Link from "next/link";
import { useMDXComponents as getNextraComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog"; // nextra-theme-blog or your custom theme
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
      <Link href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-100">
        #
      </Link>
    </H2>
  ),
  h3: ({ children }) => <H3>{children}</H3>,

  // a: ({ href, children, target }) => {
  //   return (
  //     <Link href={href as string} target="_blank" rel="noopener noreferrer">
  //       {children}
  //     </Link>
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
