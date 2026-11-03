import type { Metadata } from "next";
import { BlogList } from "@/components/sections/blog-list";
import { SectionHeading } from "@/components/ui/animated-text";
import { Container } from "@/components/ui/container";
import { toPostCard } from "@/components/ui/post-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building business websites, mobile apps, performance, and SEO.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts().map(toPostCard);

  return (
    <Container className="flex flex-col gap-12 py-16 md:gap-16 md:py-24">
      <header className="flex flex-col gap-4">
        <SectionLabel>Notes</SectionLabel>
        <SectionHeading
          as="h1"
          lead="NOTES &"
          accent="WRITING"
          className="font-display text-[clamp(64px,10vw,152px)] leading-[0.88]"
        />
        <Reveal>
          <p className="max-w-xl leading-relaxed text-muted">
            Notes on building business websites, mobile apps, performance, and SEO.
          </p>
        </Reveal>
      </header>
      <BlogList posts={posts} />
    </Container>
  );
}
