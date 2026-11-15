import type { Metadata } from "next";
import { SectionIndex } from "@/components/layout/section-index";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { LatestWriting } from "@/components/sections/latest-writing";
import { LetsBuild } from "@/components/sections/lets-build";
import { Perspective } from "@/components/sections/perspective";
import { Work } from "@/components/sections/work";
import { JsonLd } from "@/components/ui/json-ld";
import { services } from "@/lib/data";
import { t } from "@/lib/dictionary";
import { sameAs, site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Homepage sections, in order. Each id must exist on its section (SectionIndex scrolls to it). */
const sectionIds = ["top", "letsBuild", "about", "perspective", "work", "blog", "contact"] as const;
const domIds: Record<(typeof sectionIds)[number], string> = {
  top: "top",
  letsBuild: "lets-build",
  about: "about",
  perspective: "perspective",
  work: "work",
  blog: "blog",
  contact: "contact",
};

export default function Home() {
  const url = site.url;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.fullName,
      jobTitle: site.role,
      url,
      address: { "@type": "PostalAddress", addressCountry: "ID" },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.fullName,
      url,
      inLanguage: "id",
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${site.fullName}, ${site.role}`,
      url,
      areaServed: "Worldwide",
      serviceType: services.map((service) => t.services.items[service.cmd].name),
    },
  ];

  const sections = sectionIds.map((key) => ({ id: domIds[key], label: t.sections[key] }));

  return (
    <>
      <JsonLd data={structuredData} />
      <Hero t={t.hero} />
      <LetsBuild t={t.letsBuild} />
      <About />
      <Perspective />
      <Work />
      <LatestWriting />
      <Contact />
      <SectionIndex items={sections} label={t.sections.label} />
    </>
  );
}
