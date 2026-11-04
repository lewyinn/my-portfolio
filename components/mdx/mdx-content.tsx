import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { Callout } from "./callout";
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

/** MDX components for one language: internal links get the locale, code blocks its labels. */
function createComponents(locale: Locale) {
  const { copy, copied } = getDictionary(locale).common;

  function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
    if (href.startsWith("#")) return <a href={href} {...props} />;
    if (href.startsWith("/")) return <Link href={localePath(locale, href)} {...props} />;
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  }

  function Pre(props: ComponentPropsWithoutRef<"pre">) {
    return <CopyPre labels={{ copy, copied }} {...props} />;
  }

  return { a: Anchor, img: Img, pre: Pre, Callout };
}

type Components = ReturnType<typeof createComponents>;

// Built once per language at module load, so the component identities stay stable.
const componentsByLocale: Record<Locale, Components> = {
  en: createComponents("en"),
  id: createComponents("id"),
};

type RenderMDX = (props: { components?: Components }) => ReactNode;

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
export function MDXContent({ code, locale }: { code: string; locale: Locale }) {
  return getMDXRenderer(code)({ components: componentsByLocale[locale] });
}
