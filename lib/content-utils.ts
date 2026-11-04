// Pure helpers for content collections. Kept free of the Velite import so they are easy to unit test.

export function sortByDateDesc<T extends { date: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function withoutDrafts<T extends { draft?: boolean }>(
  items: readonly T[],
  includeDrafts: boolean,
): T[] {
  return includeDrafts ? [...items] : items.filter((item) => !item.draft);
}

/**
 * Posts that share the most tags with `current`, newest first among ties.
 * Falls back to the newest other posts when there are not enough tag matches.
 */
export function relatedByTags<T extends { slug: string; date: string; tags: string[] }>(
  current: T,
  all: readonly T[],
  limit = 2,
): T[] {
  const tags = new Set(current.tags);
  const others = sortByDateDesc(all.filter((item) => item.slug !== current.slug));
  const scored = others
    .map((item) => ({ item, score: item.tags.filter((tag) => tags.has(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
  const fill = others.filter((item) => !scored.includes(item));
  return [...scored, ...fill].slice(0, limit);
}

/** Short date like "Nov 3, 2026" (en) or "3 Nov 2026" (id-ID). */
export function formatDate(iso: string, locale = "en"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
