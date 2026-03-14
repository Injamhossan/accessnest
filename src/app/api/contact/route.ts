import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "First name, email, and message are required." },
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0f7af7;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName || ""}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <h3>Message:</h3>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <br/>
        <p style="font-size: 12px; color: #64748b;">This message was submitted via the Access Nest Contact Page.</p>
      </div>
    `;

    const emailResponse = await sendEmail({
      to: "accessnestbd@gmail.com",
      subject: `New Contact Inquiry from ${firstName}`,
      html: htmlContent,
    });

    if (emailResponse.success) {
      return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } else {
      console.error("Mailer Error:", emailResponse.error);
      return NextResponse.json(
        { error: "Failed to send message securely." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
