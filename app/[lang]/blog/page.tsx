import type { Metadata } from "next";
import { BlogList } from "@/components/sections/blog-list";
import { SectionHeading } from "@/components/ui/animated-text";
import { Container } from "@/components/ui/container";
import { postCardLabels, toPostCard } from "@/components/ui/post-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getPosts } from "@/lib/content";
import { languageAlternates, localePath } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.blog.title,
    description: t.blog.description,
    alternates: { canonical: localePath(locale, "/blog"), languages: languageAlternates("/blog") },
  };
}

export default async function BlogPage() {
  const { locale, t } = await getI18n();
  const posts = getPosts().map(toPostCard);

  return (
    <Container className="flex flex-col gap-12 py-16 md:gap-16 md:py-24">
      <header className="flex flex-col gap-4">
        <SectionLabel>{t.blog.label}</SectionLabel>
        <SectionHeading
          as="h1"
          lead={t.blog.lead}
          accent={t.blog.accent}
          className="font-display text-[clamp(64px,10vw,152px)] leading-[0.88]"
        />
        <Reveal>
          <p className="max-w-xl leading-relaxed text-muted">{t.blog.description}</p>
          {t.blog.languageNote ? (
            <p className="mt-2 text-sm text-muted">{t.blog.languageNote}</p>
          ) : null}
        </Reveal>
      </header>
      <BlogList
        posts={posts}
        locale={locale}
        labels={{ ...postCardLabels(t), all: t.blog.all, filter: t.blog.filter }}
      />
    </Container>
  );
}
