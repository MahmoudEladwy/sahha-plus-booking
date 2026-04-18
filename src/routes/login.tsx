import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, User, Stethoscope, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "تسجيل الدخول — صحة بلس" }] }),
});

function LoginPage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [role, setRole] = useState<"patient" | "doctor" | "admin">("patient");

  const dashFor = { patient: "/patient", doctor: "/doctor", admin: "/admin" } as const;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-hero py-16">
        <div className="mx-auto max-w-md px-4">
          <div className="bg-card rounded-3xl p-8 shadow-elevated border border-border/40">
            <div className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground">
                <Heart className="h-7 w-7 fill-gold text-gold" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold text-primary">{t("auth.loginTitle")}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{t("auth.loginSubtitle")}</p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-1.5 p-1 bg-secondary/50 rounded-2xl">
              {([
                { v: "patient", icon: User, label: lang === "ar" ? "مريض" : "Patient" },
                { v: "doctor", icon: Stethoscope, label: lang === "ar" ? "طبيب" : "Doctor" },
                { v: "admin", icon: ShieldCheck, label: lang === "ar" ? "أدمن" : "Admin" },
              ] as const).map((r) => (
                <button
                  key={r.v}
                  onClick={() => setRole(r.v)}
                  className={`flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-medium transition-all ${role === r.v ? "bg-card shadow-soft text-primary" : "text-muted-foreground"}`}
                >
                  <r.icon className="h-4 w-4" />
                  {r.label}
                </button>
              ))}
            </div>

            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Label className="text-xs">{t("auth.email")}</Label>
                <Input type="email" className="rounded-xl mt-1.5" placeholder="you@example.com" />
              </div>
              <div>
                <Label className="text-xs">{t("auth.password")}</Label>
                <Input type="password" className="rounded-xl mt-1.5" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 text-muted-foreground">
                  <input type="checkbox" className="accent-gold" /> {lang === "ar" ? "تذكرني" : "Remember me"}
                </label>
                <a href="#" className="text-primary hover:underline">{t("auth.forgot")}</a>
              </div>
              <Button asChild className="w-full rounded-full bg-primary hover:bg-primary/90 h-11">
                <Link to={dashFor[role]}>{t(`auth.loginAs${role.charAt(0).toUpperCase()}${role.slice(1)}` as any)}</Link>
              </Button>
            </form>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              {t("auth.noAccount")} <a href="#" className="text-primary font-semibold hover:underline">{t("nav.signup")}</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
