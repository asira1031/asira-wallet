"use client";

import { useState } from "react";

export default function WalletLoginPage() {
  const [walletId, setWalletId] = useState("");
  const [pin, setPin] = useState("");

  function handleLogin() {
    if (!walletId || !pin) {
      alert("Enter wallet ID and PIN");
      return;
    }

    window.location.href = "/asira-wallet/dashboard";
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[40px] border border-white/10 bg-white/[0.03] p-8">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-3xl bg-emerald-500 flex items-center justify-center text-black text-4xl font-black">
            A
          </div>
        </div>

        <h1 className="text-4xl font-black text-center mt-6">
          ASIRA WALLET
        </h1>

        <p className="text-white/40 text-center mt-3">
          Secure Digital Wallet Login
        </p>

        <div className="mt-10">
          <p className="text-sm text-white/50 mb-3">
            Wallet ID
          </p>

          <input
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            placeholder="AW-CLIENT-0001"
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-5 py-4 outline-none"
          />
        </div>

        <div className="mt-6">
          <p className="text-sm text-white/50 mb-3">
            PIN
          </p>

          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••••"
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-5 py-4 outline-none"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-8 rounded-2xl bg-emerald-500 text-black py-4 font-bold text-lg hover:opacity-90 transition"
        >
          Login
        </button>

        <div className="mt-8 text-center">
          <a
            href="/asira-wallet/register"
            className="text-emerald-400 text-sm"
          >
            Create Wallet Account
          </a>
        </div>
      </div>
    </main>
  );
}