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
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-2xl w-full">
        <div
          className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 md:p-12 text-center transition-all duration-500 opacity-100 translate-y-0"
        >
          <div
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"
          >
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
            {t.title}
          </h1>
          <p className="text-slate-500 mt-4 text-lg">
            {t.subtitle}
          </p>

          <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 inline-block">
            <span className="text-sm font-medium text-slate-400 block mb-1">{t.orderId}</span>
            <span className="text-xl font-mono font-bold text-slate-800 tracking-wider font-english">{orderId}</span>
          </div>

          <p className="text-slate-600 mt-8 max-w-sm mx-auto">
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
