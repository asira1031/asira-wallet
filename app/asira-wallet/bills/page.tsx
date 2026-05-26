"use client";

import { useRouter } from "next/navigation";

export default function BillsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-6 py-8 text-black">
      <div className="mx-auto max-w-sm">
        <button
          onClick={() => router.back()}
          className="mb-8 text-3xl"
        >
          ←
        </button>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">
            Bills
          </h1>

          <p className="mt-3 text-gray-500">
            Pay utilities and other bills using Asira Wallet.
          </p>
        </div>
      </div>
    </main>
  );
}