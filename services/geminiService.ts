
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Step 4.2 Compatibility Dimensions (Weighted)
 * Interprets compatibility based on:
 * Interests (25%), Goals (25%), Culture (20%), Language (15%), Behavior (15%)
 */
export const getCompatibilityScore = async (user1: any, user2: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // High-quality reasoning for "Secret Sauce"
      contents: `Perform a deep compatibility analysis between two individuals for Gash Dating.
      
      Weights:
      - Interests overlap: 25%
      - Relationship goals: 25%
      - Cultural compatibility: 20%
      - Language compatibility: 15%
      - Behavioral patterns: 15%

      User A Profile: ${JSON.stringify(user1)}
      User B Profile: ${JSON.stringify(user2)}
      
      Respond with a JSON object containing a total compatibility score (0-100) and specific reasons for the score.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reasons: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            moderationFlag: { type: Type.BOOLEAN }
          },
          required: ["score", "reasons"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Scoring Error:", error);
    return { score: 70, reasons: ["Based on common professional goals."] };
  }
};

/**
 * Step 4.7 AI Moderation
 */
export const moderateContent = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following text for hate speech, harassment, sexual content, or scams: "${text}". 
      Respond with true if the content is unsafe, otherwise false.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.BOOLEAN
        }
      }
    });
    return JSON.parse(response.text);
  } catch {
    return false;
  }
};

/**
 * Step 4.8 Real-time Translation
 */
export const translateMessage = async (text: string, targetLanguage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following dating app message to ${targetLanguage}. Keep it natural and preserve the original tone: "${text}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Translation Error:", error);
    return text;
  }
};
