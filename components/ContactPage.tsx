
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Send, 
  CheckCircle, 
  ChevronDown, 
  Search, 
  Globe, 
  ChevronLeft, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  Clock,
  BookOpen,
  Library
} from 'lucide-react';
import { TranslationKey } from '../services/translations';

interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const COUNTRY_CODES: CountryCode[] = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: 'in' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: 'us' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: 'gb' },
  { code: 'AE', name: 'UAE', dialCode: '+971', flag: 'ae' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: 'au' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: 'ca' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: 'sa' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: 'sg' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: 'de' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: 'fr' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: 'jp' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: 'cn' },
].sort((a, b) => a.name.localeCompare(b.name));

interface ContactPageProps {
  onBack: () => void;
  onNavigate: (view: any) => void;
  t: (key: TranslationKey) => string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack, onNavigate, t }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRY_CODES.find(c => c.code === 'IN') || COUNTRY_CODES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('err_required');
    if (!formData.phone.trim()) {
      newErrors.phone = t('err_required');
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = t('err_invalid_phone');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('err_required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('err_invalid_email');
    }
    if (!formData.subject.trim()) newErrors.subject = t('err_required');
    if (!formData.message.trim()) newErrors.message = t('err_required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      }, 5000);
    }
  };

  const filteredCountries = COUNTRY_CODES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.dialCode.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group outline-none"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('btn_back_home')}
        </button>

        {/* Section 1: Header Area */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Contact Us</h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or need help? Get in touch with our support team for help, feedback, or business inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Section 2: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/50 border border-slate-800 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full -z-10" />
              
              {isSubmitted ? (
                <div className="py-12 text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-emerald-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Message Sent!</h3>
                  <p className="text-slate-400 font-medium">Thank you! Our team will contact you soon.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-blue-400 font-bold hover:underline text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-slate-950 border ${errors.name ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-4 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                    <div className="flex gap-3">
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                          className="h-full flex items-center gap-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 hover:bg-slate-900 transition-all outline-none min-w-[100px]"
                        >
                          <img 
                            src={`https://flagcdn.com/w40/${selectedCountry.flag}.png`} 
                            alt="" 
                            className="w-5 h-3.5 object-cover rounded-sm border border-slate-800"
                          />
                          <span className="text-sm font-bold">{selectedCountry.dialCode}</span>
                          <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isCountryDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 py-1">
                            <div className="p-2 border-b border-slate-800">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                <input 
                                  type="text"
                                  placeholder="Search..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 pl-9 pr-3 text-xs text-slate-200 focus:outline-none"
                                />
                              </div>
                            </div>
                            {filteredCountries.map(c => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => { setSelectedCountry(c); setIsCountryDropdownOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-600/10 text-left transition-colors"
                              >
                                <img src={`https://flagcdn.com/w40/${c.flag}.png`} alt="" className="w-5 h-3.5 rounded-sm" />
                                <span className="text-sm font-medium text-slate-300 flex-grow">{c.name}</span>
                                <span className="text-xs font-bold text-slate-500">{c.dialCode}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative flex-grow">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                          className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-4 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium`}
                        />
                      </div>
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-4 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium`}
                      />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.email}</p>}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Enter subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full bg-slate-950 border ${errors.subject ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-4 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium`}
                      />
                    </div>
                    {errors.subject && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                    <textarea
                      placeholder="Write your message here..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full bg-slate-950 border ${errors.message ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-4 px-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium resize-none`}
                    />
                    {errors.message && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 outline-none"
                  >
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Section 3: Contact Information Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-[32px] p-8 md:p-10 shadow-xl space-y-8 h-fit">
              <h2 className="text-2xl font-black text-white tracking-tight">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shrink-0">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Support Email</div>
                    <a href="mailto:support@scamguard.in" className="text-lg font-bold text-slate-200 hover:text-blue-400 transition-colors">support@scamguard.in</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 shrink-0">
                    <Globe className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Website</div>
                    <div className="text-lg font-bold text-slate-200">scamguard.in</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Response Time</div>
                    <div className="text-lg font-bold text-slate-200">We usually respond within 24 hours.</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl">
                <p className="text-sm text-slate-400 font-medium italic">
                  "Our goal is to create a scam-free digital environment. Your feedback helps us improve our detection AI every day."
                </p>
              </div>
            </div>

            {/* Section 4: Help Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 ml-4">Explore our help resources</h3>
              <div className="grid grid-cols-2 gap-4">
                <QuickLinkCard icon={BookOpen} label="Safety Guide" onClick={() => onNavigate('safety')} />
                <QuickLinkCard icon={Library} label="Scam Library" onClick={() => onNavigate('library')} />
                <QuickLinkCard icon={HelpCircle} label="How to Use" onClick={() => onNavigate('how-to-use')} />
                <QuickLinkCard icon={Search} label="Start Scan" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate('home'); setTimeout(() => document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' }), 100); }} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Bottom CTA Strip */}
        <div className="mt-24">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-10 md:p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl -z-10" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-6">Need immediate help detecting a scam?</h2>
              <button 
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigate('home'); setTimeout(() => document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                className="px-10 py-4 bg-white text-blue-600 font-black text-lg rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3 mx-auto"
              >
                Scan a Message Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickLinkCard: React.FC<{ icon: any; label: string; onClick: () => void }> = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 hover:border-blue-500/30 transition-all text-left outline-none group"
  >
    <Icon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
    <span className="text-sm font-bold text-slate-300">{label}</span>
  </button>
);
