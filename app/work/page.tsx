import type { Metadata } from "next";
import { Work } from "@/components/sections/work";
import { t } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: t.nav.work,
  description: t.work.pageDescription,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <Work headingAs="h1" />;
}
