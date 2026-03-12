"use client";

import { useCartStore } from "@/store/cartStore";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { lang } = useLangStore();
  const t = dict[lang]?.nav; // Reusing some nav/product strings
  
  // Basic translations if not in dictionary
  const cartT = {
    en: {
      title: "Your Shopping Cart",
      empty: "Your cart is empty",
      summary: "Order Summary",
      subtotal: "Subtotal",
      checkout: "Proceed to Checkout",
      continue: "Continue Shopping"
    },
    bn: {
      title: "আপনার শপিং কার্ট",
      empty: "আপনার কার্টটি খালি",
      summary: "অর্ডার সারাংশ",
      subtotal: "উপমোট",
      checkout: "চেকআউট করুন",
      continue: "কেনাকাটা চালিয়ে যান"
    }
  }[lang as 'en' | 'bn'] || {
    title: "Your Shopping Cart",
    empty: "Your cart is empty",
    summary: "Order Summary",
    subtotal: "Subtotal",
    checkout: "Proceed to Checkout",
    continue: "Continue Shopping"
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-md w-full border border-slate-100">
          <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-slate-300" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">{cartT.empty}</h1>
          <p className="text-slate-500 font-medium mb-8">Looks like you haven't added any premium assets yet.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-8 py-4 bg-[#0f7af7] text-white rounded-2xl font-black transition-all hover:bg-[#0863cb] shadow-lg shadow-blue-200"
          >
            {cartT.continue}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
          {cartT.title}
          <span className="text-sm font-bold bg-[#0f7af7] text-white px-3 py-1 rounded-full">{items.length}</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6 group">
                <div className="relative h-24 w-32 rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0f7af7] uppercase tracking-wider mb-1">{item.category}</p>
                  <h3 className="text-lg font-extrabold text-slate-900 truncate">{item.title}</h3>
                  <p className="text-xl font-black text-slate-900 mt-1 force-english-font">৳{item.price}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white hover:text-[#0f7af7] rounded-lg transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-black text-slate-700 force-english-font">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white hover:text-[#0f7af7] rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#0f7af7] transition-all py-4">
              <ArrowLeft className="h-4 w-4" />
              {cartT.continue}
            </Link>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/40 sticky top-28">
              <h2 className="text-xl font-black text-slate-900 mb-6">{cartT.summary}</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-slate-500 font-bold">
                  <span>{cartT.subtotal}</span>
                  <span className="text-slate-900 force-english-font">৳{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 font-bold">
                  <span>Tax (0%)</span>
                  <span className="text-slate-900">৳0</span>
                </div>
                <div className="h-px bg-slate-100 w-full my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-black text-slate-900">Total</span>
                  <span className="text-3xl font-black text-[#0f7af7] force-english-font">৳{getTotalPrice()}</span>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-[#0f7af7] hover:bg-[#0863cb] text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-200 hover:shadow-blue-300 active:scale-[0.98] flex items-center justify-center"
              >
                {cartT.checkout}
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-40">
                <Image src="https://placehold.co/40x25/png?text=Visa" alt="Visa" width={40} height={25} />
                <Image src="https://placehold.co/40x25/png?text=MC" alt="Mastercard" width={40} height={25} />
                <Image src="https://placehold.co/40x25/png?text=BK" alt="Bkash" width={40} height={25} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
