import Image from "next/image";
import bannerImg from "@/assets/banner.png";

export default function HeroBanner() {
  return (
    <section className="w-full bg-slate-50 flex justify-center">
      
      {/* Full Banner Image - Scale Limited & Responsive */}
      <div className="relative w-full max-w-7xl mx-auto md:px-6 py-4 md:py-8 px-4">
        <div className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border-4 border-white">
          <Image
            src={bannerImg}
            alt="Premium digital subscriptions"
            className="w-full h-auto block transition-transform duration-700 hover:scale-[1.01]"
            priority
          />
        </div>
        
        {/* Navigation Slide Dots */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 z-10">
          <div className="h-1.5 w-8 rounded-full bg-[#0f7af7] shadow-sm"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
        </div>
      </div>

    </section>
  );
}
