"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Game = "lucky" | "wheel" | "bingo";
type View = Game | "lobby";

const symbols = ["☀️", "🥭", "🚍", "⭐", "❤️"];
const bingoCard = [2, 6, 11, 15, 20, 22, 27, 31, 38, 41, 47, 52, 58, 63, 68];
const wheelRewards = ["+10 XP", "+15 XP", "+20 XP", "+25 XP", "Try again", "+30 XP"];

export default function PlaygroundPage() {
  const router = useRouter();
  const [game, setGame] = useState<View>("lobby");
  const [reels, setReels] = useState(["☀️", "🚍", "🥭"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState("Ready for a quick play?");
  const [xp, setXp] = useState(60);
  const [wheelResult, setWheelResult] = useState("Tap the wheel to play");
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [calledNumber, setCalledNumber] = useState<number | null>(null);

  const markedCount = useMemo(
    () => bingoCard.filter((number) => drawnNumbers.includes(number)).length,
    [drawnNumbers]
  );

  function addXp(amount: number) {
    setXp((current) => Math.min(100, current + amount));
  }

  function spinReels() {
    if (isSpinning) return;
    setIsSpinning(true);
    setMessage("Spinning...");

    window.setTimeout(() => {
      const nextReels = Array.from(
        { length: 3 },
        () => symbols[Math.floor(Math.random() * symbols.length)]
      );
      const allMatch = nextReels.every((symbol) => symbol === nextReels[0]);
      setReels(nextReels);
      setMessage(allMatch ? "Festival match! +20 XP" : "Nice spin! +5 XP");
      addXp(allMatch ? 20 : 5);
      setIsSpinning(false);
    }, 650);
  }

  function spinWheel() {
    const reward = wheelRewards[Math.floor(Math.random() * wheelRewards.length)];
    setWheelResult(reward);
    const gained = Number(reward.match(/\d+/)?.[0] || 0);
    if (gained) addXp(gained);
  }

  function drawBingoNumber() {
    const available = Array.from({ length: 75 }, (_, index) => index + 1).filter(
      (number) => !drawnNumbers.includes(number)
    );
    if (!available.length) return;
    const nextNumber = available[Math.floor(Math.random() * available.length)];
    setCalledNumber(nextNumber);
    setDrawnNumbers((numbers) => [...numbers, nextNumber]);
    if (bingoCard.includes(nextNumber)) addXp(5);
  }

  return (
    <main className="casino-plus relative min-h-screen overflow-hidden bg-[#06152f] px-4 py-6 pb-12 text-white">
      <Image src="/playground-fiesta.png" alt="Filipino fiesta arcade background" fill priority className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-[#06152f]/75" />

      <div className="relative mx-auto max-w-sm">
        <header className="mb-6 flex items-center justify-between">
          <button type="button" onClick={() => router.back()} aria-label="Go back" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-2xl">←</button>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Pay Money</p>
            <h1 className="text-2xl font-black">PLAYGROUND</h1>
          </div>
        </header>

        {game === "lobby" && (
          <section className="mt-3 space-y-4" aria-label="Playground games">
            <h2 className="text-center text-xl font-black">Choose a game</h2>
            {[
              { id: "lucky", name: "Lucky Bayan", description: "Match fiesta symbols and earn demo XP.", icon: "☀️", accent: "from-[#f33228] to-[#c41831]", artwork: "🌞 🥭 🚍" },
              { id: "wheel", name: "Fiesta Wheel", description: "Tap the colorful wheel for a demo round.", icon: "🎡", accent: "from-[#0e63df] to-[#173f9b]", artwork: "🎡 ✨ 🎉" },
              { id: "bingo", name: "Bingo Rush", description: "Draw numbers and mark your bingo card.", icon: "🎱", accent: "from-[#673ab7] to-[#34216f]", artwork: "🎱 7 25" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGame(item.id as Game)}
                className="group relative w-full overflow-hidden rounded-[2rem] border border-white/20 bg-[#071b3b]/90 p-5 text-left shadow-2xl transition hover:-translate-y-1 hover:border-amber-300/60"
              >
                <div className={`absolute inset-y-0 right-0 w-2/5 bg-gradient-to-bl ${item.accent} opacity-75`} />
                <div className="relative flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-4xl shadow-lg">{item.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-black">{item.name}</span>
                    <span className="mt-1 block text-sm leading-5 text-white/70">{item.description}</span>
                    <span className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-black text-[#06152f]">PLAY <span className="ml-2">→</span></span>
                  </span>
                  <span aria-hidden className="hidden text-right text-2xl sm:block">{item.artwork}</span>
                </div>
              </button>
            ))}
          </section>
        )}

        {game !== "lobby" && (
          <button type="button" onClick={() => setGame("lobby")} className="mt-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/20">← All games</button>
        )}

        {game === "lucky" && (
          <section className="mt-6 overflow-hidden rounded-[2rem] border border-blue-300/20 bg-[#06152f]/85 p-5 shadow-2xl backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Original mini game</p>
            <h2 className="mt-2 text-3xl font-black">Lucky Bayan</h2>
            <p className="mt-1 text-sm text-white/65">Match Filipino festival symbols for XP.</p>
            <div className="mt-6 grid grid-cols-3 gap-2 rounded-3xl border-4 border-blue-500/40 bg-slate-950/80 p-3 shadow-[0_0_40px_rgba(14,99,223,0.25)]">
              {reels.map((symbol, index) => <div key={`${symbol}-${index}`} className={`flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-b from-amber-50 to-amber-200 text-5xl shadow-inner ${isSpinning ? "animate-pulse" : ""}`}>{symbol}</div>)}
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-blue-200">{message}</p>
            <button type="button" onClick={spinReels} disabled={isSpinning} className="mt-5 w-full rounded-2xl bg-[#f33228] py-4 text-lg font-black shadow-lg shadow-red-950/40 transition hover:bg-red-500 disabled:opacity-60">{isSpinning ? "SPINNING..." : "SPIN"}</button>
          </section>
        )}

        {game === "wheel" && (
          <section className="mt-6 rounded-[2rem] border border-blue-300/20 bg-[#06152f]/85 p-6 text-center shadow-2xl backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Original mini game</p>
            <h2 className="mt-2 text-3xl font-black">Fiesta Wheel</h2>
            <button type="button" onClick={spinWheel} className="mx-auto mt-7 flex h-56 w-56 items-center justify-center rounded-full border-8 border-amber-300 bg-[conic-gradient(#f33228_0deg_60deg,#0e63df_60deg_120deg,#f6bb38_120deg_180deg,#f33228_180deg_240deg,#0e63df_240deg_300deg,#f6bb38_300deg_360deg)] p-5 shadow-[0_0_45px_rgba(246,187,56,0.5)] transition hover:scale-105">
              <span className="flex h-28 w-28 items-center justify-center rounded-full bg-[#06152f] text-2xl font-black">PLAY</span>
            </button>
            <p className="mt-6 text-xl font-black text-amber-200">{wheelResult}</p>
            <p className="mt-2 text-sm text-white/60">Tap the wheel again for another demo round.</p>
          </section>
        )}

        {game === "bingo" && (
          <section className="mt-6 rounded-[2rem] border border-blue-300/20 bg-[#06152f]/85 p-5 shadow-2xl backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Original mini game</p>
            <h2 className="mt-2 text-3xl font-black">Bingo Rush</h2>
            <div className="mt-5 rounded-3xl bg-white p-3 text-slate-950">
              <div className="grid grid-cols-5 gap-2 text-center text-xs font-black text-blue-800">{"BINGO".split("").map((letter) => <span key={letter}>{letter}</span>)}</div>
              <div className="mt-2 grid grid-cols-5 gap-2">{bingoCard.map((number) => <div key={number} className={`flex aspect-square items-center justify-center rounded-xl text-sm font-black ${drawnNumbers.includes(number) ? "bg-[#f33228] text-white" : "bg-blue-50 text-blue-950"}`}>{number}</div>)}</div>
            </div>
            <p className="mt-4 text-center text-sm text-blue-200">{calledNumber ? `Called number: ${calledNumber}` : "Draw your first number"} · {markedCount} matched</p>
            <button type="button" onClick={drawBingoNumber} className="mt-5 w-full rounded-2xl bg-[#0e63df] py-4 text-lg font-black shadow-lg shadow-blue-950/40 transition hover:bg-blue-500">DRAW NUMBER</button>
          </section>
        )}

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur">
          <div className="flex items-center justify-between text-sm"><span className="font-bold">Playground XP</span><span className="font-black text-amber-300">{xp}/100</span></div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#0e63df] to-amber-300" style={{ width: `${xp}%` }} /></div>
          <p className="mt-4 text-center text-xs text-white/55">Demo points only · No real-money play · For adults 21+ only</p>
        </div>
      </div>
    </main>
  );
}
