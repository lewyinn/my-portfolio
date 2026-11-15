import Link from "next/link";
import { SectionHeading } from "@/components/ui/animated-text";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Media } from "@/components/ui/media";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getProjects, type Project } from "@/lib/content";
import { t as dict, type Dictionary } from "@/lib/dictionary";

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

const blueprintAccent = {
  blue: {
    dot: "bg-deco-blue",
    pill: "border-deco-blue/30 bg-ink/85 text-deco-blue",
    glow: "radial-gradient(circle at 50% 45%, rgb(76 194 255 / 0.16), transparent 68%)",
    bar: "bg-deco-blue/65",
    line: "border-deco-blue/25",
  },
  teal: {
    dot: "bg-deco-teal",
    pill: "border-deco-teal/30 bg-ink/85 text-deco-teal",
    glow: "radial-gradient(circle at 50% 45%, rgb(45 212 191 / 0.16), transparent 68%)",
    bar: "bg-deco-teal/65",
    line: "border-deco-teal/25",
  },
  yellow: {
    dot: "bg-deco-yellow",
    pill: "border-deco-yellow/30 bg-ink/85 text-deco-yellow",
    glow: "radial-gradient(circle at 50% 45%, rgb(242 193 78 / 0.16), transparent 68%)",
    bar: "bg-deco-yellow/65",
    line: "border-deco-yellow/25",
  },
  accent: {
    dot: "bg-accent",
    pill: "border-accent/30 bg-ink/85 text-accent",
    glow: "radial-gradient(circle at 50% 45%, rgb(94 242 176 / 0.16), transparent 68%)",
    bar: "bg-accent/65",
    line: "border-accent/25",
  },
} as const;

function FeaturedPreview({
  project,
  t,
  priority = false,
}: {
  project: Project;
  t: Dictionary["work"];
  priority?: boolean;
}) {
  if (project.cover || !project.showcase) {
    return (
      <Media
        src={project.cover}
        alt={`${project.title} ${t.screenshot}`}
        label={`${project.title} ${t.screenshot} · 1600×1000`}
        priority={priority}
        className="absolute inset-0 transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-surface-deep p-6 transition-[scale] duration-700 ease-out group-hover:scale-[1.03]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 35%, rgb(94 242 176 / 0.12), transparent 68%)",
      }}
    >
      <div className="w-full max-w-[440px] overflow-hidden rounded-xl border border-white/10 bg-ink/90 shadow-none">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-3.5 py-2.5 font-mono text-[10px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-accent/70" />
          </span>
          <span className="truncate">{project.showcase.domain}</span>
          <span className="text-accent">LIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-2 border-b border-white/[0.06] p-3.5">
          {project.showcase.stats.slice(0, 3).map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/[0.06] bg-surface p-2.5"
            >
              <p className="truncate font-mono text-[9px] text-muted uppercase">{stat.label}</p>
              <p className="mt-1 truncate text-xs font-semibold text-fg">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 p-3.5">
          {project.showcase.activities.slice(0, 2).map((act) => (
            <div
              key={act.title}
              className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.05] bg-surface/60 px-3 py-2 text-[11px]"
            >
              <span className="truncate text-fg/90">{act.title}</span>
              <span className="shrink-0 rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[9px] text-accent">
                {act.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type CardProps = { project: Project; t: Dictionary["work"]; priority?: boolean };

function FeaturedCard({ project, t, priority = false }: CardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`${cardClass} grid rounded-3xl md:grid-cols-2`}
    >
      <div className={sheenClass} />
      <div className="relative min-h-[280px] overflow-hidden border-b border-white/[0.08] md:min-h-[440px] md:border-r md:border-b-0">
        <FeaturedPreview project={project} t={t} priority={priority} />
        <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-ink/85 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.2em]">
          <span className="size-1.5 rounded-full bg-accent" />
          {t.featured}
        </span>
      </div>
      <div className="relative flex flex-col justify-center gap-4 p-6 md:gap-5 md:p-10">
        <span
          aria-hidden="true"
          className="absolute top-4 right-6 bg-gradient-to-b from-white/15 to-transparent bg-clip-text font-display text-7xl leading-none text-transparent md:top-6 md:right-8 md:text-[120px]"
        >
          01
        </span>
        <span className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase">
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
          {t.viewProject}
        </span>
      </div>
    </Link>
  );
}

function UpcomingProjectCard({
  project,
  index,
  t,
}: {
  project: Project;
  index: number;
  t: Dictionary["work"];
}) {
  const numStr = String(index).padStart(2, "0");
  const toneKey = project.accent ?? (index % 2 === 0 ? "blue" : "teal");
  const tone = blueprintAccent[toneKey];
  const fileLabel = project.blueprintFile ?? `project-${numStr}.tsx`;
  const progressLabel = project.blueprintProgress ?? (index % 2 === 0 ? "DEV · 70%" : "DEV · 55%");
  const moduleTag = project.blueprintTag ?? (index % 2 === 0 ? "MODULE A" : "MODULE B");

  return (
    <article className={`${cardClass} flex h-full flex-col`}>
      <div
        className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.08] bg-surface-deep p-5"
        style={{ backgroundImage: tone.glow }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px] opacity-60"
        />

        {/* Top-left simple Category Pill ("● SEGERA HADIR") */}
        <span className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/85 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.16em] uppercase">
          <span className={`size-1.5 rounded-full ${tone.dot}`} />
          {t.comingSoon}
        </span>

        {/* Top-right Badge ("02 · IN DEV", replaces arrow so non-clickable is obvious) */}
        <span className="absolute top-5 right-5 rounded-full border border-white/10 bg-ink/85 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
          {numStr} · {t.inDev}
        </span>

        {/* Mini Dark UI Blueprint Window */}
        <div
          className={`relative mx-auto mt-5 w-full max-w-[360px] rounded-xl border bg-ink/90 p-3.5 ${tone.line}`}
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] pb-2 font-mono text-[10px] text-muted">
            <span className="truncate">{fileLabel}</span>
            <span className="shrink-0 text-fg/80">{progressLabel}</span>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className={`h-2 w-24 rounded-full ${tone.bar}`} />
              <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-muted">
                {moduleTag}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <span className="h-8 rounded-lg border border-white/[0.06] bg-surface/80" />
              <span className="h-8 rounded-lg border border-white/[0.06] bg-surface/80" />
              <span className="h-8 rounded-lg border border-white/[0.06] bg-surface/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal body per Figma revision: no specific project title and no description */}
      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <div className={sheenClass} />
        <span className="relative flex justify-between font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
          <span>{t.caseStudyLabel}</span>
          <span>{numStr}</span>
        </span>
        <h3 className="relative font-display text-[36px] leading-[0.95] uppercase">
          {t.comingSoon}
        </h3>
        <div className="relative mt-auto flex items-center justify-between border-t border-white/[0.08] pt-3.5 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          <span className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${tone.dot}`} />
            {t.inProgressFooter}
          </span>
          <span>{project.year}</span>
        </div>
      </div>
    </article>
  );
}

