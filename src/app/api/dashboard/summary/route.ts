export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 141 });
  }

  const isAdmin = session.user.role === "admin" || session.user.role === "superadmin";

  try {
    if (isAdmin) {
      // Admin Data
      const [userCount, productCount, orderCount, revenue, recentUsers, recentProducts] = await Promise.all([
        prisma.user.count(),
        prisma.product.count(),
        prisma.order.count(),
        prisma.order.aggregate({
          _sum: {
            totalAmount: true
          }
        }),
        prisma.user.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true, email: true, role: true, image: true }
        }),
        prisma.product.findMany({
          take: 5,
          orderBy: { createdAt: "desc" }
        })
      ]);

      return NextResponse.json({
        type: "admin",
        stats: {
          userCount,
          productCount,
          orderCount,
          revenue: revenue._sum.totalAmount || 0
        },
        recentUsers,
        recentProducts
      });
    } else {
      // User Data
      const [orders, activeProducts] = await Promise.all([
        prisma.order.findMany({
          where: { userId: session.user.id },
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { items: { include: { product: true } } }
        }),
        // This is a simplified way to get active products (e.g. from successful orders)
        prisma.orderItem.findMany({
          where: { order: { userId: session.user.id, status: "completed" } },
          include: { product: true },
          take: 5
        })
      ]);

      return NextResponse.json({
        type: "user",
        orders,
        activeProducts: activeProducts.map((item: any) => item.product)
      });
    }
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
