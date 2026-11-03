import { SectionHeading } from "@/components/ui/animated-text";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { Media } from "@/components/ui/media";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { aboutWords } from "@/lib/data";
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

export function About({ headingAs = "h2", showServices = true }: AboutProps) {
  return (
    <section id="about" className="relative overflow-hidden">
      <SectionGlow />
      <GlowOrb strength={0.05} className="top-[18%] -left-40 size-[560px]" />

      <Container className="flex flex-col gap-20 py-24 md:gap-28 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-10">
          <div className="flex flex-col gap-3">
            <SectionLabel>The story</SectionLabel>
            <SectionHeading as={headingAs} lead="ABOUT" accent="ME" />
          </div>
          <Reveal className="max-w-[460px] md:text-right">
            <p className="leading-relaxed text-muted">
              [A short background: your education, internship or work experience, and what drew you
              to web and mobile development.]
            </p>
          </Reveal>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal className="relative">
            <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-2">
              <Media
                alt="Portrait of Moch. Ridho Kurniawan"
                label="Your photo · black and white portrait"
                className="aspect-[4/5] max-h-[600px] w-full rounded-[22px]"
              />
              <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full border border-white/10 bg-ink/85 px-3 py-1.5 text-[11px]">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                Available for work
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Stagger
              stagger={0.1}
              className="flex flex-col font-display text-[clamp(56px,6.4vw,96px)] leading-[0.95] uppercase"
            >
              {aboutWords.map((word, i) => (
                <StaggerItem
                  key={word}
                  className={
                    i === 0
                      ? ""
                      : "bg-gradient-to-r from-muted to-muted/30 bg-clip-text text-transparent"
                  }
                >
                  {word}
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal>
              <p className="leading-relaxed text-muted md:text-[17px]">
                [One paragraph on how you work: communication, reliability, and what clients can
                expect.]
              </p>
            </Reveal>
            <Reveal className="flex flex-wrap gap-2.5">
              <ButtonLink href={contact.cvHref} variant="solid">
                Download CV
              </ButtonLink>
              <ButtonLink href={contact.githubHref}>GitHub</ButtonLink>
              <ButtonLink href={contact.linkedinHref}>LinkedIn</ButtonLink>
            </Reveal>
          </div>
        </div>

        <Stack />
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
