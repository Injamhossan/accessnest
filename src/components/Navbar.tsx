"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import navLogo from "@/assets/navlogo.png";
import GlobalSearch from "./GlobalSearch";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center pr-8">
            <Image 
              src={navLogo} 
              alt="Access Nest Logo" 
              width={140} 
              height={45} 
              className="object-contain h-8 w-auto md:h-10"
              priority
            />
          </Link>
          
          {/* Icons / Route Links */}
          <div className="flex items-center gap-6 text-slate-700">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 hover:text-sky-600 transition-colors group cursor-pointer"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-500" />
              <span className="hidden md:inline font-semibold text-sm">Search</span>
            </button>
            <Link href="/cart" className="flex items-center gap-2 hover:text-sky-600 transition-colors group">
              <div className="relative">
                 <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-500" />
                 <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[9px] font-bold text-white">0</span>
              </div>
              <span className="hidden md:inline font-semibold text-sm">Cart</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <Link href="/login" className="flex items-center gap-2 hover:text-sky-600 transition-colors group">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-500" />
              <span className="hidden md:inline font-semibold text-sm">Login / Register</span>
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
