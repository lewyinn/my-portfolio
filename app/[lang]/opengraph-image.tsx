import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, hasLocale, locales } from "@/lib/i18n";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Ridho, Software Developer portfolio";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Image routes are route handlers, where `next/root-params` is not available yet.
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : defaultLocale);
  return renderOgImage({ label: t.meta.ogLabel, title: t.meta.ogTitle });
}
