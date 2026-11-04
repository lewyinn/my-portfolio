"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState, type MouseEvent } from "react";

export type SectionIndexItem = { id: string; label: string };

/**
 * Numbered ruler on the right edge of the homepage (desktop only). It marks the
 * section in the middle of the screen and scrolls to a section on click.
 */
export function SectionIndex({ items, label }: { items: SectionIndexItem[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const lenis = useLenis();

  useEffect(() => {
    // A section counts as active while it crosses the horizontal middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const { id } of items) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [items]);

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(`#${id}`);
  };

  return (
    <nav
      aria-label={label}
      className="fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 min-[1100px]:block"
    >
      <ol className="flex flex-col">
        {items.map(({ id, label }, i) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(event) => goTo(event, id)}
                aria-current={isActive ? "true" : undefined}
                className="group flex min-h-11 items-center justify-end gap-2.5 py-1 pl-4"
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-[width,background-color] duration-300 ${
                    isActive ? "w-8 bg-fg" : "w-3 bg-muted/60 group-hover:w-5 group-hover:bg-fg"
                  }`}
                />
                <span className="flex w-[74px] flex-col items-start">
                  <span
                    className={`font-mono text-[11px] tracking-[0.12em] tabular-nums transition-colors duration-300 ${
                      isActive ? "font-semibold text-fg" : "text-muted group-hover:text-fg"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Label slides open under the number for the active (or hovered) section. */}
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 overflow-hidden pt-1 text-[11px] whitespace-nowrap text-fg">
                      <span
                        aria-hidden="true"
                        className={`size-1.5 shrink-0 rotate-45 border ${
                          isActive ? "border-fg" : "border-muted"
                        }`}
                      />
                      {label}
                    </span>
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
