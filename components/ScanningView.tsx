
import React, { useState, useEffect } from 'react';
import { Shield, Search, Cpu, Globe, Lock } from 'lucide-react';

export const ScanningView: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);
  const logs = [
    "Initializing neural core...",
    "Extracting linguistic patterns...",
    "Cross-referencing known fraud databases...",
    "Checking domain reputation...",
    "Analyzing psychological triggers...",
    "Evaluating social engineering markers...",
    "Calculating risk probability matrix...",
    "Finalizing safety report..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-12 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-center overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative z-10">
        <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
          <div className="absolute inset-4 border-2 border-slate-700 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-10 h-10 text-blue-400 animate-pulse" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
          Deep Analysis in Progress
        </h2>
        <p className="text-slate-400 mb-10 max-w-md mx-auto">
          Our AI is currently examining the content for signs of phishing, manipulation, and digital fraud.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
          <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
            <Cpu className="w-5 h-5 text-blue-500" />
            <div className="text-left">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Engine</div>
              <div className="text-sm font-bold text-slate-300">ScamGuard AI</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
            <Globe className="w-5 h-5 text-emerald-500" />
            <div className="text-left">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Network</div>
              <div className="text-sm font-bold text-slate-300">Global Threat Intel</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/50 font-mono text-xs text-left overflow-hidden h-32">
          <div className="flex flex-col gap-2">
            {logs.slice(0, logIndex + 1).map((log, i) => (
              <div key={i} className={`flex items-center gap-2 ${i === logIndex ? 'text-blue-400' : 'text-slate-600'}`}>
                <span className="shrink-0">{'>'}</span>
                <span>{log}</span>
                {i === logIndex && <span className="w-2 h-4 bg-blue-500 animate-pulse ml-1" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
