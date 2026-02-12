
import React from 'react';
import { HistoryItem, RiskLevel } from '../types';
import { Clock, ExternalLink } from 'lucide-react';

interface HistoryProps {
  items: HistoryItem[];
  onSelect: (id: string) => void;
}

export const History: React.FC<HistoryProps> = ({ items, onSelect }) => {
  if (items.length === 0) return null;

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return 'bg-emerald-500/20 text-emerald-400';
      case RiskLevel.MEDIUM: return 'bg-yellow-500/20 text-yellow-400';
      case RiskLevel.HIGH: return 'bg-orange-500/20 text-orange-400';
      case RiskLevel.DANGEROUS: return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-20">
      <div className="flex items-center gap-2 mb-6 text-slate-400">
        <Clock className="w-4 h-4" />
        <h3 className="text-sm font-semibold uppercase tracking-widest">Recent Activity</h3>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-slate-950 rounded-xl font-mono text-sm text-slate-500">
                {item.scamScore}%
              </div>
              <div>
                <div className="text-slate-100 font-bold flex items-center gap-2">
                  Scam Scan #{item.id.toUpperCase()}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${getRiskColor(item.riskLevel)}`}>
                    {item.riskLevel.toUpperCase()}
                  </span>
                </div>
                <div className="text-slate-500 text-xs">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};
