# CLAUDE.md

Personal portfolio for Moch. Ridho Kurniawan (Software Developer). The full plan and design decisions live in `PLAN.md`; the design mockup is https://claude.ai/artifact/D7wqviCidhkzpQcV1bTveo.

## Stack

- Next.js 16 (App Router, React Compiler, `cacheComponents` on), React 19, TypeScript strict
- Tailwind CSS v4 (CSS-first config in `app/globals.css`, no `tailwind.config`)
- Animation: Motion (`motion/react`, formerly Framer Motion) + Lenis smooth scrolling (`lenis/react`, set up in `components/providers.tsx`)
- Content: MDX + Velite (`velite.config.ts`) with remark-gfm, rehype-slug, rehype-autolink-headings, rehype-pretty-code + shiki
- Tests: Vitest (unit), Playwright (e2e; browsers not downloaded yet, run `npx playwright install` when writing e2e tests)
- Formatting: Prettier + prettier-plugin-tailwindcss (sorts Tailwind classes)
- Hosting: Vercel
- Git: default branch is `main`

## Commands

- `npm run dev` — builds content with Velite, then starts the dev server on http://localhost:3000
- `npm run content` — Velite in watch mode (run beside `dev` while editing MDX)
- `npm run build` — Velite + production build (must pass before calling work done)
- `npm run lint` — ESLint
- `npm run format` / `npm run format:check` — Prettier (Markdown files are ignored)
- `npm test` — Vitest (`*.test.ts(x)` files)

## Where things live

- `app/[lang]/` — every page lives under the language segment (`en`, `id`): `/[lang]`, `/[lang]/about`, `/[lang]/work` (reuse the `About`/`Work` sections with `headingAs="h1"`; no Contact section there, so their CTAs link to `/[lang]#contact`; `/about` hides What I do and How I work via `showServices={false}`), `/[lang]/blog`, `/[lang]/blog/[slug]`, `/[lang]/projects/[slug]`, `not-found.tsx`, `opengraph-image.tsx`. The root layout is `app/[lang]/layout.tsx`.
- `app/` root — `sitemap.ts` (both languages with hreflang), `robots.ts`, `rss.xml/route.ts` (English), `icon.svg`, `globals.css`. `proxy.ts` (project root) redirects URLs without a language prefix to the saved choice (`NEXT_LOCALE` cookie), else the browser language, else English.
- `components/sections/` — homepage sections (Hero, LetsBuild, About → Stack/Services/Process, Perspective, Work, LatestWriting, Contact) and the blog list
- `components/layout/` — header, footer, side labels (left edge only), `SectionIndex` (homepage right-edge ruler), back-to-top, scroll progress
- `components/ui/` — reusable pieces: `Logo`, `PixelR`, `AnimatedText`/`SectionHeading`, `Reveal`/`Stagger`, `ButtonLink`, `Chip`, `Media`, `Marquee`, `PostCard`, `JsonLd`, `GlowOrb`/`SectionGlow`, `FloatingShapes` + `shapes-3d`, `cardClass`
- `components/mdx/` — MDX renderer and components (`Callout`, copyable code blocks)
- `content/blog/*.mdx`, `content/projects/*.mdx` — articles and case studies (Velite output goes to `.velite/`, imported as `#site/content`)
- `lib/site.ts` — name, URL, contact links (empty values show as placeholders); `lib/i18n.ts` — locales, `localePath()`, `languageAlternates()`; `lib/i18n-server.ts` — `getI18n()` (locale from `next/root-params` + dictionary, Server Components only); `lib/dictionaries/en.ts` + `id.ts` — all UI copy (`id` is typed as `Dictionary`, so both must have the same keys); `lib/about.ts` — all About copy per language (photo, intro, bio paragraphs, facts, Journey timeline; the owner edits this file); `lib/data.ts` — services, stack channels (`stackGroups`), process steps, marquee; `lib/content.ts` — content getters; `lib/content-utils.ts` — pure helpers (tested)

## Design rules

