"use client";

import { useState } from "react";

const navItems = [
  ["Overview", "⌂"],
  ["Brands", "▥"],
  ["Game Catalog", "⌘"],
  ["Compliance", "◇"],
  ["Integrations", "↗"],
  ["Audit Log", "☷"],
] as const;

const readiness = ["Onboarding", "Configuration", "Integrations", "Testing", "Launch"];

export default function NexusPlatformPage() {
  const [active, setActive] = useState<(typeof navItems)[number][0]>("Overview");
  const [sandboxNotice, setSandboxNotice] = useState(true);

  return (
    <main className="nexus-platform min-h-screen bg-[#071016] text-slate-100">
      <div className="min-h-screen bg-[radial-gradient(circle_at_80%_0%,rgba(44,113,160,0.16),transparent_28%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,28px_28px,28px_28px]">
        <header className="flex min-h-20 items-center justify-between border-b border-white/10 bg-[#0b151d]/90 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center bg-gradient-to-br from-indigo-400 to-cyan-300 text-2xl font-black text-[#071016] [clip-path:polygon(0_0,100%_0,100%_100%,52%_70%,0_100%)]">N</div>
            <div><p className="text-lg font-light tracking-wide">NEXUS <b className="font-semibold">PLATFORM</b></p><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">White-label gaming technology</p></div>
          </div>
          <div className="hidden min-w-[300px] rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400 md:block">⌕ &nbsp; Search operators, games, providers, or integrations…</div>
          <div className="flex items-center gap-3"><span className="hidden h-3 w-3 rounded-full bg-emerald-400 sm:block" /><span className="hidden text-sm text-slate-300 sm:block">Sandbox environment</span><span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-500 text-sm font-bold">JD</span></div>
        </header>

        <div className="flex">
          <aside className="hidden min-h-[calc(100vh-80px)] w-64 shrink-0 border-r border-white/10 bg-[#0a141c]/75 p-4 lg:block">
            <nav className="space-y-1">
              {navItems.map(([label, icon]) => <button key={label} type="button" onClick={() => setActive(label)} className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${active === label ? "bg-indigo-500/25 text-white ring-1 ring-indigo-300/25" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><span className="w-5 text-lg text-cyan-300">{icon}</span>{label}</button>)}
            </nav>
            <div className="mt-16 border-t border-white/10 pt-6 text-[10px] font-bold uppercase tracking-[0.25em] leading-5 text-slate-500">Build<br />Connect<br />Launch<br /><span className="text-cyan-300">—</span><br />Scalable operator infrastructure</div>
          </aside>

          <section className="mx-auto w-full max-w-7xl p-5 sm:p-8">
            <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{active}</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Operator infrastructure</h1><p className="mt-2 text-slate-400">Configure. Integrate. Validate. Launch with a licensed operator.</p></div>
              {sandboxNotice && <div className="flex max-w-xl items-start gap-3 rounded-2xl border border-cyan-300/40 bg-cyan-300/10 p-4 text-sm"><span className="text-xl text-cyan-300">ⓘ</span><span><b>Sandbox only — no player funds or real-money wagering</b><br /><span className="text-slate-400">For integration testing and operator enablement only.</span></span><button type="button" onClick={() => setSandboxNotice(false)} aria-label="Dismiss sandbox notice" className="ml-auto text-slate-400 hover:text-white">×</button></div>}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
              <section className="rounded-2xl border border-white/10 bg-[#0b1821]/85 p-5 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Tenant readiness timeline</h2><button type="button" className="text-sm text-indigo-300 hover:text-white">View all stages →</button></div><div className="relative mt-8 grid grid-cols-5 gap-2 before:absolute before:left-7 before:right-7 before:top-4 before:h-px before:bg-gradient-to-r before:from-cyan-300 before:via-indigo-400 before:to-slate-700">{readiness.map((stage, index) => <div key={stage} className="relative"><div className={`grid h-8 w-8 place-items-center rounded-full border text-sm font-bold ${index < 3 ? "border-cyan-300 bg-cyan-300 text-[#071016]" : index === 3 ? "border-indigo-300 bg-indigo-500/20 text-white" : "border-slate-600 bg-[#0b1821] text-slate-400"}`}>{index < 3 ? "✓" : index + 1}</div><p className="mt-4 text-xs font-bold sm:text-sm">{index + 1}. {stage}</p><p className="mt-2 hidden text-xs leading-5 text-slate-500 sm:block">{["Requirements", "Branding & settings", "Provider feeds", "End-to-end QA", "Approval gate"][index]}</p></div>)}</div></section>
              <section className="rounded-2xl border border-white/10 bg-[#0b1821]/85 p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Operator brands</h2><button type="button" className="text-sm text-indigo-300 hover:text-white">View all →</button></div><div className="mt-4 space-y-3">{[["Aurora Interactive", "Sandbox ready", "A"], ["Vector Play", "In testing", "V"]].map(([name, status, initial]) => <div key={name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-indigo-500/80 to-cyan-400/70 font-black">{initial}</span><span className="min-w-0 flex-1"><b className="block text-sm">{name}</b><span className="text-xs text-slate-500">{status}</span></span><span className="rounded-full border border-emerald-300/50 px-2 py-1 text-xs text-emerald-300">{status}</span></div>)}</div></section>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <section className="rounded-2xl border border-white/10 bg-[#0b1821]/85 p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Compliance checklist</h2><button type="button" className="text-sm text-indigo-300">View details →</button></div><div className="mt-4 space-y-2">{[["KYC", "Identity verification workflows", "Configured"], ["AML", "Monitoring rules", "Configured"], ["Responsible gaming", "Player-protection controls", "In progress"], ["Audit trail", "Logging and reporting", "Configured"]].map(([name, detail, status]) => <div key={name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3"><span className="text-cyan-300">◇</span><span className="min-w-0 flex-1"><b className="block text-sm">{name}</b><span className="block text-xs text-slate-500">{detail}</span></span><span className={`text-xs ${status === "Configured" ? "text-emerald-300" : "text-indigo-300"}`}>{status === "Configured" ? "●" : "●"} {status}</span></div>)}</div></section>
              <section className="rounded-2xl border border-white/10 bg-[#0b1821]/85 p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Provider catalog</h2><button type="button" className="text-sm text-indigo-300">View catalog →</button></div><div className="mt-6 flex gap-8 border-b border-white/10 pb-5"><span><b className="block text-2xl text-cyan-300">42</b><small className="text-slate-500">Providers</small></span><span><b className="block text-2xl text-cyan-300">12,800+</b><small className="text-slate-500">Games available</small></span></div><div className="mt-4 space-y-3 text-sm">{["Helix Studios", "Orbital Games", "Pixel Dynamics", "Nimble Play"].map((provider) => <div key={provider} className="flex items-center justify-between"><span><b>{provider}</b><small className="ml-2 text-slate-500">Integration ready</small></span><span className="text-emerald-300">●</span></div>)}</div></section>
              <section className="rounded-2xl border border-white/10 bg-[#0b1821]/85 p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Recent activity</h2><button type="button" className="text-sm text-indigo-300">Audit log →</button></div><div className="mt-4 space-y-4 text-sm">{[["Brand configuration updated", "Aurora Interactive", "10:12"], ["Game feed synced", "Vector Play", "09:47"], ["Compliance rule updated", "Responsible gaming", "08:31"], ["Integration test completed", "Orbital Games", "06:18"]].map(([title, detail, time]) => <div key={title} className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" /><span className="flex-1"><b className="block">{title}</b><small className="text-slate-500">{detail}</small></span><small className="text-slate-500">{time}</small></div>)}</div></section>
            </div>
            <footer className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-sm text-slate-400 md:grid-cols-4"><span><b className="block text-white">▱ Modular architecture</b>API-first, scalable</span><span><b className="block text-white">◎ Jurisdiction settings</b>Configured per market</span><span><b className="block text-white">◇ Enterprise security</b>Built for regulated environments</span><span><b className="block text-white">◇ End-to-end support</b>From integration to launch</span></footer>
          </section>
        </div>
      </div>
    </main>
  );
}
