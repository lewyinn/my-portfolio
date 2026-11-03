import { SectionHeading } from "@/components/ui/animated-text";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { GlowOrb, SectionGlow } from "@/components/ui/glow";
import { PostCard } from "@/components/ui/post-card";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getPosts } from "@/lib/content";

export function LatestWriting() {
  const posts = getPosts().slice(0, 3);

  return (
    <section id="blog" className="relative overflow-hidden">
      <SectionGlow />
      <GlowOrb strength={0.05} className="top-1/3 -right-40 size-[520px]" />
      <Container className="flex flex-col gap-10 py-24 md:py-32">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-10">
          <div className="flex flex-col gap-3">
            <SectionLabel>Notes</SectionLabel>
            <SectionHeading lead="LATEST" accent="WRITING" />
          </div>
          <ButtonLink href="/blog" arrow className="self-start md:self-auto">
            All articles
          </ButtonLink>
        </div>

        <Stagger className="grid gap-4 md:grid-cols-3" stagger={0.1}>
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
