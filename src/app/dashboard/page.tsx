"use client";

import {
  ShoppingBag,
  CreditCard,
  Bell,
  Package,
  Clock,
  ChevronRight,
  ArrowUpRight,
  Star,
  CheckCircle2,
  Download,
  User,
  Users,
  DollarSign,
  BarChart3,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  TrendingUp,
  ArrowDownRight,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

// ── Shared Config ──
const statusColors: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const lang = useLangStore((state) => state.lang) as keyof typeof dict;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = (session?.user as any)?.role === "admin" || (session?.user as any)?.role === "superadmin";

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard/summary")
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch dashboard data:", err);
          setLoading(false);
        });
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAdmin) {
    return <AdminDashboard session={session} lang={lang} realData={data} />;
  }

  return <UserDashboard session={session} lang={lang} realData={data} />;
}

function AdminDashboard({ session, lang, realData }: { session: any; lang: keyof typeof dict; realData: any }) {
  const adminStats = [
    {
      label: "Gross Revenue",
      value: `৳${realData?.stats?.revenue?.toLocaleString() || "0"}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Users",
      value: realData?.stats?.userCount?.toString() || "0",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Completed Sales",
      value: realData?.stats?.orderCount?.toString() || "0",
      icon: ShoppingBag,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Active Products",
      value: realData?.stats?.productCount?.toString() || "0",
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  const recentProducts = realData?.recentProducts || [];
  const recentUsers = realData?.recentUsers || [];
  const chartData = realData?.chartData || [];

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Comprehensive log of platform transactions and user activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/all-sales" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest">
            <BarChart3 className="h-4 w-4" /> Sales Analytics
          </Link>
          <Link href="/dashboard/manage-products" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 border border-slate-900 rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest">
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {adminStats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`h-10 w-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Analytics & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Revenue (Last 14 Days)</h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Real-time</span>
          </div>
          <div className="p-6 h-[280px] flex items-end justify-between gap-2">
            {chartData.length > 1 ? chartData.map((item: any, i: number) => {
              const maxAmt = Math.max(...chartData.map((d: any) => d.amount)) || 1;
              const h = (item.amount / maxAmt) * 100;
              return (
                <div key={i} className="flex-1 group relative h-full flex flex-col justify-end items-center">
                  <div 
                    className="w-full bg-slate-100 rounded-t-md group-hover:bg-blue-600 transition-all duration-300 relative" 
                    style={{ height: `${Math.max(h, 5)}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      ৳{item.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-xs">No analytics data available</div>
            )}
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest">
            <span>{chartData[0]?.date || "2 Weeks Ago"}</span>
            <span className="text-blue-500 font-black">Today</span>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Recent Users</h3>
          </div>
          <div className="divide-y divide-slate-100 max-h-[340px] overflow-y-auto custom-scrollbar">
            {recentUsers.map((u: any) => (
              <div key={u.id} className="p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden shrink-0">
                  {u.image ? <Image src={u.image} alt="User" width={36} height={36} className="object-cover" /> : <User className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900 truncate">{u.name || "User"}</p>
                  <p className="text-[10px] text-slate-400 font-medium truncate italic">{u.email}</p>
                </div>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${u.role === 'admin' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>{u.role}</span>
              </div>
            ))}
          </div>
          <Link href="/dashboard/manage-users" className="block w-full py-3.5 text-center text-[10px] font-bold text-blue-600 uppercase tracking-widest border-t border-slate-100 hover:bg-blue-50 transition-all">
            Full Directory
          </Link>
        </div>
      </div>

      {/* Recent Inventory */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Global Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Asset Details</th>
                <th className="px-8 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentProducts.map((p: any) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-12 rounded-lg bg-slate-100 border border-slate-100 overflow-hidden relative shrink-0">
                        {p.image ? <Image src={p.image} alt={p.title || p.name} fill className="object-cover" /> : <Package className="h-4 w-4 m-3 text-slate-300" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{p.title || p.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-medium">{p.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg uppercase tracking-widest">{p.category}</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <span className="text-sm font-bold text-slate-900 force-english-font">৳{Number(p.price).toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UserDashboard({ session, lang, realData }: { session: any; lang: keyof typeof dict; realData: any }) {
  const t = dict[lang]?.dashboard;
  
  const statusColors: any = {
    completed: "bg-emerald-50 text-emerald-600 border border-emerald-100/50",
    pending: "bg-amber-50 text-amber-600 border border-amber-100/50"
  };

  const userStats = [
    { label: t.totalSpent, value: `৳${realData?.orders?.reduce((acc: number, o: any) => acc + parseFloat(o.totalAmount), 0) || 0}`, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: t.activeLicences, value: realData?.activeProducts?.length || 0, icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Notifications", value: realData?.notifications?.length || 0, icon: Bell, color: "text-amber-600", bg: "bg-amber-50" }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Customer Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your digital assets and order history.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/orders" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all uppercase tracking-widest">
            <ShoppingBag className="h-4 w-4" /> Full Orders
          </Link>
          <Link href="/products" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 border border-slate-900 rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest">
            <Plus className="h-4 w-4" /> New Asset
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {userStats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`h-9 w-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="orders">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Recent Activity</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {realData?.orders?.length > 0 ? realData.orders.map((order: any) => (
                <div key={order.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ShoppingBag className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 truncate">{order.items[0]?.product?.name || "Order Contents"}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">{new Date(order.createdAt).toLocaleDateString()} · ID: {order.id.slice(0, 8)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-slate-900 force-english-font">৳{order.totalAmount}</span>
                    <span className={`text-[8px] font-bold px-2.5 py-1 rounded uppercase tracking-widest ${statusColors[order.status] || ""}`}>{order.status}</span>
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center text-slate-300 italic text-xs">No orders detected yet.</div>
              )}
            </div>
          </div>

          {/* Digital Library */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Digital Licenses</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {realData?.activeProducts?.length > 0 ? realData.activeProducts.map((p: any) => (
                <div key={p.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-14 rounded-xl bg-slate-100 border border-slate-100 relative overflow-hidden shrink-0">
                      {p.image ? <Image src={p.image} alt={p.title || p.name} fill className="object-cover" /> : <Package className="h-5 w-5 m-2.5 text-slate-300" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{p.title || p.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">{p.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-end border-t sm:border-0 border-slate-50 pt-3 sm:pt-0">
                    <span className="text-[8px] font-bold text-emerald-600 border border-emerald-100 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-widest shrink-0">Authorized</span>
                    {p.downloadUrl && (
                      <a href={p.downloadUrl} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-lg transition-all">
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center text-slate-300 italic text-xs">No active asset licenses.</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Alerts</h3>
              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <div className="text-center py-8">
              <Bell className="h-8 w-8 text-slate-100 mx-auto mb-3" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Syncing status...</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-[40px] rounded-full" />
            <h3 className="text-lg font-bold mb-2 relative z-10 tracking-tight">Need Support?</h3>
            <p className="text-xs font-medium text-slate-400/80 mb-6 relative z-10 leading-relaxed">Having issues with your digital asset or license activation? Get priority support from our experts.</p>
            <div className="space-y-2.5 relative z-10">
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                Open Ticket
              </button>
              <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-colors">
                Read Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
