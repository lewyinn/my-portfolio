import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Icon>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </Icon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75ZM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68Zm1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  );
}

/** Crisp brand vector marks for the Stack Mixer floating tiles (no heavy drop shadows). */
export function TechBrandIcon({
  name,
  className = "size-6",
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#3178C6" />
          <path
            d="M8 11.5h4.5m-2.25 0v6.5m4.25-6.25c0-1 .9-1.5 2-1.5 1 0 1.65.4 1.9 1.05m-3.9 2.4c0 1.2 1.1 1.55 2.15 1.8 1 .25 1.85.55 1.85 1.5 0 .9-.85 1.5-2.05 1.5-1.1 0-1.9-.45-2.2-1.2"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <circle cx="12" cy="12" r="9.5" fill="#18181b" stroke="#f0f0ee" strokeWidth="1.3" />
          <path
            d="M8.5 16V8l9.2 11.2"
            stroke="#f0f0ee"
            strokeWidth="1.7"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M15.5 8v5.2" stroke="#f0f0ee" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "Vue.js":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="M2.5 5h4.2L12 14.2 17.3 5h4.2L12 21 2.5 5Z" fill="#42B883" />
          <path d="M6.7 5h3.5L12 8.2 13.8 5h3.5L12 14.2 6.7 5Z" fill="#35495E" />
        </svg>
      );
    case "React":
    case "React Native":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <circle cx="12" cy="12" r="2" fill="#4CC2FF" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="#4CC2FF" strokeWidth="1.4" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(60 12 12)"
            stroke="#4CC2FF"
            strokeWidth="1.4"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(120 12 12)"
            stroke="#4CC2FF"
            strokeWidth="1.4"
          />
        </svg>
      );
    case "Tailwind CSS":
    case "NativeWind":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path
            d="M12 6c-2.6 0-4.2 1.3-4.8 3.9.95-1.3 2.05-1.8 3.3-1.45.72.18 1.24.7 1.82 1.28.93.94 2.02 2.02 4.38 2.02 2.6 0 4.2-1.3 4.8-3.9-.95 1.3-2.05 1.8-3.3 1.45-.72-.18-1.24-.7-1.82-1.28C15.45 7.08 14.36 6 12 6Zm-4.8 6.2c-2.6 0-4.2 1.3-4.8 3.9.95-1.3 2.05-1.8 3.3-1.45.72.18 1.24.7 1.82 1.28.93.94 2.02 2.02 4.38 2.02 2.6 0 4.2-1.3 4.8-3.9-.95 1.3-2.05 1.8-3.3 1.45-.72-.18-1.24-.7-1.82-1.28-.93-.94-2.02-2.02-4.38-2.02Z"
            fill="#38BDF8"
          />
        </svg>
      );
    case "Vite":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path
            d="M13.5 3 5.5 13h5.5l-1 8 8.5-10.5H13l.5-7.5Z"
            fill="#F2C14E"
            stroke="#646CFF"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Shadcn UI":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="4"
            fill="#18181b"
            stroke="#f0f0ee"
            strokeWidth="1.3"
          />
          <path
            d="m15.5 7.5-7 7M16.5 12l-4.5 4.5"
            stroke="#f0f0ee"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Motion":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M4 16 9 6l4 7 4-7 3 10"
            stroke="#F2C14E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="16" r="1.8" fill="#5EF2B0" />
        </svg>
      );
    case "Laravel":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="m4 6.5 4.5-2.5 4.5 2.5v5.5l4-2.2 3 1.7v5.5l-7 4-9-5V6.5Z"
            stroke="#FF2D20"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m4 6.5 4.5 2.5L13 6.5M8.5 9v10M13 12l7-4"
            stroke="#FF2D20"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Golang":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M3 10h4.5M2 12.8h4m-2.5 2.7H7"
            stroke="#00ADD8"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M14.5 9.2a4.3 4.3 0 1 0 3.7 6.5H15v-2.2h5.7c.2 3.2-2.1 6-6.2 6"
            stroke="#00ADD8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M12 2.5 20 7.1v9.8L12 21.5 4 16.9V7.1L12 2.5Z"
            fill="#5EF2B0"
            fillOpacity="0.16"
            stroke="#5EF2B0"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 15V9l5 6V9"
            stroke="#5EF2B0"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <ellipse cx="12" cy="7" rx="6.5" ry="3" stroke="#4CC2FF" strokeWidth="1.6" />
          <path
            d="M5.5 7v10c0 1.65 2.9 3 6.5 3s6.5-1.35 6.5-3V7M5.5 12c0 1.65 2.9 3 6.5 3s6.5-1.35 6.5-3"
            stroke="#4CC2FF"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "Redis":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="m12 4 8 3.5-8 3.5-8-3.5L12 4Z"
            fill="#EF4444"
            fillOpacity="0.28"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="m4 12 8 3.5 8-3.5M4 16.5 12 20l8-3.5"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M12 3.5c-3 0-3.5 1.4-3.5 3v1.5h4v1h-5.5C5.2 9 4 10.3 4 12.5S5.2 16 7 16h1.5v-1.8c0-1.6 1.2-2.7 3-2.7h4c1.4 0 2.5-1 2.5-2.5V6.5c0-1.6-1.3-3-3.5-3H12Z"
            stroke="#4CC2FF"
            strokeWidth="1.5"
          />
          <path
            d="M12 20.5c3 0 3.5-1.4 3.5-3V16h-4v-1h5.5c1.8 0 3-1.3 3-3.5S18.8 8 17 8h-1.5v1.8c0 1.6-1.2 2.7-3 2.7h-4c-1.4 0-2.5 1-2.5 2.5v2.5c0 1.6 1.3 3 3.5 3H12Z"
            stroke="#F2C14E"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "Flutter":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="M13.5 3 4.5 12l2.8 2.8L19 3h-5.5Z" fill="#2DD4BF" />
          <path d="m13.5 12.2-4.8 4.8 4.8 4.5h5.5l-4.5-4.5 4.5-4.8h-5.5Z" fill="#4CC2FF" />
        </svg>
      );
    case "Git & GitHub":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <circle cx="7" cy="6" r="2.2" stroke="#F2C14E" strokeWidth="1.6" />
          <circle cx="7" cy="18" r="2.2" stroke="#F2C14E" strokeWidth="1.6" />
          <circle cx="17" cy="9" r="2.2" stroke="#F2C14E" strokeWidth="1.6" />
          <path d="M7 8.2v7.6M17 11.2c0 3-2.5 4.5-10 4.5" stroke="#F2C14E" strokeWidth="1.6" />
        </svg>
      );
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M5 12.5h15c-.4 4.2-3.3 7-8.2 7-4.8 0-7.5-2.6-6.8-7Z"
            stroke="#4CC2FF"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M7 10h2.5v2.5H7zM10.5 10H13v2.5h-2.5zM14 10h2.5v2.5H14zM10.5 6.8H13v2.5h-2.5z"
            fill="#4CC2FF"
          />
        </svg>
      );
    case "Figma":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path d="M9.5 3.5H12v4.5H9.5a2.25 2.25 0 0 1 0-4.5Z" stroke="#F2C14E" strokeWidth="1.5" />
          <path d="M12 3.5h2.5a2.25 2.25 0 0 1 0 4.5H12V3.5Z" stroke="#4CC2FF" strokeWidth="1.5" />
          <path d="M9.5 8H12v4.5H9.5a2.25 2.25 0 0 1 0-4.5Z" stroke="#5EF2B0" strokeWidth="1.5" />
          <circle cx="14.25" cy="10.25" r="2.25" stroke="#2DD4BF" strokeWidth="1.5" />
          <path
            d="M9.5 12.5H12v2.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 2-2.25Z"
            stroke="#5EF2B0"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "Linux":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <rect x="3.5" y="4.5" width="17" height="15" rx="3" stroke="#F2C14E" strokeWidth="1.6" />
          <path
            d="m7.5 10 3 2.5-3 2.5M12.5 15h4"
            stroke="#F2C14E"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "MQTT":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <circle cx="7" cy="17" r="2.2" fill="#A855F7" />
          <path
            d="M6.5 11.5a6 6 0 0 1 6 6M6.5 7.5a10 10 0 0 1 10 10M6.5 3.8a13.7 13.7 0 0 1 13.7 13.7"
            stroke="#A855F7"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "WebSocket":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M4.5 9h13.5l-3.5-3.5M19.5 15H6l3.5 3.5"
            stroke="#5EF2B0"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ThingsBoard":
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" stroke="#5EF2B0" strokeWidth="1.6" />
          <rect
            x="13.5"
            y="4"
            width="6.5"
            height="6.5"
            rx="1.5"
            stroke="#4CC2FF"
            strokeWidth="1.6"
          />
          <rect
            x="4"
            y="13.5"
            width="6.5"
            height="6.5"
            rx="1.5"
            stroke="#F2C14E"
            strokeWidth="1.6"
          />
          <rect
            x="13.5"
            y="13.5"
            width="6.5"
            height="6.5"
            rx="1.5"
            stroke="#2DD4BF"
            strokeWidth="1.6"
          />
        </svg>
      );
  }
}
