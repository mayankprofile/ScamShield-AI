
import React, { useState, useRef, useEffect } from 'react';
import { X, User, Phone, Mail, FileText, Send, CheckCircle, ChevronDown, Search } from 'lucide-react';
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

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: TranslationKey) => string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, t }) => {
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

  if (!isOpen) return null;

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
      const fullPhoneNumber = `${selectedCountry.dialCode} ${formData.phone}`;
      console.log('Submitting Contact Form:', { ...formData, phone: fullPhoneNumber });
      // Simulate API call
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        onClose();
      }, 3000);
    }
  };

  const filteredCountries = COUNTRY_CODES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.dialCode.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative bg-slate-900 border border-slate-800 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          {isSubmitted ? (
            <div className="py-12 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Message Sent!</h3>
              <p className="text-slate-400 font-medium">{t('contact_success')}</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">{t('contact_title')}</h2>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {t('contact_sub')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder={t('contact_name')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-slate-950 border ${errors.name ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className={`h-full flex items-center gap-2 px-3 bg-slate-950 border ${errors.phone ? 'border-red-500/50' : 'border-slate-800'} rounded-xl text-slate-200 hover:bg-slate-900 transition-all outline-none min-w-[90px]`}
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
                        <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                          <div className="p-2 sticky top-0 bg-slate-900 border-b border-slate-800 z-10">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                              <input 
                                type="text"
                                placeholder="Search country..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-1.5 pl-9 pr-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>
                          <div className="py-1">
                            {filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsCountryDropdownOpen(false);
                                  setSearchQuery('');
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-600/10 transition-colors text-left"
                              >
                                <img 
                                  src={`https://flagcdn.com/w40/${country.flag}.png`} 
                                  alt="" 
                                  className="w-5 h-3.5 object-cover rounded-sm border border-slate-800"
                                />
                                <span className="text-sm font-medium text-slate-300 flex-grow">{country.name}</span>
                                <span className="text-xs font-bold text-slate-500">{country.dialCode}</span>
                              </button>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="p-4 text-center text-xs text-slate-600">No country found</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Number Input */}
                    <div className="relative flex-grow">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        placeholder={t('contact_phone')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium`}
                      />
                    </div>
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      placeholder={t('contact_email')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder={t('contact_subject')}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full bg-slate-950 border ${errors.subject ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium`}
                    />
                  </div>
                  {errors.subject && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.subject}</p>}
                </div>

                <div className="space-y-1.5">
                  <textarea
                    placeholder={t('contact_message')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full h-32 bg-slate-950 border ${errors.message ? 'border-red-500/50' : 'border-slate-800'} rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium resize-none`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-grow flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    {t('contact_btn_send')}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-grow bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-2xl transition-all border border-slate-700 active:scale-95"
                  >
                    {t('contact_btn_cancel')}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};
