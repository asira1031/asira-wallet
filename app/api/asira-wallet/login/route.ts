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

    const phone = body.phone;
    const pin = body.pin;
    const deviceName = body.deviceName || "Unknown Device";

    if (!phone || !pin) {
      return NextResponse.json({
        ok: false,
        message: "Phone and PIN are required",
      });
    }

    const pinHash = hashPin(pin);

    const { data, error } = await supabase
      .from("wallet_users")
      .select("*")
      .eq("mobile", phone)
      .eq("pin_hash", pinHash)
      .single();

    if (error || !data) {
      return NextResponse.json({
        ok: false,
        message: "Invalid phone number or PIN",
      });
    }

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();

    await supabase
      .from("wallet_users")
      .update({
        session_token: sessionToken,
        session_expires_at: expiresAt,
        last_login_at: new Date().toISOString(),
        device_name: deviceName,
      })
      .eq("wallet_id", data.wallet_id);

    return NextResponse.json({
      ok: true,
      wallet: {
        ...data,
        session_token: sessionToken,
        session_expires_at: expiresAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      message: error.message || "Login failed",
    });
  }
}