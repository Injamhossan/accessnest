
"use client";

import { 
  CreditCard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  Download,
  Plus,
  ShieldCheck,
  Loader2,
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BillingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status === "authenticated") {
      fetch("/api/sales")
        .then(res => res.json())
        .then(data => {
          setTransactions(data.orders || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  const totalSpent = transactions
    ?.filter((o: any) => o.status === "completed")
    ?.reduce((acc: number, o: any) => acc + Number(o.totalAmount), 0) || 0;

  if (loading || status === "loading") {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto w-full">
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          Billing & Payments
        </h1>
        <p className="text-slate-500 text-sm mt-1">Overview of your transaction history and platform investment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Simplified Info Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Lifetime Investment</p>
              <div className="flex items-baseline gap-1 mt-1">
                 <span className="text-xl font-semibold text-slate-400">৳</span>
                 <h2 className="text-4xl font-bold text-slate-900 tracking-tight force-english-font">{totalSpent.toLocaleString()}</h2>
              </div>
              <div className="mt-8">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Account Holder</p>
                <p className="text-sm font-semibold text-slate-700 truncate max-w-[280px]">{session?.user?.email}</p>
              </div>
            </div>
            
            <div className="flex flex-col justify-between items-end">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
              <Link 
                href="/products" 
                className="mt-6 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                Browse Store
                <Plus className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Security Info Card */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div className="space-y-4">
             <div className="inline-flex h-10 w-10 rounded-xl bg-white text-emerald-600 items-center justify-center border border-slate-200 shadow-sm">
                <ShieldCheck className="h-5 w-5" />
             </div>
             <div>
                <h3 className="text-base font-bold text-slate-900">Encrypted Payments</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">All transactions are processed through secure gateways with industry-standard encryption.</p>
             </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gateway: NagorikPay</span>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-base font-bold text-slate-900">Transaction History</h3>
          <button className="text-[10px] font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest flex items-center gap-2">
            Download <Download className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.length > 0 ? (
            transactions.map((order) => (
              <div key={order.id} className="px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{order.items[0]?.product?.title || "Product Purchase"}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className="h-1 w-1 bg-slate-200 rounded-full" />
                      <span className="text-[10px] font-medium text-slate-300 uppercase">INV-{order.id.slice(-6).toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 force-english-font">৳{Number(order.totalAmount).toLocaleString()}</p>
                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Success</p>
                  </div>
                  <Link 
                    href={`/dashboard/orders`}
                    className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 px-6 text-center">
              <p className="text-slate-400 text-sm font-medium">No transactions found.</p>
              <Link href="/products" className="text-blue-600 font-bold text-xs mt-2 inline-block hover:underline">
                 Start shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
