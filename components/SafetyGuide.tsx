
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  Zap, 
  Lock, 
  Smartphone, 
  AlertTriangle, 
  ChevronRight,
  HandMetal,
  UserCheck,
  Globe,
  Ban,
  MessageSquare,
  Link,
  Gift,
  Briefcase,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { TranslationKey } from '../services/translations';

interface SafetyGuideProps {
  onStartScan: (id: string) => void;
  t: (key: TranslationKey) => string;
}

export const SafetyGuide: React.FC<SafetyGuideProps> = ({ onStartScan, t }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'warning-signs', label: 'Warning Signs', icon: AlertTriangle },
    { id: 'safety-rules', label: 'Safety Rules', icon: ShieldCheck },
    { id: 'habits', label: 'Digital Habits', icon: Zap },
    { id: 'action-plan', label: 'Action Plan', icon: FileText },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-28 space-y-8">
              <div className="space-y-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Guide Navigator</h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                        activeSection === section.id 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`} />
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
                <ShieldAlert className="w-8 h-8 text-blue-500 mb-4" />
                <p className="text-xs font-bold text-slate-200 leading-relaxed mb-4">
                  Stay updated with the latest scam trends in our community library.
                </p>
                <button 
                  onClick={() => onStartScan('scanner')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-700 transition-all active:scale-95"
                >
                  Start Scan
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow space-y-24 lg:pb-32">
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-32">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  <ShieldCheck className="w-3 h-3" /> Security Intelligence
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                  Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Digital Defense</span>
                </h1>
                <div className="text-slate-400 text-lg leading-relaxed space-y-6 font-medium">
                  <p>
                    In an era where digital communication is our primary lifeline, scammers have evolved into sophisticated social engineers. They don't just hack systems; they hack human psychology.
                  </p>
                  <p>
                    This dedicated safety guide is your comprehensive manual for recognizing, avoiding, and neutralizing online threats before they can impact your life.
                  </p>
                </div>
              </div>
            </section>

            {/* Warning Signs Section */}
            <section id="warning-signs" className="scroll-mt-32">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-white mb-4">The Red Flags</h2>
                <p className="text-slate-500 font-medium">Spot these common patterns in fraudulent communications.</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <WarningCard 
                  icon={Zap}
                  title="Artificial Urgency" 
                  desc="Scammers create a 'crisis' that needs your immediate attention to stop you from thinking clearly."
                  color="blue"
                />
                <WarningCard 
                  icon={Lock}
                  title="Credential Harpooning" 
                  desc="Any request for OTP, passwords, or PINs—even if they claim to be from your bank—is a scam."
                  color="indigo"
                />
                <WarningCard 
                  icon={Link}
                  title="Shadow Links" 
                  desc="Mismatched URLs or shortened links that lead to fake login portals designed to steal your credentials."
                  color="purple"
                />
                <WarningCard 
                  icon={Briefcase}
                  title="Phantasm Jobs" 
                  desc="High-paying offers for zero-skill work. If the salary doesn't match the effort, it's a data trap."
                  color="pink"
                />
              </div>
            </section>

            {/* Safety Rules Section */}
            <section id="safety-rules" className="scroll-mt-32">
              <div className="bg-slate-900 border border-slate-800 rounded-[40px] overflow-hidden">
                <div className="p-8 md:p-12 bg-gradient-to-r from-blue-600/10 to-transparent border-b border-slate-800 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 shrink-0">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2">The Golden Rules of Defense</h2>
                    <p className="text-slate-400 font-medium">Core principles for every digital citizen.</p>
                  </div>
                </div>
                <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8">
                  <RuleItem text="Never authorize a payment you didn't initiate yourself." />
                  <RuleItem text="Treat unsolicited messages with extreme skepticism." />
                  <RuleItem text="Always verify identity through an independent channel." />
                  <RuleItem text="Keep your biometric data and OTPs strictly private." />
                  <RuleItem text="Use multi-factor authentication on every possible account." />
                  <RuleItem text="Trust your intuition: if it feels 'off', it usually is." />
                </div>
              </div>
            </section>

            {/* Habits Section */}
            <section id="habits" className="scroll-mt-32">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-white mb-4">Fortified Habits</h2>
                <p className="text-slate-500 font-medium">Build these into your daily digital routine.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <HabitCard 
                  icon={Lock} 
                  title="Password Vaulting" 
                  desc="Use a manager to create 20+ character unique passwords for every site."
                />
                <HabitCard 
                  icon={Globe} 
                  title="URL Auditing" 
                  desc="Hover over links to see the destination before clicking. Check for misspellings."
                />
                <HabitCard 
                  icon={Smartphone} 
                  title="Device Hardening" 
                  desc="Only download apps from official stores and keep your OS updated to the latest patch."
                />
              </div>
            </section>

            {/* Action Plan Section */}
            <section id="action-plan" className="scroll-mt-32">
              <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full" />
                <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  The Emergency Protocol
                </h2>
                <div className="space-y-8 relative z-10">
                  <ProtocolStep 
                    number="1" 
                    title="Sever Connection" 
                    desc="Immediately hang up the phone or close the chat window. Do not offer an explanation."
                  />
                  <ProtocolStep 
                    number="2" 
                    title="Freeze Accounts" 
                    desc="If you shared details, call your bank's official number from their website to block cards."
                  />
                  <ProtocolStep 
                    number="3" 
                    title="Capture Evidence" 
                    desc="Take screenshots of messages, transaction numbers, and profile details for reporting."
                  />
                  <ProtocolStep 
                    number="4" 
                    title="Formal Reporting" 
                    desc="File a report on your national cybercrime portal (e.g., cybercrime.gov.in in India)."
                  />
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="pt-12">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Uncertainty is the Scammer's Ally</h3>
                  <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
                    Knowledge is power, but verification is security. Use our AI tools to validate any suspicious communication instantly.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                      onClick={() => onStartScan('scanner')}
                      className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 font-black text-xl rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3"
                    >
                      Analyze Content Now <ChevronRight className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="w-full sm:w-auto px-10 py-5 bg-blue-500/20 text-white font-bold text-xl rounded-2xl border border-white/20 transition-all hover:bg-blue-500/30"
                    >
                      Back to Top
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

const WarningCard: React.FC<{ icon: any; title: string; desc: string; color: string }> = ({ icon: Icon, title, desc, color }) => {
  const colorMap: any = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    pink: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  };

  return (
    <div className="p-8 bg-slate-900 border border-slate-800 rounded-[32px] hover:border-blue-500/30 transition-all group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 ${colorMap[color]}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
};

const RuleItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-4 p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl group hover:border-blue-500/30 transition-all">
    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
    <span className="text-slate-300 font-bold text-sm leading-snug">{text}</span>
  </div>
);

const HabitCard: React.FC<{ icon: any; title: string; desc: string }> = ({ icon: Icon, title, desc }) => (
  <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[32px] text-center hover:bg-slate-900 transition-colors">
    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/10">
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
    <h3 className="text-white font-black text-lg mb-3">{title}</h3>
    <p className="text-slate-500 text-xs leading-relaxed font-medium">{desc}</p>
  </div>
);

const ProtocolStep: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="flex gap-8 group">
    <div className="text-5xl font-black text-slate-800 group-hover:text-emerald-500 transition-colors duration-500 tabular-nums">{number}</div>
    <div className="pt-2">
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);
