"use client";

import { useCartStore } from "@/store/cartStore";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Lock, ShieldCheck, ChevronRight } from "lucide-react";
import * as fp from "@/lib/fpixel";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { lang } = useLangStore();
  
  // Localized strings for Cart
  const cartT = {
    en: {
      title: "Shopping Cart",
      emptyTitle: "Your cart is feeling light",
      emptyDesc: "Discover premium digital assets to elevate your workflow and projects instantly.",
      summary: "Order Summary",
      subtotal: "Subtotal",
      checkout: "Secure Checkout",
      continue: "Continue Shopping",
      tax: "Tax",
      total: "Total Amount",
      guarantee: "14-Day Money Back Guarantee",
      shipping: "Instant Digital Delivery",
      secure: "Encrypted & Secure"
    },
    bn: {
      title: "শপিং কার্ট",
      emptyTitle: "আপনার কার্টটি বর্তমানে খালি",
      emptyDesc: "আপনার প্রজেক্টের জন্য সেরা ডিজিটাল অ্যাসেটগুলো এখনই খুঁজে নিন।",
      summary: "অর্ডার সারাংশ",
      subtotal: "উপমোট",
      checkout: "নিরাপদ চেকআউট",
      continue: "কেনাকাটা চালিয়ে যান",
      tax: "ট্যাক্স",
      total: "মোট পরিমাণ",
      guarantee: "১৪ দিনের মানি ব্যাক গ্যারান্টি",
      shipping: "ইনস্ট্যান্ট ডিজিটাল ডেলিভারি",
      secure: "সুরক্ষিত পেমেন্ট"
    }
  }[lang as 'en' | 'bn'] || {
    title: "Shopping Cart",
    emptyTitle: "Your cart is feeling light",
    emptyDesc: "Discover premium digital assets to elevate your workflow and projects instantly.",
    summary: "Order Summary",
    subtotal: "Subtotal",
    checkout: "Secure Checkout",
    continue: "Continue Shopping",
    tax: "Tax",
    total: "Total Amount",
    guarantee: "14-Day Money Back Guarantee",
    shipping: "Instant Digital Delivery",
    secure: "Encrypted & Secure"
  };

  const adminT = dict[lang]?.admin;

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-slate-50/50">
        <div className="relative mb-8">
          <div className="h-32 w-32 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-center relative z-10 border border-slate-100">
            <ShoppingBag className="h-14 w-14 text-[#0f7af7] opacity-20" />
            <div className="absolute -bottom-2 -right-2 bg-amber-400 h-8 w-8 rounded-full flex items-center justify-center border-4 border-white">
              <Plus className="h-4 w-4 text-white font-bold" />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400/10 blur-[60px] rounded-full -z-0"></div>
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-3 text-center">{cartT.emptyTitle}</h1>
        <p className="text-slate-500 font-medium mb-10 text-center max-w-sm leading-relaxed">
          {cartT.emptyDesc}
        </p>

        <Link 
          href="/products" 
          className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#0f7af7] text-white rounded-2xl font-black transition-all hover:bg-[#0863cb] shadow-[0_15px_30px_rgba(15,122,247,0.3)] hover:-translate-y-1 active:scale-95"
        >
          {cartT.continue}
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link href="/products" className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#0f7af7] transition-all">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {cartT.continue}
              </Link>
            </div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-4">
              {cartT.title}
              <span className="text-lg font-bold bg-[#0f7af7]/10 text-[#0f7af7] px-4 py-1.5 rounded-2xl border border-[#0f7af7]/10">
                {items.length} {lang === 'en' ? 'Items' : 'টি পণ্য'}
              </span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-5 md:p-6 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col sm:flex-row items-center gap-6 group transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
                  {/* Item Image */}
                  <div className="relative h-28 w-40 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  {/* Item Content */}
                  <div className="flex-1 min-w-0 text-center sm:text-left pt-2 pb-2">
                    <span className="text-[10px] font-black text-[#0f7af7] uppercase tracking-[0.2em] mb-2 block opacity-70">
                      {item.category ? ((adminT?.categories as any)?.[item.category] || item.category) : "Digital Asset"}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 truncate mb-1 pr-6">{item.title}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      <p className="text-2xl font-black text-[#0f7af7] force-english-font">৳{item.price}</p>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">One-time</span>
                    </div>
                  </div>

                  {/* Item Actions */}
                  <div className="flex flex-row items-center gap-6 sm:pl-6 sm:border-l border-slate-100">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 p-1.5 shadow-inner">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-slate-400 hover:bg-white hover:text-[#0f7af7] hover:shadow-sm rounded-xl transition-all active:scale-90"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-black text-slate-900 force-english-font text-lg">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-slate-400 hover:bg-white hover:text-[#0f7af7] hover:shadow-sm rounded-xl transition-all active:scale-90"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group/trash"
                    >
                      <Trash2 className="h-6 w-6 group-hover/trash:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
              {[
                { icon: ShieldCheck, title: cartT.guarantee, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { icon: Lock, title: cartT.secure, color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: ShoppingBag, title: cartT.shipping, color: 'text-amber-500', bg: 'bg-amber-50' }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-slate-100/50 shadow-sm">
                  <div className={`h-12 w-12 rounded-2xl ${benefit.bg} flex items-center justify-center shrink-0`}>
                    <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 leading-snug">{benefit.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white p-8 rounded-[3rem] border border-white shadow-[0_30px_70px_rgba(0,0,0,0.06)] relative overflow-hidden">
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f7af7]/5 blur-[40px] -z-0"></div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-[#0f7af7]" />
                {cartT.summary}
              </h2>
              
              <div className="space-y-5 mb-8 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">{cartT.subtotal}</span>
                  <span className="text-slate-900 font-black force-english-font text-lg">৳{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold">{cartT.tax} (0%)</span>
                  <span className="text-slate-900 font-black">৳0</span>
                </div>
                <div className="h-px bg-slate-100 w-full my-2"></div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xl font-black text-slate-900">{cartT.total}</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-[#0f7af7] force-english-font">৳{getTotalPrice()}</span>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">all taxes included</p>
                  </div>
                </div>
              </div>

              <Link 
                href="/checkout"
                onClick={() => {
                  fp.event("InitiateCheckout", {
                    content_ids: items.map(i => i.id),
                    content_type: "product",
                    value: getTotalPrice(),
                    currency: "BDT",
                    num_items: items.length
                  });
                }}
                className="group relative w-full bg-[#0f7af7] hover:bg-[#0c66d1] text-white py-6 rounded-[2rem] font-black text-lg transition-all shadow-[0_15px_30px_rgba(15,122,247,0.3)] hover:shadow-[0_20px_40px_rgba(15,122,247,0.4)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                {cartT.checkout}
                <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Payment Trust Logos */}
              <div className="mt-10 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-black text-center text-slate-300 uppercase tracking-[0.3em] mb-6">Guaranteed Safe Checkout</p>
                <div className="flex items-center justify-center gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={25} className="h-5 w-auto" />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} height={25} className="h-5 w-auto" />
                  <Image src="https://upload.wikimedia.org/wikipedia/bn/0/05/Bkash_logo.png" alt="Bkash" width={40} height={25} className="h-6 w-auto" />
                </div>
              </div>
            </div>
            
            <p className="text-center mt-6 text-slate-400 text-xs font-bold flex items-center justify-center gap-2">
              <Lock className="h-3 w-3" />
              Secure 256-bit SSL encrypted payment
            </p>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
