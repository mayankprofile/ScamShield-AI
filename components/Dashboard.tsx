
import React from 'react';
import { User, HistoryItem, RiskLevel } from '../types';
import { 
  Shield, 
  User as UserIcon, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  ArrowRight, 
  History as HistoryIcon,
  MessageSquare,
  FileText,
  ImageIcon,
  ShieldCheck,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface DashboardProps {
  user: User | null;
  history: HistoryItem[];
  onEditProfile: () => void;
  onNewScan: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, history, onEditProfile, onNewScan }) => {
  if (!user) return null;

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return 'text-emerald-400';
      case RiskLevel.MEDIUM: return 'text-yellow-400';
      case RiskLevel.HIGH: return 'text-orange-400';
      case RiskLevel.DANGEROUS: return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getScanIcon = (type?: string) => {
    switch (type) {
      case 'Text': return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case 'Screenshot': return <ImageIcon className="w-4 h-4 text-indigo-400" />;
      case 'Invoice': return <FileText className="w-4 h-4 text-emerald-400" />;
      default: return <Zap className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-slate-500 font-medium">Your personal digital defense command center</p>
        </div>
        <button 
          onClick={onNewScan}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-3 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center gap-2 justify-center"
        >
          Scan New Message <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Subscription Status Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[40px] rounded-full group-hover:bg-blue-600/10 transition-colors" />
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
              <CreditCard className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-bold text-white">Subscription Status</h2>
          </div>
          <div className="mb-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Current Plan</div>
            <div className="text-3xl font-black text-white flex items-center gap-2">
              {user.plan}
              <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-black uppercase">Active</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            You have full access to our scan tools and security resources under your current {user.plan} plan.
          </p>
        </div>

        {/* Profile Stats Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 relative overflow-hidden group lg:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
              <UserIcon className="w-5 h-5 text-indigo-500" />
            </div>
            <h2 className="text-lg font-bold text-white">Profile Overview</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</div>
                  <div className="text-sm font-bold text-slate-200">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Phone Number</div>
                  <div className="text-sm font-bold text-slate-200">{user.phone}</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Join Date</div>
                  <div className="text-sm font-bold text-slate-200">{new Date(user.joinDate).toLocaleDateString()}</div>
                </div>
              </div>
              <button 
                onClick={onEditProfile}
                className="w-full py-3 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-sm font-bold rounded-xl transition-all border border-blue-600/20"
              >
                Edit Profile Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Scan History Dashboard List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden">
          <div className="p-8 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                <HistoryIcon className="w-5 h-5 text-slate-400" />
              </div>
              <h2 className="text-lg font-bold text-white">Recent Scam Scans</h2>
            </div>
            <button className="text-xs font-bold text-blue-500 hover:underline">View All</button>
          </div>
          <div className="p-2">
            {history.length > 0 ? (
              <div className="space-y-1">
                {history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 hover:bg-slate-800/50 rounded-2xl transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center">
                        {getScanIcon(item.type)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-200">#{item.id.toUpperCase()} • {item.type || 'Scan'}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">{new Date(item.timestamp).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={`text-xs font-black uppercase tracking-widest ${getRiskColor(item.riskLevel)}`}>{item.riskLevel}</div>
                      <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Shield className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No scan history found. Start your first scan today!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Security Tips */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8">
            <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <ActionButton icon={<MessageSquare className="w-4 h-4" />} label="Analyze Text" onClick={onNewScan} />
              <ActionButton icon={<ImageIcon className="w-4 h-4" />} label="Upload Screenshot" onClick={onNewScan} />
              <ActionButton icon={<FileText className="w-4 h-4" />} label="Check Invoice" onClick={onNewScan} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-[32px] p-8 relative overflow-hidden">
             <ShieldCheck className="w-12 h-12 text-blue-500/20 absolute -bottom-2 -right-2" />
             <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4" /> Security Tip
             </h3>
             <p className="text-xs text-slate-400 leading-relaxed font-medium">
               Scammers often use high-pressure tactics. If someone insists you must pay immediately or lose your account, it's almost certainly a scam.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:bg-slate-900 hover:border-slate-700 transition-all group"
  >
    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{label}</span>
  </button>
);
