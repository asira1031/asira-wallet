"use client";

import { useState } from "react";

export default function AsiraWalletLoginPage() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  async function handleLogin() {
    if (!phone || !pin) {
      alert("Enter phone number and PIN");
      return;
    }

    const res = await fetch("/api/asira-wallet/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
  phone,
  pin,
  deviceName: navigator.userAgent,
}),
    });

    const data = await res.json();

    if (!data.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem(
      "asira_wallet_user",
      JSON.stringify(data.wallet)
    );

    window.location.href = "/asira-wallet/dashboard";
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">

        <h1 className="text-3xl font-bold">
          ASIRA WALLET
        </h1>

        <p className="text-white/50 mt-2">
          Secure wallet login
        </p>

        <div className="mt-8 space-y-5">

          <div>
            <label className="text-sm text-white/60">
              Phone Number
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+639XXXXXXXXX"
              className="w-full mt-2 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">
              6-Digit PIN
            </label>

            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="******"
              className="w-full mt-2 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-green-500 hover:bg-green-400 transition-all py-4 font-semibold text-black"
          >
            Login
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button className="rounded-2xl border border-white/10 bg-black/30 py-3">
              Face ID
            </button>

            <button className="rounded-2xl border border-white/10 bg-black/30 py-3">
              Touch ID
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/50">
            Biometric login and OTP verification will activate during production integration.
          </div>

          <a
            href="/asira-wallet/signup"
            className="block text-center text-green-400 text-sm"
          >
            Create Wallet Account
          </a>

        </div>
      </div>
    </main>
  );
}