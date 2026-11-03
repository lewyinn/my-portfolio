import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(200),
      date: s.isodate(),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      cover: s.string().optional(),
      draft: s.boolean().default(false),
      path: s.path(),
      metadata: s.metadata(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(({ path, metadata, ...data }) => ({
      ...data,
      slug: path.replace(/^blog\//, ""),
      readingTime: Math.max(1, Math.round(metadata.readingTime)),
    })),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(60),
      subtitle: s.string().optional(),
      summary: s.string().max(200),
      category: s.string(),
      year: s.string(),
      order: s.number(),
      featured: s.boolean().default(false),
      tags: s.array(s.string()).default([]),
      cover: s.string().optional(),
      repo: s.string().optional(),
      live: s.string().optional(),
      path: s.path(),
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
