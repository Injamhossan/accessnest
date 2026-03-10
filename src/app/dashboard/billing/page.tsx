"use client";

import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { CreditCard } from "lucide-react";

export default function BillingPage() {
  const { lang } = useLangStore();
  const t = dict[lang].dashboardLayout;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">{t.billing}</h1>
        <p className="text-slate-500 mt-2">Manage your billing information and payment methods.</p>
      </header>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" /> Payment Methods
        </h2>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 border-dashed text-center text-slate-500">
          <p>No payment methods on file.</p>
          <button className="mt-4 text-blue-600 font-bold hover:underline">Add New Card</button>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Invoices & Receipts</h2>
        <div className="text-sm text-slate-500 p-4 text-center">
          You have no past invoices.
        </div>
      </div>
    </div>
  );
}
