/**
 * Site-wide settings. Empty contact fields render as visible placeholders
 * until the owner fills them in (see PLAN.md §10).
 */
export const site = {
  name: "Ridho",
  fullName: "Moch. Ridho Kurniawan",
  role: "Software Developer",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Moch. Ridho Kurniawan builds business websites and mobile apps with Next.js, React, and Flutter — from first sketch to launch.",
  location: "Indonesia",
  /** e.g. "hello@your-domain.com" */
  email: "",
  /** International format, digits only, e.g. "6281234567890" */
  whatsapp: "",
  /** Full profile URLs */
  github: "",
  linkedin: "",
  /** Path to the CV in /public, e.g. "/cv.pdf" */
  cv: "",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
];

export const contact = {
  emailHref: site.email ? `mailto:${site.email}` : "#contact",
  emailLabel: site.email || "[you@email.com]",
  whatsappHref: site.whatsapp ? `https://wa.me/${site.whatsapp}` : "#contact",
  githubHref: site.github || "#",
  linkedinHref: site.linkedin || "#",
  cvHref: site.cv || "#",
};

/** Profile links that are filled in, for JSON-LD `sameAs`. */
export const sameAs = [site.github, site.linkedin].filter(Boolean);
