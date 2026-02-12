
import { GoogleGenAI, Type } from "@google/genai";
import { ScamAnalysis, RiskLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    scamScore: {
      type: Type.NUMBER,
      description: "A probability score between 0 and 100 representing how likely the content is a scam.",
    },
    riskLevel: {
      type: Type.STRING,
      description: "The calculated risk level based on the score: Low (0-25), Medium (26-50), High (51-85), Dangerous (86-100).",
    },
    reasons: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of specific reasons why this was flagged (e.g., 'Sense of urgency', 'Suspicious link').",
    },
    safetyAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable advice for the user to stay safe.",
    },
  },
  required: ["scamScore", "riskLevel", "reasons", "safetyAdvice"],
};

export const analyzeContent = async (text?: string, imageBase64?: string): Promise<ScamAnalysis> => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are an expert cybersecurity analyst specialized in identifying digital scams, phishing, and fraud.
    Your task is to analyze the provided content (text or image) and determine if it's a scam.
    Analyze for:
    - Urgency words (act now, limited time, immediate payment, account suspended)
    - Requests for sensitive data (OTP, password, bank details)
    - Suspicious or deceptive links (shortened URLs, misspelled domains)
    - Emotional manipulation (fear, greed, fake authority)
    - Unrealistic job offers or high-return investments
    - Grammar patterns common in non-native fraud attempts
    
    Provide a detailed scam probability score (0-100), a risk level, clear reasons, and actionable safety advice.
  `;

  const parts: any[] = [];
  if (text) {
    parts.push({ text: `Analyze the following text for potential scams:\n\n${text}` });
  }
  if (imageBase64) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64.split(",")[1] || imageBase64,
      },
    });
    parts.push({ text: "Analyze the attached screenshot for potential scams." });
  }

  if (parts.length === 0) {
    throw new Error("No content provided for analysis.");
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
    },
  });

  const result = JSON.parse(response.text || "{}");
  
  return {
    id: Math.random().toString(36).substring(7),
    timestamp: Date.now(),
    scamScore: result.scamScore || 0,
    riskLevel: result.riskLevel as RiskLevel || RiskLevel.LOW,
    reasons: result.reasons || [],
    safetyAdvice: result.safetyAdvice || [],
    originalContent: text?.substring(0, 500),
    hasImage: !!imageBase64,
  };
};
