import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // For security reasons, don't reveal if user exists or not
      return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 10px;">
        <h2 style="color: #0f172a; margin-bottom: 16px;">Password Reset Request</h2>
        <p style="color: #64748b; font-size: 16px; line-height: 24px;">
          We received a request to reset your password for your AccessNest account. 
          Click the button below to set a new password. This link will expire in 1 hour.
        </p>
        <div style="margin: 32px 0;">
          <a href="${resetLink}" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #94a3b8; font-size: 12px;">
          If you didn't request this, you can safely ignore this email.
        </p>
        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 32px 0;" />
        <p style="color: #64748b; font-size: 14px; font-weight: bold;">AccessNest Security Team</p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Password Reset - AccessNest",
      html: emailHtml,
    });

    return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
