"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  ChevronLeft,
  ChevronDown,
  Search,
  DollarSign,
  Settings2,
  Pencil,
  QrCode,
  ArrowRightLeft,
  Send,
  RefreshCw,
  LayoutGrid,
  Zap,
  Home } from
"lucide-react";
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
  badgeCount: "3"
};

type MockData = typeof DEFAULTS;

export default function PhantomMock() {
  const [data, setData] = useState<MockData>(DEFAULTS);
  const [screen, setScreen] = useState<"s1" | "s2" | "s3">("s1");
  const [showEditor, setShowEditor] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Local state for interactive inputs on screen 2
  const [inputName, setInputName] = useState("");
  const [inputKey, setInputKey] = useState("");

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
        setShowEditor((prev) => !prev);
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
      <div className="relative h-[660px] w-[375px] overflow-hidden rounded-[24px] bg-[#1F1F1F] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/[0.03]">
        
        {/* Top Bar for Sub-screens */}
        {screen !== "s3" &&
        <header className="flex h-14 items-center justify-between px-4 bg-[#1F1F1F]">
            <button
            onClick={() => {
              if (screen === "s2") setScreen("s1");else
              if (screen === "s1") setScreen("s3");
            }}
            className="text-white/40 hover:text-white transition-colors">

              {screen === "s1" ? <X size={22} strokeWidth={2.5} /> : <ChevronLeft size={24} strokeWidth={2.5} />}
            </button>
            <div className="text-[17px] font-bold tracking-tight">
              {screen === "s1" && "Add / Connect Wallet"}
              {screen === "s2" && "Import Private Key"}
            </div>
            <div className="w-5" />
          </header>
        }

        <AnimatePresence mode="wait">
          {screen === "s1" &&
          <motion.main
            key="s1"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="flex flex-col gap-[10px] px-4 pt-4">

              <OptionButton
              icon={<Plus size={22} className="text-[#ab9ff2]" />}
              title="Create New Account"
              sub="Add a new multi-chain account"
              onClick={() => setScreen("s2")} />

              <OptionButton
              icon={<UsbIcon />}
              title="Connect Hardware Wallet"
              sub="Use your Ledger hardware wallet" />

              <OptionButton
              icon={<FileIcon />}
              title="Import Recovery Phrase"
              sub="Import accounts from another wallet" />

              <OptionButton
              icon={<DownloadIcon />}
              title="Import Private Key"
              sub="Import a single-chain account"
              onClick={() => setScreen("s2")} />

              <OptionButton
              icon={<EyeIcon />}
              title="Watch Address"
              sub="Track any public wallet address" />


              <div className="absolute bottom-6 left-4 right-4">
                  <button
                onClick={() => setScreen("s3")}
                className="h-[52px] w-full rounded-[14px] bg-[#2A2A2A] font-bold text-white hover:bg-[#323232] transition-colors text-[16px]">

                    Close
                  </button>
                </div>

              {/* Editor Toggle - ONLY ON SCREEN 1 */}
              <button
              onClick={() => setShowEditor(true)}
              className="absolute top-2 right-2 p-3 text-white/10 hover:text-[#ab9ff2] transition-colors z-50"
              title="Edit Data">

                <Pencil size={16} />
              </button>
            </motion.main>
          }

          {screen === "s2" &&
          <motion.main
            key="s2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center px-4 pt-6">

              <div className="relative mb-8 h-24 w-24 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[34px] font-black">
                P
                <div className="absolute bottom-0 right-0 rounded-full bg-[#3a3a3a] p-1.5 border-[3px] border-[#1F1F1F]">
                  <Pencil size={12} className="text-white/40" />
                </div>
              </div>

              <div className="w-full space-y-3">
                <div className="flex h-[56px] items-center justify-between rounded-[12px] bg-[#2A2A2A] px-4 border border-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <SolanaLogo />
                    <span className="font-extrabold text-[16px]">{data.chain}</span>
                  </div>
                  <ChevronDown size={18} className="text-white/40" />
                </div>

                <div className="relative">
                  <input
                  type="text"
                  placeholder="Name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full h-[56px] rounded-[12px] bg-[#2A2A2A] px-4 border border-white/[0.02] text-[16px] font-extrabold text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#ab9ff2]/30" />

                </div>

                <div className="relative">
                  <textarea
                  placeholder="Private key"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="w-full h-[110px] rounded-[12px] bg-[#2A2A2A] px-4 py-4 border border-white/[0.02] text-[16px] font-bold text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#ab9ff2]/30 resize-none" />

                </div>

                <AnimatePresence>
                  {inputKey.length > 0 &&
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-between px-1 pt-2">

                      <span className="text-[14px] font-bold text-white">Account Address</span>
                      <span className="text-[14px] font-medium text-white/40">{data.addr}</span>
                    </motion.div>
                }
                </AnimatePresence>
              </div>

              <div className="absolute bottom-6 left-4 right-4">
                <button
       