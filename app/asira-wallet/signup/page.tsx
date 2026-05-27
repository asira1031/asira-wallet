"use client";

import { useState } from "react";
import Image from "next/image";
export default function AsiraWalletSignupPage() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [pin, setPin] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (
      !fullName ||
      !mobile ||
      !birthday ||
      !birthPlace ||
      !pin
    ) {
      alert("Please complete all fields.");
      return;
    }

    if (pin.length !== 6) {
      alert("PIN must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "/api/asira-wallet/signup",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fullName,
            mobile,
            birthday,
            birthPlace,
            pin,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data?.message ||
            "Signup failed."
        );

        setLoading(false);
        return;
      }

      localStorage.setItem(
        "asira_wallet_logged_in",
        "yes"
      );

      localStorage.setItem(
        "asira_wallet_full_name",
        fullName
      );

      localStorage.setItem(
        "asira_wallet_phone",
        mobile
      );

      localStorage.setItem(
        `asira_wallet_balance_${mobile}`,
        "0"
      );

      alert(
        "Wallet account created successfully."
      );

      window.location.href =
        "/asira-wallet/dashboard";
    } catch (error) {
      console.log(error);

      alert(
        "Signup error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
       <div className="mb-6 flex flex-col items-center">
  <Image
    src="/asira-logo.png"
    alt="Asira Wallet"
    width={90}
    height={90}
    className="rounded-3xl"
  />

  <h1 className="mt-4 text-3xl font-bold">
    ASIRA WALLET
  </h1>

  <p className="mt-2 text-white/50">
    Mobile fintech super app
  </p>
</div>

        <label className="mb-2 block text-sm text-white/60">
          Full Name
        </label>

        <input
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <label className="mb-2 block text-sm text-white/60">
          Phone Number
        </label>

        <input
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <label className="mb-2 block text-sm text-white/60">
          Birthday
        </label>

        <input
          type="date"
          value={birthday}
          onChange={(e) =>
            setBirthday(e.target.value)
          }
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <label className="mb-2 block text-sm text-white/60">
          Birth Place
        </label>

        <input
          value={birthPlace}
          onChange={(e) =>
            setBirthPlace(e.target.value)
          }
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <label className="mb-2 block text-sm text-white/60">
          6-Digit PIN
        </label>

        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) =>
            setPin(
              e.target.value.replace(/\D/g, "")
            )
          }
          className="mb-6 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading
            ? "Creating account..."
            : "Continue"}
        </button>

        <button
          type="button"
          onClick={() =>
            (window.location.href =
              "/asira-wallet/login")
          }
          className="mt-5 w-full text-sm text-emerald-400"
        >
          Already have an account?
          Login
        </button>
      </div>
    </main>
  );
}