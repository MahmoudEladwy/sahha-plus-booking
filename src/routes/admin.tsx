import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { DashLayout, StatCard, Card } from "@/components/site/DashLayout";
import { Users, Stethoscope, Building2, BarChart3, ShieldCheck, Tag, Calendar, Star, CheckCircle2, X } from "lucide-react";
import { doctors, specialties } from "@/lib/data";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "لوحة الإدارة — صحة بلس" }] }),
});

function AdminDashboard() {
  const { t } = useTranslation();
  const { lang } = useLang();

  const items = [
    { to: "/admin", label: t("dash.analytics"), icon: BarChart3 },
    { to: "/admin", label: t("dash.users"), icon: Users },
    { to: "/admin", label: t("dash.doctors"), icon: Stethoscope },
    { to: "/admin", label: t("dash.approvals"), icon: ShieldCheck },
    { to: "/admin", label: t("dash.specialties"), icon: Tag },
    { to: "/admin", label: t("dash.clinics"), icon: Building2 },
    { to: "/admin", label: t("dash.bookings"), icon: Calendar },
    { to: "/admin", label: t("dash.reviews"), icon: Star },
  ];

  return (
    <DashLayout
      items={items}
      title={lang === "ar" ? "لوحة إدارة صحة بلس" : "Sehha Plus Admin"}
      subtitle={lang === "ar" ? "تحكم كامل بالمنصة" : "Full platform control"}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t("dash.users")} value="48,219" hint="+8% " accent="primary" />
        <StatCard label={t("dash.doctors")} value="12,084" hint="+3%" accent="gold" />
        <StatCard label={t("dash.bookings")} value="3,512" hint={lang === "ar" ? "هذا الأسبوع" : "This week"} accent="mint" />
        <StatCard label={lang === "ar" ? "إيرادات" : "Revenue"} value="1.4M" accent="gold" />
      </div>

      <Card title={t("dash.approvals")} action={<span className="text-xs px-2.5 py-1 rounded-full bg-gold/20 text-gold-foreground font-semibold">3 {lang === "ar" ? "قيد المراجعة" : "pending"}</span>}>
        <div className="space-y-3">
          {doctors.slice(0, 3).map((d) => (
            <div key={d.id} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/40">
              <img src={d.avatar} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{lang === "ar" ? d.nameAr : d.nameEn}</div>
                <div className="text-xs text-muted-foreground">{lang === "ar" ? d.specialtyAr : d.specialtyEn} • {d.experience} {t("doctor.years")}</div>
              </div>
              <div className="flex gap-2">
                <button className="h-8 w-8 rounded-full bg-mint flex items-center justify-center"><CheckCircle2 className="h-4 w-4 text-mint-foreground" /></button>
                <button className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center"><X className="h-4 w-4 text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title={t("dash.specialties")}>
          <div className="grid grid-cols-2 gap-2">
            {specialties.slice(0, 8).map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/40">
                <span className="text-sm font-medium">{lang === "ar" ? s.nameAr : s.nameEn}</span>
                <span className="text-xs text-muted-foreground">{s.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title={lang === "ar" ? "أحدث الحجوزات" : "Latest bookings"}>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/40">
                <div>
                  <div className="text-sm font-semibold">#{20240 + i}</div>
                  <div className="text-[10px] text-muted-foreground">{lang === "ar" ? "قبل دقائق" : "Few mins ago"}</div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-mint/30 text-mint-foreground font-semibold">
                  {t("common.confirmed")}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashLayout>
  );
}
