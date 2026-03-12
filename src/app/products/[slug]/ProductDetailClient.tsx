"use client";

import { useState, useEffect } from "react";

import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { useCartStore } from "@/store/cartStore";
import * as fp from "@/lib/fpixel";

import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  ShoppingCart, 
  CreditCard, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Heart,
  Share2,
  Info
} from "lucide-react";

import ProductCard from "@/components/ProductCard";

import { useRouter } from "next/navigation";

export default function ProductDetailClient({ product, relatedProducts }: { product: any; relatedProducts: any[] }) {
  const router = useRouter();
  const { lang } = useLangStore();
  const t = dict[lang].productDetails;
  const adminT = dict[lang].admin;
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fp.event("ViewContent", {
      content_name: product.title,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: Number(product.price),
      currency: "BDT",
    });
  }, [product.id]);



  const handleAddToCart = () => {
    addItem(product);
    fp.event("AddToCart", {
      content_name: product.title,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: Number(product.price),
      currency: "BDT",
    });
  };


  const handleBuyNow = () => {
    addItem(product);
    fp.event("AddToCart", {
      content_name: product.title,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: Number(product.price),
      currency: "BDT",
    });
    router.push("/cart");
  };

  const handleAddToWishlist = () => {
    fp.event("AddToWishlist", {
      content_name: product.title,
      content_category: product.category,
      content_ids: [product.id],
      content_type: "product",
      value: Number(product.price),
      currency: "BDT",
    });
  };


  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0f7af7] transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToProducts}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Product Visuals */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
              <Image 
                src={product.image || "https://placehold.co/1200x800/png?text=Product"} 
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              <button 
                onClick={handleAddToWishlist}
                className="absolute top-6 right-6 h-12 w-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-red-500 shadow-lg transition-all active:scale-90"
              >
                <Heart className="h-6 w-6" />
              </button>

            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, label: t.license, color: "text-blue-600", bg: "bg-blue-50" },
                { icon: Zap, label: t.delivery, color: "text-amber-600", bg: "bg-amber-50" },
                { icon: CheckCircle2, label: t.guarantee, color: "text-emerald-600", bg: "bg-emerald-50" },
                { icon: Info, label: t.support, color: "text-violet-600", bg: "bg-violet-50" },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} p-4 rounded-3xl border border-white shadow-sm flex flex-col items-center text-center gap-2`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <span className="text-[10px] font-bold text-slate-700 uppercase leading-tight tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info & Purchase */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-200 shadow-2xl shadow-slate-200/40 sticky top-28">
              
              <div className="flex items-center justify-between mb-6">
                <span className="px-4 py-1.5 rounded-full bg-[#0f7af7]/10 text-[#0f7af7] text-xs font-black uppercase tracking-widest border border-[#0f7af7]/10">
                  {(adminT.categories as any)[product.category] || product.category}
                </span>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-100/50">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-black text-amber-700">{product.rating || 0}</span>
                  <span className="text-xs font-bold text-amber-600/50">({product.reviews || 0} {t.reviews})</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-black text-slate-900 tracking-tighter force-english-font">৳{product.price}</span>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">One-time payment</span>
              </div>

              <div className="space-y-4 mb-10">
                <button 
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-3 bg-[#0f7af7] hover:bg-[#0863cb] text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-200 hover:shadow-blue-300 active:scale-[0.98]"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {t.addToCart}
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                >
                  <CreditCard className="h-6 w-6" />
                  {t.buyNow}
                </button>
              </div>

              {/* Share */}
              <button 
                onClick={handleShare}
                className="mt-8 w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-[#0f7af7] transition-all uppercase tracking-widest group"
              >
                <Share2 className={`h-3.5 w-3.5 transition-transform ${copied ? 'scale-125 text-[#0f7af7]' : 'group-hover:rotate-12'}`} />
                {copied ? "Link Copied!" : "Share this product"}
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Description Section */}
        <div className="mt-12">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-200 shadow-xl shadow-slate-200/30">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Info className="h-5 w-5 text-[#0f7af7]" />
              </div>
              {t.description}
            </h3>
            <div className="text-slate-600 font-medium leading-loose text-base whitespace-pre-wrap">
              {product.description}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-slate-900">{t.relatedProducts}</h2>
              <div className="h-1 flex-1 bg-slate-200/50 mx-8 hidden sm:block rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard 
                  key={p.id}
                  id={p.id}
                  slug={p.slug}
                  title={p.title}
                  description={p.description}
                  price={`৳${p.price}`}
                  rating={p.rating || 0}
                  reviews={p.reviews || 0}
                  image={p.image || "https://placehold.co/600x400/png?text=Product"}
                  category={p.category}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
