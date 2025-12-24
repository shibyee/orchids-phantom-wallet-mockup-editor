"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, 
  Cpu, 
  Key, 
  Download, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronDown, 
  Search, 
  Maximize2, 
  Copy, 
  ArrowDownLeft, 
  ArrowUpRight, 
  RefreshCw, 
  DollarSign, 
  Settings2,
  Pencil
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "phantom_mock_data_v2";

const DEFAULTS = {
  chain: "Solana",
  name: "1111",
  addr: "7fXB…Hin7",
  dots: 86,
  homeName: "111",
  bal: "1.24",
  delta: "-0.0175",
  pct: "-1.39",
  banner: "Meet Phantom Terminal, your new home for desktop trading",
  tokName: "Solana",
  tokAmt: "0.01 SOL",
  tokUsd: "1.24",
  tokChg: "-0.02",
  manage: "Manage token list",
  badgeCount: "3",
};

type MockData = typeof DEFAULTS;

export default function PhantomMock() {
  const [data, setData] = useState<MockData>(DEFAULTS);
  const [screen, setScreen] = useState<"s1" | "s2" | "s3" | "s4">("s1");
  const [showEditor, setShowEditor] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData({ ...DEFAULTS, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setShowEditor(prev => !prev);
      }
      if (e.key === "Escape") {
        setShowEditor(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const saveData = (newData: MockData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 p-4 font-sans text-white">
      <div className="relative h-[600px] w-[375px] overflow-hidden rounded-[32px] bg-[#121212] shadow-2xl border border-white/5">
        
        {/* Top Bar */}
        <header className="flex h-14 items-center justify-between px-4">
          <div className="flex w-10 items-center justify-start">
            {screen !== "s4" && (
              <button 
                onClick={() => {
                  if (screen === "s2" || screen === "s3") setScreen("s1");
                  else if (screen === "s1") {} // Root
                }}
                className="rounded-full p-2 hover:bg-white/5"
              >
                {screen === "s1" ? <X size={20} /> : <ChevronLeft size={20} />}
              </button>
            )}
          </div>
          <div className="text-[15px] font-semibold">
            {screen === "s1" && "Add Account"}
            {(screen === "s2" || screen === "s3") && "Import Private Key"}
          </div>
          <div className="flex w-10 items-center justify-end">
            <div className="w-5 h-5" />
          </div>
        </header>

        <AnimatePresence mode="wait">
          {screen === "s1" && (
            <motion.main
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-3 px-4 pt-2"
            >
              <OptionButton 
                icon={<Plus size={22} className="text-white/70" />} 
                title="Create New Account" 
                sub="Add a new multi-chain account"
                onClick={() => setScreen("s2")}
              />
              <OptionButton 
                icon={<Cpu size={22} className="text-white/70" />} 
                title="Connect Hardware Wallet" 
                sub="Use your Ledger hardware wallet"
              />
              <OptionButton 
                icon={<Key size={22} className="text-white/70" />} 
                title="Import Recovery Phrase" 
                sub="Import accounts from another wallet"
              />
              <OptionButton 
                icon={<Download size={22} className="text-white/70" />} 
                title="Import Private Key" 
                sub="Import a single-chain account"
                onClick={() => setScreen("s2")}
              />
              <OptionButton 
                icon={<Eye size={22} className="text-white/70" />} 
                title="Watch Address" 
                sub="Track any public wallet address"
              />

              <div className="absolute bottom-6 left-4 right-4">
                <button className="h-12 w-full rounded-2xl bg-[#1a1a1a] font-semibold text-white/90 hover:bg-[#252525] transition-colors">
                  Close
                </button>
              </div>
            </motion.main>
          )}

          {screen === "s2" && (
            <motion.main
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center px-4 pt-2"
            >
              <div className="relative mb-8 mt-4 h-24 w-24 rounded-full bg-[#1a1a1a] flex items-center justify-center text-3xl font-bold">
                P
                <div className="absolute bottom-0 right-0 rounded-full bg-[#252525] p-2 border-2 border-[#121212]">
                  <Pencil size={12} className="text-white/50" />
                </div>
              </div>

              <div className="w-full space-y-3">
                <div className="flex h-14 items-center justify-between rounded-xl bg-[#1a1a1a] px-4 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-col gap-[2px]">
                      <div className="h-[2px] w-full bg-[#9945FF]" />
                      <div className="h-[2px] w-full bg-[#14F195]" />
                      <div className="h-[2px] w-full bg-[#9945FF]" />
                    </div>
                    <span className="font-medium">Solana</span>
                  </div>
                  <ChevronDown size={18} className="text-white/30" />
                </div>

                <div className="flex h-14 flex-col justify-center rounded-xl bg-[#1a1a1a] px-4 border border-white/5">
                  <div className="text-[11px] text-white/30 font-medium">Name</div>
                </div>

                <div className="flex h-32 flex-col pt-3 rounded-xl bg-[#1a1a1a] px-4 border border-white/5">
                  <div className="text-[11px] text-white/30 font-medium">Private key</div>
                </div>
              </div>

              <div className="absolute bottom-6 left-4 right-4">
                <button 
                  onClick={() => setScreen("s3")}
                  className="h-12 w-full rounded-2xl bg-[#1a1a1a] font-semibold text-white/30 transition-colors"
                >
                  Import
                </button>
              </div>
            </motion.main>
          )}

          {screen === "s3" && (
            <motion.main
              key="s3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center px-4 pt-2"
            >
              <div className="relative mb-8 mt-4 h-24 w-24 rounded-full bg-[#1a1a1a] flex items-center justify-center text-3xl font-bold">
                P
                <div className="absolute bottom-0 right-0 rounded-full bg-[#252525] p-2 border-2 border-[#121212]">
                  <Pencil size={12} className="text-white/50" />
                </div>
              </div>

              <div className="w-full space-y-3">
                <div className="flex h-14 items-center justify-between rounded-xl bg-[#1a1a1a] px-4 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 flex-col gap-[2px]">
                      <div className="h-[2px] w-full bg-[#9945FF]" />
                      <div className="h-[2px] w-full bg-[#14F195]" />
                      <div className="h-[2px] w-full bg-[#9945FF]" />
                    </div>
                    <span className="font-medium">{data.chain}</span>
                  </div>
                  <ChevronDown size={18} className="text-white/30" />
                </div>

                <div className="flex h-14 items-center rounded-xl bg-[#1a1a1a] px-4 border border-white/5">
                  <span className="font-medium">{data.name}</span>
                </div>

                <div className="flex h-32 flex-col pt-4 rounded-xl bg-[#1a1a1a] px-4 border border-white/5">
                  <div className="flex flex-wrap gap-1.5 opacity-60">
                    {Array.from({ length: Number(data.dots) }).map((_, i) => (
                      <div key={i} className="h-1 w-1 rounded-full bg-white" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="text-[13px] font-bold text-white/90">Account Address</span>
                  <span className="text-[13px] font-medium text-white/60">{data.addr}</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-4 right-4">
                <button 
                  onClick={() => setScreen("s4")}
                  className="h-12 w-full rounded-2xl bg-[#ab9ff2] font-bold text-[#121212] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(171,159,242,0.3)]"
                >
                  Import
                </button>
              </div>
            </motion.main>
          )}

          {screen === "s4" && (
            <motion.main
              key="s4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col px-4 pt-2"
            >
              <div className="flex items-center justify-between h-12 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] text-[12px] font-bold text-white/50">
                    {data.badgeCount}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[15px]">{data.homeName}</span>
                    <Copy size={14} className="text-white/30 cursor-pointer" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Search size={20} className="text-white/50 cursor-pointer" />
                  <Maximize2 size={18} className="text-white/50 cursor-pointer" />
                </div>
              </div>

              <div className="flex flex-col items-center mb-8">
                <div className="text-[42px] font-bold leading-none mb-3 tracking-tight">
                  ${data.bal}
                </div>
                <div className="flex items-center gap-2 text-[15px] font-bold">
                  <span className={data.delta.startsWith('-') ? 'text-[#ff6b6b]' : 'text-[#22c55e]'}>
                    {data.delta.startsWith('-') ? '' : '+'}${data.delta}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[13px] ${data.pct.startsWith('-') ? 'bg-[#ff6b6b]/10 text-[#ff6b6b]' : 'bg-[#22c55e]/10 text-[#22c55e]'}`}>
                    {data.pct.startsWith('-') ? '' : '+'}{data.pct}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-8">
                <ActionButton icon={<Maximize2 size={20} className="rotate-45" />} label="Receive" />
                <ActionButton icon={<ArrowUpRight size={22} />} label="Send" />
                <ActionButton icon={<RefreshCw size={20} />} label="Swap" />
                <ActionButton icon={<DollarSign size={20} />} label="Buy" />
              </div>

              <div className="relative mb-6 flex items-start gap-3 rounded-[20px] bg-[#1a1a1a] p-4 border border-white/5 overflow-hidden group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <div className="grid grid-cols-2 gap-0.5 p-1 border-2 border-white/20 rounded">
                    <div className="w-1.5 h-1 bg-[#14F195]" />
                    <div className="w-1.5 h-1 bg-[#ab9ff2]" />
                    <div className="w-1.5 h-1 bg-[#ff6b6b]" />
                    <div className="w-1.5 h-1 bg-white/40" />
                  </div>
                </div>
                <div className="pr-6">
                  <div className="text-[13px] font-bold leading-snug text-white/90">
                    {data.banner}
                  </div>
                </div>
                <button className="absolute right-3 top-4 text-white/30 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[#1a1a1a] p-3.5 border border-white/5 mb-4 group cursor-pointer hover:bg-[#202020] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                     <div className="flex h-6 w-6 flex-col gap-[2px]">
                      <div className="h-[2px] w-full bg-[#9945FF]" />
                      <div className="h-[2px] w-full bg-[#14F195]" />
                      <div className="h-[2px] w-full bg-[#9945FF]" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-white/90">{data.tokName}</span>
                    <span className="text-[13px] font-medium text-white/40">{data.tokAmt}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[15px] font-bold text-white/90">${data.tokUsd}</span>
                  <span className={`text-[13px] font-medium ${data.tokChg.startsWith('-') ? 'text-[#ff6b6b]' : 'text-[#22c55e]'}`}>
                    {data.tokChg.startsWith('-') ? '' : '+'}{data.tokChg}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-auto pb-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                <Settings2 size={16} />
                <span className="text-[13px] font-bold">{data.manage}</span>
              </div>
            </motion.main>
          )}
        </AnimatePresence>

        {/* Hidden Editor */}
        <AnimatePresence>
          {showEditor && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm p-6 overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#ab9ff2]">Edit Mock Data</h2>
                <button onClick={() => setShowEditor(false)} className="rounded-full bg-white/10 p-2">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 pb-20">
                <Section title="Screen: Import Private Key">
                  <Field label="Chain" value={data.chain} onChange={(v) => saveData({...data, chain: v})} />
                  <Field label="Name" value={data.name} onChange={(v) => saveData({...data, name: v})} />
                  <Field label="Account Address" value={data.addr} onChange={(v) => saveData({...data, addr: v})} />
                  <Field label="Private Key Dots" value={data.dots.toString()} type="number" onChange={(v) => saveData({...data, dots: parseInt(v) || 0})} />
                </Section>

                <Section title="Screen: Home">
                  <Field label="Badge Count" value={data.badgeCount} onChange={(v) => saveData({...data, badgeCount: v})} />
                  <Field label="Account Name" value={data.homeName} onChange={(v) => saveData({...data, homeName: v})} />
                  <Field label="Balance ($)" value={data.bal} onChange={(v) => saveData({...data, bal: v})} />
                  <Field label="Delta ($)" value={data.delta} onChange={(v) => saveData({...data, delta: v})} />
                  <Field label="Percent (%)" value={data.pct} onChange={(v) => saveData({...data, pct: v})} />
                  <Field label="Banner Text" value={data.banner} multiline onChange={(v) => saveData({...data, banner: v})} />
                  <Field label="Token Name" value={data.tokName} onChange={(v) => saveData({...data, tokName: v})} />
                  <Field label="Token Amount" value={data.tokAmt} onChange={(v) => saveData({...data, tokAmt: v})} />
                  <Field label="Token USD ($)" value={data.tokUsd} onChange={(v) => saveData({...data, tokUsd: v})} />
                  <Field label="Token Change ($)" value={data.tokChg} onChange={(v) => saveData({...data, tokChg: v})} />
                  <Field label="Manage Text" value={data.manage} onChange={(v) => saveData({...data, manage: v})} />
                </Section>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      saveData(DEFAULTS);
                    }}
                    className="flex-1 h-12 rounded-xl bg-white/10 font-bold hover:bg-white/20 transition-colors"
                  >
                    Reset Defaults
                  </button>
                  <button 
                    onClick={() => setShowEditor(false)}
                    className="flex-1 h-12 rounded-xl bg-[#ab9ff2] text-black font-bold hover:opacity-90 transition-colors"
                  >
                    Save & Close
                  </button>
                </div>
              </div>
              
              <div className="mt-auto pt-6 text-center text-white/30 text-[12px]">
                Ctrl + Shift + E to toggle
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OptionButton({ icon, title, sub, onClick }: { icon: React.ReactNode, title: string, sub: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-4 rounded-3xl bg-[#1a1a1a] p-4 text-left transition-colors hover:bg-[#222] group active:scale-[0.98]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[15px] font-bold text-white/90 leading-tight">{title}</span>
        <span className="text-[13px] font-medium text-white/40 leading-tight">{sub}</span>
      </div>
    </button>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer active:scale-[0.95] transition-transform">
      <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#1a1a1a] text-[#ab9ff2] transition-colors group-hover:bg-[#252525]">
        {icon}
      </div>
      <span className="text-[12px] font-bold text-white/40 transition-colors group-hover:text-white/80">{label}</span>
    </div>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", multiline = false }: { label: string, value: string, onChange: (v: string) => void, type?: string, multiline?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-white/60 ml-1">{label}</label>
      {multiline ? (
        <textarea 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-[14px] focus:outline-none focus:border-[#ab9ff2]/50 min-h-[80px] resize-none"
        />
      ) : (
        <input 
          type={type}
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-[14px] focus:outline-none focus:border-[#ab9ff2]/50"
        />
      )}
    </div>
  );
}
