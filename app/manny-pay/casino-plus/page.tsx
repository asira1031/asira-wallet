"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const platforms = [
  {
    name: "Casino Plus",
    description: "Open the official Casino Plus game lobby.",
    href: "https://www.casinoplus.com.ph/",
    icon: "♠",
    accent: "from-[#f33228] to-[#8d1624]",
  },
  {
    name: "BingoPlus",
    description: "Open the official BingoPlus game platform.",
    href: "https://bingoplus.ph/",
    icon: "B",
    accent: "from-[#0e63df] to-[#123f98]",
  },
  {
    name: "NUSTAR",
    description: "Open the official NUSTAR online platform.",
    href: "https://www.nustaronline.ph/",
    icon: "N",
    accent: "from-[#4d2a90] to-[#1a1557]",
  },
];

export default function CasinoPlusPage() {
  const router = useRouter();

  return (
    <main className="casino-plus min-h-screen bg-[#06152f] px-4 py-6 pb-12 text-white">
      <div className="mx-auto max-w-sm">
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-2xl transition hover:bg-white/20"
          >
            ←
          </button>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">Pay Money</p>
            <h1 className="text-2xl font-black tracking-tight">GAMES</h1>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a2145] shadow-2xl">
          <Image
            src="/casino-plus-hero.png"
            alt="Games platform artwork"
            width={1536}
            height={864}
            priority
            className="h-52 w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06152f] via-[#06152f]/80 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-[62%] flex-col justify-center p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Official access</p>
            <h2 className="mt-2 text-3xl font-black leading-none">Choose a game platform.</h2>
            <p className="mt-3 text-xs leading-5 text-white/70">You will continue on the platform&apos;s official website.</p>
          </div>
        </section>

        <section className="mt-7">
          <button
            type="button"
            onClick={() => router.push("/manny-pay/playground")}
            className="mb-6 flex w-full items-center gap-4 rounded-3xl border border-amber-300/30 bg-gradient-to-r from-[#0e63df] to-[#f33228] p-5 text-left shadow-xl transition hover:-translate-y-1"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">🎮</span>
            <span className="flex-1">
              <span className="block text-lg font-black">Playground demos</span>
              <span className="mt-1 block text-sm text-white/80">Try our original free-to-play mini games.</span>
            </span>
            <span aria-hidden className="text-xl">→</span>
          </button>
          <h2 className="text-xl font-black">Official game platforms</h2>
          <p className="mt-1 text-sm text-white/55">Select a provider to continue.</p>

          <div className="mt-4 space-y-3">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg transition hover:-translate-y-1 hover:border-blue-400/60 hover:bg-white/10"
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${platform.accent} text-2xl font-black shadow-lg`}>
                  {platform.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-black">{platform.name}</span>
                  <span className="mt-1 block text-sm text-white/55">{platform.description}</span>
                </span>
                <span aria-hidden className="text-xl text-white/60 transition group-hover:translate-x-1">↗</span>
              </a>
            ))}
          </div>
        </section>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-bold">Before you continue</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">Game access, account registration, and any transactions are handled directly by the selected official platform.</p>
        </div>

        <p className="mx-auto mt-7 max-w-xs text-center text-xs leading-5 text-white/45">For adults 21+ only. Please play responsibly.</p>
      </div>
    </main>
  );
}
