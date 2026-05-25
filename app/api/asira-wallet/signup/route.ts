import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

function hashPin(pin: string) {
  return crypto
    .createHash("sha256")
    .update(pin)
    .digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.phone || !body.pin) {
      return NextResponse.json({
        ok: false,
        message: "Please complete all required fields",
      });
    }

    const walletId = `AW-${Date.now()}`;
    const pinHash = hashPin(body.pin);

    const { error } = await supabase.from("wallet_users").insert([
      {
  wallet_id: walletId,
  full_name: body.fullName,
  mobile: body.phone,
  pin_hash: pinHash,
  pin_code: body.pin,
  balance: 0,
}
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