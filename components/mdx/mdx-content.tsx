import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { CopyPre } from "./copy-pre";

function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

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

const components = { a: Anchor, img: Img, pre: CopyPre, Callout };

type RenderMDX = (props: { components?: typeof components }) => ReactNode;

// Velite compiles MDX to a function body. Evaluate it once per document and reuse it.
const cache = new Map<string, RenderMDX>();

function getMDXRenderer(code: string): RenderMDX {
  let render = cache.get(code);
  if (!render) {
    render = new Function(code)({ ...runtime }).default as RenderMDX;
    cache.set(code, render);
  }
  return render;
}

// Compiled MDX is a plain render function (no hooks), so it is called directly rather than
// mounted as a component created during render.
export function MDXContent({ code }: { code: string }) {
  return getMDXRenderer(code)({ components });
}
