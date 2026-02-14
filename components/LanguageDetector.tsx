
import React, { useState } from 'react';
import { 
  Languages, 
  Globe, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Search, 
  Info,
  ChevronRight,
  ShieldAlert,
  MessageSquare,
  Coffee
} from 'lucide-react';
import { ScamAnalysis, RiskLevel } from '../types';
import { analyzeMultiLanguageContent } from '../services/geminiService';
import { ScanningView } from './ScanningView';

const LANGUAGES = {
  indian: [
    { name: "Hindi", flag: "in" },
    { name: "Tamil", flag: "in" },
    { name: "Bengali", flag: "in" },
    { name: "Punjabi", flag: "in" },
    { name: "Marathi", flag: "in" },
    { name: "Telugu", flag: "in" },
    { name: "Gujarati", flag: "in" },
    { name: "Malayalam", flag: "in" },
    { name: "Kannada", flag: "in" },
    { name: "English", flag: "in" }
  ],
  foreign: [
    { name: "Arabic", flag: "sa" },
    { name: "French", flag: "fr" },
    { name: "Spanish", flag: "es" },
    { name: "German", flag: "de" },
    { name: "Chinese", flag: "cn" },
    { name: "Japanese", flag: "jp" },
    { name: "Russian", flag: "ru" },
    { name: "Portuguese", flag: "pt" },
    { name: "Turkish", flag: "tr" },
    { name: "Indonesian", flag: "id" }
  ]
};

export const LanguageDetector: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedLang, setSelectedLang] = useState('Auto Detect');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeMultiLanguageContent(text, selectedLang === 'Auto Detect' ? undefined : selectedLang);
      setAnalysis(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "Failed to analyze language content.");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) return <ScanningView />;

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Globe className="w-3 h-3" /> Worldwide AI Protection
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Global Language <span className="text-blue-500">ScamGuard</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Paste a message in any Indian or foreign language. ScamGuard will translate it into English and check if it’s a scam.
          </p>
        </div>

        {analysis ? (
          /* Result View */
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
              <div className={`p-8 md:p-12 text-center border-b border-slate-800 ${getRiskBg(analysis.riskLevel)}`}>
                <div className="flex justify-center items-center gap-2 mb-6">
                   <div className="px-4 py-1.5 rounded-full bg-slate-950/50 border border-slate-800 text-sm font-bold text-blue-400 flex items-center gap-2">
                    <Languages className="w-4 h-4" /> Detected: {analysis.detectedLanguage}
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center mb-8">
                  <div className="text-6xl font-black text-white mb-2">{analysis.scamScore}%</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Scam Probability</div>
                </div>

                <h3 className={`text-3xl font-black mb-4 flex items-center justify-center gap-3 ${getRiskColor(analysis.riskLevel)}`}>
                  {analysis.riskLevel === RiskLevel.LOW && <CheckCircle2 className="w-8 h-8" />}
                  {analysis.riskLevel !== RiskLevel.LOW && <ShieldAlert className="w-8 h-8" />}
                  {analysis.riskLevel} Risk
                </h3>
              </div>

              <div className="p-8 md:p-12 space-y-10">
                {/* Translation Box */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                    English Translation
                  </h4>
                  <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 leading-relaxed text-slate-300 italic">
                    "{analysis.translation}"
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Search className="w-5 h-5 text-blue-400" />
                      Detection Findings
                    </h4>
                    <ul className="space-y-4">
                      {analysis.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-3 p-4 bg-slate-950/30 rounded-2xl border border-slate-800/30">
                          <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
                          <span className="text-slate-300 text-sm leading-relaxed">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">AI Explanation</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {analysis.aiExplanation}
                      </p>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        Safety Advice
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Be cautious. Scammers often use foreign languages or regional dialects to appear official or bypass simple filters. 
                        <strong> Always verify the source.</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-950 text-center">
                <button
                  onClick={() => setAnalysis(null)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-xl active:scale-95 flex items-center gap-2 mx-auto outline-none"
                >
                  Translate & Scan Another <ChevronRight className="w-5 h-5" />
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
                    onClick={() => setAnalysis(null)}
                    className="text-slate-500 hover:text-slate-300 font-bold text-sm transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Input View */
          <>
            <div className="max-w-3xl mx-auto bg-slate-900/50 border border-slate-800 rounded-[32px] p-8 md:p-10 shadow-2xl backdrop-blur-sm">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste message in any language (Hindi, Tamil, Bengali, Punjabi, English, Arabic, French, Spanish, Chinese, etc.)"
                      className="w-full h-64 bg-slate-950/50 border border-slate-700 rounded-2xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none placeholder:text-slate-600 font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="relative w-full sm:w-auto">
                    <select 
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      className="w-full sm:w-64 appearance-none bg-slate-800 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold cursor-pointer"
                    >
                      <option>Auto Detect</option>
                      <optgroup label="Indian Languages">
                        {LANGUAGES.indian.map(l => <option key={l.name}>{l.name}</option>)}
                      </optgroup>
                      <optgroup label="Foreign Languages">
                        {LANGUAGES.foreign.map(l => <option key={l.name}>{l.name}</option>)}
                      </optgroup>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={!text.trim()}
                    className={`w-full sm:w-auto px-10 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all ${
                      text.trim() 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 active:scale-95' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Languages className="w-5 h-5" />
                    Translate & Check Scam
                  </button>
                </div>

                {error && <p className="text-red-400 font-bold text-sm bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20 text-center">{error}</p>}
              </div>
            </div>

            {/* Why it Matters Section */}
            <div className="grid md:grid-cols-2 gap-16 pt-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                    <Info className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-3xl font-black text-white">Why ScamGuard Matters</h2>
                </div>
                <div className="space-y-6">
                  <Point text="Many scams originate from international numbers using foreign scripts to bypass regional filters." />
                  <Point text="Messages in unknown languages can create confusion, which scammers exploit to push fraudulent links." />
                  <Point text="Instant translation reveals the true intent, exposing emotional manipulation and false threats." />
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10">
                <h3 className="text-xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Supported Languages
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 text-center">Indian Regional</div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {LANGUAGES.indian.map(lang => (
                        <span key={lang.name} className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-slate-400">
                          <img src={`https://flagcdn.com/w40/${lang.flag}.png`} alt="" className="w-4 h-3 rounded-sm border border-slate-800" />
                          {lang.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 text-center">International</div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {LANGUAGES.foreign.map(lang => (
                        <span key={lang.name} className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-slate-400">
                          <img src={`https://flagcdn.com/w40/${lang.flag}.png`} alt="" className="w-4 h-3 rounded-sm border border-slate-800" />
                          {lang.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bottom CTA */}
        {!analysis && (
          <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 rounded-[40px] p-12 text-center border border-blue-500/10">
            <h3 className="text-2xl font-black text-white mb-4">Got a message in an unknown language?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Our professional AI translation and analysis can reveal the truth. Don't let language barriers lead to financial loss.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-black tracking-wide"
            >
              Translate & Scan Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

const Point: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-4">
    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
    <p className="text-slate-400 leading-relaxed font-medium">{text}</p>
  </div>
);
