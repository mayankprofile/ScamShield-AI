
import React, { useState, useRef } from 'react';
import { ShieldAlert, FileSearch, Upload, X, Camera } from 'lucide-react';

interface ScannerProps {
  onAnalyze: (text: string, image: string | null) => void;
  loading: boolean;
}

export const Scanner: React.FC<ScannerProps> = ({ onAnalyze, loading }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <ShieldAlert className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-100">Scan suspicious content</h2>
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste an email, message, job offer, or suspicious link here..."
            className="w-full h-48 bg-slate-950/50 border border-slate-700 rounded-2xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none placeholder:text-slate-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors text-sm font-medium border border-slate-700"
          >
            <Upload className="w-4 h-4" />
            Upload Screenshot
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
                className="w-12 h-12 object-cover rounded-lg border border-slate-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || (!text.trim() && !image)}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all ${
            loading || (!text.trim() && !image)
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <FileSearch className="w-5 h-5" />
              Check Scam Score
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Re-using Lucide icons as simple components for now
const LucideIcon: React.FC<{ icon: any; className?: string }> = ({ icon: Icon, className }) => <Icon className={className} />;
