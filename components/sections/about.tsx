import { SectionHeading } from "@/components/ui/animated-text";
import { ButtonLink } from "@/components/ui/button-link";
import { cardClass, sheenClass } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { Media } from "@/components/ui/media";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { about, aboutPhoto } from "@/lib/about";
import { getI18n } from "@/lib/i18n-server";
import { stackGroups } from "@/lib/data";
import { contact } from "@/lib/site";
import { Process } from "./process";
import { Services } from "./services";
import { Stack } from "./stack";

type AboutProps = {
  /** Use "h1" when the section is the main content of its own page (/about). */
  headingAs?: "h1" | "h2";
  /** Show the services ("What I do") and process ("How I work") blocks. Off on /about. */
  showServices?: boolean;
};

/** About section. Profile copy comes from `lib/about.ts`, UI labels from the dictionary. */
export async function About({ headingAs = "h2", showServices = true }: AboutProps) {
  const { locale, t } = await getI18n();
  const content = about[locale];
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

          <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
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

            <div className="flex flex-col gap-10">
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

              <Stagger as="dl" className="grid grid-cols-2 gap-3" stagger={0.08}>
                {content.facts.map((fact) => (
                  <StaggerItem key={fact.label} className={`${cardClass} p-4 md:p-5`}>
                    <div className={sheenClass} />
                    <dt className="relative text-[10px] tracking-[0.24em] text-muted uppercase">
                      {fact.label}
                    </dt>
                    <dd className="relative mt-2 font-display text-2xl leading-none md:text-3xl">
                      {fact.value}
                    </dd>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal className="flex flex-wrap gap-2.5">
                <ButtonLink href={contact.cvHref} variant="solid">
                  {t.about.downloadCv}
                </ButtonLink>
                <ButtonLink href={contact.githubHref}>GitHub</ButtonLink>
                <ButtonLink href={contact.linkedinHref}>LinkedIn</ButtonLink>
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

        <Stack
          t={t.stack}
          groups={stackGroups.map((group) => ({ ...group, desc: t.stack.desc[group.key] }))}
        />
        {showServices ? (
          <>
            <Services />
            <Process />
          </>
        ) : null}
      </Container>
    </section>
  );
}
