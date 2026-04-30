import type { NextConfig } from "next";
import nextra from "nextra";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    resolveAlias: {
      // Path to your `mdx-components` file with extension
      "next-mdx-import-source-file": "./mdx-components.tsx",
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
  output: "standalone",
};

// Set up Nextra with its configuration
const withNextra = nextra({
  search: { codeblocks: false },
});

export default withNextra(nextConfig);
