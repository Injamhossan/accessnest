"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Globe } from "lucide-react";
import navLogo from "@/assets/navlogo.png";
import GlobalSearch from "./GlobalSearch";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { lang, toggleLang } = useLangStore();
  const t = dict[lang].nav;
  const cartItemsCount = useCartStore((state) => state.getTotalItems());

  return (
    <>
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src={navLogo} 
              alt="Access Nest Logo" 
              width={140} 
              height={45} 
              className="object-contain h-8 w-auto md:h-10"
              priority
            />
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors">{t.home}</Link>
            <Link href="/products" className="text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors">{t.products}</Link>
            <Link href="/about" className="text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors">{t.about}</Link>
            <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors">{t.contact}</Link>
          </div>
          
          {/* Icons / Route Links */}
          <div className="flex items-center gap-4 lg:gap-6 text-slate-700">
            {/* Language Toggle */}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-sky-600 transition-colors"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span className="font-bold text-xs uppercase force-english-font">{lang}</span>
            </button>

            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 hover:text-sky-600 transition-colors group cursor-pointer"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-500" />
              <span className="hidden md:inline font-semibold text-sm">{t.search}</span>
            </button>
            <Link href="/cart" className="flex items-center gap-2 hover:text-sky-600 transition-colors group">
              <div className="relative">
                 <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-500" />
                 {cartItemsCount > 0 && (
                   <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[9px] font-bold text-white animate-in zoom-in duration-300">
                     {cartItemsCount}
                   </span>
                 )}
              </div>
              <span className="hidden md:inline font-semibold text-sm">{t.cart}</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <Link href="/dashboard" className="flex items-center gap-2 hover:text-sky-600 transition-colors group">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-500" />
              <span className="hidden md:inline font-semibold text-sm">{t.dashboard}</span>
            </Link>
          </div>
        </nav>
      </header>
      
      {/* Global Search Overlay */}
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
