"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal, Star, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";
import * as fp from "@/lib/fpixel";


import { Loader2 } from "lucide-react";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch results based on the search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          
          // Track search event
          fp.event("Search", {
            search_string: query.trim(),
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] sm:p-6 sm:pt-[15vh] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl animate-in fade-in slide-in-from-top-10 duration-200">
        
        {/* Search Header Area */}
        <div className="border-b border-slate-100 bg-slate-50/50 p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 focus-within:border-[#0f7af7] focus-within:ring-4 focus-within:ring-[#0f7af7]/10 transition-all shadow-sm">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, or features..."
                className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
              />
              {loading ? (
                <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
              ) : query && (
                <button 
                  onClick={() => setQuery("")}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white p-3.5 text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 bg-white">
          {!query.trim() ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-slate-100 mb-4" />
              <h3 className="text-lg font-semibold text-slate-400 font-mono italic">Start typing to search products...</h3>
            </div>
          ) : results.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-slate-200 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">No results found</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm">
                We couldn&apos;t find anything matching &quot;{query}&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {results.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/products/${item.slug || item.id}`}
                  onClick={onClose}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-[#0f7af7]/30 hover:shadow-md"
                >
                  <div>
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#0f7af7]">
                          {item.category}
                        </p>
                        <h2 className="text-base font-bold text-slate-900">{item.title}</h2>
                      </div>
                      <p className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800 shrink-0">
                        ৳{item.price}
                      </p>
                    </div>
                    <p className="mb-5 text-xs text-slate-500 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700 border border-amber-200/30">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
                      {item.rating || "5.0"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-[11px] text-[#0f7af7]">
                      View Details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-4 text-xs font-semibold text-slate-500 text-center sm:text-left">
            <p>Need a custom digital asset or template for your project?</p>
            <Link 
              href="/contact" 
              onClick={onClose}
              className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 font-bold text-[#0f7af7] hover:text-[#085fc3] transition-colors"
            >
              Contact Support
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
