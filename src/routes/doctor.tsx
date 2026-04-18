import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { DashLayout, StatCard, Card } from "@/components/site/DashLayout";
import { Calendar, Clock, Users, Building2, DollarSign, Settings } from "lucide-react";
import { upcomingAppointments, doctors } from "@/lib/data";

export const Route = createFileRoute("/doctor")({
  component: DoctorDashboard,
  head: () => ({ meta: [{ title: "بوابة الطبيب — صحة بلس" }] }),
});

function DoctorDashboard() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const me = doctors[0];

  const items = [
    { to: "/doctor", label: t("dash.appointments"), icon: Calendar },
    { to: "/doctor", label: t("dash.schedule"), icon: Clock },
    { to: "/doctor", label: t("dash.requests"), icon: Users },
    { to: "/doctor", label: t("dash.branches"), icon: Building2 },
    { to: "/doctor", label: t("dash.earnings"), icon: DollarSign },
    { to: "/doctor", label: t("dash.settings"), icon: Settings },
  ];

  return (
    <DashLayout
      items={items}
      title={`${t("dash.welcome")}, ${lang === "ar" ? me.nameAr : me.nameEn}`}
      subtitle={lang === "ar" ? "نظرة شاملة على عيادتك اليوم" : "An overview of your practice today"}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={lang === "ar" ? "مواعيد اليوم" : "Today's appointments"} value="12" accent="gold" />
        <StatCard label={lang === "ar" ? "هذا الأسبوع" : "This week"} value="58" accent="primary" />
        <StatCard label={lang === "ar" ? "إيرادات الشهر" : "Monthly earnings"} value="24,500 ر.س" accent="mint" />
        <StatCard label={lang === "ar" ? "متوسط التقييم" : "Avg. rating"} value="4.9 ★" accent="gold" />
      </div>

      <Card title={lang === "ar" ? "المواعيد القادمة" : "Upcoming appointments"}>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/40">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center font-semibold">
                {String.fromCharCode(64 + i)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{lang === "ar" ? "مريض رقم " + i : "Patient #" + i}</div>
                <div className="text-xs text-muted-foreground">{lang === "ar" ? "كشف عام" : "General consultation"}</div>
              </div>
              <div className="text-end text-xs">
                <div className="font-medium">{`${9 + i}:00 AM`}</div>
                <div className="text-muted-foreground">{lang === "ar" ? "اليوم" : "Today"}</div>
              </div>
              <span className="hidden sm:inline px-2.5 py-1 rounded-full bg-mint/30 text-mint-foreground text-[10px] font-semibold">
                {t("common.confirmed")}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title={t("dash.schedule")}>
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
            {(lang === "ar" ? ["أحد","اثن","ثلا","أرب","خمي","جمع","سبت"] : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]).map((d) => (
              <div key={d} className="font-semibold text-muted-foreground py-1">{d}</div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs ${i % 5 === 0 ? "bg-gold/30 text-gold-foreground font-semibold" : i === 12 ? "bg-primary text-primary-foreground font-bold" : "bg-secondary/50"}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </Card>

        <Card title={t("dash.requests")}>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/40">
                <div>
                  <div className="font-semibold text-xs">{lang === "ar" ? "طلب موعد جديد" : "New appointment request"}</div>
                  <div className="text-[10px] text-muted-foreground">{lang === "ar" ? "قبل دقائق" : "Few minutes ago"}</div>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-3 py-1 rounded-full bg-mint text-mint-foreground text-[10px] font-semibold">{t("common.approve")}</button>
                  <button className="px-3 py-1 rounded-full bg-secondary text-[10px] font-semibold">{t("common.reject")}</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashLayout>
  );
}
