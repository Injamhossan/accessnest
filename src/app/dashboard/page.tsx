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
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

// ── Mock Data ────────────────────────────────────────────
const user = {
  name: "Injam Hossain",
  email: "injam@example.com",
  image: null,
  joinedDate: "March 2025",
};

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
  const { lang } = useLangStore();
  const t = dict[lang].dashboard;

  const stats = [
    { label: "Total Orders", value: "12", icon: ShoppingBag, color: "bg-blue-50 text-blue-600", change: "+2 this month" },
    { label: "Total Spent", value: "$186", icon: CreditCard, color: "bg-emerald-50 text-emerald-600", change: "+$38 this month" },
    { label: "Active Products", value: "5", icon: Package, color: "bg-violet-50 text-violet-600", change: "" },
    { label: "Notifications", value: "3", icon: Bell, color: "bg-amber-50 text-amber-600", change: `3 ${t.unreadAlerts}` },
  ];

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* ── Header ── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-0.5">{t.title}</p>
              <h1 className="text-2xl font-bold text-slate-900">{t.welcome}{user.name.split(" ")[0]}</h1>
              <p className="text-sm text-slate-500 font-medium">{user.email} · {t.memberSince}{user.joinedDate}</p>
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

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className={`inline-flex items-center justify-center h-10 w-10 rounded-lg ${s.color} mb-4`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-sm font-medium text-slate-600 mt-1">{lang === "bn" ? s.label : s.label}</p>
              {s.change && <p className="text-xs text-slate-500 mt-1.5">{s.change}</p>}
            </div>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Orders + Active Products */}
          <div className="lg:col-span-2 space-y-6">

            {/* Recent Orders */}
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
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Package className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{order.product}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" /> {order.date} · <span className="font-mono text-slate-400">{order.id}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-sm text-slate-900">{order.amount}</span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-md capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Products */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h2 className="font-semibold text-slate-900">{t.activeProducts}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{t.accessTo}</p>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {activeProducts.map((p) => (
                  <div key={p.name} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                        <Image src={p.img} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{p.category}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-medium text-slate-700">{p.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="h-3.5 w-3.5" /> {t.active}
                      </span>
                      <p className="text-xs text-slate-500 mt-2">{t.expires} {p.expires}</p>
                      <button className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                        <Download className="h-3.5 w-3.5" /> {t.download}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Notifications */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h2 className="font-semibold text-slate-900">{t.notifications}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">3 {t.unreadAlerts}</p>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">{t.markRead}</button>
              </div>
              <div className="divide-y divide-slate-100">
                {notifications.map((n, i) => (
                  <div key={i} className="flex gap-3 px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${notifColors[n.type]}`} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{n.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{n.message}</p>
                      <p className="text-xs text-slate-400 mt-2">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions - Normal styling */}
            <div className="bg-slate-800 rounded-xl p-6 text-white shadow-sm">
              <h2 className="font-semibold text-lg mb-2">{t.needHelp}</h2>
              <p className="text-sm text-slate-300 mb-6">{t.helpDesc}</p>
              <div className="space-y-3">
                <button className="w-full rounded-lg bg-slate-700 py-2.5 text-sm font-medium text-white transition hover:bg-slate-600">
                  {t.contactSupport}
                </button>
                <button className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
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
