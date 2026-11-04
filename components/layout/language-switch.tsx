"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, localeLabels, locales, switchLocalePath, type Locale } from "@/lib/i18n";

/** Remembers the choice so `proxy.ts` picks it next time a URL has no language prefix. */
function saveLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** "EN / ID" toggle: same page in the other language, and remembers the choice. */
export function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className="flex items-center rounded-full border border-white/10 p-0.5 font-mono text-[11px]">
        {locales.map((item) => {
          const active = item === locale;
          return (
            <li key={item}>
              <Link
                href={switchLocalePath(pathname, item)}
                hrefLang={item}
                lang={item}
                aria-current={active ? "true" : undefined}
                title={localeLabels[item].name}
                onClick={() => saveLocale(item)}
                className={`flex h-10 min-w-10 items-center justify-center rounded-full px-2.5 tracking-[0.12em] transition-colors duration-300 ${
                  active ? "bg-white/[0.08] text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {localeLabels[item].short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
