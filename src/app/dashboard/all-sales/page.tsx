
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
  Filter,
  User,
  Loader2,
  Calendar
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  const totalRevenue = data?.orders.reduce((acc: number, o: any) => acc + parseFloat(o.totalAmount), 0) || 0;

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Sales & Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Detailed transaction history and revenue performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gross Revenue</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">৳{totalRevenue.toLocaleString()}</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed Sales</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">{data?.orders.length || 0}</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activity Period</p>
          <h2 className="text-sm font-bold text-slate-900 mt-1">Last 14 Days</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Revenue Growth</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-[10px] font-bold text-blue-600 bg-blue-50 rounded-lg uppercase tracking-tighter">Real-time</button>
            </div>
          </div>
          <div className="p-6 flex-1 min-h-[300px] flex items-end justify-between gap-2.5">
            {data?.chartData?.map((item: any, i: number) => {
              const maxAmount = Math.max(...data.chartData.map((d: any) => d.amount)) || 1;
              const height = (item.amount / maxAmount) * 100;
              return (
              <div key={i} className="flex-1 group relative h-full flex flex-col justify-end items-center">
                <div
                  className="w-full bg-slate-100 rounded-t-md group-hover:bg-blue-600 transition-all duration-300 relative"
                  style={{ height: `${Math.max(height, 5)}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    ৳{item.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            )})}
          </div>
          <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest">
            <span>{data?.chartData?.[0]?.date || "Starting Point"}</span>
            <span className="text-blue-500 font-black">Latest Update</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Transactions</h3>
          </div>
          <div className="divide-y divide-slate-100 max-h-[440px] overflow-y-auto custom-scrollbar">
            {data?.orders.map((order: any) => (
              <div key={order.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100 font-bold text-[10px] text-blue-600">
                      {order.user.image ? <Image src={order.user.image} alt="U" width={28} height={28} /> : order.user.name?.charAt(0) || "U"}
                    </div>
                    <p className="text-sm font-bold text-slate-900">{order.user.name || "Customer"}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">৳{Number(order.totalAmount).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 uppercase italic"><Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-widest ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-[10px] font-bold text-blue-600 uppercase tracking-widest border-t border-slate-100 hover:bg-blue-50 transition-colors">
            Full History
          </button>
        </div>
      </div>
    </div>
  );
}
