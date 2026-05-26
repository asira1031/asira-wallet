import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullName, mobile, birthday, birthPlace, pin } = body;

    if (!fullName || !mobile || !birthday || !birthPlace || !pin) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (pin.length !== 6) {
      return NextResponse.json(
        { message: "PIN must be 6 digits." },
        { status: 400 }
      );
    }

    const walletId = "AW-" + Date.now();

    const { data, error } = await supabase
      .from("wallet_users")
      .insert([
        {
          full_name: fullName,
          mobile,
          birthday,
          birth_place: birthPlace,
          pin,
          balance: 0,
          wallet_id: walletId,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}git add .
git commit -m "Update wallet signup API for birth details"
git push origin main