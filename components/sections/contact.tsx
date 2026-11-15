import { SectionHeading } from "@/components/ui/animated-text";
import { Container } from "@/components/ui/container";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { t } from "@/lib/dictionary";
import { contact } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <SectionGlow />
      <GlowOrb
        strength={0.08}
        className="top-1/2 left-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2"
      />

      <Container className="flex flex-col gap-10 py-24 md:gap-14 md:py-36">
        <SectionLabel bracketed={false}>{t.contact.label}</SectionLabel>
        <div className="flex flex-col items-center gap-8 text-center md:gap-10">
          <SectionHeading
            lead={t.contact.lead}
            accent={t.contact.accent}
            className="font-display text-[clamp(88px,13vw,184px)] leading-[0.85]"
          />
          <Reveal delay={0.2}>
            <a
              href={contact.emailHref}
              className="group relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-3 pr-6 pl-3 text-base transition-[border-color] duration-500 hover:border-white/30 md:text-xl"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-fg text-ink md:size-10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-4"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              {contact.emailLabel}
            </a>
          </Reveal>
          <Reveal
            delay={0.3}
            className="flex items-center gap-4 font-mono text-xs tracking-[0.18em] text-muted uppercase"
          >
            <a
              href={contact.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-fg"
            >
              GITHUB
              <ArrowUpRightIcon className="size-3.5" />
            </a>
            <span aria-hidden="true" className="text-white/25">
              ·
            </span>
            <a
              href={contact.linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-fg"
            >
              LINKEDIN
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
