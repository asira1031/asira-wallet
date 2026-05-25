export default function HistoryPage() {
  const transactions = [
    {
      title: "Send Money",
      reference: "AW-SEND-1779680722922",
      amount: "₱100.00",
      status: "COMPLETED",
      description: "Sent to AW-CLIENT-0002",
      date: "5/25/2026, 11:45:21 AM",
    },
    {
      title: "Cash In",
      reference: "AW-CASHIN-1779677021882",
      amount: "₱999.00",
      status: "COMPLETED",
      description: "Cash in via GCash",
      date: "5/25/2026, 10:43:41 AM",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold">
          Transaction History
        </h1>

        <p className="text-white/40 mt-2">
          Wallet activity and transfers
        </p>

        <div className="mt-8 space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.reference}
              className="rounded-3xl bg-white/5 border border-white/10 p-5"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-lg">
                    {tx.title}
                  </h2>

                  <p className="text-white/40 text-sm mt-1">
                    {tx.reference}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    {tx.amount}
                  </p>

                  <p className="text-sm mt-1 text-emerald-400">
                    {tx.status}
                  </p>
                </div>
              </div>

              <p className="text-white/50 text-sm mt-4">
                {tx.description}
              </p>

              <p className="text-white/30 text-xs mt-2">
                {tx.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}