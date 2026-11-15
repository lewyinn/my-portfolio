import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const latest = posts[0]?.updated ?? posts[0]?.date;

  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...getProjects()
      .filter((project) => project.status !== "coming-soon")
      .map((project) => ({
        url: `${site.url}/projects/${project.slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
