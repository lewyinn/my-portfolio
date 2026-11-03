"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const pathname = usePathname();
  // "/" only matches the homepage itself; other links also stay active on their child pages.
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Freeze page scrolling while the mobile menu is open.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-500 ${
          scrolled || open ? "border-line bg-ink/95" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Logo blink className="min-h-11 text-[22px]" />
          </motion.div>

          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex gap-8 text-sm text-muted">
              {nav.map((item, i) => {
                const current = isCurrent(item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.06 }}
                  >
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
                      {/* Dashed underline for the current page; it slides to the new link on navigation. */}
                      {current ? (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-1.5 border-t border-dashed border-accent"
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      ) : null}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="size-[18px]" /> : <MenuIcon className="size-[18px]" />}
          </button>
        </div>
      </header>

      {/* Kept outside <header>: its backdrop-filter would trap this fixed overlay inside it. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-[72px] bottom-0 z-30 bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile navigation" className="px-5 pt-10">
              <ul className="flex flex-col gap-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 py-2 font-display text-6xl leading-none text-muted transition-colors duration-300 aria-[current=page]:text-fg"
                    >
                      {item.label}
                      {isCurrent(item.href) ? (
                        <span
                          aria-hidden="true"
                          className="size-2.5 rotate-45 border border-accent"
                        />
                      ) : null}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
