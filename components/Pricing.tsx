
import React, { useState, useEffect } from 'react';
import { Check, Globe } from 'lucide-react';
import { TranslationKey } from '../services/translations';

interface PricingProps {
  onPlanClick: (plan: string) => void;
  t: (key: TranslationKey) => string;
}

export const Pricing: React.FC<PricingProps> = ({ onPlanClick, t }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currency, setCurrency] = useState<{ symbol: string; isIndia: boolean }>({ symbol: '$', isIndia: false });

  useEffect(() => {
    // Detect if user is in India based on timezone or browser language
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isIndiaTZ = tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta';
    const isIndiaLang = navigator.language.includes('IN') || (navigator.languages && navigator.languages.some(l => l.includes('IN')));
    
    if (isIndiaTZ || isIndiaLang) {
      setCurrency({ symbol: '₹', isIndia: true });
    } else {
      setCurrency({ symbol: '$', isIndia: false });
    }
  }, []);

  const prices = currency.isIndia ? {
    starter: { monthly: '₹0', yearly: '₹0' },
    advanced: { monthly: '₹199', yearly: '₹1999' },
    enterprise: { monthly: '₹499', yearly: '₹4999' }
  } : {
    starter: { monthly: '$0', yearly: '$0' },
    advanced: { monthly: '$5', yearly: '$49' },
    enterprise: { monthly: '$12', yearly: '$119' }
  };

  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {t('pricing_title')}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            {t('pricing_desc')}
          </p>

          {/* Billing Toggle */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-2xl flex items-center shadow-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {t('pricing_monthly')}
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {t('pricing_yearly')}
              </button>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800/50 rounded-full">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Price shown in {currency.isIndia ? 'INR (₹)' : 'USD ($)'} based on your location
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 items-center max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-[32px] p-8 flex flex-col hover:border-slate-700 transition-all group relative h-fit lg:mt-4">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg mb-6">
                {t('plan_free')}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">{prices.starter[billingCycle]}</span>
                <span className="text-slate-500 font-medium">{billingCycle === 'monthly' ? '/mo' : '/yr'}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              <PricingFeature text="Basic scam detection score" />
              <PricingFeature text="Text paste analysis" />
              <PricingFeature text="5 screenshot scans per day" />
              <PricingFeature text="Risk level indicator" />
              <PricingFeature text="Basic safety tips" />
            </ul>

            <button
              onClick={() => onPlanClick('Free')}
              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl transition-all border border-slate-700 outline-none active:scale-95"
            >
              {t('btn_get_started')}
            </button>
          </div>

          {/* Advanced Plan - Highlighted Center */}
          <div className="bg-slate-900 border-2 border-blue-500/40 rounded-[40px] p-8 xl:p-10 flex flex-col shadow-[0_20px_50px_rgba(37,99,235,0.15)] relative z-20 group transition-all transform lg:scale-110">
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-blue-600/5 blur-[80px] -z-10 rounded-full" />
            
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
              {t('plan_most_popular')}
            </div>
            
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {t('plan_pro')}
                </span>
                <span className="inline-block px-3 py-1 bg-[#1E293B] text-slate-200 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-700 shadow-lg">
                  Best Seller
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">{prices.advanced[billingCycle]}</span>
                <span className="text-slate-500 font-medium">{billingCycle === 'monthly' ? '/mo' : '/yr'}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-12 flex-grow">
              <PricingFeature text="Unlimited scam checks" highlighted />
              <PricingFeature text="Screenshot + link deep analysis" highlighted />
              <PricingFeature text="Detailed AI explanation" highlighted />
              <PricingFeature text="Email and job scam detection" highlighted />
              <PricingFeature text="Scan history tracking" highlighted />
              <PricingFeature text="Faster AI response" highlighted />
            </ul>

            <button
              onClick={() => onPlanClick('Pro')}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-3xl transition-all shadow-2xl shadow-blue-600/20 outline-none active:scale-95"
            >
              {t('btn_get_started')}
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-[32px] p-8 flex flex-col hover:border-slate-700 transition-all group relative h-fit lg:mt-4">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg mb-6">
                {t('plan_business')}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">{prices.enterprise[billingCycle]}</span>
                <span className="text-slate-500 font-medium">{billingCycle === 'monthly' ? '/mo' : '/yr'}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              <PricingFeature text="Everything in Pro" />
              <PricingFeature text="Bulk scam detection" />
              <PricingFeature text="Team access" />
              <PricingFeature text="API integration support" />
              <PricingFeature text="Priority processing" />
              <PricingFeature text="Premium support" />
            </ul>

            <button
              onClick={() => onPlanClick('Business')}
              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl transition-all border border-slate-700 outline-none active:scale-95"
            >
              {t('btn_contact_sales')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingFeature: React.FC<{ text: string; highlighted?: boolean }> = ({ text, highlighted }) => (
  <li className="flex items-center gap-3">
    <div className={`w-5 h-5 flex items-center justify-center rounded-full shrink-0 transition-colors ${
      highlighted 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
        : 'bg-slate-800 text-slate-500'
    }`}>
      <Check className="w-3.5 h-3.5 stroke-[3]" />
    </div>
    <span className={`text-sm font-bold transition-colors ${
      highlighted ? 'text-slate-200' : 'text-slate-500'
    }`}>
      {text}
    </span>
  </li>
);
