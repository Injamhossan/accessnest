"use client";

import { useState, useEffect } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ShieldCheck,
  BarChart3,
  Settings,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const statusBadge: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
};

const navLinks = [
  { label: "Overview", icon: BarChart3, active: true, href: "/admin/dashboard" },
  { label: "Users", icon: Users, active: false, href: "/dashboard/manage-users" },
  { label: "Products", icon: Package, active: false, href: "/dashboard/manage-products" },
  { label: "Orders", icon: ShoppingBag, active: false, href: "/dashboard/orders" },
  { label: "Settings", icon: Settings, active: false, href: "/dashboard/settings" },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/dashboard/summary");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchSummary();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-bold">Loading Admin Insights...</p>
        </div>
      </div>
    );
  }

  if (session?.user?.role !== "admin" && session?.user?.role !== "superadmin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-red-100 shadow-xl text-center">
          <div className="h-16 w-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Unauthorized Access</h2>
          <p className="text-slate-500 font-medium mb-8">You do not have the required permissions to view the admin dashboard.</p>
          <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Users",
      value: data?.stats?.userCount || 0,
      change: "+0%",
      up: true,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-300/30",
    },
    {
      label: "Total Revenue",
      value: `৳${data?.stats?.revenue || 0}`,
      change: "+0%",
      up: true,
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-300/30",
    },
    {
      label: "Total Orders",
      value: data?.stats?.orderCount || 0,
      change: "+0%",
      up: true,
      icon: ShoppingBag,
      color: "from-violet-500 to-violet-600",
      shadow: "shadow-violet-300/30",
    },
    {
      label: "Products",
      value: data?.stats?.productCount || 0,
      change: "+0%",
      up: true,
      icon: Package,
      color: "from-amber-500 to-amber-600",
      shadow: "shadow-amber-300/30",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white fixed top-0 left-0 h-full z-40 pt-6 pb-8">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#0f7af7] to-[#0452ab] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-white text-base leading-tight">AccessNest</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                link.active
                  ? "bg-[#0f7af7] text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <link.icon className="h-4.5 w-4.5" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 mt-6">
          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-xs font-bold text-slate-300 mb-0.5">Logged in as</p>
            <p className="text-sm font-extrabold text-white truncate">{session?.user?.name || "Admin"}</p>
            <span className="inline-block mt-1 text-[10px] font-bold bg-[#0f7af7]/20 text-[#60aaff] border border-[#0f7af7]/30 px-2 py-0.5 rounded-full uppercase">
              {session?.user?.role}
            </span>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* ── Page Header ── */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0f7af7] mb-0.5">Overview</p>
              <h1 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-500 font-medium mt-1">Live platform analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <Eye className="h-4 w-4" />
                View Site
              </Link>
              <Link
                href="/dashboard/manage-products"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#0f7af7] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-300/30 transition hover:bg-[#085fc3]"
              >
                <Package className="h-4 w-4" />
                Add Product
              </Link>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative"
              >
                <div className={`absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br ${s.color} opacity-5 -translate-y-8 translate-x-8`} />
                <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} shadow-lg ${s.shadow} mb-4`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-2xl font-black text-slate-900 truncate">{s.value}</p>
                <p className="text-sm font-semibold text-slate-600 mt-0.5">{s.label}</p>
                <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                  {s.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {s.change} growth
                </div>
              </div>
            ))}
          </div>

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Col: Recent Users + Recent Products */}
            <div className="lg:col-span-2 space-y-6">

              {/* Recent Products */}
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-900">Newly Added Products</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Latest digital assets in the catalog</p>
                  </div>
                  <Link href="/dashboard/manage-products" className="text-xs font-bold text-[#0f7af7] flex items-center gap-1 hover:gap-2 transition-all">
                    Manage all <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="text-left px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Product</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                        <th className="text-right px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Price</th>
                        <th className="text-right px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {data?.recentProducts?.length > 0 ? (
                        data.recentProducts.map((p: any) => (
                          <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-3.5">
                              <p className="font-bold text-slate-800 text-sm truncate max-w-[200px]">{p.title}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{p.id.substring(0, 8)}...</p>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                                {p.category}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-right font-black text-slate-900">৳{p.price}</td>
                            <td className="px-6 py-3.5 text-right">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${p.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
                                {p.isActive ? "Active" : "Draft"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium italic">No products yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Users */}
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-900">Recent Users</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Latest registrations</p>
                  </div>
                  <Link href="/dashboard/manage-users" className="text-xs font-bold text-[#0f7af7] flex items-center gap-1 hover:gap-2 transition-all">
                    Manage <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="divide-y divide-slate-50">
                  {data?.recentUsers?.length > 0 ? (
                    data.recentUsers.map((u: any) => (
                      <div key={u.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-sm font-black text-slate-600 overflow-hidden">
                            {u.image ? <img src={u.image} alt={u.name} /> : u.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{u.name || "Anonymous"}</p>
                            <p className="text-xs text-slate-400 truncate max-w-[150px]">{u.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${u.role === "admin" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                            {u.role}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-10 text-center text-slate-400 font-medium italic">No users found.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Platform Status */}
            <div className="space-y-6">

              <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold">Growth Target</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Monthly Goal</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-400">Sales Velocity</span>
                      <span>85%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[85%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-400">User Retention</span>
                      <span>92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[92%] rounded-full" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-400">Status: <span className="text-emerald-400 font-bold">EXCELLENT</span></p>
                  <ArrowUpRight className="h-4 w-4 text-slate-500" />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/dashboard/settings" className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                    <Settings className="h-5 w-5 text-slate-400 group-hover:text-blue-600 mb-2" />
                    <span className="text-[11px] font-bold text-slate-600 group-hover:text-blue-700">Settings</span>
                  </Link>
                  <Link href="/admin/dashboard" className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                    <BarChart3 className="h-5 w-5 text-slate-400 group-hover:text-blue-600 mb-2" />
                    <span className="text-[11px] font-bold text-slate-600 group-hover:text-blue-700">Analytics</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
