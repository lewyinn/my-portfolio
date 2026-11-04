import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { localePath } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n-server";
import { contact } from "@/lib/site";

/** One-row footer (PLAN.md §3.5). */
export async function SiteFooter() {
  const { locale, t } = await getI18n();
  const links = [
    { href: contact.githubHref, label: "GitHub" },
    { href: contact.linkedinHref, label: "LinkedIn" },
    { href: contact.emailHref, label: "Email" },
  ];

  return (
    <footer className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      {/* Right padding keeps the links clear of the floating back-to-top button. */}
      <Container className="flex items-center justify-between gap-4 py-6 pr-20 text-[13px] text-muted md:pr-24">
        <div className="flex items-baseline gap-3">
          <Logo href={localePath(locale, "/")} className="text-lg text-fg" />
          <span className="whitespace-nowrap md:hidden">© 2026</span>
        </div>
        <p className="hidden md:block">© 2026 Ridho · Software Developer</p>
        <nav aria-label={t.nav.social}>
          <ul className="flex gap-4 md:gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
