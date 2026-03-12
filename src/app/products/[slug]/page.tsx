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

  return <ProductDetailClient 
    product={JSON.parse(JSON.stringify(product))} 
    relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
  />;
}
