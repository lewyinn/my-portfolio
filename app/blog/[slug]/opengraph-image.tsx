import { getPost, getPosts } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Blog post by Ridho";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({ label: "Blog", title: post?.title ?? "Notes & writing" });
}
