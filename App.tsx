import React, { useState, useEffect, useRef } from 'react';
import { Scanner } from './components/Scanner';
import { ResultDisplay } from './components/ResultDisplay';
import { History } from './components/History';
import { ScanningView } from './components/ScanningView';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { ContactModal } from './components/ContactModal';
import { HomeContact } from './components/HomeContact';
import { FAQ } from './components/FAQ';
import { TrustCounter } from './components/TrustCounter';
import { ScamLibrary } from './components/ScamLibrary';
import { SafetyGuide } from './components/SafetyGuide';
import { HowToUse } from './components/HowToUse';
import { InvoiceDetector } from './components/InvoiceDetector';
import { LanguageSelector } from './components/LanguageSelector';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { ScamAnalysis, HistoryItem, User, PlanType } from './types';
import { analyzeContent } from './services/geminiService';
import { translations, TranslationKey } from './services/translations';
import { 
  Shield, 
  Lock, 
  ChevronRight, 
  X, 
  FileText, 
  Languages, 
  Mail, 
  MessageSquare, 
  Briefcase, 
  CreditCard, 
  AlertCircle, 
  HelpCircle, 
  Home, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown,
  Menu,
  Search,
  BookOpen,
  Library,
  UserPlus,
  LogIn,
  History as HistoryIcon,
  ShieldCheck,
  Phone,
  Coffee
} from 'lucide-react';

type View = 'home' | 'privacy' | 'terms' | 'library' | 'safety' | 'invoice-detector' | 'how-to-use' | 'login' | 'signup' | 'dashboard' | 'profile';

