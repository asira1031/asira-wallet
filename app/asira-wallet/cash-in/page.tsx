"use client";

import { useState } from "react";

const methods = [
  "GCash",
  "Maya",
  "BDO",
  "BPI",
  "UnionBank",
  "Metrobank",
  "RCBC",
  "Security Bank",
];

export default function CashInPage() {
  const [selected, setSelected] = useState("GCash");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const isEwallet = selected === "GCash" || selected === "Maya";

  function handleCashIn() {
    if (!amount || Number(amount) <= 0) {
      setMessage("❌ Invalid amount");
      return;
    }

    setMessage(`✅ Cash in submitted successfully. Reference: AW-CASHIN-${Date.now()}`);
    setAmount("");
  }

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-md mx-auto px-5 pt-8">
        <h1 className="text-3xl font-bold">Cash In</h1>
        <p className="text-white/40 mt-2">Add funds to your wallet</p>

        <div className="mt-8">
          <p className="text-sm text-white/50 mb-3">Amount</p>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            type="number"
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none text-2xl"
          />
        </div>

        <div className="mt-8">
          <p className="text-sm text-white/50 mb-4">Select Method</p>

          <div className="grid grid-cols-2 gap-3">
            {methods.map((item) => (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`rounded-2xl p-4 border transition ${
                  selected === item
                    ? "bg-emerald-500 text-black border-emerald-500"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 p-5">
          <div className="flex justify-between">
            <p className="text-white/50">Selected</p>
            <p className="font-semibold">{selected}</p>
          </div>

          <div className="flex justify-between mt-4">
            <p className="text-white/50">Amount</p>
            <p className="font-semibold">₱{amount || "0"}</p>
          </div>
        </div>

        {isEwallet ? (
          <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-5">
            <p className="text-white/50 text-sm">
              {selected} Receiver Number
            </p>

            <p className="font-bold text-xl mt-2">0917-000-0001</p>

            <button className="w-full mt-5 rounded-2xl bg-white/10 border border-white/10 py-4 font-semibold">
              Scan QR Code
            </button>

            <div className="mt-4 rounded-2xl bg-black/40 p-4 text-sm text-white/50">
              Scan QR Code or send payment directly to this {selected} number.
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-5">
            <div className="flex justify-between">
              <p className="text-white/50">Bank</p>
              <p className="font-semibold">{selected}</p>
            </div>

            <div className="flex justify-between mt-4">
              <p className="text-white/50">Account Name</p>
              <p className="font-semibold text-right">ASIRA WALLET INC.</p>
            </div>

            <div className="flex justify-between mt-4">
              <p className="text-white/50">Account Number</p>
              <p className="font-semibold">1234567890</p>
            </div>

            <div className="flex justify-between mt-4">
              <p className="text-white/50">Transfer Type</p>
              <p className="font-semibold">InstaPay / PESONet</p>
            </div>

            <div className="mt-4 rounded-2xl bg-black/40 p-4 text-sm text-white/50">
              Transfer from your bank app to the account above. Use your wallet
              ID as reference: AW-CLIENT-0001.
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="text-sm text-white/50 mb-3">Upload Receipt</p>

          <input
            type="file"
            accept="image/*"
            className="w-full rounded-2xl bg-white/5 border border-white/10 p-4"
          />
        </div>

        {message && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            {message}
          </div>
        )}

        <button
          onClick={handleCashIn}
          disabled={!amount || Number(amount) <= 0}
          className="w-full mt-8 rounded-2xl bg-emerald-500 text-black py-4 font-bold text-lg disabled:opacity-50"
        >
          Continue Cash In
        </button>
      </div>
    </main>
  );
}