
import React, { useEffect, useState } from 'react';
import { ScamAnalysis, RiskLevel } from '../types';
import { AlertTriangle, CheckCircle2, ShieldAlert, Info, ArrowRight } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className={`p-8 md:p-12 text-center border-b border-slate-800 ${getRiskBg(analysis.riskLevel)}`}>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-slate-950/50 border border-slate-800 text-sm font-semibold tracking-wider uppercase text-slate-400">
            Analysis Report
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
          <p className="text-slate-400 max-w-lg mx-auto">
            Our AI engine evaluated various patterns, linguistics, and technical indicators to determine this safety score.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-slate-800">
          <div className="p-8 md:p-10 bg-slate-900">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              Detection Reasons
            </h4>
            <ul className="space-y-4">
              {analysis.reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                  <span className="text-slate-300 leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 md:p-10 bg-slate-900">
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Safety Advice
            </h4>
            <div className="space-y-4">
              {analysis.safetyAdvice.map((advice, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-slate-300 text-sm leading-relaxed font-medium">{advice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-950 text-center">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold tracking-wide group"
          >
            Start New Scan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
