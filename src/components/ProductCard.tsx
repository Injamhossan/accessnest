"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, CreditCard, Heart, ArrowRight } from "lucide-react";
import { useLangStore } from "@/store/langStore";
import { useCartStore } from "@/store/cartStore";
import { dict } from "@/utils/dictionary";

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
  };

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,122,247,0.12)] hover:-translate-y-2 h-full">
      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-slate-400 border border-white/50 transition-all hover:bg-white hover:text-red-500 shadow-sm active:scale-95 group/heart">
        <Heart className="h-5 w-5 transition-transform duration-300 group-hover/heart:scale-110" />
      </button>

      {/* Image Container */}
      <Link href={`/products/${slug || id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 block">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category / Badge (Optional) */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="rounded-full bg-slate-900/40 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
            {category ? ((adminT.categories as any)[category] || category) : t.digitalAsset}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-2">
          {/* Price Tag */}
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 leading-none force-english-font">{price}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1">{t.oneTimePayment}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-100">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span className="text-xs font-bold text-amber-700 force-english-font">{rating}</span>
            <span className="text-[10px] text-amber-600/60 font-medium force-english-font">({reviews})</span>
          </div>
        </div>

        <Link href={`/products/${slug || id}`} className="block group/title">
          <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover/title:text-[#0f7af7] transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300 active:scale-[0.97]"
            >
              <ShoppingCart className="h-4 w-4" />
              {t.addToCart}
            </button>
            <Link 
              href={`/products/${slug || id}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-xs font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.97] shadow-lg shadow-slate-200 hover:shadow-xl"
            >
              <CreditCard className="h-4 w-4" />
              {t.buyNow}
            </Link>
          </div>

          <Link 
            href={`/products/${slug || id}`}
            className="group/details flex w-full items-center justify-center gap-2 py-1 text-[11px] font-bold text-[#0f7af7] transition-all hover:text-[#0a66d1]"
          >
            {t.viewDetails}
            <ArrowRight className="h-3 w-3 transition-transform group-hover/details:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
