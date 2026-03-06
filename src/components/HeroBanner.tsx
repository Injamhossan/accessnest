import Image from "next/image";
import bannerImg from "@/assets/banner.png";

export default function HeroBanner() {
  return (
    <section className="w-full bg-slate-50 flex justify-center">
      
      {/* Full Uncropped Banner Image - Scale Limited */}
      <div className="relative w-full max-w-[1440px] mx-auto">
        <Image
          src={bannerImg}
          alt="Premium digital subscriptions"
          className="w-full h-auto block"
          priority
        />
        
        {/* Navigation Slide Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 z-10">
          <button className="h-2.5 w-2.5 rounded-full bg-slate-400 shadow-sm transition-opacity"></button>
          <button className="h-2.5 w-2.5 rounded-full bg-slate-200 hover:bg-slate-300 shadow-sm transition-opacity"></button>
          <button className="h-2.5 w-2.5 rounded-full bg-slate-200 hover:bg-slate-300 shadow-sm transition-opacity"></button>
        </div>
      </div>

    </section>
  );
}
