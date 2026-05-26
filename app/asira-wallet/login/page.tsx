"use client";

import { useState } from "react";

export default function AsiraWalletLoginPage() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  function handleLogin() {
    if (!phone || !pin) {
      alert("Enter phone number and PIN");
      return;
    }

    if (pin.length !== 6) {
      alert("PIN must be 6 digits");
      return;
    }

    localStorage.setItem("asira_wallet_logged_in", "yes");
    localStorage.setItem("asira_wallet_phone", phone);

    window.location.href = "/asira-wallet/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold">ASIRA WALLET</h1>

        <p className="mt-2 text-white/50">Secure wallet login</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-white/60">Phone Number</label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+639XXXXXXXXX"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">6-Digit PIN</label>

            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="******"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-green-500 py-4 font-semibold text-black transition-all hover:bg-green-400"
          >
            Login
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => alert("Face ID will activate in production.")}
              className="rounded-2xl border border-white/10 bg-black/30 py-3"
            >
              Face ID
            </button>

            <button
              onClick={() => alert("Touch ID will activate in production.")}
              className="rounded-2xl border border-white/10 bg-black/30 py-3"
            >
              Touch ID
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/50">
            Biometric login and OTP verification will activate during production
            integration.
          </div>

          <a
            href="/asira-wallet/signup"
            className="block text-center text-sm text-green-400"
          >
            Create Wallet Account
          </a>
        </div>
      </div>
    </main>
  );
}