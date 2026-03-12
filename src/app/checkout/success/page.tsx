"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { useCartStore } from "@/store/cartStore";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get("transactionId");
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { lang } = useLangStore();
  const t = dict[lang]?.thankYou || dict.en.thankYou;
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (transactionId) {
      verifyPayment();
    } else {
      setError("No transaction ID found");
      setVerifying(false);
    }
  }, [transactionId]);

  const verifyPayment = async () => {
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId }),
      });
      const data = await res.json();
      
      if (data.success) {
        clearCart();
        setVerifying(false);
      } else {
        setError(data.message || "Verification failed");
        setVerifying(false);
      }
    } catch (err) {
      setError("Something went wrong");
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-800">Verifying your payment...</h2>
        <p className="text-slate-500 mt-2">Please do not close this window.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Verification Error</h2>
        <p className="text-slate-500 mt-2">{error}</p>
        <Link href="/checkout" className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{t.title}</h1>
          <p className="text-slate-500 mt-4 text-lg">{t.subtitle}</p>

          <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 inline-block">
            <span className="text-sm font-medium text-slate-400 block mb-1">Transaction ID</span>
            <span className="text-xl font-mono font-bold text-slate-800 tracking-wider ">{transactionId}</span>
          </div>

          <p className="text-slate-600 mt-8 max-w-sm mx-auto">{t.checkEmail}</p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/dashboard" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
              {t.goDashboard}
            </Link>
            <Link href="/" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">
              {t.backHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
