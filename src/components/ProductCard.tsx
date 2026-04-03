"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, CreditCard, Heart, ArrowRight } from "lucide-react";
import { useLangStore } from "@/store/langStore";
import { useCartStore } from "@/store/cartStore";
import { dict } from "@/utils/dictionary";
import * as fp from "@/lib/fpixel";

interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  category?: string;
}

export default function ProductCard({ id, slug, title, description, price, rating, reviews, image, category }: ProductCardProps) {
  const { lang } = useLangStore();
  const t = dict[lang].productCard;
  const adminT = dict[lang].admin;
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, slug, title, price, image, category });
    
    // Track AddToCart
    fp.event("AddToCart", {
      content_name: title,
      content_category: category,
      content_ids: [id],
      content_type: "product",
      value: Number(price.replace(/[^0-9]/g, "")),
      currency: "BDT",
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Track AddToWishlist
    fp.event("AddToWishlist", {
      content_name: title,
      content_category: category,
      content_ids: [id],
      content_type: "product",
      value: Number(price.replace(/[^0-9]/g, "")),
      currency: "BDT",
    });
  };

  return (
    <article className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 h-full">
      {/* Wishlist Button */}
      <button 
        onClick={handleAddToWishlist}
        className="absolute top-3 right-3 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-white/70 backdrop-blur-md text-slate-400 border border-white/50 transition-all hover:bg-white hover:text-red-500 shadow-sm active:scale-90 group/heart"
      >
        <Heart className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/heart:scale-110" />
      </button>

      {/* Image Container */}
      <Link href={`/products/${slug || id}`} className="relative aspect-square w-full overflow-hidden bg-slate-100 block">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge - Glassmorphism */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="rounded-lg bg-white/10 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white border border-white/20 shadow-sm">
            {category ? ((adminT.categories as any)[category] || category) : "Digital"}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          {/* Price Tag */}
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight force-english-font">৳{price.replace(/[^0-9.]/g, "")}</span>
            <span className="text-[9px] text-[#0f7af7] font-bold uppercase tracking-widest mt-0.5">Lifetime Asset</span>
          </div>

          {/* Rating */}
          <div className="hidden sm:flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100/50 shadow-inner">
            <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
            <span className="text-[11px] font-black text-amber-700 force-english-font">{rating}</span>
          </div>
        </div>

        <Link href={`/products/${slug || id}`} className="block group/title mt-1">
          <h3 className="text-[15px] sm:text-lg font-extrabold text-slate-800 mb-1.5 group-hover/title:text-[#0f7af7] transition-colors line-clamp-1 leading-tight tracking-tight">
            {title}
          </h3>
        </Link>
        
        <p className="text-[11px] sm:text-sm text-slate-500 font-medium mb-5 line-clamp-1 opacity-70">
          {description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-col min-[450px]:flex-row gap-2">
            <Link 
              href={`/products/${slug || id}`}
              className="flex-1 flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2.5 text-[10px] font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98] shadow-sm whitespace-nowrap"
            >
              <CreditCard className="h-3 w-3 shrink-0" />
              <span>Get Now</span>
            </Link>
            <button 
              onClick={handleAddToCart}
              className="flex-1 flex w-full items-center justify-center gap-1.5 rounded-lg bg-white border border-slate-200 py-2.5 text-[10px] font-bold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] whitespace-nowrap"
            >
              <ShoppingCart className="h-3 w-3 shrink-0" />
              <span>Add to Cart</span>
            </button>
          </div>

          <Link 
            href={`/products/${slug || id}`}
            className="group/details flex w-full items-center justify-center gap-1 mt-3 py-1 text-[9px] font-bold text-slate-400 transition-all hover:text-[#0f7af7] uppercase tracking-widest"
          >
            Details
            <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover/details:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
