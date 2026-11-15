"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { getOrigin, subscribeOrigin } from "@/lib/navigation-origin";

type SmartBackLinkProps = {
  fallbackHref: string;
  fallbackLabel: string;
  homeLabel: string;
};

/** Sends visitors back to Beranda (`/`) if they opened the detail page from Beranda, otherwise uses the section archive link. */
export function SmartBackLink({ fallbackHref, fallbackLabel, homeLabel }: SmartBackLinkProps) {
  const pathname = usePathname();
  const origin = useSyncExternalStore(
    subscribeOrigin,
    () => getOrigin(pathname),
    () => null,
  );

  const isFromHome = origin === "/";
  const href = isFromHome ? "/" : fallbackHref;
  const label = isFromHome ? homeLabel : fallbackLabel;

  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
    >
      <ArrowLeftIcon className="size-4" />
      {label}
    </Link>
  );
}
