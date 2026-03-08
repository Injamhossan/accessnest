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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── Mock Data ────────────────────────────────────────────
const user = {
  name: "Injam Hossain",
  email: "injam@example.com",
  image: null,
  joinedDate: "March 2025",
};

const stats = [
  { label: "Total Orders", value: "12", icon: ShoppingBag, color: "bg-blue-50 text-blue-600", change: "+2 this month" },
  { label: "Total Spent", value: "$186", icon: CreditCard, color: "bg-emerald-50 text-emerald-600", change: "+$38 this month" },
  { label: "Active Products", value: "5", icon: Package, color: "bg-violet-50 text-violet-600", change: "" },
  { label: "Notifications", value: "3", icon: Bell, color: "bg-amber-50 text-amber-600", change: "3 unread" },
];

const recentOrders = [
  { id: "ORD-001", product: "Cloud Storage Pro", date: "Mar 8, 2026", amount: "$9.00", status: "completed" },
  { id: "ORD-002", product: "AI Assistant Plus", date: "Feb 28, 2026", amount: "$19.00", status: "completed" },
  { id: "ORD-003", product: "Creative Suite Max", date: "Feb 14, 2026", amount: "$29.00", status: "completed" },
  { id: "ORD-004", product: "Marketing Assets", date: "Jan 30, 2026", amount: "$14.00", status: "cancelled" },
];

const activeProducts = [
  { name: "Cloud Storage Pro", category: "Security & Storage", rating: 4.8, expires: "Mar 8, 2027", img: "/images/cloud.png" },
  { name: "AI Assistant Plus", category: "Automation", rating: 4.9, expires: "Feb 28, 2027", img: "/images/ai.png" },
];

const notifications = [
  { title: "Order Confirmed", message: "Your order ORD-001 has been confirmed.", type: "success", time: "2h ago" },
  { title: "New Product Available", message: "Analytics Pro is now available!", type: "info", time: "1d ago" },
  { title: "Payment Due", message: "Your subscription renews in 5 days.", type: "warning", time: "2d ago" },
];

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

// ─────────────────────────────────────────────────────────

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <div className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0f7af7] to-[#0452ab] flex items-center justify-center shadow-lg shadow-blue-200">
              <User className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0f7af7] mb-0.5">User Dashboard</p>
              <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {user.name.split(" ")[0]} 👋</h1>
              <p className="text-sm text-slate-500 font-medium">{user.email} · Member since {user.joinedDate}</p>
            </div>
          </div>
          <Link
            href="/"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-2xl bg-[#0f7af7] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-300/30 transition hover:bg-[#085fc3] hover:shadow-xl hover:-translate-y-px"
          >
            Browse Products
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${s.color} mb-4`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">{s.label}</p>
              {s.change && <p className="text-xs text-slate-400 mt-1">{s.change}</p>}
            </div>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Orders + Active Products */}
          <div className="lg:col-span-2 space-y-6">

            {/* Recent Orders */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h2 className="font-bold text-slate-900">Recent Orders</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Your latest purchases</p>
                </div>
                <button className="text-xs font-bold text-[#0f7af7] flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Package className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{order.product}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" /> {order.date} · <span className="font-mono">{order.id}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-slate-900">{order.amount}</span>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Products */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h2 className="font-bold text-slate-900">Active Products</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Products you have access to</p>
                </div>
              </div>
              <div className="divide-y divide-slate-50">
                {activeProducts.map((p) => (
                  <div key={p.name} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-2xl overflow-hidden border border-slate-100 shrink-0">
                        <Image src={p.img} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{p.category}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-amber-600">{p.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="h-3 w-3" /> Active
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1.5">Expires {p.expires}</p>
                      <button className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-[#0f7af7] hover:underline">
                        <Download className="h-3 w-3" /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Notifications */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h2 className="font-bold text-slate-900">Notifications</h2>
                  <p className="text-xs text-slate-400 mt-0.5">3 unread alerts</p>
                </div>
                <button className="text-xs font-bold text-[#0f7af7]">Mark all read</button>
              </div>
              <div className="divide-y divide-slate-50">
                {notifications.map((n, i) => (
                  <div key={i} className="flex gap-3 px-5 py-4 hover:bg-slate-50/60 transition-colors">
                    <div className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${notifColors[n.type]}`} />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5 font-medium">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#0f7af7] to-[#0452ab] rounded-3xl p-6 text-white shadow-xl shadow-blue-300/30">
              <h2 className="font-extrabold text-lg mb-1">Need Help?</h2>
              <p className="text-sm text-blue-100 mb-5 leading-relaxed">Contact our support team or browse the documentation to get started quickly.</p>
              <div className="space-y-3">
                <button className="w-full rounded-2xl bg-white/20 border border-white/20 backdrop-blur-sm py-2.5 text-sm font-bold text-white transition hover:bg-white/30">
                  Contact Support
                </button>
                <button className="w-full rounded-2xl bg-white py-2.5 text-sm font-bold text-[#0f7af7] transition hover:bg-blue-50">
                  View Documentation
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
