"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Search, 
  Clock, 
  ChevronRight, 
  Package,
  User,
  Filter,
  Loader2,
  Download,
  ExternalLink,
  CreditCard
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = (session?.user as any)?.role === "admin" || (session?.user as any)?.role === "superadmin";

  useEffect(() => {
    fetch("/api/sales")
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-[#0f7af7] animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-[#0f7af7]" />
            {isAdmin ? "Global Sales" : "Order History"}
          </h1>
          <p className="text-slate-500 font-semibold mt-1 text-sm">
            {isAdmin ? "Comprehensive log of all platform transactions." : "Access your licenses and track your digital asset purchases."}
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID or product..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 shadow-sm transition-all" 
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            <button className="text-xs font-bold text-[#0f7af7] uppercase tracking-[0.2em] border-b-2 border-[#0f7af7] pb-2 whitespace-nowrap">All Orders</button>
            <button className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors whitespace-nowrap">Completed</button>
            <button className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors whitespace-nowrap">Pending</button>
          </div>
          <button className="p-2.5 bg-white hover:bg-slate-50 rounded-xl transition-all border border-slate-200 shadow-sm shrink-0 ml-4 group">
            <Filter className="h-4 w-4 text-slate-500 transition-transform group-hover:rotate-12" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="p-6 sm:p-8 hover:bg-slate-50/50 transition-all flex flex-col xl:flex-row xl:items-center gap-8 group">
                {/* Product Info */}
                <div className="flex-1 flex items-center gap-6">
                  <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100/50 shadow-sm group-hover:scale-105 transition-transform">
                    <Package className="h-8 w-8 text-[#0f7af7]" />
                  </div>
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/50">
                        INV-{order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1.5 uppercase tracking-widest">
                        <Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 truncate">
                      {order.items[0]?.product?.name || "Digital Asset Pack"}
                      {order.items.length > 1 && <span className="text-[#0f7af7] ml-2">+{order.items.length - 1} Item(s)</span>}
                    </h3>
                  </div>
                </div>

                {/* Customer Info (Admin) */}
                {isAdmin && (
                  <div className="flex items-center gap-4 px-6 py-3 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-blue-200/50 transition-colors">
                    <div className="h-10 w-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0 bg-blue-50">
                      {order.user.image ? <Image src={order.user.image} alt="User" width={40} height={40} className="object-cover" /> : <User className="h-5 w-5 text-blue-400" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{order.user.name || "Anonymous"}</p>
                      <p className="text-[10px] font-semibold text-slate-400 truncate uppercase tracking-tighter">{order.user.email}</p>
                    </div>
                  </div>
                )}

                {/* Status & Pricing */}
                <div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-end justify-between sm:justify-start xl:justify-center gap-6 xl:min-w-[240px] border-t sm:border-t-0 xl:border-l border-slate-100 pt-6 sm:pt-0 xl:pl-8">
                  <div className="sm:text-left xl:text-right">
                    <p className="text-2xl font-bold text-slate-900 force-english-font tracking-tighter">৳{order.totalAmount}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center xl:justify-end gap-1.5 mt-0.5">
                      <CreditCard className="h-3 w-3" /> {order.paymentMethod || "NagorikPay"}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border shadow-sm ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                      {order.status}
                    </span>
                    
                    {order.status === 'completed' && (
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex flex-col items-end gap-1">
                            {item.product.downloadUrl && (
                              <a 
                                href={item.product.downloadUrl} 
                                target="_blank" 
                                className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-[#0f7af7] transition-all uppercase tracking-widest"
                              >
                                <Download className="h-3.5 w-3.5" /> 
                                <span className="hidden sm:inline">Download Asset</span>
                                <span className="sm:hidden">Get</span>
                                <ChevronRight className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center bg-white">
              <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                <Package className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-wider">No Orders Detected</h3>
              <p className="text-slate-400 font-semibold text-sm max-w-xs mx-auto uppercase tracking-tighter">Your transaction list is currently empty. Start browsing our premium digital inventory.</p>
              <Link href="/products" className="mt-8 inline-block px-8 py-3 bg-[#0f7af7] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-transform">
                Browse Ecosystem
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
