import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PixelR } from "@/components/ui/pixel-r";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <PixelR size={7} gap={2} />
      <h1 className="font-display text-[clamp(96px,18vw,220px)] leading-[0.85]">
        4<span className="text-accent">0</span>4
      </h1>
      <p className="max-w-md leading-relaxed text-muted">
        This page doesn&apos;t exist or has moved. Try the homepage or the blog instead.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="primary" arrow>
          Back home
        </ButtonLink>
        <ButtonLink href="/blog">Read the blog</ButtonLink>
      </div>
    </Container>
  );
}
