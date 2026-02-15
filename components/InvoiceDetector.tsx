
import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  FileSearch,
  Search,
  ChevronRight,
  Image as ImageIcon,
  MessageSquare,
  Package,
  CreditCard,
  Layers,
  Edit3,
  ShieldCheck,
  Coffee
} from 'lucide-react';
import { ScamAnalysis, RiskLevel } from '../types';
import { analyzeContent } from '../services/geminiService';
import { ScanningView } from './ScanningView';
import { TranslationKey } from '../services/translations';

interface InvoiceDetectorProps {
  t: (key: TranslationKey) => string;
  onBuyCoffee: () => void;
}

export const InvoiceDetector: React.FC<InvoiceDetectorProps> = ({ t, onBuyCoffee }) => {
  const [file, setFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setAnalysis(null);
    setError(null);
    try {
      const result = await analyzeContent(undefined, file, true);
      setAnalysis(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "Failed to analyze invoice.");
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
            <FileText className="w-3 h-3" /> Fraud Prevention Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Fake Invoice & <span className="text-blue-500">Payment Screenshot</span> Detector
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Upload a bill, invoice, or payment screenshot and let ScamGuard check if it looks suspicious or manipulated.
          </p>
        </div>

        {analysis ? (
          /* Result View */
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
              <div className={`p-8 md:p-12 text-center border-b border-slate-800 ${getRiskBg(analysis.riskLevel)}`}>
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-slate-950/50 border border-slate-800 text-sm font-semibold tracking-wider uppercase text-slate-400">
                  Audit Result
                </div>
                
                <div className="flex flex-col items-center justify-center mb-8">
                  <div className="text-6xl font-black text-white mb-2">{100 - analysis.scamScore}%</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Invoice Safety Score</div>
                </div>

                <h3 className={`text-3xl font-black mb-4 flex items-center justify-center gap-3 ${getRiskColor(analysis.riskLevel)}`}>
                  {analysis.riskLevel === RiskLevel.LOW && <CheckCircle2 className="w-8 h-8" />}
                  {analysis.riskLevel !== RiskLevel.LOW && <ShieldAlert className="w-8 h-8" />}
                  {analysis.riskLevel} Risk
                </h3>
              </div>

              <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
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
                    <h4 className="text-xl font-bold text-white mb-4">AI Explanation</h4>
                    <p className="text-slate-400 text-sm leading-relaxed bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                      {analysis.aiExplanation}
                    </p>
                  </div>

                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      Safety Advice
                    </h4>
                    <ul className="space-y-2">
                      {analysis.safetyAdvice.map((advice, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          {advice}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-950 text-center">
                <button
                  onClick={removeFile}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-2 mx-auto outline-none"
                >
                  Scan Another Invoice <ChevronRight className="w-5 h-5" />
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
                    onClick={onBuyCoffee}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-full shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 outline-none"
                  >
                    <Coffee className="w-5 h-5" /> Buy Me a Coffee
                  </button>
                  <button 
                    onClick={removeFile}
                    className="text-slate-500 hover:text-slate-300 font-bold text-sm transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Upload View */
          <>
            <div className="max-w-3xl mx-auto">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-[40px] p-12 text-center transition-all ${
                  file ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="hidden"
                />

                {file ? (
                  <div className="space-y-6">
                    <div className="relative inline-block">
                      <img src={file} alt="Preview" className="max-h-64 rounded-2xl border border-slate-700 mx-auto shadow-2xl" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(); }}
                        className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-white font-bold">Document Ready for Analysis</div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xl">
                      <Upload className="w-10 h-10 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">Upload Invoice / Bill / Payment Screenshot</h3>
                      <p className="text-slate-500 font-medium">Click or drag and drop to start</p>
                    </div>
                    <div className="flex justify-center gap-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
                      <span>JPG</span>
                      <span>•</span>
                      <span>PNG</span>
                      <span>•</span>
                      <span>PDF</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col items-center gap-6">
                <button
                  onClick={handleAnalyze}
                  disabled={!file}
                  className={`px-12 py-5 rounded-2xl font-black text-xl flex items-center gap-3 transition-all ${
                    file 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/20 active:scale-95' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <FileSearch className="w-6 h-6" />
                  Analyze Invoice
                </button>
                <p className="text-slate-600 text-sm font-medium">
                  ScamGuard will scan for signs of fake logos, edited amounts, and suspicious payment details.
                </p>
                {error && <p className="text-red-400 font-bold text-sm bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20">{error}</p>}
              </div>
            </div>

            {/* Info Sections */}
            <div className="grid md:grid-cols-2 gap-24 pt-16">
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                    <ShieldAlert className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-3xl font-black text-white">What ScamGuard Detects</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <DetectionCard icon={ImageIcon} title="Fake Logos" desc="Low res or forged icons." />
                  <DetectionCard icon={Edit3} title="Edited Amounts" desc="Altered price digits." />
                  <DetectionCard icon={CreditCard} title="UPI Fraud" desc="Suspicious QR codes." />
                  <DetectionCard icon={Layers} title="Manipulation" desc="Photoshop artifacts." />
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                    <Info className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h2 className="text-3xl font-black text-white">When Should You Use This?</h2>
                </div>
                <ul className="space-y-4">
                  <UsageItem text="Received an invoice on WhatsApp/Telegram." />
                  <UsageItem text="Payment request from an unknown seller." />
                  <UsageItem text="Courier/customs payment screenshots." />
                  <UsageItem text="Job-related payment demands or security deposits." />
                </ul>
              </section>
            </div>
          </>
        )}

        {/* Bottom CTA */}
        {!analysis && (
          <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-[40px] p-12 text-center border border-blue-500/10">
            <h3 className="text-2xl font-black text-white mb-4">Not Sure About a Payment Request?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Our professional AI analysis can save you from potential financial loss. Upload any document before you pay.
            </p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-black tracking-wide"
            >
              Upload Document to Verify <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

const DetectionCard: React.FC<{ icon: any; title: string; desc: string }> = ({ icon: Icon, title, desc }) => (
  <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
    <Icon className="w-6 h-6 text-blue-400 mb-3" />
    <h3 className="text-white font-bold mb-1">{title}</h3>
    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
  </div>
);

const UsageItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-4 p-4 bg-slate-900/30 rounded-2xl border border-slate-800/30">
    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
    <span className="text-slate-300 text-sm font-medium">{text}</span>
  </li>
);
