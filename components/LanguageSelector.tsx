
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface LanguageOption {
  code: string;
  name: string;
  countryCode: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'ar', name: 'Arabic', countryCode: 'sa' },
  { code: 'bn', name: 'Bengali', countryCode: 'in' },
  { code: 'zh', name: 'Chinese', countryCode: 'cn' },
  { code: 'en', name: 'English', countryCode: 'us' },
  { code: 'fr', name: 'French', countryCode: 'fr' },
  { code: 'de', name: 'German', countryCode: 'de' },
  { code: 'gu', name: 'Gujarati', countryCode: 'in' },
  { code: 'hi', name: 'Hindi', countryCode: 'in' },
  { code: 'id', name: 'Indonesian', countryCode: 'id' },
  { code: 'ja', name: 'Japanese', countryCode: 'jp' },
  { code: 'kn', name: 'Kannada', countryCode: 'in' },
  { code: 'ml', name: 'Malayalam', countryCode: 'in' },
  { code: 'mr', name: 'Marathi', countryCode: 'in' },
  { code: 'pt', name: 'Portuguese', countryCode: 'pt' },
  { code: 'pa', name: 'Punjabi', countryCode: 'in' },
  { code: 'ru', name: 'Russian', countryCode: 'ru' },
  { code: 'es', name: 'Spanish', countryCode: 'es' },
  { code: 'ta', name: 'Tamil', countryCode: 'in' },
  { code: 'te', name: 'Telugu', countryCode: 'in' },
  { code: 'tr', name: 'Turkish', countryCode: 'tr' },
].sort((a, b) => a.name.localeCompare(b.name));

interface LanguageSelectorProps {
  currentLang: string;
  onLanguageChange: (code: string) => void;
}

const FlagIcon = ({ countryCode, className = "w-5" }: { countryCode: string, className?: string }) => (
  <img 
    src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`} 
    alt=""
    className={`${className} h-3.5 rounded-sm object-cover shadow-sm border border-slate-700/50`}
  />
);

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES.find(l => l.code === 'en') || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    onLanguageChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all outline-none group"
        title="Select your preferred language to use the website."
      >
        <span className="flex items-center">
          {currentLang === 'auto' ? (
            <span className="text-sm">✨</span>
          ) : (
            <FlagIcon countryCode={selectedLang.countryCode} />
          )}
        </span>
        <span className="text-sm font-bold text-slate-200 hidden sm:inline">
          {currentLang === 'auto' ? 'Auto Detect' : selectedLang.name}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 max-h-[60vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-[60] py-2 animate-in fade-in zoom-in-95 duration-200 custom-scrollbar">
          <button
            onClick={() => handleSelect('auto')}
            className={`w-full text-left px-4 py-2.5 hover:bg-blue-600/10 flex items-center justify-between group transition-colors ${currentLang === 'auto' ? 'bg-blue-600/5' : ''}`}
          >
            <span className="text-sm font-bold text-slate-300 group-hover:text-white flex items-center gap-3">
              <span className="text-sm w-5 text-center">✨</span> Auto Detect
            </span>
            {currentLang === 'auto' && <Check className="w-4 h-4 text-blue-400" />}
          </button>
          
          <div className="h-px bg-slate-800/50 my-1 mx-2" />

          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-4 py-2.5 hover:bg-blue-600/10 flex items-center justify-between group transition-colors ${currentLang === lang.code ? 'bg-blue-600/5' : ''}`}
            >
              <span className="text-sm font-bold text-slate-300 group-hover:text-white flex items-center gap-3">
                <FlagIcon countryCode={lang.countryCode} className="w-5 group-hover:scale-110 transition-transform" />
                {lang.name}
              </span>
              {currentLang === lang.code && <Check className="w-4 h-4 text-blue-400" />}
            </button>
          ))}
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};
