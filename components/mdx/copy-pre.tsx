"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";

type CopyPreProps = ComponentPropsWithoutRef<"pre"> & {
  labels: { copy: string; copied: string };
};

/** Code block with a copy button (replaces `pre` in MDX). */
export function CopyPre({ labels, ...props }: CopyPreProps) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(ref.current?.textContent ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="group relative">
      <pre ref={ref} {...props} />
      <button
        type="button"
        onClick={copy}
        className="absolute top-2.5 right-2.5 rounded-md border border-line bg-ink/80 px-2.5 py-1 text-xs text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-fg focus-visible:opacity-100"
      >
        {copied ? labels.copied : labels.copy}
      </button>
    </div>
  );
}
