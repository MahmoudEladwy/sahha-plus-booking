import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20">
                <Heart className="h-5 w-5 fill-gold text-gold" />
              </div>
              <div>
                <div className="font-display text-xl font-bold">{t("brand.name")}</div>
                <div className="text-xs opacity-70">{t("brand.tagline")}</div>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-80 leading-relaxed max-w-md">
              {t("footer.about")}
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-gold hover:text-primary flex items-center justify-center transition-colors"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gold mb-4">{t("footer.forPatients")}</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li><Link to="/search" className="hover:text-gold">{t("nav.search")}</Link></li>
              <li><Link to="/login" className="hover:text-gold">{t("nav.patient")}</Link></li>
              <li><Link to="/faq" className="hover:text-gold">{t("nav.faq")}</Link></li>
              <li><Link to="/contact" className="hover:text-gold">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gold mb-4">{t("footer.forDoctors")}</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li><Link to="/for-doctors" className="hover:text-gold">{t("nav.forDoctors")}</Link></li>
              <li><Link to="/doctor" className="hover:text-gold">{t("nav.doctor")}</Link></li>
              <li><Link to="/admin" className="hover:text-gold">{t("nav.admin")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li><a href="#" className="hover:text-gold">{t("footer.terms")}</a></li>
              <li><a href="#" className="hover:text-gold">{t("footer.privacy")}</a></li>
              <li><a href="#" className="hover:text-gold">{t("footer.cookies")}</a></li>
            </ul>
            <div className="mt-6 space-y-2 text-xs opacity-80">
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold" /> 800 123 4567</div>
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" /> hello@sehhaplus.com</div>
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gold" /> Riyadh, KSA</div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs opacity-70">
          <div>© {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}.</div>
          <div>Made with <span className="text-gold">♥</span> in the Gulf</div>
        </div>
      </div>
    </footer>
  );
}
