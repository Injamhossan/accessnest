import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, ShoppingCart, Mail, CheckCircle } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-[#0f7af7]" />,
      title: "1. Discover Digital Assets",
      description: "Browse our expansive catalog of premium software licenses, cloud storage subscriptions, UI kits, and creative assets. Find the perfect digital product that suits your needs."
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-[#0f7af7]" />,
      title: "2. Secure Checkout",
      description: "Add items to your cart and proceed to our secure, encrypted checkout. We support major payment gateways ensuring your transaction is private and protected."
    },
    {
      icon: <Mail className="w-8 h-8 text-[#0f7af7]" />,
      title: "3. Instant Verification",
      description: "Upon successful payment, our automated system validates your transaction in seconds and prepares your order. You will receive an email receipt confirming your purchase."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-[#0f7af7]" />,
      title: "4. Download & Access",
      description: "Gain immediate access to your digital products. Links will be available in your email and securely stored in your user dashboard for convenient downloading at any time."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-[#0f7af7] mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">How It Works</h1>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
              Getting premium digital products at Access Nest is seamless and instantaneous. 
              Here is everything you need to know about our purchase and delivery process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-[110px] left-[50%] right-[30%] h-0.5 bg-slate-100 -z-0"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all z-10 bg-white">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center pattern-bg relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Ready to get started?</h2>
              <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">
                Explore our digital marketplace now and elevate your workflow with industry-leading assets and applications.
              </p>
              <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 bg-[#0f7af7] text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25">
                Explore Products
              </Link>
            </div>
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0f7af7] rounded-full filter blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full filter blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
