"use client";

import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import Link from "next/link";

export default function ThankYouPage() {
  const { lang } = useLangStore();
  const t = dict[lang]?.thankYou || dict.en.thankYou;

  // Generate a random order ID for display purposes
  const orderId = "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-white">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-3xl border border-slate-100 p-10 md:p-16 text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
          
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-slate-500 mt-4 text-base font-medium max-w-sm mx-auto">
            {t.subtitle}
          </p>

          <div className="mt-10 py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100 inline-flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#0f7af7] uppercase tracking-[0.2em] mb-1">{t.orderId}</span>
            <span className="text-lg font-black text-slate-900 font-mono italic tracking-widest">{orderId}</span>
          </div>

          <p className="text-slate-400 mt-10 text-sm font-medium leading-relaxed">
            {t.checkEmail}
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/dashboard"
              className="flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
            >
              {t.goDashboard}
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all"
            >
              {t.backHome}
            </Link>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100">
            <p className="text-slate-400 text-sm">
              {t.anyQuestions}{" "}
              <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
                {t.contactUs}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
