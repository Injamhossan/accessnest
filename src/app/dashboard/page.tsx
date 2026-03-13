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
      label: "Total Revenue",
      value: `৳${realData?.stats?.revenue?.toLocaleString() || "0"}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "+0%",
      trendUp: true,
    },
    {
      label: "Total Users",
      value: realData?.stats?.userCount?.toString() || "0",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+0%",
      trendUp: true,
    },
    {
      label: "Total Sales",
      value: realData?.stats?.orderCount?.toString() || "0",
      icon: ShoppingBag,
      color: "text-violet-600",
      bg: "bg-violet-50",
      trend: "+0%",
      trendUp: true,
    },
    {
      label: "Active Products",
      value: realData?.stats?.productCount?.toString() || "0",
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
      trend: "+0%",
      trendUp: true,
    },
  ];

  const recentProducts = realData?.recentProducts || [];
  const recentUsers = realData?.recentUsers || [];

  return (
    <div className="px-4 py-8 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-blue-600" />
            Admin Overview
          </h1>
          <p className="text-slate-500 font-semibold mt-1 text-sm sm:text-base">System-wide performance and management.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50">
            <BarChart3 className="h-4 w-4" /> Reports
          </button>
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {adminStats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.trendUp ? "text-emerald-600" : "text-red-600"}`}>
                {stat.trendUp ? <TrendingUp className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Analytics & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
        {/* Analytics Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden min-h-[400px]">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <h2 className="font-semibold text-slate-900 text-lg">Sales Analytics</h2>
            <select className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:outline-none uppercase tracking-widest">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="p-6 sm:p-8 h-80 flex items-end justify-between gap-1.5 sm:gap-3">
            {[40, 70, 45, 90, 65, 80, 55, 75, 50, 85, 95, 60].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end">
                <div
                  className="w-full bg-blue-50 rounded-lg relative overflow-hidden group-hover:bg-blue-600 transition-all duration-300 min-w-[8px]"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6 pt-2 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             <span>Mon</span>
             <span>Tue</span>
             <span>Wed</span>
             <span>Thu</span>
             <span>Fri</span>
             <span>Sat</span>
             <span>Sun</span>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900 text-lg">Recent Users</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {recentUsers.slice(0, 6).map((u: any) => (
              <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="h-10 w-10 rounded-full bg-blue-50 shrink-0 flex items-center justify-center border border-blue-100 overflow-hidden">
                    {u.image ? (
                        <Image src={u.image} alt={u.name} width={40} height={40} className="object-cover" />
                    ) : (
                        <User className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-slate-900 truncate">{u.name || "User"}</p>
                    <p className="text-[10px] text-slate-400 font-semibold truncate uppercase tracking-widest">{u.email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg uppercase tracking-wider shrink-0 ml-2">{u.role}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-xs font-bold text-[#0f7af7] uppercase tracking-[0.2em] bg-slate-50/50 hover:bg-slate-100 transition-all border-t border-slate-100">
            View All Users
          </button>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm overflow-hidden mb-10">
        <div className="px-6 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
             <h2 className="font-semibold text-slate-900 text-lg">Inventory Management</h2>
             <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-1">Manage licenses and active listings</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Product Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentProducts.map((product: any) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shrink-0 relative">
                        {product.image ? (
                          <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <Package className="h-6 w-6 m-3 text-slate-300" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-slate-900 block truncate">{product.title || product.name}</span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase truncate">ID: {product.id.slice(0, 8)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900 force-english-font">৳{product.price}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2.5 text-slate-400 hover:text-[#0f7af7] hover:bg-blue-50 rounded-xl transition-all active:scale-90">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-slate-900 rounded-xl">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-5 border-t border-slate-100 bg-slate-50/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Page 1 of 5 · {recentProducts.length} Results</span>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-50 uppercase tracking-widest">Prev</button>
            <button className="flex-1 sm:flex-none px-6 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0f7af7] uppercase tracking-widest">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDashboard({ session, lang, realData }: { session: any; lang: keyof typeof dict; realData: any }) {
  const t = dict[lang].dashboard;

  const totalSpent = realData?.orders
    ?.filter((o: any) => o.status === "completed")
    ?.reduce((acc: number, o: any) => acc + Number(o.totalAmount), 0) || 0;

  const stats = [
    { label: "Total Orders", value: realData?.orders?.length?.toString() || "0", icon: ShoppingBag, color: "bg-blue-50 text-[#0f7af7]", change: "In pipeline" },
    { label: "Total Spent", value: `৳${totalSpent.toLocaleString()}`, icon: CreditCard, color: "bg-emerald-50 text-emerald-600", change: "Verified payments" },
    { label: "Active Items", value: realData?.activeProducts?.length?.toString() || "0", icon: Package, color: "bg-violet-50 text-violet-600", change: "Downloads ready" },
    { label: "Notifs", value: "0", icon: Bell, color: "bg-amber-50 text-amber-600", change: "No new alerts" },
  ];

  return (
    <div className="w-full px-4 py-8 sm:p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-xl bg-[#0f7af7] flex items-center justify-center shrink-0 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {session?.user?.image ? (
              <Image src={session.user.image} alt="User" width={64} height={64} className="object-cover" />
            ) : (
              <User className="h-8 w-8 text-white" />
            )}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0f7af7] mb-1">User Ecosystem</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.welcome}{session?.user?.name?.split(" ")[0]}!
            </h1>
            <p className="text-sm text-slate-400 font-semibold mt-1 tracking-tight">{session?.user?.email}</p>
          </div>
        </div>
        <Link
          href="/products"
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-4 text-sm font-bold text-white hover:bg-slate-800 transition-all active:scale-95"
        >
          {t.browseProducts}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group overflow-hidden relative">
            <div className="absolute -right-4 -top-4 h-20 w-20 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" />
            <div className="relative z-10">
              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg ${s.color} mb-6 shadow-sm border border-slate-50/50`}>
                <s.icon className="h-6 w-6" />
              </div>
              <p className="text-2xl font-bold text-slate-900 truncate force-english-font">{s.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{s.label}</p>
              <p className="text-[10px] font-semibold text-slate-400/60 mt-2 truncate bg-slate-50 inline-block px-2 py-0.5 rounded-md">{s.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Orders Section */}
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden" id="orders">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
              <div>
                <h2 className="font-bold text-slate-900 text-lg uppercase tracking-wider">{t.recentOrders}</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Transaction History</p>
              </div>
              <button className="text-xs font-bold text-[#0f7af7] uppercase tracking-[0.2em] hover:bg-blue-50 px-4 py-2 rounded-lg transition-all">
                {t.viewAll}
              </button>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
              <div className="min-w-[500px] divide-y divide-slate-50">
                {realData?.orders?.length > 0 ? (
                  realData.orders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between px-8 py-5 hover:bg-slate-50/80 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Package className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{order.items[0]?.product?.name || "Order Contents"}</p>
                          <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5 mt-1 uppercase tracking-widest">
                            <Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()} ·
                            <span className="font-bold">{order.id.slice(0, 8)}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-bold text-base text-slate-900 force-english-font">৳{order.totalAmount}</span>
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-xl capitalize tracking-widest ${statusColors[order.status] || ""}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-16 text-center">
                    <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                        <ShoppingBag className="h-8 w-8 text-slate-200" />
                    </div>
                    <p className="text-slate-400 font-bold">No recent activity detected.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Library Section */}
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
              <div>
                <h2 className="font-bold text-slate-900 text-lg uppercase tracking-wider">Digital Library</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Cloud & Managed Assets</p>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {realData?.activeProducts?.length > 0 ? (
                realData.activeProducts.map((p: any) => (
                  <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between px-8 py-6 hover:bg-slate-50/80 transition-all gap-6">
                    <div className="flex items-center gap-5">
                      <div className="relative h-14 w-20 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shrink-0 shadow-sm">
                        {p.image ? (
                          <Image src={p.image} alt={p.title || p.name} fill className="object-cover" />
                        ) : (
                          <Package className="h-6 w-6 m-4 text-slate-200" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-slate-900 block truncate">{p.title || p.name}</span>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1 block">{p.category}</span>
                        {p.deliverableContent && (
                          <span className="text-[10px] text-[#0f7af7] font-bold mt-2 bg-blue-50 px-2.5 py-1 rounded-lg inline-block border border-blue-100/30 uppercase tracking-widest">
                            {p.deliverableContent}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 border-slate-50 pt-4 sm:pt-0">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl uppercase tracking-widest border border-emerald-100/50">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Ready
                      </span>
                      {p.downloadUrl ? (
                        <a 
                          href={p.downloadUrl} 
                          target="_blank" 
                          className="flex items-center gap-2 text-xs font-bold text-[#0f7af7] hover:text-blue-700 uppercase tracking-[0.15em] transition-all bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-sm"
                        >
                          <Download className="h-4 w-4" /> Download
                        </a>
                      ) : (
                          <span className="text-[10px] font-bold text-slate-400 italic">
                            Cloud Delivery
                          </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-16 text-center">
                  <p className="text-slate-300 font-bold italic">Your library is empty.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Alerts & Tips */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Alerts</h2>
                <p className="text-[10px] font-bold text-[#0f7af7] uppercase tracking-[0.2em] mt-1">Status Updates</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="p-12 text-center">
              <Bell className="h-10 w-10 text-slate-100 mx-auto mb-4" />
              <p className="text-slate-400 text-sm font-bold italic">Checking for new updates...</p>
            </div>
          </div>

          <div className="bg-slate-950 rounded-xl p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
            <h2 className="font-bold text-xl mb-3 tracking-tight">Ecosystem Help</h2>
            <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">Need technical help with your assets or license verification?</p>
            <div className="space-y-3 relative z-10">
              <button className="w-full rounded-lg bg-white/5 py-4 text-xs font-bold text-white transition hover:bg-white/10 border border-white/10 uppercase tracking-widest">
                Priority Support
              </button>
              <button className="w-full rounded-lg bg-white py-4 text-xs font-bold text-slate-900 transition hover:bg-white/90 uppercase tracking-widest flex items-center justify-center gap-2">
                Documentation <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
