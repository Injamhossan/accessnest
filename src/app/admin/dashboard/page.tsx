"use client";

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
} from "lucide-react";
import Link from "next/link";

// ── Mock Data ────────────────────────────────────────────
const stats = [
  {
    label: "Total Users",
    value: "3,482",
    change: "+12.4%",
    up: true,
    icon: Users,
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-300/30",
  },
  {
    label: "Total Revenue",
    value: "$48,320",
    change: "+8.2%",
    up: true,
    icon: DollarSign,
    color: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-300/30",
  },
  {
    label: "Total Orders",
    value: "1,241",
    change: "+5.7%",
    up: true,
    icon: ShoppingBag,
    color: "from-violet-500 to-violet-600",
    shadow: "shadow-violet-300/30",
  },
  {
    label: "Pending Approvals",
    value: "18",
    change: "-3",
    up: false,
    icon: AlertTriangle,
    color: "from-amber-500 to-amber-600",
    shadow: "shadow-amber-300/30",
  },
];

const recentOrders = [
  { id: "ORD-0091", user: "Injam Hossain", product: "AI Assistant Plus", amount: "$19.00", status: "completed", date: "Mar 8, 2026" },
  { id: "ORD-0090", user: "Sarah Khan", product: "Cloud Storage Pro", amount: "$9.00", status: "pending", date: "Mar 8, 2026" },
  { id: "ORD-0089", user: "Michael Lee", product: "Creative Suite Max", amount: "$29.00", status: "completed", date: "Mar 7, 2026" },
  { id: "ORD-0088", user: "Ana Silva", product: "Marketing Assets", amount: "$14.00", status: "cancelled", date: "Mar 7, 2026" },
  { id: "ORD-0087", user: "James Patel", product: "AI Assistant Plus", amount: "$19.00", status: "processing", date: "Mar 6, 2026" },
];

const pendingApprovals = [
  { id: "VA-041", user: "Alex Fernandez", resource: "Admin Panel", requestedAt: "2h ago" },
  { id: "VA-040", user: "Rita Okafor", resource: "Analytics Dashboard", requestedAt: "5h ago" },
  { id: "VA-039", user: "David Kim", resource: "Product Management", requestedAt: "1d ago" },
];

const topProducts = [
  { name: "AI Assistant Plus", category: "Automation", sold: 420, revenue: "$7,980", trend: "+12%" },
  { name: "Creative Suite Max", category: "Design Tools", sold: 310, revenue: "$8,990", trend: "+8%" },
  { name: "Cloud Storage Pro", category: "Security", sold: 280, revenue: "$2,520", trend: "+5%" },
  { name: "Marketing Assets", category: "Growth", sold: 231, revenue: "$3,234", trend: "+2%" },
];

const recentUsers = [
  { name: "Injam Hossain", email: "injam@example.com", role: "admin", joined: "Mar 8, 2026", status: "active" },
  { name: "Sarah Khan", email: "sarah@example.com", role: "user", joined: "Mar 7, 2026", status: "active" },
  { name: "Michael Lee", email: "michael@example.com", role: "user", joined: "Mar 6, 2026", status: "inactive" },
  { name: "Ana Silva", email: "ana@example.com", role: "user", joined: "Mar 5, 2026", status: "active" },
];

const statusBadge: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
};

const navLinks = [
  { label: "Overview", icon: BarChart3, active: true },
  { label: "Users", icon: Users, active: false },
  { label: "Products", icon: Package, active: false },
  { label: "Orders", icon: ShoppingBag, active: false },
  { label: "Access Logs", icon: ShieldCheck, active: false },
  { label: "Settings", icon: Settings, active: false },
];

// ─────────────────────────────────────────────────────────

