import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to find by slug first, then by ID as fallback
  let product = await prisma.product.findUnique({ where: { slug } });
  if (!product) {
    product = await prisma.product.findUnique({ where: { id: slug } });
  }
  
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | Access Nest`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to find by slug first, then by ID as fallback
  let product = await prisma.product.findUnique({
    where: { slug }
  });
  
  if (!product) {
    product = await prisma.product.findUnique({
      where: { id: slug }
    });
  }

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
      isActive: true
    },
    take: 4,
  });

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.title,
            "image": [product.image],
            "description": product.description,
            "sku": product.slug || product.id,
            "offers": {
              "@type": "Offer",
              "url": `https://accessnest.tech/products/${product.slug || product.id}`,
              "priceCurrency": "BDT",
              "price": product.discountedPrice ? product.discountedPrice.toString() : product.price.toString(),
              "itemCondition": "https://schema.org/NewCondition",
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
            "aggregateRating": product.reviews > 0 ? {
              "@type": "AggregateRating",
              "ratingValue": product.rating ? product.rating.toString() : "5",
              "reviewCount": product.reviews.toString()
            } : undefined
          })
        }}
      />
      <ProductDetailClient 
        product={JSON.parse(JSON.stringify(product))} 
        relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
      />
    </>
  );
}

