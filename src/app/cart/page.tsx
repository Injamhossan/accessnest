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
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-white">
        <div className="mb-6">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
            <ShoppingBag className="h-10 w-10 text-slate-300" />
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold text-slate-900 mb-2 text-center">{cartT.emptyTitle}</h1>
        <p className="text-slate-500 mb-8 text-center max-w-sm">
          {cartT.emptyDesc}
        </p>

        <Link 
          href="/products" 
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium transition-all hover:bg-slate-800 active:scale-95 text-sm"
        >
          {cartT.continue}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/products" className="group flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-all">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              {cartT.continue}
            </Link>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
            {cartT.title}
            <span className="text-sm font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
              {items.length} {lang === 'en' ? 'Items' : 'টি পণ্য'}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid gap-3">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-3 sm:p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-6 group transition-all hover:border-slate-200">
                  {/* Item Image */}
                  <div className="relative h-16 w-20 sm:h-20 sm:w-28 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  
                  {/* Item Content */}
                  <div className="flex-1 min-w-0 py-1">
                    <span className="text-[9px] font-bold text-[#0f7af7] uppercase tracking-widest mb-1 block">
                      {item.category ? ((adminT?.categories as any)?.[item.category] || item.category) : "Digital Asset"}
                    </span>
                    <h3 className="text-sm sm:text-lg font-bold text-slate-900 truncate mb-1 leading-tight">{item.title}</h3>
                    <p className="text-base sm:text-lg font-black text-slate-900">৳{item.price}</p>
                  </div>

                  {/* Item Actions */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 sm:pl-4 sm:border-l border-slate-100">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 p-0.5 sm:p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-slate-900 transition-all"
                      >
                        <Minus className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                      </button>
                      <span className="w-6 sm:w-8 text-center font-bold text-slate-900 text-xs sm:text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-slate-900 transition-all"
                      >
                        <Plus className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                      </button>
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-all"
                      title="Remove Item"
                    >
                      <Trash2 className="h-4 sm:h-5 w-4 sm:w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-8 opacity-60">
              {[
                { icon: ShieldCheck, title: cartT.guarantee },
                { icon: Lock, title: cartT.secure },
                { icon: ShoppingBag, title: cartT.shipping }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <benefit.icon className="h-4 w-4 text-slate-400" />
                  <span className="text-xs font-medium text-slate-600 leading-snug">{benefit.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{cartT.subtotal}</span>
                  <span className="text-slate-900 font-medium">৳{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{cartT.tax}</span>
                  <span className="text-slate-900 font-medium">৳0</span>
                </div>
                <div className="h-px bg-slate-100 w-full my-4"></div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-base font-semibold text-slate-900">{cartT.total}</span>
                  <div className="text-right">
                    <span className="text-2xl font-semibold text-slate-900">৳{getTotalPrice()}</span>
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
                className="group relative w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                {cartT.checkout}
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              {/* Payment Trust Logos */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest mb-4">Secure Checkout</p>
                <div className="flex items-center justify-center gap-4 opacity-40">
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={32} height={20} className="h-3 w-auto" />
                  <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={32} height={20} className="h-4 w-auto" />
                  <Image src="https://upload.wikimedia.org/wikipedia/bn/0/05/Bkash_logo.png" alt="Bkash" width={32} height={20} className="h-4 w-auto" />
                </div>
              </div>
            </div>
            
            <p className="text-center mt-4 text-slate-400 text-xs">
              Secure SSL encrypted payment
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
