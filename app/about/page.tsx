import type { Metadata } from "next";
import { About } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Moch. Ridho Kurniawan: background, how I work with clients, and the tech stack I use.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About headingAs="h1" showServices={false} />;
}
