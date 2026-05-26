"use client";

import { useRouter } from "next/navigation";

export default function BankTransferPage() {
  const router = useRouter();

  const banks = [
    "BDO",
    "BPI",
    "UnionBank",
    "Metrobank",
    "Landbank",
    "PNB",
    "Security Bank",
    "RCBC",
    "Maya Bank",
    "GCash",
    "GoTyme",
    "CIMB",
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-6 py-8 text-black">
      <div className="mx-auto max-w-sm">
        <button
          onClick={() => router.back()}
          className="mb-8 text-3xl"
        >
          ←
        </button>

        <h1 className="mb-2 text-3xl font-bold">
          Bank Transfer
        </h1>

        <p className="mb-8 text-gray-500">
          Send money directly to bank accounts.
        </p>

        <div className="space-y-4">
          {banks.map((bank) => (
            <button
              key={bank}
              onClick={() =>
                alert(`${bank} integration coming next.`)
              }
              className="w-full rounded-3xl bg-white p-5 text-left shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg">
                    {bank}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Transfer to {bank}
                  </p>
                </div>

                <span className="text-2xl">
                  ›
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}