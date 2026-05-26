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

    if (pin.length !== 6) {
      setMessage("PIN must be 6 digits.");
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
      localStorage.setItem("asira_wallet_full_name", fullName);
      localStorage.setItem("asira_wallet_email", email);
      localStorage.setItem("asira_wallet_phone", mobile);

      router.push("/asira-wallet/dashboard");
    } catch (error) {
      setMessage("Signup error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-10 text-white">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8"
      >
        <h1 className="mb-2 text-3xl font-bold">Create Wallet Account</h1>

        <p className="mb-8 text-white/50">Sign up to continue.</p>

        <input
          className="mb-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="mb-6 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          placeholder="6-digit PIN"
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
        />

        {message && <p className="mb-4 text-sm text-red-400">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Continue"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/asira-wallet/login")}
          className="mt-5 w-full text-sm text-emerald-400"
        >
          Already have an account? Login
        </button>
      </form>
    </main>
  );
}