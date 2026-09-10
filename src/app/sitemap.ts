import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getTags } from "@/lib/get-tags";
import { SITE_URL as BASE_URL } from "@/lib/seo";

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;
const DATE_RE = /^date:\s*['"]?([^'"\r\n]+)['"]?/m;

function getBlogPosts() {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const entries: MetadataRoute.Sitemap = [];

  function walkDir(dir: string) {
    for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        walkDir(fullPath);
      } else if (
        file.name.endsWith(".mdx") &&
        !(dir === blogDir && file.name === "index.mdx")
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const match = FRONTMATTER_RE.exec(content);
        if (match) {
          const dateMatch = DATE_RE.exec(match[1]);
          const parsedDate = dateMatch ? new Date(dateMatch[1]) : undefined;
          const date =
            parsedDate && !Number.isNaN(parsedDate.getTime())
              ? parsedDate
              : undefined;
          const normalizedPath = fullPath.replaceAll("\\", "/");
          const normalizedBlogDir = blogDir.replaceAll("\\", "/");
          const slug = normalizedPath
            .replace(normalizedBlogDir, "")
            .replace(/\.mdx$/, "")
            .replace(/\/index$/, "")
            .replace(/^\/+/, "");
          entries.push({
            url: `${BASE_URL}/blog/${slug}`,
            lastModified: date,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
    }
  }

  walkDir(blogDir);
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getBlogPosts();

  return [
    {
      url: BASE_URL,

      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,

      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
    ...(await getTags()).map((tag) => ({
      url: `${BASE_URL}/tags/${encodeURIComponent(tag.name)}`,
    })),
  ];
}
