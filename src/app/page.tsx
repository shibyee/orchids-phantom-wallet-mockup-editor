"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Puzzle, 
  Settings, 
  Chrome, 
  Download, 
  Code2, 
  Eye, 
  Wallet, 
  ArrowLeft, 
  Plus, 
  X, 
  Search, 
  LayoutGrid, 
  ArrowRightLeft, 
  Zap,
  Pencil,
  RotateCcw,
  FileText,
  Smartphone,
  ChevronDown,
  ArrowDownToLine,
  File
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// --- Mock Data Constants ---
const DEFAULTS = {
  chain: "Solana",
  name: "1111",
  addr: "7fXB…Hin7",
  homeName: "111",
  bal: "1.22",
  delta: "-0.0274",
  pct: "-2.21",
  banner: "Meet Phantom Terminal, your new home for desktop trading",
  tokName: "Solana",
  tokAmt: "0.01 SOL",
  tokUsd: "1.22",
  tokChg: "-0.03",
  manage: "Manage token list",
  badgeCount: "3"
};

// --- Original Files Content ---
const FILES = {
  manifest: `{
  "manifest_version": 3,
  "name": "Phantom Wallet Mockup Editor",
  "version": "1.0",
  "description": "A mockup editor for Phantom Wallet UI, allowing visual customization of balances and data.",
  "action": {
    "default_popup": "popup.html"
  },
  "permissions": ["storage"]
}`,
  popupHtml: `<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        :root {
            --bg-color: #0F0F0F;
            --card-bg: #1A1A1A;
            --accent: #AB9FF2;
        }
        body {
            background-color: var(--bg-color);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 16px;
            width: 375px;
            height: 600px;
            display: flex;
            flex-direction: column;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            margin-bottom: 8px;
        }
        .avatar-section {
            display: flex;
            justify-content: center;
            margin: 16px 0 24px;
        }
        .avatar-circle {
            width: 88px;
            height: 88px;
            background: var(--card-bg);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            position: relative;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .edit-icon {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 26px;
            height: 26px;
            background: #252525;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid var(--bg-color);
        }
        .input-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .input-field {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 12px 16px;
            border: 1px solid rgba(255,255,255,0.05);
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .input-field input, .input-field textarea {
            background: transparent;
            border: none;
            outline: none;
            color: white;
            font-weight: bold;
            font-size: 14px;
            width: 100%;
        }
        .textarea-field {
            height: 112px;
            resize: none;
            -webkit-text-security: disc;
        }
        .addr-preview {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            margin-top: 4px;
            padding: 0 4px;
        }
        .addr-label { font-weight: 900; }
        .addr-value { color: #A1A1AA; font-weight: bold; }
        .primary-btn {
            background: var(--accent);
            color: black;
            border: none;
            border-radius: 18px;
            height: 48px;
            font-weight: 900;
            font-size: 15px;
            margin-top: auto;
            cursor: pointer;
        }
        .primary-btn:disabled { opacity: 0.5; }
        .hidden { display: none !important; }
    </style>
</head>
<body>
    <div class="header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span style="font-weight: bold; font-size: 15px;">Import Private Key</span>
        <div style="width: 24px;"></div>
    </div>
    
    <div class="avatar-section">
        <div class="avatar-circle">
            P
            <div class="edit-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            </div>
        </div>
    </div>

    <div class="input-group">
        <div class="input-field">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/api.phantom-1766562867239.avif" width="16" height="16">
            <span style="font-weight: bold; font-size: 14px; flex: 1;">Solana</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        </div>
        <div class="input-field">
            <input type="text" value="1111" placeholder="Name">
        </div>
        <div class="input-field" style="padding: 16px;">
            <textarea id="privateKeyInput" class="textarea-field" placeholder="Private key"></textarea>
        </div>
        <div id="addrPreview" class="addr-preview hidden">
            <span class="addr-label">Account Address</span>
            <span id="displayAddr" class="addr-value">7fXB…Hin7</span>
        </div>
    </div>

    <button id="importBtn" class="primary-btn" disabled>Import</button>

    <script src="popup.js"></script>
</body>
</html>`,
  popupJs: `const STORAGE_KEY = "phantom_mock_data_v5";
// ... data setup ...

const pkInput = document.getElementById('privateKeyInput');
pkInput.oninput = (e) => {
    const btn = document.getElementById('importBtn');
    const preview = document.getElementById('addrPreview');
    if (e.target.value.length > 0) {
        btn.disabled = false;
        preview.classList.remove('hidden');
    } else {
        btn.disabled = true;
        preview.classList.add('hidden');
    }
};`
};

