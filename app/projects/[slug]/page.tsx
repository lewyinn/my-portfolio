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

// Every slug is prerendered from generateStaticParams, so known pages load instantly.
// Only an unknown slug (a 404) has to wait for the server, which is fine.
export const instant = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case study`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projects = getProjects();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  const links = [
    project.live ? { href: project.live, label: "Live site" } : null,
    project.repo ? { href: project.repo, label: "Source code" } : null,
  ].filter((link) => link !== null);

  return (
    <Container className="py-12 md:py-20">
      <Link
        href="/work"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeftIcon className="size-4" />
        All projects
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
          alt={`${project.title} screenshot`}
          label={`${project.title} hero screenshot · 1600×1000`}
          priority
          sizes="(min-width: 1280px) 1184px, 100vw"
          className="aspect-[16/10] rounded-[20px] border border-line"
        />
      </Reveal>

      <Reveal className="prose-article mx-auto mt-14 max-w-[68ch]">
        <MDXContent code={project.body} />
      </Reveal>

      {next && next !== project ? (
        <Reveal className="mt-20">
          <Link
            href={`/projects/${next.slug}`}
            className={`${cardClass} flex flex-col gap-3 rounded-3xl p-6 md:p-10`}
          >
            <span className="text-[11px] tracking-[0.32em] text-muted uppercase">Next project</span>
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
