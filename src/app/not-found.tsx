"use client";

import Link from "next/link";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function NotFound() {
  const { lang } = useLangStore();
  const t = dict[lang]?.notFound || dict.en.notFound;

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden min-h-[70vh]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        <div className="transition-all duration-700 ease-out transform opacity-100 scale-100">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-700 leading-none animate-pulse">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-800 mt-6 md:text-3xl">
            {t.title}
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed">
            {t.subtitle} <br />
            {t.desc}
          </p>
          
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-blue-600 text-white font-semibold transition-all hover:bg-blue-700 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0"
            >
              {t.goHome}
            </Link>
          </div>
        </div>
        
        {/* Animated elements */}
        <div className="mt-16 flex justify-center space-x-2 animate-bounce">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-blue-300" />
          ))}
        </div>
      </div>
    </div>
  );
}
