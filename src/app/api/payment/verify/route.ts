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
    console.log("Nagorikpay Verify Response:", npVerify);

    if (npVerify.status === "COMPLETED" || npVerify.status === "SUCCESS") {
      // Check both metadata and meta_data as some APIs change the case/format/type
      let rawMetadata = npVerify.metadata || (npVerify as any).meta_data;
      let metadata: any = {};

      if (typeof rawMetadata === 'string') {
        try {
          metadata = JSON.parse(rawMetadata);
        } catch (e) {
          console.error("Failed to parse metadata string:", rawMetadata);
        }
      } else {
        metadata = rawMetadata;
      }

      const orderId = metadata?.orderId;

      if (!orderId) {
          console.error("Missing orderId in metadata:", metadata);
          return NextResponse.json({ 
            success: false, 
            message: "Order context missing in payment verification. Please contact support." 
          }, { status: 400 });
      }

      // 2. Update Order in Database
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "completed",
          paymentId: transactionId,
          paymentMethod: npVerify.payment_method || "Nagorikpay",
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      // 3. Create a Transaction record
      await prisma.transaction.create({
        data: {
          userId: updatedOrder.userId,
          orderId: updatedOrder.id,
          type: "purchase",
          amount: updatedOrder.totalAmount,
          currency: "BDT", 
          status: "success",
          paymentGateway: "Nagorikpay",
          id: transactionId, 
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
        message: npVerify.message || `Payment status: ${npVerify.status}. Verification not completed.`
      });
    }
  } catch (error: any) {
    console.error("Verify Payment Route Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}
