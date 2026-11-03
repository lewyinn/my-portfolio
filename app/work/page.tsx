import type { Metadata } from "next";
import { Work } from "@/components/sections/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected websites and mobile apps by Moch. Ridho Kurniawan, each with its own case study.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <Work headingAs="h1" />;
}
