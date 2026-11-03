import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { LatestWriting } from "@/components/sections/latest-writing";
import { LetsBuild } from "@/components/sections/lets-build";
import { Perspective } from "@/components/sections/perspective";
import { Work } from "@/components/sections/work";
import { SectionIndex } from "@/components/layout/section-index";
import { JsonLd } from "@/components/ui/json-ld";
import { services } from "@/lib/data";
import { sameAs, site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const sections = [
  { id: "top", label: "Intro" },
  { id: "lets-build", label: "Let's build" },
  { id: "about", label: "About" },
  { id: "perspective", label: "Perspective" },
  { id: "work", label: "Work" },
  { id: "blog", label: "Writing" },
  { id: "contact", label: "Contact" },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    jobTitle: site.role,
    url: site.url,
    address: { "@type": "PostalAddress", addressCountry: "ID" },
    ...(sameAs.length ? { sameAs } : {}),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.fullName,
    url: site.url,
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.fullName} — ${site.role}`,
    url: site.url,
    areaServed: "Worldwide",
    serviceType: services.map((service) => service.name),
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Hero />
      <LetsBuild />
      <About />
      <Perspective />
      <Work />
      <LatestWriting />
      <Contact />
      <SectionIndex items={sections} />
    </>
  );
}
