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
        <header className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <hgroup className="max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-sky-600">{t.badge}</p>
            <h2 className="text-2xl font-bold text-slate-900 md:text-4xl">
              {t.title1}
              <span className="block text-sky-700">{t.title2}</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base font-normal">
              {t.desc}
            </p>
          </hgroup>
          <Link href="/products" className="rounded-lg flex items-center justify-center border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-700 hover:bg-slate-50 cursor-pointer">
            {t.btn}
          </Link>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-sky-600 animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
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
