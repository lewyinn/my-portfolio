"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PostCard, type PostCardData, type PostCardLabels } from "@/components/ui/post-card";

/** Blog index with tag filters. Filtering happens on the client so the page stays static. */
type BlogListProps = {
  posts: PostCardData[];
  labels: PostCardLabels & { all: string; filter: string };
};

export function BlogList({ posts, labels }: BlogListProps) {
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  const [tag, setTag] = useState<string | null>(null);
  const visible = tag ? posts.filter((post) => post.tags.includes(tag)) : posts;

  const filters = [
    { label: labels.all, value: null },
    ...tags.map((t) => ({ label: t, value: t })),
  ];

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = filter.value === tag;
          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={active}
              onClick={() => setTag(filter.value)}
              className={`min-h-11 rounded-full border px-4 text-xs tracking-[0.12em] uppercase transition-colors duration-300 ${
                active
                  ? "border-fg bg-fg text-ink"
                  : "border-line text-muted hover:border-muted hover:text-fg"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((post, i) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <PostCard post={post} index={i} labels={labels} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