function PublishedProjectCard({ project, index, t }: CardProps & { index: number }) {
  const numStr = String(index).padStart(2, "0");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`${cardClass} flex h-full flex-col hover:-translate-y-1`}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.08]">
        <Media
          src={project.cover}
          alt={`${project.title} ${t.screenshot}`}
          label={t.screenshot}
          className="absolute inset-0 transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-3.5 left-3.5 rounded-full border border-white/15 bg-ink/85 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase">
          {project.category}
        </span>
        <CornerArrow className="absolute top-3 right-3" />
      </div>
      <div className="relative flex flex-1 flex-col gap-2.5 p-6">
        <div className={sheenClass} />
        <span className="relative flex justify-between font-mono text-[11px] tracking-[0.24em] text-muted">
          <span>{project.year}</span>
          <span>{numStr}</span>
        </span>
        <h3 className="relative font-display text-[40px] leading-[0.95] uppercase">
          {project.title}
        </h3>
        <p className="relative text-sm leading-relaxed text-muted">{project.summary}</p>
        <span className="relative mt-auto flex items-center gap-2 border-t border-white/[0.08] pt-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted transition-colors group-hover:text-fg">
          {t.viewCase}
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
  const t = dict.work;
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
            <SectionLabel>{t.label}</SectionLabel>
            <SectionHeading as={headingAs} lead={t.lead} accent={t.accent} />
          </div>
          <Reveal className="max-w-[460px] md:text-right">
            <p className="leading-relaxed text-muted">{t.intro}</p>
          </Reveal>
        </div>

        {featured ? (
          <Reveal>
            <FeaturedCard project={featured} t={t} priority={headingAs === "h1"} />
          </Reveal>
        ) : null}

        <Stagger className="grid gap-4 md:grid-cols-2" stagger={0.12}>
          {others.map((project, i) => (
            <StaggerItem key={project.slug} className="h-full">
              {project.status === "coming-soon" ? (
                <UpcomingProjectCard project={project} index={i + 2} t={t} />
              ) : (
                <PublishedProjectCard project={project} index={i + 2} t={t} />
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
