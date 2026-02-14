
import React, { useState, useRef } from 'react';
import { ShieldAlert, FileSearch, Upload, X, Languages, Globe } from 'lucide-react';
import { translations, TranslationKey } from '../services/translations';

interface ScannerProps {
  onAnalyze: (text: string, image: string | null) => void;
  loading: boolean;
  currentLanguage: string;
}

export const Scanner: React.FC<ScannerProps> = ({ onAnalyze, loading, currentLanguage }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = (key: TranslationKey): string => {
    const langData = translations[currentLanguage] || translations['en'];
    return langData[key] || translations['en'][key];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!text.trim() && !image) return;
    onAnalyze(text, image);
  };

  return (
    <div id="scanner" className="max-w-4xl mx-auto p-6 md:p-8 bg-slate-900/50 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-100">{t('scanner_header')}</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
            <Languages className="w-3 h-3" /> {t('scanner_badge')}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('scanner_placeholder')}
            className="w-full h-40 bg-slate-950/50 border border-slate-700 rounded-2xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none placeholder:text-slate-600"
          />
        </div>

        <div className="p-8 border-2 border-dashed border-slate-800 rounded-[32px] bg-slate-950/30">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center space-y-3">
               <div className="flex items-center justify-center gap-3 text-blue-400">
                 <Globe className="w-6 h-6 animate-pulse" />
                 <h3 className="text-xl font-black text-slate-100 tracking-tight">{t('scanner_upload_title')}</h3>
               </div>
               <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed font-medium">
                 {t('scanner_helper')}
               </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-2xl transition-all font-bold text-sm border border-slate-700 active:scale-95 shadow-lg"
              >
                <Upload className="w-5 h-5 text-blue-400" />
                Select Screenshot
              </button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {image && (
                <div className="relative group">
                  <img
                    src={image}
                    alt="Upload preview"
                    className="w-16 h-16 object-cover rounded-xl border-2 border-blue-500/50"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="text-center border-t border-slate-800/50 pt-6 w-full">
              <p className="text-slate-600 text-[10px] uppercase font-black tracking-[0.2em] mb-2">Multi-Language AI Support</p>
              <p className="text-slate-500 text-xs font-medium max-w-md mx-auto italic">
                {t('scanner_supported_note')}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || (!text.trim() && !image)}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-lg transition-all ${
            loading || (!text.trim() && !image)
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/30 active:scale-95'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t('scanner_analyzing')}
            </>
          ) : (
            <>
              <FileSearch className="w-5 h-5" />
              {t('scanner_submit_btn')}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
