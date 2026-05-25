"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);

  const isEwallet =
    selected === "GCash" || selected === "Maya";

  async function handleCashIn() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/asira-wallet/cash-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        method: selected,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      setMessage(`❌ ${data.message}`);
      setLoading(false);
      return;
    }

    const reference = data.reference;

    if (receipt) {
      const formData = new FormData();

      formData.append("file", receipt);
      formData.append("reference", reference);

      const uploadRes = await fetch(
        "/api/asira-wallet/upload-receipt",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadData.ok) {
        setMessage(`❌ ${uploadData.message}`);
        setLoading(false);
        return;
      }
    }

    setMessage(
      `✅ Cash in submitted successfully. Reference: ${reference}`
    );

    setAmount("");
    setReceipt(null);

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-md mx-auto px-5 pt-8">
        <h1 className="text-3xl font-bold">
          Cash In
        </h1>

        <p className="text-white/40 mt-2">
          Add funds to your wallet
        </p>

        <div className="mt-8">
          <p className="text-sm text-white/50 mb-3">
            Amount
          </p>

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            type="number"
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none text-2xl"
          />
        </div>

        <div className="mt-8">
          <p className="text-sm text-white/50 mb-4">
            Select Method
          </p>

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
            <p className="text-white/50">
              Selected
            </p>

            <p className="font-semibold">
              {selected}
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <p className="text-white/50">
              Amount
            </p>

            <p className="font-semibold">
              ₱{amount || "0"}
            </p>
          </div>
        </div>

        {isEwallet ? (
          <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-5">
            <p className="text-white/50 text-sm">
              {selected} Receiver Number
            </p>

            <p className="font-bold text-xl mt-2">
              0917-000-0001
            </p>

            <button
              onClick={() => setShowQR(true)}
              className="w-full mt-5 rounded-2xl bg-white/10 border border-white/10 py-4 font-semibold"
            >
              Scan QR Code
            </button>

            <div className="mt-4 rounded-2xl bg-black/40 p-4 text-sm text-white/50">
              Scan QR Code or send payment directly
              to this {selected} number.
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-5">
            <div className="flex justify-between">
              <p className="text-white/50">
                Bank
              </p>

              <p className="font-semibold">
                {selected}
              </p>
            </div>

            <div className="flex justify-between mt-4">
              <p className="text-white/50">
                Account Name
              </p>

              <p className="font-semibold text-right">
                ASIRA WALLET INC.
              </p>
            </div>

            <div className="flex justify-between mt-4">
              <p className="text-white/50">
                Account Number
              </p>

              <p className="font-semibold">
                1234567890
              </p>
            </div>

            <div className="flex justify-between mt-4">
              <p className="text-white/50">
                Transfer Type
              </p>

              <p className="font-semibold">
                InstaPay / PESONet
              </p>
            </div>

            <div className="mt-4 rounded-2xl bg-black/40 p-4 text-sm text-white/50">
              Transfer from your bank app to the
              account above. Use your wallet ID as
              reference: AW-CLIENT-0001.
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="text-sm text-white/50 mb-3">
            Upload Receipt
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setReceipt(
                e.target.files?.[0] || null
              )
            }
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
          disabled={
            loading ||
            !amount ||
            Number(amount) <= 0
          }
          className="w-full mt-8 rounded-2xl bg-emerald-500 text-black py-4 font-bold text-lg disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Continue Cash In"}
        </button>
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-5">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-black text-2xl font-bold text-center">
              QR Code
            </h2>

            <div className="mt-6 flex justify-center">
              <QRCodeCanvas
                value={`${selected}|09170000001|${
                  amount || 0
                }|AW-CLIENT-0001`}
                size={220}
              />
            </div>

            <p className="text-center text-gray-500 text-sm mt-5">
              Scan QR Code using {selected}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}