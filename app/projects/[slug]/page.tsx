import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/mdx-content";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/ui/icons";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { SmartBackLink } from "@/components/ui/smart-back-link";
import { getProject, getProjects } from "@/lib/content";
import { t } from "@/lib/dictionary";
import { contact } from "@/lib/site";

export const instant = false;

export function generateStaticParams() {
  return getProjects()
    .filter((project) => project.status !== "coming-soon")
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.status === "coming-soon") return {};

  return {
    title: `${project.title} · ${t.project.caseStudy}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

const activityTone = {
  accent: "border-accent/25 bg-accent/10 text-accent",
  yellow: "border-deco-yellow/25 bg-deco-yellow/10 text-deco-yellow",
  blue: "border-deco-blue/25 bg-deco-blue/10 text-deco-blue",
} as const;

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.status === "coming-soon") notFound();

  const projects = getProjects();
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const next = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : undefined;

  const links = [
    project.live ? { href: project.live, label: t.project.live } : null,
    project.repo ? { href: project.repo, label: t.project.source } : null,
  ].filter((link) => link !== null);

  const quickFacts = [
    { label: t.project.facts.role, value: project.role ?? t.project.facts.defaultRole, dot: false },
    { label: t.project.facts.type, value: project.projectType ?? project.category, dot: false },
    {
      label: t.project.facts.stack,
      value: (project.stack?.length ? project.stack : project.tags).join(" · "),
      dot: false,
    },
    {
      label: t.project.facts.status,
      value: project.statusText ?? t.project.facts.defaultStatus,
      dot: true,
    },
  ];

  return (
    <Container className="py-12 md:py-20">
      <SmartBackLink
        fallbackHref="/work"
        fallbackLabel={t.project.backAll}
        homeLabel={t.common.backHome}
      />

      {/* Project Hero Header */}
      <header className="mt-6 flex flex-col gap-5 pb-10">
        <Reveal className="flex flex-wrap items-center gap-3">
          {project.featured ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-accent uppercase">
              <span className="size-1.5 rounded-full bg-accent" />
              {t.project.featuredCaseStudy}
            </span>
          ) : null}
          <p className="font-mono text-[11px] tracking-[0.26em] text-muted uppercase">
            {project.category} · {project.year}
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-3">
          <h1 className="font-display text-[clamp(64px,9vw,132px)] leading-[0.88] uppercase">
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className="text-xl font-medium text-fg/90 md:text-2xl">{project.subtitle}</p>
          ) : null}
          <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            {project.summary}
          </p>
        </Reveal>

        {links.length ? (
          <Reveal delay={0.08} className="flex flex-wrap gap-2.5 pt-1">
            {links.map((link) => (
              <ButtonLink key={link.label} href={link.href} arrow>
                {link.label}
              </ButtonLink>
            ))}
          </Reveal>
        ) : null}
      </header>

      {/* 4-col Quick Facts Bento */}
      <Reveal className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {quickFacts.map((fact) => (
          <div key={fact.label} className={`${cardClass} flex flex-col gap-2 p-4 md:p-5`}>
            <div className={sheenClass} />
            <span className="relative font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
              {fact.label}
            </span>
            <span className="relative flex items-center gap-2 text-sm font-medium text-fg md:text-[15px]">
              {fact.dot ? <span className="size-2 shrink-0 rounded-full bg-accent" /> : null}
              {fact.value}
            </span>
          </div>
        ))}
      </Reveal>

      {/* Hero UI Showcase or Cover Media */}
      <Reveal className="mt-8">
        {!project.cover && project.showcase ? (
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-deep">
              {/* Window Chrome */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-ink/80 px-4 py-3 font-mono text-[11px] text-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-accent/70" />
                  </span>
                  <span className="rounded-md border border-white/[0.07] bg-surface px-2.5 py-0.5 text-fg/80">
                    {project.showcase.domain}
                  </span>
                </div>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] tracking-[0.14em] uppercase">
                  {project.showcase.period}
                </span>
              </div>

              {/* Dashboard Mockup Body */}
              <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
                <aside className="border-b border-white/[0.08] bg-ink/50 p-4 md:border-r md:border-b-0 md:p-5">
                  <p className="font-mono text-xs font-semibold tracking-[0.18em] text-fg uppercase">
                    {project.showcase.sidebarTitle}
                  </p>
                  <ul className="mt-4 flex flex-col gap-1.5 text-xs">
                    {project.showcase.navItems.map((navItem, idx) => (
                      <li
                        key={navItem}
                        className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${
                          idx === 0
                            ? "border border-accent/20 bg-accent/10 font-medium text-accent"
                            : "text-muted"
                        }`}
                      >
                        <span aria-hidden="true">{idx === 0 ? "●" : "○"}</span>
                        <span>{navItem}</span>
                      </li>
                    ))}
                  </ul>
                </aside>

                <div className="flex flex-col gap-4 p-4 md:p-6">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.showcase.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-white/[0.07] bg-surface p-3.5"
                      >
                        <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                          {stat.label}
                        </p>
                        <p className="mt-1.5 font-display text-2xl leading-none text-fg">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-surface p-4">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                      AKTIVITAS TERKINI
                    </p>
                    <ul className="mt-3 flex flex-col divide-y divide-white/[0.06]">
                      {project.showcase.activities.map((act) => (
                        <li
                          key={`${act.date}-${act.title}`}
                          className="flex flex-col justify-between gap-2 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                        >
                          <div className="min-w-0">
                            <p className="font-mono text-[10px] text-muted">{act.date}</p>
                            <p className="truncate text-sm text-fg">{act.title}</p>
                          </div>
                          <span
                            className={`shrink-0 self-start rounded-full border px-2.5 py-0.5 font-mono text-[10px] sm:self-auto ${
                              activityTone[act.tone]
                            }`}
                          >
                            {act.badge}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {project.showcase.caption ? (
              <p className="text-center text-xs text-muted">{project.showcase.caption}</p>
            ) : null}
          </div>
        ) : (
          <Media
            src={project.cover}
            alt={`${project.title} ${t.work.screenshot}`}
            label={`${project.title} ${t.project.heroLabel} · 1600×1000`}
            priority
            sizes="(min-width: 1280px) 1184px, 100vw"
            className="aspect-[16/10] rounded-2xl border border-line"
          />
        )}
      </Reveal>

      {/* 2-col Case Study Reading Flow */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        <aside className="order-2 lg:order-1">
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            {project.toc.length ? (
              <nav
                aria-label={t.project.inThisCase}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                  {t.project.inThisCase}
                </p>
                <ol className="mt-3 flex flex-col gap-2.5">
                  {project.toc.map((entry, idx) => (
                    <li key={entry.url}>
                      <a
                        href={entry.url}
                        className="flex items-baseline gap-2.5 text-sm text-muted transition-colors hover:text-fg"
                      >
                        <span className="font-mono text-[11px] text-accent">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{entry.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            {project.contributors.length ? (
              <div className="rounded-2xl border border-line bg-surface p-5">
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                  {t.project.contributors}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {project.contributors.map((member) => (
                    <li key={member.url}>
                      <a
                        href={member.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-fg transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <GitHubIcon className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                          <span className="truncate font-mono text-xs text-muted transition-colors group-hover:text-fg">
                            {member.github} -{" "}
                            <span className="font-sans font-medium text-fg">{member.name}</span>
                          </span>
                        </span>
                        <ArrowUpRightIcon className="size-3.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className={`${cardClass} flex flex-col gap-3 p-5`}>
              <div className={sheenClass} />
              <p className="relative font-mono text-[11px] font-semibold tracking-[0.16em] text-fg uppercase">
                {t.project.similarCtaTitle}
              </p>
              <p className="relative text-xs leading-relaxed text-muted">
                {t.project.similarCtaDesc}
              </p>
              <ButtonLink
                href={contact.emailHref}
                variant="primary"
                arrow
                className="relative mt-1"
              >
                {t.project.similarCtaBtn}
              </ButtonLink>
            </div>
          </div>
        </aside>

        <Reveal className="prose-article order-1 max-w-[72ch] lg:order-2">
          <MDXContent code={project.body} />
        </Reveal>
      </div>

      {/* Bottom Next Project / Explore Portfolio Banner */}
      <Reveal className="mt-20 grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {next && next !== project ? (
          next.status === "coming-soon" ? (
            <div
              className={`${cardClass} flex flex-col justify-between gap-4 rounded-2xl p-6 md:p-8`}
            >
              <div className={sheenClass} />
              <span className="relative font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
                {t.project.nextComingSoon}
              </span>
              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <span className="font-display text-[clamp(36px,5vw,60px)] leading-[0.9] uppercase">
                  {t.project.comingSoonTitle}
                </span>
                <Chip>{t.project.inReleaseStage}</Chip>
              </div>
            </div>
          ) : (
            <Link
              href={`/projects/${next.slug}`}
              className={`${cardClass} flex flex-col justify-between gap-4 rounded-2xl p-6 md:p-8`}
            >
              <div className={sheenClass} />
              <span className="relative font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
                {t.project.next}
              </span>
              <span className="relative flex items-center justify-between gap-4">
                <span className="font-display text-[clamp(36px,5vw,60px)] leading-[0.9] uppercase">
                  {next.title}
                </span>
                <ArrowUpRightIcon className="size-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:size-10" />
              </span>
            </Link>
          )
        ) : null}

        <Link
          href="/work"
          className={`${cardClass} flex flex-col justify-between gap-4 rounded-2xl p-6 md:p-8`}
        >
          <div className={sheenClass} />
          <span className="relative font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
            {t.project.exploreOthers}
          </span>
          <span className="relative flex items-center justify-between gap-4 font-display text-3xl leading-none uppercase md:text-4xl">
            <span>{t.project.allPortfolio}</span>
            <ArrowUpRightIcon className="size-7 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </Link>
      </Reveal>
    </Container>
  );
}
