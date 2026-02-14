
import { GoogleGenAI, Type } from "@google/genai";
import { ScamAnalysis, RiskLevel } from "../types";

// Always use a named parameter for the API key from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
      description: "List of specific red flags discovered (e.g., 'Sense of urgency', 'Suspicious link', 'Fake job tone').",
    },
    aiExplanation: {
      type: Type.STRING,
      description: "A detailed but concise explanation of why the content was rated this way, highlighting manipulation patterns.",
    },
    safetyAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable advice for the user to stay safe from this specific type of threat.",
    },
    detectedLanguage: {
      type: Type.STRING,
      description: "The name of the detected source language from the image (e.g., 'Bengali', 'Arabic', 'Hindi'). Support 100+ languages.",
    },
    translation: {
      type: Type.STRING,
      description: "A complete and accurate English translation of the extracted content.",
    },
    extractedText: {
      type: Type.STRING,
      description: "The raw text exactly as it was read from the screenshot (OCR results).",
    },
  },
  required: [
    "scamScore", 
    "riskLevel", 
    "reasons", 
    "aiExplanation", 
    "safetyAdvice", 
    "detectedLanguage", 
    "translation", 
    "extractedText"
  ],
};

export const analyzeContent = async (text?: string, imageBase64?: string, isInvoice: boolean = false): Promise<ScamAnalysis> => {
  // Using gemini-3-pro-preview for complex reasoning tasks like fraud detection and multilingual OCR
  const model = "gemini-3-pro-preview";
  
  const systemInstruction = isInvoice 
    ? `You are an expert financial auditor and fraud detection analyst. 
       Analyze the provided invoice, bill, or payment screenshot for manipulation or fraud.
       Look for signs of editing, fake logos, suspicious UPI IDs, or calculation errors.
       Provide a scam probability score (0-100), risk level, detection findings, explanation, and safety advice.`
    : `You are an expert cybersecurity analyst specialized in identifying digital scams, phishing, and fraud globally.
       
       MANDATORY PROCESSING FLOW FOR ALL UPLOADS:
       Step 1: OCR EXTRACTION - Accurately extract all text from the provided image/screenshot. Support 100+ languages including Hindi, Tamil, Bengali, Arabic, Spanish, French, Chinese, and Japanese.
       Step 2: LANGUAGE DETECTION - Identify the source language of the extracted text automatically.
       Step 3: TRANSLATION - Provide a high-quality English translation of all detected text.
       Step 4: SCAM ANALYSIS - Analyze the English translation for the following indicators:
          - PAYMENT REQUESTS: UPI IDs, crypto wallets, bank detail requests, gift cards, or escrow fraud.
          - FAKE JOB LANGUAGE: Unrealistic salary promises, "simple task" work, hiring via Telegram/WhatsApp.
          - URGENT THREATS: Account suspension, electricity cutoff, legal summons, or parcel delivery issues.
          - SUSPICIOUS LINKS: Shortened URLs (bit.ly, tinyurl), non-official domain names, or lookalike bank portals.
          - DATA REQUESTS: Asking for OTP, PIN, CVV, passwords, or identity documents.
          - PSYCHOLOGICAL MANIPULATION: Emotional stories ("friend in trouble"), fake rewards, or urgency.
       
       Always return a structured JSON response according to the schema. If no image is provided, focus on the text input.`;

  const parts: any[] = [];
  if (text) {
    parts.push({ text: `${isInvoice ? 'Verify this invoice details:' : 'Analyze this content:'}\n\n${text}` });
  }
  if (imageBase64) {
    // The model automatically handles OCR when an image is passed
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64.split(",")[1] || imageBase64,
      },
    });
    parts.push({ text: isInvoice ? "Check this image for signs of invoice manipulation." : "Execute the mandatory 4-step flow: Read this screenshot, detect the language, translate it to English, and check for scam indicators." });
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
    aiExplanation: result.aiExplanation || "",
    originalContent: text?.substring(0, 500),
    hasImage: !!imageBase64,
    detectedLanguage: result.detectedLanguage,
    translation: result.translation,
    extractedText: result.extractedText,
  };
};

export const analyzeMultiLanguageContent = async (text: string, sourceLanguage?: string): Promise<ScamAnalysis> => {
  return analyzeContent(text);
};
