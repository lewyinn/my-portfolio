"use client";

const ORIGIN_PREFIX = "portfolio:origin:";
const LIST_ROUTES = new Set(["/", "/work", "/blog"]);

let currentPath: string | null = null;
const memoryOrigins = new Map<string, string>();
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function readStoredOrigin(path: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(`${ORIGIN_PREFIX}${path}`);
  } catch {
    return null;
  }
}

function writeStoredOrigin(path: string, origin: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(`${ORIGIN_PREFIX}${path}`, origin);
  } catch {
    // Ignore storage failures in restricted browsing modes.
  }
}

function readReferrerOrigin(): string | null {
  if (typeof window === "undefined" || !document.referrer) return null;
  try {
    const refUrl = new URL(document.referrer);
    if (refUrl.origin !== window.location.origin) return null;
    return LIST_ROUTES.has(refUrl.pathname) ? refUrl.pathname : null;
  } catch {
    return null;
  }
}

/** Records client-side route transitions so detail pages remember whether the user came from `/`, `/work`, or `/blog`. */
export function recordNavigation(nextPath: string) {
  if (currentPath !== null && currentPath !== nextPath) {
    const origin = LIST_ROUTES.has(currentPath)
      ? currentPath
      : (memoryOrigins.get(currentPath) ?? readStoredOrigin(currentPath));
    if (origin) {
      memoryOrigins.set(nextPath, origin);
      writeStoredOrigin(nextPath, origin);
    }
  } else if (currentPath === null) {
    const refOrigin = readReferrerOrigin();
    if (refOrigin) {
      memoryOrigins.set(nextPath, refOrigin);
      writeStoredOrigin(nextPath, refOrigin);
    }
  }

  if (currentPath !== nextPath) {
    currentPath = nextPath;
    notify();
  }
}

export function getOrigin(path: string): string | null {
  return memoryOrigins.get(path) ?? readStoredOrigin(path) ?? readReferrerOrigin();
}

export function subscribeOrigin(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
