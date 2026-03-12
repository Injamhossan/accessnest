
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions as any) as any;
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = session?.user?.role === "admin" || session?.user?.role === "superadmin";

  try {
    const where = isAdmin ? {} : { userId: session.user.id };
    
    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, image: true } },
        items: { include: { product: true } }
      }
    });

    if (!isAdmin) {
      return NextResponse.json({ orders });
    }

    // Manual grouping for analytics
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const recentOrders = await prisma.order.findMany({
      where: {
        createdAt: { gte: fourteenDaysAgo },
        status: 'completed'
      },
      select: {
        createdAt: true,
        totalAmount: true
      }
    });

    const dailySales: Record<string, number> = {};
    for (let i = 0; i < 14; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dailySales[d.toLocaleDateString()] = 0;
    }

    recentOrders.forEach((o: any) => {
        const dateStr = new Date(o.createdAt).toLocaleDateString();
        if (dailySales[dateStr] !== undefined) {
            dailySales[dateStr] += Number(o.totalAmount);
        }
    });

    return NextResponse.json({ 
        orders, 
        chartData: Object.entries(dailySales).map(([date, amount]: [string, any]) => ({ date, amount })).reverse()
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch sales data" }, { status: 500 });
  }
}
