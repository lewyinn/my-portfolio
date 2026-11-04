import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { languageAlternates, localePath } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.nav.about,
    description: t.about.pageDescription,
    alternates: {
      canonical: localePath(locale, "/about"),
      languages: languageAlternates("/about"),
    },
  };
}

export default function AboutPage() {
  return <About headingAs="h1" showServices={false} />;
}
