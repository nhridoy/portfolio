import { useMDXComponents as getNextraComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog"; // nextra-theme-blog or your custom theme
import { Toc } from "./components/blog/toc";

// const components: MDXComponents = {};

// export function useMDXComponents(): MDXComponents {
//   return components;
// }

// Get the default MDX components
const themeComponents = getThemeComponents();
const defaultComponents = getNextraComponents({
  wrapper({ children, toc }) {
    return (
      <>
        {children}

        {/* <Toc toc={toc} /> */}
      </>
    );
  },
});

// Merge components
export function useMDXComponents() {
  return {
    ...themeComponents,
    ...defaultComponents,
  };
}
