
import React, { useState } from 'react';
import { 
  Briefcase, 
  CircleDollarSign, 
  MessageSquare, 
  Bitcoin, 
  ShoppingBag, 
  CreditCard, 
  ChevronRight, 
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Search,
  X
} from 'lucide-react';
import { TranslationKey } from '../services/translations';

interface ScamType {
  id: string;
  icon: any;
  title: string;
  summary: string;
  whatIsIt: string;
  howItHappens: string[];
  warningSigns: string[];
  howToStaySafe: string[];
}

const SCAM_DATA: ScamType[] = [
  {
    id: 'job',
    icon: Briefcase,
    title: 'Job Scam',
    summary: 'Fake employment offers designed to steal money or data.',
    whatIsIt: 'Scammers post fake job listings or message victims directly offering high-paying roles for minimal work. The goal is often to collect a "registration fee" or steal identity documents.',
    howItHappens: [
      'Fake job offers sent via WhatsApp or Telegram',
      'Requests for upfront registration or equipment fees',
      'Unrealistic salaries for simple tasks (e.g., liking YouTube videos)',
      'Interviews conducted purely over text-based chat apps',
      'Requesting bank details for "payroll setup" before any contract is signed'
    ],
    warningSigns: [
      'Extremely high pay for low-skilled work',
      'Communication strictly through WhatsApp/Telegram',
      'Urgency to join and pay fees immediately',
      'Poor grammar in professional-looking emails',
      'Company domain name doesn\'t match official website'
    ],
    howToStaySafe: [
      'Never pay any fee to get a job',
      'Verify the recruiter on LinkedIn',
      'Check the official company career page',
      'Avoid sharing identity documents early in the process',
      'Trust your gut: If it sounds too good to be true, it probably is'
    ]
  },
  {
    id: 'loan',
    icon: CircleDollarSign,
    title: 'Loan Scam',
    summary: 'Immediate loan offers with "no credit check" requirements.',
    whatIsIt: 'Victims receive messages promising instant, low-interest loans. Once interested, they are asked for a "processing fee" or "insurance" to release the funds.',
    howItHappens: [
      'Unsolicited SMS or social media ads for easy loans',
      'Offers of loans to those with "zero credit history"',
      'Asking for a small percentage of the loan as an upfront fee',
      'Fake loan approval certificates sent as PDF',
      'Requests to download unknown APK/apps for "verification"'
    ],
    warningSigns: [
      'Guarantee of approval without a background check',
      'Asking for "security deposit" or "processing fee" first',
      'Interest rates that are far below market standards',
      'Lender uses a Gmail/Yahoo email instead of professional domain',
      'Sudden change in terms after you show interest'
    ],
    howToStaySafe: [
      'Only take loans from RBI-registered banks or NBFCs',
      'Never pay "file charges" or "GST" before receiving the loan',
      'Don\'t download unofficial loan apps from links',
      'Check the lender\'s physical address and website credibility',
      'Legitimate lenders deduct fees from the loan amount, not upfront'
    ]
  },
  {
    id: 'whatsapp',
    icon: MessageSquare,
    title: 'WhatsApp Scam',
    summary: 'Impersonation of friends or family in distress.',
    whatIsIt: 'Commonly known as the "Hi Mum/Dad" scam. Scammers pretend to be a loved one who has lost their phone and urgently needs money for an emergency.',
    howItHappens: [
      'Message from an unknown number: "Hi, I lost my phone, this is my new one"',
      'Sudden request for money to pay an urgent bill',
      'Emotional manipulation (e.g., "I\'m stuck at the airport")',
      'Voice note cloning using AI or excuse of "mic is broken"',
      'Redirecting you to a third-party payment link'
    ],
    warningSigns: [
      'Sudden contact from a new number claiming to be family',
      'Unusually high sense of urgency and panic',
      'Avoiding voice/video calls when requested',
      'Requesting payment to a bank account with a different name',
      'Poor spelling or different tone of voice'
    ],
    howToStaySafe: [
      'Call the person on their "old" known number first',
      'Ask a personal question only the real person would know',
      'Never transfer money based on a text message alone',
      'Report and block the number immediately on WhatsApp',
      'Set up Two-Step Verification on your own account'
    ]
  },
  {
    id: 'crypto',
    icon: Bitcoin,
    title: 'Crypto Scam',
    summary: 'Guaranteed high returns on "expert" crypto investments.',
    whatIsIt: 'Scammers promise to double your Bitcoin or use "AI bots" to trade for you. Once you send your crypto to their "wallet," it disappears forever.',
    howItHappens: [
      'Social media influencers promoting "get rich quick" schemes',
      'Fake investment dashboards showing massive profits',
      'Celebrity-endorsed "giveaways" on YouTube/Twitter',
      'Requests to send funds to a "liquidity pool"',
      'Fake exchange platforms that won\'t let you withdraw'
    ],
    warningSigns: [
      'Promise of "guaranteed" daily or weekly returns',
      'High pressure to "invest now" before a price surge',
      'You are asked to pay "withdrawal tax" to get your profits',
      'Vague technical jargon used to sound legitimate',
      'No mention of the risks associated with crypto'
    ],
    howToStaySafe: [
      'Use only well-known, regulated exchanges',
      'Research any "new" coin or platform on independent forums',
      'Never share your private keys or seed phrase',
      'Ignore celebrity giveaways; they are almost always fake',
      'If you don\'t understand it, don\'t invest in it'
    ]
  },
  {
    id: 'marketplace',
    icon: ShoppingBag,
    title: 'OLX / Marketplace Scam',
    summary: 'Advance payment or QR code fraud during online sales.',
    whatIsIt: 'Occurs on platforms like OLX or Facebook Marketplace. A "buyer" sends you a QR code to "receive payment," which actually debits your account.',
    howItHappens: [
      'Buyer shows extreme interest without negotiating price',
      'Buyer claims they are out of town and will pay via UPI',
      'Sending a QR code and asking the seller to "Scan to Receive"',
      'Sending a fake "Payment Success" screenshot',
      'Asking for a "security deposit" to hold an item for you'
    ],
    warningSigns: [
      'Buyer insists on using QR codes for payments',
      'Buyer asks you to click "Pay" to receive money (Common trick)',
      'Profile of the buyer looks new or lacks detail',
      'Refusal to meet in person for the transaction',
      'Sense of rush during the payment process'
    ],
    howToStaySafe: [
      'Never scan a QR code to *receive* money (QR is for paying)',
      'Meet in a public place for hand-to-hand transactions',
      'Verify payment in your own banking app, not by screenshots',
      'Be wary of buyers who ask for your WhatsApp number immediately',
      'Don\'t pay any "booking fee" for an item you haven\'t seen'
    ]
  },
  {
    id: 'payment',
    icon: CreditCard,
    title: 'Fake Payment Link Scam',
    summary: 'Malicious links disguised as bank or utility alerts.',
    whatIsIt: 'Phishing links sent via SMS/Email claiming your bank account is blocked, electricity will be cut, or you have a tax refund waiting.',
    howItHappens: [
      'SMS alerts about "Account Suspended - Update KYC Now"',
      'Electricity board alerts about unpaid bills at night',
      'Fake lottery or reward points redemption links',
      'Couriers claiming "Address update needed" for a parcel',
      'Income Tax department "Refund" notifications'
    ],
    warningSigns: [
      'Sense of extreme urgency or fear (e.g., "Cutoff in 1 hour")',
      'The link uses an unusual domain (e.g., bit.ly or bank-kyc.net)',
      'Sender number is a regular mobile number, not a brand ID',
      'Generic greetings like "Dear Customer" instead of your name',
      'Requesting sensitive info like OTP or CVV on a website'
    ],
    howToStaySafe: [
      'Never click on links from unsolicited SMS or emails',
      'Always log in via the official app or website directly',
      'Check the URL: Legitimate sites use HTTPS and official domains',
      'Report the SMS to your service provider or "Chakshu" portal',
      'Remember: Banks never ask for OTP or PIN over text or call'
    ]
  }
];

