import { getPost, getPosts } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, hasLocale } from "@/lib/i18n";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Blog post by Ridho";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

// Image routes are route handlers, where `next/root-params` is not available yet.
export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : defaultLocale);
  const post = getPost(slug);
  return renderOgImage({ label: t.blog.title, title: post?.title ?? t.blog.title });
}
