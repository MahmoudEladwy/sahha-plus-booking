import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Heart, Menu, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const { t } = useTranslation();
  const { lang, toggle } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/search", label: t("nav.search") },
    { to: "/for-doctors", label: t("nav.forDoctors") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/30 blur-lg rounded-full group-hover:bg-gold/50 transition-colors" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <Heart className="h-5 w-5 fill-gold text-gold" />
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg md:text-xl font-bold text-primary">
                {t("brand.name")}
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground">{t("brand.tagline")}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-primary bg-accent" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-primary hover:bg-accent/60" }}
                activeOptions={{ exact: l.to === "/" }}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span>{lang === "ar" ? "EN" : "ع"}</span>
            </button>
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex rounded-full">
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 shadow-soft hidden sm:inline-flex">
              <Link to="/search">{t("nav.search")}</Link>
            </Button>

            <button
              className="lg:hidden p-2 rounded-full hover:bg-accent"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-4 space-y-1 animate-fade-up">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
                <Link to="/login" onClick={() => setOpen(false)}>{t("nav.login")}</Link>
              </Button>
              <Button onClick={toggle} variant="ghost" size="sm" className="rounded-full">
                <Globe className="h-4 w-4 me-1" />
                {lang === "ar" ? "EN" : "ع"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
