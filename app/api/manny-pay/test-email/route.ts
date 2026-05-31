import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function GET() {
  try {
    const result = await resend.emails.send({
      from: "Manny Pay <noreply@manny-pay.com>",
      to: "asira1031@gmail.com",
      subject: "Manny Pay Email Confirmation Test",
      html: `
        <h2>Manny Pay Email Confirmation</h2>
        <p>This is a test email from Manny Pay.</p>
        <p>If you received this, email sending is working.</p>
      `,
    });

    return NextResponse.json({
      ok: true,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        message: error.message || "Email test failed.",
      },
      { status: 500 }
    );
  }
}