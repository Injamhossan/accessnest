"use client";

import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const { lang } = useLangStore();
  const t = dict[lang].dashboardLayout;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">{t.orders}</h1>
        <p className="text-slate-500 mt-2">View and manage your recent purchases and active access.</p>
      </header>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-12 text-center text-slate-500 flex flex-col items-center">
          <Package className="w-16 h-16 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">No Orders Found</h3>
          <p className="max-w-sm mx-auto">You haven't purchased any digital items or subscriptions yet.</p>
        </div>
      </div>
    </div>
  );
}
