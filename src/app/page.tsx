import HeroBanner from "@/components/HeroBanner";
import TrustSection from "@/components/TrustSection";
import ProductSection from "@/components/ProductSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-900 selection:bg-sky-100">
      
      {/* Hero / Banner Section */}
      <HeroBanner />

      {/* Trusted / Secure Section */}
      <TrustSection />

      {/* Product Cards Section */}
      <ProductSection />

      {/* FAQ Section */}
      <FAQSection />

    </main>
  );
}
