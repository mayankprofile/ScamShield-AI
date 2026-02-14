
import React, { useEffect, useState } from 'react';
import { ScamAnalysis, RiskLevel } from '../types';
import { AlertTriangle, CheckCircle2, ShieldAlert, Info, ArrowRight, Languages, MessageSquare, Quote, ShieldCheck, Coffee } from 'lucide-react';

interface ResultDisplayProps {
  analysis: ScamAnalysis;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ analysis, onReset }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(analysis.scamScore), 100);
    return () => clearTimeout(timer);
  }, [analysis.scamScore]);

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return 'text-emerald-400';
      case RiskLevel.MEDIUM: return 'text-yellow-400';
      case RiskLevel.HIGH: return 'text-orange-500';
      case RiskLevel.DANGEROUS: return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  const getRiskBg = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return 'bg-emerald-500/10 border-emerald-500/20';
      case RiskLevel.MEDIUM: return 'bg-yellow-500/10 border-yellow-500/20';
      case RiskLevel.HIGH: return 'bg-orange-500/10 border-orange-500/20';
      case RiskLevel.DANGEROUS: return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className={`p-8 md:p-12 text-center border-b border-slate-800 ${getRiskBg(analysis.riskLevel)}`}>
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/50 border border-slate-800 text-sm font-semibold tracking-wider uppercase text-slate-400">
              ScamGuard Report
            </div>
            {analysis.detectedLanguage && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
                <Languages className="w-3 h-3" /> Detected Language: {analysis.detectedLanguage}
              </div>
            )}
          </div>
          
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96" cy="96" r="88"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-800"
              />
              <circle
                cx="96" cy="96" r="88"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
                strokeLinecap="round"
                className={`transition-all duration-1000 ease-out ${getRiskColor(analysis.riskLevel)}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white">{Math.round(progress)}%</span>
              <span className="text-sm font-medium text-slate-400 uppercase tracking-widest mt-1">Scam Score</span>
            </div>
          </div>

          <h3 className={`text-3xl md:text-4xl font-black mb-2 flex items-center justify-center gap-3 ${getRiskColor(analysis.riskLevel)}`}>
            {analysis.riskLevel === RiskLevel.LOW && <CheckCircle2 className="w-8 h-8" />}
            {analysis.riskLevel === RiskLevel.MEDIUM && <Info className="w-8 h-8" />}
            {analysis.riskLevel === RiskLevel.HIGH && <ShieldAlert className="w-8 h-8" />}
            {analysis.riskLevel === RiskLevel.DANGEROUS && <AlertTriangle className="w-8 h-8" />}
            {analysis.riskLevel} Risk Detected
          </h3>
        </div>

        {/* Translation Section */}
        {(analysis.extractedText || analysis.translation) && (
          <div className="p-8 md:p-10 bg-slate-950/50 border-b border-slate-800 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {analysis.extractedText && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Quote className="w-3 h-3" /> Extracted Text Preview
                  </h4>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-sm font-medium italic leading-relaxed max-h-40 overflow-y-auto">
                    {analysis.extractedText}
                  </div>
                </div>
              )}
              {analysis.translation && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> English Translation
                  </h4>
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-slate-200 text-sm font-bold leading-relaxed max-h-40 overflow-y-auto">
                    {analysis.translation}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-px bg-slate-800">
          <div className="p-8 md:p-10 bg-slate-900">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              AI Explanation
            </h4>
            <div className="mb-6 text-slate-400 text-sm leading-relaxed italic">
              {analysis.aiExplanation}
            </div>
            <ul className="space-y-4">
              {analysis.reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                  <span className="text-slate-300 text-sm leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 md:p-10 bg-slate-900">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Safety Advice Box
            </h4>
            <div className="space-y-4">
              {analysis.safetyAdvice.map((advice, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-slate-300 text-sm leading-relaxed font-medium">{advice}</span>
                </div>
              ))}
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-orange-400 shrink-0" />
                <p className="text-orange-300 text-xs font-bold leading-relaxed">
                  Be careful. Messages asking for money or personal details in any language can be scams.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-950 text-center">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold tracking-wide group outline-none"
          >
            Start New Scan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Support ScamGuard Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full -z-10" />
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl font-black text-white tracking-tight">Support ScamGuard</h3>
          <p className="text-slate-400 font-medium leading-relaxed">
            This tool is completely free to use. If you found it helpful, you can support us by buying us a coffee. Your support helps us improve ScamGuard and keep people safe from scams.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => window.open('https://buymeacoffee.com/scamguard', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-full shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 outline-none"
            >
              <Coffee className="w-5 h-5" /> Buy Me a Coffee
            </button>
            <button 
              onClick={onReset}
              className="text-slate-500 hover:text-slate-300 font-bold text-sm transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
