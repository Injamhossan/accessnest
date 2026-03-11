
"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Clock,
  ArrowUpRight,
  Loader2,
  Calendar
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function AllSalesPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sales")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (session?.user?.role !== "admin" && session?.user?.role !== "superadmin") {
    return <div className="p-10 text-center font-bold text-red-600">Unauthorized Access</div>;
  }

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const totalRevenue = data?.orders.reduce((acc: number, o: any) => acc + parseFloat(o.totalAmount), 0) || 0;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          Sales & Analytics
        </h1>
        <p className="text-slate-500 font-medium mt-1">Detailed performance metrics and transaction history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <DollarSign className="h-6 w-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <TrendingUp className="h-3 w-3" /> +14.2%
            </span>
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Gross Revenue</p>
          <h2 className="text-3xl font-black text-slate-900 mt-1">৳{totalRevenue.toLocaleString()}</h2>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              <TrendingUp className="h-3 w-3" /> +12%
            </span>
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Completed Sales</p>
          <h2 className="text-3xl font-black text-slate-900 mt-1">{data?.orders.length || 0}</h2>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
              <Calendar className="h-6 w-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-black text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg">
              Avg Growth
            </span>
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">New Users</p>
          <h2 className="text-3xl font-black text-slate-900 mt-1">24</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <h3 className="font-black text-slate-900">Revenue Over Time</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg">Daily</button>
              <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 rounded-lg">Monthly</button>
            </div>
          </div>
          <div className="p-8 flex-1 min-h-[300px] flex items-end justify-between gap-4">
            {data?.chartData?.map((item: any, i: number) => {
              const maxAmount = Math.max(...data.chartData.map((d: any) => d.amount)) || 1;
              const height = (item.amount / maxAmount) * 100;
              return (
              <div key={i} className="flex-1 group relative h-full flex items-end">
                <div 
                  className="w-full bg-slate-100 rounded-t-lg relative overflow-hidden group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-100 transition-all duration-300" 
                  style={{ height: `${Math.max(height, 5)}%` }}
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
                {/* Tooltip on hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  ৳{item.amount.toLocaleString()} ({item.date})
                </div>
              </div>
            )})}
          </div>
          <div className="px-8 py-4 border-t border-slate-50 bg-slate-50/30 flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>2 weeks ago</span>
            <span>Yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
            <h3 className="font-black text-slate-900">Latest Transactions</h3>
          </div>
          <div className="divide-y divide-slate-100 max-h-[450px] overflow-y-auto custom-scrollbar">
            {data?.orders.map((order: any) => (
              <div key={order.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center font-black text-[10px] text-blue-600">
                      {order.user.name?.charAt(0) || "U"}
                    </div>
                    <p className="text-sm font-bold text-slate-900">{order.user.name || "Customer"}</p>
                  </div>
                  <span className="text-sm font-black text-slate-900">৳{order.totalAmount}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-black ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-xs font-black text-blue-600 uppercase tracking-widest border-t border-slate-100 hover:bg-blue-50 transition-colors">
            Detailed History
          </button>
        </div>
      </div>
    </div>
  );
}
