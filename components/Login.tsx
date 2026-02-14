
import React, { useState } from 'react';
import { Mail, Lock, ChevronLeft, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onBack: () => void;
  onSignupClick: () => void;
  onLoginSuccess: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onBack, onSignupClick, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Mock login logic
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      phone: '+91 9876543210',
      plan: 'Free',
      joinDate: Date.now()
    };
    
    localStorage.setItem('scam_guard_user', JSON.stringify(mockUser));
    onLoginSuccess(mockUser);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </button>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[32px] p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 font-medium">Log in to manage your protection</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700 font-medium"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <button type="button" className="text-xs font-bold text-blue-500 hover:underline">Forgot Password?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700 font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-500 font-bold text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            Login <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Don't have an account?{' '}
            <button onClick={onSignupClick} className="text-blue-500 font-bold hover:underline">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
};
