import { getPosts } from "@/lib/get-posts";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
export const dynamic = "force-static";
const xml = (text: string) =>
  text.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char] ?? char,
  );
export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((post) => {
      const url = absoluteUrl(post.route);
      const date = new Date(post.frontMatter.date);
      return `<item><title>${xml(post.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(post.frontMatter.description || "")}</description>${Number.isNaN(date.getTime()) ? "" : `<pubDate>${date.toUTCString()}</pubDate>`}</item>`;
    })
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(SITE_NAME)} - Blog</title><link>${absoluteUrl("/blog")}</link><description>Software engineering articles and tutorials.</description><language>en</language>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
