import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { t } from "@/lib/dictionary";
import { BentoGrid, StackChips } from "./bento-grid";
import { Callout } from "./callout";
import { ChecklistCard } from "./checklist-card";
import { CopyPre } from "./copy-pre";

function Img({ src, alt = "", width, height }: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;
  return (
    <Image
      src={src}
      alt={alt}
      width={Number(width) || 1600}
      height={Number(height) || 900}
      sizes="(min-width: 768px) 720px, 100vw"
      className="h-auto w-full rounded-xl border border-line"
    />
  );
}

function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("#")) return <a href={href} {...props} />;
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function Pre(props: ComponentPropsWithoutRef<"pre">) {
  return <CopyPre labels={{ copy: t.common.copy, copied: t.common.copied }} {...props} />;
}

const components = { a: Anchor, img: Img, pre: Pre, Callout, ChecklistCard, BentoGrid, StackChips };

type RenderMDX = (props: { components?: typeof components }) => ReactNode;

const cache = new Map<string, RenderMDX>();

function getMDXRenderer(code: string): RenderMDX {
  let render = cache.get(code);
  if (!render) {
    render = new Function(code)({ ...runtime }).default as RenderMDX;
    cache.set(code, render);
  }
  return render;
}

export function MDXContent({ code }: { code: string }) {
  return getMDXRenderer(code)({ components });
}
