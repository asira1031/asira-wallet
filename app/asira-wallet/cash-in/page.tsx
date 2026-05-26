"use client";

import { useRouter } from "next/navigation";

export default function CashInPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-6 py-8 text-black">
      <div className="mx-auto max-w-sm">
        <button onClick={() => router.back()} className="mb-8 text-3xl">←</button>
        <h1 className="mb-2 text-3xl font-bold">Cash In</h1>
        <p className="mb-8 text-gray-500">Add money to your Asira Wallet.</p>

        <div className="space-y-4">
          {["Bank Transfer", "E-wallet", "Card", "Crypto"].map((item) => (
            <button key={item} className="w-full rounded-3xl bg-white p-5 text-left font-bold shadow-sm">
              {item} <span className="float-right">›</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}