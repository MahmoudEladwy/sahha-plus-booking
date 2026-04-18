import { type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Heart, Globe, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DashItem = { to: string; label: string; icon: LucideIcon };

export function DashLayout({
  items, title, subtitle, children,
}: { items: DashItem[]; title: string; subtitle: string; children: ReactNode }) {
  const { t } = useTranslation();
  const { lang, toggle } = useLang();
  const loc = useLocation();

  return (
    <div className="min-h-screen bg-surface/40 grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:flex flex-col border-e border-border/50 bg-card">
        <Link to="/" className="p-6 flex items-center gap-2.5 border-b border-border/50">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Heart className="h-4 w-4 fill-gold text-gold" />
          </div>
          <div>
            <div className="font-display font-bold text-primary">{t("brand.name")}</div>
            <div className="text-[10px] text-muted-foreground">{title}</div>
          </div>
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          {items.map((it) => {
            const active = loc.pathname === it.to;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-accent hover:text-primary"}`}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50 space-y-2">
          <button onClick={toggle} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-accent">
            <Globe className="h-4 w-4" /> {lang === "ar" ? "English" : "العربية"}
          </button>
          <Link to="/" className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="h-4 w-4" /> {t("dash.logout")}
          </Link>
        </div>
      </aside>

      <div className="flex flex-col">
        <header className="bg-card border-b border-border/50 px-6 py-5">
          <h1 className="font-display text-xl lg:text-2xl font-bold text-primary">{title}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </header>
        <main className="flex-1 p-5 lg:p-8 space-y-6">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({ label, value, hint, accent }: { label: string; value: string; hint?: string; accent?: "gold" | "mint" | "primary" }) {
  const colors = {
    gold: "from-gold/20 to-gold/5",
    mint: "from-mint/30 to-mint/5",
    primary: "from-primary/10 to-primary/5",
  };
  return (
    <div className={`bg-card rounded-3xl p-5 border border-border/40 shadow-soft bg-gradient-to-br ${colors[accent ?? "primary"]}`}>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-3xl font-bold text-primary mt-1">{value}</div>
      {hint && <div className="text-xs text-mint-foreground mt-1">{hint}</div>}
    </div>
  );
}

export function Card({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="bg-card rounded-3xl p-6 shadow-soft border border-border/40">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-primary">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
