"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Filter } from "lucide-react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function AllProductsPage() {
  const { lang } = useLangStore();
  const t = dict[lang].products;

  // Mock Data for All Products
  const products = lang === "bn" ? [
    { id: 1, name: "ক্লাউড স্টোরেজ প্রো", category: "স্টোরেজ", price: "9.00", rating: 4.8, reviews: 124, img: "/images/cloud.png" },
    { id: 2, name: "এআই অ্যাসিস্ট্যান্ট প্লাস", category: "অটোমেশন", price: "19.00", rating: 4.9, reviews: 342, img: "/images/ai.png" },
    { id: 3, name: "ক্রিয়েটিভ স্যুট ম্যাক্স", category: "ডিজাইন", price: "29.00", rating: 4.7, reviews: 89, img: "/images/cloud.png" },
    { id: 4, name: "মার্কেটিং অ্যাসেটস", category: "মার্কেটিং", price: "14.00", rating: 4.6, reviews: 210, img: "/images/ai.png" },
    { id: 5, name: "সিকিউর ভিপিএন শিল্ড", category: "সিকিউরিটি", price: "12.00", rating: 4.9, reviews: 450, img: "/images/cloud.png" },
    { id: 6, name: "ডেভপস টুলকিট", category: "ডেভেলপমেন্ট", price: "39.00", rating: 4.8, reviews: 112, img: "/images/ai.png" },
  ] : [
    { id: 1, name: "Cloud Storage Pro", category: "Storage", price: "9.00", rating: 4.8, reviews: 124, img: "/images/cloud.png" },
    { id: 2, name: "AI Assistant Plus", category: "Automation", price: "19.00", rating: 4.9, reviews: 342, img: "/images/ai.png" },
    { id: 3, name: "Creative Suite Max", category: "Design", price: "29.00", rating: 4.7, reviews: 89, img: "/images/cloud.png" },
    { id: 4, name: "Marketing Assets", category: "Marketing", price: "14.00", rating: 4.6, reviews: 210, img: "/images/ai.png" },
    { id: 5, name: "Secure VPN Shield", category: "Security", price: "12.00", rating: 4.9, reviews: 450, img: "/images/cloud.png" },
    { id: 6, name: "DevOps Toolkit", category: "Development", price: "39.00", rating: 4.8, reviews: 112, img: "/images/ai.png" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
            <p className="mt-2 text-slate-500">{t.desc}</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex flex-col">
              {/* Product Image Placeholder */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                  <Image src={product.img} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-700">{product.rating} <span className="text-slate-400 font-normal">({product.reviews})</span></span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{product.name}</h3>
                
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-slate-900">৳{product.price}</span>
                  <Link href={`/cart`} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 group/link">
                    {t.addToCart} <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-sky-600 hover:text-sky-600 transition-colors">
            {t.loadMore}
          </button>
        </div>

      </div>
    </div>
  );
}
