import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { t } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: t.nav.about,
  description: t.about.pageDescription,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About headingAs="h1" showServices={false} />;
}
