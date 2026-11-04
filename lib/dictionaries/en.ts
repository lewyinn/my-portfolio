/**
 * English UI copy. `id.ts` must have the same shape (it is typed as `Dictionary`).
 * Article and case-study text lives in the MDX files, not here.
 */
export const en = {
  meta: {
    description:
      "Moch. Ridho Kurniawan builds business websites and mobile apps with Next.js, React, and Flutter, from the first sketch to launch.",
    ogAlt: "Ridho, Software Developer portfolio",
    ogLabel: "Software Developer · Portfolio",
    ogTitle: "Building products that perform",
    blogOgAlt: "Blog post by Ridho",
  },
  common: {
    skip: "Skip to content",
    backToTop: "Back to top",
    madeIn: "Made in Indonesia",
    minRead: "min read",
    startProject: "Start a project",
    allArticles: "All articles",
    copy: "Copy",
    copied: "Copied",
  },
  nav: {
    home: "Home",
    about: "About",
    work: "Work",
    blog: "Blog",
    main: "Main navigation",
    mobile: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    social: "Social links",
  },
  sections: {
    label: "Page sections",
    top: "Intro",
    letsBuild: "Let's build",
    about: "About",
    perspective: "Perspective",
    work: "Work",
    blog: "Writing",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Software Developer",
    intro:
      "I design and build business websites and mobile apps with Next.js, React, and Flutter, from the first sketch to launch.",
    location: "Remote · Indonesia",
    status: "Open for new projects",
    viewWork: "View work",
    scroll: "SCROLL",
  },
  letsBuild: { lead: "LET'S", accent: "BUILD." },
  about: {
    label: "The story",
    lead: "ABOUT",
    accent: "ME",
    portraitAlt: "Portrait of Moch. Ridho Kurniawan",
    photoPlaceholder: "Your photo · portrait 4:5",
    downloadCv: "Download CV",
    journey: "Journey",
    pageDescription:
      "About Moch. Ridho Kurniawan: background, experience, and the tools behind the work.",
  },
  stack: {
    label: "My stack",
    lead: "SKILLS &",
    accent: "TOOLS",
    intro: "Pick a channel to see the tools I use for it.",
    mix: "Mix",
    stackWord: "stack",
    channels: "Stack channels",
    desc: {
      frontend: "Interfaces for the web.",
      backend: "APIs and the data behind them.",
      mobile: "Android and iOS apps.",
      tools: "Code history, hosting, and day-to-day workflow.",
    },
  },
  services: {
    label: "Expertise",
    lead: "WHAT I",
    accent: "DO",
    intro: "Four services, from business websites to mobile apps. Pick one to see what it covers.",
    service: "Service",
    group: "Services",
    items: {
      business: {
        name: "Business Websites",
        desc: "Company sites with a blog, SEO, and pages your team can update.",
      },
      mobile: {
        name: "Mobile Apps",
        desc: "Android and iOS apps in Flutter, connected to your API.",
      },
      landing: {
        name: "Landing Pages",
        desc: "Pages for launches, campaigns, and products that turn visitors into customers.",
      },
      webapp: {
        name: "Web Apps",
        desc: "Dashboards, portals, and internal tools with login and data.",
      },
    },
  },
  process: {
    label: "How I work",
    lead: "BUILT TO",
    accent: "FLOW",
    intro: "Four steps from idea to launch, with clear updates along the way.",
    steps: [
      {
        name: "Discover",
        desc: "We talk about goals, users, and scope, then agree on a clear proposal.",
      },
      {
        name: "Build",
        desc: "Design and development in short rounds, with progress you can click through.",
      },
      {
        name: "Refine",
        desc: "Changes based on your feedback, testing on browsers and phones, and speed tuning.",
      },
      {
        name: "Launch",
        desc: "Go live, hand everything over, and track results. I stay around after launch.",
      },
    ],
  },
  perspective: {
    label: "The perspective",
    line1: "PRETTY IS EASY.",
    line2Lead: "I BUILD WHAT",
    line2Accent: "WORKS.",
    body: "Anyone can make a screen look good in a screenshot. I care about what happens after launch: pages and apps that load fast, are easy to use, and help your business grow. Every design choice and line of code is there for that.",
    marquee: "Software Developer",
  },
  work: {
    label: "Selected projects",
    lead: "MY",
    accent: "WORK",
    intro: "Recent websites and mobile apps, from design to a working product.",
    featured: "FEATURED",
    viewProject: "VIEW PROJECT",
    viewCase: "VIEW CASE STUDY",
    screenshot: "screenshot",
    stat: "websites and apps shipped for startups and growing brands",
    startYours: "Start yours",
    pageDescription:
      "Selected websites and mobile apps by Moch. Ridho Kurniawan, each with a case study.",
  },
  writing: {
    label: "Notes",
    lead: "LATEST",
    accent: "WRITING",
  },
  postCard: {
    coverAlt: "Cover for",
    coverLabel: "Article cover",
    read: "READ ARTICLE",
  },
  contact: {
    label: "Get in touch",
    lead: "LET'S",
    accent: "TALK.",
    whatsapp: "or chat on WhatsApp ↗",
  },
  blog: {
    title: "Blog",
    description: "Notes on building business websites, mobile apps, performance, and SEO.",
    label: "Notes",
    lead: "NOTES &",
    accent: "WRITING",
    all: "All",
    filter: "Filter by tag",
    /** Shown when the articles are in another language than the UI. Empty in English. */
    languageNote: "",
  },
  post: {
    onThisPage: "On this page",
    ctaLead: "HAVE A PROJECT IN MIND?",
    ctaAccent: "LET'S TALK.",
    keep: "KEEP",
    reading: "READING",
    home: "Home",
  },
  project: {
    all: "All projects",
    live: "Live site",
    source: "Source code",
    next: "Next project",
    caseStudy: "Case study",
    heroLabel: "hero screenshot",
  },
  notFound: {
    title: "Page not found",
    body: "This page doesn't exist or has moved. Try the homepage or the blog.",
    home: "Back home",
    blog: "Read the blog",
  },
};

export type Dictionary = typeof en;
