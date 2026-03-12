"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, CreditCard, Settings, User, ArrowLeft, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLangStore();
  const t = dict[lang].dashboardLayout;
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ redirect: false, callbackUrl: "/" });
      router.push("/");
      router.refresh();
    } catch {
      // Final fallback if client navigation fails.
      window.location.href = "/";
    }
  }, [router]);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "flex items-center gap-3 px-3 py-2.5 text-blue-700 bg-blue-50 rounded-lg font-semibold border border-blue-100/50"
      : "flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-colors";
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm font-semibold whitespace-nowrap"
      : "px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium whitespace-nowrap";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Side Panel */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{t.title}</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/dashboard" className={getLinkClass("/dashboard")}>
            <Home className="h-5 w-5" /> {t.overview}
          </Link>
          <Link href="/dashboard/orders" className={getLinkClass("/dashboard/orders")}>
            <ShoppingBag className="h-5 w-5" /> {t.orders}
          </Link>
          <Link href="/dashboard/billing" className={getLinkClass("/dashboard/billing")}>
            <CreditCard className="h-5 w-5" /> {t.billing}
          </Link>
          <Link href="/dashboard/profile" className={getLinkClass("/dashboard/profile")}>
            <User className="h-5 w-5" /> {t.profile}
          </Link>
          <Link href="/dashboard/settings" className={getLinkClass("/dashboard/settings")}>
            <Settings className="h-5 w-5" /> {t.settings}
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-100 flex flex-col gap-1">
          <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-colors w-full text-left">
            <LogOut className="h-5 w-5" /> {t.logout}
          </button>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            <ArrowLeft className="h-5 w-5" /> Back to Home
          </Link>
        </div>
      </aside>
      
      {/* Mobile Nav Top Scroll */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex overflow-x-auto gap-2 shadow-sm relative z-10 sticky top-0">
        <Link href="/" className="px-4 py-2 flex items-center gap-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-medium whitespace-nowrap">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        <div className="w-px h-6 bg-slate-200 shrink-0 mx-1 self-center"></div>
        <Link href="/dashboard" className={getMobileLinkClass("/dashboard")}>{t.overview}</Link>
        <Link href="/dashboard/orders" className={getMobileLinkClass("/dashboard/orders")}>{t.orders}</Link>
        <Link href="/dashboard/billing" className={getMobileLinkClass("/dashboard/billing")}>{t.billing}</Link>
        <Link href="/dashboard/profile" className={getMobileLinkClass("/dashboard/profile")}>{t.profile}</Link>
        <Link href="/dashboard/settings" className={getMobileLinkClass("/dashboard/settings")}>{t.settings}</Link>
        <div className="w-px h-6 bg-slate-200 shrink-0 mx-1 self-center"></div>
        <button onClick={handleSignOut} className="px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium whitespace-nowrap">
          <LogOut className="h-4 w-4" /> {t.logout}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}
