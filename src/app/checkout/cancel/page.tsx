"use client";

import Link from "next/link";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function CancelPage() {
  const { lang } = useLangStore();
  const t = dict[lang]?.checkout || dict.en.checkout;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900">Payment Cancelled</h1>
          <p className="text-slate-500 mt-4 leading-relaxed">
            Your payment process was cancelled. No money was deducted from your account.
          </p>

          <div className="mt-10 space-y-3">
            <Link
              href="/checkout"
              className="block w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
            >
              Try Again
            </Link>
            <Link
              href="/cart"
              className="block w-full px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
