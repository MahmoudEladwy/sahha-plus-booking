import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DoctorCard } from "@/components/site/DoctorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, MapPin, Star, ShieldCheck, Calendar, Heart, ArrowLeft, ArrowRight,
  Smartphone, Apple, Sparkles, Quote, ChevronRight, ChevronLeft,
} from "lucide-react";
import { specialties, doctors, testimonials, insuranceLogos, faqItems } from "@/lib/data";
import { useState } from "react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/hero-doctor.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "صحة بلس — احجز موعدك مع أفضل الأطباء في الخليج" },
      { name: "description", content: "منصة صحة بلس: احجز موعدك مع أكثر من 12,000 طبيب موثق في دول الخليج. حجز فوري، تجربة فاخرة، دفع آمن." },
      { property: "og:title", content: "صحة بلس — صحتك أولويتنا" },
      { property: "og:description", content: "أكبر منصة طبية رقمية في الخليج. احجز في ثوانٍ." },
    ],
  }),
});

function HomePage() {
  const { t } = useTranslation();
  const { lang, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Specialties />
        <FeaturedDoctors />
        <HowItWorks />
        <Testimonials />
        <InsurancePartners />
        <AppSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");

  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      <div className="absolute top-20 end-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 start-0 w-96 h-96 bg-mint/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-xs font-medium text-gold-foreground">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              {t("hero.eyebrow")}
            </div>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-primary tracking-tight">
              {t("hero.title1")}{" "}
              <span className="text-gradient-gold italic">{t("hero.title2")}</span>{" "}
              {t("hero.title3")}
            </h1>

            <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 bg-surface-elevated rounded-3xl p-3 shadow-elevated border border-border/50">
              <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2">
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-secondary/50">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    placeholder={t("hero.searchSpecialty")}
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-auto"
                  />
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-secondary/50">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    placeholder={t("hero.searchCity")}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-auto"
                  />
                </div>
                <Button asChild size="lg" className="rounded-2xl bg-primary hover:bg-primary/90 px-6 h-auto shadow-soft">
                  <Link to="/search">{t("hero.searchBtn")}</Link>
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center me-2">{lang === "ar" ? "بحث سريع:" : "Popular:"}</span>
              {specialties.slice(0, 5).map((s) => (
                <Link
                  key={s.id}
                  to="/search"
                  className="text-xs px-3 py-1.5 rounded-full bg-card hover:bg-accent border border-border/60 transition-colors"
                >
                  {lang === "ar" ? s.nameAr : s.nameEn}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div className="absolute -inset-6 bg-gradient-to-tr from-gold/20 via-transparent to-mint/20 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-elevated bg-surface">
                <img
                  src={heroImg}
                  alt="Sehha Plus"
                  width={1536}
                  height={1280}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -start-4 sm:-start-8 bg-card rounded-2xl p-4 shadow-elevated border border-border/50 animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-mint flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-mint-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{lang === "ar" ? "أطباء موثقون" : "Verified doctors"}</div>
                    <div className="text-xs text-muted-foreground">{lang === "ar" ? "100% معتمد" : "100% certified"}</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -end-4 sm:-end-8 bg-card rounded-2xl p-4 shadow-elevated border border-border/50 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gold/20 flex items-center justify-center">
                    <Star className="h-5 w-5 fill-gold text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">4.9 / 5</div>
                    <div className="text-xs text-muted-foreground">{lang === "ar" ? "أكثر من 50 ألف تقييم" : "50k+ reviews"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { t } = useTranslation();
  const stats = [
    { value: "12K+", label: t("hero.stats.doctors") },
    { value: "1M+", label: t("hero.stats.patients") },
    { value: "45+", label: t("hero.stats.cities") },
    { value: "4.9★", label: t("hero.stats.rating") },
  ];

  return (
    <section className="border-y border-border/50 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specialties() {
  const { t } = useTranslation();
  const { lang } = useLang();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("sections.specialties.title")} subtitle={t("sections.specialties.subtitle")} />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {specialties.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.id}
                to="/search"
                className="group relative bg-card rounded-3xl p-5 shadow-soft hover:shadow-elevated border border-border/40 hover:border-gold/40 transition-all hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: `${s.color}20` }}
                >
                  <Icon className="h-6 w-6" style={{ color: s.color }} />
                </div>
                <div className="font-semibold text-sm">{lang === "ar" ? s.nameAr : s.nameEn}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.count} {lang === "ar" ? "طبيب" : "doctors"}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedDoctors() {
  const { t } = useTranslation();
  const featured = doctors.slice(0, 6);

  return (
    <section className="py-20 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-12">
          <SectionHeader
            align="start"
            title={t("sections.featured.title")}
            subtitle={t("sections.featured.subtitle")}
          />
          <Link to="/search" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-gold-foreground">
            {t("common.viewAll")} <ChevronLeft className="h-4 w-4 rtl:hidden" /><ChevronRight className="h-4 w-4 ltr:hidden" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useTranslation();
  const { lang } = useLang();

  const steps = [
    {
      icon: Search,
      titleAr: "ابحث", titleEn: "Search",
      descAr: "ابحث عن الطبيب المناسب باستخدام التخصص أو المدينة أو الاسم",
      descEn: "Find the right doctor by specialty, city or name",
    },
    {
      icon: Calendar,
      titleAr: "احجز", titleEn: "Book",
      descAr: "اختر الموعد المناسب لك من المواعيد المتاحة فوراً",
      descEn: "Pick a time slot that fits your schedule, instantly",
    },
    {
      icon: Heart,
      titleAr: "احصل على الرعاية", titleEn: "Get cared for",
      descAr: "تواصل مع طبيبك في العيادة أو أونلاين أو في المنزل",
      descEn: "Connect with your doctor in clinic, online or at home",
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("sections.howItWorks.title")} subtitle={t("sections.howItWorks.subtitle")} />
        <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="relative bg-card rounded-3xl p-8 shadow-soft border border-border/40 text-center animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute -top-5 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 h-10 w-10 rounded-full bg-gradient-gold text-gold-foreground font-display font-bold text-sm flex items-center justify-center shadow-soft">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 mx-auto h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-primary">
                  {lang === "ar" ? s.titleAr : s.titleEn}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "ar" ? s.descAr : s.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useTranslation();
  const { lang } = useLang();

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("sections.testimonials.title")} subtitle={t("sections.testimonials.subtitle")} />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((tt, i) => (
            <div
              key={tt.id}
              className="bg-card rounded-3xl p-7 shadow-soft border border-border/40 relative animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Quote className="absolute top-6 end-6 h-8 w-8 text-gold/30" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                "{lang === "ar" ? tt.textAr : tt.textEn}"
              </p>
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  {(lang === "ar" ? tt.nameAr : tt.nameEn).charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{lang === "ar" ? tt.nameAr : tt.nameEn}</div>
                  <div className="text-xs text-muted-foreground">{lang === "ar" ? tt.cityAr : tt.cityEn}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsurancePartners() {
  const { t } = useTranslation();
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("sections.insurance.title")} subtitle={t("sections.insurance.subtitle")} />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {insuranceLogos.map((p) => (
            <div
              key={p.name}
              className="h-20 bg-card rounded-2xl border border-border/40 flex items-center justify-center px-4 hover:border-gold/40 transition-colors group"
            >
              <span
                className="font-display font-bold text-base opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ color: p.color }}
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppSection() {
  const { t } = useTranslation();
  const { lang } = useLang();
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-primary rounded-[2.5rem] overflow-hidden p-10 lg:p-16">
          <div className="absolute top-0 end-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 start-0 w-96 h-96 bg-mint/10 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-primary-foreground">
              <h2 className="font-display text-3xl lg:text-5xl font-bold leading-tight">
                {t("sections.app.title")}
              </h2>
              <p className="mt-4 text-base lg:text-lg opacity-80 max-w-md">
                {t("sections.app.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 transition-colors">
                  <Apple className="h-6 w-6 text-gold" />
                  <div className="text-start">
                    <div className="text-[10px] opacity-70">{lang === "ar" ? "حمّل من" : "Download on"}</div>
                    <div className="font-semibold text-sm">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 transition-colors">
                  <Smartphone className="h-6 w-6 text-gold" />
                  <div className="text-start">
                    <div className="text-[10px] opacity-70">{lang === "ar" ? "احصل عليه من" : "Get it on"}</div>
                    <div className="font-semibold text-sm">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-square max-w-md mx-auto bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-sm flex items-center justify-center">
                <Smartphone className="h-32 w-32 text-gold opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { t } = useTranslation();
  const { lang } = useLang();
  return (
    <section className="py-20 bg-surface/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t("sections.faq.title")} subtitle="" />
        <div className="mt-10">
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-2xl border border-border/40 px-5 shadow-soft data-[state=open]:border-gold/40"
              >
                <AccordionTrigger className="text-start font-semibold hover:no-underline py-5">
                  {lang === "ar" ? f.qAr : f.qEn}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {lang === "ar" ? f.aAr : f.aEn}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Sparkles className="h-8 w-8 text-gold mx-auto" />
        <h2 className="mt-4 font-display text-3xl lg:text-5xl font-bold text-primary">
          {t("sections.cta.title")}
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t("sections.cta.subtitle")}</p>
        <Button asChild size="lg" className="mt-8 rounded-full bg-primary hover:bg-primary/90 shadow-elevated px-8 h-12 text-base">
          <Link to="/search">{t("sections.cta.btn")}</Link>
        </Button>
      </div>
    </section>
  );
}

function SectionHeader({
  title, subtitle, align = "center",
}: { title: string; subtitle: string; align?: "center" | "start" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
