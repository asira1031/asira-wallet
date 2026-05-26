"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function BillerPaymentPage() {
  const router = useRouter();
  const params = useParams();

  const biller = String(params.biller || "").toUpperCase();

  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  function handlePayBill() {
    if (!accountNumber || !amount) {
      alert("Please enter account number and amount.");
      return;
    }

    alert(`${biller} bill payment created: ₱${amount}`);
    router.push("/asira-wallet/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-5 py-6 text-black">
      <div className="mx-auto max-w-sm">
        <button onClick={() => router.back()} className="mb-6 text-3xl">
          ←
        </button>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">{biller}</h1>

          <p className="mt-3 text-gray-500">
            Pay your {biller} bill using Asira Wallet.
          </p>

          <div className="mt-8">
            <label className="text-sm text-gray-500">
              Account / Reference Number
            </label>
            <input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              className="mt-2 w-full rounded-2xl bg-gray-100 px-4 py-4 outline-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm text-gray-500">Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="₱0.00"
              inputMode="decimal"
              className="mt-2 w-full rounded-2xl bg-gray-100 px-4 py-4 outline-none"
            />
          </div>

          <button
            onClick={handlePayBill}
            className="mt-8 w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white"
          >
            Pay Bill
          </button>
        </div>
      </div>
    </main>
  );
}