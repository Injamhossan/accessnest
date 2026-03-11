
"use client";

import { 
  CreditCard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  Download,
  Plus,
  ShieldCheck
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function BillingPage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-blue-600" />
          Billing & Payments
        </h1>
        <p className="text-slate-500 font-medium mt-1">Manage your payment methods and view transaction history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Wallet className="h-40 w-40" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-100 text-xs font-black uppercase tracking-[0.2em] mb-1">Available Balance</p>
                <h2 className="text-4xl font-black">৳0.00</h2>
              </div>
              <ShieldCheck className="h-8 w-8 text-blue-300" />
            </div>
            
            <div className="mt-12 flex items-end justify-between">
              <div>
                <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">Account Holder</p>
                <p className="font-bold tracking-tight">{session?.user?.name || "Guest User"}</p>
              </div>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Funds
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-black text-slate-900 mb-6">Preferred Support</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Visa ending in 4242</p>
                  <p className="text-xs text-slate-400 font-medium">Expires 12/26</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-3.5 border-2 border-slate-100 rounded-2xl text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest">
            Manage Cards
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-slate-900">Billing History</h3>
          <button className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
            Download All <Download className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${i === 2 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                  {i === 2 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{i === 0 ? "Cloud Storage Pro" : i === 1 ? "AI Assistant Plus" : "Withdrawal"}</p>
                  <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3 w-3" /> March {10 - i}, 2026
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${i === 2 ? 'text-red-500' : 'text-slate-900'}`}>{i === 2 ? '-৳25.00' : '+৳9.00'}</p>
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-300">ORD-12{i}54</span>
              </div>
            </div>
          ))}
          <div className="p-12 text-center">
            <p className="text-slate-400 text-sm italic">Connect your real payment data to see full history.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