export default function ShowcasePage() {
  const [data, setData] = useState(DEFAULTS);
  const [screen, setScreen] = useState("s3"); // Default to Home
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [view, setView] = useState("preview"); // preview | instructions | code
  const [privateKey, setPrivateKey] = useState("");

  // Update logic
  const handleSave = (newData: typeof DEFAULTS) => {
    setData(newData);
    setIsEditorOpen(false);
    toast.success("Mock data updated successfully!");
  };

  const handleReset = () => {
    setData(DEFAULTS);
    toast.info("Data reset to defaults");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Puzzle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Phantom Mockup</h1>
              <p className="text-xs text-zinc-500 font-medium">Browser Extension Showcase</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={view} onValueChange={setView} className="w-auto">
              <TabsList className="bg-zinc-800/50 border border-zinc-700">
                <TabsTrigger value="preview" className="data-[state=active]:bg-zinc-700">
                  <Eye className="w-4 h-4 mr-2" /> Live Preview
                </TabsTrigger>
                <TabsTrigger value="instructions" className="data-[state=active]:bg-zinc-700">
                  <Settings className="w-4 h-4 mr-2" /> Installation
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-zinc-700">
                  <Code2 className="w-4 h-4 mr-2" /> Source Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {view === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col lg:flex-row gap-12 items-start justify-center"
            >
              {/* Phone Mockup / Extension UI */}
              <div className="relative w-[375px] h-[667px] bg-[#0a0a0a] rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden shrink-0">
                {/* Screen Content */}
                <div className="w-full h-full bg-[#1F1F1F] flex flex-col relative overflow-hidden">
                  
                      {/* Screen 1: Add Account */}
                      <AnimatePresence>
                        {screen === "s1" && (
                          <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-0 bg-[#0F0F0F] z-20 flex flex-col"
                          >
                              <header className="h-14 flex items-center justify-between px-4">
                                <button onClick={() => setScreen("s3")} className="p-2 text-zinc-100 hover:opacity-70 transition-opacity">
                                  <X className="w-6 h-6" />
                                </button>
                                <div className="font-bold text-[18.5px] text-white tracking-tight">Add Account</div>
                                <div className="w-10" />
                              </header>
                              
                              <div className="flex-1 overflow-y-auto py-2 px-4 space-y-2.5">
                                {[
                                  { 
                                    title: "Create New Account", 
                                    sub: "Add a new multi-chain account", 
                                    icon: <Plus className="w-5 h-5 text-white" strokeWidth={1.5} /> 
                                  },
                                  { 
                                    title: "Connect Hardware Wallet", 
                                    sub: "Use your Ledger hardware wallet", 
                                    icon: (
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="8" y="2" width="8" height="20" rx="2" />
                                        <rect x="10" y="5" width="4" height="14" rx="1" />
                                        <rect x="11.5" y="8" width="1" height="4" rx="0.5" fill="currentColor" />
                                      </svg>
                                    )
                                  },
                                  { 
                                    title: "Import Recovery Phrase", 
                                    sub: "Import accounts from another wallet", 
                                    icon: <File className="w-5 h-5 text-white" strokeWidth={1.5} />
                                  },
                                  { 
                                    title: "Import Private Key", 
                                    sub: "Import a single-chain account", 
                                    icon: <ArrowDownToLine className="w-5 h-5 text-white" strokeWidth={1.5} />, 
                                    onClick: () => setScreen("s2") 
                                  },
                                  { 
                                    title: "Watch Address", 
                                    sub: "Track any public wallet address", 
                                    icon: <Eye className="w-5 h-5 text-white" strokeWidth={1.5} />
                                  },
                                ].map((item, i) => (
                                  <button 
                                    key={i}
                                    onClick={item.onClick}
                                    className="w-full bg-[#1C1C1E] py-[14px] px-4 rounded-[22px] flex items-center gap-4 text-left border border-white/5 hover:bg-[#252528] active:scale-[0.98] transition-all group"
                                  >
                                    <div className="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center shrink-0 group-hover:bg-[#3A3A3C] transition-colors">
                                      {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="font-bold text-[16.5px] text-white leading-tight tracking-tight">{item.title}</p>
                                      <p className="text-[13.5px] text-[#98989E] font-medium leading-tight tracking-tight mt-1">{item.sub}</p>
                                    </div>
                                  </button>
                                ))}
                              </div>
    
                              <div className="p-4 pb-8 border-t border-white/[0.03]">
                                <Button 
                                  onClick={() => setScreen("s3")} 
                                  className="w-full h-[52px] rounded-[22px] bg-[#1C1C1E] hover:bg-[#252528] text-white font-bold text-[17px] border border-white/5 active:scale-[0.98] transition-all tracking-tight"
                                >
                                  Close
                                </Button>
                              </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                  {/* Screen 2: Import */}
                  <AnimatePresence>
                    {screen === "s2" && (
                      <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute inset-0 bg-[#0F0F0F] z-30 p-4 flex flex-col"
                      >
                        <header className="h-14 flex items-center justify-between border-b border-white/5 -mx-4 px-4 mb-2">
                          <button onClick={() => setScreen("s1")} className="p-2 text-zinc-100 hover:opacity-70">
                            <ArrowLeft className="w-6 h-6" />
                          </button>
                          <div className="font-bold text-[15px] text-white">Import Private Key</div>
                          <div className="w-10" />
                        </header>
                        
                        <div className="flex justify-center mb-6 mt-2">
                          <div className="relative">
                            <div className="w-[88px] h-[88px] bg-[#1A1A1A] rounded-full flex items-center justify-center text-3xl font-bold text-white border border-white/5">P</div>
                            <div className="absolute bottom-0 right-0 w-[26px] h-[26px] bg-[#252525] rounded-full flex items-center justify-center border border-[#0F0F0F]">
                              <Pencil className="w-3.5 h-3.5 text-zinc-400" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-[#1A1A1A] h-12 rounded-xl px-4 flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                                <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/api.phantom-1766562867239.avif" className="w-4 h-4" alt="chain" />
                              </div>
                              <span className="font-bold text-sm text-white">{data.chain}</span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-zinc-500" />
                          </div>

                          <div className="bg-[#1A1A1A] h-12 rounded-xl px-4 flex items-center border border-white/5">
                            <input 
                              type="text" 
                              placeholder="Name" 
                              className="bg-transparent border-none outline-none w-full font-bold text-sm text-white"
                              value={data.name}
                              onChange={(e) => setData({...data, name: e.target.value})}
                            />
                          </div>

                          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                            <textarea 
                              placeholder="Private key" 
                              className="bg-transparent border-none outline-none w-full font-bold text-sm h-28 resize-none text-white"
                              style={{ WebkitTextSecurity: 'disc' } as any}
                              value={privateKey}
                              onChange={(e) => setPrivateKey(e.target.value)}
                            />
                          </div>

                          {privateKey.length > 0 && (
                            <div className="flex justify-between items-center px-0.5 pt-1">
                              <span className="text-[14px] font-black text-white">Account Address</span>
                              <span className="text-[14px] font-bold text-zinc-300 tracking-tight">{data.addr}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto pb-4">
                          <Button 
                            disabled={!privateKey}
                            onClick={() => setScreen("s3")}
                            className="w-full h-12 rounded-[18px] bg-[#AB9FF2] hover:bg-[#998EE0] text-black font-black text-[15px] border-none disabled:opacity-50 transition-all"
                          >
                            Import
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Screen 3: Home */}
                  <div className="flex-1 flex flex-col p-4">
                    <header className="h-12 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setScreen("s1")}>
                        <div className="w-7 h-7 bg-[#2A2A2A] rounded-full flex items-center justify-center font-bold text-xs">{data.badgeCount}</div>
                        <span className="font-bold text-sm">{data.homeName}</span>
                        <Settings className="w-3 h-3 text-zinc-500" />
                      </div>
                      <div className="flex items-center gap-4 text-zinc-500">
                        <Search className="w-5 h-5" />
                        <LayoutGrid className="w-5 h-5" />
                      </div>
                    </header>

                    <div className="flex flex-col items-center mb-8">
                      <div className="text-4xl font-bold tracking-tight mb-1">${data.bal}</div>
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <span className={data.delta.startsWith('-') ? "text-red-400" : "text-green-400"}>
                          {data.delta.startsWith('-') ? "" : "+"}{data.delta}
                        </span>
                        <Badge className={`rounded-md px-1.5 py-0 border-none ${data.pct.startsWith('-') ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                          {data.pct.startsWith('-') ? "" : "+"}{data.pct}%
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-8">
                      {['Receive', 'Send', 'Swap', 'Buy'].map((label, i) => (
                        <div key={label} className="bg-[#2A2A2A] aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#323232] transition-colors group">
                          {i === 0 && <Download className="w-6 h-6 text-indigo-300 group-hover:scale-110 transition-transform" />}
                          {i === 1 && <ArrowRightLeft className="w-6 h-6 text-indigo-300 group-hover:scale-110 transition-transform rotate-45" />}
                          {i === 2 && <ArrowRightLeft className="w-6 h-6 text-indigo-300 group-hover:scale-110 transition-transform" />}
                          {i === 3 && <Zap className="w-6 h-6 text-indigo-300 group-hover:scale-110 transition-transform" />}
                          <span className="text-[10px] font-bold text-zinc-500">{label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#2A2A2A] rounded-2xl p-4 mb-4 flex items-center gap-4 relative border border-white/5">
                      <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/b3054992e11f725109af4ccf86f775f9d3d505e0-40x40-1766563157101.png" className="w-10 h-10 rounded-lg" alt="terminal" />
                      <p className="text-xs font-bold leading-snug pr-4">{data.banner}</p>
                      <X className="absolute top-2 right-2 i-3 text-zinc-500" />
                    </div>

                    <div className="bg-[#2A2A2A] rounded-2xl p-4 flex items-center justify-between border border-white/5 hover:bg-[#323232] transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black overflow-hidden">
                          <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/api.phantom-1766562867239.avif" className="w-full h-full object-cover" alt="sol" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{data.tokName}</span>
                          <span className="text-[11px] text-zinc-500 font-bold">{data.tokAmt}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-sm">${data.tokUsd}</span>
                        <span className={`text-[11px] font-bold ${data.tokChg.startsWith('-') ? "text-red-400" : "text-green-400"}`}>
                          {data.tokChg.startsWith('-') ? "-$" : "+$"}{data.tokChg.replace('-', '')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-6 opacity-40 hover:opacity-100 transition-opacity cursor-pointer py-2">
                       <LayoutGrid className="w-4 h-4" />
                       <span className="text-xs font-bold">{data.manage}</span>
                    </div>

                    {/* Bottom Nav */}
                    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-[#1F1F1F] border-t border-white/5 flex items-center justify-around px-2">
                      <div className="text-indigo-300 cursor-pointer p-2"><Wallet className="w-6 h-6" /></div>
                      <div className="text-zinc-600 cursor-pointer p-2 hover:text-zinc-300"><LayoutGrid className="w-6 h-6" /></div>
                      <div className="text-zinc-600 cursor-pointer p-2 hover:text-zinc-300 rotate-45"><ArrowRightLeft className="w-6 h-6" /></div>
                      <div className="text-zinc-600 cursor-pointer p-2 hover:text-zinc-300"><Zap className="w-6 h-6" /></div>
                      <div className="text-zinc-600 cursor-pointer p-2 hover:text-zinc-300"><Search className="w-6 h-6" /></div>
                    </nav>

                    {/* Editor Trigger (Pencil) */}
                    <button 
                      onClick={() => setIsEditorOpen(true)}
                      className="absolute top-4 right-4 text-zinc-500/10 hover:text-indigo-300 transition-colors p-2"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Editor Overlay */}
                  <AnimatePresence>
                    {isEditorOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-xl p-6 flex flex-col overflow-y-auto"
                      >
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-xl font-bold text-indigo-300">Edit Mock Data</h2>
                          <button onClick={() => setIsEditorOpen(false)} className="p-2 bg-white/5 rounded-full">
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-6 flex-1">
                          <div className="space-y-3">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global</h3>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-zinc-500">Chain</label>
                              <input 
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-indigo-500/50 transition-colors outline-none" 
                                value={data.chain}
                                onChange={(e) => setData({...data, chain: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-zinc-500">Account Name</label>
                              <input 
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-indigo-500/50 outline-none" 
                                value={data.homeName}
                                onChange={(e) => setData({...data, homeName: e.target.value})}
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Balance</h3>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500">Balance ($)</label>
                                <input 
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-indigo-500/50 outline-none" 
                                  value={data.bal}
                                  onChange={(e) => setData({...data, bal: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500">Delta ($)</label>
                                <input 
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-indigo-500/50 outline-none" 
                                  value={data.delta}
                                  onChange={(e) => setData({...data, delta: e.target.value})}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Banner</h3>
                            <textarea 
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm h-20 resize-none focus:border-indigo-500/50 outline-none" 
                              value={data.banner}
                              onChange={(e) => setData({...data, banner: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 mt-8 pb-4">
                          <Button variant="ghost" onClick={handleReset} className="flex-1 bg-white/5 hover:bg-white/10">
                            <RotateCcw className="w-4 h-4 mr-2" /> Reset
                          </Button>
                          <Button onClick={() => setIsEditorOpen(false)} className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-zinc-900 font-bold">
                            Done
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Info Column */}
              <div className="max-w-md space-y-6">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-300 flex items-center gap-2">
                      <Zap className="w-5 h-5" /> Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
                        <Pencil className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Visual Mockup Editor</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">Change balances, account names, and token data instantly for UI testing.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0">
                        <LayoutGrid className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Multi-Screen Navigation</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">Simulates full Phantom Wallet flow from Add Wallet to Home Screen.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-300 text-xs font-medium leading-relaxed">
                  <p><strong>Note:</strong> This is a browser extension concept for designers and developers. You can use it to create high-fidelity mockups of crypto wallet interfaces without real blockchain interactions.</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === "instructions" && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Chrome className="w-8 h-8 text-indigo-400" /> Installation Guide
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Follow these simple steps to load the extension in your browser
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {[
                    {
                      title: "Open Extensions",
                      desc: "In Chrome, navigate to chrome://extensions or click the puzzle icon in the toolbar.",
                      icon: <Puzzle className="w-5 h-5" />
                    },
                    {
                      title: "Enable Developer Mode",
                      desc: "Locate the 'Developer mode' toggle in the top right corner and switch it ON.",
                      icon: <Settings className="w-5 h-5" />
                    },
                    {
                      title: "Load Unpacked",
                      desc: "Click 'Load unpacked' and select the extension folder from your project directory.",
                      path: "public/extension",
                      icon: <Download className="w-5 h-5" />
                    }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-black text-indigo-400 shrink-0">
                        {i + 1}
                      </div>
                      <div className="space-y-2 pt-1">
                        <h4 className="font-bold text-lg flex items-center gap-2">{step.icon} {step.title}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                        {step.path && (
                          <div className="mt-2 bg-black rounded-lg p-3 border border-white/5 font-mono text-xs text-indigo-300">
                            <code>{step.path}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {view === "code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto"
            >
              <Tabs defaultValue="manifest" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="bg-zinc-900 border border-zinc-800">
                    <TabsTrigger value="manifest">manifest.json</TabsTrigger>
                    <TabsTrigger value="html">popup.html</TabsTrigger>
                    <TabsTrigger value="js">popup.js</TabsTrigger>
                  </TabsList>
                  <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800" asChild>
                    <a href="https://github.com/shibyee/orchids-testerr" target="_blank">
                      View on GitHub
                    </a>
                  </Button>
                </div>
                
                <TabsContent value="manifest">
                  <pre className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-sm overflow-x-auto text-indigo-300">
                    <code>{FILES.manifest}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="html">
                  <pre className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-sm overflow-x-auto text-indigo-300">
                    <code>{FILES.popupHtml}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="js">
                  <pre className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-sm overflow-x-auto text-indigo-300">
                    <code>{FILES.popupJs}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="py-12 text-center text-zinc-600 text-xs font-medium">
        Built with ❤️ for Orchid Developers
      </footer>
    </div>
  );
}
