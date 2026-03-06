import ProductCard from "./ProductCard";

export default function ProductSection() {
  const products = [
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
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">Top Picks</p>
            <h2 className="text-2xl font-bold text-slate-900 md:text-4xl">
              Popular Digital Products
              <span className="block text-sky-700">Ready for Instant Access</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base font-medium">
              Choose from trending subscriptions and premium resources curated for creators,
              professionals, and growing teams.
            </p>
          </hgroup>
          <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-[0_2px_10px_rgb(0,0,0,0.03)] transition hover:border-sky-200 hover:text-sky-700 hover:bg-slate-50">
            View All Products
          </button>
        </header>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, idx) => (
            <li key={idx} className="list-none">
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
