import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeCookie, type Locale } from "@/lib/i18n";

/** Saved choice first, then the browser's language, then English. */
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value;
  if (saved && hasLocale(saved)) return saved;
  const first = (request.headers.get("accept-language") ?? "").split(",")[0]?.trim() ?? "";
  // "in" is the old ISO code for Indonesian that some browsers still send.
  return /^(id|in)\b/i.test(first) ? "id" : defaultLocale;
}

/** Sends every page URL without a language prefix to `/en/...` or `/id/...`. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocale(pathname.split("/")[1] ?? "")) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and files with an extension (icon.svg, rss.xml, ...).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
