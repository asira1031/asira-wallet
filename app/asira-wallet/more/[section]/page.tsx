"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function MoreSectionPage() {
  const router = useRouter();
  const params = useParams();

  const [fullName, setFullName] = useState("Asira User");
  const [phone, setPhone] = useState("09XXXXXXXXX");

  const rawSection = String(params.section || "");
  const section = rawSection.replaceAll("-", " ");

  useEffect(() => {
    setFullName(localStorage.getItem("asira_wallet_full_name") || "Asira User");
    setPhone(localStorage.getItem("asira_wallet_phone") || "09XXXXXXXXX");
  }, []);

  const walletId = "AW-CLIENT-0001";

  function titleCase(text: string) {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function renderContent() {
    if (rawSection === "profile") {
      return (
        <div className="space-y-4">
          <Info label="Full Name" value={fullName} />
          <Info label="Phone Number" value={phone} />
          <Info label="Wallet ID" value={walletId} />
          <Info label="Account Status" value="Verified Demo Account" />
        </div>
      );
    }

    if (rawSection === "security") {
      return (
        <div className="space-y-4">
          <Info label="6-Digit PIN" value="Enabled" />
          <Info label="Biometric Login" value="Coming Soon" />
          <Info label="Device Lock" value="Active" />
          <Info label="Security Level" value="Standard" />
        </div>
      );
    }

    if (rawSection === "notifications") {
      return (
        <div className="space-y-4">
          <Info label="Cash In Alerts" value="Enabled" />
          <Info label="Transfer Alerts" value="Enabled" />
          <Info label="Promo Alerts" value="Enabled" />
          <Info label="Email Notifications" value="Coming Soon" />
        </div>
      );
    }

    if (rawSection === "transaction-limits") {
      return (
        <div className="space-y-4">
          <Info label="Daily Transfer Limit" value="₱50,000" />
          <Info label="Monthly Limit" value="₱500,000" />
          <Info label="Cash In Limit" value="₱100,000 / day" />
          <Info label="Crypto Demo Limit" value="₱20,000 / day" />
        </div>
      );
    }

    if (rawSection === "help-center") {
      return (
        <div className="space-y-4">
          <Info label="Support Email" value="support@asira-wallet.com" />
          <Info label="Help Topic" value="Cash In, Send Money, Bills, Crypto" />
          <Info label="Response Time" value="24-48 hours" />
          <Info label="Emergency Support" value="Coming Soon" />
        </div>
      );
    }

    if (rawSection === "about-asira-wallet") {
      return (
        <div className="space-y-4">
          <Info label="App Name" value="Asira Wallet" />
          <Info label="Version" value="1.0.0 Demo" />
          <Info label="Environment" value="Development / Vercel" />
          <Info label="Status" value="Prototype Active" />
        </div>
      );
    }

    return (
      <div className="rounded-3xl bg-gray-100 p-5">
        <p className="text-gray-500">This section is ready.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-6 py-8 text-black">
      <div className="mx-auto max-w-sm">
        <button onClick={() => router.back()} className="mb-8 text-3xl">
          ←
        </button>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">{titleCase(section)}</h1>

          <p className="mt-3 text-gray-500">
            Manage your {titleCase(section)} settings.
          </p>

          <div className="mt-8">{renderContent()}</div>

          <button
            onClick={() => router.push("/asira-wallet/dashboard")}
            className="mt-8 w-full rounded-2xl bg-emerald-600 py-4 font-bold text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-gray-100 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}