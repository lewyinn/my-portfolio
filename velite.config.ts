import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineCollection, defineConfig, s } from "velite";

const accentSchema = s.enum(["accent", "blue", "teal", "yellow"]);

/**
 * Blog articles (`content/blog/*.mdx`).
 * Minimal frontmatter to add a new post: `title`, `description`, `date`.
 * Everything else (slug, readingTime, category, toc, coverVariant) has smart defaults.
 */
const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(110),
      description: s.string().max(240),
      date: s.isodate(),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      category: s.string().optional(),
      accent: accentSchema.optional(),
      cover: s.string().optional(),
      coverVariant: s.enum(["seo-mdx", "budget", "vitals", "minimal"]).optional(),
      draft: s.boolean().default(false),
      path: s.path(),
      metadata: s.metadata(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(({ path, metadata, category, ...data }) => ({
      ...data,
      category: category ?? data.tags[0]?.toUpperCase() ?? "ARTICLE",
      slug: path.replace(/^blog\//, ""),
      readingTime: Math.max(1, Math.round(metadata.readingTime)),
    })),
});

/**
 * Portfolio projects (`content/projects/*.mdx`).
 * Minimal frontmatter to add a new project: `title`, `summary`, `category`, `year`, `order`.
 * Set `status: "coming-soon"` for in-development placeholder cards, or leave `"published"`.
 */
const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(80),
      subtitle: s.string().optional(),
      summary: s.string().max(260),
      category: s.string(),
      year: s.string(),
      order: s.number(),
      featured: s.boolean().default(false),
      status: s.enum(["published", "coming-soon"]).default("published"),
      accent: accentSchema.optional(),
      blueprintFile: s.string().optional(),
      blueprintProgress: s.string().optional(),
      blueprintTag: s.string().optional(),
      role: s.string().optional(),
      projectType: s.string().optional(),
      stack: s.array(s.string()).optional(),
      statusText: s.string().optional(),
      showcase: s
        .object({
          domain: s.string(),
          period: s.string(),
          sidebarTitle: s.string(),
          navItems: s.array(s.string()).default([]),
          stats: s.array(s.object({ label: s.string(), value: s.string() })).default([]),
          activities: s
            .array(
              s.object({
                date: s.string(),
                title: s.string(),
                badge: s.string(),
                tone: s.enum(["accent", "yellow", "blue"]).default("accent"),
              }),
            )
            .default([]),
          caption: s.string().optional(),
        })
        .optional(),
      tags: s.array(s.string()).default([]),
      cover: s.string().optional(),
      repo: s.string().optional(),
      live: s.string().optional(),
      contributors: s
        .array(
          s.object({
            name: s.string(),
            github: s.string(),
            url: s.string(),
          }),
        )
        .default([]),
      path: s.path(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(({ path, ...data }) => ({
      ...data,
      slug: path.replace(/^projects\//, ""),
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false }],
      [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["heading-anchor"] } }],
    ],
  },
});
