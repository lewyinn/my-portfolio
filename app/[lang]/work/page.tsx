import type { Metadata } from "next";
import { Work } from "@/components/sections/work";
import { languageAlternates, localePath } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.nav.work,
    description: t.work.pageDescription,
    alternates: { canonical: localePath(locale, "/work"), languages: languageAlternates("/work") },
  };
}

export default function WorkPage() {
  return <Work headingAs="h1" />;
}
