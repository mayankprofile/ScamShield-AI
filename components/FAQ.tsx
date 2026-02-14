
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { TranslationKey } from '../services/translations';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/30 mb-4 transition-all hover:border-slate-700">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 text-left transition-colors outline-none"
    >
      <div className="flex items-center gap-4">
        <HelpCircle className={`w-5 h-5 transition-colors ${isOpen ? 'text-blue-500' : 'text-slate-500'}`} />
        <span className="font-bold text-slate-100 text-sm md:text-base leading-tight">{question}</span>
      </div>
      <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed font-medium">
        {answer}
      </div>
    </div>
  </div>
);

interface FAQProps {
  t: (key: TranslationKey) => string;
  onContactClick: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ t, onContactClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') },
    { q: t('faq_q5'), a: t('faq_a5') },
    { q: t('faq_q6'), a: t('faq_a6') },
    { q: t('faq_q7'), a: t('faq_a7') },
    { q: t('faq_q8'), a: t('faq_a8') },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const midpoint = Math.ceil(faqData.length / 2);
  const leftCol = faqData.slice(0, midpoint);
  const rightCol = faqData.slice(midpoint);

  return (
    <section id="faq" className="py-24 px-6 border-t border-slate-900 bg-slate-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {t('faq_title')}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            {t('faq_desc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-8 max-w-6xl mx-auto">
          <div className="flex flex-col">
            {leftCol.map((item, idx) => (
              <FAQItem
                key={idx}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === idx}
                onClick={() => handleToggle(idx)}
              />
            ))}
          </div>
          <div className="flex flex-col">
            {rightCol.map((item, idx) => {
              const actualIdx = idx + midpoint;
              return (
                <FAQItem
                  key={actualIdx}
                  question={item.q}
                  answer={item.a}
                  isOpen={openIndex === actualIdx}
                  onClick={() => handleToggle(actualIdx)}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={onContactClick}
            className="inline-flex items-center gap-3 p-6 bg-blue-600/5 border border-blue-500/20 rounded-[32px] hover:bg-blue-600/10 transition-colors group outline-none active:scale-95"
          >
            <MessageCircle className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            <p className="text-slate-400 font-bold text-sm">
              {t('faq_footer')}
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};
