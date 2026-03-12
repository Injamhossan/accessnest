"use client";

import { useCartStore } from "@/store/cartStore";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Info, ShieldCheck, UserPlus } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-slate-500 mt-2 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Browse Products
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
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          items: items,
          totalPrice: totalPrice,
        }),
      });

      const data = await response.json();

      if (data.payment_url) {
        // Redirect to Nagorikpay gateway
        window.location.href = data.payment_url;
      } else {
        alert(data.error || "Failed to initialize payment");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
          <p className="text-slate-500 mt-2">{t.subtitle}</p>
        </header>

        {!session && (
          <div className="mb-8 bg-blue-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative group">
            <div className="absolute right-0 top-0 opacity-10 -mr-6 -mt-6 transition-transform group-hover:scale-110">
              <UserPlus className="w-48 h-48" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold">Checkout faster and save your orders!</h3>
                <p className="text-blue-100 mt-1 max-w-2xl font-medium">
                  Did you know? Registered users can access their purchased products, license keys, and download links anytime from their dashboard. 
                  Get 100% lifetime security for your digital assets.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link 
                  href="/login?callbackUrl=/checkout" 
                  className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-md"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup?callbackUrl=/checkout" 
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold border border-white/20 hover:bg-blue-400 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Left Column - Billing Form */}
          <section className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">1</span>
                  {t.billingDetails}
                </h2>

                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                        {t.fullName}
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">2</span>
                      {t.paymentMethod}
                    </h2>

                    <div className="space-y-4">
                      {["nagorikpay", "card", "crypto"].map((method) => (
                        <label
                          key={method}
                          className={`relative flex items-center p-4 cursor-pointer rounded-xl border transition-all ${
                            formData.paymentMethod === method
                              ? "border-blue-500 bg-blue-50/50 shadow-sm"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                          />
                          <span className="ml-4 flex items-center">
                            <span className="text-slate-900 font-medium capitalize">
                              {method === "nagorikpay" ? "Nagorikpay (Bkash/Rocket/Nagad/Card)" : method === "card" ? t.card : t.crypto}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Right Column - Summary */}
          <aside className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 sticky top-24 overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6">{t.orderSummary}</h2>

                <ul className="space-y-4 mb-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-slate-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-slate-900 line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                          <span className="text-sm font-semibold text-slate-900">৳{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
 
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>৳{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (0%)</span>
                    <span>৳0.00</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <span className="text-lg font-bold text-slate-900">{t.total}</span>
                    <span className="text-2xl font-black text-blue-600">৳{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    form="checkout-form"
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        <span className="mr-2">{t.placeOrder}</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  
                  <div className="mt-4 flex items-center justify-center text-xs text-slate-400">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {t.secure}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
