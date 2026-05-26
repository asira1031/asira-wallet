"use client";

import { useState } from "react";

export default function SendMoneyPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();

    if (!recipient || !amount) {
      setMessage("Please enter recipient and amount.");
      return;
    }

    setMessage("✅ Send money request created.");
  }

  return (
    <main className="min-h-screen bg-white text-black px-6 py-8">
      <form onSubmit={handleContinue} className="mx-auto max-w-sm">
        <div className="mb-8 flex items-center gap-4">
          <button type="button" className="text-3xl">←</button>
          <h1 className="text-xl font-semibold">Send money</h1>
        </div>

        <p className="mb-4 text-sm font-semibold tracking-widest text-gray-500">
          MY FAVORITES
        </p>

        <div className="mb-8 rounded-2xl border border-dashed border-gray-300 px-5 py-4 text-gray-500">
          Complete a transaction<br />to add it to your favorites
        </div>

        <div className="mb-4 rounded-2xl bg-gray-100 px-4 py-3">
          <label className="block text-sm font-semibold text-emerald-600">
            Recipient
          </label>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-transparent text-lg outline-none"
            placeholder="ex. Maya, @maya, or 090"
          />
        </div>

        <div className="mb-2 rounded-2xl bg-gray-100 px-4 py-3">
          <label className="block text-sm font-semibold text-emerald-600">
            Amount
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-lg outline-none"
            placeholder="Enter amount"
            type="number"
          />
        </div>

        <p className="mb-4 px-4 text-sm text-gray-500">
          You have ₱5.30 in your wallet.
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

        {message && <p className="mb-4 text-sm text-emerald-600">{message}</p>}

        <button className="w-full rounded-2xl bg-emerald-500 py-4 font-bold text-black">
          Continue
        </button>
      </form>
    </main>
  );
}