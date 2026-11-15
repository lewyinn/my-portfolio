import { SectionHeading } from "@/components/ui/animated-text";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { GitHubIcon, LinkedInIcon, TechBrandIcon } from "@/components/ui/icons";
import { Media } from "@/components/ui/media";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { about, aboutPhoto } from "@/lib/about";
import { stackGroups } from "@/lib/data";
import { t } from "@/lib/dictionary";
import { contact, site } from "@/lib/site";
import { Services } from "./services";
import { Stack } from "./stack";

type AboutProps = {
  /** Use "h1" when the section is the main content of its own page (/about). */
  headingAs?: "h1" | "h2";
  /** Show the services ("Focus & expertise") block. Off on /about. */
  showServices?: boolean;
};

/** About section. Profile copy comes from `lib/about.ts`, UI labels from `lib/dictionary.ts`. */
export function About({ headingAs = "h2", showServices = true }: AboutProps) {
  const content = about;
  const [lead, ...rest] = content.bio;

  return (
    <section id="about" className="relative overflow-hidden">
      <SectionGlow />
      <GlowOrb strength={0.05} className="top-[18%] -left-40 size-[560px]" />

      <Container className="flex flex-col gap-20 py-24 md:gap-28 md:py-32">
        <div className="flex flex-col gap-14 md:gap-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-10">
            <div className="flex flex-col gap-3">
              <SectionLabel>{t.about.label}</SectionLabel>
              <SectionHeading as={headingAs} lead={t.about.lead} accent={t.about.accent} />
            </div>
            <Reveal className="max-w-[460px] md:text-right">
              <p className="leading-relaxed text-muted">{content.intro}</p>
            </Reveal>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-stretch md:gap-14">
            <Reveal className="relative self-start md:sticky md:top-28">
              <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-2">
                <Media
                  src={aboutPhoto || undefined}
                  alt={t.about.portraitAlt}
                  label={t.about.photoPlaceholder}
                  className="aspect-[4/5] w-full rounded-[22px]"
                />
                <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full border border-white/10 bg-ink/85 px-3 py-1.5 text-[11px]">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent" />
                  </span>
                  {content.status}
                </div>
              </div>
            </Reveal>

            <div className="flex h-full flex-col justify-between gap-8">
              <Reveal className="flex flex-col gap-5">
                {lead ? (
                  <p className="text-xl leading-relaxed text-fg md:text-2xl md:leading-relaxed">
                    {lead}
                  </p>
                ) : null}
                {rest.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-muted md:text-[17px]">
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <Stagger as="ul" className="grid grid-cols-2 gap-3" stagger={0.08}>
                {content.facts.map((fact) => (
                  <StaggerItem as="li" key={fact.label} className={`${cardClass} p-4 md:p-5`}>
                    <div className={sheenClass} />
                    <span className="relative block font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
                      {fact.label}
                    </span>
                    <span className="relative mt-2 block font-display text-2xl leading-none md:text-3xl">
                      {fact.value}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>

              {content.stacks.length ? (
                <Reveal className="flex flex-col gap-3">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
                    {content.stacksLabel}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {content.stacks.map((item) => (
                      <li key={item}>
                        <Chip className="gap-1.5">
                          <TechBrandIcon name={item} className="size-3.5 shrink-0" />
                          <span>{item}</span>
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              <Reveal className="flex flex-wrap gap-2.5">
                {site.cv ? (
                  <ButtonLink href={contact.cvHref} variant="solid">
                    {t.about.downloadCv}
                  </ButtonLink>
                ) : null}
                <ButtonLink href={contact.githubHref} arrow>
                  <GitHubIcon className="size-4 shrink-0" />
                  GitHub
                </ButtonLink>
                <ButtonLink href={contact.linkedinHref} arrow>
                  <LinkedInIcon className="size-4 shrink-0" />
                  LinkedIn
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          {content.journey.length ? (
            <div className="flex flex-col gap-5">
              <SectionLabel>{t.about.journey}</SectionLabel>
              <Stagger as="ol" className="flex flex-col" stagger={0.1}>
                {content.journey.map((item) => (
                  <StaggerItem
                    as="li"
                    key={`${item.period}-${item.title}`}
                    className="grid gap-2 border-t border-white/[0.08] py-6 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8"
                  >
                    <span className="font-mono text-xs tracking-[0.12em] text-muted">
                      {item.period}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-3xl leading-none uppercase">{item.title}</h3>
                      <span className="text-sm text-muted">{item.place}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted md:text-[15px]">{item.desc}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <SectionLabel>{t.stack.label}</SectionLabel>
            <SectionHeading
              lead={t.stack.lead}
              accent={t.stack.accent}
              className="font-display text-[clamp(48px,5.6vw,80px)] leading-[0.9]"
            />
            <Reveal>
              <p className="max-w-[520px] text-[15px] leading-relaxed text-muted">
                {t.stack.intro}
              </p>
            </Reveal>
          </div>
          <Stack
            t={t.stack}
            groups={stackGroups.map((group) => ({ ...group, desc: t.stack.desc[group.key] }))}
          />
        </div>
        {showServices ? <Services /> : null}
      </Container>
    </section>
  );
}
