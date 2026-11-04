# PLAN: Portfolio Website — Moch. Ridho Kurniawan

> Portfolio + jasa yang cepat, mudah ditemukan di Google, dan mengubah pengunjung menjadi klien.
> Status: **Desain final** · 2026-11-03
> Mockup desain: https://claude.ai/artifact/D7wqviCidhkzpQcV1bTveo

---

## 1. Tujuan

| Item | Keputusan |
|---|---|
| Positioning | **Software Developer** |
| Jasa (urutan prioritas) | 1. Business Websites · 2. Mobile Apps (Flutter) · 3. Landing Pages · 4. Web Apps |
| Target | Pemilik bisnis/UMKM, startup, recruiter |
| Bahasa konten | **Inggris dan Indonesia** di `/en/...` dan `/id/...` (kamus di `lib/dictionaries`, tombol EN/ID di header, hreflang di metadata dan sitemap). Artikel blog dan studi kasus tetap bahasa Inggris |
| Konversi utama | Klik email / WhatsApp |

**Metrik sukses (3 bulan pertama):** Lighthouse ≥ 90 di semua kategori · semua halaman terindeks Google · ≥ 5 artikel · ≥ 3 case study · ≥ 1 inquiry/bulan.

---

## 2. Tech Stack

| Layer | Pilihan |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Animasi | Motion (dulu bernama Framer Motion) untuk animasi masuk, scroll, dan interaksi |
| Smooth scroll | Lenis (scroll berinersia, otomatis mati untuk `prefers-reduced-motion`) |
| Konten | MDX di repo + Velite (validasi frontmatter dengan Zod) |
| Analytics | Umami atau Plausible + Google Search Console |
| Hosting | Vercel + domain sendiri |
| Kualitas | ESLint + Prettier (+ plugin Tailwind), Vitest (unit), Playwright (smoke test) |
| Git | Branch utama `main` |

MDX dipilih (bukan CMS) karena kamu satu-satunya penulis: gratis, simpel, konten tersimpan di git. Hindari Contentlayer (tidak dirawat lagi). Cadangan bila Velite bermasalah: `next-mdx-remote` + `gray-matter`.

---

## 3. Desain (final)

