import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Zap, Handshake } from "lucide-react";

export default function PartnersPage() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: "Verified Authenticity",
      description: "We work directly with software companies to ensure every license and key is 100% genuine and actively supported."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Exclusive Deals",
      description: "Our strong relationships allow us to offer steep discounts and customized bundles that you won't find anywhere else."
    },
    {
      icon: <Handshake className="w-6 h-6 text-purple-600" />,
      title: "Direct Support Channels",
      description: "By buying partner-verified software, you get access to priority support networks and direct pipelines to the developers."
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
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Official Partners
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Verified Partnerships</h1>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              We collaborate with premier digital creators, agencies, and top software distributors to bring you industry-leading resources. Every product available on Access Nest has been vetted for complete client security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-slate-100">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="p-8 md:p-12 bg-blue-50 rounded-2xl border border-blue-100 text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Want to partner with us?</h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
              Are you a developer or creator looking for a secure distribution platform? Connect with us to explore how we can distribute your digital products securely.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0f7af7] text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25"
            >
              Contact Partnership Team
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
