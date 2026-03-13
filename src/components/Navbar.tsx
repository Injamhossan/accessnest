"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Globe, LogOut, LogIn, Menu, X, ChevronRight, LayoutDashboard, Loader2, Star, ArrowRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import navLogo from "@/assets/navlogo.png";
import iconLogo from "@/assets/icon-02.png";
import GlobalSearch from "./GlobalSearch";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { lang, toggleLang } = useLangStore();
  const t = dict[lang as keyof typeof dict]?.nav || { home: "Home", products: "Products", about: "About", contact: "Contact", search: "Search", cart: "Cart", dashboard: "Dashboard" };
  const { data: session, status } = useSession();
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const router = useRouter();


  useEffect(() => {
    setMounted(true);
  }, []);

  // Live Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.slice(0, 5)); // Only show top 5 in dropdown
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[60]">
        <nav className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 max-w-7xl mx-auto">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src={navLogo} 
              alt="Access Nest" 
              width={120} 
              height={40} 
              className="h-12 w-auto md:h-10 object-contain drop-shadow-sm" 
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-[#0f7af7] transition-all">{t.home}</Link>
            <Link href="/products" className="text-sm font-semibold text-slate-600 hover:text-[#0f7af7] transition-all">{t.products}</Link>
            <Link href="/about" className="text-sm font-semibold text-slate-600 hover:text-[#0f7af7] transition-all">{t.about}</Link>
            <Link href="/contact" className="text-sm font-semibold text-slate-600 hover:text-[#0f7af7] transition-all">{t.contact}</Link>
          </div>
          
          {/* Icons / Route Links */}
          <div className="flex items-center gap-2 md:gap-4 lg:gap-6 text-slate-700">
            {/* Language Toggle */}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all shadow-sm group"
            >
              <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 group-hover:text-[#0f7af7]" />
              <span className="font-bold text-[10px] md:text-xs uppercase force-english-font text-slate-600">{lang}</span>
            </button>

            <div className="hidden md:flex items-center relative group">
              <div className="relative flex items-center">
                <Search 
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#0f7af7] transition-colors z-10 cursor-pointer" 
                  onClick={handleSearchSubmit}
                />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder={t.search + "..."}
                  className="w-40 lg:w-64 pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-extrabold outline-none focus:bg-white focus:border-[#0f7af7] focus:ring-4 focus:ring-[#0f7af7]/5 transition-all force-english-font"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchSubmit();
                  }}
                />
                {isSearching && (
                  <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3 w-3 text-blue-600 animate-spin" />
                )}
              </div>

              {/* Live Search Dropdown */}
              {showDropdown && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 space-y-1">
                    {searchResults.length > 0 ? (
                      <>
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug || product.id}`}
                            onClick={() => {
                              setShowDropdown(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all group"
                          >
                            <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                               <Image src={product.image} alt={product.title} width={40} height={40} className="object-cover h-full w-full" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-bold text-slate-900 truncate">{product.title}</p>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold text-[#0f7af7]">৳{product.price}</span>
                                <span className="text-[9px] text-slate-400 font-medium">• {product.category}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-slate-900 transition-colors shrink-0" />
                          </Link>
                        ))}
                        <button 
                          onClick={handleSearchSubmit}
                          className="w-full mt-1 p-2 text-[10px] font-bold text-[#0f7af7] hover:bg-blue-50/50 text-center rounded-lg transition-all"
                        >
                          View all results for &quot;{searchQuery}&quot;
                        </button>
                      </>
                    ) : !isSearching && (
                      <div className="p-4 text-center">
                        <p className="text-[10px] font-bold text-slate-400">No products found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Click backdrop to close dropdown */}
            {showDropdown && searchQuery && (
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setShowDropdown(false)}
              />
            )}

            <button 
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 hover:bg-slate-50 rounded-xl transition-all group cursor-pointer"
            >
              <Search className="w-5 h-5 text-slate-500 group-hover:text-[#0f7af7]" />
            </button>

            <Link href="/cart" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-all group">
              <div className="relative">
                 <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-500 group-hover:text-[#0f7af7]" />
                 {mounted && cartItemsCount > 0 && (
                   <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0f7af7] text-[9px] font-bold text-white animate-in zoom-in duration-300">
                     {cartItemsCount}
                   </span>
                 )}
              </div>
              <span className="hidden lg:inline font-semibold text-sm text-slate-600">{t.cart}</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 hidden md:block mx-1"></div>
            
            {status === "authenticated" ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-all group">
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-500 group-hover:text-[#0f7af7]" />
                  <span className="hidden lg:inline font-semibold text-sm text-slate-600">{t.dashboard}</span>
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all group cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95">
                <LogIn className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}

          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-[80%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-10">
              <Image src={navLogo} alt="Logo" width={120} height={40} className="h-8 w-auto object-contain" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { label: t.home, href: "/" },
                { label: t.products, href: "/products" },
                { label: t.about, href: "/about" },
                { label: t.contact, href: "/contact" },
              ].map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 rounded-2xl text-slate-600 font-semibold hover:bg-slate-50 hover:text-[#0f7af7] transition-all group"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-slate-100">
              {status === "authenticated" ? (
                <div className="space-y-3">
                  <Link 
                    href="/dashboard" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 text-slate-900 font-bold"
                  >
                    <User className="w-5 h-5 text-[#0f7af7]" />
                    {t.dashboard}
                  </Link>
                  <button 
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                    }}
                    className="flex w-full items-center gap-3 p-4 rounded-2xl text-red-500 font-semibold hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#0f7af7] text-white font-bold"
                >
                  <LogIn className="w-5 h-5" />
                  Login Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Global Search Overlay */}
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
