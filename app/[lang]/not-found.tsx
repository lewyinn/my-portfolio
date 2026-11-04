import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PixelR } from "@/components/ui/pixel-r";
import { localePath } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.notFound.title };
}

export default async function NotFound() {
  const { locale, t } = await getI18n();

  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <PixelR size={7} gap={2} />
      <h1 className="font-display text-[clamp(96px,18vw,220px)] leading-[0.85]">
        4<span className="text-accent">0</span>4
      </h1>
      <p className="max-w-md leading-relaxed text-muted">{t.notFound.body}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href={localePath(locale, "/")} variant="primary" arrow>
          {t.notFound.home}
        </ButtonLink>
        <ButtonLink href={localePath(locale, "/blog")}>{t.notFound.blog}</ButtonLink>
      </div>
    </Container>
  );
}
