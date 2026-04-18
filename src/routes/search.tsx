import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DoctorCard } from "@/components/site/DoctorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doctors, specialties, cities, insurances } from "@/lib/data";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({
    meta: [
      { title: "ابحث عن طبيب — صحة بلس" },
      { name: "description", content: "ابحث وفلتر بين آلاف الأطباء الموثقين في دول الخليج. حسب التخصص، المدينة، التأمين والمزيد." },
    ],
  }),
});

type SortKey = "rating" | "price" | "earliest" | "experience";

function SearchPage() {
  const { t } = useTranslation();
  const { lang } = useLang();

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [gender, setGender] = useState<"any" | "male" | "female">("any");
  const [type, setType] = useState<"any" | "clinic" | "online" | "home">("any");
  const [insurance, setInsurance] = useState("");
  const [sort, setSort] = useState<SortKey>("rating");
  const [maxPrice, setMaxPrice] = useState(800);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let r = doctors.filter((d) => {
      const name = lang === "ar" ? d.nameAr : d.nameEn;
      const sp = lang === "ar" ? d.specialtyAr : d.specialtyEn;
      const ct = lang === "ar" ? d.cityAr : d.cityEn;
      if (query && !name.toLowerCase().includes(query.toLowerCase()) && !sp.toLowerCase().includes(query.toLowerCase())) return false;
      if (city && !(d.cityAr === city || d.cityEn === city)) return false;
      if (specialty && d.specialtyId !== specialty) return false;
      if (gender !== "any" && d.gender !== gender) return false;
      if (type !== "any" && !d.consultationTypes.includes(type)) return false;
      if (insurance && !d.insurances.includes(insurance)) return false;
      if (d.fee > maxPrice) return false;
      return true;
    });

    r = [...r].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price") return a.fee - b.fee;
      if (sort === "experience") return b.experience - a.experience;
      return 0;
    });
    return r;
  }, [query, city, specialty, gender, type, insurance, sort, maxPrice, lang]);

  const clearAll = () => {
    setQuery(""); setCity(""); setSpecialty(""); setGender("any");
    setType("any"); setInsurance(""); setMaxPrice(800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-surface/30">
        {/* Search bar */}
        <div className="bg-card border-b border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-secondary/50">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <Input
                  placeholder={t("hero.searchSpecialty")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-auto"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-secondary/50">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-sm"
                >
                  <option value="">{t("hero.searchCity")}</option>
                  {cities.map((c) => (
                    <option key={c.en} value={lang === "ar" ? c.ar : c.en}>
                      {lang === "ar" ? c.ar : c.en}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowFilters((v) => !v)}
                className="rounded-2xl lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 me-2" />
                {t("filters.title")}
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Filters */}
            <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="bg-card rounded-3xl p-5 shadow-soft border border-border/40 lg:sticky lg:top-24 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-primary">{t("filters.title")}</h3>
                  <button onClick={clearAll} className="text-xs text-gold-foreground hover:underline">
                    {t("filters.clear")}
                  </button>
                </div>

                <FilterGroup label={t("filters.specialty")}>
                  <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-secondary/50 text-sm outline-none border border-transparent focus:border-gold/40">
                    <option value="">{t("filters.any")}</option>
                    {specialties.map((s) => (
                      <option key={s.id} value={s.id}>{lang === "ar" ? s.nameAr : s.nameEn}</option>
                    ))}
                  </select>
                </FilterGroup>

                <FilterGroup label={t("filters.gender")}>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["any", "male", "female"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`px-2 py-2 rounded-xl text-xs font-medium transition-colors ${gender === g ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-secondary"}`}
                      >
                        {t(`filters.${g}`)}
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup label={t("filters.consultationType")}>
                  <div className="space-y-1.5">
                    {(["any", "clinic", "online", "home"] as const).map((tp) => (
                      <button
                        key={tp}
                        onClick={() => setType(tp)}
                        className={`w-full text-start px-3 py-2 rounded-xl text-xs font-medium transition-colors ${type === tp ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-secondary"}`}
                      >
                        {tp === "any" ? t("filters.any") : t(`doctor.consultationTypes.${tp}`)}
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup label={t("filters.insurance")}>
                  <select value={insurance} onChange={(e) => setInsurance(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-secondary/50 text-sm outline-none border border-transparent focus:border-gold/40">
                    <option value="">{t("filters.any")}</option>
                    {insurances.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label={`${t("filters.priceRange")} — ${maxPrice} ${t("doctor.currency")}`}>
                  <input
                    type="range"
                    min={100}
                    max={1000}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-gold"
                  />
                </FilterGroup>
              </div>
            </aside>

            {/* Results */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-muted-foreground">
                  {results.length} {lang === "ar" ? "نتيجة" : "results"}
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="px-3 py-2 rounded-full bg-card border border-border/40 text-xs font-medium outline-none focus:border-gold/40"
                >
                  <option value="rating">{t("filters.sort.rating")}</option>
                  <option value="price">{t("filters.sort.price")}</option>
                  <option value="earliest">{t("filters.sort.earliest")}</option>
                  <option value="experience">{t("filters.sort.experience")}</option>
                </select>
              </div>

              {results.length === 0 ? (
                <div className="bg-card rounded-3xl p-12 text-center border border-border/40">
                  <X className="h-10 w-10 text-muted-foreground mx-auto opacity-50" />
                  <p className="mt-3 text-muted-foreground">{lang === "ar" ? "لا توجد نتائج تطابق بحثك" : "No results match your search"}</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  {results.map((d) => <DoctorCard key={d.id} doctor={d} />)}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      {children}
    </div>
  );
}
