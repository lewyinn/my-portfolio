import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "../globals.css";
import { BackToTop } from "@/components/layout/back-to-top";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SideLabels } from "@/components/layout/side-labels";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { languageAlternates, localeLabels, locales } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Both languages are prerendered; only an unknown language segment (a 404) blocks.
export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} · ${site.role}`,
      template: `%s · ${site.name}`,
    },
    description: t.meta.description,
    authors: [{ name: site.fullName, url: site.url }],
    creator: site.fullName,
    openGraph: {
      type: "website",
      siteName: site.fullName,
      locale: localeLabels[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].og),
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      languages: languageAlternates("/"),
      types: { "application/rss+xml": "/rss.xml" },
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, t } = await getI18n();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <a
            href="#main"
            className="sr-only z-50 rounded-full bg-fg px-4 py-2 text-sm text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            {t.common.skip}
          </a>
          <SiteHeader locale={locale} labels={t.nav} />
          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
          <SideLabels label={t.common.madeIn} />
          <BackToTop label={t.common.backToTop} />
          <ScrollProgress />
        </Providers>
      </body>
    </html>
  );
}
