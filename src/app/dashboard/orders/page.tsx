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
  const [statusFilter, setStatusFilter] = useState("all");
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

  const filteredOrders = orders.filter(order => {
    if (statusFilter === "all") return true;
    return order.status.toLowerCase() === statusFilter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            {isAdmin ? "Global Sales" : "Order History"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isAdmin ? "Comprehensive log of all platform transactions." : "Access your licenses and track your digital asset purchases."}
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex gap-6">
            <button 
              onClick={() => setStatusFilter("all")}
              className={`text-xs font-bold pb-2 transition-all ${statusFilter === "all" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              All Orders
            </button>
            <button 
              onClick={() => setStatusFilter("completed")}
              className={`text-xs font-bold pb-2 transition-all ${statusFilter === "completed" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              Completed
            </button>
            <button 
              onClick={() => setStatusFilter("pending")}
              className={`text-xs font-bold pb-2 transition-all ${statusFilter === "pending" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              Pending
            </button>
          </div>
          <button className="p-2 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors">
            <Filter className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="p-5 sm:p-6 hover:bg-slate-50/50 transition-colors flex flex-col lg:flex-row lg:items-center gap-6 group">
                {/* Product Info */}
                <div className="flex-1 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <Package className="h-6 w-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        INV-{order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-[10px] text-slate-300 font-bold flex items-center gap-1 uppercase">
                        <Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {order.items[0]?.product?.title || "Premium Asset Pack"}
                      {order.items.length > 1 && <span className="text-blue-600 ml-1">+{order.items.length - 1} more</span>}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:items-center gap-4 sm:gap-8 border-t sm:border-t-0 border-slate-50 pt-4 sm:pt-0">
                  {/* Customer Info (Admin Only) */}
                  {isAdmin && (
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="h-8 w-8 rounded-full border border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0 bg-blue-100">
                        {order.user?.image ? <Image src={order.user.image} alt="User" width={32} height={32} className="object-cover" /> : <User className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="min-w-0 max-w-[120px]">
                        <p className="text-[11px] font-bold text-slate-900 truncate">{order.user?.name || "User"}</p>
                        <p className="text-[9px] text-slate-400 truncate">{order.user?.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Pricing & Status */}
                  <div className="flex items-center gap-8 justify-between sm:justify-start">
                    <div className="text-right">
                      <p className="text-base font-bold text-slate-900 force-english-font">৳{Number(order.totalAmount).toLocaleString()}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${order.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {order.status}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                       {/* Download button - Users Only */}
                       {!isAdmin && order.status === 'completed' && order.items.map((item: any) => (
                           item.product.downloadUrl && (
                            <a 
                              key={item.id}
                              href={item.product.downloadUrl} 
                              target="_blank" 
                              className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-blue-600 transition-colors uppercase tracking-widest shadow-sm"
                            >
                              <Download className="h-3.5 w-3.5" /> 
                              <span className="hidden sm:inline">Get Asset</span>
                            </a>
                           )
                       ))}
                       
                       {/* View Details Link */}
                       <Link 
                          href={`/dashboard/orders/${order.id}`} 
                          className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <ExternalLink className="h-4 w-4" />
                       </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center">
              <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Package className="h-8 w-8 text-slate-200" />
              </div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">No Orders Found</h3>
              <p className="text-slate-400 text-xs mt-1">Start browsing our premium inventory to make your first purchase.</p>
              <Link href="/products" className="mt-6 inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors hover:bg-blue-700">
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
