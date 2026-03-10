"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function ProductSection() {
  const { lang } = useLangStore();
  const t = dict[lang].productSection;

  const products = lang === "bn" ? [
    {
      title: "ক্লাউড স্টোরেজ প্রো",
      description: "আপনার সমস্ত ডিজিটাল অ্যাসেটের জন্য সুরক্ষিত, উচ্চ গতির ক্লাউড স্টোরেজ। যে কোনো জায়গা থেকে, যে কোনো সময় অ্যাক্সেস করুন।",
      price: "$9",
      rating: 4.8,
      reviews: 1240,
      image: "/images/cloud.png",
    },
    {
      title: "এআই অ্যাসিস্ট্যান্ট প্লাস",
      description: "আমাদের এআই অ্যাসিস্ট্যান্ট ওয়ার্কস্পেস দিয়ে আপনার প্রডাক্টিভিটি বাড়ান। ইন্টেলিজেন্ট অটোমেশন।",
      price: "$19",
      rating: 4.9,
      reviews: 892,
      image: "/images/ai.png",
    },
    {
      title: "ক্রিয়েটিভ স্যুট ম্যাক্স",
      description: "সবচেয়ে সেরা ডিজাইন এবং ক্রিয়েটিভ সফটওয়্যার বান্ডিল। মাস্টারপিস তৈরি করতে যা কিছু প্রয়োজন সব এখানে আছে।",
      price: "$29",
      rating: 4.7,
      reviews: 2150,
      image: "/images/creative.png",
    },
    {
      title: "মার্কেটিং অ্যাসেটস",
      description: "আপনার পরবর্তী বড় প্রকল্পের জন্য ১০,০০০ এর বেশি প্রিমিয়াম গ্রাফিক্স, টেমপ্লেট এবং ইউআই কিট।",
      price: "$14",
      rating: 4.6,
      reviews: 310,
      image: "/images/banner.png",
    },
  ] : [
    {
      title: "Cloud Storage Pro",
      description: "Secure, high-speed cloud storage for all your digital assets. Access anywhere, anytime.",
      price: "$9",
      rating: 4.8,
      reviews: 1240,
      image: "/images/cloud.png",
    },
    {
      title: "AI Assistant Plus",
      description: "Boost your productivity with our advanced AI assistant workspace. Intelligent automation.",
      price: "$19",
      rating: 4.9,
      reviews: 892,
      image: "/images/ai.png",
    },
    {
      title: "Creative Suite Max",
      description: "The ultimate design and creative software bundle. Everything you need to create masterpieces.",
      price: "$29",
      rating: 4.7,
      reviews: 2150,
      image: "/images/creative.png",
    },
    {
      title: "Marketing Assets",
      description: "Over 10,000+ premium graphics, templates, and UI kits for your next big project.",
      price: "$14",
      rating: 4.6,
      reviews: 310,
      image: "/images/banner.png",
    },
  ];

  return (
    <section id="products" className="py-12 md:py-16 mx-auto w-full max-w-7xl px-4">
      <article className="mx-auto w-full">
        <header className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <hgroup className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">{t.badge}</p>
            <h2 className="text-2xl font-bold text-slate-900 md:text-4xl">
              {t.title1}
              <span className="block text-sky-700">{t.title2}</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base font-medium">
              {t.desc}
            </p>
          </hgroup>
          <Link href="/products" className="rounded-xl flex items-center justify-center border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-[0_2px_10px_rgb(0,0,0,0.03)] transition hover:border-sky-200 hover:text-sky-700 hover:bg-slate-50 cursor-pointer">
            {t.btn}
          </Link>
        </header>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product, idx) => (
            <li key={idx} className="list-none">
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
