
import React from 'react';
import { Shield, ChevronLeft, Mail } from 'lucide-react';
import { TranslationKey } from '../services/translations';

interface PrivacyPolicyProps {
  onBack: () => void;
  // Added t prop to match usage in App.tsx
  t: (key: TranslationKey) => string;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack, t }) => {
  return (
    <div className="max-w-4xl mx-auto pt-24 pb-20 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">PRIVACY POLICY</h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Last Updated: 12 Feb</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
          <p className="text-lg leading-relaxed text-slate-200">
            Welcome to ScamGuard. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
          </p>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">1</span>
              Information We Collect
            </h2>
            <p className="mb-4">We may collect the following types of information when you use our website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Text Content:</strong> Messages, emails, links, or content that you paste into the scam detection tool.</li>
              <li><strong>Uploaded Images:</strong> Screenshots or images submitted for analysis.</li>
              <li><strong>Basic Usage Data:</strong> Device type, browser type, pages visited, and interaction data to improve performance.</li>
              <li><strong>Voluntary Information:</strong> Any details you choose to share through contact forms or feedback.</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500 italic">We do not require users to create an account to use the basic scam detection feature.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">2</span>
              How We Use Your Information
            </h2>
            <p className="mb-4">We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To analyze and detect potential scam messages using AI</li>
              <li>To improve our detection accuracy and service performance</li>
              <li>To maintain website security and prevent misuse</li>
              <li>To enhance user experience and feature functionality</li>
            </ul>
            <p className="mt-4">We do not sell, rent, or trade your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">3</span>
              Data Processing & AI Analysis
            </h2>
            <p className="mb-4">When you paste text or upload a screenshot:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The content is processed by AI systems to generate a scam probability score.</li>
              <li>The analysis is automated and used only for detection purposes.</li>
              <li>We do not intentionally store or review personal content unless required for security or improvement.</li>
            </ul>
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              <strong>Important Notice:</strong> Users are advised not to upload sensitive personal data such as bank passwords, OTPs, or confidential documents.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">4</span>
              Data Storage & Security
            </h2>
            <p className="mb-4">We implement appropriate technical and security measures to protect your information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Secure servers and encrypted data transmission</li>
              <li>Limited access to internal data</li>
              <li>Regular monitoring to prevent unauthorized access</li>
            </ul>
            <p className="mt-4">We strive to keep your data safe but cannot guarantee absolute security over the internet.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">5</span>
              Third-Party Services
            </h2>
            <p>Our website may use trusted third-party tools or AI platforms to process data and improve performance. These services may collect limited technical data as part of their operation. We are not responsible for the privacy practices of third-party platforms linked from our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">6</span>
              Cookies & Tracking
            </h2>
            <p className="mb-4">We may use cookies or similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improve website performance</li>
              <li>Understand user behavior</li>
              <li>Enhance user experience</li>
            </ul>
            <p className="mt-4">You can disable cookies through your browser settings if you prefer.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">7</span>
              Children’s Privacy
            </h2>
            <p>Our services are intended for users aged 18 and above. We do not knowingly collect personal data from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">8</span>
              Your Responsibility
            </h2>
            <p>Users are responsible for the content they submit for analysis. Please avoid uploading highly sensitive personal, financial, or confidential information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-sm font-mono text-blue-400">9</span>
              Changes to This Policy
            </h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
          </section>

          <section className="pt-8 border-t border-slate-800">
            <h2 className="text-xl font-bold text-white mb-6">10. Contact Us</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Website</div>
                  <div className="text-slate-200 font-bold">scamguard.in</div>
                </div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Email</div>
                  <a href="mailto:support@scamguard.in" className="text-slate-200 font-bold hover:text-blue-400 transition-colors">support@scamguard.in</a>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm text-slate-500 text-center">
              By using ScamGuard, you agree to the terms of this Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

// Lucide icon helper
const Globe = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"/>
  </svg>
);
