/**
 * Site-wide settings and verified contact links.
 */
export const site = {
  name: "Ridho",
  fullName: "Moch. Ridho Kurniawan",
  role: "Software Engineer",
  dateLocale: "id-ID",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  location: "Bogor, Jawa Barat, Indonesia",
  email: "ridhokur102@gmail.com",
  whatsapp: "",
  github: "https://github.com/lewyinn",
  linkedin: "https://www.linkedin.com/in/moch-ridho-kurniawan/",
  cv: "",
};

/** Navbar links; labels come from `nav` in `lib/dictionary.ts`. */
export const nav = [
  { path: "/", key: "home" },
  { path: "/about", key: "about" },
  { path: "/work", key: "work" },
  { path: "/blog", key: "blog" },
] as const;

export const contact = {
  emailHref: site.email ? `mailto:${site.email}` : "#contact",
  emailLabel: site.email || "ridhokur102@gmail.com",
  whatsappHref: site.whatsapp ? `https://wa.me/${site.whatsapp}` : "",
  githubHref: site.github || "#",
  linkedinHref: site.linkedin || "#",
  cvHref: site.cv || "#",
};

/** Profile links that are filled in, for JSON-LD `sameAs`. */
export const sameAs = [site.github, site.linkedin].filter(Boolean);
