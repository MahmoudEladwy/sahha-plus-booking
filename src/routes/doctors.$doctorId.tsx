import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { doctors } from "@/lib/data";
import {
  Star, MapPin, CheckCircle2, Clock, Video, Home as HomeIcon, Stethoscope,
  Languages, Shield, Calendar, Award, Heart, Share2, Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/doctors/$doctorId")({
  component: DoctorPage,
  loader: ({ params }) => {
    const doctor = doctors.find((d) => d.id === params.doctorId);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.doctor.nameAr ?? ""} — صحة بلس` },
      { name: "description", content: loaderData?.doctor.bio.ar ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p>Doctor not found</p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center">
      <p>{error.message}</p>
    </div>
  ),
});

function DoctorPage() {
  const { doctor } = Route.useLoaderData();
  const { t } = useTranslation();
  const { lang } = useLang();

  const name = lang === "ar" ? doctor.nameAr : doctor.nameEn;
  const specialty = lang === "ar" ? doctor.specialtyAr : doctor.specialtyEn;
  const hospital = lang === "ar" ? doctor.hospitalAr : doctor.hospitalEn;
  const city = lang === "ar" ? doctor.cityAr : doctor.cityEn;
  const area = lang === "ar" ? doctor.areaAr : doctor.areaEn;
  const bio = lang === "ar" ? doctor.bio.ar : doctor.bio.en;

  const typeIcon = { clinic: Stethoscope, online: Video, home: HomeIcon };

  const fakeReviews = [
    { name: lang === "ar" ? "نوال السبيعي" : "Nawal Al-Subaie", rating: 5, text: lang === "ar" ? "طبيبة رائعة، استمعت لمشكلتي وقدمت لي الحل المناسب." : "Wonderful doctor, listened carefully and gave the right solution.", date: lang === "ar" ? "قبل أسبوع" : "1 week ago" },
    { name: lang === "ar" ? "محمد القحطاني" : "Mohammed Al-Qahtani", rating: 5, text: lang === "ar" ? "خدمة احترافية وعيادة نظيفة. أنصح بها بشدة." : "Professional service and a clean clinic. Highly recommend.", date: lang === "ar" ? "قبل شهر" : "1 month ago" },
    { name: lang === "ar" ? "ريم العتيبي" : "Reem Al-Otaibi", rating: 4, text: lang === "ar" ? "تجربة جيدة، الانتظار كان قليلاً طويلاً." : "Good experience, the wait was a little long.", date: lang === "ar" ? "قبل شهرين" : "2 months ago" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative shrink-0">
                <div className="absolute -inset-3 bg-gradient-to-br from-gold/30 to-mint/20 rounded-[2rem] blur-xl" />
                <img src={doctor.avatar} alt={name} className="relative h-40 w-40 lg:h-48 lg:w-48 rounded-3xl object-cover shadow-elevated" />
                {doctor.verified && (
                  <div className="absolute -bottom-2 -end-2 px-3 py-1.5 bg-mint rounded-full flex items-center gap-1.5 shadow-soft">
                    <CheckCircle2 className="h-4 w-4 text-mint-foreground" />
                    <span className="text-xs font-semibold text-mint-foreground">{t("doctor.verified")}</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary">{name}</h1>
                    <p className="mt-1 text-gold font-medium text-lg">{specialty}</p>
                    <p className="text-muted-foreground text-sm">{hospital}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="h-10 w-10 rounded-full bg-card border border-border/40 hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="h-10 w-10 rounded-full bg-card border border-border/40 hover:border-gold flex items-center justify-center text-muted-foreground hover:text-gold transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="font-semibold">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.reviews} {t("doctor.reviews")})</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Award className="h-4 w-4 text-gold" />
                    {doctor.experience} {t("doctor.years")}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-gold" />
                    {area}, {city}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {doctor.consultationTypes.map((type) => {
                    const Icon = typeIcon[type];
                    return (
                      <div key={type} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border/40 text-xs font-medium">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                        {t(`doctor.consultationTypes.${type}`)}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-card border border-gold/30 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">{t("doctor.from")}</div>
                    <div className="font-display text-3xl font-bold text-primary">
                      {doctor.fee} <span className="text-base font-normal text-muted-foreground">{t("doctor.currency")}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-mint-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      {t("doctor.nextAvailable")}: {doctor.nextSlot}
                    </div>
                  </div>
                  <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 px-8 shadow-soft">
                    <Link to="/book/$doctorId" params={{ doctorId: doctor.id }}>
                      <Calendar className="h-4 w-4 me-2" />
                      {t("doctor.bookNow")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card title={t("doctor.about")}>
                <p className="text-muted-foreground leading-relaxed">{bio}</p>
              </Card>

              <Card title={t("doctor.languages") + " & " + t("doctor.insurance")}>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Languages className="h-3.5 w-3.5" /> {t("doctor.languages")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((l) => (
                        <span key={l} className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium">{l}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5" /> {t("doctor.insurance")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.insurances.map((l) => (
                        <span key={l} className="px-3 py-1.5 rounded-full bg-mint/30 text-mint-foreground text-xs font-medium">{l}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card title={t("doctor.location")}>
                <div className="space-y-3">
                  {doctor.branches.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-secondary/50">
                      <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-sm">{b.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{b.address}</div>
                      </div>
                    </div>
                  ))}
                  <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-mint/30 via-secondary to-gold/10 flex items-center justify-center text-muted-foreground text-sm">
                    {lang === "ar" ? "خريطة الموقع" : "Map preview"}
                  </div>
                </div>
              </Card>

              <Card title={t("doctor.reviews")}>
                <div className="space-y-4">
                  {fakeReviews.map((r, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-secondary/50 relative">
                      <Quote className="absolute top-3 end-3 h-5 w-5 text-gold/30" />
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{r.name}</div>
                            <div className="text-xs text-muted-foreground">{r.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-gold text-gold" : "text-muted"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-foreground">{r.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <aside className="space-y-6">
              <Card title={t("doctor.availability")}>
                <div className="grid grid-cols-3 gap-2">
                  {["9:00", "9:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30"].map((slot) => (
                    <button
                      key={slot}
                      className="px-2 py-2 rounded-xl bg-secondary/50 text-xs font-medium hover:bg-gold hover:text-gold-foreground transition-colors"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <Button asChild className="w-full mt-4 rounded-full bg-primary hover:bg-primary/90">
                  <Link to="/book/$doctorId" params={{ doctorId: doctor.id }}>{t("doctor.bookNow")}</Link>
                </Button>
              </Card>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-3xl p-6 lg:p-7 shadow-soft border border-border/40">
      <h2 className="font-display text-xl font-semibold text-primary mb-4">{title}</h2>
      {children}
    </div>
  );
}
