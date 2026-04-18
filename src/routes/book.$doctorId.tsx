import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { doctors, timeSlots } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  CheckCircle2, Calendar, CreditCard, Building2, ChevronLeft, ChevronRight,
  Video, Stethoscope, Home as HomeIcon, Clock,
} from "lucide-react";

export const Route = createFileRoute("/book/$doctorId")({
  component: BookingPage,
  loader: ({ params }) => {
    const doctor = doctors.find((d) => d.id === params.doctorId);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: () => ({ meta: [{ title: "تأكيد الحجز — صحة بلس" }] }),
  notFoundComponent: () => <div className="min-h-screen flex items-center justify-center">Doctor not found</div>,
  errorComponent: ({ error }) => <div className="min-h-screen flex items-center justify-center">{error.message}</div>,
});

function BookingPage() {
  const { doctor } = Route.useLoaderData();
  const { t } = useTranslation();
  const { lang, dir } = useLang();
  const navigate = useNavigate();
  const Chevron = dir === "rtl" ? ChevronRight : ChevronLeft;

  const name = lang === "ar" ? doctor.nameAr : doctor.nameEn;
  const specialty = lang === "ar" ? doctor.specialtyAr : doctor.specialtyEn;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [type, setType] = useState<"clinic" | "online" | "home">(doctor.consultationTypes[0]);
  const [payment, setPayment] = useState<"online" | "clinic">("clinic");
  const [done, setDone] = useState(false);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const fmt = (d: Date) =>
    d.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { weekday: "short", day: "numeric", month: "short" });

  const typeIcon = { clinic: Stethoscope, online: Video, home: HomeIcon };

  if (done) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md text-center bg-card rounded-3xl p-10 shadow-elevated border border-mint/40">
            <div className="mx-auto h-20 w-20 rounded-full bg-mint flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-mint-foreground" />
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold text-primary">{t("booking.success")}</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {lang === "ar"
                ? `تم تأكيد موعدك مع ${name} في ${fmt(days[date])} الساعة ${slot}.`
                : `Your appointment with ${name} is confirmed on ${fmt(days[date])} at ${slot}.`}
            </p>
            <div className="mt-8 flex gap-3 justify-center">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/patient">{t("nav.patient")}</Link>
              </Button>
              <Button asChild className="rounded-full bg-primary">
                <Link to="/">{t("nav.home")}</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface/30">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <button onClick={() => navigate({ to: "/doctors/$doctorId", params: { doctorId: doctor.id } })} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
            <Chevron className="h-4 w-4" /> {lang === "ar" ? "عودة لملف الطبيب" : "Back to doctor"}
          </button>

          {/* Stepper */}
          <div className="bg-card rounded-3xl p-3 shadow-soft border border-border/40 mb-6">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`px-4 py-3 rounded-2xl text-center text-xs font-semibold transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                >
                  {s}. {s === 1 ? (lang === "ar" ? "اختر الموعد" : "Pick a time") : s === 2 ? (lang === "ar" ? "بياناتك" : "Your info") : (lang === "ar" ? "الدفع" : "Payment")}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-6">
              {step === 1 && (
                <div className="bg-card rounded-3xl p-6 shadow-soft border border-border/40 space-y-6">
                  <div>
                    <h3 className="font-display font-semibold mb-3">{lang === "ar" ? "نوع الاستشارة" : "Consultation type"}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {doctor.consultationTypes.map((tp: "clinic" | "online" | "home") => {
                        const Icon = typeIcon[tp];
                        return (
                          <button
                            key={tp}
                            onClick={() => setType(tp)}
                            className={`p-3 rounded-2xl border text-xs font-medium transition-all ${type === tp ? "border-gold bg-gold/10" : "border-border bg-secondary/50"}`}
                          >
                            <Icon className="h-5 w-5 mx-auto mb-1.5" />
                            {t(`doctor.consultationTypes.${tp}`)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-semibold mb-3">{lang === "ar" ? "اختر التاريخ" : "Pick a date"}</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {days.map((d, i) => (
                        <button
                          key={i}
                          onClick={() => setDate(i)}
                          className={`p-2.5 rounded-2xl text-center transition-all ${date === i ? "bg-primary text-primary-foreground shadow-soft" : "bg-secondary/50 hover:bg-secondary"}`}
                        >
                          <div className="text-[10px] uppercase opacity-70">{d.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", { weekday: "short" })}</div>
                          <div className="text-base font-bold">{d.getDate()}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-semibold mb-3">{t("booking.selectTime")}</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeSlots.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSlot(s)}
                          className={`px-2 py-2.5 rounded-xl text-xs font-medium transition-all ${slot === s ? "bg-gold text-gold-foreground" : "bg-secondary/50 hover:bg-secondary"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    disabled={!slot}
                    onClick={() => setStep(2)}
                    className="w-full rounded-full bg-primary hover:bg-primary/90 h-12"
                  >
                    {lang === "ar" ? "متابعة" : "Continue"}
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-card rounded-3xl p-6 shadow-soft border border-border/40 space-y-4">
                  <h3 className="font-display font-semibold">{t("booking.patientInfo")}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label={t("booking.fullName")}><Input className="rounded-xl" /></Field>
                    <Field label={t("booking.phone")}><Input className="rounded-xl" placeholder="+966 5..." /></Field>
                    <div className="sm:col-span-2"><Field label={t("booking.email")}><Input type="email" className="rounded-xl" /></Field></div>
                    <div className="sm:col-span-2"><Field label={t("booking.notes")}><Textarea className="rounded-xl" rows={3} /></Field></div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full">{lang === "ar" ? "رجوع" : "Back"}</Button>
                    <Button onClick={() => setStep(3)} className="flex-1 rounded-full bg-primary">{lang === "ar" ? "متابعة" : "Continue"}</Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    {t("booking.guest")} • <Link to="/login" className="text-primary underline">{t("nav.login")}</Link>
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="bg-card rounded-3xl p-6 shadow-soft border border-border/40 space-y-5">
                  <h3 className="font-display font-semibold">{t("booking.paymentMethod")}</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setPayment("clinic")}
                      className={`p-4 rounded-2xl border text-start transition-all ${payment === "clinic" ? "border-gold bg-gold/10" : "border-border bg-secondary/30"}`}
                    >
                      <Building2 className="h-6 w-6 text-gold mb-2" />
                      <div className="font-semibold text-sm">{t("booking.payAtClinic")}</div>
                      <div className="text-xs text-muted-foreground mt-1">{lang === "ar" ? "ادفع نقداً أو بالبطاقة" : "Cash or card at the clinic"}</div>
                    </button>
                    <button
                      onClick={() => setPayment("online")}
                      className={`p-4 rounded-2xl border text-start transition-all ${payment === "online" ? "border-gold bg-gold/10" : "border-border bg-secondary/30"}`}
                    >
                      <CreditCard className="h-6 w-6 text-gold mb-2" />
                      <div className="font-semibold text-sm">{t("booking.payOnline")}</div>
                      <div className="text-xs text-muted-foreground mt-1">{lang === "ar" ? "Apple Pay، مدى، فيزا" : "Apple Pay, Mada, Visa"}</div>
                    </button>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-full">{lang === "ar" ? "رجوع" : "Back"}</Button>
                    <Button onClick={() => setDone(true)} className="flex-1 rounded-full bg-primary h-12">{t("booking.confirm")}</Button>
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <aside>
              <div className="bg-card rounded-3xl p-5 shadow-soft border border-border/40 lg:sticky lg:top-24">
                <div className="flex items-center gap-3">
                  <img src={doctor.avatar} alt={name} className="h-14 w-14 rounded-2xl object-cover" />
                  <div>
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs text-gold">{specialty}</div>
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  <Row label={lang === "ar" ? "النوع" : "Type"} value={t(`doctor.consultationTypes.${type}`)} icon={Stethoscope} />
                  <Row label={lang === "ar" ? "التاريخ" : "Date"} value={fmt(days[date])} icon={Calendar} />
                  <Row label={lang === "ar" ? "الوقت" : "Time"} value={slot ?? "—"} icon={Clock} />
                </div>
                <div className="mt-5 pt-5 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{lang === "ar" ? "الإجمالي" : "Total"}</span>
                  <span className="font-display text-2xl font-bold text-primary">{doctor.fee} <span className="text-sm font-normal text-muted-foreground">{t("doctor.currency")}</span></span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs font-medium mb-1.5">{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" /> {label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
