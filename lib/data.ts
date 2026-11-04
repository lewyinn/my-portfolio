import type { Dictionary } from "./dictionaries/en";

// Structure only. Names and descriptions live in the dictionaries (`lib/dictionaries`).

export type ServiceKey = keyof Dictionary["services"]["items"];

export type Service = {
  num: string;
  glyph: string;
  /** Key into `services.items` in the dictionary, and into `scenes` in ServicesPanel. */
  cmd: ServiceKey;
};

/** Ordered by priority (PLAN.md §1). */
export const services: Service[] = [
  { num: "01", glyph: "◇", cmd: "business" },
  { num: "02", glyph: "[ ]", cmd: "mobile" },
  { num: "03", glyph: "✦", cmd: "landing" },
  { num: "04", glyph: "</>", cmd: "webapp" },
];

export type StackKey = keyof Dictionary["stack"]["desc"];

export type StackGroup = {
  num: string;
  glyph: string;
  /** Key into `stack.desc` in the dictionary. */
  key: StackKey;
  /** Channel name, the same in every language. */
  name: string;
  tools: string[];
};

/** "Skills & tools" channels in the About section. Edit tools freely; keep 1–4 groups. */
export const stackGroups: StackGroup[] = [
  {
    num: "01",
    glyph: "</>",
    key: "frontend",
    name: "Frontend",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    num: "02",
    glyph: "{ }",
    key: "backend",
    name: "Backend",
    tools: ["Node.js", "Express", "REST API", "PostgreSQL", "Firebase"],
  },
  {
    num: "03",
    glyph: "[ ]",
    key: "mobile",
    name: "Mobile",
    tools: ["Flutter", "Dart", "Firebase"],
  },
  {
    num: "04",
    glyph: "~",
    key: "tools",
    name: "Tools",
    tools: ["Git", "GitHub", "Vercel", "[Add yours]"],
  },
];

/** Process steps; names and descriptions are `process.steps` in the dictionary, same order. */
export const steps = [
  { num: "01", glyph: "✦" },
  { num: "02", glyph: "</>" },
  { num: "03", glyph: "~" },
  { num: "04", glyph: "↑" },
];
