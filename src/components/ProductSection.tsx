"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { Loader2 } from "lucide-react";

export default function ProductSection() {
  const { lang } = useLangStore();
  const t = dict[lang].productSection;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          // Take only first 3 featured products or just first 3
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-12 md:py-16 mx-auto w-full max-w-7xl px-4">
      <article className="mx-auto w-full">
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <hgroup className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-sky-600"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-600">{t.badge}</p>
            </div>
            <h2 className="text-3xl font-black text-slate-900 md:text-5xl tracking-tight leading-none">
              {t.title1}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-blue-500 mt-1">{t.title2}</span>
            </h2>
            <p className="mt-5 text-sm text-slate-500 md:text-base font-medium leading-relaxed max-w-xl">
              {t.desc}
            </p>
          </hgroup>
          <Link href="/products" className="group rounded-xl flex items-center justify-center border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-sky-200 hover:text-sky-700 hover:bg-slate-50 active:scale-[0.98]">
            {t.btn}
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-sky-600 animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <li key={product.id} className="list-none">
                <ProductCard 
                  id={product.id}
                  slug={product.slug}
                  title={product.title}
                  description={product.description}
                  price={`৳${product.price}`}
                  rating={product.rating || 0}
                  reviews={product.reviews || 0}
                  image={product.image || "https://placehold.co/600x400/png?text=Product"}
                  category={product.category}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-semibold">{t.noProducts || "No products available yet."}</p>
          </div>
        )}
      </article>
    </section>
  );
}