- Dark theme only. Palette is Night Mint; use the tokens, never raw hex in components:
  `bg-ink`, `bg-surface`, `border-line`, `text-fg`, `text-muted`, `text-accent` / `bg-accent`, `text-on-accent`. (The background token is `ink`, not `base`, because `text-base` is Tailwind's font-size utility.)
- Decorative tokens `deco-yellow`, `deco-blue`, `deco-pink` exist **only** for the services scenes (`ServicesPanel`), the Skills & Tools mixer (one tone per channel in `stack.tsx`), and the 3D floating icons. Don't use them for UI, text, or cards.
- Each service in `ServicesPanel` has its own scene (`scenes` map in `components/sections/services-panel.tsx`, keyed by each service's `cmd` from `lib/data.ts`): color family, blob shapes, dashed path, six icon tiles (line icons from the `icons` map in that file, no tool names), and motifs. The dashed path marches (`strokeDashoffset`) with a colored dot traveling along it, blobs slowly rotate, tiles and decorations float; all of it is transform/dash-offset only and the path animation is skipped for reduced motion. Business = blue, browser + cursor; Mobile = pink, phone + badge + signal; Landing = mint, target + arrow + sparkle; Web apps = yellow, bar chart + grid + `</>`. A new service needs a new scene entry.
- `Stack` ("Skills & tools") is a mixer board after the owner's reference: equalizer bars, the channel name as letter tiles, a `$ compile --stack <name>` line, a scrolling tool strip, then channel cards and tool chips. Channels come from `stackGroups`.
- Accent (mint) is rare: only the last word of each section heading (use `SectionHeading`), primary CTAs, the "Open for new projects" status, the logo cursor and pixel, marquee separators, and the active navbar link marker (dashed underline, mobile diamond). Never body text or section backgrounds.
- Fonts: `font-display` (Bebas Neue) for headings and big numbers, `font-sans` (Geist) for everything else, `font-mono` (Geist Mono) for the logo and small code-like details (glyphs, `$ build` line, code blocks).
- Logo: `<Logo />` (W2 wordmark, `blink` only in the navbar) and `<PixelR />` (M1 mark). Favicon is `app/icon.svg`.
- Page background is the scanlines pattern on `body`. Glow is **background only and restrained**:
  - Each homepage section has exactly **one** `<GlowOrb />` (soft white radial gradient, `strength` 0.05–0.08) behind its content, plus `<SectionGlow />` as the top divider (a gradient hairline, not a glow). Section wrapper: `relative overflow-hidden`.
  - **No glow on cards, buttons, badges, icons, or text**: no glow `box-shadow`, `drop-shadow`, `text-shadow`, cursor spotlight, or radial light inside a card. Hover states change border or background color only.
  - Never use `filter: blur()` or `backdrop-filter` for decoration (they made scrolling stutter). Use radial gradients instead. A cursor-following glow was removed for the same reason; do not add it back.
  - `ScrollProgress` (top bar) lives in `app/layout.tsx`. `FloatingShapes` (3D-looking SVG icons from `components/ui/shapes-3d.tsx`: cube, sphere, ring, pyramid, capsule, each tinted with a `tone` color; transform-only animation, no filters) only in Perspective.
- Cards use `cardClass` + `sheenClass` from `components/ui/card.ts`. Don't hand-roll flat `border-line bg-surface` cards.
- Placeholder images use `Media` (dot grid, pixel-mark watermark, label pill).
- Tailwind v4 animates `translate`, `rotate`, and `scale` as separate CSS properties: list them in `transition-[...]` (not `transform`) or hover lifts and rotations will jump.
- Navbar links go to pages (`/`, `/about`, `/work`, `/blog`, from `nav` in `lib/site.ts`); Contact is not in the nav. The active link gets a dashed mint (accent) underline that slides between links (`layoutId="nav-active"`); hover shows a solid underline; `/blog/...` keeps Blog active. The homepage has `SectionIndex` on the right edge: every homepage section needs an `id` listed in the `sections` array in `app/page.tsx`.
- Section order and content: follow `PLAN.md` §3.5. Mobile is single-column at 390px.

## Motion

- Entrance and scroll animations go through the shared components: `Reveal` (fade-up), `Stagger`/`StaggerItem` (lists and grids), `AnimatedText`/`SectionHeading` (word-by-word mask reveal).
- Scroll-linked effects (`useScroll`/`useTransform`) must skip their `style` when `useReducedMotion()` is true; `MotionConfig reducedMotion="user"` covers the rest.
- Ease: `[0.22, 1, 0.36, 1]`; durations 0.6–1s for entrances, ~0.3s for UI state changes.
- Elements with `position: fixed` must not be nested inside an element that has `backdrop-filter`, `transform`, or `filter` (it traps them). That is why the mobile menu sits outside `<header>`.

## Code conventions

- Server Components by default; add `"use client"` only for real interactivity or Motion.
- Client components must not import `@/lib/content` at runtime (it pulls all MDX into the bundle). Pass plain data as props; type-only imports are fine.
- Dynamic routes must return at least one param from `generateStaticParams` (Cache Components requirement), so keep at least one post and one project.
- Reading `params` or the `lang` root param outside `<Suspense>` trips the dev "instant navigation" check. Every page under `app/[lang]` and the `[lang]` layout are fully prerendered, so they set `export const instant = false` (only unknown slugs or languages block). Do the same for new pages.
- i18n: server components get text with `const { locale, t } = await getI18n()`; client components never import the dictionaries, they receive the strings (and `locale`) as props. Build every internal link with `localePath(locale, "/path")`; give every page `alternates: { canonical: localePath(...), languages: languageAlternates("/path") }`. `next/root-params` does not work in route handlers (image routes, RSS): read `params.lang` there instead. Blog and project MDX stay in English for both languages (`blog.languageNote` says so on the Indonesian blog).
- File names kebab-case (`pixel-r.tsx`), components PascalCase, named exports.
- Every page exports metadata (`metadata` or `generateMetadata`) and has exactly one `h1`.
- Every image uses `next/image` with a real `alt` (via `Media` for project/article images).
- Tap targets at least 44px; text contrast WCAG AA.

## Copy

- The site is in English and Indonesian. New UI text goes into both dictionaries; nothing user-facing is hard-coded in components.
- Write copy plainly, like a person (humanizer rules): everyday words, no em dashes, no "not X but Y", no hype. Indonesian is casual and friendly with "kamu" and the tech words people actually use (website, tools, landing page, deploy).
- No invented numbers or claims. Unknown facts stay as visible placeholders like `[YEAR]` until the owner fills them in.

## Workflow

- Next.js 16 has breaking changes: read the relevant guide in `node_modules/next/dist/docs/` (see `AGENTS.md`) before using an API you are unsure about.
- Before saying a change is done: `npm run lint`, `npm run format:check`, `npm test`, and `npm run build` must pass.
- npm can drop rolldown's native binding (needed by Vitest) after `npm install <pkg>`. If Vitest fails with "Cannot find native binding", delete `node_modules` and `package-lock.json`, then `npm install`, and check that `package-lock.json` lists all `@rolldown/binding-*` packages.
- On Windows, a dev server started from a background process (no console) can fail with `0xc0000142` when Turbopack spawns loader workers. Run `npm run dev` in a real terminal.
- Never commit `.env*` files; add new env vars to `.env.example`.
