
import React, { useState, useEffect } from 'react';
import { Scanner } from './components/Scanner';
import { ResultDisplay } from './components/ResultDisplay';
import { History } from './components/History';
import { ScamAnalysis, HistoryItem } from './types';
import { analyzeContent } from './services/geminiService';
import { Shield, Lock, Search, AlertCircle, Mail, MessageSquare, Briefcase, CreditCard, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('scam_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history");
      }
    }
  }, []);

  const handleAnalyze = async (text: string, image: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeContent(text, image || undefined);
      setAnalysis(result);
      
      const newHistoryItem: HistoryItem = {
        id: result.id,
        timestamp: result.timestamp,
        scamScore: result.scamScore,
        riskLevel: result.riskLevel,
      };
      
      const updatedHistory = [newHistoryItem, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('scam_history', JSON.stringify(updatedHistory));
      
      // Scroll to result
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToScanner = () => {
    document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white">SCAM<span className="text-blue-500">GUARD</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Safety Guide</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
            <a href="#" className="hover:text-white transition-colors">Enterprise</a>
          </div>
          <button 
            onClick={scrollToScanner}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg border border-slate-700 transition-all"
          >
            Check Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      {!analysis && !loading && (
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
          
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Lock className="w-3 h-3" /> Powered by Gemini 3.0
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Detect Online Scams <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">in Seconds with AI</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Instantly verify suspicious messages, emails, job offers, or payment requests. 
              Our advanced AI detects fraud patterns before they catch you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={scrollToScanner}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
              >
                Start Free Scan <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-sm font-medium">
                <span className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i+10}/32/32`} className="w-6 h-6 rounded-full border-2 border-slate-900" alt="User" />
                  ))}
                </span>
                10k+ threats detected today
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Analysis Area */}
      <main className={`px-6 pb-20 ${analysis ? 'pt-24' : ''}`}>
        {analysis ? (
          <ResultDisplay analysis={analysis} onReset={() => setAnalysis(null)} />
        ) : (
          <>
            <Scanner onAnalyze={handleAnalyze} loading={loading} />
            
            {error && (
              <div className="max-w-4xl mx-auto mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <History items={history} onSelect={(id) => {
              // In a real app we'd fetch the specific item details, 
              // for this demo we'll just re-scroll to top or show recent
              scrollToScanner();
            }} />
          </>
        )}

        {/* Features / Use Cases - Only on Home */}
        {!analysis && (
          <section className="max-w-7xl mx-auto mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Mail} 
              title="Phishing Emails" 
              desc="Identify spoofed addresses and malicious attachments instantly."
            />
            <FeatureCard 
              icon={MessageSquare} 
              title="SMS/WhatsApp Fraud" 
              desc="Detect 'hi mum' scams, parcel delivery fraud, and crypto traps."
            />
            <FeatureCard 
              icon={Briefcase} 
              title="Fake Job Offers" 
              desc="Scan for unrealistic salary promises and data harvesting attempts."
            />
            <FeatureCard 
              icon={CreditCard} 
              title="Payment Scams" 
              desc="Verify escrow services, crypto links, and suspicious invoices."
            />
          </section>
        )}
      </main>

      {/* Trust Section */}
      {!analysis && (
        <section className="py-24 border-t border-slate-900 bg-slate-950/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black text-white mb-6">Total Digital Protection</h2>
            <p className="text-slate-400 text-lg mb-12">
              Protecting thousands of users from financial loss and identity theft every single day. 
              Our technology analyzes linguistic nuances, metadata, and psychological manipulation patterns 
              that manual verification often misses.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Stat value="99.2%" label="Accuracy" />
              <div className="w-px h-12 bg-slate-800 mx-auto hidden md:block" />
              <Stat value="1.2s" label="Scan Speed" />
              <div className="w-px h-12 bg-slate-800 mx-auto hidden md:block" />
              <Stat value="2M+" label="Blocked URLs" />
              <div className="w-px h-12 bg-slate-800 mx-auto hidden md:block" />
              <Stat value="24/7" label="Monitoring" />
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center">
              <Shield className="w-4 h-4 text-slate-400" />
            </div>
            <span className="font-bold text-slate-100">ScamGuard AI</span>
          </div>
          <p className="text-slate-600 text-sm">© 2025 AI Scam Detector Tool. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: any, title: string, desc: string }> = ({ icon: Icon, title, desc }) => (
  <div className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-3xl hover:border-blue-500/30 transition-all group">
    <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 group-hover:bg-blue-600 transition-colors">
      <Icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Stat: React.FC<{ value: string, label: string }> = ({ value, label }) => (
  <div>
    <div className="text-2xl font-black text-white mb-1">{value}</div>
    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
  </div>
);

export default App;
