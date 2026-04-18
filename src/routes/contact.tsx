import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "اتصل بنا — صحة بلس" }] }),
});

function ContactPage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-surface/30 py-16">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary">
              {lang === "ar" ? "تواصل معنا" : "Get in touch"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {lang === "ar" ? "نحن هنا لخدمتك على مدار الساعة. تواصل معنا بأي طريقة تفضلها." : "We're here for you 24/7. Reach us in the way you prefer."}
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Phone, label: lang === "ar" ? "الهاتف" : "Phone", value: "800 123 4567" },
                { icon: Mail, label: lang === "ar" ? "البريد" : "Email", value: "hello@sehhaplus.com" },
                { icon: MessageCircle, label: "WhatsApp", value: "+966 50 000 0000" },
                { icon: MapPin, label: lang === "ar" ? "العنوان" : "Address", value: lang === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/40 shadow-soft">
                  <div className="h-11 w-11 rounded-xl bg-gold/15 flex items-center justify-center">
                    <c.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{c.label}</div>
                    <div className="font-semibold">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="bg-card rounded-3xl p-7 shadow-elevated border border-border/40 space-y-4">
            <div><Label className="text-xs">{t("auth.name")}</Label><Input className="rounded-xl mt-1.5" /></div>
            <div><Label className="text-xs">{t("auth.email")}</Label><Input type="email" className="rounded-xl mt-1.5" /></div>
            <div><Label className="text-xs">{lang === "ar" ? "الموضوع" : "Subject"}</Label><Input className="rounded-xl mt-1.5" /></div>
            <div><Label className="text-xs">{lang === "ar" ? "رسالتك" : "Your message"}</Label><Textarea rows={5} className="rounded-xl mt-1.5" /></div>
            <Button className="w-full rounded-full bg-primary h-11">{lang === "ar" ? "إرسال الرسالة" : "Send message"}</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
