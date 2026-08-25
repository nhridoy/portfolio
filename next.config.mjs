import nextra from "nextra";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./src/mdx-components.tsx",
      "../build/polyfills/polyfill-module": "./src/lib/modern-polyfill.js",
      "next/dist/build/polyfills/polyfill-module":
        "./src/lib/modern-polyfill.js",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // output: "standalone",
  experimental: {
    inlineCss: true,
    // optimizeCss: true,
  },
};

const withNextra = nextra({
  search: { codeblocks: false },
  codeHighlight: true,
  defaultShowCopyCode: true,
  contentDirBasePath: "/",
});

export default withNextra(nextConfig);
