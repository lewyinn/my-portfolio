export type Service = {
  num: string;
  glyph: string;
  name: string;
  cmd: string;
  desc: string;
  tools: string[];
};

/** Ordered by priority (PLAN.md §1). */
export const services: Service[] = [
  {
    num: "01",
    glyph: "◇",
    name: "Business Websites",
    cmd: "business",
    desc: "Company sites with a blog, SEO, and pages your team can update.",
    tools: ["Next.js", "React", "MDX", "SEO", "Analytics"],
  },
  {
    num: "02",
    glyph: "[ ]",
    name: "Mobile Apps",
    cmd: "mobile",
    desc: "Android and iOS apps in Flutter, connected to your API.",
    tools: ["Flutter", "Dart", "REST API", "Firebase"],
  },
  {
    num: "03",
    glyph: "✦",
    name: "Landing Pages",
    cmd: "landing",
    desc: "High-converting pages for launches, campaigns, and products.",
    tools: ["Next.js", "Tailwind CSS", "Motion", "Analytics"],
  },
  {
    num: "04",
    glyph: "</>",
    name: "Web Apps",
    cmd: "webapp",
    desc: "Dashboards, portals, and internal tools with login and data.",
    tools: ["React", "Next.js", "TypeScript", "REST API", "[Database]"],
  },
];

export const stackGroups = [
  {
    num: "01",
    glyph: "</>",
    name: "Frontend",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flutter", "Motion"],
  },
  {
    num: "02",
    glyph: "{ }",
    name: "Backend",
    tools: ["Node.js", "Express", "REST API", "PostgreSQL", "Firebase", "[Add yours]"],
  },
];

export const steps = [
  {
    num: "01",
    glyph: "✦",
    name: "Discover",
    desc: "We talk goals, users, and scope, then agree on a clear proposal.",
  },
  {
    num: "02",
    glyph: "</>",
    name: "Build",
    desc: "Design and development in short cycles, with progress you can click.",
  },
  {
    num: "03",
    glyph: "~",
    name: "Refine",
    desc: "Feedback rounds, testing across browsers and phones, and performance tuning.",
  },
  {
    num: "04",
    glyph: "↑",
    name: "Launch",
    desc: "Deploy, hand over, and measure — with support after go-live.",
  },
];

export const aboutWords = ["Designing", "Building", "Shipping", "Improving"];

export const marqueeItems = ["Design · Develop · Optimize · Ship"];
