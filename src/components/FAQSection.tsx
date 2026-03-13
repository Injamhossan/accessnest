"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useLangStore();
  const t = dict[lang].faq;

  const faqs = [
    {
      question: t.q1,
      answer: t.a1
    },
    {
      question: t.q2,
      answer: t.a2
    },
    {
      question: t.q3,
      answer: t.a3
    },
    {
      question: t.q4,
      answer: t.a4
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-sky-100/50 blur-3xl mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl mix-blend-multiply pointer-events-none"></div>

      <div className="mx-auto w-full max-w-4xl px-4 relative z-10">
        <header className="mb-14 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-white shadow-sm border border-slate-200 mb-6">
            <MessageCircleQuestion className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 md:text-5xl tracking-tight mb-4">
            {t.title1} <span className="text-blue-600">{t.title2}</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto md:text-lg">
            {t.desc}
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`group rounded-lg border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "border-blue-200 bg-white" 
                    : "border-slate-200 bg-white/60 hover:bg-white hover:shadow-sm"
                }`}
              >
                <button 
                  onClick={() => toggleFAQ(idx)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none"
                >
                  <h3 className={`text-lg font-semibold transition-colors ${
                    isOpen ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                  }`}>
                    {faq.question}
                  </h3>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors shrink-0 ${
                    isOpen 
                      ? "bg-blue-600 text-white" 
                      : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                  }`}>
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-600 leading-relaxed md:pr-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