const SUPPORTED_LANGS = [
  { name: 'Arabic', code: 'sa', langCode: 'ar' },
  { name: 'Bengali', code: 'in', langCode: 'bn' },
  { name: 'Chinese', code: 'cn', langCode: 'zh' },
  { name: 'English', code: 'us', langCode: 'en' },
  { name: 'French', code: 'fr', langCode: 'fr' },
  { name: 'German', code: 'de', langCode: 'de' },
  { code: 'gu', name: 'Gujarati', countryCode: 'in' },
  { name: 'Hindi', code: 'in', langCode: 'hi' },
  { name: 'Indonesian', code: 'id', langCode: 'id' },
  { name: 'Japanese', code: 'jp', langCode: 'ja' },
  { name: 'Kannada', code: 'in', langCode: 'kn' },
  { code: 'ml', name: 'Malayalam', countryCode: 'in' },
  { name: 'Marathi', code: 'in', langCode: 'mr' },
  { name: 'Portuguese', code: 'pt', langCode: 'pt' },
  { name: 'Punjabi', code: 'in', langCode: 'pa' },
  { name: 'Russian', code: 'ru', langCode: 'ru' },
  { name: 'Spanish', code: 'es', langCode: 'es' },
  { name: 'Tamil', code: 'in', langCode: 'ta' },
  { name: 'Telugu', code: 'in', langCode: 'te' },
  { name: 'Turkish', code: 'tr', langCode: 'tr' },
].sort((a, b) => a.name.localeCompare(b.name));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('scam_guard_lang') || 'en';
  });

  useEffect(() => {
    const saved = localStorage.getItem('scam_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history");
      }
    }

    const savedUser = localStorage.getItem('scam_guard_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close drawer when view changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [currentView]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDrawerOpen]);

  const handleLanguageChange = (code: string) => {
    setIsTranslating(true);
    let finalCode = code;
    if (code === 'auto') {
      const browserLang = navigator.language.split('-')[0];
      finalCode = translations[browserLang] ? browserLang : 'en';
    }
    
    setTimeout(() => {
      setLanguage(finalCode);
      localStorage.setItem('scam_guard_lang', code);
      setIsTranslating(false);
    }, 800);
  };

  const t = (key: TranslationKey): string => {
    const langData = translations[language] || translations['en'];
    return langData[key] || translations['en'][key];
  };

  const handleAnalyze = async (text: string, image: string | null) => {
    setLoading(true);
    setAnalysis(null);
    setError(null);
    setCurrentView('home');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const result = await analyzeContent(text, image || undefined);
      
      const scanType = image ? 'Screenshot' : 'Text';
      const enrichedResult = { ...result, type: scanType as any };
      setAnalysis(enrichedResult);
      
      const newHistoryItem: HistoryItem = {
        id: result.id,
        timestamp: result.timestamp,
        scamScore: result.scamScore,
        riskLevel: result.riskLevel,
        type: scanType as any,
      };
      
      const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('scam_history', JSON.stringify(updatedHistory));
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('scam_guard_user');
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    setIsDrawerOpen(false);
    setCurrentView('home');
    setShowToast("Logged out successfully");
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('scam_guard_user', JSON.stringify(updatedUser));
    setShowToast("Profile updated successfully");
  };

  const navigateToHome = () => {
    setCurrentView('home');
    setAnalysis(null);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setCurrentView('home');
    setAnalysis(null);
    setIsDrawerOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const changeView = (view: View) => {
    setCurrentView(view);
    setAnalysis(null);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        t={t} 
      />

      {isTranslating && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Languages className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
          </div>
          <p className="text-xl font-black text-white tracking-tight animate-pulse">{t('translating_overlay')}</p>
        </div>
      )}

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          {/* LEFT: Logo */}
          <button onClick={navigateToHome} className="flex items-center gap-2 group outline-none shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white uppercase">SCAM<span className="text-blue-500">GUARD</span></span>
          </button>
          
          {/* CENTER: Desktop Navigation Items */}
          <div className="hidden lg:flex items-center justify-center gap-2 xl:gap-6 flex-grow mx-4 overflow-hidden">
            <button onClick={navigateToHome} className={`px-3 py-2 text-sm font-bold transition-all rounded-lg whitespace-nowrap hover:text-white ${currentView === 'home' && !analysis ? 'text-white bg-blue-600/10' : 'text-slate-400'}`}>Home</button>
            <button onClick={() => scrollToSection('scanner')} className={`px-3 py-2 text-sm font-bold transition-all rounded-lg whitespace-nowrap text-slate-400 hover:text-white`}>Scan</button>
            <button onClick={() => changeView('invoice-detector')} className={`px-3 py-2 text-sm font-bold transition-all rounded-lg whitespace-nowrap hover:text-white ${currentView === 'invoice-detector' ? 'text-white bg-blue-600/10' : 'text-slate-400'}`}>Invoice Detector</button>
          </div>
          
          {/* RIGHT SIDE: Language Selector & User Profile & Side Menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden lg:block">
              <LanguageSelector currentLang={language} onLanguageChange={handleLanguageChange} />
            </div>
            
            {/* Desktop Profile Dropdown */}
            <div className="hidden lg:block relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 transition-all outline-none group"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 transition-colors overflow-hidden">
                  {currentUser ? (
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <UserIcon className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-500 mr-2 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-[60] animate-in fade-in zoom-in-95 duration-200">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 mb-1 border-b border-slate-800/50">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logged in as</div>
                        <div className="text-sm font-bold text-white truncate">{currentUser.name}</div>
                      </div>
                      <button onClick={() => { changeView('dashboard'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-blue-600/10 text-slate-300 hover:text-white transition-colors flex items-center gap-3">
                        <LayoutDashboard className="w-4 h-4 text-blue-400" /> My Dashboard
                      </button>
                      <button onClick={() => { changeView('profile'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-blue-600/10 text-slate-300 hover:text-white transition-colors flex items-center gap-3">
                        <UserIcon className="w-4 h-4 text-blue-400" /> Edit Profile
                      </button>
                      <button onClick={() => { changeView('dashboard'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-blue-600/10 text-slate-300 hover:text-white transition-colors flex items-center gap-3">
                        <HistoryIcon className="w-4 h-4 text-blue-400" /> Scan History
                      </button>
                      <div className="h-px bg-slate-800 my-2 mx-2" />
                      <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-red-600/10 text-red-400 hover:text-red-300 transition-colors flex items-center gap-3">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { changeView('login'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-blue-600/10 text-slate-300 hover:text-white transition-colors flex items-center gap-3 font-bold">
                        <LogIn className="w-4 h-4 text-blue-400" /> Login
                      </button>
                      <button onClick={() => { changeView('signup'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-blue-600/10 text-slate-300 hover:text-white transition-colors flex items-center gap-3 font-bold">
                        <UserPlus className="w-4 h-4 text-blue-400" /> Register / Sign Up
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Menu Icon (☰) */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      {currentView === 'privacy' ? (
        <PrivacyPolicy onBack={navigateToHome} t={t} />
      ) : currentView === 'terms' ? (
        <TermsConditions onBack={navigateToHome} t={t} />
      ) : currentView === 'library' ? (
        <ScamLibrary onStartScan={scrollToSection} t={t} />
      ) : currentView === 'safety' ? (
        <SafetyGuide onStartScan={scrollToSection} t={t} />
      ) : currentView === 'invoice-detector' ? (
        <InvoiceDetector t={t} />
      ) : currentView === 'how-to-use' ? (
        <HowToUse onBack={navigateToHome} t={t} onContactClick={() => scrollToSection('contact-section')} onNavigate={(v) => setCurrentView(v as View)} />
      ) : currentView === 'login' ? (
        <Login onBack={navigateToHome} onSignupClick={() => setCurrentView('signup')} onLoginSuccess={(user) => { setCurrentUser(user); setCurrentView('dashboard'); setShowToast("Welcome back!"); }} />
      ) : currentView === 'signup' ? (
        <Signup onBack={navigateToHome} onLoginClick={() => setCurrentView('login')} onSignupSuccess={(user) => { setCurrentUser(user); setCurrentView('dashboard'); setShowToast("Account created successfully!"); }} />
      ) : currentView === 'dashboard' ? (
        <Dashboard user={currentUser} history={history} onEditProfile={() => setCurrentView('profile')} onNewScan={() => scrollToSection('scanner')} />
      ) : currentView === 'profile' ? (
        <Profile user={currentUser} onBack={() => setCurrentView('dashboard')} onUpdate={handleUpdateProfile} />
      ) : (
        <>
          {!analysis && !loading && (
            <>
              <section className="pt-32 pb-20 px-6 relative overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
                <div className="max-w-5xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Lock className="w-3 h-3" /> {t('hero_badge')}
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                    {t('hero_title_1')} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{t('hero_title_2')}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {t('hero_desc')}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={() => scrollToSection('scanner')} className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">{t('btn_scan_now')} <ChevronRight className="w-5 h-5" /></button>
                    <button onClick={() => changeView('invoice-detector')} className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-black text-lg rounded-2xl transition-all flex items-center justify-center gap-2"><FileText className="w-5 h-5 text-blue-400" />{t('nav_invoice')}</button>
                  </div>
                </div>
              </section>
              <TrustCounter t={t} />
            </>
          )}

          <main className={`px-6 pb-20 ${analysis || loading ? 'pt-24' : ''}`}>
            {loading ? (
              <ScanningView />
            ) : analysis ? (
              <ResultDisplay analysis={analysis} onReset={() => setAnalysis(null)} />
            ) : (
              <>
                <Scanner onAnalyze={handleAnalyze} loading={loading} currentLanguage={language} />
                <section className="max-w-7xl mx-auto mt-24 text-center">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">{t('lang_support_title')}</h2>
                  <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">{t('lang_support_desc')}</p>
                  <div className="bg-slate-900/30 border border-slate-800 rounded-[40px] p-8 md:p-12">
                    <div className="flex flex-wrap justify-center gap-4">
                      {SUPPORTED_LANGS.map(lang => (
                        <button 
                          key={lang.langCode || lang.code} 
                          onClick={() => handleLanguageChange(lang.langCode || lang.code)}
                          className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-all active:scale-95 outline-none group ${
                            language === (lang.langCode || lang.code) 
                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-slate-900'
                          }`}
                        >
                          <img src={`https://flagcdn.com/w40/${lang.countryCode || lang.code}.png`} alt="" className="w-5 h-3.5 object-cover rounded-sm border border-slate-800 group-hover:scale-110 transition-transform" />
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {error && (
                  <div className="max-w-4xl mx-auto mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 animate-in fade-in zoom-in-95">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}
                <History items={history} onSelect={() => scrollToSection('scanner')} />
              </>
            )}

            {!analysis && !loading && (
              <>
                <section id="features" className="max-w-7xl mx-auto mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-mt-24">
                  <FeatureCard icon={Mail} title={t('features_phishing_title')} desc={t('features_phishing_desc')} />
                  <FeatureCard icon={MessageSquare} title={t('features_whatsapp_title')} desc={t('features_whatsapp_desc')} />
                  <FeatureCard icon={Briefcase} title={t('features_job_title')} desc={t('features_job_desc')} />
                  <FeatureCard icon={CreditCard} title={t('features_payment_title')} desc={t('features_payment_desc')} />
                </section>

                {/* Permanent Support Section for Home Page */}
                <section className="max-w-4xl mx-auto mt-24 px-6 animate-in fade-in duration-1000">
                  <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full -z-10" />
                    <div className="max-w-2xl mx-auto space-y-6">
                      <h3 className="text-2xl font-black text-white tracking-tight">Support ScamGuard</h3>
                      <p className="text-slate-400 font-medium leading-relaxed">
                        ScamGuard is free to use for everyone. If you found it helpful, you can support us by buying us a coffee. Your support helps us improve our AI and keep people safe from scams.
                      </p>
                      <div className="flex flex-col items-center gap-4">
                        <button
                          onClick={() => window.open('https://buymeacoffee.com/scamguard', '_blank')}
                          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-full shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 outline-none"
                        >
                          <Coffee className="w-5 h-5" /> Buy Me a Coffee
                        </button>
                        <button 
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="text-slate-500 hover:text-slate-300 font-bold text-sm transition-colors"
                        >
                          Maybe Later
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Full Contact Section on Homepage */}
                <HomeContact onNavigate={changeView} t={t} />

                <FAQ t={t} onContactClick={() => scrollToSection('contact-section')} />
              </>
            )}
          </main>
        </>
      )}

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <button onClick={navigateToHome} className="flex items-center gap-2 group uppercase font-bold text-slate-100 outline-none">
            <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center"><Shield className="w-4 h-4 text-slate-400 group-hover:text-blue-400" /></div>
            ScamGuard AI
          </button>
          <p className="text-slate-600 text-sm">{t('footer_copy')}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button onClick={() => changeView('privacy')} className="text-slate-500 hover:text-white transition-colors text-sm">{t('nav_privacy')}</button>
            <button onClick={() => changeView('terms')} className="text-slate-500 hover:text-white transition-colors text-sm">{t('nav_terms')}</button>
          </div>
        </div>
      </footer>

      {/* RIGHT SIDE DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden flex justify-end transition-all">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Slide Drawer Panel */}
          <div className="relative h-full w-[85%] max-w-[400px] bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 z-10">
            
            {/* Drawer Header Row */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-black text-lg tracking-tighter text-white uppercase">SCAM<span className="text-blue-500">GUARD</span></span>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Menu Content */}
            <div className="flex-grow overflow-y-auto px-4 py-6 space-y-8 pb-32">
              
              {/* User Identity Section */}
              {currentUser && (
                <div className="flex items-center gap-4 p-4 bg-blue-600/10 border border-blue-500/20 rounded-[24px] mx-2">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="text-sm font-black text-white truncate">{currentUser.name}</div>
                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{currentUser.plan} Active</div>
                  </div>
                </div>
              )}

              {/* Navigation Links List */}
              <div className="space-y-1">
                <div>
                  <MobileNavLink icon={<Home className="w-5 h-5" />} label="Home" onClick={navigateToHome} active={currentView === 'home'} />
                  <MobileNavLink icon={<Search className="w-5 h-5" />} label="Scan Content" onClick={() => scrollToSection('scanner')} />
                  <MobileNavLink icon={<FileText className="w-5 h-5" />} label="Invoice Detector" onClick={() => changeView('invoice-detector')} active={currentView === 'invoice-detector'} />
                  <MobileNavLink icon={<BookOpen className="w-5 h-5" />} label="Safety Guide" onClick={() => changeView('safety')} active={currentView === 'safety'} />
                  <MobileNavLink icon={<Library className="w-5 h-5" />} label="Scam Library" onClick={() => changeView('library')} active={currentView === 'library'} />
                  <MobileNavLink icon={<HelpCircle className="w-5 h-5" />} label="How to Use" onClick={() => changeView('how-to-use')} active={currentView === 'how-to-use'} />
                </div>
              </div>

              <div className="h-px bg-slate-800 mx-4" />

              {/* Account Actions Section */}
              <div className="space-y-1">
                {currentUser ? (
                  <>
                    <MobileNavLink icon={<LayoutDashboard className="w-5 h-5" />} label="My Dashboard" onClick={() => changeView('dashboard')} active={currentView === 'dashboard'} />
                    <MobileNavLink icon={<UserIcon className="w-5 h-5" />} label="Edit Profile" onClick={() => changeView('profile')} active={currentView === 'profile'} />
                    <MobileNavLink icon={<HistoryIcon className="w-5 h-5" />} label="Scan History" onClick={() => changeView('dashboard')} />
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 px-2 pt-2">
                    <button onClick={() => changeView('login')} className="flex items-center justify-center gap-2 py-4 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95">
                      <LogIn className="w-4 h-4" /> Login
                    </button>
                    <button onClick={() => changeView('signup')} className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-500 transition-all active:scale-95">
                      <UserPlus className="w-4 h-4" /> Sign Up
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-slate-900 space-y-6">
                <div className="lg:hidden flex justify-center px-4">
                  <LanguageSelector currentLang={language} onLanguageChange={handleLanguageChange} />
                </div>
                {currentUser && (
                  <button 
                    onClick={handleLogout}
                    className="mx-4 w-[calc(100%-32px)] py-4 bg-red-600/10 text-red-400 font-bold rounded-2xl border border-red-500/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                  >
                    <LogOut className="w-5 h-5" /> Logout Session
                  </button>
                )}
                <div className="text-center px-4">
                  <div className="flex justify-center gap-6">
                    <button onClick={() => changeView('privacy')} className="text-xs font-bold text-slate-600 hover:text-slate-400 transition-colors">Privacy</button>
                    <button onClick={() => changeView('terms')} className="text-xs font-bold text-slate-600 hover:text-slate-400 transition-colors">Terms</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-6 right-6 z-[120] bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-10">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold text-sm">{showToast}</span>
          <button onClick={() => setShowToast(null)} className="ml-2 hover:opacity-50"><X className="w-4 h-4" /></button>
        </div>
      )}
    </div>
  );
};

const MobileNavLink: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; active?: boolean }> = ({ icon, label, onClick, active }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left font-bold transition-all group ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
        : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
    }`}
  >
    <div className={`shrink-0 transition-colors ${active ? 'text-white' : 'text-blue-500 group-hover:text-blue-400'}`}>
      {icon}
    </div>
    <span className="text-sm">{label}</span>
  </button>
);

const FeatureCard: React.FC<{ icon: any, title: string, desc: string }> = ({ icon: Icon, title, desc }) => (
  <div className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-3xl hover:border-blue-500/30 transition-all group">
    <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 group-hover:bg-blue-600 transition-colors">
      <Icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;
