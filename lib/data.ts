import type { Dictionary } from "./dictionary";

// Structure only. Names and descriptions live in `lib/dictionary.ts`.

export type ServiceKey = keyof Dictionary["services"]["items"];

export type Service = {
  num: string;
  glyph: string;
  /** Key into `services.items` in the dictionary, and into `scenes` in ServicesPanel. */
  cmd: ServiceKey;
};

/** 3 main focus areas matching Figma 05 Services States. */
export const services: Service[] = [
  { num: "01", glyph: "</>", cmd: "web" },
  { num: "02", glyph: "[ ]", cmd: "mobile" },
  { num: "03", glyph: "✦", cmd: "solutions" },
];

export type StackKey = keyof Dictionary["stack"]["desc"];

export type StackGroup = {
  num: string;
  glyph: string;
  /** Key into `stack.desc` in the dictionary. */
  key: StackKey;
  /** Channel name, the same in every language. */
  name: string;
  /** Distinct CLI command shown in Mixer terminal pill. */
  command: string;
  tools: string[];
};

/** 4 Stack Mixer channels matching Figma 04 Stack Channels States. */
export const stackGroups: StackGroup[] = [
  {
    num: "01",
    glyph: "</>",
    key: "frontend",
    name: "Frontend",
    command: "compile --stack frontend --targets web,ui",
    tools: [
      "TypeScript",
      "Next.js",
      "Vue.js",
      "React",
      "Tailwind CSS",
      "Vite",
      "Shadcn UI",
      "Motion",
    ],
  },
  {
    num: "02",
    glyph: "{ }",
    key: "backend",
    name: "Backend",
    command: "run --stack backend --services api,db",
    tools: ["Laravel", "Golang", "Node.js", "PostgreSQL", "Redis", "Python"],
  },
  {
    num: "03",
    glyph: "[ ]",
    key: "mobile",
    name: "Mobile",
    command: "build --stack mobile --targets ios,android",
    tools: ["React Native", "Flutter", "NativeWind"],
  },
  {
    num: "04",
    glyph: "~",
    key: "tools",
    name: "Tools",
    command: "sync --stack tools --env git,docker,iot",
    tools: ["Git & GitHub", "Docker", "Figma", "Linux", "ThingsBoard", "MQTT", "WebSocket"],
  },
];
