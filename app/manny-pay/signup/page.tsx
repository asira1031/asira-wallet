"use client";

import { useState } from "react";
import Image from "next/image";

export default function MannyPaySignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [pin, setPin] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSendOtp() {
    console.log("SEND OTP BUTTON CLICKED");

    if (!fullName || !email || !mobile || !birthday || !birthPlace || !pin) {
      alert("Please complete all fields.");
      return;
    }

    if (pin.length !== 6) {
      alert("PIN must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/manny-pay/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone: mobile,
          password: pin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Failed to send OTP.");
        return;
      }

      setOtpSent(true);
      alert("OTP sent to your email.");
    } catch (error) {
      console.error("SEND OTP FRONTEND ERROR:", error);
      alert("Send OTP error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    if (!otp) {
      alert("Please enter OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/manny-pay/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "OTP verification failed.");
        return;
      }

      localStorage.setItem("manny_pay_wallet_logged_in", "yes");
      localStorage.setItem("manny_pay_wallet_full_name", fullName);
      localStorage.setItem("manny_pay_wallet_email", email);
      localStorage.setItem("manny_pay_wallet_phone", mobile);
      localStorage.setItem(`manny_pay_wallet_balance_${mobile}`, "0");

      alert("Email verified. Wallet account created successfully.");
      window.location.href = "/manny-pay/dashboard";
    } catch (error) {
      console.error("VERIFY OTP FRONTEND ERROR:", error);
      alert("Verify OTP error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="mb-6 flex flex-col items-center">
          <Image
            src="/icon-192.png"
            alt="Manny Pay Wallet"
            width={90}
            height={90}
            priority
            className="rounded-3xl bg-white p-2 shadow-lg"
          />

          <h1 className="mt-4 text-3xl font-bold">MANNY PAY</h1>
          <p className="mt-2 text-white/50">Mobile fintech super app</p>
        </div>

        <label className="mb-2 block text-sm text-white/60">Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={otpSent}
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none disabled:opacity-60"
        />

        <label className="mb-2 block text-sm text-white/60">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none disabled:opacity-60"
        />

        <label className="mb-2 block text-sm text-white/60">Phone Number</label>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={otpSent}
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none disabled:opacity-60"
        />

        <label className="mb-2 block text-sm text-white/60">Birthday</label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          disabled={otpSent}
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none disabled:opacity-60"
        />

        <label className="mb-2 block text-sm text-white/60">Birth Place</label>
        <input
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          disabled={otpSent}
          className="mb-5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none disabled:opacity-60"
        />

        <label className="mb-2 block text-sm text-white/60">6-Digit PIN</label>
        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          disabled={otpSent}
          className="mb-6 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none disabled:opacity-60"
        />

        {otpSent && (
          <>
            <label className="mb-2 block text-sm text-white/60">
              Email OTP Code
            </label>
            <input
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="mb-6 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
            />
          </>
        )}

        <button
          type="button"
          onClick={() => {
            if (otpSent) {
              handleVerifyOtp();
            } else {
              handleSendOtp();
            }
          }}
          disabled={loading}
          className="w-full rounded-xl bg-[#245BFF] py-3 font-semibold text-white transition hover:bg-[#1E3A8A] disabled:opacity-60"
        >
          {loading
            ? otpSent
              ? "Verifying OTP..."
              : "Sending OTP..."
            : otpSent
            ? "Verify OTP"
            : "Send OTP"}
        </button>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/manny-pay/login";
          }}
          className="mt-5 w-full text-sm text-[#60A5FA] transition hover:text-[#93C5FD]"
        >
          Already have an account? Login
        </button>
      </div>
    </main>
  );
}