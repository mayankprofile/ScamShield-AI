
export enum RiskLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  DANGEROUS = "Dangerous"
}

export interface ScamAnalysis {
  id: string;
  timestamp: number;
  scamScore: number;
  riskLevel: RiskLevel;
  reasons: string[];
  safetyAdvice: string[];
  originalContent?: string;
  hasImage?: boolean;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  scamScore: number;
  riskLevel: RiskLevel;
}
