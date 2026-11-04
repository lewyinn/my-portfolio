import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/mdx-content";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClass } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { JsonLd } from "@/components/ui/json-ld";
import { PostCard, postCardLabels } from "@/components/ui/post-card";
import { Reveal } from "@/components/ui/reveal";
import { getPost, getPosts } from "@/lib/content";
import { formatDate, relatedByTags } from "@/lib/content-utils";
import { languageAlternates, localeLabels, localePath } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { site } from "@/lib/site";

// Every slug is prerendered from generateStaticParams, so known pages load instantly.
// Only an unknown slug (a 404) has to wait for the server, which is fine.
export const instant = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getI18n();
  const post = getPost(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: localePath(locale, path), languages: languageAlternates(path) },
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

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedByTags(post, getPosts());
  const home = `${site.url}${localePath(locale, "/")}`;
  const blog = `${site.url}${localePath(locale, "/blog")}`;
  const url = `${site.url}${localePath(locale, `/blog/${post.slug}`)}`;
  const cardLabels = postCardLabels(t);

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
        <Link
          href={localePath(locale, "/blog")}
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeftIcon className="size-4" />
          {t.common.allArticles}
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
          <article className="min-w-0">
            <Reveal className="flex flex-col gap-5 border-b border-line pb-10">
              <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
                <time dateTime={post.date}>{formatDate(post.date, localeLabels[locale].date)}</time>{" "}
                · {post.readingTime} {t.common.minRead}
              </p>
              <h1 className="font-display text-[clamp(48px,7vw,96px)] leading-[0.92] uppercase">
                {post.title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted">{post.description}</p>
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="prose-article mt-10 max-w-[68ch]">
              <MDXContent code={post.body} locale={locale} />
            </Reveal>
          </article>

          {post.toc.length ? (
            <aside className="hidden lg:block">
              <nav aria-label={t.post.onThisPage} className="sticky top-28 flex flex-col gap-3">
                <p className="text-[11px] tracking-[0.24em] text-muted uppercase">
                  {t.post.onThisPage}
                </p>
                <ul className="flex flex-col gap-2 border-l border-line text-sm">
                  {post.toc.map((entry) => (
                    <li key={entry.url}>
                      <a
                        href={entry.url}
                        className="-ml-px block border-l border-transparent py-1 pl-4 text-muted transition-colors hover:border-fg hover:text-fg"
                      >
                        {entry.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          ) : null}
        </div>

        <Reveal
          className={`${cardClass} mt-20 flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center md:p-8`}
        >
          <p className="relative font-display text-3xl leading-none md:text-4xl">
            {t.post.ctaLead} <span className="text-accent">{t.post.ctaAccent}</span>
          </p>
          <ButtonLink
            href={localePath(locale, "/#contact")}
            variant="primary"
            arrow
            className="relative"
          >
            {t.common.startProject}
          </ButtonLink>
        </Reveal>

        {related.length ? (
          <section aria-labelledby="related" className="mt-20 flex flex-col gap-6">
            <h2 id="related" className="font-display text-4xl leading-none md:text-5xl">
              {t.post.keep} <span className="text-accent">{t.post.reading}</span>
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <PostCard post={item} locale={locale} labels={cardLabels} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </>
  );
}
