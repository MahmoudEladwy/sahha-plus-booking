import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { DashLayout, StatCard, Card } from "@/components/site/DashLayout";
import { Calendar, Heart, Bell, User, Clock, Video, Stethoscope, Home as HomeIcon, Star } from "lucide-react";
import { upcomingAppointments, pastAppointments, doctors } from "@/lib/data";

export const Route = createFileRoute("/patient")({
  component: PatientDashboard,
  head: () => ({ meta: [{ title: "بوابة المريض — صحة بلس" }] }),
});

function PatientDashboard() {
  const { t } = useTranslation();
  const { lang } = useLang();

  const items = [
    { to: "/patient", label: t("dash.upcoming"), icon: Calendar },
    { to: "/patient", label: t("dash.favorites"), icon: Heart },
    { to: "/patient", label: t("dash.notifications"), icon: Bell },
    { to: "/patient", label: t("dash.profile"), icon: User },
  ];

  const typeIcon = { clinic: Stethoscope, online: Video, home: HomeIcon };

  const findDoctor = (id: string) => doctors.find((d) => d.id === id)!;

  return (
    <DashLayout
      items={items}
      title={`${t("dash.welcome")}, ${lang === "ar" ? "أحمد" : "Ahmed"}`}
      subtitle={lang === "ar" ? "إليك نظرة سريعة على مواعيدك" : "Here's a snapshot of your appointments"}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t("dash.upcoming")} value={String(upcomingAppointments.length)} accent="gold" />
        <StatCard label={t("dash.past")} value={String(pastAppointments.length)} accent="mint" />
        <StatCard label={t("dash.favorites")} value="5" accent="primary" />
        <StatCard label={t("dash.notifications")} value="3" hint={lang === "ar" ? "جديدة" : "New"} accent="gold" />
      </div>

      <Card title={t("dash.upcoming")}>
        <div className="space-y-3">
          {upcomingAppointments.map((a) => {
            const d = findDoctor(a.doctorId);
            const Icon = typeIcon[a.type];
            return (
              <div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/40">
                <img src={d.avatar} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{lang === "ar" ? d.nameAr : d.nameEn}</div>
                  <div className="text-xs text-gold">{lang === "ar" ? d.specialtyAr : d.specialtyEn}</div>
                </div>
                <div className="text-end text-xs hidden sm:block">
                  <div className="font-medium">{lang === "ar" ? a.date : a.dateEn}</div>
                  <div className="text-muted-foreground">{a.time}</div>
                </div>
                <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-mint/30 text-mint-foreground text-[10px] font-semibold">
                  <Icon className="h-3 w-3" /> {t(`doctor.consultationTypes.${a.type}`)}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card title={t("dash.past")}>
        <div className="space-y-3">
          {pastAppointments.map((a) => {
            const d = findDoctor(a.doctorId);
            return (
              <div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/40">
                <img src={d.avatar} alt="" className="h-12 w-12 rounded-xl object-cover opacity-80" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{lang === "ar" ? d.nameAr : d.nameEn}</div>
                  <div className="text-xs text-muted-foreground">{lang === "ar" ? a.date : a.dateEn} • {a.time}</div>
                </div>
                <button className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-gold/20 text-gold-foreground hover:bg-gold/30">
                  <Star className="h-3 w-3" /> {lang === "ar" ? "قيّم" : "Review"}
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      <Card title={t("dash.favorites")}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {doctors.slice(0, 3).map((d) => (
            <Link key={d.id} to="/doctors/$doctorId" params={{ doctorId: d.id }} className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/40 hover:bg-secondary border border-border/40">
              <img src={d.avatar} alt="" className="h-10 w-10 rounded-xl object-cover" />
              <div className="min-w-0">
                <div className="font-semibold text-xs truncate">{lang === "ar" ? d.nameAr : d.nameEn}</div>
                <div className="text-[10px] text-gold">{lang === "ar" ? d.specialtyAr : d.specialtyEn}</div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </DashLayout>
  );
}
