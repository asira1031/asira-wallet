"use client";

import { useState } from "react";

export default function AsiraWalletSignupPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [pin, setPin] = useState("");

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">

        <h1 className="text-3xl font-bold">
          ASIRA WALLET
        </h1>

        <p className="text-white/50 mt-2">
          Create your wallet account
        </p>

        <div className="mt-8 space-y-5">

          <div>
            <label className="text-sm text-white/60">
              Full Name
            </label>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Juan Dela Cruz"
              className="w-full mt-2 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

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
              Birthday
            </label>

            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full mt-2 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">
              Birth Place
            </label>

            <input
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="Pampanga"
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
            className="w-full rounded-2xl bg-green-500 hover:bg-green-400 transition-all py-4 font-semibold text-black"
          >
            Continue
          </button>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/50">
            OTP verification and biometric login will be activated during integration phase.
          </div>

        </div>
      </div>
    </main>
  );
}