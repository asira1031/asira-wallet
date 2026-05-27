import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullName, mobile, birthday, birthPlace, pin } = body;

    if (!fullName || !mobile || !birthday || !birthPlace || !pin) {
      return NextResponse.json(
        { ok: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (String(pin).length !== 6) {
      return NextResponse.json(
        { ok: false, message: "PIN must be 6 digits." },
        { status: 400 }
      );
    }

    const { data: existingUser } = await supabase
      .from("wallet_users")
      .select("id")
      .eq("mobile", mobile)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { ok: false, message: "Mobile number already registered." },
        { status: 409 }
      );
    }

    const walletId = `AW-${Date.now()}`;

    const { data, error } = await supabase
      .from("wallet_users")
      .insert([
        {
          full_name: fullName,
          mobile,
          birthday,
          birth_place: birthPlace,
          pin_code: pin,
          balance: 0,
          wallet_id: walletId,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      user: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error.message || "Server error." },
      { status: 500 }
    );
  }
}