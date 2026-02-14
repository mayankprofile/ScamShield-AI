
export enum RiskLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  DANGEROUS = "Dangerous"
}

export type PlanType = 'Free' | 'Pro' | 'Business';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: PlanType;
  joinDate: number;
}

export interface ScamAnalysis {
  id: string;
  timestamp: number;
  scamScore: number;
  riskLevel: RiskLevel;
  reasons: string[];
  safetyAdvice: string[];
  aiExplanation?: string;
  originalContent?: string;
  hasImage?: boolean;
  detectedLanguage?: string;
  translation?: string;
  extractedText?: string;
  type?: 'Text' | 'Screenshot' | 'Invoice';
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  scamScore: number;
  riskLevel: RiskLevel;
  type?: 'Text' | 'Screenshot' | 'Invoice';
}
