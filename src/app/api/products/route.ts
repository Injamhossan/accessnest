export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" }
      ]
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any) as any;
  if (session?.user?.role !== "admin" && session?.user?.role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    let product = await prisma.product.create({
      data: {
        title: body.name || body.title,
        slug: body.slug || (body.name || body.title).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        description: body.description,
        price: parseFloat(body.price),
        category: body.category as any,
        image: body.image || "https://placehold.co/600x400/png?text=Product",
        downloadUrl: body.downloadUrl,
        deliverableContent: body.deliverableContent,
        isActive: true,
      }
    });

    // If slug is somehow empty or duplicated (causing an edge case), fallback to ID
    if (!product.slug) {
      product = await prisma.product.update({
        where: { id: product.id },
        data: { slug: product.id }
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
