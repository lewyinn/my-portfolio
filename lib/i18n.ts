export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Cookie that remembers the visitor's language choice (read by `proxy.ts`). */
export const localeCookie = "NEXT_LOCALE";

export const localeLabels: Record<
  Locale,
  { short: string; name: string; og: string; date: string }
> = {
  en: { short: "EN", name: "English", og: "en_US", date: "en" },
  id: { short: "ID", name: "Bahasa Indonesia", og: "id_ID", date: "id-ID" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Prefixes an app path with the locale: "/" → "/en", "/blog" → "/en/blog",
 * "/#contact" → "/en#contact". External URLs, "#…" anchors and "mailto:" pass through.
 */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Swaps the locale segment of a pathname, e.g. "/en/blog/x" → "/id/blog/x". */
export function switchLocalePath(pathname: string, locale: Locale): string {
  const [, first = "", ...rest] = pathname.split("/");
  const tail = hasLocale(first) ? rest : [first, ...rest];
  return ["", locale, ...tail.filter(Boolean)].join("/");
}

/** hreflang map for metadata `alternates.languages`, from a locale-free path like "/blog". */
export function languageAlternates(path: string): Record<string, string> {
  const entries = locales.map((locale) => [locale, localePath(locale, path)]);
  return { ...Object.fromEntries(entries), "x-default": localePath(defaultLocale, path) };
}
