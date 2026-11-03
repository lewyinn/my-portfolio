import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/content-utils";
import { cardClass, sheenClass } from "./card";
import { ArrowUpRightIcon } from "./icons";
import { Media } from "./media";

export type PostCardData = Pick<Post, "slug" | "title" | "date" | "tags" | "readingTime" | "cover">;

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${cardClass} flex h-full flex-col hover:-translate-y-1`}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.08]">
        <Media
          src={post.cover}
          alt={`Cover for ${post.title}`}
          label="Article cover"
          className="absolute inset-0 transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
        />
        {post.tags[0] ? (
          <span className="absolute top-3.5 left-3.5 rounded-full border border-white/15 bg-ink/85 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase">
            {post.tags[0]}
          </span>
        ) : null}
      </div>
      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <div className={sheenClass} />
        <span className="relative text-[11px] tracking-[0.2em] text-muted uppercase">
          {formatDate(post.date)} · {post.readingTime} min read
        </span>
        <h3 className="relative text-xl leading-snug font-semibold transition-colors duration-300 group-hover:text-white">
          {post.title}
        </h3>
        <span className="relative mt-auto inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-fg">
          READ ARTICLE
          <ArrowUpRightIcon
            strokeWidth={2.2}
            className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export function toPostCard({
  slug,
  title,
  date,
  tags,
  readingTime,
  cover,
}: PostCardData): PostCardData {
  return { slug, title, date, tags, readingTime, cover };
}
