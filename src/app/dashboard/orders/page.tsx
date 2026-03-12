
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
  ExternalLink
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = (session?.user as any)?.role === "admin" || (session?.user as any)?.role === "superadmin";

  useEffect(() => {
    fetch("/api/sales")
      .then(res => res.json())
      .then(data => {
        // If user, filter orders or the API should handle it (currently /api/sales is admin only)
        // I'll create a generic order API next or use the /api/dashboard/summary logic
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            {isAdmin ? "Global Order History" : "My Orders"}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {isAdmin ? "Track every purchase across the platform." : "Manage your personal purchases and access."}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 w-64 shadow-sm" 
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex gap-4">
            <button className="text-xs font-black text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-1">All Orders</button>
            <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Completed</button>
            <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Pending</button>
          </div>
          <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
            <Filter className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-slate-50/80 transition-all flex flex-col lg:flex-row lg:items-center gap-6 group">
                <div className="flex-1 flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 border border-blue-200/50 shadow-sm group-hover:scale-105 transition-transform">
                    <Package className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                        {order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900">
                      {order.items[0]?.product?.name || "Digital Access Pack"}
                      {order.items.length > 1 && <span className="text-blue-600 ml-1">+{order.items.length - 1} more</span>}
                    </h3>
                  </div>
                </div>

                {isAdmin && (
                  <div className="flex items-center gap-3 px-6 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden">
                      {order.user.image ? <img src={order.user.image} alt="" className="object-cover h-full w-full" /> : <User className="h-4 w-4 text-slate-400" />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">{order.user.name || "Customer"}</p>
                      <p className="text-[10px] font-bold text-slate-400">{order.user.email}</p>
                    </div>
                  </div>
                )}

                  <div className="flex flex-col items-end gap-3 min-w-[200px]">
                    <div className="text-right">
                      <p className="text-lg font-black text-slate-900">৳{order.totalAmount}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.paymentMethod || "Stripe"}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                        {order.status}
                      </span>
                      {order.status === 'completed' && (
                        <div className="flex flex-col items-end gap-2">
                          {order.items.map((item: any) => (
                            <div key={item.id} className="flex flex-col items-end gap-1">
                              {item.product.downloadUrl && (
                                <a 
                                  href={item.product.downloadUrl} 
                                  target="_blank" 
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 uppercase tracking-widest"
                                >
                                  <Download className="h-3 w-3" /> Download
                                </a>
                              )}
                              {item.product.deliverableContent && (
                                <div className="text-[9px] font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 max-w-[200px] text-right">
                                  <span className="text-slate-400 uppercase tracking-tighter block mb-0.5">License/Access:</span>
                                  {item.product.deliverableContent}
                                </div>
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
            <div className="p-20 text-center">
              <Package className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-bold">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
