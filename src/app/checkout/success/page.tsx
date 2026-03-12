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
  const transactionId = searchParams.get("transactionId") || searchParams.get("transaction_id");
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  
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
        setOrder(data.order);
        clearCart();
        setVerifying(false);
      } else {
        setError(data.message || "Verification failed");
        setVerifying(false);
      }
    } catch (err) {
      setError("Something went wrong during verification");
      setVerifying(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (verifying) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-800">Verifying your payment...</h2>
        <p className="text-slate-500 mt-2">Please do not close this window. We are confirming your transaction.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Verification Error</h2>
        <p className="text-red-500 mt-2 font-medium">{error}</p>
        <p className="text-slate-500 text-sm mt-4 max-w-md">If you believe this is a mistake, please contact our support with your Transaction ID: <span className="font-mono font-bold">{transactionId}</span></p>
        <Link href="/checkout" className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10 print:hidden">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-sm">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t.subtitle} {t.checkEmail}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Receipt Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Receipt */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:shadow-none print:border-none">
              <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                <h2 className="text-white font-bold text-lg">Order Receipt</h2>
                <span className="text-slate-400 text-sm font-mono">{order?.id}</span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start border-b border-slate-100 pb-6 mb-6">
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Payment Method</p>
                    <p className="text-slate-700 font-bold">{order?.paymentMethod || 'Credit/Debit Card'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Date</p>
                    <p className="text-slate-700 font-bold">{order ? new Date(order.createdAt).toLocaleDateString() : '-'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Items Purchased
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-4 divide-y divide-slate-200">
                    {order?.items?.map((item: any) => (
                      <div key={item.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 p-1 flex-shrink-0">
                            <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover rounded" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{item.product.title}</p>
                            <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-mono font-bold text-slate-900">৳{Number(item.subtotal).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>৳{Number(order?.totalAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-black text-slate-900 pt-2 border-t border-slate-100 mt-2">
                    <span>Total Paid</span>
                    <span className="text-blue-600">৳{Number(order?.totalAmount).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 text-center print:hidden">
                    <p className="text-xs text-blue-600 uppercase tracking-widest font-bold mb-1">Transaction ID</p>
                    <p className="text-lg font-mono font-black text-blue-900">{transactionId}</p>
                </div>
              </div>
            </div>

            {/* Digital Access Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 print:hidden">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Instant Digital Access
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {order?.items?.map((item: any) => (
                  <div key={`access-${item.id}`} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                    <div>
                      <p className="font-bold text-slate-800">{item.product.title}</p>
                      <p className="text-sm text-slate-500">Digital Deliverable</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex gap-2">
                      {item.product.downloadUrl ? (
                        <a 
                          href={item.product.downloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md active:scale-95"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Now
                        </a>
                      ) : (
                        <div className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium">
                           {item.product.deliverableContent || "Dashboard Access Enabled"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-500 bg-slate-100 p-3 rounded-lg text-center font-medium">
                These products are also permanently added to your <Link href="/dashboard" className="text-blue-600 underline">Dashboard</Link>.
              </p>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6 print:hidden">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all border border-slate-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                   Download Receipt
                </button>
                
                <Link 
                  href="/dashboard"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {t.goDashboard}
                </Link>

                <Link 
                  href="/"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all border border-slate-200"
                >
                   {t.backHome}
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                <p className="text-blue-100 text-sm mb-4">If you have any issues with your purchase or download, our support team is ready to help.</p>
                <a href="mailto:support@accessnest.tech" className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-all backdrop-blur-sm">
                  Contact Support
                </a>
              </div>
              <svg className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
              </svg>
            </div>
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
