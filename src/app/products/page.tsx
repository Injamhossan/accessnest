"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filter, Loader2, Package } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ProductList() {
  const { lang } = useLangStore();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const t = dict[lang].products;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = search 
          ? `/api/products?search=${encodeURIComponent(search)}`
          : "/api/products";
        const res = await fetch(url, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto">
      
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
            <p className="mt-2 text-slate-500">
              {search ? (
                <>Found {products.length} results for &quot;<span className="text-[#0f7af7] font-bold">{search}</span>&quot;</>
              ) : t.desc}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" /> {t.filters}
            </button>
            <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 outline-none transition-colors shadow-sm cursor-pointer">
              <option>{t.sortFeatured}</option>
              <option>{t.sortLowToHigh}</option>
              <option>{t.sortHighToLow}</option>
              <option>{t.sortRated}</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="h-12 w-12 text-sky-600 animate-spin" />
            <p className="mt-4 text-slate-500 font-bold">Searching premium products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
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
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Package className="h-16 w-16 text-slate-200 mb-4" />
            <p className="text-slate-500 font-bold text-xl">No products found</p>
            <p className="text-slate-400 mt-2">Adjust your filters or try a different keyword.</p>
          </div>
        )}

        {/* Load More */}
        {products.length > 0 && (
          <div className="mt-16 flex justify-center">
            <button className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-sky-600 hover:text-sky-600 transition-colors">
              {t.loadMore}
            </button>
          </div>
        )}
      </div>
  );
}

export default function AllProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-6">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="h-12 w-12 text-sky-600 animate-spin" />
        </div>
      }>
        <ProductList />
      </Suspense>
    </div>
  );
}
