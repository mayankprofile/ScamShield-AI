
import React, { useState, useEffect } from 'react';
import { X, Heart, CreditCard, Smartphone, CheckCircle, Coffee, ChevronRight, IndianRupee, Globe, Lock } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AMOUNTS = [100, 500, 1000];

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number | string>(500);
  const [customAmount, setCustomAmount] = useState('');
  const [method, setMethod] = useState<'upi' | 'card' | 'paypal'>('upi');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset state when closing with a slight delay for exit animation
      setTimeout(() => {
        setStatus('idle');
        setAmount(500);
        setCustomAmount('');
        setMethod('upi');
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProceed = () => {
    setStatus('processing');
    // Simulate premium payment processing flow
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 2000);
  };

  const currentDisplayAmount = amount === 'custom' ? (customAmount || 0) : amount;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-slate-900 border border-slate-800 rounded-[40px] w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
        {/* Soft Background Glows */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-indigo-600/5 blur-[80px] rounded-full -z-10" />

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          {status === 'success' ? (
            <div className="py-16 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Thank You for Your Support!</h3>
              <p className="text-slate-400 font-medium text-lg max-w-xs mx-auto leading-relaxed">
                Your contribution of ₹{currentDisplayAmount} directly fuels the improvement of our AI systems.
              </p>
              <div className="mt-12 text-blue-400 font-black animate-pulse text-xs uppercase tracking-[0.2em]">
                Redirecting you back...
              </div>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[22px] flex items-center justify-center shadow-xl shadow-blue-600/20 rotate-3">
                  <Coffee className="w-8 h-8 text-white -rotate-3" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter">Support ScamGuard</h2>
                  <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">CONTRIBUTION</p>
                </div>
              </div>

              {/* MESSAGE BOX */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-3xl p-5 mb-10 group hover:border-blue-500/20 transition-colors">
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Support this project with a small contribution. Your feedback and support help us improve our AI every day. ❤️
                </p>
              </div>

              {/* SELECT AMOUNT SECTION */}
              <div className="space-y-4 mb-10">
                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 ml-1">Select Amount</label>
                <div className="grid grid-cols-4 gap-3">
                  {AMOUNTS.map((val) => (
                    <button
                      key={val}
                      onClick={() => { setAmount(val); setCustomAmount(''); }}
                      className={`py-3.5 rounded-2xl font-black text-sm transition-all border ${
                        amount === val 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20 scale-105' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                  <button
                    onClick={() => setAmount('custom')}
                    className={`py-3.5 rounded-2xl font-black text-sm transition-all border ${
                      amount === 'custom' 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20 scale-105' 
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    Other
                  </button>
                </div>
                
                {amount === 'custom' && (
                  <div className="relative mt-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 font-black text-lg">₹</div>
                    <input
                      type="number"
                      autoFocus
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-2xl py-5 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-black text-lg placeholder:text-slate-800"
                    />
                  </div>
                )}
              </div>

              {/* PAYMENT METHOD SECTION */}
              <div className="space-y-4 mb-10">
                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 ml-1">Payment Method</label>
                <div className="space-y-3">
                  <MethodCard 
                    active={method === 'upi'} 
                    onClick={() => setMethod('upi')}
                    icon={<Smartphone className="w-5 h-5" />}
                    label="UPI (GPay, PhonePe, Paytm)"
                  />
                  <MethodCard 
                    active={method === 'card'} 
                    onClick={() => setMethod('card')}
                    icon={<CreditCard className="w-5 h-5" />}
                    label="Credit / Debit Card"
                  />
                  <MethodCard 
                    active={method === 'paypal'} 
                    onClick={() => setMethod('paypal')}
                    icon={<Globe className="w-5 h-5" />}
                    label="PayPal / Global Wallet"
                  />
                </div>
              </div>

              {/* CTA BUTTON */}
              <button
                onClick={handleProceed}
                disabled={status === 'processing' || (amount === 'custom' && !customAmount)}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black py-6 rounded-[24px] transition-all shadow-2xl shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3 outline-none mb-6 text-lg tracking-tight"
              >
                {status === 'processing' ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Initializing Secure Portal...
                  </>
                ) : (
                  <>
                    Proceed to Pay ₹{currentDisplayAmount || '0'}
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
              
              {/* FOOTER TEXT */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">
                <Lock className="w-3 h-3 stroke-[3]" /> Secure SSL Encryption
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MethodCard: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-5 p-5 rounded-[22px] border transition-all duration-300 relative group text-left ${
      active 
      ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_10px_30px_rgba(37,99,235,0.1)]' 
      : 'bg-slate-950 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
    }`}
  >
    <div className={`p-3 rounded-xl transition-all duration-300 ${active ? 'bg-blue-600 text-white scale-110' : 'bg-slate-900 text-slate-500'}`}>
      {icon}
    </div>
    <span className={`text-sm font-bold transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>{label}</span>
    
    {active && (
      <div className="ml-auto w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
        <CheckCircle className="w-4 h-4 text-white" />
      </div>
    )}
  </button>
);
