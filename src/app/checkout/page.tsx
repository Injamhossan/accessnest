"use client";

import { useCartStore } from "@/store/cartStore";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShieldCheck, Lock, ArrowRight, Info } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();
  const { lang } = useLangStore();
  const t = dict[lang]?.checkout || dict.en.checkout;
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "nagorikpay"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        fullName: session.user?.name ?? "",
        email: session.user?.email ?? "",
      }));
    }
  }, [session]);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[60vh]">
        <h2 className="text-2xl font-medium text-slate-900 tracking-tight">Your cart is empty</h2>
        <p className="text-slate-500 mt-2">Add products to your cart to proceed.</p>
        <Link 
          href="/products" 
          className="mt-6 text-sm font-semibold text-slate-900 border-b border-slate-900 pb-0.5 hover:opacity-70 transition-opacity"
        >
          Browse library
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          items,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert(data.error || "Failed to initialize payment");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-medium text-slate-900 tracking-tight mb-2">
            {t.title}
          </h1>
          <p className="text-slate-500 text-sm">{t.subtitle}</p>
        </header>

        {!session && (
          <div className="mb-12 border border-blue-50 bg-blue-50/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden transition-all hover:bg-blue-50/50">
            <div className="absolute right-0 top-0 w-24 h-24 bg-blue-100/20 rounded-full -mr-12 -mt-12" />
            <div className="flex items-center gap-6 relative z-10 text-center md:text-left flex-col md:flex-row">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center shrink-0">
                <Info className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">Remember to log in?</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
                  Access your orders and lifetime updates by logging in or creating a new account today.
                </p>
              </div>
            </div>
            <div className="flex gap-4 relative z-10">
              <Link 
                href="/login?callbackUrl=/checkout" 
                className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-white px-6 py-3 rounded-lg border border-blue-100 hover:bg-blue-50 transition-all shadow-sm"
              >
                Sign In
              </Link>
              <Link 
                href="/signup?callbackUrl=/checkout" 
                className="text-xs font-bold uppercase tracking-widest text-white bg-slate-900 px-6 py-3 rounded-lg hover:bg-slate-800 transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start border-t border-slate-100 pt-12">
          {/* Left Column - Billing Form */}
          <section className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                01 {t.billingDetails}
              </h2>

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {t.fullName}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full py-2 border-b border-slate-200 focus:border-slate-900 outline-none transition-all text-slate-900 bg-transparent placeholder:text-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="w-full py-2 border-b border-slate-200 focus:border-slate-900 outline-none transition-all text-slate-900 bg-transparent placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        className="w-full py-2 border-b border-slate-200 focus:border-slate-900 outline-none transition-all text-slate-900 bg-transparent placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-12">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                    02 {t.paymentMethod}
                  </h2>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: "nagorikpay", name: "Nagorikpay", subtitle: "Bkash / Rocket / Nagad / Upay" },
                      { id: "card", name: "Credit Card", subtitle: "Coming soon" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`group flex items-center justify-between p-4 cursor-pointer rounded-lg border transition-all ${
                          formData.paymentMethod === method.id
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-100 hover:border-slate-200 text-slate-900"
                        } ${method.id !== 'nagorikpay' ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          disabled={method.id !== 'nagorikpay'}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div>
                          <p className="text-sm font-semibold">{method.name}</p>
                          <p className={`text-[10px] uppercase font-bold tracking-widest ${
                            formData.paymentMethod === method.id ? 'text-slate-400' : 'text-slate-400'
                          }`}>{method.subtitle}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                          formData.paymentMethod === method.id ? 'border-white bg-white' : 'border-slate-200'
                        }`} />
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </section>

          {/* Right Column - Summary */}
          <aside className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="bg-slate-50 rounded-xl p-8 sticky top-12">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                Your Order
              </h2>

              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-4 scroll-slim">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-slate-900 line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">৳{item.price.toFixed(2)}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
  
              <div className="space-y-3 pt-6 border-t border-slate-200">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900">৳{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Taxes</span>
                  <span className="text-slate-900">৳0.00</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-2">
                  <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">{t.total}</span>
                  <span className="text-xl font-bold text-slate-900 tracking-tight">৳{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <button
                  form="checkout-form"
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white rounded-lg py-4 text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : t.placeOrder}
                </button>
                
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-slate-400" />
                    <Lock className="h-3 w-3 text-slate-300" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                    Encrypted SSL secure payment
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .scroll-slim::-webkit-scrollbar {
          width: 2px;
        }
        .scroll-slim::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-slim::-webkit-scrollbar-thumb {
          background: #e2e8f0;
        }
      `}</style>
    </div>
  );
}
