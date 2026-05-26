"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

type Tab = "wallet" | "savings" | "credit" | "loans" | "cards";

type WalletTransaction = {
  id: string;
  type: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
};

export default function AsiraWalletDashboard() {
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("wallet");
  const [showQr, setShowQr] = useState(false);
  const [fullName, setFullName] = useState("Asira User");
  const [phone, setPhone] = useState("");
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  const savingsAccount = "ASIRA-SAV-0000000001";

  useEffect(() => {
    const loggedIn = localStorage.getItem("asira_wallet_logged_in");

    if (loggedIn !== "yes") {
      router.push("/asira-wallet/login");
      return;
    }

    setFullName(localStorage.getItem("asira_wallet_full_name") || "Asira User");
    setPhone(localStorage.getItem("asira_wallet_phone") || "");

    const stored = localStorage.getItem("asira_wallet_transactions");
    setTransactions(stored ? JSON.parse(stored) : []);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("asira_wallet_logged_in");
    localStorage.removeItem("asira_wallet_phone");
    localStorage.removeItem("asira_wallet_full_name");
    localStorage.removeItem("asira_wallet_email");

    router.push("/asira-wallet/login");
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-4 py-6 text-black">
      <div className="mx-auto max-w-sm pb-32">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-black text-emerald-700">
              {fullName.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm text-gray-500">Welcome back</p>
              <h2 className="text-lg font-bold">{fullName}</h2>
              {phone && <p className="text-xs text-gray-400">{phone}</p>}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 flex gap-3 overflow-x-auto">
          {["wallet", "savings", "credit", "loans", "cards"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item as Tab)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm capitalize ${
                tab === item ? "bg-black text-white" : "text-gray-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "wallet" && (
          <>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h1 className="text-5xl font-bold">₱0.00</h1>

              <p className="mt-1 text-gray-500">
                Wallet balance{" "}
                <span className="font-bold text-emerald-600">
                  Auto cash in
                </span>
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => router.push("/asira-wallet/cash-in")}
                  className="rounded-2xl bg-emerald-100 py-4 font-bold text-emerald-700"
                >
                  ↙ Cash in
                </button>

                <button
                  onClick={() => router.push("/asira-wallet/send-money")}
                  className="rounded-2xl bg-emerald-100 py-4 font-bold text-emerald-700"
                >
                  ↗ Send
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-4 text-center text-sm">
              {[
                { label: "Bank transfer", icon: "🏦" },
                { label: "Raffle Promo", icon: "🎟️" },
                { label: "Crypto", icon: "◆" },
                { label: "Refer & Earn", icon: "🧍‍♀️💸" },
                { label: "Load", icon: "📱" },
                { label: "Bills", icon: "🧾" },
                { label: "Shop", icon: "🛍️" },
                { label: "More", icon: "M" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    const routes: Record<string, string> = {
                      "Bank transfer": "/asira-wallet/bank-transfer",
                      "Raffle Promo": "/asira-wallet/raffle-promo",
                      Crypto: "/asira-wallet/crypto",
                      "Refer & Earn": "/asira-wallet/refer-earn",
                      Load: "/asira-wallet/load",
                      Bills: "/asira-wallet/bills",
                      Shop: "/asira-wallet/shop",
                      More: "/asira-wallet/more",
                    };

                    router.push(routes[item.label]);
                  }}
                  className="text-center"
                >
                  <div className="mb-2 flex h-20 items-center justify-center rounded-3xl bg-white text-3xl font-black shadow-sm">
                    {item.icon}
                  </div>

                  <p className="leading-tight text-gray-500">{item.label}</p>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-3xl font-bold">Transactions</h2>

                <button
                  onClick={() => router.push("/asira-wallet/history")}
                  className="font-bold text-emerald-600"
                >
                  See all
                </button>
              </div>

              <div className="space-y-3">
                {transactions.length === 0 ? (
                  <div className="rounded-2xl bg-gray-100 p-5 text-center text-gray-500">
                    No transactions yet
                  </div>
                ) : (
                  transactions.slice(0, 3).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between rounded-2xl bg-gray-100 p-4"
                    >
                      <div>
                        <p className="font-bold">{tx.type}</p>
                        <p className="text-sm text-gray-500">{tx.method}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(tx.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">
                          ₱{Number(tx.amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-emerald-600">{tx.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {tab === "savings" && (
          <>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h1 className="text-5xl font-bold">₱0.00</h1>
              <p className="mt-1 text-gray-500">Total savings</p>

              <p className="mt-5 text-sm text-gray-500">
                Savings Account Number
              </p>

              <p className="font-bold">{savingsAccount}</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="rounded-2xl bg-emerald-100 py-4 font-bold text-emerald-700">
                  ↙ Deposit
                </button>

                <button className="rounded-2xl bg-emerald-100 py-4 font-bold text-emerald-700">
                  ↗ Transfer
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-emerald-600 p-5 text-white">
              <p className="text-sm">ASIRA SAVINGS</p>
              <h2 className="mt-3 text-3xl font-bold">My Savings ›</h2>
              <p className="mt-3">Grow your savings safely with Asira Wallet.</p>
            </div>
          </>
        )}

        {tab === "credit" && (
          <>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h1 className="text-5xl font-bold">₱0.00</h1>
              <p className="mt-1 text-gray-500">Available credit</p>

              <div className="mt-6 h-1 rounded-full bg-emerald-500"></div>

              <button className="mt-6 w-full rounded-2xl bg-emerald-100 py-4 font-bold text-emerald-700">
                Transfer to wallet
              </button>
            </div>

            <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <h2 className="text-3xl font-bold">Outstanding balance</h2>
                <p className="text-2xl font-bold">₱0.00</p>
              </div>

              <p className="mt-3 text-gray-500">No unpaid balance.</p>

              <button className="mt-6 w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white">
                Pay now
              </button>
            </div>
          </>
        )}

        {tab === "loans" && (
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h1 className="text-3xl font-bold">Asira Loans</h1>

            <p className="mt-3 text-gray-500">
              Check your loan eligibility and status.
            </p>

            <button className="mt-6 w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white">
              Apply now
            </button>
          </div>
        )}

        {tab === "cards" && (
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h1 className="text-3xl font-bold">Asira Card</h1>

            <p className="mt-3 text-gray-500">
              Your virtual card will appear here.
            </p>

            <button className="mt-6 w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white">
              Activate card
            </button>
          </div>
        )}

        {showQr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center">
              <h2 className="mb-4 text-2xl font-bold">QR</h2>

              <div className="mx-auto mb-4 flex h-56 w-56 items-center justify-center rounded-2xl border bg-white p-4">
                <QRCodeCanvas
                  value={`ASIRA-WALLET:${phone || "AW-CLIENT-0001"}`}
                  size={190}
                  level="H"
                  includeMargin
                />
              </div>

              <p className="text-sm text-gray-500">
                Use this QR to receive money.
              </p>

              <button
                onClick={() => setShowQr(false)}
                className="mt-6 w-full rounded-2xl bg-black py-3 font-bold text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 gap-10 rounded-3xl bg-black px-10 py-5 text-white shadow-2xl">
          <button onClick={() => setShowQr(true)} className="text-center">
            <div className="text-2xl">▦</div>
            <p className="mt-1 text-xs">QR</p>
          </button>

          <button
            onClick={() => router.push("/asira-wallet/qr-scan")}
            className="text-center"
          >
            <div className="text-2xl">📷</div>
            <p className="mt-1 text-xs">Scan</p>
          </button>
        </div>
      </div>
    </main>
  );
}