"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { useCartStore } from "@/store/cartStore";
import navLogo from "@/assets/navlogo.png";
import * as fp from "@/lib/fpixel";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get("transactionId") || searchParams.get("transaction_id");
  const orderId = searchParams.get("orderId");
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
  }, [transactionId, orderId]);

  const verifyPayment = async () => {
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, orderId }),
      });
      const data = await res.json();
      
      if (data.success) {
        setOrder(data.order);
        clearCart();
        
        // Track Client-side Purchase Event for deduplication
        fp.event("Purchase", {
          value: Number(data.order.totalAmount),
          currency: "BDT",
          content_ids: data.order.items?.map((i: any) => i.productId) || [],
          content_type: "product"
        }, { eventID: data.order.id });

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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white print:bg-white print:p-0">
      <div className="max-w-5xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12 print:hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full mb-8 shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">{t.title}</h1>
          <p className="mt-4 text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            {t.subtitle} {t.checkEmail}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Receipt Content */}
          <div className="lg:col-span-8 space-y-8 print:col-span-12">
            {/* Order Receipt */}
            {/* Professional Invoice */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden print:border-none print:shadow-none p-8 md:p-12 relative">
              {/* PAID Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none rotate-[-30deg]">
                <span className="text-7xl md:text-9xl font-black text-emerald-600 tracking-widest uppercase">PAID</span>
              </div>

              {/* Invoice Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-8 mb-8 relative z-10">
                <div className="mb-6 md:mb-0">
                  <Image src={navLogo} alt="Access Nest Logo" width={180} height={60} className="h-10 md:h-12 w-auto object-contain mb-4" priority />
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Access Nest</p>
                  <p className="text-xs md:text-sm text-slate-500 font-medium">Dhaka, Bangladesh</p>
                  <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">accessnestbd@gmail.com</p>
                </div>
                <div className="text-left md:text-right">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase mb-2">Invoice</h2>
                  <p className="text-slate-500 font-mono text-xs md:text-sm mb-1">Receipt No: <span className="font-bold text-slate-900">{order?.id || '-'}</span></p>
                  <p className="text-slate-500 font-mono text-xs md:text-sm mb-1">Transaction ID: <span className="font-bold text-slate-900">{transactionId || '-'}</span></p>
                  <p className="text-slate-500 text-xs md:text-sm mb-3">Date: <span className="font-bold text-slate-900">{order ? new Date(order.createdAt).toLocaleDateString() : '-'}</span></p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Payment Completed
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Billed To */}
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Billed To</p>
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    {order?.user ? (
                      <>
                        <p className="text-slate-900 font-bold text-base md:text-lg">{order.user.name || 'Valued Customer'}</p>
                        <p className="text-slate-500 text-sm mt-1">{order.user.email}</p>
                      </>
                    ) : (
                      <p className="text-slate-900 font-bold text-base md:text-lg">Valued Customer</p>
                    )}
                  </div>
                </div>
                
                {/* Payment Info Small */}
                <div className="md:text-right flex flex-col justify-end">
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3 md:hidden">Payment Details</p>
                   <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 md:bg-transparent md:border-none md:p-0">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 hidden md:block">Payment Details</p>
                      <div className="flex md:justify-end items-center gap-2 mb-1">
                        <span className="text-slate-500 text-sm">Method:</span>
                        <span className="text-slate-900 font-bold text-sm bg-white md:bg-slate-100 px-2 py-0.5 rounded border border-slate-100 md:border-none">{order?.paymentMethod || 'Credit/Debit Card'}</span>
                      </div>
                      <div className="flex md:justify-end items-center gap-2">
                        <span className="text-slate-500 text-sm">Status:</span>
                        <span className="text-emerald-600 font-bold text-sm">Paid in Full</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div className="mb-8 relative z-10">
                <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>
                
                <div className="space-y-4 sm:space-y-0">
                  {order?.items?.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-4 border-b border-slate-100 last:border-0 sm:items-center">
                      <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-lg border border-slate-100 p-1 flex-shrink-0 overflow-hidden hidden sm:block">
                          <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{item.product.title}</p>
                          <p className="text-[10px] md:text-[11px] text-slate-400 mt-0.5">Category: {item.product.category || 'Digital Product'}</p>
                        </div>
                      </div>
                      <div className="col-span-1 sm:col-span-2 flex justify-between sm:block text-left sm:text-center text-slate-600 text-sm font-medium">
                        <span className="sm:hidden text-slate-400 text-xs">Qty:</span>
                        <span>{item.quantity}</span>
                      </div>
                      <div className="col-span-1 sm:col-span-2 flex justify-between sm:block text-left sm:text-right text-slate-600 text-sm font-medium">
                        <span className="sm:hidden text-slate-400 text-xs">Unit Price:</span>
                        <span>৳{Number(item.subtotal/item.quantity).toLocaleString()}</span>
                      </div>
                      <div className="col-span-1 sm:col-span-2 flex justify-between sm:block text-left sm:text-right font-black text-slate-900 text-sm bg-slate-50 sm:bg-transparent p-2 rounded-lg sm:p-0">
                        <span className="sm:hidden text-slate-500 font-bold text-xs uppercase">Total:</span>
                        <span>৳{Number(item.subtotal).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice Footer / Total */}
              <div className="flex flex-col sm:flex-row justify-end items-end sm:items-start pt-6 border-t border-slate-200 relative z-10">
                <div className="w-full sm:w-72 space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-slate-500 text-sm font-medium">
                    <span>Subtotal</span>
                    <span>৳{Number(order?.totalAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end pt-3 mt-3 border-t border-slate-200">
                    <span className="text-slate-900 font-bold uppercase tracking-widest text-[11px]">Total Paid Amount</span>
                    <span className="text-2xl font-black text-[#0f7af7] tracking-tighter">৳{Number(order?.totalAmount).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Access Section */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 print:hidden">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#0f7af7]" />
                Instant Digital Access
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {order?.items?.map((item: any) => (
                  <div key={`access-${item.id}`} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:border-[#0f7af7]/30 group">
                    <div>
                      <p className="font-black text-slate-900">{item.product.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Direct Download Available</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      {item.product.downloadUrl ? (
                        <a 
                          href={item.product.downloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
                        >
                          Download Now
                        </a>
                      ) : (
                        <div className="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-bold">
                           Check Dashboard
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[11px] text-slate-400 bg-slate-50/50 p-4 rounded-xl text-center font-bold border border-slate-100 uppercase tracking-widest">
                Assets added to <Link href="/dashboard" className="text-[#0f7af7] hover:underline">User Dashboard</Link> permanently.
              </p>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-6 print:hidden">

            {/* Review Reminder Banner */}
            <div className="bg-amber-50 rounded-3xl border border-amber-200/60 p-6 lg:p-8 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-amber-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <h3 className="text-sm font-black text-amber-900 uppercase tracking-widest">Share Your Thoughts</h3>
                </div>
                <p className="text-amber-800/80 text-xs font-medium leading-relaxed">
                  We'd love to hear your feedback! Once you've explored your new items, a quick review on the product page would mean the world to us.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-6 text-amber-500/10 transform rotate-12 transition-transform group-hover:-translate-y-2 group-hover:scale-110 duration-700 pointer-events-none">
                <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 lg:sticky lg:top-28 shadow-sm">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-white text-slate-900 rounded-xl font-bold text-sm tracking-tight hover:bg-slate-50 transition-all border border-slate-200 active:scale-[0.98]"
                >
                   Print Receipt
                </button>
                
                <Link 
                  href="/dashboard"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm tracking-tight hover:bg-slate-800 transition-all shadow-md active:scale-[0.98]"
                >
                  Dashboard
                </Link>

                <Link 
                  href="/"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-white text-slate-400 rounded-xl font-bold text-sm tracking-tight hover:bg-slate-50 transition-all border border-slate-100 active:scale-[0.98]"
                >
                   {t.backHome}
                </Link>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-50">
                <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative group cursor-pointer shadow-lg shadow-slate-900/10">
                   <div className="relative z-10">
                    <h4 className="font-bold text-sm mb-1">Need Help?</h4>
                    <p className="text-slate-400 text-[10px] mb-4 font-medium">Our support team is active 24/7 for your digital needs.</p>
                    <a href="mailto:accessnestbd@gmail.com" className="inline-block px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold transition-all backdrop-blur-sm border border-white/5 uppercase tracking-widest">
                      Contact Support
                    </a>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full transition-transform group-hover:scale-125 duration-700" />
                </div>
              </div>
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
