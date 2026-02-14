
import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Users, Target } from 'lucide-react';
import { TranslationKey } from '../services/translations';

interface CounterProps {
  endValue: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
}

const Counter: React.FC<CounterProps> = ({ endValue, label, suffix = "", icon }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easedProgress * endValue));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [endValue, hasAnimated]);

  return (
    <div ref={countRef} className="flex flex-col items-center p-6 relative group">
      <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10 group-hover:border-blue-500/50 group-hover:shadow-blue-500/10 transition-all duration-500">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight relative z-10">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-slate-500 font-bold uppercase tracking-widest text-xs relative z-10">
        {label}
      </div>
    </div>
  );
};

export const TrustCounter: React.FC<{ t: (key: TranslationKey) => string }> = ({ t }) => {
  return (
    <section className="py-20 border-y border-slate-900/50 bg-slate-950/30 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-slate-300 tracking-tight">
            {t('trust_title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-4 items-center">
          <Counter 
            endValue={12540} 
            label="Scams Detected" 
            suffix="+" 
            icon={<ShieldCheck className="w-7 h-7 text-blue-400" />} 
          />
          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-slate-800 to-transparent mx-auto" />
          <Counter 
            endValue={8200} 
            label="Users Protected" 
            suffix="+" 
            icon={<Users className="w-7 h-7 text-indigo-400" />} 
          />
          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-slate-800 to-transparent mx-auto" />
          <Counter 
            endValue={95} 
            label={t('stat_accuracy')} 
            suffix="%" 
            icon={<Target className="w-7 h-7 text-emerald-400" />} 
          />
        </div>
      </div>
    </section>
  );
};
