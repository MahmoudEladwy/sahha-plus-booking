import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useLang } from "@/lib/language-context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/data";
import { HelpCircle } from "lucide-react";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({ meta: [{ title: "الأسئلة الشائعة — صحة بلس" }] }),
});

function FaqPage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-hero py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <HelpCircle className="h-10 w-10 text-gold mx-auto" />
            <h1 className="mt-4 font-display text-3xl lg:text-5xl font-bold text-primary">{t("sections.faq.title")}</h1>
            <p className="mt-3 text-muted-foreground">{lang === "ar" ? "كل ما تحتاج معرفته عن صحة بلس" : "Everything you need to know about Sehha Plus"}</p>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-2xl border border-border/40 px-5 shadow-soft data-[state=open]:border-gold/40">
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
      </main>
      <Footer />
    </div>
  );
}
