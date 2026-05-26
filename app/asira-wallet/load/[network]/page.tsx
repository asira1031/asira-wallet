"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function NetworkLoadPage() {
  const router = useRouter();
  const params = useParams();

  const network = String(params.network || "").toUpperCase();

  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");

  function handleBuyLoad() {
    if (!mobile || !amount) {
      alert("Please enter mobile number and amount.");
      return;
    }

    alert(`${network} load request created: ₱${amount} for ${mobile}`);
    router.push("/asira-wallet/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-5 py-6 text-black">
      <div className="mx-auto max-w-sm">
        <button onClick={() => router.back()} className="mb-6 text-3xl">
          ←
        </button>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">{network} Load</h1>

          <p className="mt-3 text-gray-500">
            Buy prepaid load using your Asira Wallet.
          </p>

          <div className="mt-8">
            <label className="text-sm text-gray-500">Mobile Number</label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="09XXXXXXXXX"
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
            onClick={handleBuyLoad}
            className="mt-8 w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white"
          >
            Buy Load
          </button>
        </div>
      </div>
    </main>
  );
}