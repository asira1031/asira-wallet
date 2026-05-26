"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type WalletTransaction = {
  id: string;
  type: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
  recipient?: string;
  note?: string;
};

export default function SendMoneyPage() {
  const router = useRouter();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!recipient || !amount || Number(amount) <= 0) {
      setMessage("Please enter recipient and valid amount.");
      return;
    }

    const transaction: WalletTransaction = {
      id: `AW-SEND-${Date.now()}`,
      type: "Send Money",
      amount: Number(amount),
      method: "Wallet Transfer",
      status: "Completed",
      recipient,
      note,
      createdAt: new Date().toISOString(),
    };

    const existing = localStorage.getItem("asira_wallet_transactions");
    const transactions: WalletTransaction[] = existing
      ? JSON.parse(existing)
      : [];

    localStorage.setItem(
      "asira_wallet_transactions",
      JSON.stringify([transaction, ...transactions])
    );

    alert(`Money sent: ₱${amount} to ${recipient}`);
    router.push("/asira-wallet/dashboard");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-black">
      <form onSubmit={handleContinue} className="mx-auto max-w-sm">
        <div className="mb-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-3xl"
          >
            ←
          </button>

          <h1 className="text-xl font-semibold">Send money</h1>
        </div>

        <p className="mb-4 text-sm font-semibold tracking-widest text-gray-500">
          MY FAVORITES
        </p>

        <div className="mb-8 rounded-2xl border border-dashed border-gray-300 px-5 py-4 text-gray-500">
          Complete a transaction
          <br />
          to add it to your favorites
        </div>

        <div className="mb-4 rounded-2xl bg-gray-100 px-4 py-3">
          <label className="block text-sm font-semibold text-emerald-600">
            Recipient
          </label>

          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-transparent text-lg outline-none"
            placeholder="Mobile number, wallet ID, or name"
          />
        </div>

        <div className="mb-2 rounded-2xl bg-gray-100 px-4 py-3">
          <label className="block text-sm font-semibold text-emerald-600">
            Amount
          </label>

          <input
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value.replace(/[^0-9.]/g, ""))
            }
            className="w-full bg-transparent text-lg outline-none"
            placeholder="Enter amount"
            inputMode="decimal"
          />
        </div>

        <p className="mb-4 px-4 text-sm text-gray-500">
          Demo wallet transfer. Real balance validation will activate in
          production.
        </p>

        <div className="mb-6 rounded-2xl bg-gray-100 px-4 py-3">
          <label className="block text-sm font-semibold text-emerald-600">
            Note (Optional)
          </label>

          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-transparent text-lg outline-none"
            placeholder="Add a note"
          />
        </div>

        {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

        <button className="w-full rounded-2xl bg-emerald-500 py-4 font-bold text-black">
          Continue
        </button>
      </form>
    </main>
  );
}