"use client";

import { useState } from "react";

export default function AsiraWalletSignupPage() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSignup() {
    alert("Continue clicked");

    if (!fullName || !mobile || !birthday || !birthPlace || !pin) {
      alert("Please complete all fields.");
      return;
    }

    if (pin.length !== 6) {
      alert("PIN must be 6 digits.");
      return;
    }

    setLoading(true);

    localStorage.setItem("asira_wallet_logged_in", "yes");
    localStorage.setItem("aunified_qrph_logged_in", "yes");
    localStorage.setItem("asira_wallet_full_name", fullName);
    localStorage.setItem("asira_wallet_phone", mobile);
    localStorage.setItem("asira_wallet_birthday", birthday);
    localStorage.setItem("asira_wallet_birth_place", birthPlace);
    localStorage.setItem("asira_wallet_pin", pin);

    if (!localStorage.getItem("asira_wallet_balance")) {
      localStorage.setItem(`asira_wallet_balance_${mobile}`, "0");
      localStorage.removeItem("asira_wallet_balance");
    }

    window.location.assign("/asira-wallet/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-2 text-3xl font-bold">ASIRA WALLET</h1>
        <p className="mb-8 text-white/50">Create your wallet account</p>

        <label className="mb-2 block text-sm text-white/60">Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <label className="mb-2 block text-sm text-white/60">Phone Number</label>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <label className="mb-2 block text-sm text-white/60">Birthday</label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <label className="mb-2 block text-sm text-white/60">Birth Place</label>
        <input
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <label className="mb-2 block text-sm text-white/60">6-Digit PIN</label>
        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          className="mb-6 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          className="relative z-50 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Continue"}
        </button>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/50">
          OTP verification and biometric login will be activated during integration phase.
        </div>

        <button
          type="button"
          onClick={() => window.location.assign("/asira-wallet/login")}
          className="mt-5 w-full text-sm text-emerald-400"
        >
          Already have an account? Login
        </button>
      </div>
    </main>
  );
}