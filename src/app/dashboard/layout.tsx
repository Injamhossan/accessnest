"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { 
  Home, 
  ShoppingBag, 
  CreditCard, 
  Settings, 
  User, 
  ArrowLeft, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck,
  LayoutDashboard
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import Image from "next/image";
import navLogo from "@/assets/navlogo.png";
import iconLogo from "@/assets/icon-02.png";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLangStore();
  const t = dict[lang].dashboardLayout;
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin" || (session?.user as any)?.role === "superadmin";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ redirect: false, callbackUrl: "/" });
      router.push("/");
      router.refresh();
    } catch {
      window.location.href = "/";
    }
  }, [router]);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-xl font-bold border border-blue-100 shadow-sm"
      : "flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-semibold transition-all group";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
            <Image src={navLogo} alt="Logo" width={110} height={36} className="h-10 w-auto object-contain" />
        </Link>
        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-lg">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-6 py-4 space-y-1.5 overflow-y-auto">
        <Link href="/dashboard" className={getLinkClass("/dashboard")}> 
          <Home className="h-5 w-5" /> 
          <span className="flex-1">{t.overview}</span>
        </Link>

        {isAdmin && (
          <>
            <div className="pt-6 pb-2 px-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Manage</p>
            </div>
            <Link href="/dashboard/manage-products" className={getLinkClass("/dashboard/manage-products")}>
              <ShoppingBag className="h-5 w-5" /> Products
            </Link>
            <Link href="/dashboard/manage-users" className={getLinkClass("/dashboard/manage-users")}>
              <User className="h-5 w-5" /> Users
            </Link>
            <Link href="/dashboard/all-sales" className={getLinkClass("/dashboard/all-sales")}>
              <CreditCard className="h-5 w-5" /> Sales
            </Link>
          </>
        )}

        <div className="pt-6 pb-2 px-4 border-t border-slate-50 mt-4">
           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account</p>
        </div>
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

      {/* Sidebar Footer */}
      <div className="p-6 space-y-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Secure session</span>
          </div>
          <p className="text-[10px] font-medium text-slate-400 leading-tight">Data protected by 256-bit encryption.</p>
        </div>
        <div className="pt-2 flex flex-col gap-1">
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all text-sm">
            <LogOut className="h-4 w-4" /> {t.logout}
          </button>
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-semibold transition-all text-sm">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex">
      {/* Desktop Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-200 hidden lg:flex flex-col shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] transition-opacity duration-300 lg:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-80 h-full bg-white shadow-2xl transition-transform duration-500 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent />
        </div>
      </div>
      
      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 sticky top-0 z-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/dashboard" className="flex items-center">
              <Image src={iconLogo} alt="Logo" width={32} height={32} className="h-8 w-auto object-contain" />
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden">
                {session?.user?.image ? (
                  <Image src={session.user.image} alt="User" width={40} height={40} className="object-cover" />
                ) : (
                  <User className="h-5 w-5 text-blue-500" />
                )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
