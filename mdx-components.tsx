import { useMDXComponents as getNextraComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog"; // nextra-theme-blog or your custom theme

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

        {/*<TOC toc={toc}/>*/}
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
