import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Star, MapPin, CheckCircle2, Clock, Video, Home as HomeIcon, Stethoscope } from "lucide-react";
import type { Doctor } from "@/lib/data";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { t } = useTranslation();
  const { lang } = useLang();
  const name = lang === "ar" ? doctor.nameAr : doctor.nameEn;
  const specialty = lang === "ar" ? doctor.specialtyAr : doctor.specialtyEn;
  const hospital = lang === "ar" ? doctor.hospitalAr : doctor.hospitalEn;
  const city = lang === "ar" ? doctor.cityAr : doctor.cityEn;
  const area = lang === "ar" ? doctor.areaAr : doctor.areaEn;

  const typeIcon = { clinic: Stethoscope, online: Video, home: HomeIcon };

  return (
    <article className="group relative bg-card rounded-3xl p-5 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/40 hover:border-gold/40 hover:-translate-y-1">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-br from-gold/30 to-mint/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
          <img
            src={doctor.avatar}
            alt={name}
            loading="lazy"
            className="relative h-20 w-20 rounded-2xl object-cover"
          />
          {doctor.verified && (
            <div className="absolute -bottom-1.5 -end-1.5 h-6 w-6 rounded-full bg-mint flex items-center justify-center ring-2 ring-card">
              <CheckCircle2 className="h-4 w-4 text-mint-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <Link to="/doctors/$doctorId" params={{ doctorId: doctor.id }} className="block">
            <h3 className="font-display font-semibold text-base text-foreground truncate group-hover:text-primary">
              {name}
            </h3>
          </Link>
          <p className="text-sm text-gold font-medium">{specialty}</p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{hospital}</p>

          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span className="font-semibold text-foreground">{doctor.rating}</span>
              <span>({doctor.reviews})</span>
            </span>
            <span>•</span>
            <span>{doctor.experience} {t("doctor.years")}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1 min-w-0">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{area}, {city}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {doctor.consultationTypes.map((type) => {
            const Icon = typeIcon[type];
            return (
              <div
                key={type}
                className="h-6 w-6 rounded-full bg-accent flex items-center justify-center"
                title={t(`doctor.consultationTypes.${type}`)}
              >
                <Icon className="h-3 w-3 text-primary" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("doctor.from")}</div>
          <div className="font-display text-xl font-bold text-primary">
            {doctor.fee} <span className="text-xs font-normal text-muted-foreground">{t("doctor.currency")}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-mint-foreground mt-0.5">
            <Clock className="h-3 w-3" />
            {doctor.nextSlot}
          </div>
        </div>
        <Link
          to="/book/$doctorId"
          params={{ doctorId: doctor.id }}
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 shadow-soft transition-all hover:shadow-glow"
        >
          {t("doctor.bookNow")}
        </Link>
      </div>
    </article>
  );
}
