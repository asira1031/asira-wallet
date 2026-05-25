import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const walletId = `AW-${Date.now()}`;

    const { error } = await supabase.from("wallet_users").insert([
      {
        wallet_id: walletId,
        full_name: body.fullName,
        mobile: body.phone,
        balance: 0,
      },
    ]);

    if (error) {
      return NextResponse.json({
        ok: false,
        message: error.message,
      });
    }

    return NextResponse.json({
      ok: true,
      walletId,
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      message: error.message || "Signup failed",
    });
  }
}