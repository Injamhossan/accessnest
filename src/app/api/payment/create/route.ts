import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { nagorikpay } from "@/lib/nagorikpay";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions as any) as any;
    const { fullName, email, phone, items, totalPrice } = await req.json();

    let userId = session?.user?.id;

    // If no session, handle as Guest Checkout
    if (!userId) {
      // Find or create a ghost/guest user based on email
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const newUser = await prisma.user.create({
          data: {
            email,
            name: fullName,
            role: "user", // Default guest role
          },
        });
        userId = newUser.id;
      }
    }

    // Verify products exist to prevent P2003 foreign key violation
    const productIds = items.map((i: any) => i.id);
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true }
    });
    
    const existingIds = new Set(existingProducts.map(p => p.id));
    const missingIds = productIds.filter((id: string) => !existingIds.has(id));

    if (missingIds.length > 0) {
      return NextResponse.json({ 
        error: "One or more products in your cart are no longer available. Please clear your cart and try again." 
      }, { status: 400 });
    }

    // 1. Create Order in Database
    const order = await prisma.order.create({
      data: {
        userId: userId,
        status: "pending",
        totalAmount: totalPrice,
        paymentMethod: "Nagorikpay",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            unitPrice: item.price,
            subtotal: item.price * item.quantity,
          })),
        },
      },
    });

    // 2. Prepare Nagorikpay Payload
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    const paymentPayload = {
      cus_name: fullName,
      cus_email: email,
      amount: String(totalPrice),
      success_url: `${baseUrl}/checkout/success?orderId=${order.id}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      meta_data: {
        orderId: order.id,
        userId: session.user.id,
        phone: phone,
      },
    };

    // 3. Request Payment URL from Nagorikpay
    const npResponse = await nagorikpay.createPayment(paymentPayload);

    if (npResponse.status && npResponse.payment_url) {
      // Update order with transaction placeholder if needed, 
      // but usually we wait for the callback or success redirect to get the real transaction ID.
      // For now, we just redirect.
      return NextResponse.json({ payment_url: npResponse.payment_url });
    } else {
      console.error("Nagorikpay API Error:", npResponse.message);
      return NextResponse.json({ error: npResponse.message }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Create Payment Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
