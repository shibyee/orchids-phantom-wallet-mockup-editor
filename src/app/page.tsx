"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronDown, 
  Search, 
  Copy, 
  DollarSign, 
  Settings2,
  Pencil,
  QrCode,
  ArrowUpRight,
  RefreshCw,
  LayoutGrid,
  Zap,
  Home
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "phantom_mock_data_v5";

const DEFAULTS = {
  chain: "Solana",
  name: "1111",
  addr: "7fXB…Hin7",
  dots: 86,
  homeName: "111",
  bal: "1.21",
  delta: "-0.0282",
  pct: "-2.27",
  banner: "Meet Phantom Terminal, your new home for desktop trading",
  tokName: "Solana",
  tokAmt: "0.01 SOL",
  tokUsd: "1.21",
  tokChg: "-0.03",
  manage: "Manage token list",
  badgeCount: "3",
};

type MockData = typeof DEFAULTS;

export default function PhantomMock() {
  const [data, setData] = useState<MockData>(DEFAULTS);
  const [screen, setScreen] = useState<"s1" | "s2" | "s3" | "s4">("s4");
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
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4 font-sans text-white">
      <div className="relative h-[660px] w-[375px] overflow-hidden rounded-[24px] bg-[#1a1a1a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/[0.03]">
        
        {/* Top Bar for Sub-screens */}
        {screen !== "s4" && (
          <header className="flex h-14 items-center justify-between px-4">
            <button 
              onClick={() => {
                if (screen === "s2" || screen === "s3") setScreen("s1");
                else if (screen === "s1") setScreen("s4");
              }}
              className="text-white/40 hover:text-white transition-colors"
            >
              {screen === "s1" ? <X size={22} strokeWidth={2.5} /> : <ChevronLeft size={24} strokeWidth={2.5} />}
            </button>
            <div className="text-[16px] font-bold tracking-tight">
              {screen === "s1" && "Add / Connect Wallet"}
              {(screen === "s2" || screen === "s3") && "Import Private Key"}
            </div>
            <div className="w-5" />
          </header>
        )}

        <AnimatePresence mode="wait">
          {screen === "s1" && (
            <motion.main
              key="s1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="flex flex-col gap-[10px] px-4 pt-4"
            >
              <OptionButton 
                icon={<Plus size={22} className="text-[#ab9ff2]" />} 
                title="Create New Account" 
                sub="Add a new multi-chain account"
                onClick={() => setScreen("s2")}
              />
              <OptionButton 
                icon={<UsbIcon />} 
                title="Connect Hardware Wallet" 
                sub="Use your Ledger hardware wallet"
              />
              <OptionButton 
                icon={<FileIcon />} 
                title="Import Recovery Phrase" 
                sub="Import accounts from another wallet"
              />
              <OptionButton 
                icon={<DownloadIcon />} 
                title="Import Private Key" 
                sub="Import a single-chain account"
                onClick={() => setScreen("s2")}
              />
              <OptionButton 
                icon={<EyeIcon />} 
                title="Watch Address" 
                sub="Track any public wallet address"
              />

              <div className="absolute bottom-6 left-4 right-4">
                <button 
                  onClick={() => setScreen("s4")}
                  className="h-[52px] w-full rounded-[14px] bg-[#2a2a2a] font-bold text-white/90 hover:bg-[#323232] transition-colors text-[15px]"
                >
                  Close
                </button>
              </div>

              {/* Editor Toggle - Hidden pencil on the first screen */}
              <button 
                onClick={() => setShowEditor(true)}
                className="absolute top-0 right-0 p-4 opacity-0 hover:opacity-[0.02] transition-opacity z-50"
                title="Edit Data"
              >
                <Pencil size={12} />
              </button>
            </motion.main>
          )}

          {screen === "s2" && (
            <motion.main
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center px-4 pt-6"
            >
              <div className="relative mb-10 h-24 w-24 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[32px] font-bold">
                P
                <div className="absolute bottom-0 right-0 rounded-full bg-[#3a3a3a] p-1.5 border-[3px] border-[#1a1a1a]">
                  <Pencil size={12} className="text-white/40" />
                </div>
              </div>

              <div className="w-full space-y-3">
                <div className="flex h-[56px] items-center justify-between rounded-[12px] bg-[#2a2a2a] px-4 border border-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <SolanaLogo />
                    <span className="font-bold text-[15px]">Solana</span>
                  </div>
                  <ChevronDown size={18} className="text-white/40" />
                </div>

                <div className="flex h-[56px] items-center rounded-[12px] bg-[#2a2a2a] px-4 border border-white/[0.02] text-white/20 text-[15px] font-medium">
                  Name
                </div>

                <div className="flex h-[110px] items-start rounded-[12px] bg-[#2a2a2a] px-4 py-4 border border-white/[0.02] text-white/20 text-[15px] font-medium">
                  Private key
                </div>
                <div className="text-[#eb5757] text-[13px] font-medium px-1">Private key is required</div>
              </div>

              <div className="absolute bottom-6 left-4 right-4">
                <button 
                  onClick={() => setScreen("s3")}
                  className="h-[52px] w-full rounded-[14px] bg-[#2a2a2a] font-bold text-white/20 transition-colors text-[15px]"
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
              className="flex flex-col items-center px-4 pt-6"
            >
              <div className="relative mb-10 h-24 w-24 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[32px] font-bold">
                P
                <div className="absolute bottom-0 right-0 rounded-full bg-[#3a3a3a] p-1.5 border-[3px] border-[#1a1a1a]">
                  <Pencil size={12} className="text-white/40" />
                </div>
              </div>

              <div className="w-full space-y-3">
                <div className="flex h-[56px] items-center justify-between rounded-[12px] bg-[#2a2a2a] px-4 border border-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <SolanaLogo />
                    <span className="font-bold text-[15px]">{data.chain}</span>
                  </div>
                  <ChevronDown size={18} className="text-white/40" />
                </div>

                <div className="flex h-[56px] items-center rounded-[12px] bg-[#2a2a2a] px-4 border border-white/[0.02]">
                  <span className="font-bold text-[15px]">{data.name}</span>
                </div>

                <div className="flex h-[110px] items-start rounded-[12px] bg-[#2a2a2a] px-4 py-5 border border-white/[0.02]">
                  <div className="flex flex-wrap gap-1.5 opacity-60">
                    {Array.from({ length: Number(data.dots) }).map((_, i) => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="text-[13px] font-bold text-white/80">Account Address</span>
                  <span className="text-[13px] font-medium text-white/40">{data.addr}</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-4 right-4">
                <button 
                  onClick={() => setScreen("s4")}
                  className="h-[52px] w-full rounded-[14px] bg-[#ab9ff2] font-bold text-[#121212] hover:opacity-90 transition-opacity text-[15px] shadow-[0_0_20px_rgba(171,159,242,0.2)]"
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
              className="flex flex-col px-4 pt-3"
            >
              <div className="flex items-center justify-between h-12 mb-8">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setScreen("s1")}
                    className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#2a2a2a] text-[14px] font-bold text-white hover:bg-[#323232] transition-colors"
                  >
                    {data.badgeCount}
                  </button>
                  <div className="flex items-center gap-1.5 group cursor-pointer">
                    <span className="font-bold text-[16px] tracking-tight">{data.homeName}</span>
                    <ChevronDown size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-4.5">
                  <Search size={21} className="text-white/40 cursor-pointer hover:text-white transition-colors" />
                  <LayoutGrid size={21} className="text-white/40 cursor-pointer hover:text-white transition-colors" />
                </div>
              </div>

              <div className="flex flex-col items-center mb-9">
                <div className="text-[44px] font-bold leading-none mb-3 tracking-tight">
                  ${data.bal}
                </div>
                <div className="flex items-center gap-2 text-[15px] font-bold">
                  <span className={data.delta.startsWith('-') ? 'text-[#eb5757]' : 'text-[#27c241]'}>
                    {data.delta.startsWith('-') ? '' : '+'}${data.delta}
                  </span>
                  <span className={`px-2 py-0.5 rounded-[6px] text-[13px] ${data.pct.startsWith('-') ? 'bg-[#eb5757]/10 text-[#eb5757]' : 'bg-[#27c241]/10 text-[#27c241]'}`}>
                    {data.pct.startsWith('-') ? '' : '+'}{data.pct}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-[10px] mb-8">
                <ActionButton icon={<QrCode size={23} />} label="Receive" />
                <ActionButton icon={<ArrowUpRight size={24} />} label="Send" />
                <ActionButton icon={<RefreshCw size={24} />} label="Swap" />
                <ActionButton icon={<DollarSign size={23} />} label="Buy" />
              </div>

              {/* Banner */}
              <div className="relative mb-5 flex items-center gap-4 rounded-[22px] bg-[#2a2a2a] p-[18px] border border-white/[0.04] overflow-hidden group">
                <TerminalIcon />
                <div className="flex-1 pr-6">
                  <div className="text-[16px] font-bold leading-[1.2] text-white/95 tracking-tight">
                    {data.banner}
                  </div>
                </div>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/5 hover:bg-white/10">
                    <X size={12} strokeWidth={3} />
                  </div>
                </button>
              </div>

              {/* Token List */}
              <div className="flex items-center justify-between rounded-[22px] bg-[#2a2a2a] p-[18px] border border-white/[0.04] mb-5 group cursor-pointer hover:bg-[#2f2f2f] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-black overflow-hidden shadow-inner">
                    <SolanaLogo large />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[18px] font-bold text-white leading-tight">{data.tokName}</span>
                    <span className="text-[15px] font-medium text-white/40 leading-tight tracking-tight">{data.tokAmt}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[18px] font-bold text-white leading-tight">${data.tokUsd}</span>
                  <span className="text-[15px] font-medium leading-tight text-[#eb5757] tracking-tight">
                    {data.tokChg.startsWith('-') ? '' : '+'}${data.tokChg.replace('-', '')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2.5 mb-20 opacity-30 hover:opacity-100 transition-opacity cursor-pointer group">
                <Settings2 size={16} className="text-white/80 group-hover:rotate-45 transition-transform" />
                <span className="text-[14px] font-bold tracking-tight">{data.manage}</span>
              </div>

              {/* Bottom Nav */}
              <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-[#1a1a1a] border-t border-white/[0.04] flex items-center justify-around px-2">
                <NavButton icon={<Home size={23} />} active />
                <NavButton icon={<LayoutGrid size={23} />} />
                <NavButton icon={<RefreshCw size={24} />} />
                <NavButton icon={<Zap size={23} />} />
                <NavButton icon={<Search size={23} />} />
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
              className="absolute inset-0 z-[100] flex flex-col bg-[#0f0f0f]/98 backdrop-blur-xl p-6 overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between mb-8 pt-4">
                <h2 className="text-xl font-bold text-[#ab9ff2]">Edit Mock Data</h2>
                <button onClick={() => setShowEditor(false)} className="rounded-full bg-white/5 p-2.5 hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8 pb-20">
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

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => saveData(DEFAULTS)}
                    className="flex-1 h-12 rounded-[14px] bg-white/5 font-bold hover:bg-white/10 transition-colors"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={() => setShowEditor(false)}
                    className="flex-1 h-12 rounded-[14px] bg-[#ab9ff2] text-black font-bold hover:opacity-90 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Custom Components ---

function OptionButton({ icon, title, sub, onClick }: { icon: React.ReactNode, title: string, sub: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-4 rounded-[20px] bg-[#2a2a2a] p-[18px] text-left transition-all hover:bg-[#323232] group active:scale-[0.98] border border-white/[0.01]"
    >
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[15.5px] font-bold text-white leading-tight mb-0.5">{title}</span>
        <span className="text-[13px] font-medium text-white/30 leading-tight">{sub}</span>
      </div>
    </button>
  );
}

function ActionButton({ icon, label, className }: { icon: React.ReactNode, label: string, className?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer active:scale-[0.95] transition-transform">
      <div className={`flex h-[66px] w-full items-center justify-center rounded-[18px] bg-[#2a2a2a] text-[#ab9ff2] transition-colors group-hover:bg-[#323232] border border-white/[0.02] ${className}`}>
        {icon}
      </div>
      <span className="text-[13px] font-bold text-white/40 group-hover:text-white/60 transition-colors">{label}</span>
    </div>
  );
}

function NavButton({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <button className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${active ? 'text-[#ab9ff2]' : 'text-white/20 hover:text-white/40'}`}>
      {icon}
    </button>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-[12px] font-bold text-white/30 uppercase tracking-[0.1em] ml-1">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", multiline = false }: { label: string, value: string, onChange: (v: string) => void, type?: string, multiline?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-bold text-white/50 ml-1">{label}</label>
      {multiline ? (
        <textarea 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-[14px] bg-white/[0.04] border border-white/10 p-3.5 text-[15px] font-medium focus:outline-none focus:border-[#ab9ff2]/40 min-h-[100px] resize-none transition-colors"
        />
      ) : (
        <input 
          type={type}
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 rounded-[14px] bg-white/[0.04] border border-white/10 px-4 text-[15px] font-medium focus:outline-none focus:border-[#ab9ff2]/40 transition-colors"
        />
      )}
    </div>
  );
}

// --- Icons ---

function TerminalIcon() {
  return (
    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#1a1a1a] border border-white/[0.08] relative">
      <div className="relative w-8 h-[22px] border-[1.5px] border-white/40 rounded-[4px] p-0.5 flex flex-col gap-[2px] bg-[#1a1a1a]">
        <img 
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/file-1766560261432.png?width=8000&height=8000&resize=contain" 
          className="w-full h-full object-contain px-0.5"
          alt="Terminal Bars"
        />
      </div>
      {/* Monitor Stand */}
      <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-3.5 h-[5px] bg-white/40 rounded-b-[2px]" />
    </div>
  );
}

function SolanaLogo({ large = false }: { large?: boolean }) {
  return (
    <img 
      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/file-1766560271503.png?width=8000&height=8000&resize=contain" 
      className={large ? "w-[30px] h-[30px]" : "w-[24px] h-[24px]"}
      alt="Solana"
    />
  );
}

// Menu Icons
function UsbIcon() { return <img src="https://img.icons8.com/ios-filled/50/ffffff/usb-memory-stick.png" className="w-[22px] h-[22px] opacity-40" />; }
function FileIcon() { return <img src="https://img.icons8.com/ios-filled/50/ffffff/file.png" className="w-[22px] h-[22px] opacity-40" />; }
function DownloadIcon() { return <img src="https://img.icons8.com/ios-filled/50/ffffff/download.png" className="w-[22px] h-[22px] opacity-40" />; }
function EyeIcon() { return <img src="https://img.icons8.com/ios-filled/50/ffffff/visible.png" className="w-[22px] h-[22px] opacity-40" />; }
