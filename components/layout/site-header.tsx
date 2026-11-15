"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "@/components/ui/logo";
import type { Dictionary } from "@/lib/dictionary";
import { nav } from "@/lib/site";

type SiteHeaderProps = { labels: Dictionary["nav"] };

export function SiteHeader({ labels }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [tappedHref, setTappedHref] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const home = "/";
  const links = nav.map((item) => ({
    href: item.path,
    label: labels[item.key],
  }));

  // Home only matches the homepage itself; other links also stay active on their child pages.
  const isCurrent = (href: string) => {
    if (href === home) return pathname === home;
    // Case studies live under /projects but belong to Work.
    if (href === "/work" && pathname.startsWith("/projects/")) return true;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const openMenu = () => {
    setClosing(false);
    setTappedHref(null);
    setOpen(true);
  };

  const closeMenu = (selectedHref?: string) => {
    if (!open) return;
    if (selectedHref) setTappedHref(selectedHref);
    setOpen(false);
    setClosing(true);
  };

  const toggleMenu = () => {
    if (open) closeMenu();
    else openMenu();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Freeze page scrolling while the mobile menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // closeMenu only reads `open` which is already the effect dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Wait for CSS exit transitions (handles browsers without discrete display transitions too).
  useEffect(() => {
    if (!closing) return;
    const el = menuRef.current;
    let cancelled = false;

    const finish = async () => {
      if (el) {
        await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
        const animations = el.getAnimations({ subtree: true });
        if (animations.length > 0) {
          await Promise.race([
            Promise.allSettled(animations.map((a) => a.finished)),
            new Promise<void>((resolve) => window.setTimeout(resolve, 450)),
          ]);
        }
      }
      if (!cancelled) {
        setClosing(false);
        setTappedHref(null);
      }
    };

    void finish();
    return () => {
      cancelled = true;
    };
  }, [closing]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-500 ${
          scrolled || open ? "border-line bg-ink/95" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 md:px-12">
          <div>
            <Logo href={home} blink className="min-h-11 text-[22px]" />
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <nav aria-label={labels.main}>
              <ul className="flex gap-8 text-sm text-muted">
                {links.map((item) => {
                  const current = isCurrent(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={current ? "page" : undefined}
                        className={`relative block py-3 transition-colors duration-300 hover:text-fg aria-[current=page]:text-fg ${
                          current
                            ? ""
                            : "after:absolute after:bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-fg after:transition-[scale] after:duration-300 hover:after:scale-x-100"
                        }`}
                      >
                        {item.label}
                        {current ? (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-1.5 border-t border-dashed border-accent"
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className={`relative flex size-11 touch-manipulation items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-300 active:scale-90 motion-reduce:transition-colors ${
                open ? "border-accent/50 bg-white/[0.06] text-fg" : "border-line text-fg"
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? labels.closeMenu : labels.openMenu}
              onClick={toggleMenu}
            >
              <span
                aria-hidden="true"
                className="relative flex size-[18px] items-center justify-center"
              >
                <span
                  className={`absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    open ? "translate-y-0 rotate-45" : "-translate-y-[3.5px] rotate-0"
                  }`}
                />
                <span
                  className={`absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    open ? "translate-y-0 -rotate-45" : "translate-y-[3.5px] rotate-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Kept outside <header>: its fixed overlay covers the mobile viewport below navbar. */}
      <div
        ref={menuRef}
        id="mobile-menu"
        hidden={!open && !closing}
        inert={!open}
        data-closing={closing ? "" : undefined}
        className="mobile-menu fixed inset-x-0 top-[72px] bottom-0 z-30 bg-ink md:hidden"
      >
        <nav aria-label={labels.mobile} className="px-5 pt-10">
          <ul className="flex flex-col gap-2">
            {links.map((item, index) => {
              const current = isCurrent(item.href);
              const tapped = tappedHref === item.href;
              return (
                <li
                  key={item.href}
                  className="mobile-menu-item"
                  style={{ "--nav-i": index } as CSSProperties}
                >
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => closeMenu(item.href)}
                    className={`group relative inline-flex touch-manipulation items-center gap-4 py-2 font-display text-6xl leading-none transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-x-2 active:text-accent motion-reduce:transform-none ${
                      tapped ? "translate-x-3 text-accent" : current ? "text-fg" : "text-muted"
                    }`}
                  >
                    <span>{item.label}</span>
                    {current || tapped ? (
                      <span
                        aria-hidden="true"
                        className={`size-2.5 border border-accent transition-transform duration-300 ${
                          tapped ? "scale-125 rotate-[135deg] bg-accent" : "rotate-45"
                        }`}
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-1 h-0.5 origin-left bg-accent transition-transform duration-300 motion-reduce:transition-none ${
                        tapped ? "scale-x-100" : "scale-x-0 group-active:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
