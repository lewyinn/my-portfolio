import Link from "next/link";

type LogoProps = {
  /** Blink the cursor (navbar only). Disabled automatically for reduced motion. */
  blink?: boolean;
  className?: string;
};

/** W2 terminal wordmark: "ridho" + mint block cursor. See PLAN.md §3.4. */
export function Logo({ blink = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Ridho, home"
      className={`inline-flex items-center font-mono leading-none font-medium tracking-[-0.05em] ${className}`}
    >
      ridho
      <span
        aria-hidden="true"
        className={`ml-[0.18em] inline-block h-[0.9em] w-[0.45em] bg-accent ${
          blink ? "animate-blink motion-reduce:animate-none" : ""
        }`}
      />
    </Link>
  );
}