export default function AdminDashboard() {
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
            <button
              key={link.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                link.active
                  ? "bg-[#0f7af7] text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <link.icon className="h-4.5 w-4.5" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="px-4 mt-6">
          <div className="rounded-2xl bg-slate-800 p-4">
            <p className="text-xs font-bold text-slate-300 mb-0.5">Logged in as</p>
            <p className="text-sm font-extrabold text-white">Injam Hossain</p>
            <span className="inline-block mt-1 text-[10px] font-bold bg-[#0f7af7]/20 text-[#60aaff] border border-[#0f7af7]/30 px-2 py-0.5 rounded-full">
              ADMIN
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
              <p className="text-sm text-slate-500 font-medium mt-1">Sunday, March 8, 2026</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <Eye className="h-4 w-4" />
                View Site
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#0f7af7] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-300/30 transition hover:bg-[#085fc3]"
              >
                <ArrowUpRight className="h-4 w-4" />
                Go Live
              </Link>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative"
              >
                <div className={`absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br ${s.color} opacity-5 -translate-y-8 translate-x-8`} />
                <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} shadow-lg ${s.shadow} mb-4`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-2xl font-black text-slate-900">{s.value}</p>
                <p className="text-sm font-semibold text-slate-600 mt-0.5">{s.label}</p>
                <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                  {s.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {s.change} vs last month
                </div>
              </div>
            ))}
          </div>

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left: Orders + Users */}
            <div className="lg:col-span-2 space-y-6">

              {/* Recent Orders */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-900">Recent Orders</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Latest platform transactions</p>
                  </div>
                  <button className="text-xs font-bold text-[#0f7af7] flex items-center gap-1 hover:gap-2 transition-all">
                    View all <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="text-left px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Product</th>
                        <th className="text-right px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                        <th className="text-right px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {recentOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-3.5 font-mono text-xs text-slate-500 font-bold">{o.id}</td>
                          <td className="px-4 py-3.5">
                            <p className="font-semibold text-slate-800 text-sm">{o.user}</p>
                            <p className="text-xs text-slate-400">{o.date}</p>
                          </td>
                          <td className="px-4 py-3.5 text-slate-600 text-sm hidden md:table-cell">{o.product}</td>
                          <td className="px-4 py-3.5 text-right font-bold text-slate-900">{o.amount}</td>
                          <td className="px-6 py-3.5 text-right">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border capitalize ${statusBadge[o.status]}`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Users */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-900">Recent Users</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Newly registered accounts</p>
                  </div>
                  <button className="text-xs font-bold text-[#0f7af7] flex items-center gap-1 hover:gap-2 transition-all">
                    Manage <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="divide-y divide-slate-50">
                  {recentUsers.map((u) => (
                    <div key={u.email} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-sm font-black text-slate-600">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${u.role === "admin" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                          {u.role}
                        </span>
                        <span className={`flex items-center gap-1 text-[11px] font-bold ${u.status === "active" ? "text-emerald-600" : "text-slate-400"}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-slate-300"}`} />
                          {u.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">

              {/* Pending Access Approvals */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-900">Pending Approvals</h2>
                    <p className="text-xs text-slate-400 mt-0.5">{pendingApprovals.length} access requests</p>
                  </div>
                </div>
                <div className="divide-y divide-slate-50">
                  {pendingApprovals.map((a) => (
                    <div key={a.id} className="px-5 py-4 hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{a.user}</p>
                          <p className="text-xs text-slate-400">
                            <span className="font-bold text-slate-500">{a.resource}</span> · {a.requestedAt}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Clock className="h-2.5 w-2.5" /> Pending
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2 text-xs font-bold text-white transition hover:bg-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-200">
                          <XCircle className="h-3.5 w-3.5" /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-900">Top Products</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Best performing this month</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="divide-y divide-slate-50">
                  {topProducts.map((p, i) => (
                    <div key={p.name} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-300 w-4">{i + 1}</span>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.category} · {p.sold} sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900">{p.revenue}</p>
                        <span className="text-[10px] font-bold text-emerald-600">{p.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
