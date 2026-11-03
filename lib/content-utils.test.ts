import { describe, expect, it } from "vitest";
import { formatDate, relatedByTags, sortByDateDesc, withoutDrafts } from "./content-utils";

const post = (slug: string, date: string, tags: string[] = [], draft = false) => ({
  slug,
  date,
  tags,
  draft,
});

describe("sortByDateDesc", () => {
  it("puts the newest item first without mutating the input", () => {
    const input = [post("a", "2026-01-01"), post("b", "2026-03-01"), post("c", "2026-02-01")];
    expect(sortByDateDesc(input).map((p) => p.slug)).toEqual(["b", "c", "a"]);
    expect(input.map((p) => p.slug)).toEqual(["a", "b", "c"]);
  });
});

describe("withoutDrafts", () => {
  const items = [post("live", "2026-01-01"), post("draft", "2026-01-02", [], true)];

  it("removes drafts when drafts are not included", () => {
    expect(withoutDrafts(items, false).map((p) => p.slug)).toEqual(["live"]);
  });

  it("keeps drafts when drafts are included", () => {
    expect(withoutDrafts(items, true)).toHaveLength(2);
  });
});

describe("relatedByTags", () => {
  const all = [
    post("current", "2026-05-01", ["nextjs", "seo"]),
    post("two-tags", "2026-01-01", ["nextjs", "seo"]),
    post("one-tag", "2026-04-01", ["seo"]),
    post("no-tags", "2026-06-01", ["design"]),
  ];

  it("ranks by shared tags and excludes the current post", () => {
    expect(relatedByTags(all[0], all).map((p) => p.slug)).toEqual(["two-tags", "one-tag"]);
  });

  it("fills with the newest other posts when matches run out", () => {
    expect(relatedByTags(all[0], all, 3).map((p) => p.slug)).toEqual([
      "two-tags",
      "one-tag",
      "no-tags",
    ]);
  });
});

describe("formatDate", () => {
  it("formats ISO dates in UTC", () => {
    expect(formatDate("2026-11-03T00:00:00.000Z")).toBe("Nov 3, 2026");
  });
});
