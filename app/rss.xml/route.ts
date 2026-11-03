import { getPosts } from "@/lib/content";
import { site } from "@/lib/site";

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const posts = getPosts();
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${site.url}/blog/${post.slug}</link>
      <guid>${site.url}/blog/${post.slug}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const lastBuild = posts[0]
    ? `\n    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>`
    : "";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(site.fullName)} — Blog</title>
    <link>${site.url}/blog</link>
    <description>${escape(site.description)}</description>
    <language>en</language>${lastBuild}
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
