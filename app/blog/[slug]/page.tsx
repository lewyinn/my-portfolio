import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/mdx-content";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { EditorialCover, getCoverTone } from "@/components/ui/editorial-cover";
import { JsonLd } from "@/components/ui/json-ld";
import { PostCard, postCardLabels } from "@/components/ui/post-card";
import { Reveal } from "@/components/ui/reveal";
import { SmartBackLink } from "@/components/ui/smart-back-link";
import { getPost, getPosts } from "@/lib/content";
import { formatDate, relatedByTags } from "@/lib/content-utils";
import { t } from "@/lib/dictionary";
import { contact, site } from "@/lib/site";

export const instant = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.fullName],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedByTags(post, getPosts());
  const home = site.url;
  const blog = `${site.url}/blog`;
  const url = `${site.url}/blog/${post.slug}`;
  const cardLabels = postCardLabels(t);
  const categoryTone = getCoverTone(post.slug, post.coverVariant, post.accent);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            author: { "@type": "Person", name: site.fullName, url: home },
            mainEntityOfPage: url,
            keywords: post.tags.join(", "),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: t.post.home, item: home },
              { "@type": "ListItem", position: 2, name: t.blog.title, item: blog },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ]}
      />

      <Container className="py-12 md:py-20">
        <SmartBackLink
          fallbackHref="/blog"
          fallbackLabel={t.post.backAll}
          homeLabel={t.common.backHome}
        />

        {/* Hero Split */}
        <header className="mt-6 grid items-stretch gap-8 border-b border-line pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-12">
          <Reveal className="flex flex-col justify-center gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase ${categoryTone.pill}`}
              >
                <span className={`size-1.5 rounded-full ${categoryTone.dot}`} />
                {post.category}
              </span>
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                <time dateTime={post.date}>{formatDate(post.date, site.dateLocale)}</time> ·{" "}
                {post.readingTime} {t.common.minRead}
              </p>
            </div>

            <h1 className="font-display text-[clamp(44px,6vw,78px)] leading-[0.94] uppercase">
              {post.title}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {post.description}
            </p>

            {post.tags.length ? (
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Chip>{tag}</Chip>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-center">
            <EditorialCover
              slug={post.slug}
              category={post.category}
              variant={post.coverVariant}
              accent={post.accent}
              tags={post.tags}
              mode="hero"
            />
          </Reveal>
        </header>

        {/* 2-col Comfortable Reading Grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-14">
          <article className="min-w-0">
            <Reveal className="prose-article max-w-[74ch]">
              <MDXContent code={post.body} />
            </Reveal>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-5">
              {post.toc.length ? (
                <nav
                  aria-label={t.post.onThisPage}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                    {t.post.onThisPage}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2 border-l border-line text-sm">
                    {post.toc.map((entry) => (
                      <li key={entry.url}>
                        <a
                          href={entry.url}
                          className="-ml-px block border-l border-transparent py-1 pl-3.5 text-muted transition-colors hover:border-accent hover:text-fg"
                        >
                          {entry.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}

              <div className={`${cardClass} flex flex-col gap-2.5 p-5`}>
                <div className={sheenClass} />
                <span className="relative font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {t.post.authorLabel}
                </span>
                <p className="relative text-lg font-semibold text-fg">{site.name}</p>
                <p className="relative font-mono text-[11px] text-accent">{site.role}</p>
                <p className="relative text-xs leading-relaxed text-muted">{t.post.authorBio}</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Discussion CTA Banner */}
        <Reveal
          className={`${cardClass} mt-16 flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center md:p-8`}
        >
          <div className={sheenClass} />
          <div className="relative flex flex-col gap-1.5">
            <p className="font-display text-3xl leading-none uppercase md:text-4xl">
              {t.post.ctaTitle}
            </p>
            <p className="max-w-xl text-sm text-muted">{t.post.ctaDesc}</p>
          </div>
          <ButtonLink
            href={contact.emailHref}
            variant="primary"
            arrow
            className="relative shrink-0"
          >
            {t.post.ctaBtn}
          </ButtonLink>
        </Reveal>

        {/* Related Articles Grid */}
        {related.length ? (
          <section aria-labelledby="related" className="mt-20 flex flex-col gap-6">
            <h2 id="related" className="font-display text-4xl leading-none uppercase md:text-5xl">
              {t.post.keep} <span className="text-accent">{t.post.reading}</span>
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {related.map((item, idx) => (
                <li key={item.slug}>
                  <PostCard post={item} index={idx} labels={cardLabels} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </>
  );
}
