import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Users, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/for-doctors")({
  component: ForDoctorsPage,
  head: () => ({ meta: [{ title: "للأطباء — صحة بلس" }] }),
});

function ForDoctorsPage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const benefits = [
    { icon: Users, ar: "وصول لأكثر من مليون مريض", en: "Reach over 1M patients" },
    { icon: Calendar, ar: "إدارة مواعيد ذكية", en: "Smart appointment management" },
    { icon: TrendingUp, ar: "نمو مستمر في عيادتك", en: "Grow your practice steadily" },
    { icon: ShieldCheck, ar: "بيانات آمنة ومشفرة", en: "Secure encrypted data" },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-20">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <Sparkles className="h-8 w-8 text-gold mx-auto" />
            <h1 className="mt-4 font-display text-4xl lg:text-6xl font-bold text-primary">
              {lang === "ar" ? "انضم إلى نخبة الأطباء" : "Join the elite of doctors"}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {lang === "ar" ? "صحة بلس تربطك بآلاف المرضى وتدير موعدك ومدفوعاتك بسلاسة." : "Sehha Plus connects you with thousands of patients and manages your bookings and payments seamlessly."}
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full bg-primary px-8 h-12">
              <Link to="/login">{lang === "ar" ? "سجّل عيادتك مجاناً" : "Register your practice"}</Link>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="bg-card rounded-3xl p-6 shadow-soft border border-border/40">
                <div className="h-12 w-12 rounded-2xl bg-gold/15 flex items-center justify-center">
                  <b.icon className="h-6 w-6 text-gold" />
                </div>
                <p className="mt-4 font-display font-semibold text-primary">{lang === "ar" ? b.ar : b.en}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
