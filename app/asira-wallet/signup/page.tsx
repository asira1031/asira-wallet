"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AsiraWalletSignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!fullName || !email || !mobile || !pin) {
      setMessage("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/asira-wallet/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          mobile,
          pin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.message || "Signup failed.");
        return;
      }

      localStorage.setItem("asira_wallet_logged_in", "yes");
      localStorage.setItem("asira_wallet_email", email);

      router.push("/asira-wallet/dashboard");
    } catch (error) {
      setMessage("Signup error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8"
      >
        <h1 className="text-3xl font-bold mb-2">Create Wallet Account</h1>
        <p className="text-white/50 mb-8">Sign up to continue.</p>

        <input
          className="w-full mb-4 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="w-full mb-4 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none"
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="w-full mb-6 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none"
          placeholder="4-digit PIN"
          type="password"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        {message && (
          <p className="mb-4 text-sm text-red-400">{message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Continue"}
        </button>
      </form>
    </main>
  );
}