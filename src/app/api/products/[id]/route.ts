
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
    const session = await getServerSession(authOptions as any) as any;
  if (session?.user?.role !== "admin" && session?.user?.role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const product = await prisma.product.update({
      where: { id },
      data: {
        title: body.name || body.title,
        slug: body.slug || id, // Fallback to ID if empty
        description: body.description,
        price: parseFloat(body.price),
        category: body.category as any,
        image: body.image,
        downloadUrl: body.downloadUrl,
        deliverableContent: body.deliverableContent,
        isActive: body.isActive ?? true,
      }
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions as any) as any;
  if (session?.user?.role !== "admin" && session?.user?.role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await prisma.product.delete({
      where: { id }
    });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
