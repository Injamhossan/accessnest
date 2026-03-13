import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nagorikpay } from "@/lib/nagorikpay";
import { sendEmail } from "@/lib/mailer";
import { trackCapiEvent } from "@/lib/facebook-capi";


export async function POST(req: Request) {
  try {
    const { transactionId, orderId: orderIdFromBody } = await req.json();

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

      const orderId = metadata?.orderId || orderIdFromBody;

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
          user: true,
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

      // 5. Send Confirmation Email
      const itemsHtml = updatedOrder.items.map((item: any) => `
        <div style="padding: 15px; border-bottom: 1px solid #edf2f7; display: flex; align-items: center;">
          <img src="${item.product.image}" alt="${item.product.title}" style="width: 50px; height: 50px; border-radius: 8px; margin-right: 15px; object-fit: cover;">
          <div style="flex: 1;">
            <p style="margin: 0; font-weight: bold; color: #1a202c;">${item.product.title}</p>
            <p style="margin: 5px 0 0; font-size: 12px; color: #718096;">Qty: ${item.quantity}</p>
            ${item.product.downloadUrl ? `<a href="${item.product.downloadUrl}" style="display: inline-block; margin-top: 10px; color: #4a90e2; font-weight: bold; text-decoration: none;">Download Now →</a>` : ''}
          </div>
          <p style="margin: 0; font-weight: bold; color: #2d3748;">৳${Number(item.subtotal).toLocaleString()}</p>
        </div>
      `).join('');

      console.log(`Attempting to send receipt to: ${updatedOrder.user.email}`);
      const emailResult = await sendEmail({
        to: updatedOrder.user.email,
        subject: `Your Order Receipt - ${updatedOrder.id}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f7fafc;">
            <div style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <div style="background-color: #1a202c; padding: 40px 30px; text-align: center;">
                <img src="${process.env.NEXT_PUBLIC_BASE_URL}/logo.png" alt="Access Nest" style="height: 40px; margin-bottom: 20px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Order Confirmed!</h1>
                <p style="color: #a0aec0; margin: 10px 0 0; font-size: 13px; font-weight: 500;">Transaction ID: ${transactionId}</p>
              </div>
              <div style="padding: 30px;">
                <h2 style="font-size: 18px; color: #1a202c; margin: 0 0 20px;">Hi ${updatedOrder.user.name || 'Value Customer'},</h2>
                <p style="color: #4a5568; line-height: 1.6; margin-bottom: 30px;">Thank you for your purchase from Access Nest! Your payment was successful and your digital products are now ready for you.</p>
                
                <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                  <div style="background-color: #f8fafc; padding: 12px 15px; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-weight: bold; color: #4a5568; font-size: 14px;">Order Summary</span>
                  </div>
                  ${itemsHtml}
                  <div style="padding: 15px; text-align: right; background-color: #f8fafc;">
                    <p style="margin: 0; color: #718096;">Total Amount Paid:</p>
                    <p style="margin: 5px 0 0; font-size: 20px; font-weight: bold; color: #3182ce;">৳${Number(updatedOrder.totalAmount).toLocaleString()}</p>
                  </div>
                </div>

                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" style="display: inline-block; padding: 15px 30px; background-color: #3182ce; color: #ffffff; font-weight: bold; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 6px rgba(49, 130, 206, 0.2);">Go to Dashboard</a>
                </div>

                <hr style="border: none; border-top: 1px solid #edf2f7; margin: 40px 0;">
                <p style="font-size: 12px; color: #a0aec0; text-align: center; margin: 0 0 10px;">
                  This is a transactional receipt for your recent purchase.
                </p>
                <p style="font-size: 11px; color: #cbd5e0; text-align: center; margin: 0;">
                  Access Nest BD • Dhaka, Bangladesh • <a href="mailto:accessnestbd@gmail.com" style="color: #cbd5e0; text-decoration: none;">accessnestbd@gmail.com</a>
                </p>
                <p style="font-size: 11px; color: #cbd5e0; text-align: center; margin-top: 15px;">
                  You received this because you made a purchase on <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color: #cbd5e0; text-decoration: none;">Access Nest</a>.
                </p>
              </div>
            </div>
          </div>
        `,
      });

      if (!emailResult.success) {
        console.error("Critical: Order confirmed but email failed to send to", updatedOrder.user.email);
      }

      // 6. Track with Facebook CAPI (Server-side)
      await trackCapiEvent({
        eventName: "Purchase",
        eventSourceUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify`,
        userData: {
          em: updatedOrder.user.email,
          client_ip_address: req.headers.get("x-forwarded-for") || undefined,
          client_user_agent: req.headers.get("user-agent") || undefined,
        },
        customData: {
          value: Number(updatedOrder.totalAmount),
          currency: "BDT",
          content_ids: updatedOrder.items.map((i: any) => i.productId),
          content_type: "product",
          order_id: updatedOrder.id,
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
