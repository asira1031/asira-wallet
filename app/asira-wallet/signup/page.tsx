"use client";

export default function AsiraWalletSignupPage() {
  function goDashboard() {
    alert("Continue clicked");

    localStorage.setItem("asira_wallet_logged_in", "yes");
    localStorage.setItem("asira_wallet_full_name", "Asira User");
    localStorage.setItem("asira_wallet_phone", "09000000000");
    localStorage.setItem("asira_wallet_balance_09000000000", "0");

    window.location.href = "/asira-wallet/dashboard";
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-md rounded-3xl bg-white/10 p-6">
        <h1 className="text-3xl font-bold">ASIRA WALLET</h1>
        <p className="mt-2 text-white/60">Create your wallet account</p>

        <input className="mt-8 w-full rounded-xl p-4 text-black" placeholder="Full name" />
        <input className="mt-4 w-full rounded-xl p-4 text-black" placeholder="Phone number" />
        <input className="mt-4 w-full rounded-xl p-4 text-black" type="date" />
        <input className="mt-4 w-full rounded-xl p-4 text-black" placeholder="Birth place" />
        <input className="mt-4 w-full rounded-xl p-4 text-black" placeholder="6-digit PIN" />

        <button
          onClick={goDashboard}
          className="mt-8 block w-full rounded-xl bg-emerald-500 p-4 font-bold text-black"
        >
          Continue
        </button>

        <button
          onClick={() => (window.location.href = "/asira-wallet/login")}
          className="mt-5 block w-full text-emerald-400"
        >
          Already have an account? Login
        </button>
      </div>
    </main>
  );
}