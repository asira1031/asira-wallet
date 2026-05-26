"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const [selectedBank, setSelectedBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  function handleTransfer() {
    if (
      !selectedBank ||
      !accountName ||
      !accountNumber ||
      !amount
    ) {
      alert("Please complete all fields.");
      return;
    }

    const transferAmount = Number(amount);

    const currentBalance = Number(
      localStorage.getItem("asira_wallet_balance") || "0"
    );

    if (transferAmount <= 0) {
      alert("Please enter valid amount.");
      return;
    }

    if (transferAmount > currentBalance) {
      alert("Insufficient wallet balance.");
      return;
    }

    const updatedBalance = currentBalance - transferAmount;

    localStorage.setItem(
      "asira_wallet_balance",
      updatedBalance.toString()
    );

    const transaction: WalletTransaction = {
      id: `AW-BANK-${Date.now()}`,
      type: "Bank Transfer",
      amount: transferAmount,
      method: selectedBank,
      status: "Completed",
      recipient: accountName,
      note: accountNumber,
      createdAt: new Date().toISOString(),
    };

    const existing = localStorage.getItem(
      "asira_wallet_transactions"
    );

    const transactions: WalletTransaction[] = existing
      ? JSON.parse(existing)
      : [];

    localStorage.setItem(
      "asira_wallet_transactions",
      JSON.stringify([transaction, ...transactions])
    );

    alert(
      `${selectedBank} transfer successful.\n\nRecipient: ${accountName}\nAmount: ₱${transferAmount.toLocaleString()}`
    );

    router.push("/asira-wallet/dashboard");
  }

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

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <label className="text-sm text-gray-500">
            Select Bank
          </label>

          <select
            value={selectedBank}
            onChange={(e) =>
              setSelectedBank(e.target.value)
            }
            className="mt-2 w-full rounded-2xl bg-gray-100 px-4 py-4 outline-none"
          >
            <option value="">Choose bank</option>

            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>

          <div className="mt-5">
            <label className="text-sm text-gray-500">
              Account Name
            </label>

            <input
              value={accountName}
              onChange={(e) =>
                setAccountName(e.target.value)
              }
              placeholder="Juan Dela Cruz"
              className="mt-2 w-full rounded-2xl bg-gray-100 px-4 py-4 outline-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm text-gray-500">
              Account Number
            </label>

            <input
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value)
              }
              placeholder="0123456789"
              className="mt-2 w-full rounded-2xl bg-gray-100 px-4 py-4 outline-none"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm text-gray-500">
              Amount
            </label>

            <input
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value.replace(/[^0-9.]/g, "")
                )
              }
              placeholder="₱0.00"
              inputMode="decimal"
              className="mt-2 w-full rounded-2xl bg-gray-100 px-4 py-4 outline-none"
            />
          </div>

          <button
            onClick={handleTransfer}
            className="mt-8 w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white"
          >
            Send Money
          </button>
        </div>
      </div>
    </main>
  );
}