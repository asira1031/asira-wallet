"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AsiraWalletSignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [pin, setPin] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setMessage("");

    if (
      !fullName ||
      !mobile ||
      !birthday ||
      !birthPlace ||
      !pin
    ) {
      setMessage("Please complete all fields.");
      alert("Please complete all fields.");
      return;
    }

    if (pin.length !== 6) {
      setMessage("PIN must be 6 digits.");
      alert("PIN must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

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

      if (
        !localStorage.getItem(
          "asira_wallet_balance"
        )
      ) {
        localStorage.setItem(
          "asira_wallet_balance",
          "0"
        );
      }

      alert(
        "Wallet account created successfully."
      );

      router.push(
        "/asira-wallet/dashboard"
      );
    } catch (error) {
      console.log(error);

      alert(
        "Signup error. Please try again."
      );

      setMessage(
        "Signup error. Please try again."
      );
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
        <h1 className="mb-2 text-3xl font-bold">
          ASIRA WALLET
        </h1>

        <p className="mb-8 text-white/50">
          Create your wallet account
        </p>

        <label className="mb-2 block text-sm text-white/60">
          Full Name
        </label>

        <input
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          placeholder="Full name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <label className="mb-2 block text-sm text-white/60">
          Phone Number
        </label>

        <input
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          placeholder="09XXXXXXXXX"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
        />

        <label className="mb-2 block text-sm text-white/60">
          Birthday
        </label>

        <input
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          type="date"
          value={birthday}
          onChange={(e) =>
            setBirthday(e.target.value)
          }
        />

        <label className="mb-2 block text-sm text-white/60">
          Birth Place
        </label>

        <input
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          placeholder="Birth place"
          value={birthPlace}
          onChange={(e) =>
            setBirthPlace(e.target.value)
          }
        />

        <label className="mb-2 block text-sm text-white/60">
          6-Digit PIN
        </label>

        <input
          className="mb-6 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          placeholder="6-digit PIN"
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) =>
            setPin(
              e.target.value.replace(/\D/g, "")
            )
          }
        />

        {message && (
          <p className="mb-4 text-sm text-red-400">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading
            ? "Creating account..."
            : "Continue"}
        </button>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/50">
          OTP verification and biometric
          login will be activated during
          integration phase.
        </div>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/asira-wallet/login"
            )
          }
          className="mt-5 w-full text-sm text-emerald-400"
        >
          Already have an account? Login
        </button>
      </form>
    </main>
  );
}