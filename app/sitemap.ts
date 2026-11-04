import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { languageAlternates, localePath, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

/** One entry per language for a locale-free path, each listing the other languages. */
function localized(path: string, extra: Omit<Entry, "url" | "alternates">): Entry[] {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, `${site.url}${href}`]),
  );
  return locales.map((locale) => ({
    url: `${site.url}${localePath(locale, path)}`,
    alternates: { languages },
    ...extra,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const latest = posts[0]?.updated ?? posts[0]?.date;

  return [
    ...localized("/", { changeFrequency: "monthly", priority: 1 }),
    ...localized("/about", { changeFrequency: "monthly", priority: 0.8 }),
    ...localized("/work", { changeFrequency: "monthly", priority: 0.8 }),
    ...localized("/blog", { lastModified: latest, changeFrequency: "weekly", priority: 0.8 }),
    ...posts.flatMap((post) =>
      localized(`/blog/${post.slug}`, {
        lastModified: post.updated ?? post.date,
        changeFrequency: "yearly",
        priority: 0.7,
      }),
    ),
    ...getProjects().flatMap((project) =>
      localized(`/projects/${project.slug}`, { changeFrequency: "yearly", priority: 0.6 }),
    ),
  ];
}
