"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WalletDashboard() {
  const [wallet, setWallet] = useState<any>(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function loadLoggedInWallet() {
      const savedUser = localStorage.getItem("asira_wallet_user");

      if (!savedUser) {
        window.location.href = "/asira-wallet/login";
        return;
      }

      const parsedUser = JSON.parse(savedUser);
      setWallet(parsedUser);

      const { data } = await supabase
        .from("wallet_users")
        .select("*")
        .eq("wallet_id", parsedUser.wallet_id)
        .single();

      if (data) {
        setWallet(data);
        setBalance(Number(data.balance || 0));
        localStorage.setItem("asira_wallet_user", JSON.stringify(data));
      }
    }

    loadLoggedInWallet();
  }, []);

  function handleLogout() {
    localStorage.removeItem("asira_wallet_user");
    window.location.href = "/asira-wallet/login";
  }

  const actions = [
    { icon: "⬇️", title: "Cash In", href: "/asira-wallet/cash-in" },
    { icon: "⬆️", title: "Cash Out", href: "/asira-wallet/cash-out" },
    { icon: "🏦", title: "Send", href: "/asira-wallet/send" },
    { icon: "🧾", title: "Bills", href: "/asira-wallet/history" },
    { icon: "📱", title: "Pay QR", href: "/asira-wallet/qr" },
    { icon: "📊", title: "History", href: "/asira-wallet/history" },
  ];

  if (!wallet) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/50">Loading wallet...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-28">
      <div className="max-w-md mx-auto">
        <div className="px-5 pt-8 pb-4 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">ASIRA WALLET</h1>
            <p className="text-white/40 text-sm mt-1">
              Welcome, {wallet.full_name || "Wallet User"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/60"
          >
            Logout
          </button>
        </div>

        <div className="px-5">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-green-700 p-6 shadow-2xl">
            <p className="text-white/70 text-sm">Available Balance</p>

            <h2 className="text-5xl font-bold mt-3">
              ₱{balance.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </h2>

            <div className="mt-5 flex justify-between text-sm">
              <div>
                <p className="text-white/60">Wallet ID</p>
                <p className="font-semibold">{wallet.wallet_id}</p>
              </div>

              <div className="text-right">
                <p className="text-white/60">Status</p>
                <p className="font-semibold">VERIFIED</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 mt-8">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-3 gap-4">
            {actions.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="rounded-3xl bg-white/5 border border-white/10 p-5 flex flex-col items-center justify-center hover:bg-white/10 transition"
              >
                <div className="text-3xl">{item.icon}</div>
                <p className="text-sm mt-3 text-center">{item.title}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="px-5 mt-8">
          <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex justify-between">
            <div>
              <p className="font-semibold">Wallet Active</p>
              <p className="text-white/40 text-sm">{wallet.wallet_id}</p>
            </div>

            <div className="text-right">
              <p className="font-bold">₱0.00</p>
              <p className="text-xs mt-1 text-emerald-400">READY</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10">
          <div className="max-w-md mx-auto grid grid-cols-4 py-3">
            <NavItem icon="🏠" label="Home" href="/asira-wallet/dashboard" />
            <NavItem icon="📱" label="QR" href="/asira-wallet/qr" />
            <NavItem icon="💸" label="Send" href="/asira-wallet/send" />
            <NavItem icon="⚙️" label="Settings" href="/asira-wallet/settings" />
          </div>
        </div>
      </div>
    </main>
  );
}

function NavItem({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href: string;
}) {
  return (
    <a href={href} className="flex flex-col items-center text-white/70 text-xs">
      <div className="text-xl">{icon}</div>
      <p className="mt-1">{label}</p>
    </a>
  );
}