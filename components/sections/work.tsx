import Link from "next/link";
import { SectionHeading } from "@/components/ui/animated-text";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Media } from "@/components/ui/media";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getProjects, type Project } from "@/lib/content";

/** Round arrow button in a card corner that inverts and rotates on hover. */
function CornerArrow({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex size-11 items-center justify-center rounded-full border border-white/15 bg-ink/85 transition-[background-color,color,rotate] duration-500 group-hover:rotate-45 group-hover:bg-fg group-hover:text-ink ${className}`}
    >
      <ArrowUpRightIcon strokeWidth={2.2} className="size-4" />
    </span>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`${cardClass} grid rounded-3xl md:grid-cols-2`}
    >
      <div className={sheenClass} />
      <div className="relative min-h-[260px] overflow-hidden border-b border-white/[0.08] md:min-h-[440px] md:border-r md:border-b-0">
        <Media
          src={project.cover}
          alt={`${project.title} screenshot`}
          label={`${project.title} screenshot · 1600×1000`}
          priority
          className="absolute inset-0 transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-ink/85 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em]">
          <span className="size-1.5 rounded-full bg-accent" />
          FEATURED
        </span>
      </div>
      <div className="relative flex flex-col justify-center gap-4 p-6 md:gap-5 md:p-10">
        <span
          aria-hidden="true"
          className="absolute top-4 right-6 bg-gradient-to-b from-white/15 to-transparent bg-clip-text font-display text-7xl leading-none text-transparent md:top-6 md:right-8 md:text-[120px]"
        >
          01
        </span>
        <span className="text-[11px] tracking-[0.32em] text-muted uppercase">
          {project.category}
        </span>
        <h3 className="font-display text-[clamp(52px,5.4vw,80px)] leading-[0.9] uppercase">
          {project.title}
        </h3>
        {project.subtitle ? <p className="text-muted">{project.subtitle}</p> : null}
        <p className="leading-relaxed text-muted">{project.summary}</p>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Chip>{tag}</Chip>
            </li>
          ))}
        </ul>
        <span className="mt-2 flex items-center gap-4 text-xs font-bold tracking-[0.16em]">
          <CornerArrow />
          VIEW PROJECT
        </span>
      </div>
    </Link>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`${cardClass} flex h-full flex-col hover:-translate-y-1`}
    >
      <div className="relative aspect-video overflow-hidden border-b border-white/[0.08]">
        <Media
          src={project.cover}
          alt={`${project.title} screenshot`}
          label="Screenshot"
          className="absolute inset-0 transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-3.5 left-3.5 rounded-full border border-white/15 bg-ink/85 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase">
          {project.category}
        </span>
        <CornerArrow className="absolute top-3 right-3" />
      </div>
      <div className="relative flex flex-1 flex-col gap-2.5 p-6">
        <div className={sheenClass} />
        <span className="relative flex justify-between text-[11px] tracking-[0.24em] text-muted">
          <span>{project.year}</span>
          <span>{String(index).padStart(2, "0")}</span>
        </span>
        <h3 className="relative font-display text-[40px] leading-[0.95] uppercase">
          {project.title}
        </h3>
        <p className="relative text-sm leading-relaxed text-muted">{project.summary}</p>
        <span className="relative mt-auto flex items-center gap-2 border-t border-white/[0.08] pt-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted transition-colors group-hover:text-fg">
          VIEW CASE STUDY
          <ArrowUpRightIcon strokeWidth={2.2} className="size-3" />
        </span>
      </div>
    </Link>
  );
}

type WorkProps = {
  /** Use "h1" when the section is the main content of its own page (/work). */
  headingAs?: "h1" | "h2";
};

export function Work({ headingAs = "h2" }: WorkProps) {
  const projects = getProjects();
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const others = projects.filter((project) => project !== featured);

  return (
    <section id="work" className="relative overflow-hidden">
      <SectionGlow />
      <GlowOrb strength={0.05} className="top-[25%] left-1/2 size-[820px] -translate-x-1/2" />

      <Container className="flex flex-col gap-10 py-24 md:py-32">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-10">
          <div className="flex flex-col gap-3">
            <SectionLabel>Selected projects</SectionLabel>
            <SectionHeading as={headingAs} lead="MY" accent="WORK" />
          </div>
          <Reveal className="max-w-[420px] md:text-right">
            <p className="leading-relaxed text-muted">
              Recent websites and mobile apps — design and development, end to end.
            </p>
          </Reveal>
        </div>

        {featured ? (
          <Reveal>
            <FeaturedCard project={featured} />
          </Reveal>
        ) : null}

        <Stagger className="grid gap-4 md:grid-cols-2" stagger={0.12}>
          {others.map((project, i) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} index={i + 2} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal
          className={`${cardClass} flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center md:px-8 md:py-6`}
        >
          <p className="relative flex items-baseline gap-3.5">
            <span className="font-display text-[52px] leading-none">[X]+</span>
            <span className="text-sm text-muted">
              websites and apps shipped for startups and growing brands
            </span>
          </p>
          <ButtonLink
            href="/#contact"
            variant="primary"
            arrow
            className="relative w-full sm:w-auto"
          >
            Start yours
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
