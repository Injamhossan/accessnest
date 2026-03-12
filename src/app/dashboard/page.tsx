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

const notifColors: Record<string, string> = {
  success: "bg-emerald-500",
  info: "bg-blue-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
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
  const t = dict[lang].dashboard;

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
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-slate-500 font-medium mt-1">Monitor sales, manage products, and overview platform performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50">
            <BarChart3 className="h-4 w-4" /> Reports
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {adminStats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow">
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
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-lg">Sales Analytics</h2>
            <select className="text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="p-8 h-80 flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 65, 80, 55, 75, 50, 85, 95, 60].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div
                  className="w-full bg-blue-100 rounded-lg relative overflow-hidden group-hover:bg-blue-600 transition-all duration-300"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-lg">Recent Users</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {recentUsers.map((u: any) => (
              <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  {u.image ? (
                    <Image src={u.image} alt={u.name} width={40} height={40} className="rounded-full shrink-0" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-slate-200 shrink-0 flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-900">{u.name || "Unnamed User"}</p>
                    <p className="text-xs text-slate-500 font-medium">{u.email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md uppercase">{u.role}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors border-t border-slate-100">
            View All Users
          </button>
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <h2 className="font-bold text-slate-900 text-lg">Manage Products</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)]">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentProducts.map((product: any) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <Image src={product.image} alt={product.title || product.name || "Product"} width={40} height={40} className="rounded-lg shrink-0 object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                            <Package className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                        <span className="text-sm font-bold text-slate-900">{product.title || product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900">৳{product.price}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 pr-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Showing {recentProducts.length} products</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-600 disabled:opacity-50">Prev</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-600">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDashboard({ session, lang, realData }: { session: any; lang: keyof typeof dict; realData: any }) {
  const t = dict[lang].dashboard;

  const currentUser = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "No email",
    image: session?.user?.image,
    joinedDate: "N/A",
  };

  const totalSpent = realData?.orders
    ?.filter((o: any) => o.status === "completed")
    ?.reduce((acc: number, o: any) => acc + Number(o.totalAmount), 0) || 0;

  const stats = [
    { label: "Total Orders", value: realData?.orders?.length?.toString() || "0", icon: ShoppingBag, color: "bg-blue-50 text-blue-600", change: `${realData?.orders?.length || 0} total` },
    { label: "Total Spent", value: `৳${totalSpent.toLocaleString()}`, icon: CreditCard, color: "bg-emerald-50 text-emerald-600", change: "Verified payments" },
    { label: "Active Products", value: realData?.activeProducts?.length?.toString() || "0", icon: Package, color: "bg-violet-50 text-violet-600", change: "Downloads enabled" },
    { label: "Notifications", value: realData?.notifications?.length?.toString() || "0", icon: Bell, color: "bg-amber-50 text-amber-600", change: `${realData?.notifications?.filter((n: any) => !n.isRead).length || 0} ${t.unreadAlerts}` },
  ];

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
              {currentUser.image ? (
                <Image src={currentUser.image} alt={currentUser.name} width={56} height={56} className="object-cover" />
              ) : (
                <User className="h-7 w-7 text-white" />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-0.5">{t.title}</p>
              <h1 className="text-2xl font-bold text-slate-900">
                {t.welcome}
                {currentUser.name.split(" ")[1] || currentUser.name.split(" ")[0]}
              </h1>
              <p className="text-sm text-slate-500 font-medium">{currentUser.email}</p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {t.browseProducts}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className={`inline-flex items-center justify-center h-10 w-10 rounded-lg ${s.color} mb-4`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-sm font-medium text-slate-600 mt-1">{s.label}</p>
              {s.change && <p className="text-xs text-slate-500 mt-1.5">{s.change}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" id="orders">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h2 className="font-semibold text-slate-900">{t.recentOrders}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{t.latestPurchases}</p>
                </div>
                <button className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:gap-1.5 transition-all">
                  {t.viewAll} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {realData?.orders?.length > 0 ? (
                  realData.orders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Package className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{order.items[0]?.product?.name || "Multiple Products"}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                            <span className="font-mono text-slate-400">{order.id}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-sm text-slate-900">৳{order.totalAmount}</span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-md capitalize ${statusColors[order.status] || ""}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <p className="text-slate-400 text-sm italic">No orders found.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h2 className="font-semibold text-slate-900">{t.activeProducts}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{t.accessTo}</p>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {realData?.activeProducts?.length > 0 ? (
                  realData.activeProducts.map((p: any) => (
                    <div key={p.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                          {p.image ? (
                            <Image src={p.image} alt={p.title || p.name || "Product"} fill className="object-cover" />
                          ) : (
                            <Package className="h-6 w-6 m-3 text-slate-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{p.title || p.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{p.category}</p>
                          {p.deliverableContent && (
                            <p className="text-[10px] text-blue-600 font-bold mt-1 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                              {p.deliverableContent}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="h-3.5 w-3.5" /> {t.active}
                        </span>
                        {p.downloadUrl ? (
                          <a 
                            href={p.downloadUrl} 
                            target="_blank" 
                            className="mt-2 block w-full text-right text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider"
                          >
                            <Download className="h-3.5 w-3.5 inline mr-1" /> {t.download}
                          </a>
                        ) : (
                           <span className="mt-2 block w-full text-right text-xs font-medium text-slate-400 italic">
                             Automated Delivery
                           </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <p className="text-slate-400 text-sm italic">No active products.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h2 className="font-semibold text-slate-900">{t.notifications}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">0 {t.unreadAlerts}</p>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">{t.markRead}</button>
              </div>
              <div className="p-10 text-center">
                <Bell className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                <p className="text-slate-400 text-sm italic">Stay tuned for updates!</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 text-white shadow-sm">
              <h2 className="font-semibold text-lg mb-2">{t.needHelp}</h2>
              <p className="text-sm text-slate-300 mb-6">{t.helpDesc}</p>
              <div className="space-y-3">
                <button className="w-full rounded-lg bg-slate-700 py-2.5 text-sm font-medium text-white transition hover:bg-slate-600">
                  {t.contactSupport}
                </button>
                <button className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-slate-900 transition hover:bg-white/90">
                  {t.viewDoc}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
