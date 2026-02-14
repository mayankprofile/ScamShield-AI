
import React, { useState } from 'react';
import { User, PlanType } from '../types';
import { 
  ChevronLeft, 
  User as UserIcon, 
  Mail, 
  Phone, 
  Lock, 
  Save, 
  X,
  CreditCard,
  Building2,
  ShieldCheck
} from 'lucide-react';

interface ProfileProps {
  user: User | null;
  onBack: () => void;
  onUpdate: (user: User) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onBack, onUpdate }) => {
  if (!user) return null;

  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    password: '••••••••',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      onUpdate({
        ...user,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center text-white text-4xl font-black mx-auto mb-6 shadow-2xl shadow-blue-600/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-black text-white">{user.name}</h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Member since {new Date(user.joinDate).getFullYear()}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Subscription Info
            </h3>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl mb-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Plan</div>
              <div className="text-xl font-black text-white">{user.plan}</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              You are currently protected under our {user.plan} tier security protocols.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-10 shadow-2xl">
            <h1 className="text-3xl font-black text-white mb-8 tracking-tight">Profile Settings</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Account Password</label>
                  <button type="button" className="text-xs font-bold text-blue-500 hover:underline">Change Password</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    disabled
                    value={formData.password}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-500 focus:outline-none font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-grow flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Profile Changes
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="flex-grow bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-2xl transition-all border border-slate-700 active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
