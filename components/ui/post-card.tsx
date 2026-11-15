import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/content-utils";
import type { Dictionary } from "@/lib/dictionary";
import { site } from "@/lib/site";
import { cardClass, sheenClass } from "./card";
import { EditorialCover } from "./editorial-cover";
import { ArrowUpRightIcon } from "./icons";

export type PostCardData = Pick<
  Post,
  | "slug"
  | "title"
  | "description"
  | "date"
  | "tags"
  | "category"
  | "accent"
  | "coverVariant"
  | "readingTime"
  | "cover"
>;

export type PostCardLabels = Dictionary["postCard"] & { minRead: string };

/** Picks the post card strings out of a dictionary (call on the server, pass as props). */
export function postCardLabels(t: Dictionary): PostCardLabels {
  return { ...t.postCard, minRead: t.common.minRead };
}

type PostCardProps = {
  post: PostCardData;
  labels: PostCardLabels;
  index?: number;
};

export function PostCard({ post, labels, index }: PostCardProps) {
  const indexLabel = typeof index === "number" ? String(index + 1).padStart(2, "0") : undefined;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${cardClass} flex h-full flex-col hover:-translate-y-1`}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.08]">
        <EditorialCover
          slug={post.slug}
          category={post.category}
          indexLabel={indexLabel}
          variant={post.coverVariant}
          accent={post.accent}
          tags={post.tags}
        />
      </div>
      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <div className={sheenClass} />
        <span className="relative font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          {formatDate(post.date, site.dateLocale)} · {post.readingTime} {labels.minRead}
        </span>
        <h3 className="relative text-xl leading-snug font-semibold transition-colors duration-300 group-hover:text-white">
          {post.title}
        </h3>
        <p className="relative line-clamp-2 text-sm leading-relaxed text-muted">
          {post.description}
        </p>
        <span className="relative mt-auto inline-flex items-center gap-2 pt-2 text-[11px] font-bold tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-fg">
          {labels.read}
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
  description,
  date,
  tags,
  category,
  accent,
  coverVariant,
  readingTime,
  cover,
}: PostCardData): PostCardData {
  return {
    slug,
    title,
    description,
    date,
    tags,
    category,
    accent,
    coverVariant,
    readingTime,
    cover,
  };
}
