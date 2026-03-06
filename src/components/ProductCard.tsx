import Image from "next/image";
import { Download, Heart, MapPin, BedDouble, Bath, Square, Star } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
}

export default function ProductCard({ title, description, price, rating, reviews, image }: ProductCardProps) {
  return (
    <article className="group flex h-[480px] w-full flex-col bg-white p-3 rounded-[1.75rem] shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="relative h-full w-full rounded-2xl overflow-hidden">
        {/* Background Image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-opacity duration-300 pointer-events-none" />

        {/* Top Price Badge */}
        <div className="absolute top-4 left-4 z-10 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 px-4 py-1.5 text-sm tracking-wide font-bold text-white shadow-sm">
          {price.includes("/") ? price.split("/")[0] : price} <span className="text-xs font-semibold tracking-normal capitalize">{price.includes("/") ? `/ ${price.split("/")[1]}` : ""}</span>
        </div>

        {/* Top Heart Icon */}
        <button className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 text-white transition hover:bg-slate-900/60 shadow-sm">
          <Heart className="h-4 w-4" />
        </button>

        {/* Bottom Content Area */}
        <div className="absolute bottom-0 left-0 w-full flex flex-col p-5 z-10">
          
          {/* Carousel dots (decorative mimicking image) */}
          <div className="flex justify-center gap-[5px] mb-4">
            <span className="h-1.5 w-4 rounded-full bg-white shadow-sm"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-sm"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-sm"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-sm"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-sm"></span>
          </div>

          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-white truncate">{title}</h3>
            <div className="flex items-center gap-1.5 shrink-0 text-white">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-sm">{rating}</span>
              <span className="text-white/80 text-[13px]">({reviews})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 text-sm mb-3">
             <MapPin className="h-3.5 w-3.5" />
             <p className="line-clamp-1 truncate">{description}</p>
          </div>

          <div className="flex items-center gap-3 text-slate-300 text-[13px] font-medium mb-5">
            <div className="flex items-center gap-1.5">
              <BedDouble className="h-[15px] w-[15px]" />
              <span>3 Bedrooms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-[15px] w-[15px]" />
              <span>4 Bathrooms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="h-[15px] w-[15px]" />
              <span>3210 Sqft</span>
            </div>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5">
             <Download className="h-4 w-4" />
             Reserve
          </button>
        </div>
      </div>
    </article>
  );
}
