
import React from 'react';
import { FileText, ChevronLeft, Shield, Scale, Info } from 'lucide-react';
import { TranslationKey } from '../services/translations';

interface TermsConditionsProps {
  onBack: () => void;
  t: (key: TranslationKey) => string;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack, t }) => {
  return (
    <div className="max-w-4xl mx-auto pt-24 pb-20 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group outline-none"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        {t('btn_back_home')}
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">{t('nav_terms')}</h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Version 1.1 • Effective: Feb 2025</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">1</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using ScamGuard ("the Service"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must immediately stop using the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">2</span>
              Description of Service
            </h2>
            <p>
              ScamGuard provides an AI-powered detection tool to help users identify potential scams in text messages, emails, and screenshots. The analysis is based on patterns and indicators known to be associated with fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">3</span>
              Disclaimer of Liability
            </h2>
            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-black text-sm uppercase tracking-widest">
                <Shield className="w-4 h-4" /> Crucial Information
              </div>
              <p className="text-sm font-medium leading-relaxed">
                ScamGuard is an advisory tool and does not guarantee 100% accuracy. Scam detection is probabilistic. You should not rely solely on the Service for financial or security decisions. We are not liable for any financial loss, data breach, or damages resulting from the use or misuse of the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">4</span>
              User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users are responsible for the content they upload or paste.</li>
              <li>Do not submit highly sensitive personal data (e.g., full credit card numbers, bank passwords).</li>
              <li>You agree to use the Service only for lawful purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">5</span>
              Modifications to Service
            </h2>
            <p>
              We reserve the right to modify or discontinue the Service at any time without notice. We may also update these Terms periodically.
            </p>
          </section>

          <section className="pt-8 border-t border-slate-800">
            <p className="text-sm text-slate-500 text-center font-medium">
              Last Revision: February 2025 • © ScamGuard AI
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