Arah: mirip [resflow.in](https://resflow.in/). Satu-satunya detail dari [letsplayfight.com](https://www.letsplayfight.com/): teks vertikal kecil di kiri ("Made in Indonesia" + ikon globe · "© 2026"), disembunyikan di layar < 960px. Tepi kanan homepage dipakai indeks section bernomor (01–07, lihat §3.5). Tema **gelap saja** (tanpa light mode).

### 3.1 Warna — Night Mint

Diterapkan di `app/globals.css`:

```css
@theme {
  --color-ink: #0a0a0a;       /* hitam doff netral → bg-ink (bukan "base": bentrok dengan text-base) */
  --color-surface: #151515;   /* kartu, panel, placeholder gambar → bg-surface */
  --color-line: #2a2a2a;      /* garis & border → border-line */
  --color-fg: #f0f0ee;        /* teks utama → text-fg */
  --color-muted: #8c8c8a;     /* teks redup → text-muted */
  --color-accent: #5ef2b0;    /* aksen mint → text-accent, bg-accent */
  --color-on-accent: #0a0a0a; /* teks di atas aksen → text-on-accent */
}
```

Font dimuat lewat `next/font` di `app/layout.tsx` dan tersedia sebagai `font-display` (Bebas Neue), `font-sans` (Geist), `font-mono` (Geist Mono, khusus logo).

**Aturan aksen mint:**
- Judul section: hanya kata terakhir: LET'S **BUILD.** · ABOUT **ME** · WHAT I **DO** · BUILT TO **FLOW** · I BUILD WHAT **WORKS.** · MY **WORK** · LATEST **WRITING** · LET'S **TALK.** Hero "PORTFOLIO" tetap putih.
- Selain itu: tombol CTA utama, status "Open for new projects", kursor logo, piksel logo, pemisah marquee.
- Jangan untuk teks panjang atau latar section.

### 3.2 Latar — Scanlines

Garis horizontal tipis di seluruh halaman, murni CSS (tanpa gambar):

```css
body {
  background-color: var(--color-bg);
  background-image: repeating-linear-gradient(
    0deg, rgb(240 240 238 / 0.035) 0 1px, transparent 1px 5px
  );
}
```

### 3.2b Glow (hanya di latar)

Glow dipakai **hemat dan hanya di latar**, supaya halaman tetap ringan, smooth, dan tidak menyilaukan.

| Elemen | Aturan |
|---|---|
| Setiap section | Tepat **satu** cahaya putih lembut di latar (`GlowOrb`, gradient radial). Pemisah antar section berupa garis gradient tipis (`SectionGlow`). |
| Kartu, tombol, badge, ikon, teks | **Tanpa glow.** Hover hanya mengubah warna border/latar, tidak ada bayangan bercahaya, sorotan kursor, atau cahaya di dalam kartu. |
| Efek yang dilarang | `filter: blur()`, `backdrop-filter`, glow yang mengikuti kursor, dan `text-shadow` besar. Ketiganya sempat membuat scroll patah-patah, jadi sudah dihapus. |
| Ikon 3D melayang | Kubus (biru), bola (pink), cincin (kuning), piramida (mint), dan kapsul (pink), SVG dengan gradient terang-gelap, hanya di section Perspective dan hanya desktop. Tanpa blur atau filter, animasi transform saja. |
| Progress bar | Garis 2px di paling atas yang terisi saat scroll. |

### 3.3 Tipografi

| Peran | Font |
|---|---|
| Judul & angka besar | Bebas Neue (uppercase, condensed) |
| Body, label, nav | Geist |
| Logo | Geist Mono |

Muat lewat `next/font` agar tidak ada layout shift.

### 3.4 Logo

- **Wordmark (W2 · Terminal):** `ridho` dalam Geist Mono 500, letter-spacing -0.05em, diikuti kursor blok mint. Dipakai di navbar (kursor berkedip, dimatikan saat `prefers-reduced-motion`) dan footer (tidak berkedip). Buat sebagai komponen `<Logo />`.
- **Simbol (M1 · Pixel R):** huruf R di grid piksel 6×7, tanpa kotak latar. Dipakai di hero dan sebagai favicon/app icon (`public/favicon.svg`, `app/icon.tsx`).

```
111100
100010
100010      1 = warna teks
111100      2 = mint (kursor)
101000      0 = kosong
100100
100012
```

### 3.5 Struktur halaman beranda (`/`)

| # | Section | Isi |
|---|---|---|
| — | Header | Logo W2 kiri · nav Home (`/`) / About (`/about`) / Work (`/work`) / Blog (`/blog`) kanan, link aktif ditandai garis bawah putus-putus warna accent (mint) yang bergeser (mobile: tombol menu). Contact tidak masuk nav; CTA mengarah ke section Contact |
| — | Indeks section (desktop ≥ 1100px, homepage saja) | Penggaris vertikal di tepi kanan: garis + nomor 01–07, section aktif = garis panjang, nomor tebal, ikon belah ketupat + nama section. Klik = scroll halus ke section |
| 1 | Hero | Label "Software Developer" · ikon Pixel R · **PORTFOLIO** raksasa · satu kalimat jasa · "Remote · Indonesia · Open for new projects" · CTA "Start a project" + "View work" · penanda SCROLL |
| 2 | Band | **LET'S BUILD.** besar di tengah |
| 3 | About | ABOUT ME + intro · foto (sticky) · bio beberapa paragraf · 4 kartu fakta (Based in, Role, Experience, Focus) · tombol CV, GitHub, LinkedIn · timeline **Journey** (kerja & pendidikan). Semua isi diedit di `lib/about.ts` |
| 3a | Skills & Tools | "Mixer board": bar atas `MIX / 01 · FRONTEND STACK` + titik channel, equalizer beranimasi (warna per channel), nama channel sebagai ubin huruf, baris `$ compile --stack frontend` dengan kursor berkedip, deretan tool berjalan di bawah. 4 kartu channel (Frontend, Backend, Mobile, Tools) untuk memilih, chip tool + caption `CHANNEL: … TOOLS`. Data di `stackGroups` (`lib/data.ts`) |
| 3b | What I do | "Scene" layanan yang **berbeda untuk tiap layanan**: label "Service 01", nama layanan besar di atas dua blob berwarna, garis putus-putus yang berjalan + titik berwarna yang mengalir di sepanjang garis, blob berputar pelan, dekorasi melayang, ikon garis yang relevan per layanan dalam ubin miring (bukan nama tool; di mobile jadi baris ikon), dan motif khusus. Business Websites = biru (jendela browser, kursor, garis bergelombang); Mobile Apps = pink (ponsel, badge notifikasi, sinyal, garis melingkar); Landing Pages = mint (target, panah naik, bintang, garis menanjak); Web Apps = kuning (grafik batang, grid dashboard, `</>`, garis zig-zag). Klik kartu layanan di bawahnya dan scene "memantul" berganti. |
| 3c | Built to flow | 4 langkah: Discover → Build → Refine → Launch |
| 4 | Perspective | "PRETTY IS EASY. / I BUILD WHAT WORKS." + paragraf tentang hasil setelah launch + marquee SOFTWARE DEVELOPER |
| 5 | My Work | Kartu featured horizontal (Internity) · grid kartu project (pill kategori, CODE/LIVE) · stat bar "START YOURS" |
| 6 | Latest Writing | 3 kartu artikel terbaru + tombol "All articles" |
| 7 | Contact | "Get in touch" · **LET'S TALK.** raksasa · email bergaris bawah · link WhatsApp |
| — | Footer | Satu baris: logo · "© 2026 Ridho · Software Developer" · GitHub, LinkedIn, Email |

Tanpa form kontak di beranda. Tombol back-to-top bulat di pojok kanan bawah.

**Mobile (390px):** semua section satu kolom; CTA hero lebar penuh; kartu layanan grid 2×2 dengan deskripsi di panel atas; "Built to flow" jadi daftar baris; blog jadi baris ringkas (thumbnail + judul).

### 3.6 Halaman lain

```
/projects/[slug]   → case study: Masalah → Solusi → Peran → Stack → Hasil terukur → Screenshot
/blog              → daftar artikel (filter tag)
/blog/[slug]       → artikel: daftar isi, highlight kode, artikel terkait, CTA kontak
/sitemap.xml, /robots.txt, /rss.xml, opengraph-image → otomatis
```

---

## 4. Blog dengan MDX

```
content/blog/*.mdx → Velite (parse + validasi Zod) → halaman statis (SSG) → sitemap, RSS, JSON-LD, OG image
```

**Frontmatter wajib** (build gagal bila kurang):

```mdx
---
title: "Next.js + MDX: Building an SEO-Friendly Blog"
description: "120–160 characters for the meta description."
date: "2026-11-10"
updated: "2026-12-01"   # opsional
tags: ["nextjs", "mdx"]
cover: "/blog/nextjs-mdx-blog/cover.webp"
draft: false
---
```

- Field otomatis: `slug`, `readingTime`, `toc`.
- Plugin: `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code`.
- Komponen MDX: `Callout`, `CodeBlock` (tombol salin), `Image` (`next/image`), `Link`.
- Case study (`content/projects/*.mdx`) memakai pipeline yang sama.

**Alur menulis:** buat file dengan `draft: true` → cek di `npm run dev` → gambar WebP di `public/blog/<slug>/` (wajib `alt`) → cek title, description, internal link → `draft: false` → push → bagikan ke LinkedIn.

---

## 5. Struktur folder

```
portfolio/
├─ app/
│  ├─ [lang]/                  # en, id
│  │  ├─ layout.tsx            # root layout, <html lang>
│  │  ├─ page.tsx              # beranda
│  │  ├─ about/, work/, blog/, blog/[slug]/, projects/[slug]/
│  │  ├─ not-found.tsx
│  │  └─ opengraph-image.tsx
│  ├─ globals.css              # token @theme
│  ├─ sitemap.ts, robots.ts, rss.xml/route.ts
│  └─ icon.svg                 # dari grid Pixel R
├─ proxy.ts                    # arahkan URL tanpa bahasa ke /en atau /id
├─ components/
│  ├─ layout/                  # SiteHeader, LanguageSwitch, SiteFooter, SideLabels, SectionIndex, BackToTop
│  ├─ sections/                # Hero, LetsBuild, About, Stack, Services, Process, Perspective, Work, LatestWriting, Contact, BlogList
│  ├─ ui/                      # Logo, PixelR, AnimatedText, Reveal, ButtonLink, Chip, Media, Marquee, PostCard, JsonLd
│  ├─ mdx/                     # MDXContent, Callout, CopyPre (kode bisa disalin)
│  └─ providers.tsx            # Lenis + MotionConfig
├─ content/blog/, content/projects/
├─ lib/                        # i18n.ts, i18n-server.ts, dictionaries/ (en, id), about.ts, data.ts, site.ts, content.ts
├─ public/                     # favicon.svg, cv.pdf, gambar
├─ velite.config.ts
├─ PLAN.md
└─ CLAUDE.md
```

---

## 6. SEO

**Teknis (wajib sebelum rilis):**
- `title` dan meta description unik per halaman (`generateMetadata`), satu `h1`, canonical URL.
- Open Graph + OG image dinamis per artikel.
- `sitemap.xml` + `robots.txt`, kirim ke Google Search Console.
- JSON-LD: `Person`, `WebSite`, `ProfessionalService`, `BlogPosting`, `BreadcrumbList`.
- Core Web Vitals hijau: LCP < 2,5 dtk, CLS < 0,1, INP < 200 ms.
- `next/image` (WebP/AVIF + `alt`), `next/font`, utamakan Server Components.

**Konten:**
- Kata kunci transaksional: "business website development", "hire Next.js developer", "freelance web developer Indonesia", "Flutter app developer", "landing page developer".
- Kata kunci informasional: "website development cost", "Next.js vs WordPress", "how to improve Core Web Vitals".
- 1–2 artikel/bulan, konsisten. Setiap artikel diakhiri CTA dan link ke project terkait.
- Case study wajib punya hasil terukur (mis. "loading 4 dtk → 1,2 dtk").

**Distribusi:**
- LinkedIn (posting rutin).
- GitHub (README tiap repo menaut ke portfolio).
- Cross-post ke Dev.to/Hashnode dengan canonical ke situs sendiri.
- Profil marketplace freelance.
- Link portfolio di CV, tanda tangan email, dan bio sosmed.

**Pengukuran:** lacak klik email/WhatsApp dan CTA; review Search Console tiap bulan.

> SEO butuh 3–6 bulan untuk terasa. Di awal, klien lebih banyak datang dari distribusi aktif.

---

## 7. Roadmap

### Fase 0: Fondasi
- [ ] Domain
- [ ] Siapkan konten yang masih placeholder (lihat bagian 10)
- [x] Setup Next.js 16 + TypeScript + Tailwind v4 + ESLint
- [x] Prettier, Vitest, Playwright, Motion, Velite + plugin MDX terpasang
- [x] Token `@theme`, font, komponen `<Logo />` dan `<PixelR />`, favicon Pixel R (`app/icon.svg`)
- [x] `CLAUDE.md`

### Fase 1: Beranda (MVP)
- [x] Header (menu mobile beranimasi), footer satu baris, latar scanlines, back-to-top
- [x] Semua section beranda sesuai bagian 3.5 (desktop + mobile)
- [x] Animasi: reveal saat scroll, judul per kata, parallax hero, panel layanan interaktif, marquee, smooth scroll Lenis
- [x] Metadata, sitemap, robots, OG image
- [ ] Deploy ke Vercel + domain (isi `NEXT_PUBLIC_SITE_URL`)

### Fase 2: Konten
- [x] Pipeline MDX, `/blog` (filter tag), `/blog/[slug]` (daftar isi, artikel terkait), `/projects/[slug]`
- [x] Kerangka 3 case study + 3 artikel (isi masih placeholder)
- [ ] Tulis isi asli artikel dan case study
- [x] JSON-LD (Person, WebSite, ProfessionalService, BlogPosting, BreadcrumbList), RSS
- [ ] Daftarkan ke Search Console

### Fase 3: Polish
- [ ] Lighthouse ≥ 90, aksesibilitas, uji di HP nyata
- [ ] Smoke test Playwright
- [ ] Review kode dan copy

### Fase 4: Pertumbuhan
- [ ] 1–2 artikel/bulan, distribusi rutin, review analytics bulanan

---

## 8. Skill Claude yang dipakai

| Tahap | Skill |
|---|---|
| Rencanakan fitur | `superpowers:brainstorming` → `superpowers:writing-plans` |
| Cek dokumentasi library terbaru | `anthropic-skills:context7-mcp` |
| Bangun & poles UI | `impeccable` |
| Logika dengan test | `superpowers:test-driven-development` |
| Debugging | `superpowers:systematic-debugging` |
| Rapikan & review | `simplify`, `code-review`, `security-review` |
| Sebelum klaim selesai | `superpowers:verification-before-completion` |
| Jalankan app | `run` |
| Copywriting | `humanizer` |
| Sebelum rilis | `engineering:deploy-checklist` |

**Alur per fitur:** brainstorming → writing-plans → context7 → implementasi → impeccable → simplify → code-review → verification → commit kecil → deploy preview.

**Isi `CLAUDE.md`:**
- Stack dan perintah (`dev`, `build`, `lint`, `test`).
- Token warna dan aturan aksen (bagian 3.1).
- Server Components default, TypeScript strict.
- Setiap halaman wajib `generateMetadata` + satu `h1`; gambar wajib `alt`.
- Copy dalam bahasa Inggris dan Indonesia (santai, kata populer, gaya humanizer), tanpa klaim yang tidak bisa dibuktikan.
- Jangan commit `.env`.

---

## 9. Checklist rilis

- [ ] Title, description, OG image di semua halaman
- [ ] Sitemap/robots valid dan terkirim ke Search Console
- [ ] Lighthouse ≥ 90 (mobile & desktop)
- [ ] Link email, WhatsApp, dan sosmed benar
- [ ] Tidak ada link rusak; halaman 404 ada
- [ ] Teruji di Chrome, Safari, Firefox, dan HP nyata
- [ ] Analytics aktif; tidak ada secret di repo
- [ ] Domain + HTTPS aktif

---

## 10. Konten yang perlu kamu siapkan

Bagian ini masih placeholder di mockup:

- [ ] Foto potret (hitam-putih)
- [ ] CV (PDF)
- [ ] Paragraf About: latar belakang + cara kerja
- [ ] Stack asli per channel (Frontend, Backend, Mobile, Tools) di `lib/data.ts`
- [ ] Isi About di `lib/about.ts`: foto, intro, bio, fakta, Journey
- [ ] Internity: stack, masalah yang diselesaikan, hasil terukur, screenshot, tahun
- [ ] 2 project lain (1 website, 1 mobile app) beserta detail yang sama
- [ ] Email, nomor WhatsApp, link GitHub/LinkedIn → isi di `lib/site.ts`
- [ ] Domain
