"use client";

import Image from "next/image";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function AboutPage() {
  const { lang } = useLangStore();
  const t = dict[lang].about;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 px-4 mt-[-1px]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">{t.title}</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{t.why}</h2>
            <p className="mt-4 text-slate-600">{t.whyDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
              <div className="w-14 h-14 mx-auto bg-sky-50 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-7 h-7 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.box1Title}</h3>
              <p className="text-slate-600">{t.box1Desc}</p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
              <div className="w-14 h-14 mx-auto bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.box2Title}</h3>
              <p className="text-slate-600">{t.box2Desc}</p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
              <div className="w-14 h-14 mx-auto bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.box3Title}</h3>
              <p className="text-slate-600">{t.box3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
