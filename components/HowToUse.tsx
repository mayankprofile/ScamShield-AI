
import React from 'react';
import { 
  ChevronLeft, 
  MessageSquare, 
  ImageIcon, 
  FileText, 
  Link as LinkIcon, 
  ShieldCheck, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight,
  MousePointer2,
  Upload,
  Search,
  CheckCircle2,
  Users
} from 'lucide-react';
import { TranslationKey } from '../services/translations';

interface HowToUseProps {
  onBack: () => void;
  onContactClick: () => void;
  onNavigate: (view: string) => void;
  t: (key: TranslationKey) => string;
}

export const HowToUse: React.FC<HowToUseProps> = ({ onBack, onContactClick, onNavigate, t }) => {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('btn_back_home')}
        </button>

        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle className="w-3 h-3" /> Step-by-Step Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            How to Use <span className="text-blue-500">ScamGuard</span> – Complete User Guide
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed">
            Learn how to check messages, screenshots, links, and invoices for scams in just a few simple steps.
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-24 p-8 bg-blue-600/5 border border-blue-500/20 rounded-[32px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10" />
          <h2 className="text-2xl font-black text-white mb-4">Quick Introduction</h2>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">
            ScamGuard helps you detect online scams using AI. You can paste messages, upload screenshots, check invoices, and scan suspicious content in seconds. Follow the steps below to use each feature easily.
          </p>
        </section>

        {/* Methods Grid */}
        <div className="space-y-16">
          {/* Method 1 */}
          <section className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Method 1 – Check a Text Message</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StepCard number="1" title="Go to Home" desc="Navigate to the homepage scanner." />
              <StepCard number="2" title="Paste Content" desc="Paste message, email, or job offer into text box." />
              <StepCard number="3" title="Click Scan" desc="Hit the analyze button to start AI processing." />
              <StepCard number="4" title="View Results" desc="Check score, risk level, and AI explanation." />
            </div>
          </section>

          {/* Method 2 */}
          <section className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Method 2 – Upload a Screenshot</h2>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-[40px] p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-black text-xs shrink-0">1</div>
                    <p className="text-slate-300 font-bold">Click "Select Screenshot" in the scanner area.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-black text-xs shrink-0">2</div>
                    <p className="text-slate-300 font-bold">Upload an image from WhatsApp, email, or any social app.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-black text-xs shrink-0">3</div>
                    <p className="text-slate-300 font-bold text-sm">Wait for AI to read text, detect language, and translate it.</p>
                  </div>
                </div>
                <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl">
                   <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">AI Processing Steps</h4>
                   <ul className="space-y-3">
                     <li className="flex items-center gap-2 text-slate-400 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> Advanced OCR Reading</li>
                     <li className="flex items-center gap-2 text-slate-400 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> Automatic Language Detection</li>
                     <li className="flex items-center gap-2 text-slate-400 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> High-Accuracy Translation</li>
                     <li className="flex items-center gap-2 text-slate-400 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> Pattern Recognition Analysis</li>
                   </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Method 3 */}
          <section className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Method 3 – Check Fake Invoice</h2>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-500/30 transition-all">
              <div className="flex-grow space-y-4">
                <p className="text-slate-300 font-bold">1. Navigate to the "Invoice Detector" page via the top menu.</p>
                <p className="text-slate-300 font-bold">2. Upload your bill, invoice, or payment screenshot.</p>
                <p className="text-slate-300 font-bold">3. Review results for edited amounts, fake logos, or suspicious details.</p>
                <button 
                  onClick={() => onNavigate('invoice-detector')}
                  className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest flex items-center gap-2"
                >
                  Try Invoice Detector <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full md:w-64 grid grid-cols-2 gap-2">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center"><ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto mb-2" /><span className="text-[10px] font-black text-slate-500 uppercase">Edited Detection</span></div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center"><Search className="w-6 h-6 text-emerald-500 mx-auto mb-2" /><span className="text-[10px] font-black text-slate-500 uppercase">Logo Audit</span></div>
              </div>
            </div>
          </section>

          {/* Method 4 */}
          <section className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <LinkIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Method 4 – Scan Links & Job Offers</h2>
            </div>
            <div className="p-8 bg-slate-950 border border-slate-800 rounded-[32px]">
              <p className="text-slate-400 mb-8 font-medium">Paste any suspicious URL or job description into the main scanner. Our AI specializes in detecting specific fraudulent tones.</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <AlertCircle className="w-5 h-5 text-red-400 mb-3" />
                  <h4 className="text-white font-bold mb-2">Phishing Patterns</h4>
                  <p className="text-slate-500 text-xs">Detection of lookalike domains and credential harvesting.</p>
                </div>
                <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-blue-400 mb-3" />
                  <h4 className="text-white font-bold mb-2">Fake Job Tone</h4>
                  <p className="text-slate-500 text-xs">AI identifies unrealistic promises and HR-style manipulation.</p>
                </div>
                <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <MousePointer2 className="w-5 h-5 text-emerald-400 mb-3" />
                  <h4 className="text-white font-bold mb-2">Payment Fraud</h4>
                  <p className="text-slate-500 text-xs">Flags requests for crypto, gift cards, or UPI prepayments.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding Results */}
          <section className="relative pt-16 border-t border-slate-900">
            <h2 className="text-4xl font-black text-white mb-12 tracking-tight">Understanding the Results</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-10">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Scam Score</h4>
                  <p className="text-slate-400 font-medium">A percentage indicating the risk level. Higher scores mean the content matches common fraudulent patterns recognized by our AI.</p>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white mb-4">Risk Levels</h4>
                  <div className="space-y-3">
                    <RiskItem color="emerald" label="Low" desc="Content looks legitimate. Always verify manually though." />
                    <RiskItem color="yellow" label="Medium" desc="Some suspicious elements found. Proceed with caution." />
                    <RiskItem color="orange" label="High" desc="Strong scam indicators present. Highly likely to be fraud." />
                    <RiskItem color="red" label="Dangerous" desc="Clear and obvious scam. Do not interact or share data." />
                  </div>
                </div>
              </div>
              <div className="space-y-10">
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">AI Explanation</h4>
                  <p className="text-slate-400 font-medium">A human-readable breakdown of *why* the content was flagged, listing specific red flags like "Urgency," "Unprofessional Tone," or "Suspicious Domain."</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Safety Tips</h4>
                  <p className="text-slate-400 font-medium">Specific actions you should take next, such as reporting the number, blocking the sender, or verifying through an official app.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips for Best Results */}
          <section className="relative p-10 bg-slate-900 border border-slate-800 rounded-[48px]">
            <h2 className="text-3xl font-black text-white mb-8">Tips for Best Results</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               <TipItem text="Upload clear, high-resolution screenshots for OCR accuracy." />
               <TipItem text="Paste the full message text, including the sender's info if possible." />
               <TipItem text="Don't crop important details like dates, times, or full URLs." />
               <TipItem text="Always verify through official bank/company apps before paying." />
            </div>
          </section>

          {/* Who Can Use */}
          <section className="relative text-center">
            <h2 className="text-3xl font-black text-white mb-12">Who Can Use ScamGuard?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <UserLabel text="General Users" />
              <UserLabel text="Students" />
              <UserLabel text="Job Seekers" />
              <UserLabel text="Senior Citizens" />
              <UserLabel text="Small Businesses" />
            </div>
          </section>

          {/* Need Help CTA */}
          <section className="pt-20">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-12 md:p-16 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl -z-10" />
               <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Still confused about how to use ScamGuard?</h2>
               <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto font-medium">Our support team is ready to help you navigate the tool and stay safe online.</p>
               <button 
                 onClick={onContactClick}
                 className="px-12 py-5 bg-white text-blue-600 font-black text-xl rounded-2xl shadow-2xl hover:scale-105 transition-all active:scale-95 flex items-center gap-3 mx-auto"
               >
                 Contact Support <ArrowRight className="w-6 h-6" />
               </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const StepCard: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl group hover:border-blue-500/30 transition-all">
    <div className="text-4xl font-black text-slate-800 mb-4 group-hover:text-blue-500 transition-colors">{number}</div>
    <h3 className="text-white font-bold mb-2">{title}</h3>
    <p className="text-slate-500 text-xs leading-relaxed font-medium">{desc}</p>
  </div>
);

const RiskItem: React.FC<{ color: string; label: string; desc: string }> = ({ color, label, desc }) => {
  const colors: any = {
    emerald: 'bg-emerald-500 text-emerald-400 border-emerald-500/20',
    yellow: 'bg-yellow-500 text-yellow-400 border-yellow-500/20',
    orange: 'bg-orange-500 text-orange-400 border-orange-500/20',
    red: 'bg-red-500 text-red-400 border-red-500/20',
  };
  return (
    <div className="flex items-center gap-4 group">
      <div className={`px-4 py-1 rounded-full border bg-opacity-10 text-xs font-black uppercase tracking-widest min-w-[100px] text-center ${colors[color]}`}>
        {label}
      </div>
      <p className="text-slate-500 text-sm font-medium">{desc}</p>
    </div>
  );
};

const TipItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
    <p className="text-slate-400 text-sm leading-relaxed font-medium">{text}</p>
  </div>
);

const UserLabel: React.FC<{ text: string }> = ({ text }) => (
  <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
    <span className="text-slate-300 font-bold text-sm">{text}</span>
  </div>
);