interface ScamLibraryProps {
  onStartScan: (id: string) => void;
  // Added t prop to match usage in App.tsx
  t: (key: TranslationKey) => string;
}

export const ScamLibrary: React.FC<ScamLibraryProps> = ({ onStartScan, t }) => {
  const [selectedScam, setSelectedScam] = useState<ScamType | null>(null);

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {selectedScam ? (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Breadcrumb / Back */}
            <button 
              onClick={() => setSelectedScam(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Library
            </button>

            {/* Detailed Content */}
            <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
              <div className="p-8 md:p-12 bg-gradient-to-br from-blue-600/10 to-transparent border-b border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-[24px] flex items-center justify-center shadow-xl shadow-blue-500/20">
                    <selectedScam.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">{selectedScam.title}</h1>
                    <p className="text-slate-400 text-lg max-w-2xl">{selectedScam.summary}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-12">
                {/* Section 1 */}
                <section>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Search className="w-5 h-5 text-blue-400" />
                    What Is This Scam?
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-lg bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                    {selectedScam.whatIsIt}
                  </p>
                </section>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Section 2 */}
                  <section>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      How It Happens
                    </h2>
                    <ul className="space-y-4">
                      {selectedScam.howItHappens.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 bg-slate-950/30 rounded-xl border border-slate-800/30 group">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-[10px] font-bold text-slate-500 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                            {i + 1}
                          </span>
                          <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Section 3 */}
                  <section>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-red-500" />
                      Warning Signs
                    </h2>
                    <ul className="space-y-4">
                      {selectedScam.warningSigns.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-400">
                          <X className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Section 4 */}
                <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-emerald-400" />
                    How to Stay Safe
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedScam.howToStaySafe.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/10">
                        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span className="text-slate-200 text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 5: CTA */}
                <div className="pt-8 text-center border-t border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-4">Received a suspicious message recently?</h3>
                  <button 
                    onClick={() => onStartScan('scanner')}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-2 mx-auto outline-none"
                  >
                    Scan a Message Now <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                Scam Types <span className="text-blue-500">Library</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Learn how common scams work and how you can protect yourself and your loved ones from digital fraud.
              </p>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SCAM_DATA.map((scam) => (
                <button
                  key={scam.id}
                  onClick={() => {
                    setSelectedScam(scam);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-[32px] hover:border-blue-500/30 transition-all group text-left relative overflow-hidden outline-none"
                >
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 group-hover:bg-blue-600 transition-colors relative z-10 shadow-lg">
                    <scam.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors relative z-10">{scam.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 relative z-10">{scam.summary}</p>
                  
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest relative z-10 group-hover:gap-4 transition-all">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Help Card */}
            <div className="mt-20 p-8 md:p-12 bg-slate-900 border border-slate-800 rounded-[32px] text-center max-w-4xl mx-auto">
               <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-blue-500" />
               </div>
               <h2 className="text-2xl font-black text-white mb-4">Knowledge is Your Best Defense</h2>
               <p className="text-slate-400 text-lg mb-8">
                 Scammers rely on ignorance and fear. By reading about these tactics, you've already made your digital life significantly safer. 
                 Share this library with your friends and family to build a safer internet together.
               </p>
               <button 
                 onClick={() => onStartScan('scanner')}
                 className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 outline-none"
               >
                 Back to Main Tool
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
