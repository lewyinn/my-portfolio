import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/mdx-content";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { getProject, getProjects } from "@/lib/content";
import { languageAlternates, localePath } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

// Every slug is prerendered from generateStaticParams, so known pages load instantly.
// Only an unknown slug (a 404) has to wait for the server, which is fine.
export const instant = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const project = getProject(slug);
  if (!project) return {};

  const path = `/projects/${project.slug}`;
  return {
    title: `${project.title} · ${t.project.caseStudy}`,
    description: project.summary,
    alternates: { canonical: localePath(locale, path), languages: languageAlternates(path) },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const project = getProject(slug);
  if (!project) notFound();

  const projects = getProjects();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  const links = [
    project.live ? { href: project.live, label: t.project.live } : null,
    project.repo ? { href: project.repo, label: t.project.source } : null,
  ].filter((link) => link !== null);

  return (
    <Container className="py-12 md:py-20">
      <Link
        href={localePath(locale, "/work")}
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeftIcon className="size-4" />
        {t.project.all}
      </Link>

      <header className="mt-8 flex flex-col gap-6 border-b border-line pb-10">
        <Reveal className="flex flex-col gap-5">
          <p className="text-[11px] tracking-[0.32em] text-muted uppercase">
            {project.category} · {project.year}
          </p>
          <h1 className="font-display text-[clamp(64px,10vw,152px)] leading-[0.88] uppercase">
            {project.title}
          </h1>
          {project.subtitle ? <p className="text-xl text-muted">{project.subtitle}</p> : null}
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Chip>{tag}</Chip>
              </li>
            ))}
          </ul>
          {links.length ? (
            <div className="flex flex-wrap gap-2.5">
              {links.map((link) => (
                <ButtonLink key={link.label} href={link.href} arrow>
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </Reveal>
      </header>

      <Reveal className="mt-10">
        <Media
          src={project.cover}
          alt={`${project.title} ${t.work.screenshot}`}
          label={`${project.title} ${t.project.heroLabel} · 1600×1000`}
          priority
          sizes="(min-width: 1280px) 1184px, 100vw"
          className="aspect-[16/10] rounded-[20px] border border-line"
        />
      </Reveal>

      <Reveal className="prose-article mx-auto mt-14 max-w-[68ch]">
        <MDXContent code={project.body} locale={locale} />
      </Reveal>

      {next && next !== project ? (
        <Reveal className="mt-20">
          <Link
            href={localePath(locale, `/projects/${next.slug}`)}
            className={`${cardClass} flex flex-col gap-3 rounded-3xl p-6 md:p-10`}
          >
            <span className="text-[11px] tracking-[0.32em] text-muted uppercase">
              {t.project.next}
            </span>
            <span className="flex items-center justify-between gap-4">
              <span className="font-display text-[clamp(44px,6vw,88px)] leading-[0.9] uppercase">
                {next.title}
              </span>
              <ArrowUpRightIcon className="size-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:size-12" />
            </span>
          </Link>
        </Reveal>
      ) : null}
    </Container>
  );
}
