import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nagorikpay } from "@/lib/nagorikpay";

export async function POST(req: Request) {
  try {
    const { transactionId } = await req.json();

    if (!transactionId) {
      return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
    }

    // 1. Verify with Nagorikpay
    const npVerify = await nagorikpay.verifyPayment(transactionId);

    if (npVerify.status === "COMPLETED") {
      const orderId = npVerify.metadata?.orderId;

      if (!orderId) {
          return NextResponse.json({ error: "Order context lost in metadata" }, { status: 400 });
      }

      // 2. Update Order in Database
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "completed",
          paymentId: transactionId,
          paymentMethod: npVerify.payment_method || "Nagorikpay",
        },
      });

      // 3. Create a Transaction record
      await prisma.transaction.create({
        data: {
          userId: updatedOrder.userId,
          orderId: updatedOrder.id,
          type: "purchase",
          amount: updatedOrder.totalAmount,
          currency: "BDT", // Based on Nagorikpay context
          status: "success",
          paymentGateway: "Nagorikpay",
          id: transactionId, // Use the real transaction ID
        },
      });

      // 4. Create Notification for user
      await prisma.notification.create({
        data: {
          userId: updatedOrder.userId,
          title: "Payment Successful",
          message: `Your payment of ${updatedOrder.totalAmount} was successful. Order ID: ${updatedOrder.id}`,
          type: "success",
          link: `/dashboard/orders`,
        },
      });

      return NextResponse.json({ success: true, order: updatedOrder });
    } else {
      return NextResponse.json({ 
        success: false, 
        status: npVerify.status, 
        message: npVerify.message || "Payment not completed" 
      });
    }
  } catch (error: any) {
    console.error("Verify Payment Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
