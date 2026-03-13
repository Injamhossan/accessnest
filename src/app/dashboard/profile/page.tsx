"use client";

import { useSession } from "next-auth/react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { User, Mail, Shield, Camera, LayoutDashboard, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { lang } = useLangStore();
  const t = dict[lang as keyof typeof dict]?.dashboardLayout || { profile: "Profile" };

  if (status === "loading") {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "No email",
    image: session?.user?.image,
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{t.profile}</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your professional identity and security settings.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center bg-slate-50/30">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl font-bold text-slate-400 shadow-sm overflow-hidden mx-auto">
                {user.image ? (
                  <Image src={user.image} alt={user.name} width={96} height={96} className="w-full h-full object-cover" />
                ) : (
                  initials || "U"
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-400 hover:text-blue-600 transition-colors">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            
            <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
            <p className="text-xs font-medium text-slate-400 mt-1">{user.email}</p>
            
            <div className="mt-6 flex items-center justify-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 inline-flex">
              <Shield className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Verified Account</span>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Personal Information</h3>
            </div>
            
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input 
                      type="text" 
                      defaultValue={user.name} 
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300" 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue={user.name.split(" ")[0]} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Account Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input 
                    type="email" 
                    defaultValue={user.email} 
                    disabled 
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-400 cursor-not-allowed" 
                  />
                </div>
                <p className="text-[9px] text-slate-400 font-medium italic ml-0.5">* Email changes require support verification.</p>
              </div>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button type="button" className="px-8 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
                  Save Changes
                </button>
                <button type="button" className="px-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Security Card Simplified */}
          <div className="bg-slate-900 p-6 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h3 className="text-base font-bold mb-1">Account Security</h3>
              <p className="text-slate-400 text-xs">Enable two-factor authentication for enhanced protection.</p>
            </div>
            <button className="relative z-10 hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
              Configure <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button className="sm:hidden w-full py-3 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-blue-400 mt-2">
              Configure Security
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
