"use client";

import { useSession } from "next-auth/react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { User, Mail, Shield, Camera, LayoutDashboard, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { lang } = useLangStore();
  const t = dict[lang as keyof typeof dict]?.dashboardLayout || { profile: "Profile" };

  if (status === "loading") {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f7af7]"></div>
      </div>
    );
  }

  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "No email",
    image: session?.user?.image,
  };

  const nameParts = user.name.split(" ");
  const initials = nameParts.length > 1 
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` 
    : user.name[0];

  return (
    <div className="px-4 py-8 sm:p-6 lg:p-10 max-w-5xl mx-auto w-full">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#0f7af7]" />
            <span className="text-[10px] font-black text-[#0f7af7] uppercase tracking-[0.3em]">Identity Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{t.profile}</h1>
        <p className="text-slate-500 font-bold mt-2 text-sm sm:text-base tracking-tight">Manage your professional identity and security settings.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-600 to-violet-600 opacity-5" />
                
                <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-[2rem] bg-blue-50 text-[#0f7af7] flex items-center justify-center text-3xl font-black mx-auto border-4 border-white shadow-xl relative overflow-hidden">
                        {user.image ? (
                        <Image src={user.image} alt={user.name} width={112} height={112} className="w-full h-full object-cover" />
                        ) : (
                        initials?.toUpperCase() || "U"
                        )}
                    </div>
                    <button className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2 p-2.5 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-500 hover:text-[#0f7af7] transition-all hover:scale-110">
                        <Camera className="h-4 w-4" />
                    </button>
                </div>
                
                <h2 className="text-xl font-black text-slate-900 mb-1">{user.name}</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{user.email}</p>
                
                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100/50 inline-flex">
                    <Shield className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified Account</span>
                </div>
            </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50">
                    <h3 className="font-black text-slate-900 uppercase tracking-wider">Personal Information</h3>
                </div>
                
                <form className="p-8 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Legal Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                <input type="text" defaultValue={user.name} className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/30 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Display Alias</label>
                            <input type="text" defaultValue={user.name.split(" ")[0]} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/30 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Primary Email Endpoint</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                            <input type="email" defaultValue={user.email} disabled className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-100 text-sm font-bold text-slate-400 cursor-not-allowed" />
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold italic ml-1">* Email changes require manual verification. Contact support for assistance.</p>
                    </div>
                    
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <button type="button" className="flex-1 sm:flex-none px-10 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
                            Update Identity
                        </button>
                        <button type="button" className="flex-1 sm:flex-none px-10 py-4 bg-white border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 transition-all">
                            Discard
                        </button>
                    </div>
                </form>
            </div>

            {/* Security Section */}
            <div className="mt-8 bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full" />
                <div className="relative z-10">
                    <h3 className="text-xl font-black mb-2 tracking-tight">System Security</h3>
                    <p className="text-slate-400 text-sm font-medium mb-6">Enhance your account durability with two-factor authentication.</p>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#0f7af7] hover:text-blue-400 transition-colors">
                        Configure Authentication <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
